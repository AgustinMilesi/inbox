import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { createSession } from "@/lib/auth/session";

export async function GET(request: Request) {
  let user = await db.user.findFirst({
    where: {
      memberships: {
        some: {
          organization: {
            messages: { some: {} },
          },
        },
      },
    },
    select: { id: true },
  });

  if (!user) {
    user = await db.user.findFirst({ select: { id: true } });
  }

  if (!user) {
    const { hashPassword } = await import("@/lib/auth/password");
    const { newPublicId, slugify } = await import("@/lib/ids");
    const passwordHash = await hashPassword("GuestDemo2026!");
    user = await db.user.create({
      data: {
        name: "Invitado Demo",
        email: "demo@saas-am.vercel.app",
        passwordHash,
        memberships: {
          create: {
            role: "OWNER",
            organization: {
              create: {
                name: "VOUT Enterprise Workspace",
                slug: slugify("VOUT Enterprise Workspace"),
                notifyEmail: "demo@saas-am.vercel.app",
                forms: {
                  create: {
                    name: "Website contact form",
                    publicId: newPublicId(),
                  },
                },
              },
            },
          },
        },
      },
      select: { id: true },
    });
  }

  await createSession(user.id);

  const url = new URL("/app", request.url);
  return NextResponse.redirect(url);
}
