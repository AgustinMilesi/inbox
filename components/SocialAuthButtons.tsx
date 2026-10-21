/* eslint-disable @next/next/no-html-link-for-pages */
"use client";

import { GoogleIcon, AppleIcon, OutlookIcon } from "@/components/SocialIcons";

export function SocialAuthButtons({
  mode = "login",
}: {
  mode?: "login" | "register";
}) {
  return (
    <div className="space-y-4 pt-1">
      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-[#1E293B]" />
        </div>
        <div className="relative flex justify-center text-[11px] uppercase tracking-wider">
          <span className="bg-[#0A0E14] px-3 font-bold text-slate-400 select-none">
            {mode === "login" ? "O ingresá con cuenta VOUT" : "O registrate con cuenta VOUT"}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2.5">
        <a
          href="/api/auth/oauth/google"
          title="Sign in with Google"
          className="group flex items-center justify-center gap-2 py-2.5 px-3 rounded-2xl bg-[#121824] hover:border-[var(--primary-accent)] border border-[#1E293B] text-xs font-semibold text-slate-200 shadow-xs hover:-translate-y-0.5 active:scale-95 transition-all duration-200 cursor-pointer"
        >
          <GoogleIcon className="size-4 shrink-0" />
          <span className="font-medium">Google</span>
        </a>

        <a
          href="/api/auth/oauth/apple"
          title="Sign in with Apple"
          className="group flex items-center justify-center gap-2 py-2.5 px-3 rounded-2xl bg-[#121824] hover:border-[var(--primary-accent)] border border-[#1E293B] text-xs font-semibold text-slate-200 shadow-xs hover:-translate-y-0.5 active:scale-95 transition-all duration-200 cursor-pointer"
        >
          <AppleIcon className="size-4 shrink-0 text-white" />
          <span className="font-medium">Apple</span>
        </a>

        <a
          href="/api/auth/oauth/microsoft"
          title="Sign in with Outlook / Microsoft"
          className="group flex items-center justify-center gap-2 py-2.5 px-3 rounded-2xl bg-[#121824] hover:border-[var(--primary-accent)] border border-[#1E293B] text-xs font-semibold text-slate-200 shadow-xs hover:-translate-y-0.5 active:scale-95 transition-all duration-200 cursor-pointer"
        >
          <OutlookIcon className="size-4 shrink-0" />
          <span className="font-medium">Outlook</span>
        </a>
      </div>
    </div>
  );
}
