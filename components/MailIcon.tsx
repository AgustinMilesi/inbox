export function InboxIcon() {
  return (
    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#6852F6] to-[#5538EA] flex items-center justify-center shadow-[0_10px_24px_rgba(85,56,234,0.35)] text-white">
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
        />
      </svg>
    </div>
  );
}

export const MailIcon = InboxIcon;
