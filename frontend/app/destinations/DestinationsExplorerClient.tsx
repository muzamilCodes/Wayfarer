'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Search, 
  MapPin, 
  Calendar, 
  Clock, 
  Sliders, 
  Grid, 
  List, 
  ChevronDown, 
  ChevronUp, 
  RotateCcw, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  Send, 
  Star,
  Check,
  Compass,
  MessageCircle,
  Plane,
  Mountain
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
  // Search & Filter States
  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const [selectedDivision, setSelectedDivision] = useState<string>(initialRegion);
  const [selectedDistricts, setSelectedDistricts] = useState<string[]>([]);
  const [selectedTravelType, setSelectedTravelType] = useState<string>('All');
  const [selectedDuration, setSelectedDuration] = useState<string>('Any');
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [maxBudget, setMaxBudget] = useState<number>(15000);
  const [sortBy, setSortBy] = useState<'popular' | 'rating' | 'price-asc' | 'price-desc' | 'name'>('popular');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Accordion toggle states
  const [openSections, setOpenSections] = useState({
    region: true,
    budget: true,
    type: true,
    duration: true,
    rating: true,
  });

  // Mobile filter drawer
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Modal active district
  const [activeDistrict, setActiveDistrict] = useState<JKDistrictDestination | null>(null);

  // Favorites state
  const [favorites, setFavorites] = useState<string[]>([]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const toggleAccordion = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleToggleDistrict = (districtName: string) => {
    setCurrentPage(1);
    setSelectedDistricts((prev) =>
      prev.includes(districtName)
        ? prev.filter((d) => d !== districtName)
        : [...prev, districtName]
    );
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedDivision('All');
    setSelectedDistricts([]);
    setSelectedTravelType('All');
    setSelectedDuration('Any');
    setSelectedRating(0);
    setMaxBudget(15000);
    setSortBy('popular');
    setCurrentPage(1);
  };

  const handleToggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Filtered & Sorted destinations
  const filteredDistricts = useMemo(() => {
    return JK_ALL_DISTRICTS.filter((d) => {
      // Search term: search by district name, division, tourist places, or description
      if (searchTerm) {
        const query = searchTerm.toLowerCase();
        const matchName = d.district.toLowerCase().includes(query);
        const matchTagline = d.tagline.toLowerCase().includes(query);
        const matchDesc = d.shortDescription.toLowerCase().includes(query);
        const matchPlaces = d.touristPlaces.some((p) =>
          p.name.toLowerCase().includes(query) || p.description.toLowerCase().includes(query)
        );
        if (!matchName && !matchTagline && !matchDesc && !matchPlaces) return false;
      }

      // Division filter
      if (selectedDivision !== 'All' && d.division !== selectedDivision) {
        return false;
      }

      // Specific District checkbox filter
      if (selectedDistricts.length > 0 && !selectedDistricts.includes(d.district)) {
        return false;
      }

      // Travel Type filter
      if (selectedTravelType !== 'All') {
        const matchesType = d.travelTypes.some(
          (t) => t.toLowerCase() === selectedTravelType.toLowerCase()
        );
        if (!matchesType) return false;
      }

      // Duration filter
      if (selectedDuration !== 'Any') {
        if (selectedDuration === '1-3' && d.durationCategory !== '1-3') return false;
        if (selectedDuration === '4-7' && d.durationCategory !== '4-7') return false;
        if (selectedDuration === '8-14' && d.durationCategory !== '8-14') return false;
      }

      // Rating filter
      if (selectedRating > 0 && d.rating < selectedRating) {
        return false;
      }

      // Budget filter
      if (d.startingPrice > maxBudget) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'popular') return b.reviewsCount - a.reviewsCount;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'price-asc') return a.startingPrice - b.startingPrice;
      if (sortBy === 'price-desc') return b.startingPrice - a.startingPrice;
      if (sortBy === 'name') return a.district.localeCompare(b.district);
      return 0;
    });
  }, [
    searchTerm,
    selectedDivision,
    selectedDistricts,
    selectedTravelType,
    selectedDuration,
    selectedRating,
    maxBudget,
    sortBy,
  ]);

  // Paginated items
  const totalPages = Math.ceil(filteredDistricts.length / itemsPerPage) || 1;
  const paginatedDistricts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredDistricts.slice(start, start + itemsPerPage);
  }, [filteredDistricts, currentPage, itemsPerPage]);

  // Count active filters
  const activeFilterCount = 
    (selectedDivision !== 'All' ? 1 : 0) +
    selectedDistricts.length +
    (selectedTravelType !== 'All' ? 1 : 0) +
    (selectedDuration !== 'Any' ? 1 : 0) +
    (selectedRating > 0 ? 1 : 0) +
    (maxBudget < 15000 ? 1 : 0);

  // Travel types with counts
  const travelTypeOptions = [
    { label: 'All Types', value: 'All' },
    { label: 'Nature & Alpine Lakes', value: 'Nature & Alpine Lakes' },
    { label: 'Snow & Winter Sports', value: 'Snow & Winter Sports' },
    { label: 'Sacred Pilgrimage & Temples', value: 'Sacred Pilgrimage & Temples' },
    { label: 'Adventure & High Passes', value: 'Adventure & High Passes' },
    { label: 'Honeymoon & Romance', value: 'Honeymoon & Romance' },
    { label: 'Heritage & Mughal Architecture', value: 'Heritage & Mughal Architecture' },
    { label: 'Family & Leisure', value: 'Family & Leisure' },
    { label: 'Offbeat & Camping', value: 'Offbeat & Camping' },
  ];

  // Count per travel type
  const travelTypeCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    travelTypeOptions.forEach((opt) => {
      if (opt.value === 'All') {
        counts['All'] = JK_ALL_DISTRICTS.length;
      } else {
        counts[opt.value] = JK_ALL_DISTRICTS.filter((d) =>
          d.travelTypes.some((t) => t.toLowerCase() === opt.value.toLowerCase())
        ).length;
      }
    });
    return counts;
  }, []);

  // Duration counts
  const durationOptions = [
    { label: 'Any Duration', value: 'Any', count: JK_ALL_DISTRICTS.length },
    { label: '1 – 3 Days', value: '1-3', count: JK_ALL_DISTRICTS.filter((d) => d.durationCategory === '1-3').length },
    { label: '4 – 7 Days', value: '4-7', count: JK_ALL_DISTRICTS.filter((d) => d.durationCategory === '4-7').length },
    { label: '8 – 14 Days', value: '8-14', count: JK_ALL_DISTRICTS.filter((d) => d.durationCategory === '8-14').length },
  ];

  // Rating options
  const ratingOptions = [
    { label: '5 Stars', stars: 5 },
    { label: '4 Stars & up', stars: 4 },
    { label: '3 Stars & up', stars: 3 },
    { label: '2 Stars & up', stars: 2 },
  ];

  // Pagination display helpers
  const getPageNumbers = () => {
    const pages: (number | '...')[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push('...');
      for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
        pages.push(i);
      }
      if (currentPage < totalPages - 2) pages.push('...');
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* ========================================================================= */}
      {/* 1. HERO BANNER - Travivu-Style with Scenic Background                    */}
      {/* ========================================================================= */}
      <div className="relative overflow-hidden bg-[#0F3B4A] pb-28 pt-12 md:pb-36 md:pt-16">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&w=2000&q=85')`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A2733]/95 via-[#0F3B4A]/80 to-[#0F3B4A]/70" />

        {/* Animated mountain silhouette */}
        <svg
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          className="absolute inset-x-0 bottom-0 h-16 w-full"
          aria-hidden
        >
          <path
            d="M0 120V60l160-30 200 20 180-40 200 30 160-10 200 25 180-35 160 20V120z"
            fill="#F8FAFC"
          />
        </svg>

        <div className="container-x relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-[13px] font-medium text-white/70">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="text-white/40">›</span>
            <span className="text-white font-semibold">Destinations</span>
          </nav>

          {/* Hero Heading */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mt-6 max-w-3xl"
          >
            <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-[56px] leading-[1.1]">
              Explore Beautiful Places
              <br />
              <span className="bg-gradient-to-r from-white via-amber-200 to-amber-400 bg-clip-text text-transparent">
                in Jammu & Kashmir
              </span>
            </h1>
            <p className="mt-4 text-[15px] text-white/75 leading-relaxed max-w-2xl">
              Discover breathtaking valleys, snow peaks, sacred shrines, and pristine alpine lakes across all 20 districts of Jammu & Kashmir — all in one place.
            </p>
          </motion.div>
        </div>

        {/* ============================== */}
        {/* FLOATING SEARCH BAR - Travivu Style */}
        {/* ============================== */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="container-x relative z-20 mt-10 md:mt-12"
        >
          <div className="rounded-full bg-white p-2 shadow-2xl shadow-black/15 border border-white/80">
            <div className="flex flex-col md:flex-row items-center">
              
              {/* Destination Input */}
              <div className="flex-1 flex items-center gap-3 px-4 py-2.5 border-r-0 md:border-r border-slate-200/60 min-w-0">
                <MapPin size={20} className="text-[#E85D04] shrink-0" />
                <div className="flex-1 min-w-0">
                  <label htmlFor="search-input" className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Destination
                  </label>
                  <input
                    id="search-input"
                    type="text"
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1);
                    }}
                    placeholder="Where are you going?"
                    className="w-full text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none bg-transparent"
                  />
                </div>
              </div>

              {/* Region Select */}
              <div className="flex-1 flex items-center gap-3 px-4 py-2.5 border-r-0 md:border-r border-slate-200/60 min-w-0">
                <Compass size={20} className="text-[#E85D04] shrink-0" />
                <div className="flex-1 min-w-0">
                  <label htmlFor="region-select" className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Region
                  </label>
                  <select
                    id="region-select"
                    value={selectedDivision}
                    onChange={(e) => {
                      setSelectedDivision(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full text-sm font-semibold text-slate-900 focus:outline-none bg-transparent cursor-pointer"
                  >
                    <option value="All">All Regions</option>
                    <option value="Kashmir Valley">Kashmir Valley</option>
                    <option value="Jammu Division">Jammu Division</option>
                    <option value="Chenab Valley">Chenab Valley</option>
                    <option value="Pir Panjal">Pir Panjal</option>
                  </select>
                </div>
              </div>

              {/* Travel Type Select */}
              <div className="flex-1 flex items-center gap-3 px-4 py-2.5 border-r-0 md:border-r border-slate-200/60 min-w-0">
                <Mountain size={20} className="text-[#E85D04] shrink-0" />
                <div className="flex-1 min-w-0">
                  <label htmlFor="type-select" className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Travel Type
                  </label>
                  <select
                    id="type-select"
                    value={selectedTravelType}
                    onChange={(e) => {
                      setSelectedTravelType(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full text-sm font-semibold text-slate-900 focus:outline-none bg-transparent cursor-pointer"
                  >
                    <option value="All">All Types</option>
                    <option value="Snow & Winter Sports">Snow & Winter</option>
                    <option value="Nature & Alpine Lakes">Nature & Lakes</option>
                    <option value="Sacred Pilgrimage & Temples">Pilgrimage</option>
                    <option value="Adventure & High Passes">Adventure</option>
                    <option value="Honeymoon & Romance">Honeymoon</option>
                    <option value="Family & Leisure">Family</option>
                    <option value="Offbeat & Camping">Offbeat</option>
                  </select>
                </div>
              </div>

              {/* Duration Select */}
              <div className="flex-1 flex items-center gap-3 px-4 py-2.5 min-w-0">
                <Clock size={20} className="text-[#E85D04] shrink-0" />
                <div className="flex-1 min-w-0">
                  <label htmlFor="duration-select" className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Duration
                  </label>
                  <select
                    id="duration-select"
                    value={selectedDuration}
                    onChange={(e) => {
                      setSelectedDuration(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full text-sm font-semibold text-slate-900 focus:outline-none bg-transparent cursor-pointer"
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
                className="shrink-0 flex items-center justify-center gap-1.5 rounded-full bg-[#E85D04] hover:bg-[#dc5400] text-white h-12 w-12 md:h-12 md:w-auto md:px-6 font-bold text-sm shadow-lg shadow-orange-500/25 transition-all hover:scale-105 active:scale-95 ml-1"
              >
                <Search size={18} />
                <span className="hidden md:inline">Search</span>
              </button>

            </div>
          </div>
        </motion.div>
      </div>

      {/* ========================================================================= */}
      {/* 2. MAIN CONTENT AREA: TWO COLUMNS (SIDEBAR FILTERS + DESTINATIONS GRID)  */}
      {/* ========================================================================= */}
      <div className="container-x py-10 md:py-14">
        
        {/* Mobile filter toggle bar */}
        <div className="lg:hidden flex items-center justify-between mb-6 bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-xs font-bold text-slate-800">
            Showing {filteredDistricts.length} destinations
          </span>
          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#E85D04] text-white px-3.5 py-1.5 text-xs font-semibold shadow-sm"
          >
            <Sliders size={14} />
            <span>Filters {activeFilterCount > 0 ? `(${activeFilterCount})` : ''}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          
          {/* ===================================================================== */}
          {/* LEFT SIDEBAR: FILTERS (Travivu-Style)                                */}
          {/* ===================================================================== */}
          <aside className={`lg:col-span-1 ${mobileFilterOpen ? 'block' : 'hidden lg:block'}`}>
            <div className="sticky top-20 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm divide-y divide-slate-100">
              
              {/* Header: Filter By & Reset All */}
              <div className="flex items-center justify-between pb-4">
                <h3 className="font-display text-base font-bold text-slate-900">
                  Filter By
                </h3>
                <button
                  onClick={handleResetFilters}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#E85D04] hover:text-[#c14e00] transition-colors"
                >
                  <span>Reset All</span>
                </button>
              </div>

              {/* Section 1: Region / Districts */}
              <div className="py-4">
                <button
                  onClick={() => toggleAccordion('region')}
                  className="flex w-full items-center justify-between font-bold text-sm text-slate-800 hover:text-slate-900"
                >
                  <span>Region</span>
                  {openSections.region ? <ChevronUp size={16} className="text-slate-400" /> : <ChevronDown size={16} className="text-slate-400" />}
                </button>

                {openSections.region && (
                  <div className="mt-3 max-h-64 overflow-y-auto space-y-1 pr-1 text-xs">
                    {/* All Districts checkbox */}
                    <label className="flex items-center justify-between cursor-pointer py-1.5 px-2 rounded-lg hover:bg-slate-50 transition-colors">
                      <div className="flex items-center gap-2.5">
                        <input
                          type="checkbox"
                          checked={selectedDistricts.length === 0 && selectedDivision === 'All'}
                          onChange={() => {
                            setSelectedDistricts([]);
                            setSelectedDivision('All');
                            setCurrentPage(1);
                          }}
                          className="rounded border-slate-300 text-[#E85D04] focus:ring-[#E85D04] w-4 h-4"
                        />
                        <span className="font-semibold text-slate-800">All Regions</span>
                      </div>
                      <span className="text-[11px] font-medium text-slate-400">{JK_ALL_DISTRICTS.length}</span>
                    </label>

                    {/* District item list */}
                    {JK_ALL_DISTRICTS.map((d) => {
                      const isChecked = selectedDistricts.includes(d.district);
                      return (
                        <label
                          key={d.id}
                          className="flex items-center justify-between cursor-pointer py-1.5 px-2 rounded-lg hover:bg-slate-50 transition-colors"
                        >
                          <div className="flex items-center gap-2.5">
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => handleToggleDistrict(d.district)}
                              className="rounded border-slate-300 text-[#E85D04] focus:ring-[#E85D04] w-4 h-4"
                            />
                            <span className={`${isChecked ? 'text-slate-900 font-semibold' : 'text-slate-600'}`}>
                              {d.district}
                            </span>
                          </div>
                          <span className="text-[10px] font-medium text-slate-400">
                            {d.touristPlaces.length}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Section 2: Budget (Per Person) */}
              <div className="py-4">
                <button
                  onClick={() => toggleAccordion('budget')}
                  className="flex w-full items-center justify-between font-bold text-sm text-slate-800 hover:text-slate-900"
                >
                  <span>Budget (Per Person)</span>
                  {openSections.budget ? <ChevronUp size={16} className="text-slate-400" /> : <ChevronDown size={16} className="text-slate-400" />}
                </button>

                {openSections.budget && (
                  <div className="mt-3 space-y-3">
                    <input
                      type="range"
                      min={5000}
                      max={15000}
                      step={500}
                      value={maxBudget}
                      onChange={(e) => {
                        setMaxBudget(Number(e.target.value));
                        setCurrentPage(1);
                      }}
                      className="w-full accent-[#E85D04] cursor-pointer h-1.5"
                    />
                    <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
                      <span>₹{(5000).toLocaleString()}</span>
                      <span className="rounded-md bg-orange-50 border border-orange-200/50 px-2.5 py-0.5 text-[#E85D04] font-bold">
                        ₹{maxBudget.toLocaleString()}
                      </span>
                      <span>₹{(15000).toLocaleString()}+</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Section 3: Travel Type */}
              <div className="py-4">
                <button
                  onClick={() => toggleAccordion('type')}
                  className="flex w-full items-center justify-between font-bold text-sm text-slate-800 hover:text-slate-900"
                >
                  <span>Travel Type</span>
                  {openSections.type ? <ChevronUp size={16} className="text-slate-400" /> : <ChevronDown size={16} className="text-slate-400" />}
                </button>

                {openSections.type && (
                  <div className="mt-3 space-y-1 text-xs">
                    {travelTypeOptions.map((opt) => (
                      <label
                        key={opt.value}
                        className="flex items-center justify-between cursor-pointer py-1.5 px-2 rounded-lg hover:bg-slate-50 transition-colors"
                      >
                        <div className="flex items-center gap-2.5">
                          <input
                            type="radio"
                            name="travelType"
                            checked={selectedTravelType === opt.value}
                            onChange={() => {
                              setSelectedTravelType(opt.value);
                              setCurrentPage(1);
                            }}
                            className="text-[#E85D04] focus:ring-[#E85D04] w-4 h-4"
                          />
                          <span className={`${selectedTravelType === opt.value ? 'text-slate-900 font-semibold' : 'text-slate-600'}`}>{opt.label}</span>
                        </div>
                        <span className="text-[10px] font-medium text-slate-400">{travelTypeCounts[opt.value]}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Section 4: Duration */}
              <div className="py-4">
                <button
                  onClick={() => toggleAccordion('duration')}
                  className="flex w-full items-center justify-between font-bold text-sm text-slate-800 hover:text-slate-900"
                >
                  <span>Duration</span>
                  {openSections.duration ? <ChevronUp size={16} className="text-slate-400" /> : <ChevronDown size={16} className="text-slate-400" />}
                </button>

                {openSections.duration && (
                  <div className="mt-3 space-y-1 text-xs">
                    {durationOptions.map((dur) => (
                      <label
                        key={dur.value}
                        className="flex items-center justify-between cursor-pointer py-1.5 px-2 rounded-lg hover:bg-slate-50 transition-colors"
                      >
                        <div className="flex items-center gap-2.5">
                          <input
                            type="radio"
                            name="durationFilter"
                            checked={selectedDuration === dur.value}
                            onChange={() => {
                              setSelectedDuration(dur.value);
                              setCurrentPage(1);
                            }}
                            className="text-[#E85D04] focus:ring-[#E85D04] w-4 h-4"
                          />
                          <span className={`${selectedDuration === dur.value ? 'text-slate-900 font-semibold' : 'text-slate-600'}`}>{dur.label}</span>
                        </div>
                        <span className="text-[10px] font-medium text-slate-400">{dur.count}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Section 5: Rating */}
              <div className="py-4">
                <button
                  onClick={() => toggleAccordion('rating')}
                  className="flex w-full items-center justify-between font-bold text-sm text-slate-800 hover:text-slate-900"
                >
                  <span>Rating</span>
                  {openSections.rating ? <ChevronUp size={16} className="text-slate-400" /> : <ChevronDown size={16} className="text-slate-400" />}
                </button>

                {openSections.rating && (
                  <div className="mt-3 space-y-1 text-xs">
                    {/* All Ratings */}
                    <label className="flex items-center justify-between cursor-pointer py-1.5 px-2 rounded-lg hover:bg-slate-50 transition-colors">
                      <div className="flex items-center gap-2.5">
                        <input
                          type="radio"
                          name="ratingFilter"
                          checked={selectedRating === 0}
                          onChange={() => {
                            setSelectedRating(0);
                            setCurrentPage(1);
                          }}
                          className="text-[#E85D04] focus:ring-[#E85D04] w-4 h-4"
                        />
                        <span className={`${selectedRating === 0 ? 'text-slate-900 font-semibold' : 'text-slate-600'}`}>All Ratings</span>
                      </div>
                    </label>

                    {[
                      { label: '5.0 Stars', stars: 5.0 },
                      { label: '4.8 & up', stars: 4.8 },
                      { label: '4.7 & up', stars: 4.7 },
                    ].map((r) => {
                      const count = JK_ALL_DISTRICTS.filter((d) => d.rating >= r.stars).length;
                      return (
                        <label
                          key={r.label}
                          className="flex items-center justify-between cursor-pointer py-1.5 px-2 rounded-lg hover:bg-slate-50 transition-colors"
                        >
                          <div className="flex items-center gap-2.5">
                            <input
                              type="radio"
                              name="ratingFilter"
                              checked={selectedRating === r.stars}
                              onChange={() => {
                                setSelectedRating(r.stars);
                                setCurrentPage(1);
                              }}
                              className="text-[#E85D04] focus:ring-[#E85D04] w-4 h-4"
                            />
                            <div className="flex items-center gap-1">
                              {Array.from({ length: 5 }).map((_, idx) => (
                                <Star
                                  key={idx}
                                  size={13}
                                  className={idx < Math.floor(r.stars) ? 'fill-[#FBBF24] text-[#FBBF24]' : 'text-slate-300'}
                                />
                              ))}
                              <span className="ml-0.5 text-slate-600">&amp; up</span>
                            </div>
                          </div>
                          <span className="text-[10px] font-medium text-slate-400">{count}</span>
                        </label>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Action Button: View Results */}
              <div className="pt-4">
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="w-full rounded-full bg-[#E85D04] py-3 text-xs font-bold text-white hover:bg-[#dc5400] transition-colors shadow-lg shadow-orange-500/20"
                >
                  View {filteredDistricts.length} Results
                </button>
              </div>

            </div>
          </aside>

          {/* ===================================================================== */}
          {/* RIGHT MAIN AREA: TOP SORT BAR + DESTINATION CARDS GRID + PAGINATION  */}
          {/* ===================================================================== */}
          <main className="lg:col-span-3">
            
            {/* Top Bar: Results count, Sort dropdown, and View mode toggles */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-2xl bg-white p-4 border border-slate-100 shadow-sm mb-6">
              <div>
                <p className="text-sm font-semibold text-slate-700">
                  Showing <span className="font-bold text-slate-950">{filteredDistricts.length}</span> destinations
                </p>
                {selectedDistricts.length > 0 && (
                  <p className="text-[11px] text-[#E85D04] font-medium mt-0.5">
                    Districts: {selectedDistricts.join(', ')}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-3 self-end sm:self-auto">
                {/* Sort By Dropdown */}
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-slate-500 font-medium">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 font-semibold text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#E85D04] cursor-pointer"
                  >
                    <option value="popular">Popular (High to Low)</option>
                    <option value="rating">Rating (High to Low)</option>
                    <option value="price-asc">Price (Low to High)</option>
                    <option value="price-desc">Price (High to Low)</option>
                    <option value="name">Name (A to Z)</option>
                  </select>
                </div>

                {/* View Mode Toggle */}
                <div className="flex items-center border border-slate-200 rounded-lg p-0.5 bg-slate-50">
                  <button
                    onClick={() => setViewMode('grid')}
                    aria-label="Grid view"
                    className={`p-1.5 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-white text-[#E85D04] shadow-sm' : 'text-slate-400 hover:text-slate-700'}`}
                  >
                    <Grid size={16} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    aria-label="List view"
                    className={`p-1.5 rounded-md transition-colors ${viewMode === 'list' ? 'bg-white text-[#E85D04] shadow-sm' : 'text-slate-400 hover:text-slate-700'}`}
                  >
                    <List size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Destination Cards Display */}
            {paginatedDistricts.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-16 text-center">
                <Compass size={48} className="mx-auto text-slate-300" />
                <h3 className="mt-4 font-display text-lg font-bold text-slate-800">
                  No destinations match your filters
                </h3>
                <p className="mt-2 text-xs text-slate-500 max-w-md mx-auto">
                  Try clearing your search keyword, resetting budget slider, or selecting &quot;All Regions&quot; to discover every tourist spot.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="mt-6 rounded-full bg-[#E85D04] px-6 py-2.5 text-xs font-bold text-white hover:bg-[#dc5400] transition-colors shadow-md"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <motion.div 
                layout
                className={viewMode === 'grid' ? 'grid gap-6 sm:grid-cols-2 lg:grid-cols-3' : 'space-y-4'}
              >
                <AnimatePresence mode="popLayout">
                  {paginatedDistricts.map((district, i) => (
                    <motion.div
                      key={district.id}
                      initial={{ opacity: 0, y: 20, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.97 }}
                      transition={{ 
                        duration: 0.35, 
                        delay: i * 0.05,
                        ease: [0.25, 0.46, 0.45, 0.94]
                      }}
                    >
                      <JKDestinationCard
                        district={district}
                        onExplore={(d) => setActiveDistrict(d)}
                        isFavorite={favorites.includes(district.id)}
                        onToggleFavorite={handleToggleFavorite}
                        viewMode={viewMode}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}

            {/* =================================================================== */}
            {/* PAGINATION CONTROLS - Travivu Style                                */}
            {/* =================================================================== */}
            {totalPages > 1 && (
              <div className="mt-12 flex items-center justify-center gap-1.5">
                {/* Prev Button */}
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  aria-label="Previous page"
                >
                  <ChevronLeft size={18} />
                </button>

                {/* Page numbers */}
                {getPageNumbers().map((page, idx) => {
                  if (page === '...') {
                    return (
                      <span key={`ellipsis-${idx}`} className="flex h-10 w-10 items-center justify-center text-sm text-slate-400">
                        ···
                      </span>
                    );
                  }
                  const isActive = currentPage === page;
                  return (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page as number)}
                      className={`flex h-10 w-10 items-center justify-center rounded-lg text-sm font-bold transition-all ${
                        isActive
                          ? 'bg-[#E85D04] text-white shadow-md shadow-orange-500/25'
                          : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}

                {/* Next Button */}
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  aria-label="Next page"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            )}

            {/* =================================================================== */}
            {/* CTA BANNER: "Can't find what you're looking for?" - Travivu Style   */}
            {/* =================================================================== */}
            <div className="mt-14 rounded-2xl overflow-hidden border border-[#E85D04]/20">
              <div className="bg-gradient-to-r from-[#FFF7ED] to-[#FFF1E6] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-5">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#E85D04] text-white shadow-lg shadow-orange-500/25">
                    <Plane size={24} className="-rotate-12" />
                  </div>
                  <div>
                    <h4 className="font-display text-lg sm:text-xl font-bold text-slate-900">
                      Can&apos;t find what you&apos;re looking for?
                    </h4>
                    <p className="mt-1 text-sm text-slate-600 max-w-lg leading-relaxed">
                      Our local travel experts are here to help you plan the perfect trip.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto">
                  <Link
                    href="/contact"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#E85D04] bg-white px-6 py-3 text-sm font-bold text-[#E85D04] hover:bg-[#E85D04] hover:text-white transition-all shadow-sm"
                  >
                    Contact an Expert
                  </Link>
                </div>
              </div>
            </div>

          </main>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3D DISTRICT EXPLORER MODAL                                                */}
      {/* ========================================================================= */}
      <District3DModal
        district={activeDistrict}
        onClose={() => setActiveDistrict(null)}
        onBookClick={(dist) => {
          window.location.href = `/plan?district=${encodeURIComponent(dist.district)}`;
        }}
      />
    </div>
  );
}
