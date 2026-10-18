"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";
import { toast } from "sonner";

function NoticeContent() {
  const searchParams = useSearchParams();
  const oauthError = searchParams.get("oauth_error");
  const provider = searchParams.get("provider");

  const providerName =
    provider === "google"
      ? "Google"
      : provider === "apple"
      ? "Apple ID (iPhone)"
      : provider === "microsoft"
      ? "Outlook / Microsoft"
      : "OAuth";

  let message: string | null = null;

  if (oauthError === "not_configured") {
    message = `${providerName} sign-in is not configured yet on this instance. Please set the required environment variables.`;
  } else if (oauthError === "invalid_state") {
    message = "Your authentication session timed out. Please try again.";
  } else if (oauthError === "access_denied") {
    message = `Authentication with ${providerName} was cancelled.`;
  } else if (oauthError === "no_email") {
    message = `${providerName} did not return an email address. Please make sure email sharing is approved.`;
  } else if (oauthError) {
    message = `Could not sign in with ${providerName} (${oauthError}). Please try again or use email.`;
  }

  useEffect(() => {
    if (message) {
      toast.error(message);
    }
  }, [message]);

  if (!message) return null;

  return (
    <div className="p-3.5 mb-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-700 text-xs font-medium flex items-start gap-2.5 animate-smooth-in">
      <span className="text-base leading-none">⚠️</span>
      <div className="flex-1">{message}</div>
    </div>
  );
}

export function OAuthErrorNotice() {
  return (
    <Suspense fallback={null}>
      <NoticeContent />
    </Suspense>
  );
}
