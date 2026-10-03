'use client';

import React, { useState } from 'react';
import {
  MessageSquare,
  Star,
  Check,
  X,
  Trash2,
  Search,
  Filter,
  CheckCircle,
  AlertCircle,
  Clock,
} from 'lucide-react';

export interface ReviewItem {
  _id: string;
  user: { _id?: string; name?: string; email?: string } | any;
  booking?: { _id?: string; bookingId?: string } | any;
  package?: { _id?: string; title?: string; slug?: string } | any;
  rating: number;
  text: string;
  images?: string[];
  status: 'pending' | 'approved' | 'rejected' | 'hidden';
  createdAt: string;
}

interface AdminReviewsViewProps {
  reviews: ReviewItem[];
  onUpdateStatus: (id: string, status: 'approved' | 'rejected' | 'pending') => Promise<void>;
  onDeleteReview: (id: string) => Promise<void>;
}

export default function AdminReviewsView({
  reviews,
  onUpdateStatus,
  onDeleteReview,
}: AdminReviewsViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'approved' | 'pending' | 'rejected'>('all');

  const totalReviews = reviews.length;
  const approvedCount = reviews.filter((r) => r.status === 'approved').length;
  const pendingCount = reviews.filter((r) => r.status === 'pending').length;
  const avgRating =
    totalReviews > 0
      ? (reviews.reduce((acc, r) => acc + (r.rating || 5), 0) / totalReviews).toFixed(1)
      : '5.0';

  const filtered = reviews.filter((r) => {
    const q = searchQuery.toLowerCase();
    const userName = (r.user?.name || '').toLowerCase();
    const userEmail = (r.user?.email || '').toLowerCase();
    const tourTitle = (r.package?.title || '').toLowerCase();
    const text = (r.text || '').toLowerCase();

    const matchesQuery =
      userName.includes(q) ||
      userEmail.includes(q) ||
      tourTitle.includes(q) ||
      text.includes(q);

    const matchesStatus = filterStatus === 'all' || r.status === filterStatus;

    return matchesQuery && matchesStatus;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 rounded-2xl border border-[#1E3A5F]/70 bg-[#0B1A30]/80 p-5 backdrop-blur-xl">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-amber-500 to-orange-600 text-white shadow-md shadow-amber-500/20">
              <MessageSquare size={18} />
            </span>
            <h2 className="text-xl font-black text-white">
              Customer Reviews & Moderation
            </h2>
            <span className="rounded-full bg-amber-500/10 border border-amber-500/30 px-2.5 py-0.5 text-xs font-bold text-amber-400">
              {totalReviews} Total Reviews
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real feedback from verified travelers across Kashmir Valley and Ladakh expeditions.
          </p>
        </div>
      </div>

      {/* KPI Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-slate-800 bg-[#0A1628] p-4">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Overall Rating
          </span>
          <div className="mt-2 flex items-center gap-2">
            <span className="text-2xl font-black text-white">{avgRating}</span>
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} className="fill-current" />
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-[#0A1628] p-4">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Total Feedback
          </span>
          <span className="mt-2 block text-2xl font-black text-white">{totalReviews}</span>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-[#0A1628] p-4">
          <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block">
            Published Live
          </span>
          <span className="mt-2 block text-2xl font-black text-emerald-400">
            {approvedCount}
          </span>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-[#0A1628] p-4">
          <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block">
            Pending Moderation
          </span>
          <span className="mt-2 block text-2xl font-black text-amber-400">
            {pendingCount}
          </span>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by customer name, tour package, or comment text..."
            className="w-full rounded-xl border border-[#1E3A5F]/60 bg-[#081222] pl-10 pr-4 py-2.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          {[
            { id: 'all', label: 'All Reviews' },
            { id: 'approved', label: 'Published' },
            { id: 'pending', label: 'Pending' },
            { id: 'rejected', label: 'Rejected' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterStatus(tab.id as any)}
              className={`rounded-xl px-3.5 py-2 text-xs font-semibold transition ${
                filterStatus === tab.id
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                  : 'bg-[#0B1A30] text-slate-400 hover:text-white border border-[#1E3A5F]/50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-800 bg-[#081222]/60 p-12 text-center">
            <MessageSquare size={36} className="mx-auto text-slate-600 mb-2" />
            <p className="text-sm font-semibold text-slate-300">No reviews found.</p>
            <p className="text-xs text-slate-500 mt-1">Try changing filter criteria.</p>
          </div>
        ) : (
          filtered.map((rev) => {
            const customerName = rev.user?.name || 'Explorer';
            const customerEmail = rev.user?.email || 'verified.guest@wayfarer.com';
            const tourTitle = rev.package?.title || 'Kashmir Tour Package';

            return (
              <div
                key={rev._id}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl border border-[#162A48] bg-[#0A1628] p-5 hover:border-slate-700 transition"
              >
                <div className="flex items-start gap-3.5 flex-1 min-w-0">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 font-bold text-sm text-white shadow-md shadow-blue-600/20">
                    {customerName.charAt(0).toUpperCase()}
                  </div>

                  <div className="space-y-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-bold text-white text-xs sm:text-sm">
                        {customerName}
                      </span>
                      <span className="text-[11px] text-slate-400">({customerEmail})</span>

                      <div className="flex items-center text-amber-400 ml-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={12}
                            className={i < rev.rating ? 'fill-current' : 'text-slate-700'}
                          />
                        ))}
                      </div>

                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                          rev.status === 'approved'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                            : rev.status === 'pending'
                            ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                            : 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                        }`}
                      >
                        {rev.status.toUpperCase()}
                      </span>
                    </div>

                    <div className="text-[11px] font-semibold text-cyan-400">
                      Tour: {tourTitle}
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed max-w-3xl pt-1">
                      "{rev.text}"
                    </p>

                    <div className="text-[10px] text-slate-500 pt-1">
                      Submitted on{' '}
                      {new Date(rev.createdAt || Date.now()).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </div>
                  </div>
                </div>

                {/* Moderation Actions */}
                <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                  {rev.status !== 'approved' && (
                    <button
                      onClick={() => onUpdateStatus(rev._id, 'approved')}
                      className="flex items-center gap-1 rounded-xl bg-emerald-600/20 border border-emerald-500/30 px-3 py-1.5 text-xs font-bold text-emerald-300 hover:bg-emerald-600 hover:text-white transition"
                    >
                      <Check size={13} />
                      <span>Approve</span>
                    </button>
                  )}

                  {rev.status !== 'rejected' && (
                    <button
                      onClick={() => onUpdateStatus(rev._id, 'rejected')}
                      className="flex items-center gap-1 rounded-xl bg-slate-800 border border-slate-700 px-3 py-1.5 text-xs font-bold text-slate-400 hover:text-white hover:bg-slate-700 transition"
                    >
                      <X size={13} />
                      <span>Reject</span>
                    </button>
                  )}

                  <button
                    onClick={() => {
                      if (confirm('Delete this review permanently?')) {
                        onDeleteReview(rev._id);
                      }
                    }}
                    className="flex items-center gap-1 rounded-xl bg-rose-500/10 border border-rose-500/30 p-2 text-rose-400 hover:bg-rose-600 hover:text-white transition"
                    title="Delete Review"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
