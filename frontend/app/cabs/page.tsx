import type { Metadata } from 'next';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Users, Shield, Snowflake, Fuel } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import { Empty } from '@/components/States';
import { getVehicles } from '@/lib/api';
import { inr } from '@/lib/format';
import TiltCard3D from '@/components/3d/TiltCard3D';
import Reveal from '@/components/3d/Reveal';

const MountainPathScene = dynamic(() => import('@/components/3d/MountainPathScene'), {
  ssr: false,
  loading: () => <div className="h-56 w-full rounded-3xl bg-lake/40 animate-pulse" />,
});

export const metadata: Metadata = {
  title: 'Cabs & Transport | Mountain Fleet',
  description: 'Sanitized Sedans, 4x4 SUVs, and luxury tempo travellers with certified Himalayan mountain drivers.',
};

export default async function Cabs() {
  const d = await getVehicles();

  return (
    <>
      <PageHeader
        title="Cabs & Himalayan Fleet"
        subtitle="Dedicated heated private vehicles with veteran mountain drivers. Transparent per-kilometre billing."
      />

      <div className="container-x pb-16 pt-2">
        {/* Scroll-driven 3D Winding Mountain Road Scene */}
        <Reveal className="mb-10">
          <MountainPathScene />
        </Reveal>

        {!d || d.items.length === 0 ? (
          <Empty title="No vehicles yet" hint="Fleet is being updated. Contact support to arrange custom transport." />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {d.items.map((v, i) => (
              <Reveal key={v._id} delay={i * 0.1}>
                <TiltCard3D maxTilt={10} glare={true} className="h-full">
                  <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-lake/10 bg-white/90 p-7 shadow-sm backdrop-blur transition-all hover:border-lake/30 hover:shadow-xl">
                    <div className="flex items-center justify-between">
                      <span className="rounded-full bg-glacier/70 px-3 py-1 text-xs font-bold uppercase tracking-wider text-lake">
                        {v.category.replace('_', ' ')}
                      </span>
                      <span className="flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                        <Shield size={12} /> Verified Driver
                      </span>
                    </div>

                    <h3 className="mt-4 font-display text-2xl font-bold text-lake transition-colors group-hover:text-crocus">
                      {v.name}
                    </h3>

                    <div className="mt-4 space-y-2 text-xs text-mist">
                      <p className="flex items-center gap-2">
                        <Users size={15} className="text-lake" /> Up to {v.seats} passengers with luggage
                      </p>
                      <p className="flex items-center gap-2">
                        <Snowflake size={15} className="text-lake" /> Mountain climate heating & snow chains
                      </p>
                      <p className="flex items-center gap-2">
                        <Fuel size={15} className="text-lake" /> Fuel, tolls & driver allowances included
                      </p>
                    </div>

                    <div className="mt-auto pt-6 border-t border-lake/5 flex items-baseline justify-between">
                      <div>
                        <span className="text-[11px] text-mist uppercase font-semibold">Base Rate</span>
                        <p className="font-display text-2xl font-bold text-lake">
                          {inr(v.pricePerKm)}
                          <span className="text-xs font-normal text-mist"> / km</span>
                        </p>
                      </div>
                      <Link
                        href={`/plan?vehicle=${v.category}`}
                        className="btn btn-dark text-xs py-2.5 px-5 shadow-md shadow-lake/15 hover:scale-105 transition-transform"
                      >
                        Book in Plan
                      </Link>
                    </div>
                  </article>
                </TiltCard3D>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
