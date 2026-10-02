import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import ListingCard from '@/components/ListingCard';
import { Empty } from '@/components/States';
import { getActivities } from '@/lib/api';
import Reveal from '@/components/3d/Reveal';

export const metadata: Metadata = {
  title: 'Himalayan Activities & Adventures',
  description: 'Gulmarg Gondola rides, Dal Lake shikara sunset tours, Thajiwas glacier pony treks and river rafting.',
};

export default async function Activities() {
  const d = await getActivities();

  return (
    <>
      <PageHeader
        title="Alpine Activities & Excursions"
        subtitle="Iconic Himalayan adventures—from high gondolas and shikaras to powder ski trails and river rafting."
      />

      <div className="container-x pb-16 pt-2">
        {!d || d.items.length === 0 ? (
          <Empty title="No activities listed yet" hint="Seasonal adventures are being updated." />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {d.items.map((a, i) => (
              <Reveal key={a._id} delay={i * 0.08}>
                <ListingCard l={a} unit="per person" />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
