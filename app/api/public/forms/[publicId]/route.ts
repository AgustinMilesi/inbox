import { after, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { env } from "@/lib/env";
import { getRequestIp } from "@/lib/http";
import { notifyNewMessage } from "@/lib/notify";
import { rateLimit } from "@/lib/rate-limit";
import { firstIssue, publicMessageSchema } from "@/lib/validation";

type Ctx = { params: Promise<{ publicId: string }> };

const MAX_BODY_BYTES = 20_000;

function isOriginAllowed(origin: string, allowed: string[]) {
  if (allowed.length === 0) return true; // no list set: any site may embed the form
  return origin === new URL(env.APP_URL).origin || allowed.includes(origin);
}

function corsHeaders(origin: string | null, allowed: string[]): Record<string, string> {
  if (!origin || !isOriginAllowed(origin, allowed)) return {};
  return {
    "Access-Control-Allow-Origin": allowed.length === 0 ? "*" : origin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
}

function reply(body: object, status: number, headers: Record<string, string> = {}) {
  return NextResponse.json(body, { status, headers });
}

export async function OPTIONS(req: Request, { params }: Ctx) {
  const { publicId } = await params;
  const form = await db.form.findUnique({
    where: { publicId },
    select: { allowedOrigins: true },
  });
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders(req.headers.get("origin"), form?.allowedOrigins ?? []),
  });
}

export async function POST(req: Request, { params }: Ctx) {
  const { publicId } = await params;
  const origin = req.headers.get("origin");

  const form = await db.form.findUnique({
    where: { publicId },
    select: {
      id: true,
      active: true,
      allowedOrigins: true,
      organization: {
        select: { id: true, name: true, notifyEmail: true, webhookUrl: true, webhookSecret: true },
      },
    },
  });
  if (!form || !form.active) return reply({ ok: false, error: "This form is not available." }, 404);

  const cors = corsHeaders(origin, form.allowedOrigins);
  if (origin && !isOriginAllowed(origin, form.allowedOrigins)) {
    return reply({ ok: false, error: "This site is not allowed to use the form." }, 403);
  }

  const ip = getRequestIp(req);
  const perVisitor = await rateLimit(`form:${form.id}:ip:${ip}`, 5, 10 * 60);
  const perForm = await rateLimit(`form:${form.id}:all`, 200, 60 * 60);
  if (!perVisitor.ok || !perForm.ok) {
    return reply({ ok: false, error: "Too many messages. Please try again later." }, 429, {
      ...cors,
      "Retry-After": String(perVisitor.retryAfter),
    });
  }

  const raw = await req.text();
  if (raw.length > MAX_BODY_BYTES) return reply({ ok: false, error: "Message too large." }, 413, cors);

  let json: unknown;
  try {
    json = JSON.parse(raw);
  } catch {
    return reply({ ok: false, error: "Invalid request." }, 400, cors);
  }

  const parsed = publicMessageSchema.safeParse(json);
  if (!parsed.success) return reply({ ok: false, error: firstIssue(parsed.error) }, 400, cors);
  const { website, message: body, ...fields } = parsed.data;

  // A real person never sees this field. If it has content it's a bot:
  // answer as if all went well and drop the message.
  if (website) return reply({ ok: true }, 200, cors);

  const organizationId = form.organization.id;

  // Every sender becomes a contact, so the ERP can pick them up as customers.
  const contact = await db.contact.upsert({
    where: { organizationId_email: { organizationId, email: fields.email } },
    update: {},
    create: { organizationId, email: fields.email, name: fields.name },
    select: { id: true },
  });

  const message = await db.message.create({
    data: { ...fields, body, organizationId, formId: form.id, contactId: contact.id },
  });

  // Email and webhook go out after the visitor already has their answer.
  after(() => notifyNewMessage(form.organization, message));

  return reply({ ok: true }, 200, cors);
}
