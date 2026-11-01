export default function RootLoading() {
  return (
    <div className="min-h-screen bg-[#0A0E14] text-slate-100 p-4 sm:p-8 lg:p-12 flex flex-col justify-between animate-pulse select-none">
      {/* Header Skeleton */}
      <div className="w-full max-w-6xl mx-auto flex items-center justify-between pb-6 border-b border-[#252525]">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-[4px] bg-[#1f1f1f] border border-[#252525]" />
          <div className="space-y-1">
            <div className="h-5 w-24 bg-[#262626] rounded-[3px]" />
            <div className="h-3 w-40 bg-[#1a1a1a] rounded-[2px]" />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="h-9 w-20 bg-[#1f1f1f] rounded-[4px] border border-[#252525]" />
          <div className="h-9 w-28 bg-[#262626] rounded-[4px]" />
        </div>
      </div>

      {/* Hero Section Skeleton */}
      <div className="w-full max-w-6xl mx-auto my-auto py-12 space-y-8">
        <div className="space-y-4 max-w-2xl">
          <div className="h-4 w-32 bg-[#1f1f1f] rounded-[3px]" />
          <div className="h-12 w-full max-w-xl bg-[#262626] rounded-[4px]" />
          <div className="h-5 w-3/4 bg-[#1a1a1a] rounded-[3px]" />
        </div>
        <div className="flex gap-4">
          <div className="h-11 w-40 bg-[#262626] rounded-[4px]" />
          <div className="h-11 w-32 bg-[#1f1f1f] rounded-[4px] border border-[#252525]" />
        </div>
      </div>

      {/* Footer Skeleton */}
      <div className="w-full max-w-6xl mx-auto pt-6 border-t border-[#252525] flex justify-between items-center">
        <div className="h-3 w-48 bg-[#1a1a1a] rounded-[2px]" />
        <div className="h-3 w-32 bg-[#1a1a1a] rounded-[2px]" />
      </div>
    </div>
  );
}
