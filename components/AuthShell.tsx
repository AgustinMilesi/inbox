import Link from "next/link";
import { Headline } from "@/components/Headline";
import { MailIcon } from "@/components/MailIcon";
import { PreferencesControls } from "@/components/PreferencesControls";

export function AuthShell({
  light,
  bold,
  children,
  side,
}: {
  light: string[];
  bold: string;
  children: React.ReactNode;
  side: React.ReactNode;
}) {
  return (
    <main className="min-h-screen flex flex-col justify-between p-6 sm:p-12 relative overflow-hidden animate-smooth-in bg-[var(--bg-page,#0A0E14)] text-slate-100">
      {/* Top Bar */}
      <header className="w-full max-w-6xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="size-9 rounded-2xl bg-[var(--primary-accent)] text-[var(--primary-accent-text)] font-black text-sm flex items-center justify-center shadow-[var(--primary-accent-shadow)] transition-transform group-hover:scale-105">
            V
          </div>
          <span className="font-black tracking-tight text-white group-hover:text-[var(--primary-accent)] transition">
            VOUT Inbox
          </span>
        </Link>
        <PreferencesControls />
      </header>

      {/* Auth Content */}
      <div className="w-full max-w-6xl mx-auto my-auto py-12 grid md:grid-cols-5 gap-12 md:gap-20 items-center">
        <div className="md:col-span-3 space-y-8">
          <Headline light={light} bold={bold} />
          <div className="pt-6">{children}</div>
        </div>

        <div className="md:col-span-2 space-y-8">
          <MailIcon />
          <div className="rounded-2xl p-6 space-y-4 text-base bg-[#121824] border border-[#1E293B] text-slate-200 shadow-sm">
            {side}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400 pt-6 border-t border-[#1E293B]">
        <p>© {new Date().getFullYear()} VOUT Inbox · Managed Cloud CRM &amp; Communications.</p>
        <div className="flex items-center gap-4">
          <Link href="/legal" className="hover:text-[var(--primary-accent)] transition">
            Términos &amp; Privacidad
          </Link>
          <Link href="/" className="hover:text-[var(--primary-accent)] transition font-medium">
            ← Volver al inicio
          </Link>
        </div>
      </footer>
    </main>
  );
}
