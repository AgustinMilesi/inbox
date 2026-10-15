import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { db } from "@/lib/db";
import { apiError, authenticateApiKey } from "@/lib/auth/api-auth";
import { toContactDto } from "@/lib/dto";
import { apiContactPatchSchema, firstIssue } from "@/lib/validation";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(req: Request, { params }: Ctx) {
  const auth = await authenticateApiKey(req);
  if (auth instanceof Response) return auth;
  const { id } = await params;

  const contact = await db.contact.findFirst({ where: { id, organizationId: auth.organizationId } });
  if (!contact) return apiError(404, "not_found", "Contact not found.");
  return NextResponse.json({ data: toContactDto(contact) });
}

export async function PATCH(req: Request, { params }: Ctx) {
  const auth = await authenticateApiKey(req);
  if (auth instanceof Response) return auth;
  const { id } = await params;

  const parsed = apiContactPatchSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return apiError(400, "invalid_request", firstIssue(parsed.error));
  const { name, email, phone, company, notes, external_id } = parsed.data;

  try {
    const result = await db.contact.updateMany({
      where: { id, organizationId: auth.organizationId },
      data: {
        ...(name !== undefined ? { name } : {}),
        ...(email !== undefined ? { email } : {}),
        ...(phone !== undefined ? { phone } : {}),
        ...(company !== undefined ? { company } : {}),
        ...(notes !== undefined ? { notes } : {}),
        ...(external_id !== undefined ? { externalId: external_id } : {}),
      },
    });
    if (result.count === 0) return apiError(404, "not_found", "Contact not found.");
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return apiError(409, "conflict", "A contact with that email or external_id already exists.");
    }
    throw error;
  }

  const contact = await db.contact.findFirstOrThrow({
    where: { id, organizationId: auth.organizationId },
  });
  return NextResponse.json({ data: toContactDto(contact) });
}
