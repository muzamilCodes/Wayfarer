'use client';

import React, { useState, useEffect, useRef } from 'react';
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
  ArrowRight,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  JK_TOP_10_DESTINATIONS,
  JKTop10Destination,
} from '@/lib/jk-top10-data';

export default function MostPopularLoop() {
  const [isPaused, setIsPaused] = useState(false);
  const [selectedGalleryDest, setSelectedGalleryDest] = useState<JKTop10Destination | null>(null);
  const [galleryIndex, setGalleryIndex] = useState<number>(0);
  const [selectedMapDest, setSelectedMapDest] = useState<JKTop10Destination | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

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

  const openGallery = (dest: JKTop10Destination, index = 0) => {
    setSelectedGalleryDest(dest);
    setGalleryIndex(index);
  };

  const openMap = (dest: JKTop10Destination) => {
    setSelectedMapDest(dest);
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -360, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 360, behavior: 'smooth' });
    }
  };

  // We duplicate the list twice for continuous seamless infinite loop
  const loopList = [...JK_TOP_10_DESTINATIONS, ...JK_TOP_10_DESTINATIONS];

  return (
    <div className="w-full mb-8 overflow-hidden">
      {/* Header bar for Most Popular Destinations */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mb-3 px-1">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-0.5 text-[10px] font-bold text-[#3B71FE] border border-blue-100 mb-1">
            <Sparkles size={11} className="text-[#FF5B00]" />
            <span>Most Popular Destinations</span>
          </div>
          <h2 className="text-sm sm:text-base font-bold text-gray-900 tracking-tight">
            Explore Top Places in Jammu &amp; Kashmir
          </h2>
          <p className="text-[11px] sm:text-xs text-gray-500 mt-0.5">
            Trending tourist spots with live Google Maps navigation &amp; photo galleries • Moving continuously right-to-left
          </p>
        </div>

        {/* Carousel controls */}
        <div className="flex items-center gap-1.5 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setIsPaused(!isPaused)}
            aria-label={isPaused ? 'Resume auto scroll' : 'Pause auto scroll'}
            className="flex items-center gap-1 rounded-full border border-gray-200 bg-white px-2.5 py-1 text-[11px] font-bold text-gray-700 hover:bg-gray-50 shadow-sm transition"
          >
            {isPaused ? (
              <svg className="w-2.5 h-2.5 text-emerald-600 fill-emerald-600" viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            ) : (
              <svg className="w-2.5 h-2.5 text-[#3B71FE] fill-[#3B71FE]" viewBox="0 0 24 24"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
            )}
            <span>{isPaused ? 'Resume' : 'Pause'}</span>
          </button>

          <button
            type="button"
            onClick={scrollLeft}
            aria-label="Scroll left"
            className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 shadow-sm transition"
          >
            <ChevronLeft size={14} />
          </button>
          <button
            type="button"
            onClick={scrollRight}
            aria-label="Scroll right"
            className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 shadow-sm transition"
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* Infinite loop marquee track */}
      <div
        ref={scrollContainerRef}
        className="relative w-full overflow-x-auto no-scrollbar py-1"
        style={{ scrollBehavior: 'smooth' }}
      >
        <div
          className="animate-marquee-loop flex gap-3.5 sm:gap-4 items-stretch"
          style={{
            animationPlayState: isPaused ? 'paused' : undefined,
          }}
        >
          {loopList.map((dest, idx) => (
            <div
              key={`${dest.id}-${idx}`}
              className="group flex flex-col w-[250px] sm:w-[270px] shrink-0 rounded-xl bg-white border border-gray-200 hover:border-[#3B71FE]/50 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
              {/* Image banner */}
              <div className="relative h-32 sm:h-36 w-full overflow-hidden bg-slate-900">
                <Image
                  src={dest.coverImage}
                  alt={dest.name}
                  fill
                  sizes="270px"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-black/30" />

                {/* Badges */}
                <div className="absolute top-2 left-2 right-2 flex items-center justify-between z-10">
                  <span className="flex items-center gap-1 rounded-full bg-black/60 backdrop-blur-md px-2 py-0.5 text-[10px] font-bold text-white border border-white/20">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#FF5B00]" />
                    #{dest.rank}
                  </span>
                  <span className="rounded-full bg-white/90 backdrop-blur-md px-1.5 py-0.5 text-[9.5px] font-bold text-slate-800">
                    {dest.division === 'Kashmir Valley' ? 'Kashmir' : 'Jammu'}
                  </span>
                </div>

                {/* Title overlay */}
                <div className="absolute bottom-2 left-2 right-2 z-10 text-white">
                  <div className="flex items-center gap-1 text-[10px] text-blue-200 font-semibold mb-0.5">
                    <MapPin size={10} className="text-[#3B71FE]" />
                    <span className="truncate">{dest.district} District</span>
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-white leading-tight drop-shadow-sm truncate">
                    {dest.name}
                  </h3>
                </div>

                {/* Quick Photos badge */}
                <button
                  type="button"
                  onClick={() => openGallery(dest, 0)}
                  className="absolute bottom-2 right-2 z-20 inline-flex items-center gap-1 rounded-md bg-black/70 hover:bg-black text-white px-1.5 py-0.5 text-[10px] font-medium backdrop-blur-md border border-white/20 transition hover:scale-105"
                >
                  <Camera size={10} className="text-amber-400" />
                  <span>{dest.gallery.length}</span>
                </button>
              </div>

              {/* Card content */}
              <div className="p-2.5 flex-1 flex flex-col justify-between space-y-2">
                {/* Overview snippet */}
                <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">
                  {dest.overview}
                </p>

                {/* Best time pill */}
                <div className="flex items-center gap-1 text-[10px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md">
                  <Calendar size={11} className="text-emerald-600 shrink-0" />
                  <span className="truncate">
                    <strong>Best:</strong> {dest.bestTime}
                  </span>
                </div>

                {/* Action buttons matching exact user requirements */}
                <div className="pt-1.5 border-t border-gray-100 flex items-center justify-between gap-1">
                  {/* 1. Open in Google Maps */}
                  <a
                    href={dest.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Open in Google Maps"
                    className="inline-flex items-center gap-1 rounded-md bg-blue-50 hover:bg-blue-100 text-[#3B71FE] border border-blue-200/80 px-2 py-1 text-[10px] font-bold transition shadow-sm"
                  >
                    <MapPin size={10} />
                    <span>Maps</span>
                    <ExternalLink size={8} className="opacity-70" />
                  </a>

                  {/* 2. View Photo Gallery */}
                  <button
                    type="button"
                    onClick={() => openGallery(dest, 0)}
                    title="View Photo Gallery"
                    className="inline-flex items-center gap-1 rounded-md bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200/80 px-2 py-1 text-[10px] font-bold transition shadow-sm"
                  >
                    <Camera size={10} className="text-amber-600" />
                    <span>Photos</span>
                  </button>

                  {/* 3. Map View */}
                  <button
                    type="button"
                    onClick={() => openMap(dest)}
                    title="Live Map View"
                    className="inline-flex items-center gap-1 rounded-md bg-slate-50 hover:bg-slate-100 text-slate-800 border border-slate-200 px-2 py-1 text-[10px] font-bold transition shadow-sm"
                  >
                    <Compass size={10} className="text-rose-500" />
                    <span>Embed</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── VISUAL PHOTO GALLERY LIGHTBOX MODAL ── */}
      <AnimatePresence>
        {selectedGalleryDest && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedGalleryDest(null)}
              className="fixed inset-0 bg-slate-950/90 backdrop-blur-md transition-opacity"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 15 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="relative w-full max-w-5xl max-h-[94vh] flex flex-col rounded-3xl bg-slate-950 text-white shadow-2xl border border-slate-800 z-10 overflow-hidden"
            >
              {/* Header */}
              <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between gap-4">
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

                <div className="flex items-center gap-2">
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

              {/* Caption & Thumbnails */}
              <div className="p-4 sm:p-5 bg-slate-900 border-t border-slate-800 space-y-3">
                <div>
                  <h4 className="font-bold text-sm sm:text-base text-white">
                    {selectedGalleryDest.gallery[galleryIndex]?.title}
                  </h4>
                  <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                    {selectedGalleryDest.gallery[galleryIndex]?.caption}
                  </p>
                </div>

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
    </div>
  );
}
