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
    <div className="space-y-8 animate-smooth-in">
      <Link href="/app/inbox" className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-bold text-[#5E48E8] hover:underline">
        ← Back to inbox
      </Link>

      <div className="clay-card p-6 sm:p-8 rounded-3xl space-y-6">
        <div className="space-y-2 border-b border-[#EAE9F6] pb-5">
          <div className="flex items-center gap-3">
            <span
              className={`size-2.5 rounded-full ${
                message.status === "NEW" ? "bg-[#5E48E8] shadow-[0_0_8px_rgba(94,72,232,0.6)]" : "bg-emerald-500"
              }`}
            />
            <span className="text-xs font-bold uppercase tracking-wider text-[#72729A]">
              Status: {message.status}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#18182E] leading-tight break-words">
            {message.subject}
          </h1>
          <p className="text-xs text-[#72729A]">{formatDate(message.createdAt)}</p>
        </div>

        <div className="grid sm:grid-cols-3 gap-6 bg-[#F8F9FE] p-5 rounded-2xl border border-[#EAE9F6]">
          <div>
            <p className={ui.label}>From</p>
            <p className="text-[#18182E] text-base font-bold break-words">{message.name}</p>
          </div>
          <div>
            <p className={ui.label}>Email</p>
            <p className="text-[#18182E] text-base font-bold break-all">{message.email}</p>
          </div>
          <div>
            <p className={ui.label}>Sent through</p>
            <p className="text-[#18182E] text-base font-bold">{message.form?.name ?? "Default form"}</p>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-[#EAE9F6] shadow-inner">
          <p className="whitespace-pre-wrap break-words text-base text-[#18182E] leading-relaxed">
            {message.body}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <a href={reply} className={ui.button}>
            Reply by email
          </a>
          {actions.map((action) => (
            <ActionForm key={action.status} action={setMessageStatus} keepValues>
              <input type="hidden" name="id" value={message.id} />
              <input type="hidden" name="status" value={action.status} />
              <SubmitButton variant="ghost" pendingText="...">
                {action.label}
              </SubmitButton>
            </ActionForm>
          ))}
          {message.contact && (
            <Link href={`/app/contacts/${message.contact.id}`} className={ui.ghost}>
              View contact profile
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
