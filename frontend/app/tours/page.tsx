import type { Metadata } from 'next';
import Link from 'next/link';
import PackageCard from '@/components/PackageCard';
import { Empty } from '@/components/States';
import { getDestinations, getPackages } from '@/lib/api';
import Reveal from '@/components/3d/Reveal';

export const metadata: Metadata = {
  title: 'Himalayan Tour Packages | Curated Expeditions',
  description: 'Handcrafted multi-day packages covering Srinagar, Gulmarg, Pahalgam, Sonamarg and Ladakh.',
};

type SP = {
  destination?: string;
  maxPrice?: string;
  minDays?: string;
  maxDays?: string;
  minRating?: string;
  page?: string;
};

export default async function Tours({ searchParams }: { searchParams: SP }) {
  const qs = new URLSearchParams(
    Object.entries(searchParams).filter(([, v]) => v) as [string, string][]
  ).toString();
  const [data, dest] = await Promise.all([
    getPackages(`limit=12&${qs}`),
    getDestinations(),
  ]);
  const page = Number(searchParams.page ?? 1);
  const pageHref = (n: number) =>
    `/tours?${new URLSearchParams({
      ...searchParams,
      page: String(n),
    } as Record<string, string>)}`;
  const field =
    'rounded-2xl border border-lake/15 bg-white/90 px-3.5 py-2.5 text-xs font-medium text-ink shadow-sm focus:border-lake focus:outline-none focus:ring-2 focus:ring-lake/20';

  return (
    <div className="container-x py-14">
      <Reveal>
        <div className="max-w-2xl">
          <span className="rounded-full bg-saffron/20 border border-saffron/30 px-3.5 py-1 text-xs font-bold text-deep uppercase tracking-wider">
            Curated Expeditions
          </span>
          <h1 className="mt-3 text-4xl font-extrabold text-lake md:text-5xl">
            Tour Packages
          </h1>
          <p className="mt-2 text-base text-mist leading-relaxed">
            All-inclusive valley packages with dedicated private SUVs, handpicked stays, and local guide permits.
          </p>
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <form className="mt-8 grid gap-3 rounded-3xl border border-lake/10 bg-white/80 p-5 shadow-sm backdrop-blur sm:grid-cols-2 lg:grid-cols-5">
          <div>
            <label className="block text-xs font-bold text-lake mb-1">Destination</label>
            <select
              name="destination"
              defaultValue={searchParams.destination ?? ''}
              className={`${field} w-full`}
            >
              <option value="">All Destinations</option>
              {dest?.items.map((d) => (
                <option key={d._id} value={d.slug}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-lake mb-1">Max Budget (₹)</label>
            <input
              name="maxPrice"
              type="number"
              min={0}
              placeholder="e.g. 35000"
              defaultValue={searchParams.maxPrice}
              className={`${field} w-full`}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-lake mb-1">Max Duration</label>
            <select
              name="maxDays"
              defaultValue={searchParams.maxDays ?? ''}
              className={`${field} w-full`}
            >
              <option value="">Any Length</option>
              <option value="3">Up to 3 days</option>
              <option value="5">Up to 5 days</option>
              <option value="7">Up to 7 days</option>
              <option value="14">Up to 14 days</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-lake mb-1">Guest Rating</label>
            <select
              name="minRating"
              defaultValue={searchParams.minRating ?? ''}
              className={`${field} w-full`}
            >
              <option value="">Any Rating</option>
              <option value="4">4.0 & above ★</option>
              <option value="4.5">4.5 & above ★</option>
            </select>
          </div>

          <button className="btn btn-dark self-end text-xs py-3 w-full shadow-md shadow-lake/10">
            Apply Filters
          </button>
        </form>
      </Reveal>

      <div className="mt-10">
        {!data || data.items.length === 0 ? (
          <Empty
            title="No tours match these criteria"
            hint="Try resetting your duration or price filter to see more results."
          />
        ) : (
          <>
            <div className="mb-6 flex items-center justify-between">
              <p className="text-xs font-semibold text-mist">
                Showing {data.items.length} of {data.total} curated tour packages
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {data.items.map((p, i) => (
                <Reveal key={p._id} delay={i * 0.08}>
                  <PackageCard p={p} />
                </Reveal>
              ))}
            </div>

            {data.pages > 1 && (
              <nav className="mt-12 flex justify-center gap-3" aria-label="Pagination">
                {page > 1 && (
                  <Link className="btn btn-ghost text-lake text-xs" href={pageHref(page - 1)}>
                    Previous
                  </Link>
                )}
                {page < data.pages && (
                  <Link className="btn btn-dark text-xs" href={pageHref(page + 1)}>
                    Next Page
                  </Link>
                )}
              </nav>
            )}
          </>
        )}
      </div>
    </div>
  );
}
