'use client';

import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  MapPin, 
  Compass, 
  Calendar, 
  Star, 
  Mountain, 
  ArrowRight, 
  CheckCircle2, 
  Camera, 
  Sparkles,
  PhoneCall,
  Clock
} from 'lucide-react';
import { JKDistrictDestination, TouristPlace } from '@/lib/jk-destinations-data';
import { inr } from '@/lib/format';

interface District3DModalProps {
  district: JKDistrictDestination | null;
  onClose: () => void;
  onBookClick?: (district: JKDistrictDestination) => void;
}

export default function District3DModal({
  district,
  onClose,
  onBookClick,
}: District3DModalProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (district) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [district]);

  // 3D Canvas dynamic mountain terrain & particle simulation
  useEffect(() => {
    if (!district || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 400);
    let height = (canvas.height = 240);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = 240;
    };
    window.addEventListener('resize', handleResize);

    // Particle nodes for 3D elevation lattice
    const cols = 26;
    const rows = 14;
    let angle = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Deep atmospheric gradient
      const bgGrad = ctx.createLinearGradient(0, 0, width, height);
      bgGrad.addColorStop(0, '#0A2733');
      bgGrad.addColorStop(1, '#0F3B4A');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      angle += 0.015;

      const cellW = width / (cols - 1);
      const cellH = height / (rows - 1);

      // Draw 3D wireframe terrain
      ctx.lineWidth = 1;
      for (let r = 0; r < rows; r++) {
        ctx.beginPath();
        for (let c = 0; c < cols; c++) {
          const x = c * cellW;
          // 3D wave elevation formula
          const wave1 = Math.sin(c * 0.4 + angle) * 18;
          const wave2 = Math.cos(r * 0.6 + angle * 0.7) * 14;
          const distFromCenter = Math.sin((c / cols) * Math.PI);
          const y = (r * cellH * 0.7) + height * 0.25 + (wave1 + wave2) * distFromCenter;

          if (c === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.strokeStyle = `rgba(217, 164, 65, ${0.15 + (r / rows) * 0.25})`;
        ctx.stroke();
      }

      // Draw vertical grid lines for depth
      for (let c = 0; c < cols; c += 2) {
        ctx.beginPath();
        for (let r = 0; r < rows; r++) {
          const x = c * cellW;
          const wave1 = Math.sin(c * 0.4 + angle) * 18;
          const wave2 = Math.cos(r * 0.6 + angle * 0.7) * 14;
          const distFromCenter = Math.sin((c / cols) * Math.PI);
          const y = (r * cellH * 0.7) + height * 0.25 + (wave1 + wave2) * distFromCenter;

          if (r === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `rgba(107, 79, 160, 0.18)`;
        ctx.stroke();
      }

      // Glowing floating altitude nodes
      for (let i = 0; i < 18; i++) {
        const px = (width * 0.15 + (i * 47) % (width * 0.7)) + Math.sin(angle * 1.5 + i) * 15;
        const py = (height * 0.2 + (i * 31) % (height * 0.6)) + Math.cos(angle * 1.2 + i) * 10;
        ctx.fillStyle = i % 2 === 0 ? '#D9A441' : '#6B4FA0';
        ctx.shadowColor = '#D9A441';
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(px, py, 2.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [district]);

  return (
    <AnimatePresence>
      {district && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-8">
          {/* Backdrop with animated blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/75 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative z-10 flex flex-col max-h-[92vh] w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-2xl border border-slate-100"
          >
            {/* Top Interactive 3D Terrain & Hero Header */}
            <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-900">
              {/* Canvas 3D background */}
              <canvas
                ref={canvasRef}
                className="absolute inset-0 h-full w-full pointer-events-none"
              />

              {/* Photo Overlay with scenic image fade */}
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-overlay"
                style={{ backgroundImage: `url(${district.image})` }}
              />

              {/* Ambient radial glow */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md hover:bg-white hover:text-slate-900 transition-all shadow-lg"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>

              {/* 3D District Badge & Title Content */}
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 text-white">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#D9A441] px-3 py-1 text-xs font-bold text-slate-950 uppercase tracking-wider shadow-md">
                    <Sparkles size={13} /> {district.division}
                  </span>
                  <span className="rounded-full bg-white/20 backdrop-blur-md px-3 py-1 text-xs font-medium text-white border border-white/20">
                    {district.listingsCount} Verified Attractions
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-1 text-xs font-semibold">
                    <Star size={13} className="fill-emerald-400 text-emerald-400" /> {district.rating} ({district.reviewsCount} reviews)
                  </span>
                </div>

                <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white drop-shadow-md">
                  {district.district}
                </h2>
                <p className="mt-1 text-xs sm:text-sm text-slate-200/90 font-medium">
                  {district.tagline}
                </p>
              </div>
            </div>

            {/* Quick Meta Stats Ribbon */}
            <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-slate-100 border-b border-slate-100 bg-slate-50/90 text-slate-700 text-xs sm:text-sm">
              <div className="p-3.5 sm:p-4 text-center">
                <span className="text-[11px] font-semibold uppercase text-slate-400 block mb-0.5">Best Season</span>
                <span className="font-bold text-slate-800 flex items-center justify-center gap-1.5">
                  <Calendar size={14} className="text-[#D9A441]" /> {district.bestSeason.split('(')[0]}
                </span>
              </div>
              <div className="p-3.5 sm:p-4 text-center">
                <span className="text-[11px] font-semibold uppercase text-slate-400 block mb-0.5">Elevation</span>
                <span className="font-bold text-slate-800 flex items-center justify-center gap-1.5">
                  <Mountain size={14} className="text-[#0F3B4A]" /> {district.altitude}
                </span>
              </div>
              <div className="p-3.5 sm:p-4 text-center">
                <span className="text-[11px] font-semibold uppercase text-slate-400 block mb-0.5">Ideal Stay</span>
                <span className="font-bold text-slate-800 flex items-center justify-center gap-1.5">
                  <Clock size={14} className="text-[#6B4FA0]" /> {district.duration}
                </span>
              </div>
              <div className="p-3.5 sm:p-4 text-center">
                <span className="text-[11px] font-semibold uppercase text-slate-400 block mb-0.5">Starting Package</span>
                <span className="font-bold text-emerald-700 flex items-center justify-center gap-1.5">
                  From {inr(district.startingPrice)}
                </span>
              </div>
            </div>

            {/* Scrollable Content Body */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
              {/* District Overview */}
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Compass size={18} className="text-[#0F3B4A]" />
                  District Overview
                </h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  {district.overview}
                </p>
              </div>

              {/* Comprehensive List of ALL Tourist Places in this District */}
              <div>
                <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-2">
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <MapPin size={18} className="text-rose-500" />
                    Key Tourist Places & Attractions ({district.touristPlaces.length} Spots)
                  </h3>
                  <span className="text-xs text-slate-500 font-medium">All Famous & Offbeat Sights</span>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {district.touristPlaces.map((place, idx) => {
                    // Category badge colors
                    const badgeStyles: Record<string, string> = {
                      'Must-Visit': 'bg-amber-100 text-amber-900 border-amber-200',
                      'Heritage': 'bg-indigo-100 text-indigo-900 border-indigo-200',
                      'Adventure': 'bg-sky-100 text-sky-900 border-sky-200',
                      'Spiritual': 'bg-emerald-100 text-emerald-900 border-emerald-200',
                      'Lake & Nature': 'bg-teal-100 text-teal-900 border-teal-200',
                      'Scenic View': 'bg-purple-100 text-purple-900 border-purple-200',
                      'Family & Leisure': 'bg-pink-100 text-pink-900 border-pink-200',
                      'Offbeat & Camping': 'bg-orange-100 text-orange-900 border-orange-200',
                    };

                    return (
                      <motion.div
                        key={place.name}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.03 }}
                        className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden hover:border-[#0F3B4A]/40 hover:shadow-md transition-all group flex flex-col"
                      >
                        {place.image && (
                          <div className="relative h-40 w-full overflow-hidden bg-slate-100">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={place.image}
                              alt={place.name}
                              className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />
                            <span className={`absolute top-2.5 right-2.5 rounded-full px-2.5 py-0.5 text-[10px] font-bold border backdrop-blur-md shadow-sm ${badgeStyles[place.category] || 'bg-white/90 text-slate-800'}`}>
                              {place.category}
                            </span>
                            <span className="absolute bottom-2 left-3 text-[11px] font-medium text-white/90 drop-shadow">
                              {district.district}
                            </span>
                          </div>
                        )}
                        <div className="p-4 flex-1 flex flex-col justify-between">
                          <div>
                            {!place.image && (
                              <div className="flex items-start justify-end mb-1">
                                <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold border ${badgeStyles[place.category] || 'bg-slate-100 text-slate-700'}`}>
                                  {place.category}
                                </span>
                              </div>
                            )}
                            <h4 className="font-bold text-sm text-slate-900 group-hover:text-[#0F3B4A] transition-colors flex items-center gap-1.5">
                              <MapPin size={13} className="text-[#D9A441] shrink-0" />
                              {place.name}
                            </h4>
                            <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
                              {place.description}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Travel Types Tags */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Experience Categories
                </h4>
                <div className="flex flex-wrap gap-2">
                  {district.travelTypes.map((type) => (
                    <span
                      key={type}
                      className="rounded-xl bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700 border border-slate-200"
                    >
                      {type}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Actions Bar */}
            <div className="border-t border-slate-100 bg-white p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div>
                <span className="text-xs text-slate-500 block">Complete District Guided Packages</span>
                <span className="text-lg font-extrabold text-[#0F3B4A]">
                  From {inr(district.startingPrice)} <span className="text-xs font-normal text-slate-500">/ person (All-incl.)</span>
                </span>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <a
                  href={`https://wa.me/919419000000?text=Hi%20Wayfarer!%20I%20am%20interested%20in%20visiting%20${encodeURIComponent(district.district)}%20in%20Jammu%20%26%20Kashmir.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 rounded-full border border-slate-300 px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  <PhoneCall size={14} /> WhatsApp Guide
                </a>

                <button
                  onClick={() => {
                    onClose();
                    if (onBookClick) onBookClick(district);
                  }}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 rounded-full bg-[#D9A441] hover:bg-[#c99534] px-6 py-2.5 text-xs font-bold text-slate-950 shadow-md shadow-amber-500/20 transition-all hover:scale-105"
                >
                  <span>Book Custom Tour</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
