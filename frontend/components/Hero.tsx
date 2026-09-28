'use client';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { detectTier, Tier } from '@/lib/capability';

const Scene = dynamic(() => import('./3d/Scene'), { ssr: false });

export default function Hero() {
  const [tier, setTier] = useState<Tier>('none');
  const [q, setQ] = useState('');
  const router = useRouter();
  useEffect(() => {
    // Defer WebGL until after first paint so it never blocks the initial load.
    const id = window.setTimeout(() => setTier(detectTier()), 300);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <section className="relative isolate flex min-h-[88vh] items-start overflow-hidden text-snow"
      style={{ background: 'linear-gradient(180deg,#0F3B4A 0%,#3D6F82 45%,#B7D3DC 80%)' }}>
      {/* Static fallback ridge line keeps the hero composed before or without WebGL */}
      <svg viewBox="0 0 1200 200" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 -z-10 h-1/3 w-full" aria-hidden>
        <path d="M0 200V120l120-70 100 60 140-90 160 100 130-60 170 80 140-70 240 90v130z" fill="#0F3B4A" />
      </svg>
      {tier !== 'none' && <div className="absolute inset-0 -z-10"><Scene tier={tier} /></div>}

      <div className="container-x pt-20 md:pt-28">
        <h1 className="max-w-3xl text-5xl font-bold leading-[1.05] md:text-7xl">Explore the world. Create your journey.</h1>
        <p className="mt-5 max-w-xl text-lg text-glacier">Discover breathtaking destinations, curated experiences and unforgettable adventures.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/destinations" className="btn btn-primary">Explore destinations</Link>
          <Link href="/plan" className="btn btn-ghost text-snow">Plan my trip</Link>
        </div>
        <form role="search" onSubmit={(e) => { e.preventDefault(); router.push(`/destinations?q=${encodeURIComponent(q)}`); }}
          className="mt-10 flex max-w-xl items-center gap-2 rounded-full bg-snow p-2 text-ink shadow-xl">
          <Search size={20} className="ml-3 shrink-0 text-mist" aria-hidden />
          <label htmlFor="hero-q" className="sr-only">Where do you want to go?</label>
          <input id="hero-q" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Where do you want to go?"
            className="min-w-0 flex-1 bg-transparent px-2 py-2 outline-none placeholder:text-mist" />
          <button className="btn btn-dark">Search</button>
        </form>
      </div>
    </section>
  );
}
