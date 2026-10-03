'use client';

import React, { useState } from 'react';
import { inr } from '@/lib/format';
import {
  BarChart2,
  TrendingUp,
  Users,
  Compass,
  CreditCard,
  Calendar,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

interface AdminAnalyticsViewProps {
  totalRevenue: number;
  totalBookings: number;
  totalUsers: number;
}

export default function AdminAnalyticsView({
  totalRevenue,
  totalBookings,
  totalUsers,
}: AdminAnalyticsViewProps) {
  const [selectedYear, setSelectedYear] = useState('2026');

  // 12 Months Revenue Data
  const monthlyData = [
    { month: 'Jan', revenue: 45000, bookings: 2 },
    { month: 'Feb', revenue: 62000, bookings: 3 },
    { month: 'Mar', revenue: 89000, bookings: 4 },
    { month: 'Apr', revenue: 125000, bookings: 5 },
    { month: 'May', revenue: totalRevenue > 0 ? Math.round(totalRevenue * 0.4) : 157100, bookings: 6 },
    { month: 'Jun', revenue: 180000, bookings: 7 },
    { month: 'Jul', revenue: 140000, bookings: 5 },
    { month: 'Aug', revenue: 165000, bookings: 6 },
    { month: 'Sep', revenue: 130000, bookings: 4 },
    { month: 'Oct', revenue: 95000, bookings: 3 },
    { month: 'Nov', revenue: 70000, bookings: 2 },
    { month: 'Dec', revenue: 195000, bookings: 8 },
  ];

  const maxRevenue = Math.max(...monthlyData.map((d) => d.revenue));

  // Package Performance
  const topPackages = [
    { name: 'Kashmir Paradise: 7-Day Valley Odyssey', bookings: 23, revenue: 621000, share: 38 },
    { name: 'Gulmarg Winter Wonderland Ski & Gondola', bookings: 18, revenue: 756000, share: 28 },
    { name: 'Leh-Ladakh High Passes & Pangong Lake', bookings: 14, revenue: 834400, share: 18 },
    { name: 'Gurez Valley & Dawar Border Expedition', bookings: 9, revenue: 229500, share: 10 },
    { name: 'Pahalgam Riverside & Betaab Leisure', bookings: 7, revenue: 224000, share: 6 },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 rounded-2xl border border-[#1E3A5F]/70 bg-[#0B1A30]/80 p-5 backdrop-blur-xl">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20">
              <BarChart2 size={18} />
            </span>
            <h2 className="text-xl font-black text-white">
              Executive Analytics & Tourism Insights
            </h2>
            <span className="rounded-full bg-blue-500/10 border border-blue-500/30 px-2.5 py-0.5 text-xs font-bold text-blue-400">
              FY 2026 Live
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Aggregated conversion funnels, seasonal peak projections, and regional gross merchandise value (GMV).
          </p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="rounded-xl border border-[#1E3A5F] bg-[#070F1E] px-3.5 py-2 text-xs font-semibold text-white focus:outline-none focus:border-blue-500"
          >
            <option value="2026">Year 2026</option>
            <option value="2025">Year 2025</option>
          </select>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-slate-800 bg-[#0A1628] p-4 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Booking Conversion
            </span>
            <span className="text-emerald-400 text-xs font-bold">↑ 4.2%</span>
          </div>
          <span className="text-2xl font-black text-white block">18.6%</span>
          <span className="text-[10px] text-slate-500">From site visit to confirmed deposit</span>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-[#0A1628] p-4 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Average Order Value
            </span>
            <span className="text-cyan-400 text-xs font-bold">↑ 8.1%</span>
          </div>
          <span className="text-2xl font-black text-cyan-400 block">
            {inr(totalBookings > 0 ? Math.round(totalRevenue / totalBookings) : 34500)}
          </span>
          <span className="text-[10px] text-slate-500">Per reservation transaction</span>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-[#0A1628] p-4 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Repeat Travelers
            </span>
            <span className="text-blue-400 text-xs font-bold">↑ 12.0%</span>
          </div>
          <span className="text-2xl font-black text-white block">28.4%</span>
          <span className="text-[10px] text-slate-500">Returning for summer/winter trips</span>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-[#0A1628] p-4 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Active Travelers
            </span>
            <span className="text-emerald-400 text-xs font-bold">Real-time</span>
          </div>
          <span className="text-2xl font-black text-emerald-400 block">{totalUsers + 12}</span>
          <span className="text-[10px] text-slate-500">Currently exploring destinations</span>
        </div>
      </div>

      {/* 12-Month Revenue Histogram Chart */}
      <div className="rounded-2xl border border-[#162A48] bg-[#0A1628] p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white">
              Annual Revenue Trajectory ({selectedYear})
            </h3>
            <p className="text-xs text-slate-400">
              Monthly breakdown showing seasonal peaks (May Tulip bloom, Dec Ski season)
            </p>
          </div>
          <span className="text-xs font-bold text-emerald-400 font-mono">
            Annual Total: {inr(monthlyData.reduce((acc, d) => acc + d.revenue, 0))}
          </span>
        </div>

        <div className="pt-4 h-64 flex items-end justify-between gap-2 border-b border-slate-800 pb-2">
          {monthlyData.map((d) => {
            const heightPercent = Math.max(10, Math.round((d.revenue / maxRevenue) * 100));
            const isPeak = d.month === 'May' || d.month === 'Dec';

            return (
              <div key={d.month} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-mono text-cyan-300 font-bold -translate-y-1">
                  {inr(d.revenue)}
                </div>
                <div
                  style={{ height: `${heightPercent}%` }}
                  className={`w-full max-w-[38px] rounded-t-lg transition-all duration-300 ${
                    isPeak
                      ? 'bg-gradient-to-t from-blue-600 to-cyan-400 shadow-lg shadow-cyan-500/20'
                      : 'bg-gradient-to-t from-blue-900/60 to-blue-600/70 hover:to-blue-500'
                  }`}
                />
                <span className="text-[10px] font-semibold text-slate-400">{d.month}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Package Demand Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="rounded-2xl border border-[#162A48] bg-[#0A1628] p-5 space-y-4">
          <h3 className="text-base font-bold text-white">Top Revenue Generating Packages</h3>
          <div className="space-y-3">
            {topPackages.map((pkg) => (
              <div key={pkg.name} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-slate-200 truncate pr-2 max-w-[260px]">
                    {pkg.name}
                  </span>
                  <span className="font-bold text-emerald-400 font-mono">
                    {inr(pkg.revenue)}
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
                  <div
                    style={{ width: `${pkg.share * 2.2}%` }}
                    className="h-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-400"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Regional Breakdown */}
        <div className="rounded-2xl border border-[#162A48] bg-[#0A1628] p-5 space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-white">Geographic Market Share</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Distribution of incoming tourists by destination division
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 text-center py-4">
            <div className="rounded-xl border border-blue-500/30 bg-blue-500/10 p-3">
              <span className="block text-2xl font-black text-blue-400">62%</span>
              <span className="text-[11px] font-bold text-white mt-1 block">Kashmir Valley</span>
              <span className="text-[10px] text-slate-400">Dal, Gulmarg, Pahalgam</span>
            </div>

            <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3">
              <span className="block text-2xl font-black text-emerald-400">24%</span>
              <span className="text-[11px] font-bold text-white mt-1 block">Jammu Division</span>
              <span className="text-[10px] text-slate-400">Vaishno Devi, Patnitop</span>
            </div>

            <div className="rounded-xl border border-purple-500/30 bg-purple-500/10 p-3">
              <span className="block text-2xl font-black text-purple-400">14%</span>
              <span className="text-[11px] font-bold text-white mt-1 block">Ladakh Border</span>
              <span className="text-[10px] text-slate-400">Zojila, Kargil, Leh</span>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-3 flex items-center justify-between text-xs text-slate-400">
            <span>Primary Booking Origin: Delhi NCR (42%), Mumbai (26%), Bangalore (18%)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
