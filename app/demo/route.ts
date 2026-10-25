import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { createSession } from "@/lib/auth/session";

export async function GET(request: Request) {
  let user = await db.user.findFirst({
    where: {
      email: "demo@saas-am.vercel.app",
    },
    include: {
      memberships: {
        include: { organization: true },
      },
    },
  });

  if (!user) {
    const { hashPassword } = await import("@/lib/auth/password");
    const { newPublicId, slugify } = await import("@/lib/ids");
    const passwordHash = await hashPassword("GuestDemo2026!");
    user = await db.user.create({
      data: {
        name: "Agustín Milesi",
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
                    name: "Portal de Contacto & Webhooks",
                    publicId: newPublicId(),
                  },
                },
              },
            },
          },
        },
      },
      include: {
        memberships: {
          include: { organization: true },
        },
      },
    });
  }

  const membership = user.memberships[0];
  const org = membership?.organization;

  if (org) {
    if (user.name !== "Agustín Milesi") {
      await db.user.update({
        where: { id: user.id },
        data: { name: "Agustín Milesi" },
      });
    }

    const messageCount = await db.message.count({
      where: { organizationId: org.id },
    });

    if (messageCount < 4) {
      const { newPublicId } = await import("@/lib/ids");

      let form = await db.form.findFirst({
        where: { organizationId: org.id },
      });

      if (!form) {
        form = await db.form.create({
          data: {
            organizationId: org.id,
            name: "Portal de Consultas Corporativas",
            publicId: newPublicId(),
          },
        });
      }

      // 1. Contact 1 & Message 1 (NEW)
      const c1 = await db.contact.upsert({
        where: { organizationId_email: { organizationId: org.id, email: "santiago@distribuidorasur.com.ar" } },
        update: {},
        create: {
          organizationId: org.id,
          name: "Santiago Herrera",
          email: "santiago@distribuidorasur.com.ar",
          phone: "+54 11 4829-1122",
          company: "Distribuidora Sur S.A.",
          notes: "Interesado en webhooks de facturación.",
        },
      });

      await db.message.create({
        data: {
          organizationId: org.id,
          formId: form.id,
          contactId: c1.id,
          name: "Santiago Herrera",
          email: "santiago@distribuidorasur.com.ar",
          subject: "Solicitud de integración API para 12 sucursales",
          body: "Buenas tardes equipo de VOUT, queremos conectar los webhooks con nuestro ERP y sincronizar ventas. ¿Tienen documentación técnica de las firmas HMAC?",
          status: "NEW",
          createdAt: new Date(Date.now() - 35 * 60000), // 35 mins ago
        },
      });

      // 2. Contact 2 & Message 2 (NEW)
      const c2 = await db.contact.upsert({
        where: { organizationId_email: { organizationId: org.id, email: "vmorales@logistica-andina.cl" } },
        update: {},
        create: {
          organizationId: org.id,
          name: "Valentina Morales",
          email: "vmorales@logistica-andina.cl",
          phone: "+56 9 8122 3490",
          company: "Logística Andina SpA",
          notes: "Lead calificado sector transporte.",
        },
      });

      await db.message.create({
        data: {
          organizationId: org.id,
          formId: form.id,
          contactId: c2.id,
          name: "Valentina Morales",
          email: "vmorales@logistica-andina.cl",
          subject: "Presupuesto para onboarding de 35 operadores",
          body: "Hola, necesitamos implementar la plataforma en nuestras sedes de Santiago y Valparaíso. ¿Tienen disponibilidad para una demostración en vivo esta semana?",
          status: "NEW",
          createdAt: new Date(Date.now() - 2 * 3600000), // 2 hours ago
        },
      });

      // 3. Contact 3 & Message 3 (READ)
      const c3 = await db.contact.upsert({
        where: { organizationId_email: { organizationId: org.id, email: "martin@kioscosnordelta.com" } },
        update: {},
        create: {
          organizationId: org.id,
          name: "Martín Benítez",
          email: "martin@kioscosnordelta.com",
          phone: "+54 11 5591-0022",
          company: "Red de Kioscos Nordelta",
          notes: "Cliente activo en VOUT Retail.",
        },
      });

      await db.message.create({
        data: {
          organizationId: org.id,
          formId: form.id,
          contactId: c3.id,
          name: "Martín Benítez",
          email: "martin@kioscosnordelta.com",
          subject: "Feedback sobre la velocidad del lector HID",
          body: "El buffer raw < 50ms funciona perfecto en horario pico de sábado. No tuvimos un solo bloqueo de cobro en todo el fin de semana.",
          status: "READ",
          createdAt: new Date(Date.now() - 24 * 3600000), // 1 day ago
        },
      });

      // 4. Contact 4 & Message 4 (READ)
      const c4 = await db.contact.upsert({
        where: { organizationId_email: { organizationId: org.id, email: "cnavarro@fintechuy.com" } },
        update: {},
        create: {
          organizationId: org.id,
          name: "Camila Navarro",
          email: "cnavarro@fintechuy.com",
          phone: "+598 2900 8811",
          company: "Fintech Uruguay",
          notes: "Desarrollador líder de pasarela de pagos.",
        },
      });

      await db.message.create({
        data: {
          organizationId: org.id,
          formId: form.id,
          contactId: c4.id,
          name: "Camila Navarro",
          email: "cnavarro@fintechuy.com",
          subject: "Verificación de eventos webhook SHA-256 exitosa",
          body: "Configuramos el secreto criptográfico en nuestro receptor y validó correctamente todos los payloads de prueba. Muchas gracias por el soporte.",
          status: "READ",
          createdAt: new Date(Date.now() - 48 * 3600000), // 2 days ago
        },
      });
    }
  }

  await createSession(user.id);

  const url = new URL("/app", request.url);
  return NextResponse.redirect(url);
}
