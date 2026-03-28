/* Shimmer base */
function Shimmer({ className = '' }) {
  return (
    <div
      className={`animate-pulse bg-gray-200 rounded-xl ${className}`}
      style={{ background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.5s infinite' }}
    />
  );
}

export function PanditCardSkeleton() {
  return (
    <div className="card p-5 space-y-3">
      <div className="flex items-center gap-3">
        <Shimmer className="w-14 h-14 rounded-2xl shrink-0" />
        <div className="flex-1 space-y-2">
          <Shimmer className="h-4 w-3/4" />
          <Shimmer className="h-3 w-1/2" />
        </div>
      </div>
      <Shimmer className="h-3 w-full" />
      <Shimmer className="h-3 w-5/6" />
      <div className="flex gap-2">
        <Shimmer className="h-6 w-16" />
        <Shimmer className="h-6 w-16" />
        <Shimmer className="h-6 w-16" />
      </div>
      <div className="flex justify-between items-center pt-1">
        <Shimmer className="h-5 w-20" />
        <Shimmer className="h-9 w-24" />
      </div>
    </div>
  );
}

export function PujaCardSkeleton() {
  return (
    <div className="card overflow-hidden">
      <Shimmer className="h-40 w-full rounded-none rounded-t-xl" />
      <div className="p-4 space-y-2">
        <Shimmer className="h-4 w-3/4" />
        <Shimmer className="h-3 w-1/2" />
        <div className="flex justify-between pt-1">
          <Shimmer className="h-5 w-16" />
          <Shimmer className="h-8 w-20" />
        </div>
      </div>
    </div>
  );
}

export function BookingRowSkeleton() {
  return (
    <div className="p-5 flex items-start justify-between gap-3">
      <div className="flex-1 space-y-2">
        <Shimmer className="h-4 w-2/3" />
        <Shimmer className="h-3 w-1/2" />
        <div className="flex gap-3">
          <Shimmer className="h-3 w-20" />
          <Shimmer className="h-3 w-20" />
          <Shimmer className="h-3 w-20" />
        </div>
      </div>
      <div className="space-y-2 text-right">
        <Shimmer className="h-4 w-16 ml-auto" />
        <Shimmer className="h-3 w-12 ml-auto" />
      </div>
    </div>
  );
}

export function PageSkeleton({ rows = 3 }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="card p-5 space-y-3">
          <Shimmer className="h-4 w-1/3" />
          <Shimmer className="h-3 w-full" />
          <Shimmer className="h-3 w-4/5" />
        </div>
      ))}
    </div>
  );
}
