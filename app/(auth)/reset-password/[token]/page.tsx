import type { Metadata } from "next";
import { AuthShell } from "@/components/AuthShell";
import { ResetForm } from "@/components/auth-forms";

export const metadata: Metadata = { title: "Choose a new password", robots: { index: false } };

export default async function ResetPasswordPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  return (
    <AuthShell
      light={["Pick something", "new."]}
      bold="New password."
      side={<p>Once it&apos;s saved, every open session is closed and you&apos;ll sign in again.</p>}
    >
      <ResetForm token={token} />
    </AuthShell>
  );
}
