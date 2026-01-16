"use client";

export function SkeletonBlock({ className = "" }: { className?: string }) {
  return <div className={["animate-pulse rounded-lg bg-pinkSoft/30", className].join(" ")} />;
}

export function WorksSkeleton() {
  return (
    <div className="px-4 md:px-12 pb-6">
      <SkeletonBlock className="h-4 w-24 mb-3" />
      <div className="rounded-lg border border-pinkLight bg-white shadow-md overflow-hidden p-3">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-lg border border-pinkLight bg-white p-3">
              <div className="grid grid-cols-12 gap-3">
                <SkeletonBlock className="col-span-4 aspect-square" />
                <div className="col-span-8 space-y-2">
                  <SkeletonBlock className="h-4 w-full" />
                  <SkeletonBlock className="h-3 w-2/3" />
                  <div className="flex gap-2">
                    <SkeletonBlock className="h-4 w-16 rounded-full" />
                    <SkeletonBlock className="h-4 w-14 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function MusicSkeleton() {
  return (
    <div className="px-4 md:px-12 pb-6">
      <SkeletonBlock className="h-4 w-24 mb-3" />
      <div className="rounded-lg border border-pinkLight bg-white shadow-md overflow-hidden">
        <div className="p-3 space-y-3">
          <SkeletonBlock className="w-full aspect-video" />
          <div className="grid grid-cols-12 gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="col-span-12 md:col-span-6 lg:col-span-3 rounded-lg border border-pinkLight bg-white p-3">
                <div className="flex gap-3 items-center">
                  <SkeletonBlock className="h-12 w-12" />
                  <div className="flex-1 space-y-2">
                    <SkeletonBlock className="h-3 w-3/4" />
                    <SkeletonBlock className="h-3 w-1/2" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
