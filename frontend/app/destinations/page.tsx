import type { Metadata } from 'next';
import DestinationCard from '@/components/DestinationCard';
import { ApiError, Empty } from '@/components/States';
import { getDestinations } from '@/lib/api';

export const metadata: Metadata = { title: 'Destinations', description: 'Explore Kashmir, Ladakh, Himachal and more.' };

export default async function Destinations({ searchParams }: { searchParams: { q?: string; region?: string } }) {
  const data = await getDestinations(searchParams.region ? `&region=${encodeURIComponent(searchParams.region)}` : '');
  const q = searchParams.q?.toLowerCase().trim();
  const items = data?.items.filter((d) => !q || `${d.name} ${d.region} ${d.description}`.toLowerCase().includes(q));
  return (
    <div className="container-x py-12">
      <h1 className="text-4xl font-bold text-lake">Destinations</h1>
      <form className="mt-6 flex max-w-md gap-2" role="search">
        <label htmlFor="q" className="sr-only">Search destinations</label>
        <input id="q" name="q" defaultValue={searchParams.q} placeholder="Search by name or region" className="flex-1 rounded-full border border-lake/20 bg-white px-5 py-3" />
        <button className="btn btn-dark">Search</button>
      </form>
      <div className="mt-8">
        {!data ? <ApiError /> : items!.length === 0 ? <Empty title="No matching destinations" hint="Try a different name or clear the search." /> : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{items!.map((d) => <DestinationCard key={d._id} d={d} />)}</div>
        )}
      </div>
    </div>
  );
}
