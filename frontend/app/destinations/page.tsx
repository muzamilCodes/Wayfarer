import type { Metadata } from 'next';
import DestinationCard from '@/components/DestinationCard';
import { Empty } from '@/components/States';
import { getDestinations } from '@/lib/api';
import Reveal from '@/components/3d/Reveal';
import Link from 'next/link';
import { Search, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Himalayan Destinations | Srinagar, Gulmarg, Ladakh & More',
  description: 'Explore curated Kashmir, Ladakh, and Himachal mountain destinations.',
};

export default async function Destinations({
  searchParams,
}: {
  searchParams: { q?: string; region?: string };
}) {
  const data = await getDestinations(
    searchParams.region ? `&region=${encodeURIComponent(searchParams.region)}` : ''
  );
  const q = searchParams.q?.toLowerCase().trim();
  const items = data?.items.filter(
    (d) => !q || `${d.name} ${d.region} ${d.description}`.toLowerCase().includes(q)
  );

  const regions = ['All', 'Jammu & Kashmir', 'Ladakh', 'Himachal Pradesh'];
  const activeRegion = searchParams.region || 'All';

  return (
    <div className="container-x py-14">
      <Reveal>
        <div className="max-w-2xl">
          <span className="rounded-full bg-saffron/20 border border-saffron/30 px-3.5 py-1 text-xs font-bold text-deep uppercase tracking-wider">
            Explore Himalayan Regions
          </span>
          <h1 className="mt-3 text-4xl font-extrabold text-lake md:text-5xl">
            Destinations
          </h1>
          <p className="mt-2 text-base text-mist leading-relaxed">
            From the tranquil waters of Dal Lake to high-altitude moonscapes in Ladakh, choose your landscape.
          </p>
        </div>
      </Reveal>

      {/* Filter Tabs & Search Bar */}
      <Reveal delay={0.1}>
        <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-lake/10 pb-6">
          <div className="flex flex-wrap gap-2">
            {regions.map((reg) => {
              const isSelected = activeRegion === reg;
              const href = reg === 'All' ? '/destinations' : `/destinations?region=${encodeURIComponent(reg)}`;
              return (
                <Link
                  key={reg}
                  href={href}
                  className={`rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                    isSelected
                      ? 'bg-lake text-snow shadow-sm'
                      : 'bg-white/80 text-mist hover:text-lake hover:bg-white border border-lake/10'
                  }`}
                >
                  {reg}
                </Link>
              );
            })}
          </div>

          <form className="flex items-center gap-2 max-w-sm w-full" role="search">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-mist" />
              <input
                id="q"
                name="q"
                defaultValue={searchParams.q}
                placeholder="Search valleys or activities…"
                className="w-full rounded-full border border-lake/15 bg-white/90 pl-10 pr-4 py-2.5 text-xs text-ink placeholder:text-mist/70 shadow-sm focus:border-lake focus:outline-none focus:ring-2 focus:ring-lake/20"
              />
            </div>
            <button className="btn btn-dark text-xs py-2.5 px-5">
              Search
            </button>
          </form>
        </div>
      </Reveal>

      {/* Grid of 3D Tilt Destination Cards */}
      <div className="mt-10">
        {!data || !items || items.length === 0 ? (
          <Empty
            title="No matching destinations found"
            hint="Try searching for Gulmarg, Srinagar, Pahalgam, or clear filters."
          />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {items.map((d, i) => (
              <Reveal key={d._id} delay={i * 0.08}>
                <DestinationCard d={d} />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
