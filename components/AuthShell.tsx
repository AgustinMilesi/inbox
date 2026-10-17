import Link from "next/link";
import { Headline } from "@/components/Headline";
import { MailIcon } from "@/components/MailIcon";
import { PreferencesControls } from "@/components/PreferencesControls";
import { ui } from "@/components/ui";

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
    <main className="min-h-screen flex flex-col justify-between p-6 sm:p-12 relative overflow-hidden animate-smooth-in">
      {/* Top Bar */}
      <header className="w-full max-w-6xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="size-9 rounded-2xl bg-gradient-to-br from-[#6852F6] to-[#5538EA] flex items-center justify-center text-white font-black text-sm shadow-[0_4px_12px_rgba(85,56,234,0.35)]">
            S
          </div>
          <span className="font-bold tracking-tight text-[#18182E] group-hover:text-[#5E48E8] transition">
            Contact SaaS
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
          <div className="clay-card p-6 rounded-2xl space-y-4 text-base text-[#18182E]">
            {side}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs text-[#72729A] pt-6 border-t border-[#EAE9F6]">
        <p>© {new Date().getFullYear()} Contact SaaS · Workspace access & team management.</p>
        <Link href="/" className="hover:text-[#5E48E8] transition font-medium">
          ← Back to home
        </Link>
      </footer>
    </main>
  );
}
