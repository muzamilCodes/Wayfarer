'use client';

export function CardSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-2xl border border-lake/10 bg-white p-4 shadow-sm">
      <div className="h-48 w-full rounded-xl bg-lake/10" />
      <div className="mt-4 space-y-2">
        <div className="h-5 w-3/4 rounded-md bg-lake/10" />
        <div className="h-4 w-1/2 rounded-md bg-lake/10" />
      </div>
      <div className="mt-6 flex items-center justify-between border-t border-lake/5 pt-3">
        <div className="h-4 w-20 rounded bg-lake/10" />
        <div className="h-4 w-16 rounded bg-lake/10" />
      </div>
    </div>
  );
}

export function GridSkeleton({ count = 3, cols = 'sm:grid-cols-2 lg:grid-cols-3' }: { count?: number; cols?: string }) {
  return (
    <div className={`grid gap-6 ${cols}`}>
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}

export function ApiError({ onRetry }: { onRetry?: () => void }) {
  return (
    <div className="rounded-3xl border border-lake/15 bg-white/80 p-8 text-center backdrop-blur shadow-sm" role="alert">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-saffron/15 text-saffron mb-3">
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <p className="font-display text-lg font-semibold text-lake">We couldn't connect right now</p>
      <p className="mt-1 text-sm text-mist max-w-md mx-auto">
        Showing curated offline Himalayan highlights. Click below to retry connecting to the live API.
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="btn btn-dark mt-4 text-xs py-2 px-5"
        >
          Retry connection
        </button>
      )}
    </div>
  );
}

export function Empty({ title, hint, action }: { title: string; hint: string; action?: React.ReactNode }) {
  return (
    <div className="rounded-3xl border border-dashed border-lake/20 p-10 text-center bg-white/40 backdrop-blur">
      <p className="font-display text-lg font-semibold text-lake">{title}</p>
      <p className="mt-1 text-sm text-mist">{hint}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
