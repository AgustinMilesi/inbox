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
          <div className="size-9 rounded-2xl bg-[#121824] border border-[#1E293B] flex items-center justify-center p-1.5 shadow-sm transition-transform group-hover:scale-105 shrink-0">
            <svg viewBox="68 106 416 310" className="w-full h-full" fill="none">
              <rect x="68" y="228" width="60" height="60" rx="6" fill="#E9E7E0" />
              <rect x="132" y="292" width="60" height="60" rx="6" fill="#E9E7E0" />
              <rect x="196" y="356" width="60" height="60" rx="6" fill="#E9E7E0" />
              <rect x="260" y="292" width="60" height="60" rx="6" fill="#E9E7E0" />
              <rect x="324" y="228" width="60" height="60" rx="6" fill="#C6F827" />
              <rect x="390" y="166" width="46" height="46" rx="5" fill="#C6F827" />
              <rect x="452" y="106" width="32" height="32" rx="4" fill="#C6F827" />
            </svg>
          </div>
          <div className="flex items-baseline gap-1.5 leading-none">
            <span className="font-black text-lg tracking-[-0.05em] text-white">
              <span className="text-[#E9E7E0]">v</span>
              <span className="text-[#C6F827]">out</span>
            </span>
            <span className="text-[10px] font-mono text-[#C6F827] px-1.5 py-0.5 rounded bg-[#121824] border border-[#1E293B]">
              inbox
            </span>
          </div>
        </Link>
        <PreferencesControls />
      </header>

      {/* Auth Content */}
      <div className="w-full max-w-6xl mx-auto my-auto py-12 grid md:grid-cols-5 gap-12 md:gap-20 items-center">
        <div className="md:col-span-3 space-y-8">
          <Headline light={light} bold={bold} />
          <div className="pt-6">{children}</div>
        </div>
        <div className="md:col-span-2 space-y-8 md:pt-12 text-slate-400">
          <MailIcon />
          <div className="space-y-4 text-base">{side}</div>
        </div>
      </div>
    </main>
  );
}
