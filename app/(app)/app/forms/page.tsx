import type { Metadata } from "next";
import { ActionForm } from "@/components/ActionForm";
import { CopyButton } from "@/components/CopyButton";
import { PageTitle } from "@/components/Headline";
import { SubmitButton } from "@/components/SubmitButton";
import { ui } from "@/components/ui";
import { deleteForm, saveForm, toggleForm } from "@/app/actions/dashboard";
import { canManage, requireSession } from "@/lib/auth/session";
import { db } from "@/lib/db";
import { env } from "@/lib/env";

export const metadata: Metadata = { title: "Forms" };

export default async function FormsPage() {
  const { organization, role } = await requireSession();
  const admin = canManage(role);

  const forms = await db.form.findMany({
    where: { organizationId: organization.id },
    orderBy: { createdAt: "asc" },
    include: { _count: { select: { messages: true } } },
  });

  return (
    <div className="space-y-8 animate-smooth-in">
      <div className="space-y-2">
        <PageTitle light="Your" bold="forms." />
        <p className="text-sm text-[#72729A] font-medium">Share the link, or paste the embed code into any website.</p>
      </div>

      <div className="space-y-6">
        {forms.map((form) => {
          const link = `${env.APP_URL}/f/${form.publicId}`;
          const embed = `<iframe src="${link}" width="100%" height="640" style="border:0" title="Contact"></iframe>`;
          return (
            <section key={form.id} className="clay-card p-6 sm:p-8 rounded-3xl space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#EAE9F6] pb-4">
                <div>
                  <div className="flex items-center gap-2.5">
                    <span className={`size-2.5 rounded-full ${form.active ? "bg-emerald-500 animate-pulse" : "bg-amber-500"}`} />
                    <h2 className="text-xl font-black text-[#18182E]">{form.name}</h2>
                  </div>
                  <p className="text-xs text-[#72729A] mt-1">
                    {form._count.messages} {form._count.messages === 1 ? "message" : "messages"}
                    {" · "}
                    <span className="font-bold">{form.active ? "Active" : "Paused"}</span>
                  </p>
                </div>
                {admin && (
                  <div className="flex gap-2">
                    <ActionForm action={toggleForm} keepValues>
                      <input type="hidden" name="id" value={form.id} />
                      <SubmitButton variant="ghost" pendingText="...">{form.active ? "Pause" : "Resume"}</SubmitButton>
                    </ActionForm>
                    <ActionForm action={deleteForm} confirm="Delete this form? Its link will stop working.">
                      <input type="hidden" name="id" value={form.id} />
                      <SubmitButton variant="danger" pendingText="...">Delete</SubmitButton>
                    </ActionForm>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <p className={ui.label}>Direct Link</p>
                <div className="flex flex-wrap items-center gap-3">
                  <a href={link} target="_blank" rel="noopener noreferrer" className={`${ui.link} break-all text-sm`}>{link}</a>
                  <CopyButton text={link} />
                </div>
              </div>

              <div className="space-y-2">
                <p className={ui.label}>Embed HTML Code</p>
                <code className="block break-all text-xs text-[#18182E] bg-[#F8F9FE] border border-[#EAE9F6] rounded-2xl p-3 font-mono">{embed}</code>
                <CopyButton text={embed} label="Copy embed code" />
              </div>

              {admin && (
                <details className="pt-2">
                  <summary className="cursor-pointer text-xs uppercase tracking-[0.15em] text-[#72729A] font-bold hover:text-[#5E48E8] transition">
                    Edit form settings
                  </summary>
                  <ActionForm action={saveForm} keepValues className="space-y-3 pt-4">
                    <input type="hidden" name="id" value={form.id} />
                    <div>
                      <label className={ui.label} htmlFor={`name-${form.id}`}>Name</label>
                      <input id={`name-${form.id}`} name="name" required minLength={2} maxLength={80} defaultValue={form.name} className={ui.input} />
                    </div>
                    <div>
                      <label className={ui.label} htmlFor={`origins-${form.id}`}>Allowed domains (optional)</label>
                      <textarea
                        id={`origins-${form.id}`}
                        name="allowedOrigins"
                        rows={2}
                        defaultValue={form.allowedOrigins.join("\n")}
                        placeholder="https://yoursite.com"
                        className={`${ui.input} resize-none`}
                      />
                      <p className="text-xs text-[#72729A] mt-1">
                        Only these sites can send messages from their own pages. Leave it empty to allow any site.
                      </p>
                    </div>
                    <div className="pt-2"><SubmitButton>Save changes</SubmitButton></div>
                  </ActionForm>
                </details>
              )}
            </section>
          );
        })}
      </div>

      {admin ? (
        <details className="clay-card p-6 sm:p-8 rounded-3xl">
          <summary className="cursor-pointer text-xs uppercase tracking-[0.15em] text-[#72729A] font-bold hover:text-[#5E48E8] transition">
            + Create a new form
          </summary>
          <ActionForm action={saveForm} className="space-y-3 pt-6 border-t border-[#EAE9F6] mt-4">
            <div>
              <label className={ui.label} htmlFor="form-new-name">Form Name</label>
              <input id="form-new-name" name="name" required minLength={2} maxLength={80} placeholder="Support Contact Form" className={ui.input} />
            </div>
            <div>
              <label className={ui.label} htmlFor="form-new-origins">Allowed Domains (optional)</label>
              <textarea id="form-new-origins" name="allowedOrigins" rows={2} placeholder="https://mywebsite.com (one per line)" className={`${ui.input} resize-none`} />
            </div>
            <div className="pt-2"><SubmitButton pendingText="Creating...">Create form</SubmitButton></div>
          </ActionForm>
        </details>
      ) : (
        <p className={ui.muted}>Only owners and admins can create or change forms.</p>
      )}
    </div>
  );
}
