'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  MapPin,
  Calendar,
  ExternalLink,
  Camera,
  ChevronLeft,
  ChevronRight,
  X,
  Sparkles,
  Compass,
  Layers,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  JK_TOP_10_DESTINATIONS,
  JKTop10Destination,
  Top10GalleryImage,
} from '@/lib/jk-top10-data';

export default function JKTop10Section() {
  const [activeDivision, setActiveDivision] = useState<'All' | 'Kashmir Valley' | 'Jammu Division'>('All');
  const [viewMode, setViewMode] = useState<'cards' | 'map'>('cards');
  const [selectedGalleryDest, setSelectedGalleryDest] = useState<JKTop10Destination | null>(null);
  const [galleryIndex, setGalleryIndex] = useState<number>(0);
  const [selectedMapDest, setSelectedMapDest] = useState<JKTop10Destination | null>(null);
  const [activePinDest, setActivePinDest] = useState<JKTop10Destination>(JK_TOP_10_DESTINATIONS[0]);

  // Lock body scroll when any modal is open
  useEffect(() => {
    if (selectedGalleryDest || selectedMapDest) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedGalleryDest, selectedMapDest]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedGalleryDest(null);
        setSelectedMapDest(null);
      } else if (e.key === 'ArrowRight' && selectedGalleryDest) {
        setGalleryIndex((prev) => (prev + 1) % selectedGalleryDest.gallery.length);
      } else if (e.key === 'ArrowLeft' && selectedGalleryDest) {
        setGalleryIndex((prev) => (prev - 1 + selectedGalleryDest.gallery.length) % selectedGalleryDest.gallery.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedGalleryDest]);

  const filtered = JK_TOP_10_DESTINATIONS.filter((d) => {
    if (activeDivision === 'All') return true;
    return d.division === activeDivision;
  });

  const openGallery = (dest: JKTop10Destination, index = 0) => {
    setSelectedGalleryDest(dest);
    setGalleryIndex(index);
  };

  const openMap = (dest: JKTop10Destination) => {
    setSelectedMapDest(dest);
  };

  return (
    <section id="top-10-destinations" className="my-10 sm:my-14 scroll-mt-24">
      {/* ── HEADER BANNER ── */}
      <div className="rounded-3xl bg-gradient-to-br from-[#0B1B3D] via-[#102A56] to-[#0A192F] p-6 sm:p-10 text-white shadow-xl border border-blue-900/40 relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/20 px-3.5 py-1 text-xs font-semibold text-blue-300 border border-blue-400/30 backdrop-blur-md mb-3">
              <Sparkles size={14} className="text-amber-400" />
              <span>Official Travel Guide &amp; Master Index</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Jammu &amp; Kashmir: Top 10 Trending Destinations
            </h2>
            <p className="mt-2.5 text-sm sm:text-base text-blue-100/90 leading-relaxed font-normal">
              Travel guide with direct Google Maps navigation links &amp; high-resolution visual photo galleries for each iconic location.
            </p>
          </div>

          {/* Division Filter & View Switcher */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Division Pills */}
            <div className="inline-flex p-1 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-xs font-medium">
              {(['All', 'Kashmir Valley', 'Jammu Division'] as const).map((div) => (
                <button
                  key={div}
                  onClick={() => setActiveDivision(div)}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    activeDivision === div
                      ? 'bg-[#3B71FE] text-white font-bold shadow-sm'
                      : 'text-white/80 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {div === 'All' ? 'All 10 Places' : div}
                </button>
              ))}
            </div>

            {/* View Mode Switcher */}
            <div className="inline-flex p-1 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-xs font-medium">
              <button
                onClick={() => setViewMode('cards')}
                className={`px-3 py-1.5 rounded-lg inline-flex items-center gap-1.5 transition-all ${
                  viewMode === 'cards'
                    ? 'bg-white text-slate-900 font-bold shadow-sm'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                <Layers size={13} /> Cards
              </button>
              <button
                onClick={() => setViewMode('map')}
                className={`px-3 py-1.5 rounded-lg inline-flex items-center gap-1.5 transition-all ${
                  viewMode === 'map'
                    ? 'bg-white text-slate-900 font-bold shadow-sm'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                <MapPin size={13} /> Live Map View
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── CARDS VIEW ── */}
      {viewMode === 'cards' && (
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {filtered.map((dest) => (
            <motion.div
              key={dest.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="group flex flex-col rounded-2xl bg-white border border-gray-200/90 hover:border-[#3B71FE]/40 hover:shadow-xl transition-all duration-300 overflow-hidden shadow-sm"
            >
              {/* Image Banner */}
              <div className="relative h-60 sm:h-64 w-full overflow-hidden bg-slate-900">
                <Image
                  src={dest.coverImage}
                  alt={dest.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-106"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-black/30" />

                {/* Top Badge Row */}
                <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between z-10">
                  {/* Rank Badge */}
                  <span className="flex items-center gap-1.5 rounded-full bg-black/60 backdrop-blur-md px-3 py-1 text-xs font-bold text-white border border-white/20 shadow-md">
                    <span className="h-2 w-2 rounded-full bg-[#FF5B00]" />
                    Rank #{dest.rank}
                  </span>

                  {/* Division Badge */}
                  <span className="rounded-full bg-white/90 backdrop-blur-md px-3 py-1 text-xs font-bold text-slate-800 shadow-md">
                    {dest.division}
                  </span>
                </div>

                {/* Bottom Overlay Info on Image */}
                <div className="absolute bottom-3.5 left-3.5 right-3.5 z-10 text-white">
                  <div className="flex items-center gap-1.5 text-xs text-blue-200 font-semibold mb-1">
                    <MapPin size={13} className="text-[#3B71FE]" />
                    <span>{dest.district} District</span>
                    <span>•</span>
                    <span>{dest.altitude}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-white leading-tight drop-shadow-sm">
                    {dest.name}
                  </h3>
                </div>

                {/* Gallery Quick Badge */}
                <button
                  type="button"
                  onClick={() => openGallery(dest, 0)}
                  className="absolute bottom-3.5 right-3.5 z-20 inline-flex items-center gap-1.5 rounded-lg bg-black/70 hover:bg-black text-white px-2.5 py-1 text-xs font-medium backdrop-blur-md border border-white/20 transition-all hover:scale-105"
                >
                  <Camera size={13} className="text-amber-400" />
                  <span>{dest.gallery.length} Photos</span>
                </button>
              </div>

              {/* Card Body Content */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                {/* 1. Roman Urdu Overview (Exact from provided document) */}
                <div className="rounded-xl bg-slate-50 border border-slate-100 p-3.5">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1 flex items-center gap-1">
                    <Sparkles size={12} className="text-[#3B71FE]" />
                    Overview (Kashmir Travel Guide)
                  </div>
                  <p className="text-xs sm:text-[13.5px] text-slate-800 font-medium leading-relaxed">
                    {dest.overview}
                  </p>
                </div>

                {/* 2. Best Time to Visit */}
                <div className="flex items-center gap-2 text-xs sm:text-[13px] text-emerald-800 bg-emerald-50/80 border border-emerald-200/80 px-3 py-2 rounded-xl">
                  <Calendar size={15} className="text-emerald-600 shrink-0" />
                  <div>
                    <span className="font-bold">Best Time to Visit: </span>
                    <span>{dest.bestTime}</span>
                  </div>
                </div>

                {/* 3. Key Highlights */}
                <div>
                  <div className="text-xs font-bold text-slate-700 mb-2">Key Attractions &amp; Highlights:</div>
                  <div className="flex flex-wrap gap-1.5">
                    {dest.highlights.slice(0, 4).map((h, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700"
                      >
                        <CheckCircle2 size={11} className="text-[#3B71FE]" />
                        {h}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 4. Action Buttons (Direct Google Maps & Photo Gallery) */}
                <div className="pt-3 border-t border-gray-100 flex flex-wrap items-center justify-between gap-2.5">
                  {/* Left: Direct Google Maps & Gallery Buttons */}
                  <div className="flex items-center gap-2">
                    {/* Direct Google Maps External Link */}
                    <a
                      href={dest.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-[#3B71FE] border border-blue-200/70 px-3 py-2 text-xs font-bold transition-all hover:shadow-sm"
                    >
                      <MapPin size={14} />
                      <span>Open in Google Maps</span>
                      <ExternalLink size={12} className="opacity-70" />
                    </a>

                    {/* View Photo Gallery Button */}
                    <button
                      type="button"
                      onClick={() => openGallery(dest, 0)}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200/80 px-3 py-2 text-xs font-bold transition-all hover:shadow-sm"
                    >
                      <Camera size={14} className="text-amber-600" />
                      <span>View Photo Gallery</span>
                    </button>
                  </div>

                  {/* Right: Live Map Modal Trigger */}
                  <button
                    type="button"
                    onClick={() => openMap(dest)}
                    className="inline-flex items-center gap-1 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors"
                  >
                    <Compass size={13} className="text-rose-500" />
                    <span>Map View</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* ── INTERACTIVE MAP VIEW ── */}
      {viewMode === 'map' && (
        <div className="mt-8 rounded-3xl bg-white border border-gray-200 p-5 sm:p-7 shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-6 items-stretch">
            {/* Left: Destination Selector List */}
            <div className="flex flex-col space-y-2.5 max-h-[580px] overflow-y-auto pr-2">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                Select Destination to View Map &amp; Navigation ({filtered.length})
              </div>

              {filtered.map((dest) => {
                const isActive = activePinDest.id === dest.id;
                return (
                  <button
                    key={dest.id}
                    onClick={() => setActivePinDest(dest)}
                    className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-center gap-3.5 ${
                      isActive
                        ? 'bg-blue-50/90 border-[#3B71FE] shadow-sm'
                        : 'bg-white border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className="relative h-14 w-14 rounded-xl overflow-hidden shrink-0 bg-slate-900">
                      <Image
                        src={dest.coverImage}
                        alt={dest.name}
                        fill
                        className="object-cover"
                        sizes="56px"
                      />
                      <span className="absolute top-1 left-1 h-5 w-5 rounded-full bg-black/70 text-white text-[10px] font-bold flex items-center justify-center">
                        {dest.rank}
                      </span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <h4 className="font-bold text-sm text-slate-900 truncate">
                          {dest.name}
                        </h4>
                        <span className="text-[10px] font-semibold text-slate-400 shrink-0">
                          {dest.division === 'Kashmir Valley' ? 'Kashmir' : 'Jammu'}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 truncate mt-0.5">
                        {dest.bestTime}
                      </p>
                      <div className="flex items-center gap-3 mt-1.5 text-[11px] font-semibold text-[#3B71FE]">
                        <span className="inline-flex items-center gap-1">
                          <MapPin size={11} /> Coordinates: {dest.coordinates.lat.toFixed(2)}°N
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right: Embedded Google Maps Viewer for Active Pin */}
            <div className="rounded-2xl border border-gray-200 overflow-hidden flex flex-col bg-slate-950">
              {/* Map Controls & Heading Header */}
              <div className="bg-slate-900 p-4 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-white">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-[#FF5B00] px-2 py-0.5 text-[11px] font-extrabold text-white">
                      #{activePinDest.rank}
                    </span>
                    <h3 className="font-bold text-base sm:text-lg text-white">
                      {activePinDest.name}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {activePinDest.district} District • Coordinates: {activePinDest.coordinates.lat}° N, {activePinDest.coordinates.lng}° E
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={activePinDest.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-xl bg-[#3B71FE] hover:bg-blue-600 text-white px-3.5 py-2 text-xs font-bold transition-all shadow-md shadow-blue-500/20"
                  >
                    <ExternalLink size={13} />
                    <span>Open in Google Maps App</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => openGallery(activePinDest, 0)}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white px-3 py-2 text-xs font-semibold transition"
                  >
                    <Camera size={13} className="text-amber-400" />
                    <span>Photos</span>
                  </button>
                </div>
              </div>

              {/* Live Interactive Google Maps Iframe */}
              <div className="relative flex-1 min-h-[420px] w-full bg-slate-900">
                <iframe
                  title={`Google Map - ${activePinDest.name}`}
                  src={activePinDest.googleMapsEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: '420px' }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
              </div>

              {/* Bottom Info Ribbon */}
              <div className="bg-slate-900/90 p-3.5 text-xs text-slate-300 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span>
                  <strong>Nearest Hub:</strong> {activePinDest.nearestHub}
                </span>
                <span className="text-slate-400">
                  Click &ldquo;Open in Google Maps App&rdquo; for live turn-by-turn driving directions &amp; real-time traffic.
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── VISUAL PHOTO GALLERY LIGHTBOX MODAL ── */}
      <AnimatePresence>
        {selectedGalleryDest && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedGalleryDest(null)}
              className="fixed inset-0 bg-slate-950/90 backdrop-blur-md transition-opacity"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 15 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="relative w-full max-w-5xl max-h-[94vh] flex flex-col rounded-3xl bg-slate-950 text-white shadow-2xl border border-slate-800 z-10 overflow-hidden"
            >
              {/* Top Header Bar */}
              <div className="p-4 sm:p-5 border-b border-slate-800/80 flex items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-[#FF5B00] px-2 py-0.5 text-[11px] font-extrabold text-white">
                      #{selectedGalleryDest.rank}
                    </span>
                    <h3 className="font-extrabold text-base sm:text-xl text-white">
                      {selectedGalleryDest.name}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Photo {galleryIndex + 1} of {selectedGalleryDest.gallery.length} • {selectedGalleryDest.district} District
                  </p>
                </div>

                <div className="flex items-center gap-2.5">
                  <a
                    href={selectedGalleryDest.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 text-xs font-bold transition shadow-sm"
                  >
                    <MapPin size={13} />
                    <span>Open in Maps</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => setSelectedGalleryDest(null)}
                    aria-label="Close Gallery"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              {/* Main Image Stage */}
              <div className="relative flex-1 min-h-[350px] sm:min-h-[460px] max-h-[58vh] bg-black flex items-center justify-center overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={galleryIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.25 }}
                    className="relative h-full w-full flex items-center justify-center"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={selectedGalleryDest.gallery[galleryIndex]?.url}
                      alt={selectedGalleryDest.gallery[galleryIndex]?.title}
                      className="max-h-[56vh] w-auto max-w-full object-contain mx-auto"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Left / Right Nav Arrows */}
                <button
                  type="button"
                  onClick={() =>
                    setGalleryIndex(
                      (prev) =>
                        (prev - 1 + selectedGalleryDest.gallery.length) %
                        selectedGalleryDest.gallery.length
                    )
                  }
                  aria-label="Previous photo"
                  className="absolute left-3 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 backdrop-blur-md transition-all hover:scale-110"
                >
                  <ChevronLeft size={22} />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setGalleryIndex((prev) => (prev + 1) % selectedGalleryDest.gallery.length)
                  }
                  aria-label="Next photo"
                  className="absolute right-3 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 backdrop-blur-md transition-all hover:scale-110"
                >
                  <ChevronRight size={22} />
                </button>
              </div>

              {/* Photo Caption & Thumbnail Selector */}
              <div className="p-4 sm:p-5 bg-slate-900 border-t border-slate-800 space-y-3.5">
                <div>
                  <h4 className="font-bold text-sm sm:text-base text-white">
                    {selectedGalleryDest.gallery[galleryIndex]?.title}
                  </h4>
                  <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                    {selectedGalleryDest.gallery[galleryIndex]?.caption}
                  </p>
                </div>

                {/* Thumbnails Row */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1">
                  {selectedGalleryDest.gallery.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setGalleryIndex(idx)}
                      className={`relative h-14 w-20 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                        galleryIndex === idx
                          ? 'border-[#3B71FE] scale-105 shadow-md'
                          : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={img.url}
                        alt={img.title}
                        className="h-full w-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── GOOGLE MAPS EMBED POPUP MODAL ── */}
      <AnimatePresence>
        {selectedMapDest && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedMapDest(null)}
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 15 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-3xl bg-slate-950 text-white shadow-2xl border border-slate-800 z-10 overflow-hidden"
            >
              {/* Header */}
              <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/20 text-[#3B71FE] border border-blue-500/30">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base sm:text-lg text-white">
                      Google Maps: {selectedMapDest.name}
                    </h3>
                    <p className="text-xs text-slate-400">
                      Coordinates: {selectedMapDest.coordinates.lat}° N, {selectedMapDest.coordinates.lng}° E • {selectedMapDest.district} District
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={selectedMapDest.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-xl bg-[#3B71FE] hover:bg-blue-600 text-white px-3.5 py-2 text-xs font-bold transition shadow-md shadow-blue-500/25"
                  >
                    <ExternalLink size={13} />
                    <span>Open in Maps App</span>
                  </a>
                  <button
                    onClick={() => setSelectedMapDest(null)}
                    aria-label="Close Map"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              {/* Map Iframe */}
              <div className="relative flex-1 min-h-[380px] sm:min-h-[460px] w-full bg-slate-900">
                <iframe
                  title={`Google Map - ${selectedMapDest.name}`}
                  src={selectedMapDest.googleMapsEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: '400px' }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
              </div>

              {/* Footer */}
              <div className="p-4 bg-slate-900 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-300">
                <div>
                  <span className="font-bold text-white">Nearest Travel Hub: </span>
                  <span>{selectedMapDest.nearestHub}</span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      const dest = selectedMapDest;
                      setSelectedMapDest(null);
                      openGallery(dest, 0);
                    }}
                    className="text-amber-400 hover:underline font-semibold"
                  >
                    View Photo Gallery
                  </button>
                  <button
                    onClick={() => setSelectedMapDest(null)}
                    className="rounded-lg bg-white/10 hover:bg-white/20 px-3 py-1.5 text-white font-medium"
                  >
                    Close Map
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
