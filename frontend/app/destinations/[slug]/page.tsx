import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Cover from '@/components/Cover';
import PackageCard from '@/components/PackageCard';
import { Empty } from '@/components/States';
import { getDestination, getPackages } from '@/lib/api';
import { inr } from '@/lib/format';

type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const d = await getDestination(params.slug);
  return d ? { title: d.name, description: d.description, alternates: { canonical: `/destinations/${d.slug}` } } : {};
}

export default async function DestinationPage({ params }: Props) {
  const d = await getDestination(params.slug);
  if (!d) notFound();
  const pk = await getPackages(`destination=${d.slug}&limit=12`);
  return (
    <>
      <section className="relative h-[50vh] min-h-[320px] overflow-hidden bg-lake text-snow">
        <Cover img={d.images[0]} name={d.name} />
        <div className="absolute inset-0 bg-gradient-to-t from-deep/85 to-transparent" />
        <div className="container-x absolute inset-x-0 bottom-0 pb-10">
          <p className="text-sm text-glacier">{d.region}, {d.country}</p>
          <h1 className="text-5xl font-bold md:text-6xl">{d.name}</h1>
        </div>
      </section>
      <div className="container-x grid gap-10 py-12 lg:grid-cols-[2fr_1fr]">
        <p className="max-w-prose text-lg leading-relaxed">{d.description}</p>
        <dl className="space-y-3 rounded-2xl border border-lake/10 bg-white p-6 text-sm">
          <div><dt className="text-mist">Best time to visit</dt><dd className="font-semibold text-lake">{d.bestTime ?? 'Year-round'}</dd></div>
          <div><dt className="text-mist">Tours from</dt><dd className="font-semibold text-lake">{inr(d.startingPrice)} per person</dd></div>
          <div><dt className="text-mist">Rating</dt><dd className="font-semibold text-lake">{d.rating.toFixed(1)} / 5</dd></div>
        </dl>
      </div>
      <section className="container-x pb-8">
        <h2 className="text-3xl font-bold text-lake">Tours in {d.name}</h2>
        <div className="mt-6">
          {!pk || pk.items.length === 0 ? <Empty title={`No tours in ${d.name} yet`} hint="Check back soon or ask us for a custom plan." /> : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{pk.items.map((p) => <PackageCard key={p._id} p={p} />)}</div>
          )}
        </div>
      </section>
    </>
  );
}
