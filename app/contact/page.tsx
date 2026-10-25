import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { PreferencesControls } from "@/components/PreferencesControls";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contacto Directo · VOUT Inbox Gateway",
  description:
    "Canal directo e institucional para requerimientos de software, integraciones empresariales y consultas de arquitectura con Agustín Milesi.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen flex flex-col justify-between p-4 sm:p-8 lg:p-12 relative overflow-hidden bg-[#0A0E14] text-slate-100">
      {/* 1. Top Header */}
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
                inbox/contact
              </span>
            </div>
            <span className="text-xs text-slate-400 font-medium">Canal de Enlace Soberano &amp; Contacto Directo</span>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          <PreferencesControls />
          <Link
            href="/"
            className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-slate-300 hover:text-white rounded-xl border border-[#1E293B] hover:bg-[#121824] transition"
          >
            ← Consola SaaS
          </Link>
          <Link
            href="/demo"
            className="hidden sm:inline-flex px-4 py-2 text-xs font-black uppercase tracking-wider bg-[#C6F827] text-[#0A0E14] rounded-xl hover:bg-[#bcf020] transition"
          >
            Live Demo
          </Link>
        </div>
      </header>

      {/* 2. Main Two-Column Harmonious Layout */}
      <div className="w-full max-w-7xl mx-auto my-auto py-10">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column (5/12): Identity, Thesis Headline & Channels */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider bg-[#121824] text-[#C6F827] border border-[#1E293B]">
                <span className="size-2 rounded-full bg-[#C6F827] animate-pulse" />
                <span>Canal Institucional Directo</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight">
                Hablemos de <span className="text-[#C6F827]">arquitectura</span> y sistemas.
              </h1>
              <p className="text-sm sm:text-base text-slate-400 font-normal leading-relaxed">
                Despliegue instancias dedicadas del ecosistema VOUT, integre hardware fiscal en Retail,
                conecte pipelines logísticos o solicite una consultoría técnica directamente con Agustín Milesi.
              </p>
            </div>

            {/* Direct Channels Card */}
            <div className="p-5 rounded-2xl bg-[#121824] border border-[#1E293B] space-y-4 shadow-sm">
              <h2 className="text-xs font-bold uppercase tracking-widest text-[#94A3B8]">
                Canales de Comunicación Verificados
              </h2>

              <div className="space-y-2.5 text-xs">
                <a
                  href="mailto:agusmilesi2002@gmail.com"
                  className="flex items-center justify-between p-3 rounded-xl bg-[#0D121B] border border-[#1E293B] hover:border-[#334155] transition group text-slate-300 hover:text-white"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="size-7 rounded-lg bg-[#121824] border border-[#1E293B] text-[#C6F827] flex items-center justify-center font-bold text-xs">
                      ✉
                    </span>
                    <div>
                      <p className="font-bold text-white">Email Primario</p>
                      <p className="text-[11px] text-slate-400 font-mono">agusmilesi2002@gmail.com</p>
                    </div>
                  </div>
                  <span className="text-[10px] text-[#C6F827] font-mono group-hover:translate-x-0.5 transition-transform">
                    Enviar →
                  </span>
                </a>

                <a
                  href="https://www.linkedin.com/in/agustin-milesi-1982281b6/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-[#0D121B] border border-[#1E293B] hover:border-[#334155] transition group text-slate-300 hover:text-white"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="size-7 rounded-lg bg-[#121824] border border-[#1E293B] text-[#C6F827] flex items-center justify-center font-bold text-xs">
                      in
                    </span>
                    <div>
                      <p className="font-bold text-white">LinkedIn Profesional</p>
                      <p className="text-[11px] text-slate-400">Agustín Milesi</p>
                    </div>
                  </div>
                  <span className="text-[10px] text-[#C6F827] font-mono group-hover:translate-x-0.5 transition-transform">
                    Conectar →
                  </span>
                </a>

                <a
                  href="https://github.com/AgustinMilesi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-[#0D121B] border border-[#1E293B] hover:border-[#334155] transition group text-slate-300 hover:text-white"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="size-7 rounded-lg bg-[#121824] border border-[#1E293B] text-[#C6F827] flex items-center justify-center font-bold text-xs">
                      ⚡
                    </span>
                    <div>
                      <p className="font-bold text-white">Código &amp; Repositorios</p>
                      <p className="text-[11px] text-slate-400 font-mono">github.com/AgustinMilesi</p>
                    </div>
                  </div>
                  <span className="text-[10px] text-[#C6F827] font-mono group-hover:translate-x-0.5 transition-transform">
                    Explorar →
                  </span>
                </a>
              </div>
            </div>

            {/* Ecosystem Node Telemetry */}
            <div className="p-4 rounded-2xl bg-[#0D121B] border border-[#1E293B] text-xs space-y-2">
              <div className="flex items-center justify-between text-slate-400">
                <span className="font-mono text-[11px]">Nodos Activos del Ecosistema</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1.5 text-[11px]">
                  <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Operativos
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2 pt-1 font-mono text-[10px]">
                <a
                  href="https://milesi-erp.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-[#121824] border border-[#1E293B] hover:border-[#C6F827] text-center text-slate-300 hover:text-white transition"
                >
                  vout/retail
                </a>
                <a
                  href="https://cargo-am.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-[#121824] border border-[#1E293B] hover:border-[#C6F827] text-center text-slate-300 hover:text-white transition"
                >
                  vout/cargo
                </a>
                <a
                  href="https://vout-web.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-[#121824] border border-[#1E293B] hover:border-[#C6F827] text-center text-slate-300 hover:text-white transition"
                >
                  vout/pocket
                </a>
              </div>
            </div>
          </div>

          {/* Right Column (7/12): The Contact Form Card */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-3xl bg-[#121824] border border-[#1E293B] shadow-2xl space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#1E293B]">
                <div>
                  <h2 className="font-black text-lg text-white">Transmisión de Mensaje</h2>
                  <p className="text-xs text-slate-400">Ingreso directo a la base de datos de VOUT Inbox</p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 rounded-xl bg-[#0A0E14] border border-[#1E293B] text-[11px] font-mono text-slate-400">
                  <span className="size-1.5 rounded-full bg-[#C6F827]" />
                  <span>Cifrado TLS 1.3</span>
                </div>
              </div>

              <ContactForm />
            </div>
          </div>
        </div>
      </div>

      {/* 3. Footer */}
      <footer className="w-full max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400 pt-6 border-t border-[#1E293B]">
        <p>© {new Date().getFullYear()} VOUT Inbox · Managed Cloud CRM &amp; Communications Hub.</p>
        <div className="flex items-center gap-5">
          <Link href="/legal" className="hover:text-[#C6F827] transition">
            Términos &amp; Condiciones
          </Link>
          <Link href="/legal" className="hover:text-[#C6F827] transition">
            Privacidad &amp; Datos
          </Link>
          <Link href="/" className="hover:text-white transition">
            ← Volver al Inicio
          </Link>
        </div>
      </footer>
    </main>
  );
}
