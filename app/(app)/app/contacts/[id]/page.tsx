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
    <div className="space-y-8 animate-smooth-in">
      <Link href="/app/contacts" className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-bold text-[#5E48E8] hover:underline">
        ← Back to contacts
      </Link>

      <div className="clay-card p-6 sm:p-8 rounded-3xl space-y-6">
        <div className="border-b border-[#EAE9F6] pb-4">
          <p className="text-xs font-bold uppercase tracking-wider text-[#72729A]">Contact Profile</p>
          <h1 className="text-2xl sm:text-3xl font-black text-[#18182E] leading-tight break-words">
            {contact.name}
          </h1>
        </div>

        <ActionForm action={saveContact} keepValues className="space-y-4">
          <input type="hidden" name="id" value={contact.id} />
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className={ui.label} htmlFor="name">Name</label>
              <input id="name" name="name" required minLength={2} maxLength={120} defaultValue={contact.name} className={ui.input} />
            </div>
            <div>
              <label className={ui.label} htmlFor="email">Email</label>
              <input id="email" name="email" type="email" required defaultValue={contact.email} className={ui.input} />
            </div>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className={ui.label} htmlFor="phone">Phone</label>
              <input id="phone" name="phone" maxLength={40} defaultValue={contact.phone ?? ""} className={ui.input} />
            </div>
            <div>
              <label className={ui.label} htmlFor="company">Company</label>
              <input id="company" name="company" maxLength={120} defaultValue={contact.company ?? ""} className={ui.input} />
            </div>
            <div>
              <label className={ui.label} htmlFor="externalId">External ID (for ERP)</label>
              <input id="externalId" name="externalId" maxLength={100} defaultValue={contact.externalId ?? ""} className={ui.input} />
            </div>
          </div>
          <div>
            <label className={ui.label} htmlFor="notes">Notes</label>
            <textarea id="notes" name="notes" rows={3} maxLength={2000} defaultValue={contact.notes ?? ""} className={`${ui.input} resize-none`} />
          </div>
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <SubmitButton>Save changes</SubmitButton>
          </div>
        </ActionForm>
      </div>

      {/* Messages from this contact */}
      <section className="clay-card p-6 sm:p-8 rounded-3xl space-y-4">
        <p className="text-xs font-bold uppercase tracking-wider text-[#72729A]">Messages from this contact</p>
        {contact.messages.length === 0 ? (
          <p className="text-sm text-[#72729A] py-6 text-center">No messages yet.</p>
        ) : (
          <ul className="divide-y divide-[#EAE9F6]">
            {contact.messages.map((m) => (
              <li key={m.id}>
                <Link
                  href={`/app/inbox/${m.id}`}
                  className="flex items-center justify-between gap-4 py-3.5 px-3 rounded-2xl hover:bg-[#F8F9FE] transition-colors group"
                >
                  <span className="truncate text-[#18182E] font-medium group-hover:text-[#5E48E8] transition-colors">
                    {m.subject}
                  </span>
                  <span className="text-xs text-[#72729A] whitespace-nowrap">{formatDate(m.createdAt)}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      {canManage(role) && (
        <div className="pt-2">
          <ActionForm action={deleteContact} confirm="Delete this contact? Their messages stay in the inbox.">
            <input type="hidden" name="id" value={contact.id} />
            <SubmitButton variant="danger" pendingText="Deleting...">Delete contact</SubmitButton>
          </ActionForm>
        </div>
      )}
    </div>
  );
}
