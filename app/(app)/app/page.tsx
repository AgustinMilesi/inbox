import type { Metadata } from "next";
import Link from "next/link";
import { PageTitle } from "@/components/Headline";
import { ui } from "@/components/ui";
import { requireSession } from "@/lib/auth/session";
import { db } from "@/lib/db";
import { formatDate } from "@/lib/format";
import { getServerTranslations } from "@/lib/i18n-server";

export const metadata: Metadata = { title: "Overview" };

export default async function OverviewPage() {
  const [{ organization, user }, { t }] = await Promise.all([
    requireSession(),
    getServerTranslations(),
  ]);
  const orgId = organization.id;

  const [unread, contacts, forms, latest] = await Promise.all([
    db.message.count({ where: { organizationId: orgId, status: "NEW" } }),
    db.contact.count({ where: { organizationId: orgId } }),
    db.form.count({ where: { organizationId: orgId, active: true } }),
    db.message.findMany({
      where: { organizationId: orgId },
      orderBy: { createdAt: "desc" },
      take: 5,
      select: { id: true, name: true, subject: true, status: true, createdAt: true },
    }),
  ]);

  return (
    <div className="space-y-6 w-full max-w-full overflow-x-hidden animate-smooth-in">
      {/* 1. Header with greeting and organization info */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="min-w-0">
          <PageTitle light={t.hi} bold={`${user.name.split(" ")[0]}.`} />
          <p className="text-sm text-[#a3a3a3] mt-1 font-medium truncate">
            Workspace: <span className="font-semibold text-white">{organization.name}</span>
          </p>
        </div>

        {/* Quick link button to Inbox (Ergonomic 44px min-height) */}
        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/app/inbox"
            className={ui.button}
          >
            <svg className="size-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-4l-2 3H10l-2-3H4" />
            </svg>
            <span>{t.inbox}</span>
            {unread > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-black text-[#c5ff4a] font-mono text-[11px] font-bold">
                {unread}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* 2. Top Hero Section: Metric Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* VOUT Obsidian Hero Card: New Messages (Span 6) */}
        <Link
          href="/app/inbox?status=NEW"
          className="lg:col-span-6 p-6 sm:p-7 rounded-[6px] relative overflow-hidden flex flex-col justify-between bg-[#141414] border border-[#262626] hover:border-[#383838] group cursor-pointer transition-all duration-200"
        >
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#a3a3a3]">
                {t.newMessages}
              </span>
              <span className="px-2.5 py-1 rounded-[4px] text-xs font-bold bg-[#c5ff4a]/12 text-[#c5ff4a] border border-[#c5ff4a]/30">
                Inbox
              </span>
            </div>

            <div className="mt-4">
              <p className="text-4xl sm:text-5xl font-black text-white tracking-tight font-mono">
                {unread}
              </p>
            </div>
          </div>

          <div className="mt-8 pt-5 border-t border-[#262626] flex items-center justify-between text-xs">
            <span className="text-[#a3a3a3]">
              {unread === 1 ? "1 message awaiting review" : `${unread} messages awaiting review`}
            </span>
            <span className="text-xs font-semibold text-[#c5ff4a] group-hover:translate-x-1 transition-transform">
              Open inbox →
            </span>
          </div>
        </Link>

        {/* 2 Secondary Metric Cards (Span 6) */}
        <div className="lg:col-span-6 grid sm:grid-cols-2 gap-4">
          <Link
            href="/app/contacts"
            className="p-6 rounded-[6px] bg-[#141414] border border-[#262626] hover:border-[#383838] flex flex-col justify-between group cursor-pointer transition-all"
          >
            <div className="space-y-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#a3a3a3]">{t.contacts}</p>
              <p className="text-3xl font-black text-white tracking-tight font-mono">{contacts}</p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#262626] flex items-center justify-between text-xs font-semibold text-[#c5ff4a]">
              <span>View contacts</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </Link>

          <Link
            href="/app/forms"
            className="p-6 rounded-[6px] bg-[#141414] border border-[#262626] hover:border-[#383838] flex flex-col justify-between group cursor-pointer transition-all"
          >
            <div className="space-y-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#a3a3a3]">{t.liveForms}</p>
              <p className="text-3xl font-black text-white tracking-tight font-mono">{forms}</p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#262626] flex items-center justify-between text-xs font-semibold text-[#c5ff4a]">
              <span>Manage forms</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </Link>
        </div>
      </div>

      {/* 3. Latest Messages Card */}
      <section className="p-6 rounded-[6px] bg-[#141414] border border-[#262626] space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#262626]">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">Latest messages</h2>
          <Link href="/app/inbox" className="text-xs font-semibold text-[#c5ff4a] hover:underline">
            View all →
          </Link>
        </div>

        {latest.length === 0 ? (
          <p className="text-xs text-[#737373] italic py-8 text-center">
            Nothing yet. Share your form from the{" "}
            <Link href="/app/forms" className={ui.link}>Forms</Link> page and messages will show up here.
          </p>
        ) : (
          <ul className="divide-y divide-[#262626]">
            {latest.map((m) => (
              <li key={m.id}>
                <Link
                  href={`/app/inbox/${m.id}`}
                  className="flex items-center justify-between gap-4 py-3 hover:bg-[#1a1a1a] px-3 rounded-[4px] transition-colors group"
                >
                  <span className="min-w-0 flex items-center gap-3">
                    <span
                      className={`size-2 rounded-full shrink-0 ${
                        m.status === "NEW" ? "bg-[#c5ff4a] shadow-[0_0_6px_#c5ff4a]" : "bg-transparent"
                      }`}
                    />
                    <span className="min-w-0">
                      <span className={`block truncate text-xs font-semibold ${m.status === "NEW" ? "text-white" : "text-[#a3a3a3]"}`}>
                        {m.subject}
                      </span>
                      <span className="block text-[11px] text-[#737373] truncate">{m.name}</span>
                    </span>
                  </span>
                  <span className="text-xs text-[#737373] font-mono whitespace-nowrap">{formatDate(m.createdAt)}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
