import { Star } from 'lucide-react';
import Cover from './Cover';
import { inr } from '@/lib/format';
import { Listing } from '@/lib/api';

export default function ListingCard({ l, unit }: { l: Listing; unit: string }) {
  const price = l.pricePerNight ?? l.price ?? 0;
  return (
    <article className="overflow-hidden rounded-2xl border border-lake/10 bg-white transition-shadow hover:shadow-lg">
      <div className="relative aspect-[16/10]"><Cover img={l.images?.[0]} name={l.name} /></div>
      <div className="p-5">
        <p className="text-xs text-mist">{l.destination?.name}</p>
        <h3 className="mt-1 font-display text-lg font-semibold text-lake">{l.name}</h3>
        {l.amenities && l.amenities.length > 0 && <p className="mt-2 text-xs text-mist">{l.amenities.join(', ')}</p>}
        {l.durationHours && <p className="mt-2 text-xs text-mist">About {l.durationHours} hours</p>}
        <div className="mt-4 flex items-center justify-between">
          <p><span className="font-display text-xl font-bold text-lake">{inr(price)}</span><span className="text-xs text-mist"> {unit}</span></p>
          {l.rating ? <span className="inline-flex items-center gap-1 text-sm"><Star size={14} className="fill-saffron text-saffron" />{l.rating.toFixed(1)}</span> : null}
        </div>
      </div>
    </article>
  );
}
