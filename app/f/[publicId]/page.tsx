import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Headline } from "@/components/Headline";
import { PublicForm } from "@/components/PublicForm";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Contact", robots: { index: false } };

export default async function PublicFormPage({
  params,
}: {
  params: Promise<{ publicId: string }>;
}) {
  const { publicId } = await params;
  const form = await db.form.findUnique({
    where: { publicId },
    select: { active: true, organization: { select: { name: true } } },
  });
  if (!form || !form.active) notFound();

  return (
    <main className="min-h-screen flex items-center justify-center p-6 md:p-12 animate-smooth-in">
      <div className="w-full max-w-xl clay-card p-8 sm:p-10 rounded-3xl space-y-6">
        <Headline light={["Send a message to"]} bold={`${form.organization.name}.`} />
        <PublicForm publicId={publicId} orgName={form.organization.name} />
      </div>
    </main>
  );
}
