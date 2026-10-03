'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { inr } from '@/lib/format';
import {
  MapPin,
  Plus,
  Search,
  Trash2,
  Edit3,
  ExternalLink,
  Star,
  Compass,
  Calendar,
  Sparkles,
  X,
  Check,
} from 'lucide-react';

export interface DestinationItem {
  _id: string;
  name: string;
  slug: string;
  region: string;
  country?: string;
  description: string;
  images: { url: string; publicId?: string }[];
  location?: { coordinates: [number, number] };
  bestTime?: string;
  startingPrice?: number;
  rating?: number;
  popularity?: number;
  isPublished?: boolean;
}

interface AdminDestinationsViewProps {
  destinations: DestinationItem[];
  onAddDestination: (dest: Partial<DestinationItem>) => Promise<void>;
  onUpdateDestination: (id: string, dest: Partial<DestinationItem>) => Promise<void>;
  onDeleteDestination: (id: string) => Promise<void>;
}

export default function AdminDestinationsView({
  destinations,
  onAddDestination,
  onUpdateDestination,
  onDeleteDestination,
}: AdminDestinationsViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All');

  // Modals
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingDest, setEditingDest] = useState<DestinationItem | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [formName, setFormName] = useState('');
  const [formRegion, setFormRegion] = useState('Kashmir Valley');
  const [formDescription, setFormDescription] = useState('');
  const [formImageUrl, setFormImageUrl] = useState('');
  const [formBestTime, setFormBestTime] = useState('');
  const [formStartingPrice, setFormStartingPrice] = useState('15000');
  const [formRating, setFormRating] = useState('4.8');
  const [formLng, setFormLng] = useState('74.79');
  const [formLat, setFormLat] = useState('34.08');

  const openAddModal = () => {
    setFormName('');
    setFormRegion('Kashmir Valley');
    setFormDescription('');
    setFormImageUrl(
      'https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&w=1200&q=80'
    );
    setFormBestTime('April to October');
    setFormStartingPrice('16000');
    setFormRating('4.8');
    setFormLng('74.80');
    setFormLat('34.10');
    setShowAddModal(true);
  };

  const openEditModal = (dest: DestinationItem) => {
    setEditingDest(dest);
    setFormName(dest.name);
    setFormRegion(dest.region || 'Kashmir Valley');
    setFormDescription(dest.description || '');
    setFormImageUrl(
      dest.images?.[0]?.url ||
        'https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&w=1200&q=80'
    );
    setFormBestTime(dest.bestTime || 'April to October');
    setFormStartingPrice(String(dest.startingPrice || 15000));
    setFormRating(String(dest.rating || 4.8));
    setFormLng(String(dest.location?.coordinates?.[0] || 74.8));
    setFormLat(String(dest.location?.coordinates?.[1] || 34.1));
  };

  const handleSaveAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) return;

    try {
      setIsSubmitting(true);
      const slug = formName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      await onAddDestination({
        name: formName.trim(),
        slug,
        region: formRegion,
        country: 'India',
        description: formDescription.trim(),
        images: [{ url: formImageUrl.trim() }],
        bestTime: formBestTime.trim(),
        startingPrice: Number(formStartingPrice) || 12000,
        rating: Number(formRating) || 4.8,
        popularity: 90,
        isPublished: true,
        location: {
          coordinates: [Number(formLng) || 74.8, Number(formLat) || 34.1],
        },
      });
      setShowAddModal(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDest || !formName.trim()) return;

    try {
      setIsSubmitting(true);
      await onUpdateDestination(editingDest._id, {
        name: formName.trim(),
        region: formRegion,
        description: formDescription.trim(),
        images: [{ url: formImageUrl.trim() }],
        bestTime: formBestTime.trim(),
        startingPrice: Number(formStartingPrice) || 12000,
        rating: Number(formRating) || 4.8,
        location: {
          coordinates: [Number(formLng) || 74.8, Number(formLat) || 34.1],
        },
      });
      setEditingDest(null);
    } finally {
      setIsSubmitting(false);
    }
  };

  const filtered = destinations.filter((dest) => {
    const q = searchQuery.toLowerCase();
    const matchesQuery =
      dest.name.toLowerCase().includes(q) ||
      dest.region.toLowerCase().includes(q) ||
      (dest.description && dest.description.toLowerCase().includes(q));

    const matchesRegion =
      selectedRegion === 'All' ||
      dest.region.toLowerCase().includes(selectedRegion.toLowerCase());

    return matchesQuery && matchesRegion;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Banner & Action Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 rounded-2xl border border-[#1E3A5F]/70 bg-[#0B1A30]/80 p-5 backdrop-blur-xl">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/20">
              <Compass size={18} />
            </span>
            <h2 className="text-xl font-black text-white">
              Destinations (MongoDB Live Catalog)
            </h2>
            <span className="rounded-full bg-blue-500/10 border border-blue-500/30 px-2.5 py-0.5 text-xs font-bold text-blue-400">
              {destinations.length} Hubs
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Manage high-altitude valleys, holy shrines, lakes, and master travel hubs with live DB sync and media previews.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={openAddModal}
            className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 px-4 py-2 text-xs font-bold text-white shadow-lg shadow-blue-600/30 transition transform hover:-translate-y-0.5"
          >
            <Plus size={15} />
            <span>+ Add Destination</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search destinations by name, region, or attraction..."
            className="w-full rounded-xl border border-[#1E3A5F]/60 bg-[#081222] pl-10 pr-4 py-2.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          {['All', 'Kashmir', 'Jammu', 'Ladakh'].map((reg) => (
            <button
              key={reg}
              onClick={() => setSelectedRegion(reg)}
              className={`rounded-xl px-3.5 py-2 text-xs font-semibold transition ${
                selectedRegion === reg
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                  : 'bg-[#0B1A30] text-slate-400 hover:text-white border border-[#1E3A5F]/50'
              }`}
            >
              {reg === 'All' ? 'All Regions' : `${reg} Region`}
            </button>
          ))}
        </div>
      </div>

      {/* Destinations Grid */}
      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-800 bg-[#081222]/60 p-12 text-center">
          <Compass size={36} className="mx-auto text-slate-600 mb-2" />
          <p className="text-sm font-semibold text-slate-300">No destinations match your search.</p>
          <p className="text-xs text-slate-500 mt-1">Try clearing filters or add a new destination.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((dest) => {
            const coverImage =
              dest.images?.[0]?.url ||
              'https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&w=1200&q=80';

            return (
              <div
                key={dest._id}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[#162A48] bg-[#0A1628] hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/5 transition duration-300"
              >
                {/* Image Cover */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-900">
                  <img
                    src={coverImage}
                    alt={dest.name}
                    className="h-full w-full object-cover group-hover:scale-105 transition duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&w=1200&q=80';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628] via-[#0A1628]/30 to-transparent" />

                  {/* Badges on Image */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className="rounded-full bg-black/60 backdrop-blur-md border border-white/10 px-2.5 py-1 text-[11px] font-bold text-white">
                      {dest.region}
                    </span>
                  </div>

                  <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-amber-500/90 backdrop-blur-md px-2.5 py-1 text-[11px] font-black text-slate-950 shadow-md">
                    <Star size={11} className="fill-current" />
                    <span>{dest.rating ? dest.rating.toFixed(1) : '4.8'}</span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="text-lg font-black text-white leading-tight">
                      {dest.name}
                    </h3>
                    <span className="text-[11px] text-cyan-300 font-mono">
                      /destinations/{dest.slug}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {dest.description || 'Scenic mountain destination with pristine streams and vistas.'}
                  </p>

                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800/80 text-[11px]">
                    <div className="flex items-center gap-1.5 text-slate-300">
                      <Calendar size={13} className="text-blue-400 shrink-0" />
                      <span className="truncate">{dest.bestTime || 'April – Oct'}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-300 justify-end">
                      <span className="text-slate-500 font-sans">From</span>
                      <span className="font-bold text-emerald-400">
                        {inr(dest.startingPrice || 14500)}
                      </span>
                    </div>
                  </div>

                  {/* Actions Row */}
                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
                    <Link
                      href={`/destinations/${dest.slug}`}
                      target="_blank"
                      className="flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-[11px] font-semibold text-slate-300 hover:text-white hover:bg-slate-800/60 transition"
                      title="View Customer Page"
                    >
                      <ExternalLink size={13} />
                      <span>Live Page</span>
                    </Link>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => openEditModal(dest)}
                        className="flex items-center gap-1 rounded-lg bg-blue-600/20 border border-blue-500/30 px-3 py-1.5 text-[11px] font-bold text-blue-300 hover:bg-blue-600 hover:text-white transition shadow-sm"
                        title="Edit Destination"
                      >
                        <Edit3 size={13} />
                        <span>Edit</span>
                      </button>

                      <button
                        onClick={() => {
                          if (
                            confirm(
                              `Are you sure you want to delete destination "${dest.name}" from MongoDB database?`
                            )
                          ) {
                            onDeleteDestination(dest._id);
                          }
                        }}
                        className="flex items-center gap-1 rounded-lg bg-rose-500/10 border border-rose-500/30 px-2.5 py-1.5 text-[11px] font-bold text-rose-400 hover:bg-rose-600 hover:text-white transition"
                        title="Delete Destination"
                      >
                        <Trash2 size={13} />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ============================================================ */}
      {/* ADD DESTINATION MODAL */}
      {/* ============================================================ */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl border border-slate-700 bg-[#091527] p-6 text-slate-100 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-600 text-white">
                  <Compass size={18} />
                </span>
                <h3 className="text-lg font-black text-white">Create New Destination</h3>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveAdd} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Destination Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="e.g. Doodhpathri"
                    className="w-full rounded-xl border border-slate-700 bg-slate-900/90 px-3.5 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Region / Division *
                  </label>
                  <select
                    value={formRegion}
                    onChange={(e) => setFormRegion(e.target.value)}
                    className="w-full rounded-xl border border-slate-700 bg-slate-900/90 px-3.5 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="Kashmir Valley">Kashmir Valley</option>
                    <option value="Jammu Division">Jammu Division</option>
                    <option value="Ladakh / J&K Border">Ladakh / J&K Border</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Cover Image URL (Unsplash HD / Cloudinary) *
                </label>
                <input
                  type="url"
                  required
                  value={formImageUrl}
                  onChange={(e) => setFormImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/photo-..."
                  className="w-full rounded-xl border border-slate-700 bg-slate-900/90 px-3.5 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                />
                {formImageUrl && (
                  <div className="mt-2 h-28 w-full rounded-xl overflow-hidden border border-slate-800 bg-slate-950 relative">
                    <img
                      src={formImageUrl}
                      alt="Preview"
                      className="h-full w-full object-cover"
                    />
                    <span className="absolute bottom-2 right-2 rounded-md bg-black/70 px-2 py-0.5 text-[10px] text-white">
                      Image Preview
                    </span>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Best Time to Visit
                  </label>
                  <input
                    type="text"
                    value={formBestTime}
                    onChange={(e) => setFormBestTime(e.target.value)}
                    placeholder="e.g. May to October"
                    className="w-full rounded-xl border border-slate-700 bg-slate-900/90 px-3.5 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Starting Price (INR ₹)
                  </label>
                  <input
                    type="number"
                    value={formStartingPrice}
                    onChange={(e) => setFormStartingPrice(e.target.value)}
                    placeholder="15000"
                    className="w-full rounded-xl border border-slate-700 bg-slate-900/90 px-3.5 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Full Description
                </label>
                <textarea
                  rows={3}
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="Detailed overview for travelers, highlights, history, and geographical marvels..."
                  className="w-full rounded-xl border border-slate-700 bg-slate-900/90 p-3 text-xs text-white focus:outline-none focus:border-blue-500 leading-relaxed"
                />
              </div>

              <div className="flex justify-end gap-2 border-t border-slate-800 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="rounded-xl border border-slate-700 px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-xl bg-blue-600 hover:bg-blue-500 px-5 py-2 text-xs font-bold text-white shadow-lg shadow-blue-600/30 transition disabled:opacity-50"
                >
                  {isSubmitting ? 'Saving to Database...' : 'Save to MongoDB'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* EDIT DESTINATION MODAL */}
      {/* ============================================================ */}
      {editingDest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl border border-slate-700 bg-[#091527] p-6 text-slate-100 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-cyan-600 text-white">
                  <Edit3 size={18} />
                </span>
                <h3 className="text-lg font-black text-white">
                  Edit Destination: {editingDest.name}
                </h3>
              </div>
              <button
                onClick={() => setEditingDest(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Destination Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="w-full rounded-xl border border-slate-700 bg-slate-900/90 px-3.5 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Region / Division *
                  </label>
                  <select
                    value={formRegion}
                    onChange={(e) => setFormRegion(e.target.value)}
                    className="w-full rounded-xl border border-slate-700 bg-slate-900/90 px-3.5 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="Kashmir Valley">Kashmir Valley</option>
                    <option value="Jammu Division">Jammu Division</option>
                    <option value="Ladakh / J&K Border">Ladakh / J&K Border</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Cover Image URL *
                </label>
                <input
                  type="url"
                  required
                  value={formImageUrl}
                  onChange={(e) => setFormImageUrl(e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-900/90 px-3.5 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                />
                {formImageUrl && (
                  <div className="mt-2 h-28 w-full rounded-xl overflow-hidden border border-slate-800 bg-slate-950 relative">
                    <img
                      src={formImageUrl}
                      alt="Preview"
                      className="h-full w-full object-cover"
                    />
                    <span className="absolute bottom-2 right-2 rounded-md bg-black/70 px-2 py-0.5 text-[10px] text-white">
                      Live Preview
                    </span>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Best Time to Visit
                  </label>
                  <input
                    type="text"
                    value={formBestTime}
                    onChange={(e) => setFormBestTime(e.target.value)}
                    className="w-full rounded-xl border border-slate-700 bg-slate-900/90 px-3.5 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Starting Price (INR ₹)
                  </label>
                  <input
                    type="number"
                    value={formStartingPrice}
                    onChange={(e) => setFormStartingPrice(e.target.value)}
                    className="w-full rounded-xl border border-slate-700 bg-slate-900/90 px-3.5 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Full Description
                </label>
                <textarea
                  rows={3}
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-900/90 p-3 text-xs text-white focus:outline-none focus:border-blue-500 leading-relaxed"
                />
              </div>

              <div className="flex justify-end gap-2 border-t border-slate-800 pt-4">
                <button
                  type="button"
                  onClick={() => setEditingDest(null)}
                  className="rounded-xl border border-slate-700 px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-xl bg-blue-600 hover:bg-blue-500 px-5 py-2 text-xs font-bold text-white shadow-lg shadow-blue-600/30 transition disabled:opacity-50"
                >
                  {isSubmitting ? 'Updating DB...' : 'Update MongoDB Destination'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
