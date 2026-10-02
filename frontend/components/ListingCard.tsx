'use client';
import { Star } from 'lucide-react';
import Cover from './Cover';
import { inr } from '@/lib/format';
import { Listing } from '@/lib/api';
import TiltCard3D from './3d/TiltCard3D';
import FloatingIcon3D, { Icon3DType } from './3d/FloatingIcon3D';

export default function ListingCard({
  l,
  unit,
  iconType,
}: {
  l: Listing;
  unit: string;
  iconType?: Icon3DType;
}) {
  const price = l.pricePerNight ?? l.price ?? 0;
  // Default icon based on unit or name
  const effectiveIcon: Icon3DType =
    iconType ||
    (unit.includes('night')
      ? 'hotel'
      : l.name.toLowerCase().includes('shikara')
      ? 'shikara'
      : l.name.toLowerCase().includes('ski') || l.name.toLowerCase().includes('snow')
      ? 'ski'
      : 'boot');

  return (
    <TiltCard3D maxTilt={8} glare={true} className="h-full">
      <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-lake/10 bg-white/90 shadow-sm backdrop-blur transition-all hover:border-lake/25 hover:shadow-xl">
        <div className="relative aspect-[16/10] overflow-hidden">
          <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-110">
            <Cover img={l.images?.[0]} name={l.name} />
          </div>

          {/* Small 3D Floating Icon overlay in corner */}
          <div className="absolute right-3 top-3 z-10 h-12 w-12 rounded-2xl bg-lake/80 backdrop-blur-md p-1 shadow-lg transition-transform group-hover:scale-110">
            <FloatingIcon3D type={effectiveIcon} className="h-full w-full" />
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-deep/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        <div className="flex flex-1 flex-col p-6" style={{ transform: 'translateZ(20px)' }}>
          <p className="text-xs font-semibold uppercase tracking-wider text-crocus">
            {l.destination?.name || 'Himalayan Valley'}
          </p>
          <h3 className="mt-1 font-display text-lg font-bold text-lake transition-colors group-hover:text-crocus">
            {l.name}
          </h3>

          {/* Amenities with hover highlight */}
          {l.amenities && l.amenities.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5 transition-all">
              {l.amenities.slice(0, 4).map((a, i) => (
                <span
                  key={i}
                  className="rounded-lg bg-glacier/60 px-2 py-0.5 text-[11px] font-medium text-lake transition-colors group-hover:bg-glacier"
                >
                  {a}
                </span>
              ))}
            </div>
          )}

          {l.durationHours && (
            <p className="mt-2 text-xs font-medium text-mist">
              Estimated duration: {l.durationHours} hours
            </p>
          )}

          <div className="mt-auto pt-5 flex items-center justify-between border-t border-lake/5">
            <p>
              <span className="font-display text-2xl font-bold text-lake">
                {inr(price)}
              </span>
              <span className="text-xs text-mist"> {unit}</span>
            </p>
            {l.rating ? (
              <span className="inline-flex items-center gap-1 text-xs font-bold text-lake bg-amber-50 px-2 py-1 rounded-lg border border-amber-200">
                <Star size={13} className="fill-saffron text-saffron" />
                {l.rating.toFixed(1)}
              </span>
            ) : null}
          </div>
        </div>
      </article>
    </TiltCard3D>
  );
}
