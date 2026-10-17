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
    <div className="space-y-8 animate-smooth-in">
      {/* 1. Header with greeting and organization info */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <PageTitle light={t.hi} bold={`${user.name.split(" ")[0]}.`} />
          <p className="text-sm text-[#72729A] mt-1 font-medium">
            Workspace: <span className="font-semibold text-[#18182E]">{organization.name}</span>
          </p>
        </div>

        {/* Quick link button to Inbox */}
        <div className="flex items-center gap-3">
          <Link
            href="/app/inbox"
            className="px-5 py-2.5 rounded-2xl text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#6852F6] to-[#5538EA] shadow-[0_8px_20px_rgba(85,56,234,0.32)] hover:-translate-y-0.5 active:scale-95 transition-all flex items-center gap-2"
          >
            <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-4l-2 3H10l-2-3H4" />
            </svg>
            <span>{t.inbox}</span>
            {unread > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-white/20 text-white font-mono text-[11px] font-bold">
                {unread}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* 2. Top Hero Section: Signature Purple Clay Card + 2 Metric Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Purple Hero Card: New Messages (Span 6) */}
        <Link
          href="/app/inbox?status=NEW"
          className="lg:col-span-6 clay-card-purple p-7 rounded-3xl relative overflow-hidden flex flex-col justify-between shadow-[0_20px_40px_-10px_rgba(85,56,234,0.42)] group cursor-pointer"
        >
          {/* Subtle decorative lights inside card */}
          <div className="absolute -top-12 -right-12 size-40 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 size-48 bg-black/10 rounded-full blur-2xl pointer-events-none" />

          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/80">
                {t.newMessages}
              </span>
              <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-white/20 backdrop-blur-md text-white border border-white/20">
                Inbox
              </span>
            </div>

            <div className="mt-4">
              <p className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                {unread}
              </p>
            </div>
          </div>

          <div className="mt-8 pt-5 border-t border-white/20 flex items-center justify-between text-xs">
            <span className="text-white/80">
              {unread === 1 ? "1 message awaiting review" : `${unread} messages awaiting review`}
            </span>
            <span className="text-xs font-bold text-white group-hover:translate-x-1 transition-transform">
              Open inbox →
            </span>
          </div>
        </Link>

        {/* 2 Secondary Metric Cards (Span 6) */}
        <div className="lg:col-span-6 grid sm:grid-cols-2 gap-4">
          <Link
            href="/app/contacts"
            className="clay-card p-6 rounded-3xl flex flex-col justify-between group cursor-pointer hover:border-[#5E48E8]/40"
          >
            <div className="space-y-1">
              <p className="text-xs font-bold uppercase tracking-wider text-[#72729A]">{t.contacts}</p>
              <p className="text-3xl font-extrabold text-[#18182E] tracking-tight">{contacts}</p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#EAE9F6] flex items-center justify-between text-xs font-bold text-[#5E48E8]">
              <span>View contacts</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </Link>

          <Link
            href="/app/forms"
            className="clay-card p-6 rounded-3xl flex flex-col justify-between group cursor-pointer hover:border-[#5E48E8]/40"
          >
            <div className="space-y-1">
              <p className="text-xs font-bold uppercase tracking-wider text-[#72729A]">{t.liveForms}</p>
              <p className="text-3xl font-extrabold text-[#18182E] tracking-tight">{forms}</p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#EAE9F6] flex items-center justify-between text-xs font-bold text-[#5E48E8]">
              <span>Manage forms</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </Link>
        </div>
      </div>

      {/* 3. Latest Messages Card */}
      <section className="clay-card p-6 sm:p-8 rounded-3xl space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-xs font-bold uppercase tracking-wider text-[#72729A]">Latest messages</p>
          <Link href="/app/inbox" className="text-xs font-bold text-[#5E48E8] hover:underline">
            View all →
          </Link>
        </div>

        {latest.length === 0 ? (
          <p className="text-sm text-[#72729A] py-6 text-center">
            Nothing yet. Share your form from the{" "}
            <Link href="/app/forms" className={ui.link}>Forms</Link> page and messages will show up here.
          </p>
        ) : (
          <ul className="divide-y divide-[#EAE9F6]">
            {latest.map((m) => (
              <li key={m.id}>
                <Link
                  href={`/app/inbox/${m.id}`}
                  className="flex items-center justify-between gap-4 py-3.5 px-3 rounded-2xl hover:bg-[#F8F9FE] transition-colors group"
                >
                  <span className="min-w-0 flex items-center gap-3">
                    <span
                      className={`size-2 rounded-full shrink-0 ${
                        m.status === "NEW" ? "bg-[#5E48E8]" : "bg-transparent"
                      }`}
                    />
                    <span className="min-w-0">
                      <span className={`block truncate ${m.status === "NEW" ? "text-[#18182E] font-bold" : "text-[#72729A]"}`}>
                        {m.subject}
                      </span>
                      <span className="block text-xs text-[#72729A] truncate">{m.name}</span>
                    </span>
                  </span>
                  <span className="text-xs text-[#72729A] whitespace-nowrap">{formatDate(m.createdAt)}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
