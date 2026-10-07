'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  MapPin,
  Compass,
  Users,
  Calendar,
  Search,
  ChevronRight,
  Star,
  Heart,
  Mountain,
  ArrowRight,
  ExternalLink,
  Camera,
  ShieldCheck,
  Phone,
  CheckCircle2,
} from 'lucide-react';
import { motion } from 'framer-motion';

// Authentic Real Tourist Places with exact names & imagery
export interface RealTouristPlace {
  id: string;
  name: string;
  subtitle: string;
  region: 'Kashmir' | 'Jammu' | 'Ladakh';
  rating: number;
  reviewsCount: number;
  duration: string;
  image: string;
  googleMapsUrl: string;
  highlights: string[];
}

export const REAL_TOURIST_DESTINATIONS: RealTouristPlace[] = [
  {
    id: 'srinagar',
    name: 'Srinagar',
    subtitle: 'Dal Lake & Mughal Gardens',
    region: 'Kashmir',
    rating: 4.9,
    reviewsCount: 380,
    duration: '3-5 Days',
    image: 'https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&w=1200&q=85',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Dal+Lake+Srinagar+Jammu+and+Kashmir',
    highlights: ['Dal Lake Shikara', 'Mughal Gardens', 'Houseboat Stay'],
  },
  {
    id: 'gulmarg',
    name: 'Gulmarg',
    subtitle: 'Meadows & World Highest Gondola',
    region: 'Kashmir',
    rating: 4.8,
    reviewsCount: 310,
    duration: '2-4 Days',
    image: 'https://images.unsplash.com/photo-1610478052166-5e5898d9ba88?auto=format&fit=crop&w=1200&q=85',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Gulmarg+Gondola+Baramulla+Jammu+and+Kashmir',
    highlights: ['Gondola Cable Car', 'Apharwat Peak', 'Ski Slopes'],
  },
  {
    id: 'leh-ladakh',
    name: 'Leh Ladakh',
    subtitle: 'High Mountain Passes & Monasteries',
    region: 'Ladakh',
    rating: 4.9,
    reviewsCount: 290,
    duration: '5-8 Days',
    image: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1200&q=85',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Pangong+Tso+Leh+Ladakh',
    highlights: ['Pangong Lake', 'Khardung La Pass', 'Nubra Valley'],
  },
  {
    id: 'pahalgam',
    name: 'Pahalgam',
    subtitle: 'Valleys of Shepherds & Lidder River',
    region: 'Kashmir',
    rating: 4.7,
    reviewsCount: 260,
    duration: '3-5 Days',
    image: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1200&q=85',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Betaab+Valley+Pahalgam+Anantnag+Jammu+and+Kashmir',
    highlights: ['Betaab Valley', 'Aru Valley', 'Baisaran Valley'],
  },
  {
    id: 'sonamarg',
    name: 'Sonamarg',
    subtitle: 'Meadows of Gold & Thajiwas Glacier',
    region: 'Kashmir',
    rating: 4.7,
    reviewsCount: 215,
    duration: '2-3 Days',
    image: 'https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&w=1200&q=85',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Thajiwas+Glacier+Sonamarg+Ganderbal+Jammu+and+Kashmir',
    highlights: ['Thajiwas Glacier', 'Sindh River Rafting', 'Zero Point'],
  },
  {
    id: 'vaishno-devi',
    name: 'Vaishno Devi (Katra)',
    subtitle: 'Holy Trikuta Hills Shrine & Bhairon',
    region: 'Jammu',
    rating: 4.9,
    reviewsCount: 450,
    duration: '2-3 Days',
    image: 'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=1200&q=85',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Mata+Vaishno+Devi+Bhavan+Katra+Jammu',
    highlights: ['Holy Cave Shrine', 'Bhairon Temple Ropeway', 'Ardhkuwari'],
  },
  {
    id: 'patnitop',
    name: 'Patnitop',
    subtitle: 'Dense Pine Forests & Skyview Gondola',
    region: 'Jammu',
    rating: 4.6,
    reviewsCount: 180,
    duration: '2-3 Days',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=85',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Patnitop+Hill+Station+Udhampur+Jammu',
    highlights: ['Skyview Gondola', 'Nathatop Snow Points', 'Sanasar Lake'],
  },
  {
    id: 'gurez-valley',
    name: 'Gurez Valley',
    subtitle: 'Habba Khatoon Peak & Kishanganga River',
    region: 'Kashmir',
    rating: 4.8,
    reviewsCount: 140,
    duration: '3-4 Days',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=85',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Habba+Khatoon+Peak+Gurez+Valley+Bandipora',
    highlights: ['Habba Khatoon Peak', 'Dawar Wooden Town', 'Kishanganga River'],
  },
  {
    id: 'doodhpathri',
    name: 'Doodhpathri',
    subtitle: 'Valley of Milk & Lush Green Meadows',
    region: 'Kashmir',
    rating: 4.7,
    reviewsCount: 130,
    duration: '1-2 Days',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=85',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Doodhpathri+Budgam+Jammu+and+Kashmir',
    highlights: ['Shaliganga Stream', 'Untouched Alpine Meadows', 'Pony Treks'],
  },
  {
    id: 'bhaderwah',
    name: 'Bhaderwah',
    subtitle: 'Mini Kashmir & Chinta Valley',
    region: 'Jammu',
    rating: 4.7,
    reviewsCount: 125,
    duration: '2-4 Days',
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=85',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Jai+Valley+Bhaderwah+Doda+Jammu+and+Kashmir',
    highlights: ['Jai Valley Meadows', 'Padri Pass (Snow)', 'Gupt Ganga Temple'],
  },
];

