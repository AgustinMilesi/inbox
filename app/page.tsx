import Link from "next/link";
import { Headline } from "@/components/Headline";
import { MailIcon } from "@/components/MailIcon";
import { PreferencesControls } from "@/components/PreferencesControls";
import { ui } from "@/components/ui";

const points = [
  {
    label: "Forms",
    text: "Put a contact form on any website, or just share the link.",
  },
  {
    label: "Inbox",
    text: "Read, answer and archive messages without digging through email.",
  },
  {
    label: "Contacts",
    text: "Everyone who writes to you is saved, and ready to connect to your ERP.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col justify-between p-6 sm:p-12 relative overflow-hidden animate-smooth-in">
      {/* Top Header */}
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

      {/* Hero Content */}
      <div className="w-full max-w-6xl mx-auto my-auto py-12 grid md:grid-cols-5 gap-12 md:gap-20 items-center">
        <div className="md:col-span-3 space-y-8">
          <Headline light={["Every message", "from your customers,"]} bold="in one place." />
          <div className="pt-6 flex flex-wrap items-center gap-6">
            <Link href="/register" className={ui.button}>
              Create account
            </Link>
            <Link href="/login" className={`${ui.link} text-xs uppercase tracking-wider font-bold`}>
              Sign in
            </Link>
          </div>
        </div>

        <div className="md:col-span-2 space-y-8">
          <MailIcon />
          <div className="space-y-6">
            {points.map((point) => (
              <div key={point.label} className="clay-card p-5 rounded-2xl">
                <p className={ui.label}>{point.label}</p>
                <p className="text-[#18182E] text-base font-medium">{point.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs text-[#72729A] pt-6 border-t border-[#EAE9F6]">
        <p>© {new Date().getFullYear()} Contact SaaS · Customer message hub & CRM integration.</p>
        <Link href="/login" className="hover:text-[#5E48E8] transition font-medium">
          Sign in →
        </Link>
      </footer>
    </main>
  );
}
