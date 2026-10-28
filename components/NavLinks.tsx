"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePreferences } from "@/components/PreferencesProvider";

export type ItemKey = "overview" | "inbox" | "contacts" | "forms" | "settings";
export type NavItem = { href: string; key: ItemKey; label: string; badge?: number };

function NavIcon({ itemKey, active }: { itemKey: ItemKey; active: boolean }) {
  const iconProps = {
    className: `size-5 shrink-0 transition-colors ${
      active ? "text-[#c5ff4a]" : "text-[#737373] group-hover:text-white"
    }`,
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24",
    strokeWidth: active ? "2" : "1.75",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (itemKey) {
    case "overview":
      return (
        <svg {...iconProps}>
          <rect x="3" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="14" width="7" height="7" rx="1.5" />
          <rect x="3" y="14" width="7" height="7" rx="1.5" />
        </svg>
      );
    case "inbox":
      return (
        <svg {...iconProps}>
          <path d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-4l-2 3H10l-2-3H4" />
        </svg>
      );
    case "contacts":
      return (
        <svg {...iconProps}>
          <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      );
    case "forms":
      return (
        <svg {...iconProps}>
          <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      );
    case "settings":
      return (
        <svg {...iconProps}>
          <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      );
    default:
      return null;
  }
}

export function NavLinks({ items, onItemClick }: { items: NavItem[]; onItemClick?: () => void }) {
  const pathname = usePathname();
  const { t } = usePreferences();

  return (
    <nav className="flex flex-col gap-1.5">
      {items.map((item) => {
        const active =
          item.href === "/app" ? pathname === "/app" : pathname.startsWith(item.href);
        const translatedLabel = (t as Record<string, string>)[item.key] || item.label;

        return (
          <Link
            key={item.href}
            href={item.href}
            prefetch={false}
            onClick={onItemClick}
            className={`group relative flex items-center justify-between gap-3 px-3.5 py-2.5 min-h-[44px] rounded-[6px] text-[13px] sm:text-sm font-sans transition-all duration-150 select-none cursor-pointer active:scale-[0.98] ${
              active
                ? "bg-[#c5ff4a]/12 text-white border border-[#c5ff4a]/30 shadow-[0_0_12px_rgba(197,255,74,0.12)] font-semibold"
                : "text-[#a3a3a3] hover:text-white hover:bg-[#181818] border border-transparent hover:border-[#262626] font-medium"
            }`}
          >
            <span className="flex items-center gap-3 truncate">
              {active ? (
                <span className="w-1 h-4 rounded-full bg-[#c5ff4a] shadow-[0_0_8px_#c5ff4a] shrink-0 -ml-1" />
              ) : null}
              <NavIcon itemKey={item.key} active={active} />
              <span className="truncate">{translatedLabel}</span>
            </span>
            {item.badge ? (
              <span className="min-w-5 h-5 px-1.5 rounded-full bg-[#c5ff4a]/20 text-[#c5ff4a] border border-[#c5ff4a]/30 text-[11px] font-mono font-medium flex items-center justify-center shrink-0">
                {item.badge}
              </span>
            ) : null}
          </Link>
        );
      })}
    </nav>
  );
}
