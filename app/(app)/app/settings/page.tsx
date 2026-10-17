import type { Metadata } from "next";
import { ActionForm } from "@/components/ActionForm";
import { ApiKeyCreator } from "@/components/ApiKeyCreator";
import { CopyButton } from "@/components/CopyButton";
import { PageTitle } from "@/components/Headline";
import { PreferencesBlock } from "@/components/PreferencesBlock";
import { SubmitButton } from "@/components/SubmitButton";
import { ui } from "@/components/ui";
import { revokeApiKey, rotateWebhookSecret, saveSettings } from "@/app/actions/dashboard";
import { canManage, requireSession } from "@/lib/auth/session";
import { db } from "@/lib/db";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = { title: "Settings" };

export default async function SettingsPage() {
  const { organization, role } = await requireSession();

  if (!canManage(role)) {
    return (
      <div className="space-y-6 animate-smooth-in">
        <PageTitle light="Your" bold="settings." />
        <p className={ui.muted}>Only owners and admins can change the workspace settings.</p>
      </div>
    );
  }

  const [org, keys] = await Promise.all([
    db.organization.findUniqueOrThrow({
      where: { id: organization.id },
      select: { name: true, notifyEmail: true, webhookUrl: true, webhookSecret: true },
    }),
    db.apiKey.findMany({
      where: { organizationId: organization.id, revokedAt: null },
      orderBy: { createdAt: "desc" },
      select: { id: true, name: true, prefix: true, lastUsedAt: true, createdAt: true },
    }),
  ]);

  return (
    <div className="space-y-8 animate-smooth-in">
      <div className="space-y-2">
        <PageTitle light="Your" bold="settings." />
        <p className="text-sm text-[#72729A] font-medium">Configure workspace parameters, webhooks, and developer API keys.</p>
      </div>

      {/* Visual Preferences Block */}
      <PreferencesBlock />

      {/* Workspace Settings Card */}
      <section className="clay-card p-6 sm:p-8 rounded-3xl space-y-6">
        <div className="border-b border-[#EAE9F6] pb-4">
          <p className="text-xs font-bold uppercase tracking-wider text-[#72729A]">General</p>
          <h2 className="text-xl font-black text-[#18182E]">Workspace Profile</h2>
        </div>

        <ActionForm action={saveSettings} keepValues className="space-y-4">
          <div>
            <label className={ui.label} htmlFor="name">Workspace Name</label>
            <input id="name" name="name" required minLength={2} maxLength={80} defaultValue={org.name} className={ui.input} />
          </div>
          <div>
            <label className={ui.label} htmlFor="notifyEmail">Forward new messages to email</label>
            <input id="notifyEmail" name="notifyEmail" type="email" defaultValue={org.notifyEmail ?? ""} placeholder="you@company.com" className={ui.input} />
          </div>
          <div>
            <label className={ui.label} htmlFor="webhookUrl">Webhook Address (Optional)</label>
            <input id="webhookUrl" name="webhookUrl" type="url" defaultValue={org.webhookUrl ?? ""} placeholder="https://erp.company.com/api/webhooks/contact" className={ui.input} />
            <p className="text-xs text-[#72729A] mt-1.5 font-medium">We send a secure POST request with every new message received.</p>
          </div>
          <div className="pt-2"><SubmitButton>Save workspace settings</SubmitButton></div>
        </ActionForm>

        {org.webhookUrl && org.webhookSecret && (
          <div className="bg-[#F8F9FE] border border-[#EAE9F6] rounded-2xl p-5 space-y-3">
            <p className={ui.label}>Webhook Signing Secret</p>
            <code className="block break-all text-xs text-[#18182E] font-mono bg-white border border-[#EAE9F6] p-3 rounded-xl">{org.webhookSecret}</code>
            <div className="flex gap-2">
              <CopyButton text={org.webhookSecret} />
              <ActionForm action={rotateWebhookSecret} keepValues confirm="Generate a new secret? The old one stops working.">
                <SubmitButton variant="ghost" pendingText="...">Rotate secret</SubmitButton>
              </ActionForm>
            </div>
          </div>
        )}
      </section>

      {/* API Keys Card */}
      <section className="clay-card p-6 sm:p-8 rounded-3xl space-y-6">
        <div className="border-b border-[#EAE9F6] pb-4">
          <p className="text-xs font-bold uppercase tracking-wider text-[#72729A]">Developers & Integration</p>
          <h2 className="text-xl font-black text-[#18182E]">API Keys</h2>
          <p className="text-xs text-[#72729A] mt-1">
            Keys let your ERP or any other system read and create contacts and read messages securely.
          </p>
        </div>

        <ApiKeyCreator />

        {keys.length > 0 && (
          <div className="pt-4 border-t border-[#EAE9F6]">
            <p className="text-xs font-bold uppercase tracking-wider text-[#72729A] mb-3">Active Keys</p>
            <ul className="divide-y divide-[#EAE9F6]">
              {keys.map((key) => (
                <li key={key.id} className="flex flex-wrap items-center justify-between gap-4 py-4 px-3 rounded-2xl hover:bg-[#F8F9FE] transition-colors">
                  <div className="min-w-0">
                    <p className="text-[#18182E] font-bold text-sm">{key.name}</p>
                    <p className="text-xs text-[#72729A] mt-0.5">
                      <span className="font-mono font-bold text-[#5E48E8]">{key.prefix}…</span>
                      {" · created "}{formatDate(key.createdAt)}
                      {" · "}{key.lastUsedAt ? `last used ${formatDate(key.lastUsedAt)}` : "never used"}
                    </p>
                  </div>
                  <ActionForm action={revokeApiKey} confirm="Revoke this key? Anything using it will stop working.">
                    <input type="hidden" name="id" value={key.id} />
                    <SubmitButton variant="danger" pendingText="...">Revoke</SubmitButton>
                  </ActionForm>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </div>
  );
}
