'use client';
import Link from 'next/link';
import { Star } from 'lucide-react';
import { Destination } from '@/types';
import Cover from './Cover';
import { inr } from '@/lib/format';
import TiltCard3D from './3d/TiltCard3D';

export default function DestinationCard({ d }: { d: Destination }) {
  return (
    <TiltCard3D maxTilt={10} glare={true} className="h-full">
      <Link
        href={`/destinations/${d.slug}`}
        className="group relative block aspect-[4/5] overflow-hidden rounded-3xl bg-lake shadow-md transition-shadow hover:shadow-xl"
      >
        <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-110">
          <Cover img={d.images?.[0]} name={d.name} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-deep/95 via-deep/30 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 p-6 text-snow" style={{ transform: 'translateZ(30px)' }}>
          <span className="rounded-full bg-white/20 px-2.5 py-0.5 text-[11px] font-semibold text-glacier backdrop-blur-sm">
            {d.region}
          </span>
          <h3 className="mt-2 font-display text-2xl font-bold tracking-tight text-white drop-shadow">
            {d.name}
          </h3>
          <p className="mt-1 line-clamp-2 text-xs text-glacier/90 leading-relaxed">
            {d.description}
          </p>
          <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3 text-sm">
            <span className="font-semibold text-snow">From {inr(d.startingPrice)}</span>
            <span className="inline-flex items-center gap-1 font-bold text-saffron">
              <Star size={14} className="fill-saffron text-saffron" />
              {d.rating.toFixed(1)}
            </span>
          </div>
        </div>
      </Link>
    </TiltCard3D>
  );
}
