import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ActionForm } from "@/components/ActionForm";
import { SubmitButton } from "@/components/SubmitButton";
import { ui } from "@/components/ui";
import { deleteContact, saveContact } from "@/app/actions/dashboard";
import { canManage, requireSession } from "@/lib/auth/session";
import { db } from "@/lib/db";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = { title: "Contact" };

export default async function ContactPage({ params }: { params: Promise<{ id: string }> }) {
  const { organization, role } = await requireSession();
  const { id } = await params;

  const contact = await db.contact.findFirst({
    where: { id, organizationId: organization.id },
    include: {
      messages: {
        orderBy: { createdAt: "desc" },
        take: 20,
        select: { id: true, subject: true, status: true, createdAt: true },
      },
    },
  });
  if (!contact) notFound();

  return (
    <div className="space-y-12">
      <Link href="/app/contacts" className={`${ui.muted} text-sm hover:text-rose-400 transition`}>
        ← Back to contacts
      </Link>

      <h1 className="text-4xl font-black text-white leading-tight break-words">{contact.name}</h1>

      <ActionForm action={saveContact} keepValues className="space-y-2">
        <input type="hidden" name="id" value={contact.id} />
        <div>
          <label className={ui.label} htmlFor="name">Name</label>
          <input id="name" name="name" required minLength={2} maxLength={120} defaultValue={contact.name} className={ui.input} />
        </div>
        <div>
          <label className={ui.label} htmlFor="email">Email</label>
          <input id="email" name="email" type="email" required defaultValue={contact.email} className={ui.input} />
        </div>
        <div>
          <label className={ui.label} htmlFor="phone">Phone</label>
          <input id="phone" name="phone" maxLength={40} defaultValue={contact.phone ?? ""} className={ui.input} />
        </div>
        <div>
          <label className={ui.label} htmlFor="company">Company</label>
          <input id="company" name="company" maxLength={120} defaultValue={contact.company ?? ""} className={ui.input} />
        </div>
        <div>
          <label className={ui.label} htmlFor="externalId">External id (for your ERP)</label>
          <input id="externalId" name="externalId" maxLength={100} defaultValue={contact.externalId ?? ""} className={ui.input} />
        </div>
        <div>
          <label className={ui.label} htmlFor="notes">Notes</label>
          <textarea id="notes" name="notes" rows={3} maxLength={2000} defaultValue={contact.notes ?? ""} className={`${ui.input} resize-none`} />
        </div>
        <div className="pt-6 flex flex-wrap items-center gap-3">
          <SubmitButton>Save changes</SubmitButton>
        </div>
      </ActionForm>

      <section className="space-y-4">
        <p className={ui.label}>Messages from this contact</p>
        {contact.messages.length === 0 ? (
          <p className={ui.muted}>No messages yet.</p>
        ) : (
          <ul className="divide-y divide-white/10 border-y border-white/10">
            {contact.messages.map((m) => (
              <li key={m.id}>
                <Link href={`/app/inbox/${m.id}`} className="flex items-center justify-between gap-4 py-4 hover:text-rose-400 transition">
                  <span className="truncate text-slate-200">{m.subject}</span>
                  <span className="text-xs text-slate-500 whitespace-nowrap">{formatDate(m.createdAt)}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      {canManage(role) && (
        <ActionForm action={deleteContact} confirm="Delete this contact? Their messages stay in the inbox.">
          <input type="hidden" name="id" value={contact.id} />
          <SubmitButton variant="danger" pendingText="Deleting...">Delete contact</SubmitButton>
        </ActionForm>
      )}
    </div>
  );
}
