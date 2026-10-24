import type { Metadata } from "next";
import Link from "next/link";
import type { MessageStatus } from "@prisma/client";
import { PageTitle } from "@/components/Headline";
import { ui } from "@/components/ui";
import { requireSession } from "@/lib/auth/session";
import { db } from "@/lib/db";
import { formatDate } from "@/lib/format";
import { getServerTranslations } from "@/lib/i18n-server";

export const metadata: Metadata = { title: "Inbox" };

const PAGE_SIZE = 25;

export default async function InboxPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; page?: string }>;
}) {
  const [{ organization }, { t }] = await Promise.all([
    requireSession(),
    getServerTranslations(),
  ]);
  const query = await searchParams;

  const tabs: { label: string; value?: MessageStatus }[] = [
    { label: t.all },
    { label: t.statusNew, value: "NEW" },
    { label: t.statusRead, value: "READ" },
    { label: t.statusArchived, value: "ARCHIVED" },
  ];

  const status = tabs.find((tab) => tab.value && tab.value === query.status)?.value;
  const page = Math.max(1, Number(query.page) || 1);
  const where = { organizationId: organization.id, ...(status ? { status } : {}) };

  const [messages, total] = await Promise.all([
    db.message.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
      select: { id: true, name: true, subject: true, status: true, createdAt: true },
    }),
    db.message.count({ where }),
  ]);

  const href = (p: number) =>
    `/app/inbox?${new URLSearchParams({ ...(status ? { status } : {}), page: String(p) })}`;
  const pages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <div className="space-y-8 animate-smooth-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <PageTitle light="Your" bold="inbox." />
          <p className="text-sm text-[#72729A] mt-1 font-medium">
            Manage incoming messages and inquiries.
          </p>
        </div>

        {/* Status filter pills */}
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => {
            const active = tab.value === status;
            return (
              <Link
                key={tab.label}
                href={tab.value ? `/app/inbox?status=${tab.value}` : "/app/inbox"}
                className={`px-4 py-2 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all select-none ${
                  active
                    ? "clay-pill-active"
                    : "clay-pill-inactive"
                }`}
              >
                {tab.label}
              </Link>
            );
          })}
        </div>
      </div>

      <div className="clay-card p-6 sm:p-8 rounded-3xl space-y-4">
        {messages.length === 0 ? (
          <p className="text-sm text-[#72729A] py-12 text-center">No messages found in this view.</p>
        ) : (
          <ul className="divide-y divide-[#EAE9F6]">
            {messages.map((m) => (
              <li key={m.id}>
                <Link
                  href={`/app/inbox/${m.id}`}
                  className="flex items-center gap-4 py-4 px-3 rounded-2xl hover:bg-[#F8F9FE] transition-colors group"
                >
                  <span
                    aria-label={m.status === "NEW" ? "New" : undefined}
                    className={`size-2.5 rounded-full shrink-0 ${
                      m.status === "NEW" ? "bg-[var(--primary-accent)]" : "bg-transparent"
                    }`}
                  />
                  <span className="min-w-0 flex-1">
                    <span className={`block truncate ${m.status === "NEW" ? "text-[#18182E] font-bold" : "text-[#72729A]"}`}>
                      {m.subject}
                    </span>
                    <span className="block text-xs text-[#72729A] truncate">{m.name}</span>
                  </span>
                  <span className="text-xs text-[#72729A] whitespace-nowrap">{formatDate(m.createdAt)}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}

        {pages > 1 && (
          <div className="flex items-center justify-between pt-6 border-t border-[#EAE9F6] text-xs">
            {page > 1 ? (
              <Link href={href(page - 1)} className={ui.ghost}>← Newer</Link>
            ) : <span />}
            <span className="text-[#72729A] font-medium">Page {page} of {pages}</span>
            {page < pages ? (
              <Link href={href(page + 1)} className={ui.ghost}>Older →</Link>
            ) : <span />}
          </div>
        )}
      </div>
    </div>
  );
}
