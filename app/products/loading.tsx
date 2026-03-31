export default function ProductsLoading() {
  return (
    <main className="bg-black min-h-screen">
      {/* Header placeholder */}
      <div className="h-[72px]" />

      <div className="max-w-5xl mx-auto px-6 pt-28 pb-24">
        {/* Heading skeleton */}
        <div className="mb-16">
          <div className="h-2 w-16 rounded bg-zinc-800 animate-pulse mb-3" />
          <div className="h-7 w-24 rounded bg-zinc-800 animate-pulse" />
        </div>

        {/* Grid skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[0, 1, 2, 3].map((i) => (
            <div key={i}>
              <div className="aspect-[4/3] rounded-[14px] bg-zinc-900 animate-pulse mb-4" />
              <div className="px-0.5 space-y-2">
                <div className="h-2 w-20 rounded bg-zinc-800 animate-pulse" />
                <div className="h-4 w-32 rounded bg-zinc-800 animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
