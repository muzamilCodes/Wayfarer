'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { JK_ALL_DISTRICTS } from '@/lib/jk-destinations-data';
import JKDestinationCard from '@/components/JKDestinationCard';

export default function JKFeaturedSection() {
  const [favorites, setFavorites] = useState<string[]>([]);

  // Pick top 6 iconic districts for homepage showcase
  const topDistricts = JK_ALL_DISTRICTS.slice(0, 6);

  return (
    <section className="container-x py-16">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 border-b border-gray-100 pb-5 mb-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#3B71FE]">
            All 20 Districts of Jammu &amp; Kashmir
          </span>
          <h2 className="mt-1.5 text-2xl sm:text-3xl font-extrabold text-gray-900">
            Featured Destinations
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Click any district to explore all tourist places, attractions &amp; full travel guide.
          </p>
        </div>
        <Link
          href="/destinations"
          className="group inline-flex items-center gap-1.5 text-sm font-bold text-[#3B71FE] hover:text-[#2857D5] transition-colors"
        >
          <span>View all 20 districts</span>
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {topDistricts.map(district => (
          <JKDestinationCard
            key={district.id}
            district={district}
            isFavorite={favorites.includes(district.id)}
            onToggleFavorite={id => setFavorites(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id])}
          />
        ))}
      </div>
    </section>
  );
}
