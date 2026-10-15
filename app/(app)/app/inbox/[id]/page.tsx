import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ActionForm } from "@/components/ActionForm";
import { SubmitButton } from "@/components/SubmitButton";
import { ui } from "@/components/ui";
import { setMessageStatus } from "@/app/actions/dashboard";
import { requireSession } from "@/lib/auth/session";
import { db } from "@/lib/db";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = { title: "Message" };

export default async function MessagePage({ params }: { params: Promise<{ id: string }> }) {
  const { organization } = await requireSession();
  const { id } = await params;

  const message = await db.message.findFirst({
    where: { id, organizationId: organization.id },
    include: { form: { select: { name: true } }, contact: { select: { id: true, name: true } } },
  });
  if (!message) notFound();

  const reply = `mailto:${message.email}?subject=${encodeURIComponent(`Re: ${message.subject}`)}`;
  const actions = [
    message.status !== "READ" && { status: "READ", label: "Mark as read" },
    message.status !== "NEW" && { status: "NEW", label: "Mark as new" },
    message.status !== "ARCHIVED" && { status: "ARCHIVED", label: "Archive" },
  ].filter((a): a is { status: string; label: string } => Boolean(a));

  return (
    <div className="space-y-10">
      <Link href="/app/inbox" className={`${ui.muted} text-sm hover:text-rose-400 transition`}>
        ← Back to inbox
      </Link>

      <div className="space-y-3">
        <h1 className="text-4xl font-black text-white leading-tight break-words">{message.subject}</h1>
        <p className={ui.muted}>{formatDate(message.createdAt)}</p>
      </div>

      <div className="grid sm:grid-cols-3 gap-6">
        <div>
          <p className={ui.label}>From</p>
          <p className="text-white text-lg break-words">{message.name}</p>
        </div>
        <div>
          <p className={ui.label}>Email</p>
          <p className="text-white text-lg break-all">{message.email}</p>
        </div>
        <div>
          <p className={ui.label}>Sent through</p>
          <p className="text-white text-lg">{message.form?.name ?? "A form that was deleted"}</p>
        </div>
      </div>

      <div className={`${ui.card} p-6`}>
        <p className="whitespace-pre-wrap break-words text-lg text-slate-100 leading-relaxed">{message.body}</p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <a href={reply} className={`${ui.button} inline-block`}>Reply by email</a>
        {actions.map((action) => (
          <ActionForm key={action.status} action={setMessageStatus} keepValues>
            <input type="hidden" name="id" value={message.id} />
            <input type="hidden" name="status" value={action.status} />
            <SubmitButton variant="ghost" pendingText="...">{action.label}</SubmitButton>
          </ActionForm>
        ))}
        {message.contact && (
          <Link href={`/app/contacts/${message.contact.id}`} className={ui.ghost}>
            View contact
          </Link>
        )}
      </div>
    </div>
  );
}
