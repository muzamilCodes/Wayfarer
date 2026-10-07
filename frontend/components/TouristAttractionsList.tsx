'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  Calendar,
  Sparkles,
  ArrowRight,
  X,
  Compass,
  Clock,
  Building,
  ShieldCheck,
  Car,
  Check,
  Mountain,
  Camera,
  CheckCircle,
  ExternalLink,
} from 'lucide-react';
import { TouristPlace } from '@/lib/jk-destinations-data';

interface TouristAttractionsListProps {
  districtName: string;
  places: TouristPlace[];
}

const badgeStyles: Record<string, string> = {
  'Must-Visit': 'bg-rose-50 text-rose-700 border-rose-200',
  'Heritage': 'bg-amber-50 text-amber-800 border-amber-200',
  'Lake & Nature': 'bg-emerald-50 text-emerald-800 border-emerald-200',
  'Spiritual': 'bg-purple-50 text-purple-800 border-purple-200',
  'Adventure': 'bg-sky-50 text-sky-800 border-sky-200',
  'Scenic View': 'bg-indigo-50 text-indigo-800 border-indigo-200',
  'Offbeat & Camping': 'bg-teal-50 text-teal-800 border-teal-200',
  'Family & Leisure': 'bg-blue-50 text-blue-800 border-blue-200',
};

