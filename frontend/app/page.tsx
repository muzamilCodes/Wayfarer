import Link from 'next/link';
import Hero from '@/components/Hero';
import GlobeSection from '@/components/GlobeSection';
import DestinationCard from '@/components/DestinationCard';
import PackageCard from '@/components/PackageCard';
import { Empty } from '@/components/States';
import { getDestinations, getPackages } from '@/lib/api';
import Reveal from '@/components/3d/Reveal';
import { Sparkles, ArrowRight, ShieldCheck, HeartHandshake } from 'lucide-react';

export default async function Home() {
  const [dest, pk] = await Promise.all([
    getDestinations(),
    getPackages('limit=6'),
  ]);

  return (
    <>
      <Hero />

      {/* Popular destinations */}
      <section className="container-x pt-24">
        <Reveal>
          <div className="flex items-end justify-between border-b border-lake/10 pb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#E85D04]">
                Curated Himalayan Valleys
              </span>
              <h2 className="mt-1 text-3xl font-bold text-lake md:text-4xl">
                Popular destinations
              </h2>
            </div>
            <Link
              href="/destinations"
              className="group flex items-center gap-1.5 text-sm font-semibold text-lake hover:text-[#E85D04] transition-colors"
            >
              <span>View all destinations</span>
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>

        <div className="mt-8">
          {!dest || dest.items.length === 0 ? (
            <Empty
              title="No destinations found"
              hint="Check backend connection or review search filters."
            />
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {dest.items.slice(0, 4).map((d, i) => (
                <Reveal key={d._id} delay={i * 0.1}>
                  <DestinationCard d={d} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Trending tours */}
      <section className="container-x pt-24">
        <Reveal>
          <div className="flex items-end justify-between border-b border-lake/10 pb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#E85D04]">
                Top Rated Packages
              </span>
              <h2 className="mt-1 text-3xl font-bold text-lake md:text-4xl">
                Trending tours
              </h2>
            </div>
            <Link
              href="/tours"
              className="group flex items-center gap-1.5 text-sm font-semibold text-lake hover:text-[#E85D04] transition-colors"
            >
              <span>Explore all tours</span>
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>

        <div className="mt-8">
          {!pk || pk.items.length === 0 ? (
            <Empty
              title="No tours published yet"
              hint="Check admin dashboard to activate tour packages."
            />
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {pk.items.map((p, i) => (
                <Reveal key={p._id} delay={i * 0.1}>
                  <PackageCard p={p} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Interactive 3D Globe Section: Valley to the World */}
      <GlobeSection />

      {/* Bespoke Planning Banner */}
      <section className="container-x py-24">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-deep via-lake to-[#1B4B5C] p-10 text-snow shadow-2xl md:p-16">
            <div className="relative z-10 max-w-xl">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#E85D04]/15 border border-[#E85D04]/30 px-3.5 py-1 text-xs font-bold text-[#E85D04] uppercase tracking-wider mb-4">
                <Sparkles size={14} /> Tailored Himalayan Journeys
              </span>
              <h2 className="text-3xl font-extrabold md:text-5xl leading-tight">
                Your dates, your budget, your pace.
              </h2>
              <p className="mt-4 text-base md:text-lg text-glacier leading-relaxed">
                Tell us who is travelling and how long you have. We automatically coordinate heritage houseboats, private 4x4 mountain cabs, and skip-the-line gondola passes.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/plan"
                  className="btn btn-primary shadow-lg shadow-orange-500/20 hover:scale-105 transition-transform"
                >
                  Launch 3D Trip Wizard
                </Link>
                <Link
                  href="/contact"
                  className="btn btn-ghost border-white/20 text-snow hover:bg-white/10"
                >
                  Speak with Regional Guide
                </Link>
              </div>
            </div>

            {/* Ambient Background Accents */}
            <div className="absolute right-0 top-0 -mr-16 -mt-16 h-80 w-80 rounded-full bg-[#E85D04]/10 blur-3xl pointer-events-none" />
            <div className="absolute right-1/4 bottom-0 h-64 w-64 rounded-full bg-[#E85D04]/5 blur-3xl pointer-events-none" />
          </div>
        </Reveal>
      </section>
    </>
  );
}
