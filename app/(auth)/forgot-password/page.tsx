import type { Metadata } from "next";
import Link from "next/link";
import { AuthShell } from "@/components/AuthShell";
import { ForgotForm } from "@/components/auth-forms";

export const metadata: Metadata = { title: "Forgot your password" };

export default function ForgotPasswordPage() {
  return (
    <AuthShell
      light={["It happens to", "everyone."]}
      bold="Reset password."
      side={
        <>
          <p>Type your email and we&apos;ll send you a link that works for one hour.</p>
          <p>
            <Link href="/login" className="text-[#5E48E8] hover:text-[#4A2FE0] font-bold transition">
              Back to sign in
            </Link>
          </p>
        </>
      }
    >
      <ForgotForm />
    </AuthShell>
  );
}
