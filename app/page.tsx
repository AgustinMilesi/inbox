import Link from "next/link";
import { PreferencesBlock } from "@/components/PreferencesBlock";
import { PreferencesControls } from "@/components/PreferencesControls";
import { ui } from "@/components/ui";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col justify-between p-4 sm:p-8 lg:p-12 relative overflow-hidden animate-smooth-in bg-[var(--bg-page,#0A0E14)] text-slate-100">
      {/* 1. Header Superior */}
      <header className="w-full max-w-7xl mx-auto flex items-center justify-between pb-6 border-b border-[#1E293B]">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="size-10 rounded-2xl bg-[var(--primary-accent)] text-[var(--primary-accent-text)] flex items-center justify-center font-black text-base shadow-[var(--primary-accent-shadow)] transition-transform group-hover:scale-105">
            V
          </div>
          <div>
            <span className="font-black tracking-tight text-base text-white block leading-none">
              VOUT Inbox
            </span>
            <span className="text-xs text-slate-400 font-medium">Customer CRM &amp; Multi-Channel Inbox</span>
          </div>
        </Link>

        <div className="flex items-center gap-3">
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

      {/* 2. Hero Headline & Live Preview */}
      <div className="w-full max-w-7xl mx-auto my-auto py-10 space-y-12">
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          {/* Left Hero Text */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#121824] border border-[#1E293B] shadow-xs text-xs font-bold text-[var(--primary-accent)]">
              <span className="size-2 rounded-full bg-[var(--primary-accent)] animate-pulse" />
              <span>VOUT Cloud Architecture · 99.9% SLA</span>
            </div>

            <div>
              <h1 className="text-4xl sm:text-5xl font-light text-slate-400 leading-tight">
                Cada mensaje
              </h1>
              <h1 className="text-4xl sm:text-5xl font-light text-slate-400 leading-tight">
                de tus clientes,
              </h1>
              <h1 className="text-4xl sm:text-5xl font-black text-[var(--primary-accent)] leading-tight">
                en una bandeja central.
              </h1>
            </div>

            <p className="text-base text-slate-400 leading-relaxed">
              Captura consultas desde formularios web integrables, clasifica mensajes en tiempo real
              y sincroniza contactos de clientes directamente con el ecosistema VOUT.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                href="/demo"
                className="px-6 py-3.5 rounded-2xl bg-[var(--primary-accent)] text-[var(--primary-accent-text)] font-black text-sm shadow-[var(--primary-accent-shadow)] transition flex items-center gap-2 group hover:opacity-95"
              >
                <span>✨ Entrar como Invitado</span>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-black/20 dark:bg-white/20 px-2 py-0.5 rounded-full">
                  1-Click Demo
                </span>
              </Link>
              <Link href="/register" className={ui.button}>
                Crear Cuenta VOUT
              </Link>
              <Link href="/login" className={ui.ghost}>
                Acceder a Consola →
              </Link>
            </div>
          </div>

          {/* Right Hero: Obsidian Dashboard Mockup */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl p-5 sm:p-7 relative overflow-hidden bg-[#121824] border border-[#1E293B] shadow-2xl">
              {/* Top Bar of the Dashboard Mockup */}
              <div className="flex items-center justify-between pb-5 border-b border-[#1E293B] mb-5">
                <div className="flex items-center gap-2.5">
                  <div className="size-8 rounded-xl bg-[var(--primary-accent)] text-[var(--primary-accent-text)] flex items-center justify-center font-bold text-xs shadow-xs">
                    <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-4l-2 3H10l-2-3H4" />
                    </svg>
                  </div>
                  <span className="font-bold text-sm text-white">VOUT Inbox · Vista Operativa</span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#0A0E14] border border-[#1E293B] text-xs text-slate-400">
                    <span className="size-2 rounded-full bg-emerald-400" />
                    <span>Conexión Cloud Activa</span>
                  </div>
                </div>
              </div>

              {/* Sub-cards */}
              <div className="grid sm:grid-cols-12 gap-4">
                <div className="sm:col-span-7 p-5 rounded-2xl bg-[#0D121B] border border-[#1E293B] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white block">Flujo de Consultas</span>
                    <span className="text-[11px] font-bold text-[var(--primary-accent)]">Promedio 142 / día</span>
                  </div>

                  {/* Vector Wave Graph */}
                  <div className="h-20 w-full pt-2">
                    <svg className="w-full h-full overflow-visible" viewBox="0 0 200 60" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="gradientWave" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="var(--primary-accent)" stopOpacity="0.3" />
                          <stop offset="100%" stopColor="var(--primary-accent)" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M0 45 Q 30 50, 60 25 T 120 15 T 160 35 T 200 10 L 200 60 L 0 60 Z"
                        fill="url(#gradientWave)"
                      />
                      <path
                        d="M0 45 Q 30 50, 60 25 T 120 15 T 160 35 T 200 10"
                        fill="none"
                        stroke="var(--primary-accent)"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>

                  <div className="flex justify-between text-[10px] text-slate-500 font-medium pt-1">
                    <span>Semana 1</span>
                    <span>Semana 2</span>
                    <span>Semana 3</span>
                    <span>Semana 4</span>
                  </div>
                </div>

                {/* Recent Inbound Leads Mini List (Span 5) */}
                <div className="sm:col-span-5 p-5 rounded-2xl bg-[#0D121B] border border-[#1E293B] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white block">Leads Recientes</span>
                    <span className="text-[10px] text-[var(--primary-accent)] font-bold">8 sin leer</span>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between p-2 rounded-xl bg-[#121824] border border-[#1E293B]">
                      <div className="flex items-center gap-2">
                        <span className="size-6 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold text-[10px]">
                          ✉
                        </span>
                        <div>
                          <p className="font-bold text-white text-[11px]">Enterprise Lead</p>
                          <p className="text-[9px] text-slate-400">Consulta comercial</p>
                        </div>
                      </div>
                      <span className="font-bold text-emerald-400 text-[10px] bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">Nuevo</span>
                    </div>

                    <div className="flex items-center justify-between p-2 rounded-xl bg-[#121824] border border-[#1E293B]">
                      <div className="flex items-center gap-2">
                        <span className="size-6 rounded-lg bg-[var(--primary-accent)]/10 text-[var(--primary-accent)] flex items-center justify-center font-bold text-[10px]">
                          ⚡
                        </span>
                        <div>
                          <p className="font-bold text-white text-[11px]">Sincronización ERP</p>
                          <p className="text-[9px] text-slate-400">VOUT Retail · Cliente #104</p>
                        </div>
                      </div>
                      <span className="font-bold text-[var(--primary-accent)] text-[10px] bg-[var(--primary-accent)]/10 px-2 py-0.5 rounded-full border border-[var(--primary-accent)]/20">Sync</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Dedicated Preferences Block */}
        <section className="pt-4">
          <PreferencesBlock />
        </section>
      </div>

      {/* 4. Footer */}
      <footer className="w-full max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400 pt-6 border-t border-[#1E293B]">
        <p>© {new Date().getFullYear()} VOUT Inbox · Managed Cloud CRM &amp; Communications.</p>
        <div className="flex items-center gap-5">
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
