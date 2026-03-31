export default function OrderLoading() {
  return (
    <main className="bg-[#0a0a0a] min-h-screen">
      {/* Header placeholder */}
      <div className="h-[72px]" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        {/* Heading skeleton */}
        <div className="text-center mb-12">
          <div className="h-2 w-24 rounded bg-zinc-800 animate-pulse mx-auto mb-3" />
          <div className="h-8 w-48 rounded bg-zinc-800 animate-pulse mx-auto" />
        </div>

        {/* Two-column skeleton */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          {/* 3D preview placeholder */}
          <div className="w-full lg:w-[420px] shrink-0">
            <div className="rounded-2xl border border-white/8 bg-zinc-900/40 animate-pulse" style={{ height: 300 }} />
          </div>

          {/* Steps placeholder */}
          <div className="flex-1 w-full">
            {/* Step indicator */}
            <div className="flex items-center justify-center mb-8 gap-3">
              {[0, 1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-zinc-900 animate-pulse" />
                  {i < 4 && <div className="w-8 h-px bg-white/8" />}
                </div>
              ))}
            </div>

            {/* Options placeholder */}
            <div className="grid grid-cols-2 gap-3">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="p-4 rounded-xl border border-white/8 bg-zinc-900/50 animate-pulse h-32" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
