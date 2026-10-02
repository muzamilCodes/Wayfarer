'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Search, MapPin, Calendar, Clock, Sliders, Grid, List,
  ChevronDown, ChevronUp, RotateCcw, ChevronLeft, ChevronRight,
  Star, Compass, Plane, Mountain
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
      <div className="relative overflow-hidden bg-[#1A1A2E]">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&w=2000&q=85')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A2E]/90 via-[#1A1A2E]/70 to-[#1A1A2E]/50" />

        <div className="container-x relative z-10 pb-28 pt-8 md:pb-36 md:pt-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-[13px] text-white/60">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>›</span>
            <span className="text-white">Destinations</span>
          </nav>

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-6 max-w-2xl"
          >
            <h1 className="text-[32px] sm:text-[42px] lg:text-[48px] font-extrabold text-white leading-[1.15] tracking-tight">
              Explore Beautiful Places<br />
              in Jammu &amp; Kashmir
            </h1>
            <p className="mt-4 text-[14px] sm:text-[15px] text-white/70 leading-relaxed max-w-xl">
              Discover amazing places, unforgettable experiences and the best deals – all in one place.
            </p>
          </motion.div>
        </div>

        {/* ═══════════ FLOATING SEARCH BAR ═══════════ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="container-x relative z-20 -mb-14"
          style={{ marginTop: '-56px' }}
        >
          <div className="rounded-full bg-white shadow-xl shadow-black/10 border border-gray-100 p-1.5 sm:p-2">
            <div className="flex flex-col sm:flex-row items-center">

              {/* Destination */}
              <div className="flex-1 flex items-center gap-3 px-5 py-3 border-b sm:border-b-0 sm:border-r border-gray-200 w-full">
                <MapPin size={20} className="text-[#3B71FE] shrink-0" />
                <div className="flex-1">
                  <div className="text-[11px] font-bold text-gray-900 tracking-tight">Destination</div>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={e => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                    placeholder="Where are you going?"
                    className="w-full text-[13px] font-normal text-gray-700 placeholder:text-gray-400 focus:outline-none bg-transparent mt-0.5"
                  />
                </div>
              </div>

              {/* Region */}
              <div className="flex-1 flex items-center gap-3 px-5 py-3 border-b sm:border-b-0 sm:border-r border-gray-200 w-full">
                <Compass size={20} className="text-[#3B71FE] shrink-0" />
                <div className="flex-1">
                  <div className="text-[11px] font-bold text-gray-900 tracking-tight">Region</div>
                  <select
                    value={selectedDivision}
                    onChange={e => { setSelectedDivision(e.target.value); setCurrentPage(1); }}
                    className="w-full text-[13px] font-normal text-gray-600 focus:outline-none bg-transparent cursor-pointer mt-0.5"
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
              <div className="flex-1 flex items-center gap-3 px-5 py-3 border-b sm:border-b-0 sm:border-r border-gray-200 w-full">
                <Mountain size={20} className="text-[#3B71FE] shrink-0" />
                <div className="flex-1">
                  <div className="text-[11px] font-bold text-gray-900 tracking-tight">Travel Type</div>
                  <select
                    value={selectedTravelType}
                    onChange={e => { setSelectedTravelType(e.target.value); setCurrentPage(1); }}
                    className="w-full text-[13px] font-normal text-gray-600 focus:outline-none bg-transparent cursor-pointer mt-0.5"
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
              <div className="flex-1 flex items-center gap-3 px-5 py-3 w-full">
                <Clock size={20} className="text-[#3B71FE] shrink-0" />
                <div className="flex-1">
                  <div className="text-[11px] font-bold text-gray-900 tracking-tight">Duration</div>
                  <select
                    value={selectedDuration}
                    onChange={e => { setSelectedDuration(e.target.value); setCurrentPage(1); }}
                    className="w-full text-[13px] font-normal text-gray-600 focus:outline-none bg-transparent cursor-pointer mt-0.5"
                  >
                    <option value="Any">Any Duration</option>
                    <option value="1-3">1 - 3 Days</option>
                    <option value="4-7">4 - 7 Days</option>
                    <option value="8-14">8 - 14 Days</option>
                  </select>
                </div>
              </div>

              {/* Search Button */}
              <button
                onClick={() => setCurrentPage(1)}
                className="shrink-0 flex items-center gap-2 rounded-xl sm:rounded-full bg-[#FF5B00] hover:bg-[#E04F00] text-white h-[46px] px-8 font-semibold text-[14px] shadow-md shadow-orange-500/20 transition-all hover:shadow-orange-500/30 active:scale-95 ml-1"
              >
                <Search size={16} />
                <span className="inline">Search</span>
              </button>

            </div>
          </div>
        </motion.div>
      </div>

      {/* Spacer for floating search bar */}
      <div className="h-20" />

      {/* ═══════════ MAIN CONTENT ═══════════ */}
      <div className="container-x py-8">

        {/* Mobile filter toggle */}
        <div className="lg:hidden flex items-center justify-between mb-5 bg-white p-3 rounded-xl border border-gray-200">
          <span className="text-xs font-bold text-gray-800">Showing {filtered.length} destinations</span>
          <button onClick={() => setMobileFilterOpen(!mobileFilterOpen)} className="inline-flex items-center gap-1.5 rounded-lg bg-[#E85D04] text-white px-3 py-1.5 text-xs font-semibold">
            <Sliders size={14} /> Filters
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] xl:grid-cols-[260px_1fr] gap-8 items-start">

          {/* ═══════════ SIDEBAR ═══════════ */}
          <aside className={`${mobileFilterOpen ? 'block' : 'hidden lg:block'}`}>
            <div className="sticky top-20 rounded-xl bg-white border border-gray-200 p-5">

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
                  <Plane size={24} className="-rotate-45" />
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
