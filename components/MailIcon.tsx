export function InboxIcon() {
  return (
    <div className="size-14 rounded-2xl bg-[#0A0E14] border border-[#1E293B] flex items-center justify-center shadow-[0_0_20px_rgba(198,248,39,0.3)]">
      <span className="font-black text-3xl bg-gradient-to-br from-[#C6F827] via-[#10B981] to-[#00FF88] bg-clip-text text-transparent flex items-baseline leading-none select-none pl-1">
        V<span className="text-base font-black text-[#C6F827] ml-0.5">i</span>
      </span>
    </div>
  );
}

export const MailIcon = InboxIcon;
