"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { contactSchema, type ContactInput } from "@/lib/contact-schema";

const INQUIRY_SCOPES = [
  { id: "enterprise", label: "Enterprise Cloud", preset: "Despliegue Enterprise & Arquitectura Cloud Dedicada" },
  { id: "retail", label: "VOUT Retail (POS)", preset: "Integración de Punto de Venta, Hardware Fiscal & Stock" },
  { id: "inbox", label: "VOUT Inbox (CRM)", preset: "Pipeline Unificado de Clientes & Webhooks HMAC-SHA256" },
  { id: "cargo", label: "VOUT Cargo (Logística)", preset: "Operaciones de Carga Internacional & Rastreo Aduanero" },
  { id: "pocket", label: "VOUT Pocket & Web", preset: "Finanzas Personales, Sincronización Nube & App Android" },
  { id: "custom", label: "Auditoría de Software", preset: "Auditoría de Arquitectura Full-Stack & Consultoría Técnica" },
];

export function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [selectedScope, setSelectedScope] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<ContactInput>({ resolver: zodResolver(contactSchema) });

  const messageVal = watch("message", "");

  const handleSelectScope = (scope: (typeof INQUIRY_SCOPES)[0]) => {
    setSelectedScope(scope.id);
    setValue("subject", scope.preset, { shouldValidate: true });
    toast.info(`Alcance configurado: ${scope.label}`);
  };

  const copyInboundEmail = async () => {
    try {
      await navigator.clipboard.writeText("agusmilesi2002@gmail.com");
      setCopiedEmail(true);
      toast.success("Canal directo copiado: agusmilesi2002@gmail.com");
      setTimeout(() => setCopiedEmail(false), 3000);
    } catch {
      toast.error("No se pudo copiar al portapapeles");
    }
  };

  const onSubmit = async (data: ContactInput) => {
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.status === 429) {
        toast.error("Límite de seguridad temporal. Por favor espere 60 segundos antes de reenviar.");
        return;
      }

      if (!res.ok) throw new Error();

      toast.success("Transmisión recibida. Su mensaje fue ingresado directamente a la bandeja de VOUT Inbox.");
      reset();
      setSelectedScope(null);
    } catch {
      toast.error("No se pudo enviar el mensaje. Verifique su conexión y reintente.");
    } finally {
      setLoading(false);
    }
  };

  const labelClass =
    "block text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400 mb-1.5 flex items-center justify-between";
  const inputClass =
    "w-full bg-[#0D121B] border border-[#1E293B] rounded-2xl px-4 py-3 text-sm font-medium text-white placeholder:text-slate-500 outline-none transition-colors duration-150 focus:border-[#C6F827] focus:ring-1 focus:ring-[#C6F827]";

  return (
    <div className="w-full space-y-8">
      {/* Scope Selector Chips */}
      <div>
        <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400 mb-2.5">
          1. Seleccione el Alcance Técnico del Requerimiento
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {INQUIRY_SCOPES.map((scope) => {
            const isSelected = selectedScope === scope.id;
            return (
              <button
                key={scope.id}
                type="button"
                onClick={() => handleSelectScope(scope)}
                className={`px-3 py-2.5 rounded-xl text-left border text-xs font-bold transition flex items-center justify-between group cursor-pointer ${
                  isSelected
                    ? "bg-[#C6F827] text-[#0A0E14] border-[#C6F827] shadow-sm font-black"
                    : "bg-[#0D121B] text-slate-300 border-[#1E293B] hover:border-[#334155] hover:text-white"
                }`}
              >
                <span className="truncate">{scope.label}</span>
                <span
                  className={`size-1.5 rounded-full shrink-0 ml-1.5 ${
                    isSelected ? "bg-[#0A0E14]" : "bg-[#1E293B] group-hover:bg-[#C6F827]"
                  }`}
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Submission Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Honeypot field (hidden from genuine users) */}
        <input
          type="text"
          {...register("website")}
          tabIndex={-1}
          autoComplete="off"
          className="opacity-0 absolute -z-10 h-0 w-0 pointer-events-none"
          aria-hidden="true"
        />

        {/* Identity Inputs Grid */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass} htmlFor="contact-name">
              <span>Nombre y Apellido</span>
              {errors.name && <span className="text-red-400 normal-case font-normal">{errors.name.message}</span>}
            </label>
            <input
              id="contact-name"
              type="text"
              placeholder="Ej. Martín Rodríguez"
              {...register("name")}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass} htmlFor="contact-email">
              <span>Email Corporativo / Personal</span>
              {errors.email && <span className="text-red-400 normal-case font-normal">{errors.email.message}</span>}
            </label>
            <input
              id="contact-email"
              type="email"
              placeholder="nombre@empresa.com"
              {...register("email")}
              className={inputClass}
            />
          </div>
        </div>

        {/* Subject Input */}
        <div>
          <label className={labelClass} htmlFor="contact-subject">
            <span>Asunto de la Transmisión</span>
            {errors.subject && <span className="text-red-400 normal-case font-normal">{errors.subject.message}</span>}
          </label>
          <input
            id="contact-subject"
            type="text"
            placeholder="Ej. Integración de VOUT Inbox con infraestructura existente"
            {...register("subject")}
            className={inputClass}
          />
        </div>

        {/* Message Input */}
        <div>
          <label className={labelClass} htmlFor="contact-message">
            <span>Mensaje &amp; Especificaciones Técnicas</span>
            <span className="text-[10px] text-slate-500 font-mono">
              {messageVal.length} / 5000 caracteres
            </span>
          </label>
          <textarea
            id="contact-message"
            rows={5}
            placeholder="Describa el objetivo de su proyecto, tiempos estimados, volúmenes de transacción o consultas que desea resolver..."
            {...register("message")}
            className={`${inputClass} resize-y min-h-[120px]`}
          />
          {errors.message && (
            <p className="text-xs text-red-400 mt-1">{errors.message.message}</p>
          )}
        </div>

        {/* Action Row */}
        <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <button
            type="button"
            onClick={copyInboundEmail}
            className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white transition group py-1.5 px-3 rounded-xl bg-[#0D121B] border border-[#1E293B] cursor-pointer"
          >
            <span className="size-2 rounded-full bg-emerald-400" />
            <span>agusmilesi2002@gmail.com</span>
            <span className="text-[10px] text-[#C6F827] uppercase tracking-wider font-bold ml-1 group-hover:underline">
              {copiedEmail ? "¡Copiado!" : "[Copiar]"}
            </span>
          </button>

          <button
            type="submit"
            disabled={loading}
            className="px-8 py-3.5 rounded-2xl bg-[#C6F827] text-[#0A0E14] font-black text-xs uppercase tracking-wider shadow-sm hover:shadow-md hover:bg-[#bcf020] active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {loading ? (
              <>
                <svg className="animate-spin size-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                </svg>
                <span>Procesando Envío...</span>
              </>
            ) : (
              <>
                <span>Despachar Mensaje Directo</span>
                <span className="text-base leading-none">→</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
