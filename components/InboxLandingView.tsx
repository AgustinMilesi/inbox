"use client";

import Link from "next/link";
import { usePreferences } from "@/components/PreferencesProvider";
import { PreferencesControls } from "@/components/PreferencesControls";
import { PreferencesBlock } from "@/components/PreferencesBlock";
import { ContactForm } from "@/components/ContactForm";
import { ui } from "@/components/ui";

export function InboxLandingView() {
  const { t, locale } = usePreferences();

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
            <a href="#plataforma" className="px-3 py-1.5 rounded-lg text-white hover:bg-white/5 transition">
              {t.navPlatform}
            </a>
            <a
              href="#contacto"
              className="px-3 py-1.5 rounded-lg text-[#C6F827] hover:bg-[#C6F827]/10 transition flex items-center gap-1.5"
            >
              <span className="size-1.5 rounded-full bg-[#C6F827] animate-pulse" />
              {t.navContact}
            </a>
          </nav>
          <PreferencesControls />
          <Link
            href="/login"
            className="hidden sm:inline-flex px-4 py-2 text-xs font-bold uppercase tracking-wider text-[var(--primary-accent)] hover:bg-[var(--primary-accent)]/10 rounded-xl border border-[#1E293B] transition"
          >
            {t.navLogin}
          </Link>
          <Link href="/register" className={ui.button}>
            {t.navStart}
          </Link>
        </div>
      </header>

      {/* 2. Main Content Stream: Both Pages Unified in One */}
      <div className="w-full max-w-7xl mx-auto my-auto py-10 space-y-20">
        {/* SECTION A: Inbox SaaS Platform & Console */}
        <section id="plataforma" className="grid lg:grid-cols-12 gap-8 items-center pt-2">
          {/* Left Hero Text */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#121824] border border-[#1E293B] shadow-xs text-xs font-bold text-[var(--primary-accent)]">
              <span className="size-2 rounded-full bg-[var(--primary-accent)] animate-pulse" />
              <span>{t.heroSla}</span>
            </div>

            <div>
              <h1 className="text-4xl sm:text-5xl font-light text-slate-400 leading-tight">
                {t.heroH1A}
              </h1>
              <h1 className="text-4xl sm:text-5xl font-light text-slate-400 leading-tight">
                {t.heroH1B}
              </h1>
              <h1 className="text-4xl sm:text-5xl font-black text-[var(--primary-accent)] leading-tight">
                {t.heroH1C}
              </h1>
            </div>

            <p className="text-base text-slate-400 leading-relaxed">
              {t.heroDesc}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                href="/demo"
                prefetch={false}
                className="px-6 py-3.5 rounded-2xl bg-[var(--primary-accent)] text-[var(--primary-accent-text)] font-black text-sm shadow-sm hover:shadow-md hover:-translate-y-0.5 transition flex items-center gap-2 group hover:opacity-95"
              >
                <span>{t.heroGuestDemo}</span>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-black/20 dark:bg-white/20 px-2 py-0.5 rounded-full">
                  {t.heroDemoBadge}
                </span>
              </Link>
              <a
                href="#contacto"
                className="px-5 py-3.5 rounded-2xl bg-[#121824] text-white border border-[#1E293B] hover:border-[#C6F827] text-sm font-bold transition flex items-center gap-2"
              >
                <span>{t.heroContactBtn}</span>
                <span className="text-[#C6F827]">↓</span>
              </a>
              <Link href="/login" className={ui.ghost}>
                {t.heroConsoleBtn}
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
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2.2"
                        d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-4l-2 3H10l-2-3H4"
                      />
                    </svg>
                  </div>
                  <span className="font-bold text-sm text-white">{t.mockupTitle}</span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#0A0E14] border border-[#1E293B] text-xs text-slate-400">
                    <span className="size-2 rounded-full bg-emerald-400" />
                    <span>{t.mockupCloudActive}</span>
                  </div>
                </div>
              </div>

              {/* Sub-cards */}
              <div className="grid sm:grid-cols-12 gap-4">
                <div className="sm:col-span-7 p-5 rounded-2xl bg-[#0D121B] border border-[#1E293B] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white block">{t.mockupFlow}</span>
                    <span className="text-[11px] font-bold text-[var(--primary-accent)]">{t.mockupAvg}</span>
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
                    <span>{t.mockupWeek1}</span>
                    <span>{t.mockupWeek2}</span>
                    <span>{t.mockupWeek3}</span>
                    <span>{t.mockupWeek4}</span>
                  </div>
                </div>

                {/* Recent Inbound Leads Mini List */}
                <div className="sm:col-span-5 p-5 rounded-2xl bg-[#0D121B] border border-[#1E293B] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white block">{t.mockupLeads}</span>
                    <span className="text-[10px] text-[var(--primary-accent)] font-bold">{t.mockupUnread}</span>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between p-2 rounded-xl bg-[#121824] border border-[#1E293B]">
                      <div className="flex items-center gap-2">
                        <span className="size-6 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold text-[10px]">
                          ✉
                        </span>
                        <div>
                          <p className="font-bold text-white text-[11px]">{t.mockupLead1Title}</p>
                          <p className="text-[9px] text-slate-400">{t.mockupLead1Sub}</p>
                        </div>
                      </div>
                      <span className="font-bold text-emerald-400 text-[10px] bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                        {t.mockupLead1Badge}
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-2 rounded-xl bg-[#121824] border border-[#1E293B]">
                      <div className="flex items-center gap-2">
                        <span className="size-6 rounded-lg bg-[var(--primary-accent)]/10 text-[var(--primary-accent)] flex items-center justify-center font-bold text-[10px]">
                          ⚡
                        </span>
                        <div>
                          <p className="font-bold text-white text-[11px]">{t.mockupLead2Title}</p>
                          <p className="text-[9px] text-slate-400">{t.mockupLead2Sub}</p>
                        </div>
                      </div>
                      <span className="font-bold text-[var(--primary-accent)] text-[10px] bg-[var(--primary-accent)]/10 px-2 py-0.5 rounded-full border border-[var(--primary-accent)]/20">
                        {t.mockupLead2Badge}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION B: Integrated Sovereign Contact Gateway */}
        <section id="contacto" className="pt-8 border-t border-[#1E293B] space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider bg-[#121824] text-[#C6F827] border border-[#1E293B]">
                <span className="size-2 rounded-full bg-[#C6F827] animate-pulse" />
                <span>{t.contactSectionBadge}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight">
                {t.contactSectionTitleA} <span className="text-[#C6F827]">{t.contactSectionTitleB}</span>
              </h2>
              <p className="text-sm text-slate-400 max-w-2xl leading-relaxed">
                {t.contactSectionDesc}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/contact"
                className="px-4 py-2 rounded-xl bg-[#121824] border border-[#1E293B] text-xs font-mono text-[#C6F827] hover:border-[#C6F827] transition"
              >
                {t.contactOpenFull}
              </Link>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            {/* Left 4 Cols: Verified Direct Channels & System Status */}
            <div className="lg:col-span-4 space-y-4">
              <div className="p-5 rounded-2xl bg-[#121824] border border-[#1E293B] space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#94A3B8] block">
                  {t.contactVerifiedChannels}
                </span>
                <div className="space-y-2.5 text-xs">
                  <a
                    href="mailto:agusmilesi2002@gmail.com"
                    className="flex items-center justify-between p-3 rounded-xl bg-[#0D121B] border border-[#1E293B] hover:border-[#334155] text-slate-300 hover:text-white transition group"
                  >
                    <div>
                      <p className="font-bold text-white">{t.contactDirectEmail}</p>
                      <p className="text-[11px] text-slate-400 font-mono">agusmilesi2002@gmail.com</p>
                    </div>
                    <span className="text-[10px] text-[#C6F827] font-mono group-hover:translate-x-0.5 transition-transform">
                      {t.contactSend}
                    </span>
                  </a>

                  <a
                    href="https://www.linkedin.com/in/agustin-milesi-1982281b6/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-xl bg-[#0D121B] border border-[#1E293B] hover:border-[#334155] text-slate-300 hover:text-white transition group"
                  >
                    <div>
                      <p className="font-bold text-white">{t.contactLinkedIn}</p>
                      <p className="text-[11px] text-slate-400">{t.contactLinkedInSub}</p>
                    </div>
                    <span className="text-[10px] text-[#C6F827] font-mono group-hover:translate-x-0.5 transition-transform">
                      {t.contactConnect}
                    </span>
                  </a>

                  <a
                    href="https://github.com/AgustinMilesi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-xl bg-[#0D121B] border border-[#1E293B] hover:border-[#334155] text-slate-300 hover:text-white transition group"
                  >
                    <div>
                      <p className="font-bold text-white">{t.contactCode}</p>
                      <p className="text-[11px] text-slate-400 font-mono">github.com/AgustinMilesi</p>
                    </div>
                    <span className="text-[10px] text-[#C6F827] font-mono group-hover:translate-x-0.5 transition-transform">
                      {t.contactView}
                    </span>
                  </a>
                </div>
              </div>

              {/* Edge Telemetry Badge */}
              <div className="p-4 rounded-2xl bg-[#0D121B] border border-[#1E293B] text-xs font-mono space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">{t.contactGatewayStatus}</span>
                  <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                    <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                    {t.contactStatusActive}
                  </span>
                </div>
                <div className="flex items-center justify-between text-slate-400">
                  <span>{t.contactLatency}</span>
                  <span className="text-white font-bold">&lt; 20ms</span>
                </div>
                <div className="flex items-center justify-between text-slate-400">
                  <span>{t.contactSecurity}</span>
                  <span className="text-[#C6F827]">Honeypot + Zod</span>
                </div>
              </div>
            </div>

            {/* Right 8 Cols: Full Interactive Contact Form */}
            <div className="lg:col-span-8 p-6 sm:p-8 rounded-3xl bg-[#121824] border border-[#1E293B] shadow-2xl space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#1E293B]">
                <div>
                  <h3 className="font-black text-lg text-white">{t.contactFormTitle}</h3>
                  <p className="text-xs text-slate-400">{t.contactFormSub}</p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 rounded-xl bg-[#0A0E14] border border-[#1E293B] text-[11px] font-mono text-slate-400">
                  <span className="size-1.5 rounded-full bg-[#C6F827]" />
                  <span>{t.contactTls}</span>
                </div>
              </div>

              <ContactForm />
            </div>
          </div>
        </section>

        {/* 3. Dedicated Preferences Block */}
        <section className="pt-4 border-t border-[#1E293B]">
          <PreferencesBlock />
        </section>
      </div>

      {/* 4. Footer */}
      <footer className="w-full max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400 pt-6 border-t border-[#1E293B]">
        <p>© {new Date().getFullYear()} VOUT Inbox · {t.footerRights}</p>
        <div className="flex items-center gap-5">
          <a href="#contacto" className="hover:text-[#C6F827] transition font-bold">
            {t.footerPortal}
          </a>
          <Link href="/legal" className="hover:text-[var(--primary-accent)] transition">
            {t.footerTerms}
          </Link>
          <Link href="/legal" className="hover:text-[var(--primary-accent)] transition">
            {t.footerPrivacy}
          </Link>
          <Link href="/legal" className="hover:text-[var(--primary-accent)] transition">
            {t.footerCookies}
          </Link>
        </div>
      </footer>
    </main>
  );
}
