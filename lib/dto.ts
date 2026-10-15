import type { Contact, Message } from "@prisma/client";

// The public shape of our data. Keeping it separate from the database model
// means tables can change later without breaking the ERP.
export const toContactDto = (c: Contact) => ({
  id: c.id,
  name: c.name,
  email: c.email,
  phone: c.phone,
  company: c.company,
  notes: c.notes,
  external_id: c.externalId,
  created_at: c.createdAt.toISOString(),
  updated_at: c.updatedAt.toISOString(),
});

export const toMessageDto = (m: Message) => ({
  id: m.id,
  contact_id: m.contactId,
  form_id: m.formId,
  name: m.name,
  email: m.email,
  subject: m.subject,
  message: m.body,
  status: m.status.toLowerCase(),
  created_at: m.createdAt.toISOString(),
});