export default function HomePageClient() {
  const router = useRouter();

  // Search states matching Mockup Screen 1
  const [destinationQuery, setDestinationQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [selectedTravelType, setSelectedTravelType] = useState('All');
  const [selectedDuration, setSelectedDuration] = useState('Any');
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setFavorites(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (destinationQuery.trim()) params.set('q', destinationQuery.trim());
    if (selectedRegion !== 'All') params.set('region', selectedRegion);
    if (selectedTravelType !== 'All') params.set('type', selectedTravelType);
    if (selectedDuration !== 'Any') params.set('duration', selectedDuration);

    router.push(`/destinations?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">

      {/* ══════════════════════════════════════════════════════════════
          1. HERO SECTION (Exact Mockup 1 Layout & Visual Style)
      ══════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-slate-950 pb-12 pt-6 sm:pt-10 md:pt-14 text-white">
        {/* Scenic Background with Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&w=2000&q=90"
            alt="Jammu and Kashmir Himalaya"
            fill
            priority
            className="object-cover object-center brightness-90"
          />
          {/* Mockup Soft Radial & Linear Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#091E2C] via-[#091E2C]/50 to-black/35" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#091E2C]/80 via-transparent to-[#091E2C]/40" />
        </div>

        <div className="container-x relative z-10">
          {/* Top Pill: Jammu & Kashmir */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-1.5 rounded-full bg-[#0B6B52]/90 backdrop-blur-md px-3.5 py-1 text-xs font-bold text-white shadow-md border border-emerald-400/30 mb-4"
          >
            <MapPin size={13} className="text-emerald-200" />
            <span>Jammu &amp; Kashmir</span>
          </motion.div>

          {/* Main Title & Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-2xl"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-black leading-[1.15] tracking-tight drop-shadow-md">
              Explore Beautiful Places in Jammu &amp; Kashmir
            </h1>
            <p className="mt-3 text-sm sm:text-base text-gray-200/95 max-w-xl leading-relaxed drop-shadow">
              Discover amazing places, breathtaking landscapes and the best travel deals for your next adventure.
            </p>
          </motion.div>

          {/* ═══════════ INTERACTIVE SEARCH CARD (Exact Mockup 1) ═══════════ */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 sm:mt-8 max-w-xl md:max-w-2xl rounded-2xl bg-white p-4 sm:p-5 text-gray-900 shadow-[0_12px_40px_rgba(0,0,0,0.25)] border border-gray-100"
          >
            <form onSubmit={handleSearch} className="space-y-3">
              {/* Field 1: Destination */}
              <div className="flex items-center justify-between gap-3 p-2.5 rounded-xl bg-gray-50/80 border border-gray-100 hover:border-gray-200 transition">
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-[#0B6B52]">
                    <MapPin size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider">Destination</span>
                    <input
                      type="text"
                      value={destinationQuery}
                      onChange={(e) => setDestinationQuery(e.target.value)}
                      placeholder="Where do you want to go? (e.g. Gulmarg, Dal Lake)"
                      className="w-full bg-transparent text-xs sm:text-sm font-semibold text-gray-800 placeholder:text-gray-400 focus:outline-none"
                    />
                  </div>
                </div>
                <ChevronRight size={16} className="text-gray-400 shrink-0" />
              </div>

              {/* Grid: Region, Travel Type, Duration */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {/* Field 2: Region */}
                <div className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-gray-50/80 border border-gray-100">
                  <div className="flex items-center gap-2.5 min-w-0 flex-1">
                    <Compass size={17} className="text-[#0B6B52] shrink-0" />
                    <div className="flex-1 min-w-0">
                      <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">Region</span>
                      <select
                        value={selectedRegion}
                        onChange={(e) => setSelectedRegion(e.target.value)}
                        className="w-full bg-transparent text-xs font-semibold text-gray-800 focus:outline-none cursor-pointer"
                      >
                        <option value="All">All J&amp;K</option>
                        <option value="Kashmir">Kashmir</option>
                        <option value="Jammu">Jammu</option>
                        <option value="Ladakh">Ladakh</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Field 3: Travel Type */}
                <div className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-gray-50/80 border border-gray-100">
                  <div className="flex items-center gap-2.5 min-w-0 flex-1">
                    <Users size={17} className="text-[#0B6B52] shrink-0" />
                    <div className="flex-1 min-w-0">
                      <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">Travel Type</span>
                      <select
                        value={selectedTravelType}
                        onChange={(e) => setSelectedTravelType(e.target.value)}
                        className="w-full bg-transparent text-xs font-semibold text-gray-800 focus:outline-none cursor-pointer"
                      >
                        <option value="All">All Types</option>
                        <option value="Family">Family</option>
                        <option value="Adventure">Adventure</option>
                        <option value="Honeymoon">Honeymoon</option>
                        <option value="Nature">Nature</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Field 4: Duration */}
                <div className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-gray-50/80 border border-gray-100">
                  <div className="flex items-center gap-2.5 min-w-0 flex-1">
                    <Calendar size={17} className="text-[#0B6B52] shrink-0" />
                    <div className="flex-1 min-w-0">
                      <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">Duration</span>
                      <select
                        value={selectedDuration}
                        onChange={(e) => setSelectedDuration(e.target.value)}
                        className="w-full bg-transparent text-xs font-semibold text-gray-800 focus:outline-none cursor-pointer"
                      >
                        <option value="Any">Any Duration</option>
                        <option value="1-3">1-3 Days</option>
                        <option value="4-7">4-7 Days</option>
                        <option value="8+">8+ Days</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Search Button (Emerald Green like in Mockup 1) */}
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#0B6B52] hover:bg-[#08533F] active:scale-[0.99] text-white py-3.5 px-6 text-sm font-bold shadow-md shadow-emerald-900/20 transition duration-150"
              >
                <Search size={18} />
                <span>Search</span>
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          2. "20 AMAZING DESTINATIONS" BANNER (Matching Mockup 1)
      ══════════════════════════════════════════════════════════════ */}
      <section className="container-x mt-6 sm:mt-8">
        <Link
          href="/destinations"
          className="group flex items-center justify-between p-4 sm:p-5 rounded-2xl bg-white border border-gray-200/90 shadow-sm hover:shadow-md hover:border-[#0B6B52]/40 transition"
        >
          <div className="flex items-center gap-3.5">
            <div className="flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-[#0B6B52] group-hover:scale-105 transition-transform">
              <Mountain size={24} />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-gray-900 group-hover:text-[#0B6B52] transition-colors">
                20 Amazing Destinations
              </h3>
              <p className="text-xs text-gray-500">
                Discover the beauty of all districts across J&amp;K
              </p>
            </div>
          </div>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-600 group-hover:bg-[#0B6B52] group-hover:text-white transition-colors">
            <ChevronRight size={16} />
          </div>
        </Link>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          3. POPULAR DESTINATIONS (Matching Mockup 1: Srinagar, Gulmarg, Leh Ladakh, Pahalgam)
      ══════════════════════════════════════════════════════════════ */}
      <section className="container-x py-8 sm:py-12">
        {/* Section Header with "View All >" */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
              Popular Destinations
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Handpicked iconic valleys &amp; tourist places with real locations
            </p>
          </div>
          <Link
            href="/destinations"
            className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-[#0B6B52] hover:text-[#08533F] transition group"
          >
            <span>View All</span>
            <ChevronRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Cards Grid / Carousel */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {REAL_TOURIST_DESTINATIONS.slice(0, 8).map((dest) => {
            const isFav = !!favorites[dest.id];
            return (
              <div
                key={dest.id}
                className="group flex flex-col rounded-2xl bg-white border border-gray-200/80 shadow-sm hover:shadow-xl hover:border-[#0B6B52]/40 transition duration-300 overflow-hidden"
              >
                {/* Cover Image with Mockup Tags */}
                <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-slate-900">
                  <Image
                    src={dest.image}
                    alt={dest.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 300px"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/20" />

                  {/* Heart / Wishlist button (Matching Mockup Heart) */}
                  <button
                    type="button"
                    onClick={(e) => toggleFavorite(dest.id, e)}
                    aria-label="Save to wishlist"
                    className="absolute top-3 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 backdrop-blur-md text-white hover:bg-black/70 transition"
                  >
                    <Heart
                      size={15}
                      className={isFav ? 'fill-rose-500 text-rose-500' : 'text-white'}
                    />
                  </button>

                  {/* Region Badge */}
                  <div className="absolute bottom-3 right-3 z-10">
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#0B6B52]/90 backdrop-blur-md text-white px-2.5 py-0.5 text-[10px] font-bold">
                      {dest.region} &rarr;
                    </span>
                  </div>

                  {/* Rating & Review */}
                  <div className="absolute bottom-3 left-3 z-10 flex items-center gap-1 text-white">
                    <Star size={13} className="fill-amber-400 text-amber-400" />
                    <span className="text-xs font-bold">{dest.rating}</span>
                    <span className="text-[11px] text-gray-200">({dest.reviewsCount}+)</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-bold text-gray-900 group-hover:text-[#0B6B52] transition-colors">
                      {dest.name}
                    </h3>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {dest.subtitle}
                    </p>

                    {/* Highlights tags */}
                    <div className="mt-2.5 flex flex-wrap gap-1.5">
                      {dest.highlights.map((h, i) => (
                        <span
                          key={i}
                          className="rounded-md bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-600"
                        >
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Action Bar */}
                  <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                    <a
                      href={dest.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-[#0B6B52] hover:text-[#08533F] transition"
                    >
                      <MapPin size={12} />
                      <span>Google Maps</span>
                    </a>

                    <Link
                      href={`/destinations?q=${encodeURIComponent(dest.name)}`}
                      className="inline-flex items-center gap-1 rounded-lg bg-gray-50 hover:bg-[#0B6B52] hover:text-white px-2.5 py-1 text-[11px] font-bold text-gray-700 transition"
                    >
                      <span>Explore</span>
                      <ChevronRight size={13} />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          4. OUR STORY & LOCALLY GUIDED JOURNEYS (Matching Mockup 4: About)
      ══════════════════════════════════════════════════════════════ */}
      <section className="container-x py-8 sm:py-12">
        <div className="relative overflow-hidden rounded-3xl bg-[#0B6B52] text-white p-6 sm:p-10 md:p-12 shadow-xl">
          <div className="relative z-10 max-w-2xl">
            <span className="inline-block rounded-full bg-white/20 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-emerald-100 mb-3">
              Our Story
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight">
              Locally Guided Mountain Journeys
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100 mt-1">
              Across Kashmir, Ladakh and the Himalaya
            </p>
            <p className="mt-4 text-xs sm:text-sm text-white/90 leading-relaxed">
              Paradise Journey is more than just a travel company — we are a team of passionate locals, explorers and storytellers. We create unforgettable journeys that connect you with nature, culture and the true spirit of Jammu &amp; Kashmir.
            </p>

            {/* Stats row from Mockup 4 */}
            <div className="mt-8 grid grid-cols-3 gap-3 pt-6 border-t border-white/20 text-center">
              <div>
                <div className="text-xl sm:text-2xl md:text-3xl font-black text-white">12,500+</div>
                <div className="text-[10px] sm:text-xs text-emerald-200 mt-0.5">Happy Travelers</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl md:text-3xl font-black text-white">85+</div>
                <div className="text-[10px] sm:text-xs text-emerald-200 mt-0.5">Local Experts</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl md:text-3xl font-black text-white">14</div>
                <div className="text-[10px] sm:text-xs text-emerald-200 mt-0.5">Regions Covered</div>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/destinations"
                className="rounded-xl bg-white text-[#0B6B52] hover:bg-emerald-50 px-5 py-2.5 text-xs sm:text-sm font-bold shadow-md transition"
              >
                Browse All Destinations
              </Link>
              <Link
                href="/contact"
                className="rounded-xl border border-white/30 text-white hover:bg-white/10 px-5 py-2.5 text-xs sm:text-sm font-semibold transition"
              >
                Get in Touch
              </Link>
            </div>
          </div>

          {/* Decorative mountain background silhouette */}
          <div className="absolute right-0 bottom-0 opacity-15 pointer-events-none">
            <Mountain size={280} />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          5. WHY CHOOSE US
      ══════════════════════════════════════════════════════════════ */}
      <section className="container-x pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="flex items-center gap-3 p-4 rounded-xl bg-white border border-gray-200/80 shadow-sm">
            <CheckCircle2 size={24} className="text-[#0B6B52] shrink-0" />
            <div>
              <div className="text-xs font-bold text-gray-900">Local Expert Guides</div>
              <div className="text-[11px] text-gray-500">Born &amp; raised in J&amp;K</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 rounded-xl bg-white border border-gray-200/80 shadow-sm">
            <ShieldCheck size={24} className="text-[#0B6B52] shrink-0" />
            <div>
              <div className="text-xs font-bold text-gray-900">Safe &amp; Verified Trips</div>
              <div className="text-[11px] text-gray-500">Official registrations</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 rounded-xl bg-white border border-gray-200/80 shadow-sm">
            <Compass size={24} className="text-[#0B6B52] shrink-0" />
            <div>
              <div className="text-xs font-bold text-gray-900">Customized Itineraries</div>
              <div className="text-[11px] text-gray-500">Your budget &amp; pace</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 rounded-xl bg-white border border-gray-200/80 shadow-sm">
            <Phone size={24} className="text-[#0B6B52] shrink-0" />
            <div>
              <div className="text-xs font-bold text-gray-900">24/7 Local Support</div>
              <div className="text-[11px] text-gray-500">Always here on WhatsApp</div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
