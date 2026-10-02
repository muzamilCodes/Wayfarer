'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Star, Heart, ArrowRight } from 'lucide-react';
import { JKDistrictDestination } from '@/lib/jk-destinations-data';

interface JKDestinationCardProps {
  district: JKDistrictDestination;
  onExplore: (district: JKDistrictDestination) => void;
  isFavorite?: boolean;
  onToggleFavorite?: (id: string) => void;
  viewMode?: 'grid' | 'list';
}

export default function JKDestinationCard({
  district,
  onExplore,
  isFavorite = false,
  onToggleFavorite,
  viewMode = 'grid',
}: JKDestinationCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [fav, setFav] = useState(isFavorite);

  // 3D tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });
  const rotateX = useTransform(springY, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-8, 8]);
  const glareX = useTransform(springX, [-0.5, 0.5], ['0%', '100%']);
  const glareY = useTransform(springY, [-0.5, 0.5], ['0%', '100%']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || viewMode === 'list') return;
    const rect = cardRef.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const handleHeartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFav(!fav);
    if (onToggleFavorite) onToggleFavorite(district.id);
  };

  /* ───────── LIST VIEW ───────── */
  if (viewMode === 'list') {
    return (
      <div
        onClick={() => onExplore(district)}
        className="group relative flex flex-col sm:flex-row overflow-hidden rounded-xl bg-white border border-gray-200 hover:shadow-lg transition-all duration-300 cursor-pointer"
      >
        <div className="relative h-52 sm:h-auto sm:w-64 shrink-0 overflow-hidden">
          <Image src={district.image} alt={district.district} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="280px" />
          <button onClick={handleHeartClick} aria-label="Save" className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md transition-transform hover:scale-110">
            <Heart size={16} className={fav ? 'fill-red-500 text-red-500' : 'text-gray-400'} />
          </button>
        </div>
        <div className="flex flex-1 flex-col justify-between p-5">
          <div>
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-base font-bold text-gray-900 group-hover:text-[#3B71FE] transition-colors">{district.district}</h3>
              <span className="text-xs text-gray-400 shrink-0 pt-0.5">{district.listingsCount} Listings</span>
            </div>
            <p className="mt-1.5 text-[13px] text-gray-500 line-clamp-2 leading-relaxed">{district.shortDescription}</p>
          </div>
          <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-3">
            <div className="flex items-center gap-1 text-[13px]">
              <Star size={14} className="fill-amber-400 text-amber-400" />
              <span className="font-bold text-gray-900">{district.rating.toFixed(1)}</span>
              <span className="text-gray-400">({district.reviewsCount.toLocaleString()} reviews)</span>
            </div>
            <span className="inline-flex items-center gap-1 text-[13px] font-semibold text-[#E85D04] group-hover:gap-2 transition-all">
              Explore <ArrowRight size={14} />
            </span>
          </div>
        </div>
      </div>
    );
  }

  /* ───────── GRID VIEW (Travivu-exact) ───────── */
  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onExplore(district)}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.2 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-xl bg-white border border-gray-200 hover:shadow-xl transition-shadow duration-300 cursor-pointer will-change-transform"
    >
      {/* 3D Glare */}
      {isHovered && (
        <motion.div
          style={{ background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 60%)` }}
          className="pointer-events-none absolute inset-0 z-30 rounded-xl"
          aria-hidden
        />
      )}

      {/* Image */}
      <div className="relative aspect-[16/12] w-full overflow-hidden">
        <Image
          src={district.image}
          alt={district.district}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Heart - top right */}
        <button
          onClick={handleHeartClick}
          aria-label="Save to favorites"
          className="absolute right-3 top-3 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md transition-all hover:scale-110 active:scale-90"
        >
          <Heart size={15} className={`transition-colors ${fav ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
        </button>

        {/* Listings count badge */}
        <div className="absolute right-3 bottom-3 z-10">
          <span className="rounded bg-white/90 backdrop-blur-sm px-2 py-0.5 text-[11px] font-semibold text-gray-700 shadow-sm">
            {district.listingsCount} Listings
          </span>
        </div>
      </div>

      {/* Content - translateZ for 3D depth */}
      <div style={{ transform: 'translateZ(16px)' }} className="flex flex-1 flex-col justify-between p-4">
        {/* Title row */}
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-bold text-[15px] text-gray-900 leading-snug group-hover:text-[#3B71FE] transition-colors">
              {district.district}
            </h3>
            <span className="text-[11px] text-gray-400 shrink-0 pt-0.5 whitespace-nowrap">
              {district.touristPlaces.length} Places
            </span>
          </div>

          {/* Description */}
          <p className="mt-1.5 text-[12px] text-gray-500 line-clamp-2 leading-[1.6]">
            {district.shortDescription}
          </p>
        </div>

        {/* Bottom: Rating + Explore */}
        <div className="mt-3 flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center gap-1">
            <Star size={14} className="fill-amber-400 text-amber-400" />
            <span className="text-[13px] font-bold text-gray-900">{district.rating.toFixed(1)}</span>
            <span className="text-[11px] text-gray-400">({district.reviewsCount.toLocaleString()} reviews)</span>
          </div>
          <span className="inline-flex items-center gap-1 text-[12px] font-semibold text-[#E85D04] group-hover:gap-2 transition-all">
            Explore <ArrowRight size={13} />
          </span>
        </div>
      </div>
    </motion.div>
  );
}
