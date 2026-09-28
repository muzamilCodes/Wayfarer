import type { Metadata } from 'next';
import Link from 'next/link';
import PackageCard from '@/components/PackageCard';
import { ApiError, Empty } from '@/components/States';
import { getDestinations, getPackages } from '@/lib/api';

export const metadata: Metadata = { title: 'Tour packages', description: 'Browse curated tour packages across Kashmir, Ladakh and the Himalaya.' };
type SP = { destination?: string; maxPrice?: string; minDays?: string; maxDays?: string; minRating?: string; page?: string };

export default async function Tours({ searchParams }: { searchParams: SP }) {
  const qs = new URLSearchParams(Object.entries(searchParams).filter(([, v]) => v) as [string, string][]).toString();
  const [data, dest] = await Promise.all([getPackages(`limit=12&${qs}`), getDestinations()]);
  const page = Number(searchParams.page ?? 1);
  const pageHref = (n: number) => `/tours?${new URLSearchParams({ ...searchParams, page: String(n) } as Record<string, string>)}`;
  const field = 'rounded-xl border border-lake/20 bg-white px-3 py-2 text-sm';

  return (
    <div className="container-x py-12">
      <h1 className="text-4xl font-bold text-lake">Tour packages</h1>
      <form className="mt-6 grid gap-3 rounded-2xl border border-lake/10 bg-white p-4 sm:grid-cols-2 lg:grid-cols-5">
        <label className="text-sm">Destination
          <select name="destination" defaultValue={searchParams.destination ?? ''} className={`${field} mt-1 w-full`}>
            <option value="">Any</option>{dest?.items.map((d) => <option key={d._id} value={d.slug}>{d.name}</option>)}
          </select></label>
        <label className="text-sm">Max price (₹)
          <input name="maxPrice" type="number" min={0} defaultValue={searchParams.maxPrice} className={`${field} mt-1 w-full`} /></label>
        <label className="text-sm">Duration
          <select name="maxDays" defaultValue={searchParams.maxDays ?? ''} className={`${field} mt-1 w-full`}>
            <option value="">Any</option><option value="3">Up to 3 days</option><option value="5">Up to 5 days</option><option value="7">Up to 7 days</option><option value="14">Up to 14 days</option>
          </select></label>
        <label className="text-sm">Rating
          <select name="minRating" defaultValue={searchParams.minRating ?? ''} className={`${field} mt-1 w-full`}>
            <option value="">Any</option><option value="4">4 and up</option><option value="4.5">4.5 and up</option>
          </select></label>
        <button className="btn btn-dark self-end">Apply filters</button>
      </form>
      <div className="mt-8">
        {!data ? <ApiError /> : data.items.length === 0 ? <Empty title="No tours match these filters" hint="Widen the price or duration range." /> : (
          <>
            <p className="mb-4 text-sm text-mist">{data.total} tours</p>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{data.items.map((p) => <PackageCard key={p._id} p={p} />)}</div>
            {data.pages > 1 && (
              <nav className="mt-8 flex justify-center gap-3" aria-label="Pagination">
                {page > 1 && <Link className="btn btn-ghost text-lake" href={pageHref(page - 1)}>Previous</Link>}
                {page < data.pages && <Link className="btn btn-dark" href={pageHref(page + 1)}>Next</Link>}
              </nav>
            )}
          </>
        )}
      </div>
    </div>
  );
}
