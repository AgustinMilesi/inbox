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
          <div className="w-full border-t border-[#E2E1F4]" />
        </div>
        <div className="relative flex justify-center text-[11px] uppercase tracking-wider">
          <span className="bg-[#EEF0FA] px-3 font-bold text-[#72729A] select-none">
            {mode === "login" ? "Or sign in with" : "Or create with"}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2.5">
        <a
          href="/api/auth/oauth/google"
          title="Sign in with Google"
          className="clay-card group flex items-center justify-center gap-2 py-2.5 px-3 rounded-2xl bg-white hover:bg-[#F8F9FE] border border-[#EAE9F6] text-xs font-semibold text-[#18182E] shadow-xs hover:shadow-md hover:-translate-y-0.5 active:scale-95 transition-all duration-200 cursor-pointer"
        >
          <GoogleIcon className="size-4 shrink-0" />
          <span className="font-medium">Google</span>
        </a>

        <a
          href="/api/auth/oauth/apple"
          title="Sign in with Apple (iPhone)"
          className="clay-card group flex items-center justify-center gap-2 py-2.5 px-3 rounded-2xl bg-white hover:bg-[#F8F9FE] border border-[#EAE9F6] text-xs font-semibold text-[#18182E] shadow-xs hover:shadow-md hover:-translate-y-0.5 active:scale-95 transition-all duration-200 cursor-pointer"
        >
          <AppleIcon className="size-4 shrink-0 text-black" />
          <span className="font-medium">Apple</span>
        </a>

        <a
          href="/api/auth/oauth/microsoft"
          title="Sign in with Outlook / Microsoft"
          className="clay-card group flex items-center justify-center gap-2 py-2.5 px-3 rounded-2xl bg-white hover:bg-[#F8F9FE] border border-[#EAE9F6] text-xs font-semibold text-[#18182E] shadow-xs hover:shadow-md hover:-translate-y-0.5 active:scale-95 transition-all duration-200 cursor-pointer"
        >
          <OutlookIcon className="size-4 shrink-0" />
          <span className="font-medium">Outlook</span>
        </a>
      </div>
    </div>
  );
}
