// Loading animation
const shimmer =
  "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent";

export function CardSkeleton() {
  return (
    <div
      className={`${shimmer} relative overflow-hidden rounded-xl bg-gray-100 p-2 shadow-sm`}
    >
      <div className="flex p-4">
        <div className="h-5 w-5 rounded-md bg-gray-200" />
        <div className="ml-2 h-6 w-16 rounded-md bg-gray-200 text-sm font-medium" />
      </div>
      <div className="flex items-center justify-center truncate rounded-xl bg-white px-4 py-8">
        <div className="h-7 w-20 rounded-md bg-gray-200" />
      </div>
    </div>
  );
}

export function HookCardSkeleton() {
  return (
    <div className="bg-blue-900/30 border border-blue-800 rounded-lg p-4 animate-pulse ">
      <div className="mb-4">
        <div className="h-6 bg-gray-700 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-700 rounded w-1/2"></div>
      </div>
      <div className="flex justify-between items-center">
        <div className="h-8 bg-gray-700 rounded w-1/3"></div>
        <div className="flex space-x-2">
          <div className="h-8 w-8 bg-gray-700 rounded-full"></div>
          <div className="h-8 w-8 bg-gray-700 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}

export function SearchResultsSkeleton() {
  return (
    <>
      <HookCardSkeleton />
      <HookCardSkeleton />
      <HookCardSkeleton />
      <HookCardSkeleton />
      <HookCardSkeleton />
      <HookCardSkeleton />
    </>
  );
}
