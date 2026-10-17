import type { Metadata } from "next";
import Link from "next/link";
import { ActionForm } from "@/components/ActionForm";
import { PageTitle } from "@/components/Headline";
import { SubmitButton } from "@/components/SubmitButton";
import { ui } from "@/components/ui";
import { saveContact } from "@/app/actions/dashboard";
import { requireSession } from "@/lib/auth/session";
import { db } from "@/lib/db";

export const metadata: Metadata = { title: "Contacts" };

const PAGE_SIZE = 25;

export default async function ContactsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string }>;
}) {
  const { organization } = await requireSession();
  const query = await searchParams;
  const q = query.q?.trim().slice(0, 100);
  const page = Math.max(1, Number(query.page) || 1);

  const where = {
    organizationId: organization.id,
    ...(q
      ? {
          OR: [
            { name: { contains: q, mode: "insensitive" as const } },
            { email: { contains: q, mode: "insensitive" as const } },
            { company: { contains: q, mode: "insensitive" as const } },
          ],
        }
      : {}),
  };

  const [contacts, total] = await Promise.all([
    db.contact.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
      select: { id: true, name: true, email: true, company: true },
    }),
    db.contact.count({ where }),
  ]);

  const pages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const href = (p: number) => `/app/contacts?${new URLSearchParams({ ...(q ? { q } : {}), page: String(p) })}`;

  return (
    <div className="space-y-8 animate-smooth-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <PageTitle light="Your" bold="contacts." />
          <p className="text-sm text-[#72729A] mt-1 font-medium">
            Directory of customers, leads, and organizations.
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <form action="/app/contacts" className="flex items-end gap-3 clay-card p-4 rounded-2xl">
        <div className="flex-1">
          <label htmlFor="q" className={ui.label}>Search Contacts</label>
          <input
            id="q"
            name="q"
            defaultValue={q}
            placeholder="Search by name, email or company..."
            className={ui.input}
          />
        </div>
        <button type="submit" className={ui.button}>Search</button>
      </form>

      {/* Contacts List Card */}
      <div className="clay-card p-6 sm:p-8 rounded-3xl space-y-4">
        {contacts.length === 0 ? (
          <p className="text-sm text-[#72729A] py-12 text-center">
            {q ? "No contacts match that search." : "No contacts yet. Anyone who writes through a form shows up here."}
          </p>
        ) : (
          <ul className="divide-y divide-[#EAE9F6]">
            {contacts.map((c) => (
              <li key={c.id}>
                <Link
                  href={`/app/contacts/${c.id}`}
                  className="flex items-center justify-between gap-4 py-4 px-3 rounded-2xl hover:bg-[#F8F9FE] transition-colors group"
                >
                  <span className="min-w-0">
                    <span className="block truncate text-[#18182E] font-bold group-hover:text-[#5E48E8] transition-colors">
                      {c.name}
                    </span>
                    <span className="block text-xs text-[#72729A] truncate">{c.email}</span>
                  </span>
                  <span className="text-xs text-[#72729A] truncate font-medium">{c.company}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}

        {pages > 1 && (
          <div className="flex items-center justify-between pt-6 border-t border-[#EAE9F6] text-xs">
            {page > 1 ? (
              <Link href={href(page - 1)} className={ui.ghost}>← Previous</Link>
            ) : <span />}
            <span className="text-[#72729A] font-medium">Page {page} of {pages}</span>
            {page < pages ? (
              <Link href={href(page + 1)} className={ui.ghost}>Next →</Link>
            ) : <span />}
          </div>
        )}
      </div>

      {/* Add Contact Card */}
      <div className="clay-card p-6 sm:p-8 rounded-3xl space-y-6">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-[#72729A]">New Contact</p>
          <h2 className="text-xl font-black text-[#18182E]">Add a contact manually</h2>
        </div>
        <ActionForm action={saveContact} className="space-y-3">
          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <label className={ui.label} htmlFor="name">Name</label>
              <input id="name" name="name" required minLength={2} maxLength={120} placeholder="Contact full name" className={ui.input} />
            </div>
            <div>
              <label className={ui.label} htmlFor="email">Email</label>
              <input id="email" name="email" type="email" required placeholder="contact@example.com" className={ui.input} />
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <label className={ui.label} htmlFor="phone">Phone (optional)</label>
              <input id="phone" name="phone" maxLength={40} placeholder="+1 234 567 890" className={ui.input} />
            </div>
            <div>
              <label className={ui.label} htmlFor="company">Company (optional)</label>
              <input id="company" name="company" maxLength={120} placeholder="Company or Organization" className={ui.input} />
            </div>
          </div>
          <div className="pt-3">
            <SubmitButton>Add contact</SubmitButton>
          </div>
        </ActionForm>
      </div>
    </div>
  );
}
