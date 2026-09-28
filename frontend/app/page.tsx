import Link from 'next/link';
import Hero from '@/components/Hero';
import GlobeSection from '@/components/GlobeSection';
import DestinationCard from '@/components/DestinationCard';
import PackageCard from '@/components/PackageCard';
import { ApiError, Empty } from '@/components/States';
import { getDestinations, getPackages } from '@/lib/api';

export default async function Home() {
  const [dest, pk] = await Promise.all([getDestinations(), getPackages('limit=6')]);
  return (
    <>
      <Hero />
      <section className="container-x pt-20">
        <div className="flex items-end justify-between">
          <h2 className="text-3xl font-bold text-lake md:text-4xl">Popular destinations</h2>
          <Link href="/destinations" className="text-sm font-medium text-crocus hover:underline">View all</Link>
        </div>
        <div className="mt-8">
          {!dest ? <ApiError /> : dest.items.length === 0 ? <Empty title="No destinations yet" hint="Run the seed script in the backend to add demo destinations." /> : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{dest.items.slice(0, 4).map((d) => <DestinationCard key={d._id} d={d} />)}</div>
          )}
        </div>
      </section>
      <section className="container-x pt-20">
        <div className="flex items-end justify-between">
          <h2 className="text-3xl font-bold text-lake md:text-4xl">Trending tours</h2>
          <Link href="/tours" className="text-sm font-medium text-crocus hover:underline">View all</Link>
        </div>
        <div className="mt-8">
          {!pk ? <ApiError /> : pk.items.length === 0 ? <Empty title="No tours yet" hint="Publish a package from the admin dashboard." /> : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{pk.items.map((p) => <PackageCard key={p._id} p={p} />)}</div>
          )}
        </div>
      </section>
      <GlobeSection />
      <section className="container-x pt-20">
        <div className="rounded-3xl bg-lake p-10 text-snow md:p-14">
          <h2 className="max-w-lg text-3xl font-bold md:text-4xl">Your dates, your budget, your pace</h2>
          <p className="mt-3 max-w-md text-glacier">Tell us who is travelling and how long you have. We'll price hotels, cabs and activities for you.</p>
          <Link href="/plan" className="btn btn-primary mt-6">Plan my trip</Link>
        </div>
      </section>
    </>
  );
}
