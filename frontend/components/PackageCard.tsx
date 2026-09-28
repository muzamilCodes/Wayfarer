import Link from 'next/link';
import { Clock, Star } from 'lucide-react';
import { TourPackage } from '@/types';
import Cover from './Cover';
import { discounted, inr } from '@/lib/format';

export default function PackageCard({ p }: { p: TourPackage }) {
  const price = discounted(p.basePrice, p.discountPercent);
  return (
    <Link href={`/tours/${p.slug}`} className="group flex flex-col overflow-hidden rounded-2xl border border-lake/10 bg-white transition-shadow hover:shadow-lg">
      <div className="relative aspect-[16/10] overflow-hidden">
        <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-105"><Cover img={p.images[0]} name={p.title} /></div>
        {p.discountPercent > 0 && <span className="absolute left-3 top-3 rounded-full bg-saffron px-3 py-1 text-xs font-semibold text-deep">{p.discountPercent}% off</span>}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs text-mist">{p.destination?.name}</p>
        <h3 className="mt-1 font-display text-lg font-semibold text-lake">{p.title}</h3>
        <div className="mt-2 flex items-center gap-4 text-sm text-mist">
          <span className="inline-flex items-center gap-1"><Clock size={14} />{p.durationDays} days</span>
          <span className="inline-flex items-center gap-1"><Star size={14} className="fill-saffron text-saffron" />{p.rating.toFixed(1)} ({p.reviewCount})</span>
        </div>
        <div className="mt-auto pt-4">
          {p.discountPercent > 0 && <span className="mr-2 text-sm text-mist line-through">{inr(p.basePrice)}</span>}
          <span className="font-display text-xl font-bold text-lake">{inr(price)}</span>
          <span className="text-xs text-mist"> per person</span>
        </div>
      </div>
    </Link>
  );
}
