'use client';
import Link from 'next/link';
import { Clock, Star } from 'lucide-react';
import { TourPackage } from '@/types';
import Cover from './Cover';
import { discounted, inr } from '@/lib/format';
import TiltCard3D from './3d/TiltCard3D';

export default function PackageCard({ p }: { p: TourPackage }) {
  const price = discounted(p.basePrice, p.discountPercent);

  return (
    <TiltCard3D maxTilt={9} glare={true} className="h-full">
      <Link
        href={`/tours/${p.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-3xl border border-lake/10 bg-white/90 shadow-sm backdrop-blur transition-all hover:border-lake/25 hover:shadow-xl"
      >
        <div className="relative aspect-[16/10] overflow-hidden">
          <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-110">
            <Cover img={p.images[0]} name={p.title} />
          </div>
          {p.discountPercent > 0 && (
            <span className="absolute left-3.5 top-3.5 rounded-full bg-saffron px-3 py-1 text-xs font-bold text-deep shadow-md">
              {p.discountPercent}% off
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col p-6" style={{ transform: 'translateZ(25px)' }}>
          <p className="text-xs font-semibold uppercase tracking-wider text-crocus">
            {p.destination?.name}
          </p>
          <h3 className="mt-1 font-display text-lg font-bold text-lake transition-colors group-hover:text-crocus">
            {p.title}
          </h3>

          <div className="mt-3 flex items-center gap-4 text-xs font-medium text-mist">
            <span className="inline-flex items-center gap-1.5">
              <Clock size={14} className="text-lake" />
              {p.durationDays} days
            </span>
            <span className="inline-flex items-center gap-1 font-semibold text-lake">
              <Star size={14} className="fill-saffron text-saffron" />
              {p.rating.toFixed(1)} ({p.reviewCount})
            </span>
          </div>

          <div className="mt-auto pt-5 flex items-baseline justify-between border-t border-lake/5">
            <div>
              {p.discountPercent > 0 && (
                <span className="mr-2 text-xs text-mist line-through">
                  {inr(p.basePrice)}
                </span>
              )}
              <span className="font-display text-2xl font-bold text-lake">
                {inr(price)}
              </span>
            </div>
            <span className="text-xs font-medium text-mist">per traveler</span>
          </div>
        </div>
      </Link>
    </TiltCard3D>
  );
}
