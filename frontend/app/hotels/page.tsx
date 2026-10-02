import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import ListingCard from '@/components/ListingCard';
import { Empty } from '@/components/States';
import { getHotels } from '@/lib/api';
import Reveal from '@/components/3d/Reveal';

export const metadata: Metadata = {
  title: 'Himalayan Hotels & Heritage Houseboats',
  description: 'Handcrafted wooden houseboats on Dal Lake, alpine ski lodges in Gulmarg, and riverside resorts in Pahalgam.',
};

export default async function Hotels() {
  const d = await getHotels();

  return (
    <>
      <PageHeader
        title="Hotels & Heritage Stays"
        subtitle="Carved cedarwood houseboats, pine timber ski chalets, and serene river lodges with 3D amenity previews."
      />

      <div className="container-x pb-16 pt-2">
        {!d || d.items.length === 0 ? (
          <Empty title="No hotels listed yet" hint="Partner properties are being updated." />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {d.items.map((h, i) => (
              <Reveal key={h._id} delay={i * 0.08}>
                <ListingCard l={h} unit="per night" iconType="hotel" />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
