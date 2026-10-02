'use client';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Compass, MapPin, Star, ArrowRight, Mountain, Snowflake } from 'lucide-react';
import { detectTier, Tier } from '@/lib/capability';

const Scene = dynamic(() => import('./3d/Scene'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-lake/40" />,
});

export default function Hero() {
  const [tier, setTier] = useState<Tier>('none');
  const [q, setQ] = useState('');
  const router = useRouter();

  useEffect(() => {
    const id = window.setTimeout(() => setTier(detectTier()), 100);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <section
      className="relative isolate flex min-h-[92vh] items-start overflow-hidden text-white"
      style={{
        background: 'linear-gradient(180deg,#0A2733 0%,#0F3B4A 40%,#3D6F82 70%,#B7D3DC 100%)',
      }}
    >
      {/* 3D Himalayan Ridge Real-time Canvas */}
      {tier !== 'none' && (
        <div className="absolute inset-0 -z-10">
          <Scene tier={tier} />
        </div>
      )}

      {/* Static fallback ridge line */}
      <svg
        viewBox="0 0 1200 200"
        preserveAspectRatio="none"
        className="absolute inset-x-0 bottom-0 -z-20 h-1/3 w-full"
        aria-hidden
      >
        <path
          d="M0 200V120l120-70 100 60 140-90 160 100 130-60 170 80 140-70 240 90v130z"
          fill="#0F3B4A"
        />
      </svg>

      <div className="container-x relative z-10 pt-20 md:pt-32">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold backdrop-blur-md mb-6">
            <Compass size={14} className="text-[#E85D04]" />
            <span>Kashmir, Ladakh & The Great Himalaya</span>
          </div>

          <h1 className="text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl lg:text-8xl drop-shadow-md">
            The Crown of
            <br />
            <span className="bg-gradient-to-r from-white via-amber-200 to-[#E85D04] bg-clip-text text-transparent">
              the Himalaya.
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-lg md:text-xl text-glacier leading-relaxed drop-shadow">
            Experience handpicked houseboats on Dal Lake, legendary ski slopes of Gulmarg, and high alpine passes of Ladakh with local Himalayan stewards.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/destinations"
              className="rounded-full bg-[#E85D04] hover:bg-[#dc5400] text-white px-7 py-3.5 text-sm font-bold shadow-lg shadow-orange-500/25 hover:scale-105 transition-all active:scale-95"
            >
              Explore Destinations
            </Link>
            <Link
              href="/plan"
              className="rounded-full border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/60 px-7 py-3.5 text-sm font-semibold transition-all"
            >
              Custom Trip Planner
            </Link>
          </div>

          {/* Quick Stats */}
          <div className="mt-10 flex flex-wrap gap-8">
            <div className="flex items-center gap-2 text-sm text-glacier/80">
              <Mountain size={16} className="text-[#E85D04]" />
              <span><strong className="text-white">20</strong> Districts</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-glacier/80">
              <Compass size={16} className="text-[#E85D04]" />
              <span><strong className="text-white">150+</strong> Tourist Places</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-glacier/80">
              <Snowflake size={16} className="text-[#E85D04]" />
              <span><strong className="text-white">365</strong> Days Open</span>
            </div>
          </div>
        </motion.div>

        {/* Floating Glassmorphism Search Box */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-12 max-w-2xl"
        >
          <form
            role="search"
            onSubmit={(e) => {
              e.preventDefault();
              router.push(`/destinations?q=${encodeURIComponent(q)}`);
            }}
            className="flex items-center gap-3 rounded-full border border-white/30 bg-white/20 p-2.5 text-white shadow-2xl backdrop-blur-xl transition-all focus-within:border-white/60 focus-within:bg-white/30"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#E85D04] text-white shadow-sm">
              <MapPin size={20} />
            </div>
            <label htmlFor="hero-q" className="sr-only">
              Where would you like to travel?
            </label>
            <input
              id="hero-q"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search Gulmarg, Srinagar, Pahalgam, Ladakh…"
              className="min-w-0 flex-1 bg-transparent px-2 py-2 text-sm text-white placeholder:text-glacier/80 outline-none font-medium"
            />
            <button className="rounded-full bg-[#E85D04] hover:bg-[#dc5400] px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-md transition-all hover:scale-105">
              Search
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