export default function TouristAttractionsList({
  districtName,
  places,
}: TouristAttractionsListProps) {
  const [selectedPlace, setSelectedPlace] = useState<TouristPlace | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | string>('all');
  const [copied, setCopied] = useState(false);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedPlace) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedPlace]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedPlace(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Filter categories
  const categories = ['all', ...Array.from(new Set(places.map((p) => p.category)))];

  const filteredPlaces = activeTab === 'all' 
    ? places 
    : places.filter((p) => p.category === activeTab);

  const handleShare = (place: TouristPlace) => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(`${window.location.origin}/destinations/${districtName.toLowerCase()}#${encodeURIComponent(place.name)}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div>
      {/* Category Filter Bar */}
      <div className="flex flex-wrap items-center gap-2 mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all duration-200 ${
              activeTab === cat
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            {cat === 'all' ? `All Places (${places.length})` : cat}
          </button>
        ))}
      </div>

      {/* Grid of Compact Tourist Cards */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filteredPlaces.map((place, idx) => (
          <motion.div
            key={place.name}
            id={encodeURIComponent(place.name)}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
            onClick={() => setSelectedPlace(place)}
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-xl hover:border-[#3B71FE]/40 transition-all duration-300 cursor-pointer"
          >
            {/* Attraction Image Banner */}
            <div className="relative h-44 w-full overflow-hidden bg-gray-100">
              {place.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={place.image}
                  alt={place.name}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                  loading="lazy"
                />
              ) : (
                <div className="h-full w-full bg-gradient-to-br from-slate-800 to-slate-950 flex items-center justify-center">
                  <Building className="text-slate-600" size={32} />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />

              {/* Badges on Top */}
              <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 z-10">
                {place.pinCode && (
                  <span className="rounded-md px-2 py-0.5 text-[10px] font-mono font-bold bg-black/60 text-white backdrop-blur-md border border-white/20 shadow-sm">
                    PIN {place.pinCode}
                  </span>
                )}
                <span
                  className={`rounded-md px-2 py-0.5 text-[10.5px] font-bold border backdrop-blur-md shadow-sm ${
                    badgeStyles[place.category] || 'bg-white/95 text-gray-800'
                  }`}
                >
                  {place.category}
                </span>
              </div>

              {/* Tehsil Badge Bottom Left */}
              <div className="absolute bottom-2.5 left-3 flex items-center gap-1 text-xs text-white/95 font-medium drop-shadow">
                <MapPin size={13} className="text-rose-400 shrink-0" />
                <span>{place.tehsil || districtName}</span>
              </div>

              {/* Number Badge */}
              <span className="absolute top-2.5 left-2.5 h-6 w-6 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white text-[11px] font-bold flex items-center justify-center">
                {idx + 1}
              </span>
            </div>

            {/* Compact Card Content */}
            <div className="p-4 flex-1 flex flex-col justify-between font-body">
              <div>
                {/* Type Tag */}
                {place.type && (
                  <div className="mb-1.5">
                    <span className="text-[11px] font-medium text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-100/80">
                      {place.type}
                    </span>
                  </div>
                )}

                {/* Place Name */}
                <h3 className="font-display text-base sm:text-lg font-bold text-slate-900 group-hover:text-[#3B71FE] transition-colors line-clamp-1">
                  {place.name}
                </h3>

                {/* 2-Line Short Description */}
                <p className="mt-1.5 text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
                  {place.speciality || place.description}
                </p>

                {/* Best Time Tag if available */}
                {place.bestTime && (
                  <div className="mt-2.5 flex items-center gap-1 text-[11px] text-emerald-700 font-medium">
                    <Calendar size={12} className="text-emerald-600 shrink-0" />
                    <span className="truncate">{place.bestTime}</span>
                  </div>
                )}
              </div>

              {/* Action Ribbon: Click to View Details & Google Maps */}
              <div className="mt-3.5 pt-2.5 border-t border-slate-100 flex items-center justify-between gap-2">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.name + ' ' + (place.tehsil || districtName) + ' Jammu and Kashmir')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  title="Open in Google Maps"
                  className="inline-flex items-center gap-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-[#3B71FE] px-2.5 py-1 text-[11px] font-bold border border-blue-200/70 transition-colors"
                >
                  <MapPin size={11} className="shrink-0" />
                  <span>Google Maps</span>
                  <ExternalLink size={10} className="opacity-70" />
                </a>

                <span className="inline-flex items-center gap-1 text-xs font-bold text-[#3B71FE] group-hover:translate-x-1 transition-transform">
                  Explore <ArrowRight size={13} />
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* MASTER DETAILS MODAL (Opens on Card Click) */}
      <AnimatePresence>
        {selectedPlace && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPlace(null)}
              className="fixed inset-0 bg-slate-950/75 backdrop-blur-md transition-opacity"
            />

            {/* Modal Dialog Window */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-3xl bg-white shadow-2xl border border-slate-200 z-10 font-body my-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedPlace(null)}
                aria-label="Close modal"
                className="absolute top-4 right-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black transition-colors backdrop-blur-md shadow-lg"
              >
                <X size={20} />
              </button>

              {/* Modal Cover Image & Title Banner */}
              <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-slate-900">
                {selectedPlace.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={selectedPlace.image}
                    alt={selectedPlace.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full bg-slate-900 flex items-center justify-center">
                    <Building size={48} className="text-slate-600" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-black/30" />

                <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8 text-white">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="rounded-full bg-[#D9A441] px-3 py-0.5 text-xs font-bold text-slate-950 uppercase tracking-wider">
                      {selectedPlace.category}
                    </span>
                    {selectedPlace.type && (
                      <span className="rounded-full bg-white/20 backdrop-blur-md px-3 py-0.5 text-xs font-semibold text-white border border-white/30">
                        {selectedPlace.type}
                      </span>
                    )}
                    {selectedPlace.status && (
                      <span className="rounded-full bg-emerald-500/25 text-emerald-300 border border-emerald-400/30 backdrop-blur-md px-3 py-0.5 text-xs font-medium">
                        {selectedPlace.status}
                      </span>
                    )}
                  </div>

                  <h2 className="font-display text-2xl sm:text-4xl font-black text-white leading-tight">
                    {selectedPlace.name}
                  </h2>

                  <div className="mt-2.5 flex flex-wrap items-center gap-3 text-xs sm:text-sm text-slate-200">
                    <span className="flex items-center gap-1.5">
                      <MapPin size={14} className="text-rose-400 shrink-0" />
                      {selectedPlace.tehsil || districtName}, {selectedPlace.district || districtName}
                    </span>
                    {selectedPlace.pinCode && (
                      <span className="font-mono bg-white/10 px-2 py-0.5 rounded border border-white/20">
                        PIN: {selectedPlace.pinCode}
                      </span>
                    )}

                    {/* Direct Google Maps Action Link */}
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedPlace.name + ' ' + (selectedPlace.tehsil || districtName) + ' Jammu and Kashmir')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg bg-[#3B71FE] hover:bg-blue-600 text-white font-bold px-3 py-1 text-xs shadow-md transition ml-auto"
                    >
                      <MapPin size={12} />
                      <span>Open in Google Maps</span>
                      <ExternalLink size={11} className="opacity-80" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Modal Content Details */}
              <div className="p-6 sm:p-8 space-y-6">
                {/* 1. Speciality (Khasiyat) - Golden Spotlight Box */}
                {selectedPlace.speciality && (
                  <div className="rounded-2xl bg-amber-50 border border-amber-200/90 p-5 shadow-sm">
                    <div className="flex items-center gap-2 text-amber-900 font-display font-bold text-sm uppercase tracking-wider mb-1.5">
                      <Sparkles size={16} className="text-[#D9A441]" />
                      What Makes It Special / Unique (Khasiyat)
                    </div>
                    <p className="text-amber-950 font-medium text-sm sm:text-base leading-relaxed">
                      {selectedPlace.speciality}
                    </p>
                  </div>
                )}

                {/* 2. What It Is Famous For */}
                {selectedPlace.famousFor && (
                  <div className="rounded-2xl bg-slate-50 border border-slate-200 p-5">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
                      <Sparkles size={14} className="text-blue-600" />
                      What It Is Famous For
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {selectedPlace.famousFor.split(';').map((tag, i) => (
                        <span
                          key={i}
                          className="rounded-lg bg-white px-3 py-1 text-xs sm:text-sm font-semibold text-slate-800 border border-slate-200 shadow-sm"
                        >
                          {tag.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* 3. Detailed Description */}
                {selectedPlace.description && (
                  <div>
                    <h3 className="font-display text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
                      <Sparkles size={18} className="text-[#3B71FE]" />
                      Detailed Overview
                    </h3>
                    <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal bg-slate-50/50 p-4 rounded-xl border border-slate-100">
                      {selectedPlace.description}
                    </p>
                  </div>
                )}

                {/* 4. History, Discovery & Architecture Section */}
                <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm">
                  <h3 className="font-display text-lg font-bold text-slate-900 mb-4 flex items-center gap-2 border-b border-slate-100 pb-3">
                    <Building size={20} className="text-amber-600" />
                    Historical Background &amp; Origins
                  </h3>
                  <div className="grid gap-4 sm:grid-cols-2 text-sm">
                    {selectedPlace.whenDiscovered && (
                      <div className="rounded-xl bg-slate-50 p-3.5 border border-slate-100">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
                          When Discovered / First Documented
                        </span>
                        <p className="text-slate-800 font-medium">{selectedPlace.whenDiscovered}</p>
                      </div>
                    )}

                    {selectedPlace.developer && (
                      <div className="rounded-xl bg-slate-50 p-3.5 border border-slate-100">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
                          Who Discovered / Established / Developed It
                        </span>
                        <p className="text-slate-800 font-medium">{selectedPlace.developer}</p>
                      </div>
                    )}

                    {selectedPlace.importantDates && (
                      <div className="rounded-xl bg-slate-50 p-3.5 border border-slate-100">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
                          Important Historical Dates
                        </span>
                        <p className="text-slate-800 font-medium">{selectedPlace.importantDates}</p>
                      </div>
                    )}

                    {selectedPlace.historicalBackground && (
                      <div className="rounded-xl bg-slate-50 p-3.5 border border-slate-100 sm:col-span-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
                          Historical Background Details
                        </span>
                        <p className="text-slate-800 leading-relaxed">{selectedPlace.historicalBackground}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* 5. What Can Be Found & Activities */}
                <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm">
                  <h3 className="font-display text-lg font-bold text-slate-900 mb-4 flex items-center gap-2 border-b border-slate-100 pb-3">
                    <Camera size={20} className="text-blue-600" />
                    Sightseeing, Attractions &amp; Activities
                  </h3>

                  <div className="space-y-4 text-sm">
                    {selectedPlace.mainAttractions && (
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
                          Main Attractions
                        </span>
                        <p className="text-slate-800 font-medium bg-blue-50/50 p-3 rounded-xl border border-blue-100">
                          {selectedPlace.mainAttractions}
                        </p>
                      </div>
                    )}

                    {selectedPlace.whatCanBeFound && (
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
                          What Can Be Found / Done There
                        </span>
                        <p className="text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                          {selectedPlace.whatCanBeFound}
                        </p>
                      </div>
                    )}

                    {selectedPlace.activities && (
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
                          Recommended Tourist Activities
                        </span>
                        <p className="text-slate-700 leading-relaxed bg-emerald-50/40 p-3 rounded-xl border border-emerald-100">
                          {selectedPlace.activities}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* 6. Four Pillars of Significance */}
                {(selectedPlace.naturalSignificance ||
                  selectedPlace.historicalSignificance ||
                  selectedPlace.culturalSignificance ||
                  selectedPlace.religiousSignificance) && (
                  <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-5 sm:p-6 shadow-sm">
                    <h3 className="font-display text-lg font-bold text-slate-900 mb-4 flex items-center gap-2 border-b border-slate-200 pb-3">
                      <Building size={20} className="text-purple-600" />
                      Significance &amp; Heritage Values
                    </h3>

                    <div className="grid gap-3 sm:grid-cols-2 text-xs sm:text-sm">
                      {selectedPlace.naturalSignificance && (
                        <div className="rounded-xl bg-white p-3.5 border border-slate-200/80 shadow-sm">
                          <span className="font-bold text-emerald-800 flex items-center gap-1.5 mb-1 text-xs uppercase tracking-wider">
                            <Mountain size={14} className="text-emerald-600" /> Natural Significance
                          </span>
                          <p className="text-slate-700 leading-relaxed">{selectedPlace.naturalSignificance}</p>
                        </div>
                      )}

                      {selectedPlace.historicalSignificance && (
                        <div className="rounded-xl bg-white p-3.5 border border-slate-200/80 shadow-sm">
                          <span className="font-bold text-amber-800 flex items-center gap-1.5 mb-1 text-xs uppercase tracking-wider">
                            <Building size={14} className="text-amber-600" /> Historical Significance
                          </span>
                          <p className="text-slate-700 leading-relaxed">{selectedPlace.historicalSignificance}</p>
                        </div>
                      )}

                      {selectedPlace.culturalSignificance && (
                        <div className="rounded-xl bg-white p-3.5 border border-slate-200/80 shadow-sm">
                          <span className="font-bold text-indigo-800 flex items-center gap-1.5 mb-1 text-xs uppercase tracking-wider">
                            <Sparkles size={14} className="text-indigo-600" /> Cultural Significance
                          </span>
                          <p className="text-slate-700 leading-relaxed">{selectedPlace.culturalSignificance}</p>
                        </div>
                      )}

                      {selectedPlace.religiousSignificance && (
                        <div className="rounded-xl bg-white p-3.5 border border-slate-200/80 shadow-sm">
                          <span className="font-bold text-purple-800 flex items-center gap-1.5 mb-1 text-xs uppercase tracking-wider">
                            <Compass size={14} className="text-purple-600" /> Religious Significance
                          </span>
                          <p className="text-slate-700 leading-relaxed">{selectedPlace.religiousSignificance}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* 7. Travel Logistics, Connectivity & How to Reach */}
                <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm">
                  <h3 className="font-display text-lg font-bold text-slate-900 mb-4 flex items-center gap-2 border-b border-slate-100 pb-3">
                    <Compass size={20} className="text-emerald-600" />
                    How to Reach &amp; Travel Logistics
                  </h3>

                  <div className="grid gap-3 sm:grid-cols-2 text-xs sm:text-sm">
                    {selectedPlace.howToReach && (
                      <div className="sm:col-span-2 rounded-xl bg-slate-50 p-3.5 border border-slate-100">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
                          How to Reach
                        </span>
                        <p className="text-slate-800 font-medium">{selectedPlace.howToReach}</p>
                      </div>
                    )}

                    {selectedPlace.bestTime && (
                      <div className="rounded-xl bg-emerald-50/60 p-3.5 border border-emerald-100">
                        <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1 mb-1">
                          <Calendar size={13} /> Best Time to Visit
                        </span>
                        <p className="text-emerald-950 font-bold">{selectedPlace.bestTime}</p>
                      </div>
                    )}

                    {selectedPlace.roadConnectivity && (
                      <div className="rounded-xl bg-slate-50 p-3.5 border border-slate-100">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1 mb-1">
                          <Car size={13} /> Road Connectivity
                        </span>
                        <p className="text-slate-800 font-medium">{selectedPlace.roadConnectivity}</p>
                      </div>
                    )}

                    {selectedPlace.nearestAirport && (
                      <div className="rounded-xl bg-slate-50 p-3.5 border border-slate-100">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1 mb-1">
                          <Compass size={13} /> Nearest Airport
                        </span>
                        <p className="text-slate-800 font-medium">{selectedPlace.nearestAirport}</p>
                      </div>
                    )}

                    {selectedPlace.nearestRailway && (
                      <div className="rounded-xl bg-slate-50 p-3.5 border border-slate-100">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1 mb-1">
                          <MapPin size={13} /> Nearest Railway Station
                        </span>
                        <p className="text-slate-800 font-medium">{selectedPlace.nearestRailway}</p>
                      </div>
                    )}
                  </div>

                  {/* Embedded Interactive Google Map for this attraction */}
                  <div className="mt-4 rounded-2xl border border-slate-200 overflow-hidden bg-slate-950 shadow-sm">
                    <div className="bg-slate-900 p-3 flex items-center justify-between text-white text-xs border-b border-slate-800">
                      <span className="font-bold flex items-center gap-1.5">
                        <MapPin size={13} className="text-rose-400" />
                        Live Google Map Location: {selectedPlace.name}
                      </span>
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedPlace.name + ' ' + (selectedPlace.tehsil || districtName) + ' Jammu and Kashmir')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 font-bold"
                      >
                        <span>Open in Google Maps App</span>
                        <ExternalLink size={11} />
                      </a>
                    </div>
                    <iframe
                      title={`Google Map - ${selectedPlace.name}`}
                      src={`https://maps.google.com/maps?q=${encodeURIComponent(selectedPlace.name + ' ' + (selectedPlace.tehsil || districtName) + ' Jammu and Kashmir')}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                      width="100%"
                      height="240"
                      style={{ border: 0 }}
                      allowFullScreen={false}
                      loading="lazy"
                      className="w-full"
                    />
                  </div>
                </div>

                {/* 8. Nearby Tourist Places */}
                {selectedPlace.nearbyPlaces && (
                  <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-5">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2 flex items-center gap-1.5">
                      <MapPin size={14} className="text-rose-500" />
                      Nearby Tourist Places &amp; Excursions
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedPlace.nearbyPlaces.split(';').map((near, idx) => (
                        <span
                          key={idx}
                          className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-700 border border-slate-200"
                        >
                          {near.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* 9. Official Verification & Sources Footer */}
                {(selectedPlace.officialVerification || selectedPlace.sources) && (
                  <div className="rounded-2xl bg-slate-900 text-slate-300 p-5 text-xs space-y-2">
                    <div className="flex items-center gap-2 text-white font-bold text-sm">
                      <ShieldCheck size={16} className="text-emerald-400" />
                      Official Government &amp; Tourism Verification
                    </div>
                    {selectedPlace.officialVerification && (
                      <p className="text-slate-300">
                        <strong className="text-white">Status Verification:</strong> {selectedPlace.officialVerification}
                      </p>
                    )}
                    {selectedPlace.sources && (
                      <p className="text-slate-400">
                        <strong className="text-slate-300">Official References &amp; Sources:</strong> {selectedPlace.sources}
                      </p>
                    )}
                  </div>
                )}

                {/* Modal Action Footer */}
                <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedPlace.name + ' ' + (selectedPlace.tehsil || districtName) + ' Jammu and Kashmir')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-[#3B71FE] border border-blue-200 px-3.5 py-2 text-xs font-bold transition-all"
                    >
                      <MapPin size={13} />
                      <span>Open in Google Maps</span>
                      <ExternalLink size={11} className="opacity-70" />
                    </a>

                    <button
                      onClick={() => handleShare(selectedPlace)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
                    >
                      {copied ? <Check size={14} className="text-emerald-600" /> : <Sparkles size={14} />}
                      {copied ? 'Link Copied!' : 'Share Attraction'}
                    </button>
                  </div>

                  <button
                    onClick={() => setSelectedPlace(null)}
                    className="rounded-xl bg-slate-900 text-white px-5 py-2.5 text-xs font-bold hover:bg-slate-800 transition-colors shadow-sm"
                  >
                    Close Record
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
