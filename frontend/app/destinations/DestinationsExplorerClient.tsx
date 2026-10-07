'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Search, MapPin, Calendar, Clock, Sliders, Grid, List,
  ChevronDown, ChevronUp, RotateCcw, ChevronLeft, ChevronRight,
  Star, Compass, Mountain, ArrowLeft, Heart, Users
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { JK_ALL_DISTRICTS } from '@/lib/jk-destinations-data';
import JKDestinationCard, { POPULAR_NAME_MAP } from '@/components/JKDestinationCard';
import MostPopularLoop from '@/components/MostPopularLoop';

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
      const info = POPULAR_NAME_MAP[d.district];
      const famousTitle = info?.displayTitle || '';
      const famousSubtitle = info?.subtitle || '';

      if (searchTerm) {
        const q = searchTerm.toLowerCase();
        if (![d.district, d.tagline, d.shortDescription, famousTitle, famousSubtitle].some(s => s.toLowerCase().includes(q)) &&
            !d.touristPlaces.some(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)))
          return false;
      }
      if (selectedDivision !== 'All') {
        if (selectedDivision === 'Kashmir') {
          if (!d.division.includes('Kashmir')) return false;
        } else if (selectedDivision === 'Jammu') {
          if (!d.division.includes('Jammu') && !d.division.includes('Chenab') && !d.division.includes('Pir Panjal')) return false;
        } else if (selectedDivision === 'Ladakh') {
          if (!d.division.includes('Ladakh') && d.id !== 'leh' && d.id !== 'kargil') return false;
        } else if (d.division !== selectedDivision) {
          return false;
        }
      }
      if (selectedDistricts.length > 0 && !selectedDistricts.includes(d.district)) return false;
      if (selectedTravelType !== 'All') {
        const q = selectedTravelType.toLowerCase();
        if (!d.travelTypes.some(t => t.toLowerCase().includes(q))) return false;
      }
      if (selectedDuration !== 'Any' && selectedDuration !== 'All') {
        if (selectedDuration === '8+' || selectedDuration === '8-14') {
          if (d.durationCategory !== '8-14' && d.durationCategory !== '15+') return false;
        } else if (d.durationCategory !== selectedDuration) {
          return false;
        }
      }
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

      {/* ═══════════ MOCKUP SCREEN 2: DESTINATIONS HEADER & HERO ═══════════ */}
      <div className="relative bg-[#091E2C] text-white pt-5 pb-6 sm:pb-8 shadow-md">
        <div className="container-x">
          {/* Top Bar: Back arrow to Home + "Destinations" Title (Exact Mockup 2 Header) */}
          <div className="flex items-center gap-3 mb-4">
            <Link
              href="/"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition active:scale-95"
              aria-label="Back to Home"
            >
              <ArrowLeft size={18} />
            </Link>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Destinations
            </h1>
          </div>

          {/* Search Input Bar (Mockup 2: Search destinations...) */}
          <div className="relative max-w-xl">
            <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search destinations (e.g. Gulmarg, Srinagar, Pahalgam)..."
              className="w-full rounded-xl bg-white pl-10 pr-4 py-2.5 text-xs sm:text-sm text-gray-900 placeholder:text-gray-400 font-medium shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs font-bold"
              >
                Clear
              </button>
            )}
          </div>

          {/* Region Pills (Mockup 2: All, Kashmir, Jammu, Ladakh) */}
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {[
              { label: 'All', value: 'All' },
              { label: 'Kashmir', value: 'Kashmir' },
              { label: 'Jammu', value: 'Jammu' },
              { label: 'Ladakh', value: 'Ladakh' },
            ].map((r) => {
              const active = selectedDivision === r.value;
              return (
                <button
                  key={r.value}
                  type="button"
                  onClick={() => {
                    setSelectedDivision(r.value);
                    setCurrentPage(1);
                  }}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition ${
                    active
                      ? 'bg-[#0B6B52] text-white shadow-md'
                      : 'bg-white/15 text-white/90 hover:bg-white/25 border border-white/10'
                  }`}
                >
                  {r.label}
                </button>
              );
            })}
          </div>

          {/* Travel Type Grid Buttons (Mockup 2: Family, Adventure, Honeymoon, Nature) */}
          <div className="mt-4">
            <span className="block text-[11px] font-bold text-gray-300 uppercase tracking-wider mb-2">
              Travel Type
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 max-w-xl">
              {[
                { label: 'Family', value: 'Family', icon: Users },
                { label: 'Adventure', value: 'Adventure', icon: Mountain },
                { label: 'Honeymoon', value: 'Honeymoon', icon: Heart },
                { label: 'Nature', value: 'Nature', icon: Compass },
              ].map((t) => {
                const Icon = t.icon;
                const active = selectedTravelType === t.value;
                return (
                  <button
                    key={t.value}
                    type="button"
                    onClick={() => {
                      setSelectedTravelType(active ? 'All' : t.value);
                      setCurrentPage(1);
                    }}
                    className={`flex items-center justify-center gap-2 py-2 px-3 rounded-xl border text-xs font-bold transition ${
                      active
                        ? 'bg-[#0B6B52] border-emerald-400 text-white shadow-md'
                        : 'bg-white/10 hover:bg-white/20 border-white/15 text-white'
                    }`}
                  >
                    <Icon size={14} className={active ? 'text-emerald-200' : 'text-gray-300'} />
                    <span>{t.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Duration Pills (Mockup 2: All, 1-3 Days, 4-7 Days, 8+ Days) */}
          <div className="mt-4">
            <span className="block text-[11px] font-bold text-gray-300 uppercase tracking-wider mb-1.5">
              Duration
            </span>
            <div className="flex flex-wrap items-center gap-2">
              {[
                { label: 'All', value: 'Any' },
                { label: '1-3 Days', value: '1-3' },
                { label: '4-7 Days', value: '4-7' },
                { label: '8+ Days', value: '8-14' },
              ].map((d) => {
                const active = selectedDuration === d.value;
                return (
                  <button
                    key={d.label}
                    type="button"
                    onClick={() => {
                      setSelectedDuration(d.value);
                      setCurrentPage(1);
                    }}
                    className={`px-3.5 py-1 rounded-lg text-xs font-semibold transition ${
                      active
                        ? 'bg-[#0B6B52] text-white shadow-md'
                        : 'bg-white/15 text-white/90 hover:bg-white/25 border border-white/10'
                    }`}
                  >
                    {d.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════ MAIN CONTENT ═══════════ */}
      <div className="container-x py-4 sm:py-8">

        {/* ═══════════ MOST POPULAR DESTINATIONS LOOP (CONTINUOUS RIGHT-TO-LEFT MARQUEE) ═══════════ */}
        <MostPopularLoop />

        {/* ═══════════ ALL 20 J&K DISTRICTS EXPLORER ═══════════ */}
        <div>
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
      </div>
    </div>
  );
}
