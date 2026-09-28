'use client';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useInView, motion, AnimatePresence } from 'framer-motion';
import { detectTier, Tier } from '@/lib/capability';

const GlobeScene = dynamic(() => import('./3d/GlobeScene'), { ssr: false });

const cities = [
  { name: 'Kashmir', lat: 34.08, lng: 74.8, blurb: 'Houseboats on Dal Lake, Gulmarg gondola and the Mughal gardens.' },
  { name: 'Delhi', lat: 28.61, lng: 77.21, blurb: 'Our main gateway: flights, trains and airport transfers.' },
  { name: 'Dubai', lat: 25.2, lng: 55.27, blurb: 'Desert safaris and skyline stays, easy from India.' },
  { name: 'Bali', lat: -8.41, lng: 115.19, blurb: 'Temples, rice terraces and beaches for a slower trip.' },
  { name: 'Paris', lat: 48.86, lng: 2.35, blurb: 'Museums, cafes and a Europe trip that starts on the Seine.' },
];

export default function GlobeSection() {
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, { once: true, margin: '200px' });
  const [tier, setTier] = useState<Tier>('none');
  const [sel, setSel] = useState(-1);
  useEffect(() => { if (seen) setTier(detectTier()); }, [seen]);
  const c = sel >= 0 ? cities[sel] : null;

  return (
    <section ref={ref} className="mt-24 bg-deep py-20 text-snow">
      <div className="container-x grid items-center gap-10 lg:grid-cols-2">
        <div>
          <h2 className="text-3xl font-bold md:text-5xl">From the valley to the world</h2>
          <p className="mt-4 max-w-md text-glacier">Start in Kashmir and keep going. Tap a marker to see what we arrange there.</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {cities.map((x, i) => (
              <button key={x.name} onClick={() => setSel(i === sel ? -1 : i)} aria-pressed={sel === i}
                className={`rounded-full border px-4 py-2 text-sm transition-colors ${sel === i ? 'border-saffron bg-saffron text-deep' : 'border-white/25 hover:border-saffron'}`}>{x.name}</button>
            ))}
          </div>
          <div className="mt-6 min-h-28" aria-live="polite">
            <AnimatePresence mode="wait">
              {c && (
                <motion.div key={c.name} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="max-w-md rounded-2xl bg-white/10 p-5 backdrop-blur">
                  <p className="font-display text-xl font-semibold">{c.name}</p>
                  <p className="mt-1 text-sm text-glacier">{c.blurb}</p>
                  <Link href={`/destinations?q=${c.name}`} className="btn btn-primary mt-4">See {c.name} trips</Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        <div className="aspect-square w-full max-w-xl justify-self-center">
          {tier !== 'none' && <GlobeScene cities={cities} selected={sel} onSelect={setSel} lite={tier === 'lite'} />}
        </div>
      </div>
    </section>
  );
}
