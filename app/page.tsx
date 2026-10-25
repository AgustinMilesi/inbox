import Link from "next/link";
import { PreferencesBlock } from "@/components/PreferencesBlock";
import { PreferencesControls } from "@/components/PreferencesControls";
import { HomeViews } from "@/components/HomeViews";
import { ui } from "@/components/ui";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col justify-between p-4 sm:p-8 lg:p-12 relative overflow-hidden animate-smooth-in bg-[var(--bg-page,#0A0E14)] text-slate-100">
      {/* 1. Header Superior */}
      <header className="w-full max-w-7xl mx-auto flex items-center justify-between pb-6 border-b border-[#1E293B]">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="size-10 rounded-2xl bg-[#121824] border border-[#1E293B] flex items-center justify-center p-2 shadow-sm transition-transform group-hover:scale-105 shrink-0">
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
          <div>
            <div className="flex items-baseline gap-1.5 leading-none">
              <span className="font-black text-xl tracking-[-0.05em] text-white">
                <span className="text-[#E9E7E0]">v</span>
                <span className="text-[#C6F827]">out</span>
              </span>
              <span className="text-xs font-mono text-[#C6F827] px-1.5 py-0.5 rounded bg-[#121824] border border-[#1E293B]">
                inbox
              </span>
            </div>
            <span className="text-xs text-slate-400 font-medium">Customer CRM &amp; Sovereign Contact Hub</span>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          <nav className="hidden md:flex items-center gap-2 mr-2 text-xs font-bold text-slate-400">
            <Link href="/" className="px-3 py-1.5 rounded-lg text-white hover:bg-white/5 transition">
              Plataforma
            </Link>
            <Link href="/contact" className="px-3 py-1.5 rounded-lg text-[#C6F827] hover:bg-[#C6F827]/10 transition">
              Contacto Directo
            </Link>
          </nav>
          <PreferencesControls />
          <Link
            href="/login"
            className="hidden sm:inline-flex px-4 py-2 text-xs font-bold uppercase tracking-wider text-[var(--primary-accent)] hover:bg-[var(--primary-accent)]/10 rounded-xl border border-[#1E293B] transition"
          >
            Iniciar Sesión
          </Link>
          <Link href="/register" className={ui.button}>
            Comenzar Ahora
          </Link>
        </div>
      </header>

      {/* 2. Unified Two-in-One Hero & Content Views */}
      <div className="w-full max-w-7xl mx-auto my-auto py-10 space-y-12">
        <HomeViews />

        {/* 3. Dedicated Preferences Block */}
        <section className="pt-4">
          <PreferencesBlock />
        </section>
      </div>

      {/* 4. Footer */}
      <footer className="w-full max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400 pt-6 border-t border-[#1E293B]">
        <p>© {new Date().getFullYear()} VOUT Inbox · Managed Cloud CRM &amp; Communications.</p>
        <div className="flex items-center gap-5">
          <Link href="/contact" className="hover:text-[#C6F827] transition font-bold">
            Portal de Contacto
          </Link>
          <Link href="/legal" className="hover:text-[var(--primary-accent)] transition">
            Términos &amp; Condiciones
          </Link>
          <Link href="/legal" className="hover:text-[var(--primary-accent)] transition">
            Privacidad &amp; Datos
          </Link>
          <Link href="/legal" className="hover:text-[var(--primary-accent)] transition">
            Cookies
          </Link>
        </div>
      </footer>
    </main>
  );
}
