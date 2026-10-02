'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
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
  const [fav, setFav] = useState(isFavorite);

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
            <div className="mt-2 flex flex-wrap gap-1 items-center">
              {district.touristPlaces.slice(0, 4).map((p) => (
                <span
                  key={p.name}
                  className="inline-block rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600 truncate max-w-[150px]"
                >
                  {p.name.split('(')[0].trim()}
                </span>
              ))}
              {district.touristPlaces.length > 4 && (
                <span className="inline-block rounded-md bg-blue-50 px-1.5 py-0.5 text-[11px] font-semibold text-[#3B71FE]">
                  +{district.touristPlaces.length - 4} more
                </span>
              )}
            </div>
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

  /* ───────── GRID VIEW (Travivu-exact, Crystal Clear Hover) ───────── */
  return (
    <motion.div
      onClick={() => onExplore(district)}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white border border-gray-100/90 hover:border-gray-200 hover:shadow-[0_16px_36px_rgba(0,0,0,0.08)] transition-all duration-300 cursor-pointer"
    >

      {/* Image Container */}
      <div className="relative aspect-[16/11] w-full overflow-hidden bg-gray-100">
        <Image
          src={district.image}
          alt={district.district}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Heart Icon - top right floating white circle */}
        <button
          onClick={handleHeartClick}
          aria-label="Save to favorites"
          className="absolute right-3.5 top-3.5 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-white/95 shadow-[0_2px_8px_rgba(0,0,0,0.12)] transition-transform hover:scale-110 active:scale-95"
        >
          <Heart
            size={16}
            className={`transition-colors ${
              fav ? 'fill-red-500 text-red-500' : 'text-[#3B71FE] hover:fill-[#3B71FE]/20'
            }`}
          />
        </button>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col justify-between p-4 sm:p-5">
        <div>
          {/* Row 1: Title (left) & Listings count (right) */}
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-bold text-[15px] sm:text-[16px] text-gray-900 leading-snug group-hover:text-[#3B71FE] transition-colors">
              {district.district}, J&amp;K
            </h3>
            <span className="text-[12px] text-gray-400 font-medium shrink-0 pt-0.5 whitespace-nowrap">
              {district.listingsCount} Listings
            </span>
          </div>

          {/* Row 2: Short Description */}
          <p className="mt-1.5 text-[12.5px] text-gray-500 line-clamp-2 leading-[1.6]">
            {district.shortDescription}
          </p>

          {/* Key Tourist Places Badges */}
          <div className="mt-2.5 flex flex-wrap gap-1 items-center">
            {district.touristPlaces.slice(0, 3).map((p) => (
              <span
                key={p.name}
                className="inline-block rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600 truncate max-w-[130px]"
                title={p.name}
              >
                {p.name.split('(')[0].trim()}
              </span>
            ))}
            {district.touristPlaces.length > 3 && (
              <span className="inline-block rounded-md bg-blue-50 px-1.5 py-0.5 text-[11px] font-semibold text-[#3B71FE]">
                +{district.touristPlaces.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Row 3: Rating (left) & Explore -> in blue (right) */}
        <div className="mt-3.5 flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center gap-1.5">
            <Star size={14} className="fill-amber-400 text-amber-400" />
            <span className="text-[13px] font-bold text-gray-900">{district.rating.toFixed(1)}</span>
            <span className="text-[12px] text-gray-400 font-normal">
              ({district.reviewsCount.toLocaleString()} reviews)
            </span>
          </div>
          <span className="inline-flex items-center gap-1 text-[12.5px] font-semibold text-[#3B71FE] group-hover:gap-1.5 transition-all">
            Explore <ArrowRight size={13} />
          </span>
        </div>
      </div>
    </motion.div>
  );
}
