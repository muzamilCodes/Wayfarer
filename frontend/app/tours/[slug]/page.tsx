import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Check, X } from 'lucide-react';
import Cover from '@/components/Cover';
import BookingPanel from '@/components/BookingPanel';
import { SITE, getPackage } from '@/lib/api';
import { discounted } from '@/lib/format';

type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = await getPackage(params.slug);
  return p ? { title: p.title, description: p.overview, alternates: { canonical: `/tours/${p.slug}` } } : {};
}

export default async function TourPage({ params }: Props) {
  const p = await getPackage(params.slug);
  if (!p) notFound();
  const jsonLd = {
    '@context': 'https://schema.org', '@type': 'TouristTrip', name: p.title, description: p.overview,
    url: `${SITE}/tours/${p.slug}`,
    offers: { '@type': 'Offer', priceCurrency: 'INR', price: discounted(p.basePrice, p.discountPercent) },
    ...(p.reviewCount > 0 && { aggregateRating: { '@type': 'AggregateRating', ratingValue: p.rating, reviewCount: p.reviewCount } }),
  };
  const list = (title: string, items: string[], good: boolean) => (
    <div>
      <h3 className="font-display text-lg font-semibold text-lake">{title}</h3>
      <ul className="mt-3 space-y-2 text-sm">
        {items.map((i) => <li key={i} className="flex gap-2">{good ? <Check size={16} className="mt-0.5 shrink-0 text-lake" /> : <X size={16} className="mt-0.5 shrink-0 text-mist" />}{i}</li>)}
      </ul>
    </div>
  );

  return (
    <div className="container-x py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav aria-label="Breadcrumb" className="text-sm text-mist">
        <Link href="/tours" className="hover:text-lake">Tours</Link> / <Link href={`/destinations/${p.destination.slug}`} className="hover:text-lake">{p.destination.name}</Link>
      </nav>
      <h1 className="mt-3 text-4xl font-bold text-lake md:text-5xl">{p.title}</h1>
      <p className="mt-2 text-mist">{p.durationDays} days · from {p.pickupLocation ?? p.destination.name}</p>
      <div className="relative mt-6 aspect-[21/9] overflow-hidden rounded-3xl bg-lake"><Cover img={p.images?.[0]} name={p.title} /></div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-12">
          <section><h2 className="text-2xl font-bold text-lake">Overview</h2><p className="mt-3 max-w-prose leading-relaxed">{p.overview}</p>
            {p.highlights.length > 0 && <ul className="mt-4 grid gap-2 sm:grid-cols-2">{p.highlights.map((h) => <li key={h} className="rounded-xl bg-glacier px-4 py-2 text-sm text-lake">{h}</li>)}</ul>}
          </section>
          {p.itinerary && p.itinerary.length > 0 && (
            <section><h2 className="text-2xl font-bold text-lake">Itinerary</h2>
              <div className="mt-4 divide-y divide-lake/10 rounded-2xl border border-lake/10 bg-white">
                {p.itinerary.map((d) => (
                  <details key={d.day} className="group p-4" open={d.day === 1}>
                    <summary className="cursor-pointer font-display font-semibold text-lake">Day {d.day}: {d.title}</summary>
                    <p className="mt-2 text-sm text-mist">{d.description}</p>
                    {d.meals && d.meals.length > 0 && <p className="mt-1 text-xs text-mist">Meals: {d.meals.join(', ')}</p>}
                  </details>
                ))}
              </div>
            </section>
          )}
          <section className="grid gap-8 sm:grid-cols-2">{list('Included', p.included, true)}{list('Not included', p.excluded, false)}</section>
          {p.cancellationPolicy && <section><h2 className="text-2xl font-bold text-lake">Cancellation policy</h2><p className="mt-3 max-w-prose">{p.cancellationPolicy}</p></section>}
        </div>
        <BookingPanel base={p.basePrice} discount={p.discountPercent} max={p.maxTravellers} />
      </div>
    </div>
  );
}
