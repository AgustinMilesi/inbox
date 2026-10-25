import { after, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { contactSchema } from "@/lib/contact-schema";
import { notifyNewMessage } from "@/lib/notify";
import { getRequestIp } from "@/lib/http";
import { rateLimit } from "@/lib/rate-limit";

export async function POST(req: Request) {
  const ip = getRequestIp(req);

  // Rate limit: max 5 submissions per 10 minutes per IP
  try {
    const rl = await rateLimit(`contact:ip:${ip}`, 5, 10 * 60);
    if (!rl.ok) {
      return NextResponse.json(
        { ok: false, message: "Límite de seguridad alcanzado. Por favor aguarde unos minutos." },
        { status: 429, headers: { "Retry-After": String(rl.retryAfter) } }
      );
    }
  } catch {
    // If rate limit table is initializing, proceed safely
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Payload malformado." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, message: "Error de validación.", errors: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { website, ...data } = parsed.data;

  // Silent honeypot drop
  if (website) {
    return NextResponse.json({ ok: true });
  }

  try {
    // Locate or initialize the flagship VOUT organization
    let org = await db.organization.findFirst({
      orderBy: { createdAt: "asc" },
      select: { id: true, name: true, notifyEmail: true, webhookUrl: true, webhookSecret: true },
    });

    if (!org) {
      org = await db.organization.create({
        data: {
          name: "VOUT Direct Inbound",
          slug: "vout-inbound",
          notifyEmail: process.env.CONTACT_EMAIL || "agusmilesi2002@gmail.com",
        },
        select: { id: true, name: true, notifyEmail: true, webhookUrl: true, webhookSecret: true },
      });
    }

    // Upsert contact so the lead is registered in the CRM
    const contact = await db.contact.upsert({
      where: { organizationId_email: { organizationId: org.id, email: data.email } },
      update: { name: data.name },
      create: { organizationId: org.id, email: data.email, name: data.name },
      select: { id: true },
    });

    // Create the inbound message in the unified inbox
    const message = await db.message.create({
      data: {
        organizationId: org.id,
        contactId: contact.id,
        name: data.name,
        email: data.email,
        subject: data.subject,
        body: data.message,
        status: "NEW",
      },
    });

    // Asynchronous dispatch via email/webhooks
    after(() => notifyNewMessage(org, message));

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[VOUT Contact Gateway] Database write exception:", err);
    return NextResponse.json(
      { ok: false, message: "Servicio momentáneamente inaccesible. Por favor intente nuevamente." },
      { status: 500 }
    );
  }
}
