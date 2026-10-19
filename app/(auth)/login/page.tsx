import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { AuthShell } from "@/components/AuthShell";
import { LoginForm } from "@/components/auth-forms";
import { getSession } from "@/lib/auth/session";

export const metadata: Metadata = { title: "Sign in" };

export default async function LoginPage() {
  if (await getSession()) redirect("/app");
  return (
    <AuthShell
      light={["Good to", "see you again."]}
      bold="Sign in."
      side={
        <p>
          New here?{" "}
          <Link href="/register" className="text-[#5E48E8] hover:text-[#4A2FE0] font-bold transition">
            Create an account
          </Link>
          .
        </p>
      }
    >
      {/* Guest Access for Recruiters & Testing */}
      <div className="mb-6 p-4 rounded-2xl bg-gradient-to-br from-[#6852F6]/10 to-[#5538EA]/5 border border-[#6852F6]/25 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-[#5E48E8] uppercase tracking-wider flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-[#5E48E8] animate-pulse" />
            Acceso para Reclutadores
          </span>
          <span className="text-[10px] font-black bg-[#5E48E8]/15 text-[#5E48E8] px-2.5 py-0.5 rounded-full border border-[#5E48E8]/20">
            1-CLICK DEMO
          </span>
        </div>
        <p className="text-xs text-[#72729A] leading-relaxed">
          Explorá la bandeja de entrada, formularios embebibles y gestión de clientes sin necesidad de registrarte.
        </p>
        <Link
          href="/demo"
          className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#6852F6] to-[#5538EA] hover:from-[#5A43EE] hover:to-[#4A2FE0] text-white font-black text-sm text-center block transition shadow-md shadow-[#5E48E8]/20"
        >
          🚀 Entrar como Invitado (Modo Demo) →
        </Link>
      </div>

      <div className="relative flex items-center justify-center my-4">
        <div className="border-t border-[#EAE9F6] w-full" />
        <span className="bg-[#FAF9FF] px-3 text-[11px] text-[#72729A] uppercase tracking-widest font-semibold shrink-0">
          o con tus credenciales
        </span>
        <div className="border-t border-[#EAE9F6] w-full" />
      </div>

      <LoginForm />
    </AuthShell>
  );
}
