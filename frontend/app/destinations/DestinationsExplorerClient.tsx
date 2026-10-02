'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Search, MapPin, Calendar, Clock, Sliders, Grid, List,
  ChevronDown, ChevronUp, RotateCcw, ChevronLeft, ChevronRight,
  Star, Compass, Mountain
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { JK_ALL_DISTRICTS, JKDistrictDestination } from '@/lib/jk-destinations-data';
import JKDestinationCard from '@/components/JKDestinationCard';
import District3DModal from '@/components/3d/District3DModal';

export default function DestinationsExplorerClient({
  initialQuery = '',
  initialRegion = 'All',
}: {
  initialQuery?: string;
  initialRegion?: string;
}) {
  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const [selectedDivision, setSelectedDivision] = useState<string>(initialRegion);
  const [selectedDistricts, setSelectedDistricts] = useState<string[]>([]);
  const [selectedTravelType, setSelectedTravelType] = useState<string>('All');
  const [selectedDuration, setSelectedDuration] = useState<string>('Any');
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [maxBudget, setMaxBudget] = useState<number>(15000);
  const [sortBy, setSortBy] = useState<'popular' | 'rating' | 'price-asc' | 'price-desc' | 'name'>('popular');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [openSections, setOpenSections] = useState({ region: true, budget: true, type: true, duration: true, rating: true });
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [activeDistrict, setActiveDistrict] = useState<JKDistrictDestination | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const toggle = (s: keyof typeof openSections) => setOpenSections(p => ({ ...p, [s]: !p[s] }));

  const handleToggleDistrict = (name: string) => {
    setCurrentPage(1);
    setSelectedDistricts(p => p.includes(name) ? p.filter(d => d !== name) : [...p, name]);
  };

  const resetFilters = () => {
    setSearchTerm(''); setSelectedDivision('All'); setSelectedDistricts([]);
    setSelectedTravelType('All'); setSelectedDuration('Any'); setSelectedRating(0);
    setMaxBudget(15000); setSortBy('popular'); setCurrentPage(1);
  };

  const filtered = useMemo(() => {
    return JK_ALL_DISTRICTS.filter(d => {
      if (searchTerm) {
        const q = searchTerm.toLowerCase();
        if (![d.district, d.tagline, d.shortDescription].some(s => s.toLowerCase().includes(q)) &&
            !d.touristPlaces.some(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)))
          return false;
      }
      if (selectedDivision !== 'All' && d.division !== selectedDivision) return false;
      if (selectedDistricts.length > 0 && !selectedDistricts.includes(d.district)) return false;
      if (selectedTravelType !== 'All' && !d.travelTypes.some(t => t.toLowerCase() === selectedTravelType.toLowerCase())) return false;
      if (selectedDuration !== 'Any' && d.durationCategory !== selectedDuration) return false;
      if (selectedRating > 0 && d.rating < selectedRating) return false;
      if (d.startingPrice > maxBudget) return false;
      return true;
    }).sort((a, b) => {
      if (sortBy === 'popular') return b.reviewsCount - a.reviewsCount;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'price-asc') return a.startingPrice - b.startingPrice;
      if (sortBy === 'price-desc') return b.startingPrice - a.startingPrice;
      if (sortBy === 'name') return a.district.localeCompare(b.district);
      return 0;
    });
  }, [searchTerm, selectedDivision, selectedDistricts, selectedTravelType, selectedDuration, selectedRating, maxBudget, sortBy]);

  const totalPages = Math.ceil(filtered.length / itemsPerPage) || 1;
  const paginated = useMemo(() => {
    const s = (currentPage - 1) * itemsPerPage;
    return filtered.slice(s, s + itemsPerPage);
  }, [filtered, currentPage]);

  const travelTypes = [
    { label: 'All Types', value: 'All' },
    { label: 'Nature & Lakes', value: 'Nature & Alpine Lakes' },
    { label: 'Adventure', value: 'Adventure & High Passes' },
    { label: 'Snow & Winter', value: 'Snow & Winter Sports' },
    { label: 'Honeymoon', value: 'Honeymoon & Romance' },
    { label: 'Family', value: 'Family & Leisure' },
    { label: 'Pilgrimage', value: 'Sacred Pilgrimage & Temples' },
    { label: 'Heritage', value: 'Heritage & Mughal Architecture' },
    { label: 'Offbeat', value: 'Offbeat & Camping' },
  ];

  const durations = [
    { label: 'Any Duration', value: 'Any' },
    { label: '1 – 3 Days', value: '1-3' },
    { label: '4 – 7 Days', value: '4-7' },
    { label: '8 – 14 Days', value: '8-14' },
  ];

  const ratingOpts = [
    { stars: 5.0, label: '5 Stars' },
    { stars: 4.8, label: '4.8 & up' },
    { stars: 4.7, label: '4.7 & up' },
  ];

  const getPages = () => {
    const p: (number | '...')[] = [];
    if (totalPages <= 7) { for (let i = 1; i <= totalPages; i++) p.push(i); }
    else {
      p.push(1);
      if (currentPage > 3) p.push('...');
      for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) p.push(i);
      if (currentPage < totalPages - 2) p.push('...');
      p.push(totalPages);
    }
    return p;
  };

  const countType = (v: string) => v === 'All' ? JK_ALL_DISTRICTS.length : JK_ALL_DISTRICTS.filter(d => d.travelTypes.some(t => t.toLowerCase() === v.toLowerCase())).length;
  const countDur = (v: string) => v === 'Any' ? JK_ALL_DISTRICTS.length : JK_ALL_DISTRICTS.filter(d => d.durationCategory === v).length;
  const countRating = (s: number) => JK_ALL_DISTRICTS.filter(d => d.rating >= s).length;

  // Checkbox component matching Travivu exactly
  const Checkbox = ({ checked, onChange }: { checked: boolean; onChange: () => void }) => (
    <button
      type="button"
      onClick={onChange}
      className={`flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded border-[1.5px] transition-colors ${
        checked ? 'bg-[#3B71FE] border-[#3B71FE]' : 'border-gray-300 bg-white hover:border-gray-400'
      }`}
    >
      {checked && (
        <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
      )}
    </button>
  );

  // Radio component
  const Radio = ({ checked, onChange }: { checked: boolean; onChange: () => void }) => (
    <button
      type="button"
      onClick={onChange}
      className={`flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border-[1.5px] transition-colors ${
        checked ? 'border-[#3B71FE]' : 'border-gray-300 hover:border-gray-400'
      }`}
    >
      {checked && <div className="h-[10px] w-[10px] rounded-full bg-[#3B71FE]" />}
    </button>
  );

  return (
    <div className="min-h-screen bg-[#F5F5F5]">

      {/* ═══════════ HERO BANNER ═══════════ */}
      <div className="relative overflow-hidden bg-[#0A192F]">
        {/* Background image with high clarity and contrast */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-105"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&w=2400&q=90')`,
          }}
        />
        {/* Cinematic gradient overlay for maximum readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

        <div className="container-x relative z-10 pt-8 sm:pt-12 md:pt-16 pb-16 sm:pb-24 md:pb-32">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs sm:text-[13px] font-medium text-white/70">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="text-white/40">›</span>
            <span className="text-white font-semibold">Destinations</span>
          </nav>

          {/* Heading & Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-4 sm:mt-6 max-w-3xl"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-extrabold text-white leading-[1.12] tracking-tight drop-shadow-sm">
              Explore Beautiful Places<br />
              <span className="text-white">in Jammu &amp; Kashmir</span>
            </h1>
            <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-white/85 leading-relaxed max-w-xl font-normal drop-shadow-sm">
              Discover amazing places, unforgettable experiences and the best deals – all in one place.
            </p>
          </motion.div>
        </div>

        {/* ═══════════ FLOATING SEARCH BAR ═══════════ */}
        <div className="container-x relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-2xl md:rounded-full bg-white shadow-[0_12px_45px_rgba(0,0,0,0.18)] border border-gray-100 p-2 sm:p-2.5 -mb-10 sm:-mb-12 md:-mb-14"
          >
            {/* Desktop: Horizontal Pill | Mobile: Clean Grid / Stack */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center divide-y md:divide-y-0 md:divide-x divide-gray-100">

              {/* Destination */}
              <div className="flex-1 flex items-center gap-3 px-4 py-3 md:py-2.5">
                <MapPin size={22} className="text-[#3B71FE] shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] md:text-[11px] font-bold text-gray-900 tracking-tight">Destination</div>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={e => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                    placeholder="Where are you going?"
                    className="w-full text-[13px] md:text-[14px] font-normal text-gray-700 placeholder:text-gray-400 focus:outline-none bg-transparent"
                  />
                </div>
              </div>

              {/* Region */}
              <div className="flex-1 flex items-center gap-3 px-4 py-3 md:py-2.5">
                <Compass size={22} className="text-[#3B71FE] shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] md:text-[11px] font-bold text-gray-900 tracking-tight">Region</div>
                  <select
                    value={selectedDivision}
                    onChange={e => { setSelectedDivision(e.target.value); setCurrentPage(1); }}
                    className="w-full text-[13px] md:text-[14px] font-normal text-gray-700 focus:outline-none bg-transparent cursor-pointer"
                  >
                    <option value="All">All Regions</option>
                    <option value="Kashmir Valley">Kashmir Valley</option>
                    <option value="Jammu Division">Jammu Division</option>
                    <option value="Chenab Valley">Chenab Valley</option>
                    <option value="Pir Panjal">Pir Panjal</option>
                  </select>
                </div>
              </div>

              {/* Travel Type */}
              <div className="flex-1 flex items-center gap-3 px-4 py-3 md:py-2.5">
                <Mountain size={22} className="text-[#3B71FE] shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] md:text-[11px] font-bold text-gray-900 tracking-tight">Travel Type</div>
                  <select
                    value={selectedTravelType}
                    onChange={e => { setSelectedTravelType(e.target.value); setCurrentPage(1); }}
                    className="w-full text-[13px] md:text-[14px] font-normal text-gray-700 focus:outline-none bg-transparent cursor-pointer"
                  >
                    <option value="All">All Types</option>
                    <option value="Nature & Alpine Lakes">Nature &amp; Lakes</option>
                    <option value="Snow & Winter Sports">Snow &amp; Winter</option>
                    <option value="Adventure & High Passes">Adventure</option>
                    <option value="Honeymoon & Romance">Honeymoon</option>
                    <option value="Family & Leisure">Family</option>
                    <option value="Sacred Pilgrimage & Temples">Pilgrimage</option>
                    <option value="Offbeat & Camping">Offbeat</option>
                  </select>
                </div>
              </div>

              {/* Duration */}
              <div className="flex-1 flex items-center gap-3 px-4 py-3 md:py-2.5">
                <Clock size={22} className="text-[#3B71FE] shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] md:text-[11px] font-bold text-gray-900 tracking-tight">Duration</div>
                  <select
                    value={selectedDuration}
                    onChange={e => { setSelectedDuration(e.target.value); setCurrentPage(1); }}
                    className="w-full text-[13px] md:text-[14px] font-normal text-gray-700 focus:outline-none bg-transparent cursor-pointer"
                  >
                    <option value="Any">Any Duration</option>
                    <option value="1-3">1 - 3 Days</option>
                    <option value="4-7">4 - 7 Days</option>
                    <option value="8-14">8 - 14 Days</option>
                  </select>
                </div>
              </div>

              {/* Search Button */}
              <div className="p-2 md:p-1 shrink-0">
                <button
                  onClick={() => setCurrentPage(1)}
                  className="w-full md:w-auto flex items-center justify-center gap-2 rounded-xl md:rounded-full bg-[#FF5B00] hover:bg-[#E04F00] text-white h-[48px] px-8 font-bold text-[14px] shadow-lg shadow-orange-500/25 transition-all hover:shadow-orange-500/40 active:scale-95"
                >
                  <Search size={18} />
                  <span>Search</span>
                </button>
              </div>

            </div>
          </motion.div>
        </div>
      </div>

      {/* Responsive Spacer so content never collides */}
      <div className="h-16 sm:h-20 md:h-24" />

      {/* ═══════════ MAIN CONTENT ═══════════ */}
      <div className="container-x py-4 sm:py-8">

        {/* Mobile Filter & Count Bar */}
        <div className="lg:hidden flex items-center justify-between gap-3 mb-5 bg-white p-3.5 rounded-2xl border border-gray-200/80 shadow-sm">
          <div>
            <span className="text-xs text-gray-500 block">Found</span>
            <span className="text-sm font-bold text-gray-900">{filtered.length} Destinations</span>
          </div>
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="inline-flex items-center gap-2 rounded-xl bg-[#3B71FE] text-white px-4 py-2.5 text-xs font-bold shadow-md shadow-blue-500/20 active:scale-95 transition"
          >
            <Sliders size={15} />
            <span>Filters</span>
            {(selectedDistricts.length > 0 || selectedDivision !== 'All' || selectedTravelType !== 'All' || selectedDuration !== 'Any' || selectedRating > 0) && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-[#3B71FE] text-[10px] font-black">
                !
              </span>
            )}
          </button>
        </div>

        {/* ═══════════ MOBILE SLIDE-IN FILTER DRAWER ═══════════ */}
        {mobileFilterOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex justify-end">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileFilterOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Slide-in Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 250 }}
              className="relative z-10 flex flex-col h-full w-full max-w-sm bg-white shadow-2xl"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between border-b border-gray-100 p-5">
                <div className="flex items-center gap-2">
                  <Sliders size={18} className="text-[#3B71FE]" />
                  <h3 className="text-base font-bold text-gray-900">Filter Destinations</h3>
                </div>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"
                >
                  ✕
                </button>
              </div>

              {/* Scrollable Filters Body */}
              <div className="flex-1 overflow-y-auto p-5 space-y-6">
                {/* Reset button */}
                <div className="flex justify-end">
                  <button onClick={resetFilters} className="text-xs font-semibold text-[#3B71FE] hover:underline">
                    Reset All Filters
                  </button>
                </div>

                {/* Region */}
                <div className="border-b border-gray-100 pb-5">
                  <div className="font-bold text-sm text-gray-900 mb-3">Region &amp; District</div>
                  <div className="max-h-56 overflow-y-auto space-y-2.5 pr-2">
                    <label className="flex items-center justify-between cursor-pointer">
                      <div className="flex items-center gap-2.5">
                        <Checkbox checked={selectedDistricts.length === 0 && selectedDivision === 'All'} onChange={() => { setSelectedDistricts([]); setSelectedDivision('All'); setCurrentPage(1); }} />
                        <span className="text-[13px] font-semibold text-gray-800">All Regions</span>
                      </div>
                      <span className="text-[11px] text-gray-400">{JK_ALL_DISTRICTS.length}</span>
                    </label>
                    {JK_ALL_DISTRICTS.map(d => (
                      <label key={d.id} className="flex items-center justify-between cursor-pointer">
                        <div className="flex items-center gap-2.5">
                          <Checkbox checked={selectedDistricts.includes(d.district)} onChange={() => handleToggleDistrict(d.district)} />
                          <span className="text-[13px] text-gray-700">{d.district}</span>
                        </div>
                        <span className="text-[11px] text-gray-400">{d.touristPlaces.length}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Budget */}
                <div className="border-b border-gray-100 pb-5">
                  <div className="font-bold text-sm text-gray-900 mb-3">Budget (Per Person)</div>
                  <input
                    type="range"
                    min={5000}
                    max={15000}
                    step={500}
                    value={maxBudget}
                    onChange={e => { setMaxBudget(Number(e.target.value)); setCurrentPage(1); }}
                    className="w-full accent-[#3B71FE] cursor-pointer"
                  />
                  <div className="flex justify-between mt-2 text-xs text-gray-500">
                    <span>₹5,000</span>
                    <span className="font-bold text-gray-900">₹{maxBudget.toLocaleString()}+</span>
                  </div>
                </div>

                {/* Travel Type */}
                <div className="border-b border-gray-100 pb-5">
                  <div className="font-bold text-sm text-gray-900 mb-3">Travel Type</div>
                  <div className="space-y-2.5">
                    {travelTypes.map(t => (
                      <label key={t.value} className="flex items-center justify-between cursor-pointer">
                        <div className="flex items-center gap-2.5">
                          <Radio checked={selectedTravelType === t.value} onChange={() => { setSelectedTravelType(t.value); setCurrentPage(1); }} />
                          <span className="text-[13px] text-gray-700">{t.label}</span>
                        </div>
                        <span className="text-[11px] text-gray-400">{countType(t.value)}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Duration */}
                <div className="border-b border-gray-100 pb-5">
                  <div className="font-bold text-sm text-gray-900 mb-3">Duration</div>
                  <div className="space-y-2.5">
                    {durations.map(d => (
                      <label key={d.value} className="flex items-center justify-between cursor-pointer">
                        <div className="flex items-center gap-2.5">
                          <Radio checked={selectedDuration === d.value} onChange={() => { setSelectedDuration(d.value); setCurrentPage(1); }} />
                          <span className="text-[13px] text-gray-700">{d.label}</span>
                        </div>
                        <span className="text-[11px] text-gray-400">{countDur(d.value)}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Rating */}
                <div>
                  <div className="font-bold text-sm text-gray-900 mb-3">Rating</div>
                  <div className="space-y-2.5">
                    <label className="flex items-center gap-2.5 cursor-pointer">
                      <Radio checked={selectedRating === 0} onChange={() => { setSelectedRating(0); setCurrentPage(1); }} />
                      <span className="text-[13px] text-gray-700">All Ratings</span>
                    </label>
                    {ratingOpts.map(r => (
                      <label key={r.stars} className="flex items-center justify-between cursor-pointer">
                        <div className="flex items-center gap-2.5">
                          <Radio checked={selectedRating === r.stars} onChange={() => { setSelectedRating(r.stars); setCurrentPage(1); }} />
                          <div className="flex items-center gap-0.5">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star key={i} size={13} className={i < Math.floor(r.stars) ? 'fill-amber-400 text-amber-400' : 'text-gray-300'} />
                            ))}
                            <span className="text-xs text-gray-600 ml-1">&amp; up</span>
                          </div>
                        </div>
                        <span className="text-[11px] text-gray-400">{countRating(r.stars)}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Drawer Footer */}
              <div className="border-t border-gray-100 p-4 bg-gray-50 flex items-center gap-3">
                <button
                  onClick={resetFilters}
                  className="flex-1 rounded-xl border border-gray-300 bg-white py-3 text-xs font-bold text-gray-700 hover:bg-gray-100"
                >
                  Reset
                </button>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="flex-1 rounded-xl bg-[#3B71FE] py-3 text-xs font-bold text-white shadow-md shadow-blue-500/25"
                >
                  Show {filtered.length} Results
                </button>
              </div>
            </motion.div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] xl:grid-cols-[260px_1fr] gap-8 items-start">

          {/* ═══════════ DESKTOP STICKY SIDEBAR ═══════════ */}
          <aside className="hidden lg:block">
            <div className="sticky top-20 rounded-2xl bg-white border border-gray-200/80 p-5 shadow-sm">

              {/* Header */}
              <div className="flex items-center justify-between pb-5 border-b border-gray-100">
                <h3 className="text-[16px] font-bold text-gray-900">Filter By</h3>
                <button onClick={resetFilters} className="text-[13px] font-semibold text-[#3B71FE] hover:underline">Reset All</button>
              </div>

              {/* ── Region ── */}
              <div className="py-4 border-b border-gray-100">
                <button onClick={() => toggle('region')} className="flex w-full items-center justify-between">
                  <span className="text-[13px] font-bold text-gray-900">Region</span>
                  {openSections.region ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
                </button>
                {openSections.region && (
                  <div className="mt-3 max-h-56 overflow-y-auto space-y-2.5 pr-1">
                    {/* All Regions */}
                    <label className="flex items-center justify-between cursor-pointer">
                      <div className="flex items-center gap-2.5">
                        <Checkbox checked={selectedDistricts.length === 0 && selectedDivision === 'All'} onChange={() => { setSelectedDistricts([]); setSelectedDivision('All'); setCurrentPage(1); }} />
                        <span className="text-[13px] text-gray-700">All Regions</span>
                      </div>
                      <span className="text-[12px] text-gray-400">{JK_ALL_DISTRICTS.length}</span>
                    </label>
                    {/* Each district */}
                    {JK_ALL_DISTRICTS.map(d => (
                      <label key={d.id} className="flex items-center justify-between cursor-pointer">
                        <div className="flex items-center gap-2.5">
                          <Checkbox checked={selectedDistricts.includes(d.district)} onChange={() => handleToggleDistrict(d.district)} />
                          <span className="text-[13px] text-gray-600">{d.district}</span>
                        </div>
                        <span className="text-[12px] text-gray-400">{d.touristPlaces.length}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* ── Budget ── */}
              <div className="py-4 border-b border-gray-100">
                <button onClick={() => toggle('budget')} className="flex w-full items-center justify-between">
                  <span className="text-[13px] font-bold text-gray-900">Budget (Per Person)</span>
                  {openSections.budget ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
                </button>
                {openSections.budget && (
                  <div className="mt-3">
                    <input type="range" min={5000} max={15000} step={500} value={maxBudget}
                      onChange={e => { setMaxBudget(Number(e.target.value)); setCurrentPage(1); }}
                      className="w-full accent-[#3B71FE] cursor-pointer h-1"
                    />
                    <div className="flex justify-between mt-2 text-[12px] text-gray-500">
                      <span>₹5,000</span>
                      <span className="font-bold text-gray-800">₹{maxBudget.toLocaleString()}+</span>
                    </div>
                  </div>
                )}
              </div>

              {/* ── Travel Type ── */}
              <div className="py-4 border-b border-gray-100">
                <button onClick={() => toggle('type')} className="flex w-full items-center justify-between">
                  <span className="text-[13px] font-bold text-gray-900">Travel Type</span>
                  {openSections.type ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
                </button>
                {openSections.type && (
                  <div className="mt-3 space-y-2.5">
                    {travelTypes.map(t => (
                      <label key={t.value} className="flex items-center justify-between cursor-pointer">
                        <div className="flex items-center gap-2.5">
                          <Radio checked={selectedTravelType === t.value} onChange={() => { setSelectedTravelType(t.value); setCurrentPage(1); }} />
                          <span className="text-[13px] text-gray-600">{t.label}</span>
                        </div>
                        <span className="text-[12px] text-gray-400">{countType(t.value)}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* ── Duration ── */}
              <div className="py-4 border-b border-gray-100">
                <button onClick={() => toggle('duration')} className="flex w-full items-center justify-between">
                  <span className="text-[13px] font-bold text-gray-900">Duration</span>
                  {openSections.duration ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
                </button>
                {openSections.duration && (
                  <div className="mt-3 space-y-2.5">
                    {durations.map(d => (
                      <label key={d.value} className="flex items-center justify-between cursor-pointer">
                        <div className="flex items-center gap-2.5">
                          <Radio checked={selectedDuration === d.value} onChange={() => { setSelectedDuration(d.value); setCurrentPage(1); }} />
                          <span className="text-[13px] text-gray-600">{d.label}</span>
                        </div>
                        <span className="text-[12px] text-gray-400">{countDur(d.value)}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* ── Rating ── */}
              <div className="py-4 border-b border-gray-100">
                <button onClick={() => toggle('rating')} className="flex w-full items-center justify-between">
                  <span className="text-[13px] font-bold text-gray-900">Rating</span>
                  {openSections.rating ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
                </button>
                {openSections.rating && (
                  <div className="mt-3 space-y-2.5">
                    <label className="flex items-center gap-2.5 cursor-pointer">
                      <Radio checked={selectedRating === 0} onChange={() => { setSelectedRating(0); setCurrentPage(1); }} />
                      <span className="text-[13px] text-gray-600">All Ratings</span>
                    </label>
                    {ratingOpts.map(r => (
                      <label key={r.stars} className="flex items-center justify-between cursor-pointer">
                        <div className="flex items-center gap-2.5">
                          <Radio checked={selectedRating === r.stars} onChange={() => { setSelectedRating(r.stars); setCurrentPage(1); }} />
                          <div className="flex items-center gap-0.5">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star key={i} size={13} className={i < Math.floor(r.stars) ? 'fill-amber-400 text-amber-400' : 'text-gray-300'} />
                            ))}
                            <span className="text-[12px] text-gray-500 ml-1">&amp; up</span>
                          </div>
                        </div>
                        <span className="text-[12px] text-gray-400">{countRating(r.stars)}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* View Results Button */}
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="mt-5 w-full rounded-xl border border-[#3B71FE] py-2.5 text-[13.5px] font-semibold text-[#3B71FE] hover:bg-[#3B71FE] hover:text-white transition-all shadow-sm"
              >
                View {filtered.length} Results
              </button>
            </div>
          </aside>

          {/* ═══════════ MAIN GRID ═══════════ */}
          <main>

            {/* Top bar */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
              <p className="text-[14px] text-gray-700">
                Showing <span className="font-bold text-gray-900">{filtered.length} destinations</span>
              </p>
              <div className="flex items-center gap-3">
                <div className="flex items-center rounded-lg border border-gray-200 bg-white px-3 py-1.5 shadow-sm">
                  <span className="text-[13px] text-gray-500 mr-1.5">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={e => setSortBy(e.target.value as typeof sortBy)}
                    className="text-[13px] font-semibold text-gray-800 focus:outline-none cursor-pointer bg-transparent"
                  >
                    <option value="popular">Popular (High to Low)</option>
                    <option value="rating">Rating (High to Low)</option>
                    <option value="price-asc">Price (Low to High)</option>
                    <option value="price-desc">Price (High to Low)</option>
                    <option value="name">Name (A to Z)</option>
                  </select>
                </div>
                <div className="flex items-center border border-gray-200 rounded-lg p-0.5 bg-white shadow-sm">
                  <button
                    onClick={() => setViewMode('grid')}
                    aria-label="Grid view"
                    className={`p-1.5 rounded-md transition ${
                      viewMode === 'grid' ? 'bg-[#3B71FE] text-white shadow-sm' : 'text-gray-400 hover:text-gray-700'
                    }`}
                  >
                    <Grid size={16} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    aria-label="List view"
                    className={`p-1.5 rounded-md transition ${
                      viewMode === 'list' ? 'bg-[#3B71FE] text-white shadow-sm' : 'text-gray-400 hover:text-gray-700'
                    }`}
                  >
                    <List size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Cards */}
            {paginated.length === 0 ? (
              <div className="rounded-xl border border-dashed border-gray-300 bg-white p-16 text-center">
                <Compass size={48} className="mx-auto text-gray-300" />
                <h3 className="mt-4 text-lg font-bold text-gray-800">No destinations match</h3>
                <p className="mt-2 text-[13px] text-gray-500">Try adjusting your filters.</p>
                <button onClick={resetFilters} className="mt-5 rounded-full bg-[#E85D04] px-6 py-2.5 text-[13px] font-bold text-white hover:bg-[#D45500] transition">
                  Reset All Filters
                </button>
              </div>
            ) : (
              <motion.div layout className={viewMode === 'grid' ? 'grid gap-6 sm:grid-cols-2 xl:grid-cols-3' : 'space-y-4'}>
                <AnimatePresence mode="popLayout">
                  {paginated.map((d, i) => (
                    <motion.div
                      key={d.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.04 }}
                    >
                      <JKDestinationCard
                        district={d}
                        onExplore={d => setActiveDistrict(d)}
                        isFavorite={favorites.includes(d.id)}
                        onToggleFavorite={id => setFavorites(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id])}
                        viewMode={viewMode}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-10 flex items-center justify-center gap-1">
                <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-40 transition" aria-label="Previous">
                  <ChevronLeft size={18} />
                </button>
                {getPages().map((pg, idx) =>
                  pg === '...' ? (
                    <span key={`e${idx}`} className="flex h-10 w-10 items-center justify-center text-[13px] text-gray-400">···</span>
                  ) : (
                    <button key={pg} onClick={() => setCurrentPage(pg as number)}
                      className={`flex h-10 w-10 items-center justify-center rounded-lg text-[13px] font-bold transition ${
                        currentPage === pg ? 'bg-[#3B71FE] text-white shadow-md' : 'border border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                      }`}>
                      {pg}
                    </button>
                  )
                )}
                <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-40 transition" aria-label="Next">
                  <ChevronRight size={18} />
                </button>
              </div>
            )}

            {/* CTA Banner */}
            <div className="mt-12 rounded-2xl bg-[#EBF2FF] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-5">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#3B71FE] text-white shadow-lg">
                  <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                  </svg>
                </div>
                <div>
                  <h4 className="text-[16px] font-bold text-gray-900">Can&apos;t find what you&apos;re looking for?</h4>
                  <p className="text-[13px] text-gray-500 mt-0.5">Our travel experts are here to help you plan the perfect trip.</p>
                </div>
              </div>
              <Link href="/contact" className="shrink-0 rounded-full border-2 border-[#3B71FE] px-6 py-2.5 text-[13px] font-bold text-[#3B71FE] hover:bg-[#3B71FE] hover:text-white transition-all">
                Contact an Expert
              </Link>
            </div>

          </main>
        </div>
      </div>

      {/* 3D Modal */}
      <District3DModal
        district={activeDistrict}
        onClose={() => setActiveDistrict(null)}
        onBookClick={d => { window.location.href = `/plan?district=${encodeURIComponent(d.district)}`; }}
      />
    </div>
  );
}
