export default function Loading() {
  return (
    <div className="space-y-6 w-full max-w-[1600px] mx-auto animate-pulse select-none">
      {/* 1. Header Skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#262626]">
        <div className="space-y-2">
          <div className="h-3 w-32 bg-[#1f1f1f] rounded-[4px]" />
          <div className="h-7 w-60 bg-[#262626] rounded-[4px]" />
        </div>
        <div className="flex items-center gap-2">
          <div className="h-10 w-28 bg-[#1f1f1f] rounded-[4px] border border-[#2e2e2e]" />
          <div className="h-10 w-36 bg-[#262626] rounded-[4px]" />
        </div>
      </div>

      {/* 2. Top Metric Cards (3 Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="p-4 sm:p-5 rounded-[6px] bg-[#121212] border border-[#262626] space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="h-3 w-28 bg-[#1f1f1f] rounded-[3px]" />
              <div className="size-6 rounded-[4px] bg-[#1a1a1a]" />
            </div>
            <div className="h-8 w-24 bg-[#262626] rounded-[4px]" />
            <div className="h-2.5 w-32 bg-[#1a1a1a] rounded-[3px]" />
          </div>
        ))}
      </div>

      {/* 3. Master-Detail Layout Skeleton (Messages / Contacts list + Preview) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 rounded-[6px] bg-[#121212] border border-[#262626] p-4 sm:p-5 min-h-[450px]">
        {/* Left List Column (5 cols) */}
        <div className="lg:col-span-5 space-y-3 pr-0 lg:pr-4 lg:border-r lg:border-[#262626]">
          <div className="h-9 w-full bg-[#1a1a1a] rounded-[4px] border border-[#2a2a2a] mb-4" />
          {[...Array(5)].map((_, i) => (
            <div key={i} className="p-3 rounded-[6px] bg-[#161616] border border-[#222222] space-y-2">
              <div className="flex items-center justify-between">
                <div className="h-4 w-32 bg-[#262626] rounded-[3px]" />
                <div className="h-3 w-12 bg-[#1f1f1f] rounded-[3px]" />
              </div>
              <div className="h-3 w-full bg-[#1e1e1e] rounded-[3px]" />
              <div className="h-2.5 w-2/3 bg-[#1a1a1a] rounded-[3px]" />
            </div>
          ))}
        </div>

        {/* Right Detail Column (7 cols) */}
        <div className="hidden lg:flex lg:col-span-7 flex-col justify-between space-y-6 pl-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#262626]">
              <div className="space-y-1.5">
                <div className="h-5 w-48 bg-[#262626] rounded-[3px]" />
                <div className="h-3 w-36 bg-[#1a1a1a] rounded-[3px]" />
              </div>
              <div className="h-8 w-24 bg-[#1f1f1f] rounded-[4px]" />
            </div>
            <div className="space-y-2 pt-2">
              <div className="h-4 w-full bg-[#1e1e1e] rounded-[3px]" />
              <div className="h-4 w-5/6 bg-[#1e1e1e] rounded-[3px]" />
              <div className="h-4 w-3/4 bg-[#1e1e1e] rounded-[3px]" />
            </div>
          </div>
          <div className="h-24 w-full bg-[#161616] border border-[#262626] rounded-[6px]" />
        </div>
      </div>
    </div>
  );
}
