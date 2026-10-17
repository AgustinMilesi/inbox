import { AppShell } from "@/components/AppShell";
import type { NavItem } from "@/components/NavLinks";
import { logoutAction } from "@/app/actions/auth";
import { requireSession } from "@/lib/auth/session";
import { db } from "@/lib/db";
import { getServerTranslations } from "@/lib/i18n-server";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const [session, { t }] = await Promise.all([
    requireSession(),
    getServerTranslations(),
  ]);

  const unread = await db.message.count({
    where: { organizationId: session.organization.id, status: "NEW" },
  });

  const navItems: NavItem[] = [
    { href: "/app", key: "overview", label: t.overview },
    { href: "/app/inbox", key: "inbox", label: t.inbox, badge: unread },
    { href: "/app/contacts", key: "contacts", label: t.contacts },
    { href: "/app/forms", key: "forms", label: t.forms },
    { href: "/app/settings", key: "settings", label: t.settings },
  ];

  return (
    <AppShell
      organizationName={session.organization.name}
      userEmail={session.user.email}
      workspaceLabel={t.workspace}
      signOutLabel={t.signOut}
      signingOutLabel={t.signingOut}
      settingsLabel={t.settings}
      navItems={navItems}
      logoutAction={logoutAction}
    >
      {children}
    </AppShell>
  );
}
