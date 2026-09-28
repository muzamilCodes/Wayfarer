export function ApiError() {
  return (
    <div className="rounded-2xl border border-lake/15 bg-white p-8 text-center" role="alert">
      <p className="font-display text-lg font-semibold text-lake">We couldn't load this right now</p>
      <p className="mt-1 text-sm text-mist">The server didn't respond. Check that the API is running, then refresh the page.</p>
    </div>
  );
}
export function Empty({ title, hint }: { title: string; hint: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-lake/20 p-10 text-center">
      <p className="font-display text-lg font-semibold text-lake">{title}</p>
      <p className="mt-1 text-sm text-mist">{hint}</p>
    </div>
  );
}
