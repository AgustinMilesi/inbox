"use client";

import { useState } from "react";
import Link from "next/link";
import { ContactForm } from "./ContactForm";
import { ui } from "./ui";

export function HomeViews() {
  const [activeTab, setActiveTab] = useState<"platform" | "contact">("platform");

  return (
    <div className="space-y-8">
      {/* View Mode Toggle: Two Pages in One */}
      <div className="flex items-center justify-center">
        <div className="inline-flex p-1.5 rounded-2xl bg-[#121824] border border-[#1E293B] shadow-inner gap-1">
          <button
            type="button"
            onClick={() => setActiveTab("platform")}
            className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === "platform"
                ? "bg-[#C6F827] text-[#0A0E14] shadow-sm -translate-y-0.5"
                : "text-slate-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <span>⚡ 01 · Consola &amp; Plataforma SaaS</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("contact")}
            className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === "contact"
                ? "bg-[#C6F827] text-[#0A0E14] shadow-sm -translate-y-0.5"
                : "text-slate-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <span>✉ 02 · Portal de Contacto Directo</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Platform & SaaS Console */}
      {activeTab === "platform" ? (
        <div className="grid lg:grid-cols-12 gap-8 items-center animate-smooth-in">
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
              Captura consultas desde formularios web integrables, clasifica mensajes en tiempo real,
              recibe prospectos institucionales y sincroniza contactos directamente con el ecosistema VOUT.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                href="/demo"
                className="px-6 py-3.5 rounded-2xl bg-[var(--primary-accent)] text-[var(--primary-accent-text)] font-black text-sm shadow-sm hover:shadow-md hover:-translate-y-0.5 transition flex items-center gap-2 group hover:opacity-95"
              >
                <span>🚀 Live Demo →</span>
              </Link>
              <button
                type="button"
                onClick={() => setActiveTab("contact")}
                className="px-5 py-3.5 rounded-2xl bg-[#121824] text-white border border-[#1E293B] hover:border-[#C6F827] text-sm font-bold transition cursor-pointer"
              >
                Enviar Consulta Directa →
              </button>
              <Link href="/login" className={ui.ghost}>
                Acceder a Consola
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

                {/* Recent Inbound Leads Mini List */}
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
      ) : (
        /* Tab 2: Sovereign Direct Contact Portal */
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start animate-smooth-in">
          {/* Left Column (5/12): Identity & Channels */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider bg-[#121824] text-[#C6F827] border border-[#1E293B]">
                <span className="size-2 rounded-full bg-[#C6F827]" />
                <span>Canal Institucional Unificado</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight">
                Enlace Directo con <span className="text-[#C6F827]">Agustín Milesi</span>.
              </h2>
              <p className="text-sm text-slate-400 font-normal leading-relaxed">
                Envía tus requerimientos técnicos, pedidos de integración para VOUT Retail o consultas sobre
                despliegues cloud. Las transmisiones ingresan en tiempo real a la base de datos de VOUT Inbox.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#121824] border border-[#1E293B] space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#94A3B8] block">
                Canales Verificados
              </span>
              <div className="space-y-2 text-xs">
                <a
                  href="mailto:agusmilesi2002@gmail.com"
                  className="flex items-center justify-between p-2.5 rounded-xl bg-[#0D121B] border border-[#1E293B] hover:border-[#334155] text-slate-300 hover:text-white transition"
                >
                  <span className="font-bold">agusmilesi2002@gmail.com</span>
                  <span className="text-[10px] text-[#C6F827] font-mono">[Email Directo]</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/agustin-milesi-1982281b6/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2.5 rounded-xl bg-[#0D121B] border border-[#1E293B] hover:border-[#334155] text-slate-300 hover:text-white transition"
                >
                  <span className="font-bold">LinkedIn · Agustín Milesi</span>
                  <span className="text-[10px] text-[#C6F827] font-mono">[Perfil]</span>
                </a>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href="/contact"
                className="text-xs text-[#C6F827] hover:underline font-bold flex items-center gap-1"
              >
                <span>Abrir en página completa dedicada (/contact)</span>
                <span>→</span>
              </Link>
            </div>
          </div>

          {/* Right Column (7/12): Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-3xl bg-[#121824] border border-[#1E293B] shadow-2xl space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#1E293B]">
                <div>
                  <h3 className="font-black text-lg text-white">Transmisión de Mensaje</h3>
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
      )}
    </div>
  );
}
