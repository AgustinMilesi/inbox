import Link from "next/link";
import { PreferencesBlock } from "@/components/PreferencesBlock";
import { PreferencesControls } from "@/components/PreferencesControls";
import { ui } from "@/components/ui";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col justify-between p-4 sm:p-8 lg:p-12 relative overflow-hidden animate-smooth-in">
      {/* 1. Header Superior */}
      <header className="w-full max-w-7xl mx-auto flex items-center justify-between pb-6 border-b border-[#EAE9F6]">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="size-10 rounded-2xl bg-gradient-to-br from-[#6852F6] to-[#5538EA] flex items-center justify-center text-white font-black text-sm shadow-[0_4px_12px_rgba(85,56,234,0.35)]">
            S
          </div>
          <div>
            <span className="font-bold tracking-tight text-base text-[#18182E] block leading-none">
              Contact SaaS
            </span>
            <span className="text-xs text-[#72729A] font-medium">Customer CRM &amp; Inbox</span>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          <PreferencesControls />
          <Link
            href="/login"
            className="hidden sm:inline-flex px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#5E48E8] hover:bg-[#F3F2FD] rounded-xl border border-[#EAE9F6] transition"
          >
            Sign in
          </Link>
          <Link href="/register" className={ui.button}>
            Get Started
          </Link>
        </div>
      </header>

      {/* 2. Hero Headline & Live Preview */}
      <div className="w-full max-w-7xl mx-auto my-auto py-10 space-y-12">
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          {/* Left Hero Text */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[#EAE9F6] shadow-xs text-xs font-bold text-[#5E48E8]">
              <span className="size-2 rounded-full bg-[#5E48E8] animate-pulse" />
              <span>Claymorphism Design System</span>
            </div>

            <div>
              <h1 className="text-4xl sm:text-5xl font-light text-[#64748B] leading-tight">
                Every message
              </h1>
              <h1 className="text-4xl sm:text-5xl font-light text-[#64748B] leading-tight">
                from your clients,
              </h1>
              <h1 className="text-4xl sm:text-5xl font-black text-[#5E48E8] leading-tight">
                in one tactile inbox.
              </h1>
            </div>

            <p className="text-base text-[#72729A] leading-relaxed">
              Capture leads from embeddable forms, triage incoming questions in real-time,
              and connect customer contacts directly with your Milesi ERP workspace.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link href="/register" className={ui.button}>
                Create Free Workspace
              </Link>
              <Link href="/login" className={ui.ghost}>
                Sign in to Console →
              </Link>
            </div>
          </div>

          {/* Right Hero: Exact Claymorphism Dashboard UI (from user design) */}
          <div className="lg:col-span-7">
            <div className="clay-card p-5 sm:p-7 rounded-3xl relative overflow-hidden shadow-[0_24px_50px_-12px_rgba(94,72,232,0.15)] border border-[#EAE9F6]">
              {/* Top Bar of the Dashboard Mockup */}
              <div className="flex items-center justify-between pb-5 border-b border-[#EAE9F6] mb-5">
                <div className="flex items-center gap-2.5">
                  <div className="size-8 rounded-xl bg-gradient-to-br from-[#6852F6] to-[#5538EA] flex items-center justify-center text-white shadow-xs">
                    <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-4l-2 3H10l-2-3H4" />
                    </svg>
                  </div>
                  <span className="font-black text-sm text-[#18182E]">Customer CRM · Inbox Overview</span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#F8F9FE] border border-[#EAE9F6] text-xs text-[#72729A]">
                    <svg className="size-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <circle cx="11" cy="11" r="8" strokeWidth="2" />
                      <line x1="21" y1="21" x2="16.65" y2="16.65" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                    <span>Search messages, contacts...</span>
                  </div>
                  <span className="px-2.5 py-1 rounded-xl bg-[#F8F9FE] border border-[#EAE9F6] text-[11px] font-bold text-[#5E48E8] flex items-center gap-1.5">
                    <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Live Workspace
                  </span>
                </div>
              </div>

              {/* Grid with Floating Purple Card, Trend Curve, and Efficiency */}
              <div className="grid sm:grid-cols-12 gap-4 items-stretch">
                {/* Floating Signature Purple Card (Span 7) */}
                <div className="sm:col-span-7 clay-card-purple p-5 rounded-2xl relative overflow-hidden flex flex-col justify-between shadow-[0_16px_36px_-6px_rgba(85,56,234,0.45)]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="size-6 rounded-full bg-white/20 flex items-center justify-center">
                        <svg className="size-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                      </div>
                      <span className="text-xs font-mono tracking-wider text-white/90">workspace: am-support</span>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-white/90 bg-white/15 px-2 py-0.5 rounded-full border border-white/20">
                      Team Pro
                    </span>
                  </div>

                  <div className="my-5">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-white/70">Total Customer Inquiries</p>
                    <p className="text-3xl font-black text-white tracking-tight">1,842</p>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-white/80 pt-2 border-t border-white/20">
                    <div>
                      <span className="block text-[9px] uppercase tracking-wider text-white/60">Workspace Admin</span>
                      <span className="font-bold">Agustín Milesi</span>
                    </div>
                    <div>
                      <span className="block text-[9px] uppercase tracking-wider text-white/60">Avg First Response</span>
                      <span className="font-bold text-emerald-300">⚡ 4m 12s</span>
                    </div>
                  </div>
                </div>

                {/* Resolution Gauge Card (Span 5) */}
                <div className="sm:col-span-5 clay-card p-5 rounded-2xl flex flex-col items-center justify-between bg-white border border-[#EAE9F6]">
                  <div className="w-full flex items-center justify-between">
                    <span className="text-xs font-bold text-[#18182E]">Resolution Rate</span>
                    <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded-full border border-emerald-200">+12%</span>
                  </div>

                  {/* SVG Circular Progress Ring */}
                  <div className="relative size-24 my-2 flex items-center justify-center">
                    <svg className="size-full -rotate-90" viewBox="0 0 36 36">
                      <path
                        className="text-[#EEF0FA]"
                        strokeWidth="3.5"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        className="text-[#5E48E8]"
                        strokeDasharray="94, 100"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                    <div className="absolute flex flex-col items-center justify-center">
                      <span className="text-base font-black text-[#18182E]">94%</span>
                      <span className="text-[9px] font-bold text-[#5E48E8] bg-[#EEF0FA] px-1.5 py-0.5 rounded-full">Resolved</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-[10px] text-[#72729A]">
                    <span className="flex items-center gap-1">
                      <span className="size-2 rounded-full bg-[#5E48E8]" /> Closed (1.7k)
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="size-2 rounded-full bg-[#E2E1F4]" /> Open (112)
                    </span>
                  </div>
                </div>

                {/* Inbound Message Flow Wave Card (Span 7) */}
                <div className="sm:col-span-7 clay-card p-5 rounded-2xl bg-white border border-[#EAE9F6] space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-[#18182E] block">Inbound Message Flow</span>
                      <span className="text-[10px] text-[#72729A]">Weekly lead & contact velocity</span>
                    </div>
                    <span className="text-[11px] font-bold text-[#5E48E8]">Avg 142 / day</span>
                  </div>

                  {/* Vector Wave Graph */}
                  <div className="h-20 w-full pt-2">
                    <svg className="w-full h-full overflow-visible" viewBox="0 0 200 60" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="gradientWave" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#6852F6" stopOpacity="0.3" />
                          <stop offset="100%" stopColor="#6852F6" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M0 45 Q 30 50, 60 25 T 120 15 T 160 35 T 200 10 L 200 60 L 0 60 Z"
                        fill="url(#gradientWave)"
                      />
                      <path
                        d="M0 45 Q 30 50, 60 25 T 120 15 T 160 35 T 200 10"
                        fill="none"
                        stroke="#6852F6"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>

                  <div className="flex justify-between text-[10px] text-[#72729A] font-medium pt-1">
                    <span>Week 1</span>
                    <span>Week 2</span>
                    <span>Week 3</span>
                    <span>Week 4</span>
                  </div>
                </div>

                {/* Recent Inbound Leads Mini List (Span 5) */}
                <div className="sm:col-span-5 clay-card p-5 rounded-2xl bg-white border border-[#EAE9F6] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#18182E] block">Recent Inbound Leads</span>
                    <span className="text-[10px] text-[#5E48E8] font-bold">Inbox (8 unread)</span>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between p-2 rounded-xl bg-[#F8F9FE] border border-[#EAE9F6]">
                      <div className="flex items-center gap-2">
                        <span className="size-6 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-[10px]">
                          ✉
                        </span>
                        <div>
                          <p className="font-bold text-[#18182E] text-[11px]">Philip Kelley</p>
                          <p className="text-[9px] text-[#72729A]">Sales inquiry · Web Form</p>
                        </div>
                      </div>
                      <span className="font-bold text-emerald-600 text-[10px] bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">New</span>
                    </div>

                    <div className="flex items-center justify-between p-2 rounded-xl bg-[#F8F9FE] border border-[#EAE9F6]">
                      <div className="flex items-center gap-2">
                        <span className="size-6 rounded-lg bg-[#EEF0FA] text-[#5E48E8] flex items-center justify-center font-bold text-[10px]">
                          ⚡
                        </span>
                        <div>
                          <p className="font-bold text-[#18182E] text-[11px]">ERP Bridge Sync</p>
                          <p className="text-[9px] text-[#72729A]">Acme Corp · Customer #1042</p>
                        </div>
                      </div>
                      <span className="font-bold text-[#5E48E8] text-[10px] bg-white px-2 py-0.5 rounded-full border border-[#EAE9F6]">Synced</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Dedicated Preferences Block (Color, Mode, Language) directly on the Landing Page */}
        <section className="pt-4">
          <PreferencesBlock />
        </section>
      </div>

      {/* 4. Footer */}
      <footer className="w-full max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs text-[#72729A] pt-6 border-t border-[#EAE9F6]">
        <p>© 2026 Contact SaaS · Unified Claymorphism CRM &amp; Messages.</p>
        <div className="flex items-center gap-4">
          <a href="https://milesi-erp.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-[#5E48E8] transition font-medium">
            Milesi ERP ↗
          </a>
          <a href="https://agustinmilesi-contact.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-[#5E48E8] transition font-medium">
            Agustín Milesi ↗
          </a>
        </div>
      </footer>
    </main>
  );
}
