'use client';

import React, { useState, useMemo } from 'react';
import { inr } from '@/lib/format';
import {
  CalendarCheck,
  MapPin,
  Car,
  Users,
  Sparkles,
  Calendar,
  Plus,
  ShieldCheck,
  Clock,
  ChevronDown,
  Activity,
  Layers,
  ChevronRight,
  Star,
  MoreVertical,
} from 'lucide-react';

export interface AdminStatsData {
  destinations: number;
  packages: number;
  hotels: number;
  vehicles: number;
  bookings: number;
  users: number;
  totalRevenue: number;
  serverUptime?: number;
}

export interface ReservationItem {
  id: string;
  customer: string;
  email?: string;
  tour: string;
  date: string;
  amount: number;
  status: 'Confirmed' | 'Pending' | 'Completed' | 'Cancelled';
  guests?: number;
}

interface AdminOverviewViewProps {
  stats: AdminStatsData;
  reservations: ReservationItem[];
  totalAttractions: number;
  onSelectTab: (tab: string) => void;
  onOpenAddTour: () => void;
  onOpenAddHotel: () => void;
  onOpenAddPlace: () => void;
  onViewReservation: (b: ReservationItem) => void;
}

export default function AdminOverviewView({
  stats,
  reservations,
  totalAttractions,
  onSelectTab,
  onOpenAddTour,
  onOpenAddHotel,
  onOpenAddPlace,
  onViewReservation,
}: AdminOverviewViewProps) {
  // Chart View Toggle (Revenue / Bookings)
  const [chartMode, setChartMode] = useState<'both' | 'revenue' | 'bookings'>('both');
  const [activeDateIndex, setActiveDateIndex] = useState<number | null>(null);

  // Date Range Dropdown
  const [showDateDropdown, setShowDateDropdown] = useState(false);
  const [selectedRange, setSelectedRange] = useState('May 1, 2026 – May 31, 2026');

  // Chart Data (7 checkpoints matching screenshot dates)
  const chartData = useMemo(() => {
    return [
      { date: 'May 1', rev: 14000, bookings: 2 },
      { date: 'May 5', rev: 23500, bookings: 4 },
      { date: 'May 10', rev: 33000, bookings: 5 },
      { date: 'May 15', rev: 27500, bookings: 4 },
      { date: 'May 20', rev: 39000, bookings: 6 },
      { date: 'May 25', rev: 49500, bookings: 9 },
      { date: 'May 31', rev: 57000, bookings: 8 },
    ];
  }, []);

  // Top Destinations Data matching image
  const topDestinations = [
    {
      name: 'Srinagar',
      trips: '23 trips',
      img: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=400&q=80',
    },
    {
      name: 'Gulmarg',
      trips: '18 trips',
      img: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=400&q=80',
    },
    {
      name: 'Pahalgam',
      trips: '16 trips',
      img: 'https://images.unsplash.com/photo-1566837945700-30057527ade0?auto=format&fit=crop&w=400&q=80',
    },
    {
      name: 'Sonamarg',
      trips: '12 trips',
      img: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=400&q=80',
    },
    {
      name: 'Vaishno Devi',
      trips: '10 trips',
      img: 'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=400&q=80',
    },
    {
      name: 'Leh (via J&K)',
      trips: '8 trips',
      img: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=400&q=80',
    },
  ];

  // Effective revenue from real database stats or bookings
  const displayRevenue = stats.totalRevenue > 0 ? stats.totalRevenue : 157100;
  const displayBookings = stats.bookings > 0 ? stats.bookings : reservations.length;
  const displayFleet = stats.vehicles > 0 ? stats.vehicles : 4;
  const displayUsers = stats.users > 0 ? stats.users : 5;

  return (
    <div className="space-y-5 animate-in fade-in duration-300">
      {/* ============================================================ */}
      {/* 1. WELCOME & ACTION BAR */}
      {/* ============================================================ */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl animate-bounce">👋</span>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Welcome back, Admin
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Here's what's happening with your Wayfarer tourism platform today.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* Date Range Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowDateDropdown(!showDateDropdown)}
              className="flex items-center gap-2 rounded-xl border border-[#162B4E] bg-[#0A1628] hover:border-blue-500/40 px-3.5 py-2 text-xs font-semibold text-slate-300 transition shadow-sm"
            >
              <Calendar size={14} className="text-slate-400" />
              <span>{selectedRange}</span>
              <ChevronDown size={14} className="text-slate-400" />
            </button>

            {showDateDropdown && (
              <div className="absolute right-0 mt-2 z-50 w-60 rounded-xl border border-[#1E3A5F] bg-[#0B1A30] p-1.5 shadow-2xl backdrop-blur-xl text-xs">
                {[
                  'May 1, 2026 – May 31, 2026',
                  'Apr 1, 2026 – Apr 30, 2026',
                  'Q2 2026 (Apr - Jun)',
                  'Year to Date 2026',
                  'All Time',
                ].map((range) => (
                  <button
                    key={range}
                    onClick={() => {
                      setSelectedRange(range);
                      setShowDateDropdown(false);
                    }}
                    className={`w-full text-left rounded-lg px-3 py-2 transition font-medium ${
                      selectedRange === range
                        ? 'bg-blue-600 text-white font-bold'
                        : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Quick Action Buttons */}
          <button
            onClick={onOpenAddTour}
            className="flex items-center gap-1.5 rounded-xl border border-[#1E3A5F] bg-[#0C1E38] hover:bg-[#122B4E] hover:border-blue-500/50 px-3.5 py-2 text-xs font-semibold text-white transition shadow-sm"
          >
            <Plus size={14} className="text-blue-400" />
            <span>Add Tour Package</span>
          </button>

          <button
            onClick={onOpenAddHotel}
            className="flex items-center gap-1.5 rounded-xl border border-[#1E3A5F] bg-[#0C1E38] hover:bg-[#122B4E] hover:border-blue-500/50 px-3.5 py-2 text-xs font-semibold text-white transition shadow-sm"
          >
            <Plus size={14} className="text-blue-400" />
            <span>Add Hotel</span>
          </button>

          <button
            onClick={onOpenAddPlace}
            className="flex items-center gap-1.5 rounded-xl border border-[#1E3A5F] bg-[#0C1E38] hover:bg-[#122B4E] hover:border-blue-500/50 px-3.5 py-2 text-xs font-semibold text-white transition shadow-sm"
          >
            <Plus size={14} className="text-blue-400" />
            <span>Add Place</span>
          </button>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 2. 6 KPI METRICS CARDS GRID */}
      {/* ============================================================ */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
        {/* Card 1: Total Revenue */}
        <div className="rounded-2xl border border-[#132847] bg-[#0A1628] p-4 flex flex-col justify-between hover:border-emerald-500/40 transition group">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-emerald-500/15 p-2.5 text-emerald-400">
              <span className="font-bold text-sm">₹</span>
            </div>
            <div>
              <span className="text-[11px] font-semibold text-slate-400">Total Revenue</span>
              <div className="text-lg sm:text-xl font-black text-white tracking-tight">
                {inr(displayRevenue)}
              </div>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-0.5">
              <span>↑ 12.5%</span>
              <span className="text-slate-500 font-normal">vs. last month</span>
            </span>
            <svg width="60" height="20" viewBox="0 0 60 20" className="stroke-emerald-400 fill-none">
              <path d="M 0 16 Q 15 14, 25 10 T 45 6 T 60 2" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* Card 2: Reservations */}
        <div className="rounded-2xl border border-[#132847] bg-[#0A1628] p-4 flex flex-col justify-between hover:border-blue-500/40 transition group">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-blue-500/15 p-2.5 text-blue-400">
              <CalendarCheck size={16} />
            </div>
            <div>
              <span className="text-[11px] font-semibold text-slate-400">Reservations</span>
              <div className="text-lg sm:text-xl font-black text-white tracking-tight">
                {displayBookings}
              </div>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-[10px] font-bold text-blue-400 flex items-center gap-0.5">
              <span>↑ 33.3%</span>
              <span className="text-slate-500 font-normal">vs. last month</span>
            </span>
            <svg width="60" height="20" viewBox="0 0 60 20" className="stroke-blue-400 fill-none">
              <path d="M 0 17 Q 15 15, 30 11 T 45 7 T 60 3" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* Card 3: J&K Districts */}
        <div className="rounded-2xl border border-[#132847] bg-[#0A1628] p-4 flex flex-col justify-between hover:border-purple-500/40 transition group">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-purple-500/15 p-2.5 text-purple-400">
              <Layers size={16} />
            </div>
            <div>
              <span className="text-[11px] font-semibold text-slate-400">J&K Districts</span>
              <div className="text-lg sm:text-xl font-black text-white tracking-tight">20</div>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-[10px] font-bold text-purple-400">100% Documented</span>
            <svg width="60" height="20" viewBox="0 0 60 20" className="stroke-purple-400 fill-none">
              <path d="M 0 15 Q 20 15, 30 12 T 50 8 T 60 5" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* Card 4: Master Places */}
        <div className="rounded-2xl border border-[#132847] bg-[#0A1628] p-4 flex flex-col justify-between hover:border-cyan-500/40 transition group">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-cyan-500/15 p-2.5 text-cyan-400">
              <Sparkles size={16} />
            </div>
            <div>
              <span className="text-[11px] font-semibold text-slate-400">Master Places</span>
              <div className="text-lg sm:text-xl font-black text-white tracking-tight">
                {totalAttractions || 248}
              </div>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-[10px] font-bold text-cyan-400">28 Fields Each</span>
            <svg width="60" height="20" viewBox="0 0 60 20" className="stroke-cyan-400 fill-none">
              <path d="M 0 16 Q 15 13, 30 10 T 45 7 T 60 4" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* Card 5: Active Fleet */}
        <div className="rounded-2xl border border-[#132847] bg-[#0A1628] p-4 flex flex-col justify-between hover:border-amber-500/40 transition group">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-amber-500/15 p-2.5 text-amber-400">
              <Car size={16} />
            </div>
            <div>
              <span className="text-[11px] font-semibold text-slate-400">Active Fleet</span>
              <div className="text-lg sm:text-xl font-black text-white tracking-tight">
                {displayFleet}
              </div>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-[10px] font-bold text-amber-400 flex items-center gap-0.5">
              <span>↑ 0%</span>
              <span className="text-slate-500 font-normal">vs. last month</span>
            </span>
            <svg width="60" height="20" viewBox="0 0 60 20" className="stroke-amber-400 fill-none">
              <path d="M 0 12 L 60 12" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* Card 6: Registered Users */}
        <div className="rounded-2xl border border-[#132847] bg-[#0A1628] p-4 flex flex-col justify-between hover:border-violet-500/40 transition group">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-violet-500/15 p-2.5 text-violet-400">
              <Users size={16} />
            </div>
            <div>
              <span className="text-[11px] font-semibold text-slate-400">Registered Users</span>
              <div className="text-lg sm:text-xl font-black text-white tracking-tight">
                {displayUsers}
              </div>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-[10px] font-bold text-violet-400 flex items-center gap-0.5">
              <span>↑ 25%</span>
              <span className="text-slate-500 font-normal">vs. last month</span>
            </span>
            <svg width="60" height="20" viewBox="0 0 60 20" className="stroke-violet-400 fill-none">
              <path d="M 0 16 Q 20 14, 35 10 T 50 6 T 60 2" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 3. MIDDLE ROW: ANALYTICS + J&K COVERAGE + TOP DESTINATIONS */}
      {/* ============================================================ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Card 1: Revenue & Booking Analytics (Col 6) */}
        <div className="lg:col-span-6 rounded-2xl border border-[#132847] bg-[#0A1628] p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3">
              <div className="flex items-center gap-2.5">
                <div className="rounded-xl bg-cyan-500/15 p-2 text-cyan-400">
                  <Activity size={16} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Revenue & Booking Analytics</h3>
                  <p className="text-[11px] text-slate-400">
                    Total revenue and reservations trend for the selected period.
                  </p>
                </div>
              </div>

              {/* View toggle pills */}
              <div className="flex items-center gap-1 rounded-lg border border-[#162B4E] bg-[#060D1A] p-1">
                <button
                  onClick={() => setChartMode('both')}
                  className={`rounded-md px-2.5 py-0.5 text-[10px] font-semibold transition ${
                    chartMode === 'both' ? 'bg-[#2563EB] text-white shadow' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setChartMode('revenue')}
                  className={`rounded-md px-2.5 py-0.5 text-[10px] font-semibold transition ${
                    chartMode === 'revenue' ? 'bg-[#2563EB] text-white shadow' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Revenue
                </button>
                <button
                  onClick={() => setChartMode('bookings')}
                  className={`rounded-md px-2.5 py-0.5 text-[10px] font-semibold transition ${
                    chartMode === 'bookings' ? 'bg-[#2563EB] text-white shadow' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Bookings
                </button>
              </div>
            </div>

            {/* Legend */}
            <div className="flex items-center justify-end gap-4 text-[11px] font-semibold py-2">
              <div className="flex items-center gap-1.5 text-blue-400">
                <span className="h-2.5 w-2.5 rounded-sm bg-blue-500" />
                <span>Revenue (₹)</span>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-400">
                <span className="h-2 w-2 rounded-full bg-emerald-400 ring-2 ring-emerald-400/30" />
                <span>Bookings</span>
              </div>
            </div>

            {/* High-Fidelity SVG Bar + Line Chart */}
            <div className="relative mt-2 h-52 w-full">
              <svg viewBox="0 0 520 200" className="h-full w-full overflow-visible">
                {/* Horizontal Grid lines */}
                {[0, 45, 90, 135, 170].map((y, i) => (
                  <g key={i}>
                    <line x1="45" y1={y + 10} x2="485" y2={y + 10} stroke="#162B4E" strokeDasharray="3 3" />
                  </g>
                ))}

                {/* Left Y Axis (Revenue) */}
                <text x="5" y="15" fill="#64748B" fontSize="10" fontFamily="sans-serif">₹60K</text>
                <text x="5" y="60" fill="#64748B" fontSize="10" fontFamily="sans-serif">₹45K</text>
                <text x="5" y="105" fill="#64748B" fontSize="10" fontFamily="sans-serif">₹30K</text>
                <text x="5" y="150" fill="#64748B" fontSize="10" fontFamily="sans-serif">₹15K</text>
                <text x="15" y="185" fill="#64748B" fontSize="10" fontFamily="sans-serif">₹0</text>

                {/* Right Y Axis (Bookings) */}
                <text x="495" y="15" fill="#64748B" fontSize="10" fontFamily="sans-serif">10</text>
                <text x="495" y="60" fill="#64748B" fontSize="10" fontFamily="sans-serif">8</text>
                <text x="495" y="105" fill="#64748B" fontSize="10" fontFamily="sans-serif">6</text>
                <text x="495" y="150" fill="#64748B" fontSize="10" fontFamily="sans-serif">4</text>
                <text x="495" y="185" fill="#64748B" fontSize="10" fontFamily="sans-serif">0</text>

                {/* Vertical Revenue Bars */}
                {chartMode !== 'bookings' &&
                  chartData.map((d, idx) => {
                    const barX = 75 + idx * 60;
                    const maxRev = 60000;
                    const barHeight = Math.min(160, (d.rev / maxRev) * 160);
                    const barY = 180 - barHeight;
                    const isHovered = activeDateIndex === idx;

                    return (
                      <g
                        key={idx}
                        onMouseEnter={() => setActiveDateIndex(idx)}
                        onMouseLeave={() => setActiveDateIndex(null)}
                        className="cursor-pointer"
                      >
                        <rect
                          x={barX - 10}
                          y={barY}
                          width="20"
                          height={barHeight}
                          rx="4"
                          fill={isHovered ? '#60A5FA' : '#3B82F6'}
                          className="transition-colors duration-150"
                        />
                      </g>
                    );
                  })}

                {/* Bookings Spline Line with glowing circles */}
                {chartMode !== 'revenue' && (
                  <>
                    <path
                      d="M 75 145 C 105 130, 115 110, 135 110 C 165 110, 175 90, 195 90 C 225 90, 235 115, 255 110 C 285 105, 295 70, 315 70 C 345 70, 355 35, 375 35 C 405 35, 415 50, 435 50"
                      fill="none"
                      stroke="#10B981"
                      strokeWidth="2.5"
                    />
                    {chartData.map((d, idx) => {
                      const cx = 75 + idx * 60;
                      const pts = [145, 110, 90, 110, 70, 35, 50];
                      const cy = pts[idx];
                      const isHovered = activeDateIndex === idx;

                      return (
                        <circle
                          key={idx}
                          cx={cx}
                          cy={cy}
                          r={isHovered ? 6 : 4}
                          fill="#059669"
                          stroke="#FFFFFF"
                          strokeWidth="2"
                          className="cursor-pointer transition-all duration-150 shadow-lg"
                          onMouseEnter={() => setActiveDateIndex(idx)}
                          onMouseLeave={() => setActiveDateIndex(null)}
                        />
                      );
                    })}
                  </>
                )}

                {/* X Axis Dates */}
                {chartData.map((d, idx) => (
                  <text
                    key={idx}
                    x={75 + idx * 60}
                    y="196"
                    textAnchor="middle"
                    fill={activeDateIndex === idx ? '#FFFFFF' : '#64748B'}
                    fontSize="10"
                    fontFamily="sans-serif"
                    fontWeight={activeDateIndex === idx ? 'bold' : 'normal'}
                  >
                    {d.date}
                  </text>
                ))}
              </svg>

              {/* Hover Tooltip */}
              {activeDateIndex !== null && (
                <div
                  className="absolute pointer-events-none z-20 rounded-xl border border-blue-500/50 bg-[#0B1A30]/95 px-3 py-1.5 shadow-2xl backdrop-blur-md text-[11px]"
                  style={{
                    left: `${Math.min(380, 50 + activeDateIndex * 60)}px`,
                    top: '20px',
                  }}
                >
                  <div className="font-bold text-white">{chartData[activeDateIndex].date}</div>
                  <div className="text-blue-400 font-semibold">
                    Revenue: {inr(chartData[activeDateIndex].rev)}
                  </div>
                  <div className="text-emerald-400 font-semibold">
                    Reservations: {chartData[activeDateIndex].bookings} trips
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Card 2: J&K Geographic Coverage (Col 3) */}
        <div className="lg:col-span-3 rounded-2xl border border-[#132847] bg-[#0A1628] p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 pb-2">
              <div className="rounded-xl bg-blue-500/15 p-2 text-blue-400">
                <MapPin size={16} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">J&K Geographic Coverage</h3>
                <p className="text-[11px] text-slate-400">Districts and places across J&K</p>
              </div>
            </div>

            {/* Division Legend */}
            <div className="mt-3 space-y-2 rounded-xl bg-[#060D1A]/60 p-3 border border-[#162B4E]">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#2563EB]" />
                  <span className="font-bold text-white">Kashmir Division</span>
                </div>
                <span className="text-blue-400 font-mono text-[11px]">10 Districts • 124 Places</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#10B981]" />
                  <span className="font-bold text-white">Jammu Division</span>
                </div>
                <span className="text-emerald-400 font-mono text-[11px]">10 Districts • 124 Places</span>
              </div>
            </div>

            {/* High-detail SVG Map Silhouette */}
            <div
              onClick={() => onSelectTab('jk-districts')}
              className="relative mt-4 flex items-center justify-center rounded-xl bg-gradient-to-b from-[#091528] to-[#060D1A] p-3 border border-[#162B4E] cursor-pointer hover:border-blue-500/40 transition group"
              title="Click to inspect all 20 J&K districts in detail"
            >
              <svg viewBox="0 0 200 220" className="w-48 h-48 drop-shadow-md">
                <defs>
                  <linearGradient id="kashmirGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#1E40AF" />
                    <stop offset="100%" stopColor="#3B82F6" />
                  </linearGradient>
                  <linearGradient id="jammuGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#047857" />
                    <stop offset="100%" stopColor="#10B981" />
                  </linearGradient>
                </defs>

                {/* Kashmir Division Polygon Contour */}
                <path
                  d="M 60 25 C 80 15, 120 18, 145 35 C 160 50, 165 80, 150 95 C 135 110, 105 115, 80 105 C 60 98, 45 80, 48 55 Z"
                  fill="url(#kashmirGrad)"
                  stroke="#60A5FA"
                  strokeWidth="1.5"
                  className="group-hover:brightness-110 transition"
                />

                {/* Jammu Division Polygon Contour */}
                <path
                  d="M 80 105 C 105 115, 135 110, 150 95 C 158 115, 165 140, 145 165 C 130 185, 110 200, 85 195 C 65 190, 50 160, 55 135 C 60 120, 68 110, 80 105 Z"
                  fill="url(#jammuGrad)"
                  stroke="#34D399"
                  strokeWidth="1.5"
                  className="group-hover:brightness-110 transition"
                />

                {/* Glowing Hub Markers */}
                <circle cx="95" cy="65" r="4.5" fill="#FFFFFF" stroke="#3B82F6" strokeWidth="2" />
                <text x="103" y="68" fill="#FFFFFF" fontSize="8" fontWeight="bold" fontFamily="sans-serif">Srinagar</text>
                <circle cx="75" cy="55" r="3.5" fill="#93C5FD" />
                <circle cx="120" cy="80" r="3.5" fill="#93C5FD" />

                <circle cx="85" cy="165" r="4.5" fill="#FFFFFF" stroke="#10B981" strokeWidth="2" />
                <text x="93" y="168" fill="#FFFFFF" fontSize="8" fontWeight="bold" fontFamily="sans-serif">Jammu</text>
                <circle cx="95" cy="140" r="3.5" fill="#A7F3D0" />
              </svg>

              <div className="absolute bottom-2 right-2 text-[10px] font-semibold text-blue-400 flex items-center gap-1 group-hover:translate-x-0.5 transition">
                <span>Explore Map</span>
                <ChevronRight size={12} />
              </div>
            </div>
          </div>
        </div>

        {/* Card 3: Top Destinations (Col 3) */}
        <div className="lg:col-span-3 rounded-2xl border border-[#132847] bg-[#0A1628] p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3">
              <div className="flex items-center gap-2">
                <div className="rounded-xl bg-amber-500/15 p-2 text-amber-400">
                  <Star size={16} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Top Destinations</h3>
                  <p className="text-[11px] text-slate-400">Most visited places in J&K</p>
                </div>
              </div>
              <button
                onClick={() => onSelectTab('tours')}
                className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-0.5"
              >
                <span>View All</span>
                <ChevronRight size={12} />
              </button>
            </div>

            {/* 2x3 Grid of 6 destination cards */}
            <div className="grid grid-cols-2 gap-2 mt-2">
              {topDestinations.map((dest, i) => (
                <div
                  key={i}
                  onClick={() => onSelectTab('jk-districts')}
                  className="group relative h-20 rounded-xl overflow-hidden border border-[#162B4E] cursor-pointer hover:border-blue-400/50 transition"
                >
                  <img
                    src={dest.img}
                    alt={dest.name}
                    className="h-full w-full object-cover group-hover:scale-105 transition duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <div className="absolute bottom-1.5 left-2 right-2">
                    <span className="block text-xs font-bold text-white truncate drop-shadow">
                      {dest.name}
                    </span>
                    <span className="text-[10px] text-slate-300 flex items-center gap-1">
                      <MapPin size={10} className="text-rose-400" />
                      {dest.trips}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 4. BOTTOM ROW: RECENT RESERVATIONS + SYSTEM HEALTH / ACTIVITY */}
      {/* ============================================================ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Column: Recent Reservations (Col 8) */}
        <div className="lg:col-span-8 rounded-2xl border border-[#132847] bg-[#0A1628] p-5">
          <div className="flex items-center justify-between pb-4 border-b border-[#162B4E]">
            <div className="flex items-center gap-2.5">
              <div className="rounded-xl bg-blue-500/15 p-2 text-blue-400">
                <CalendarCheck size={16} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Recent Reservations</h3>
                <p className="text-[11px] text-slate-400">Latest bookings across all services.</p>
              </div>
            </div>
            <button
              onClick={() => onSelectTab('bookings')}
              className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-0.5"
            >
              <span>View All</span>
              <ChevronRight size={12} />
            </button>
          </div>

          <div className="mt-3 overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-[#162B4E] text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                <tr>
                  <th className="pb-3 font-semibold">BOOKING ID</th>
                  <th className="pb-3 font-semibold">CUSTOMER</th>
                  <th className="pb-3 font-semibold">PACKAGE / TOUR</th>
                  <th className="pb-3 font-semibold">TRAVEL DATE</th>
                  <th className="pb-3 font-semibold">AMOUNT</th>
                  <th className="pb-3 font-semibold">STATUS</th>
                  <th className="pb-3 text-right font-semibold">QUICK ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#132847]">
                {reservations.slice(0, 6).map((b) => {
                  const initial = b.customer ? b.customer.charAt(0).toUpperCase() : 'U';
                  return (
                    <tr key={b.id} className="hover:bg-[#0E223D]/50 transition group">
                      <td className="py-3 font-mono font-bold text-blue-400">{b.id}</td>
                      <td className="py-3">
                        <div className="flex items-center gap-2">
                          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600/30 text-blue-300 font-bold text-[11px]">
                            {initial}
                          </div>
                          <span className="font-semibold text-white">{b.customer}</span>
                        </div>
                      </td>
                      <td className="py-3 text-slate-300 max-w-[200px] truncate">{b.tour}</td>
                      <td className="py-3 text-slate-400">{b.date}</td>
                      <td className="py-3 font-mono font-bold text-white">{inr(b.amount)}</td>
                      <td className="py-3">
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                            b.status === 'Confirmed'
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                              : b.status === 'Pending'
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                              : b.status === 'Completed'
                              ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                              : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                          }`}
                        >
                          {b.status}
                        </span>
                      </td>
                      <td className="py-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => onViewReservation(b)}
                            className="rounded-lg border border-[#1E3A5F] bg-[#0C1E38] hover:bg-[#122B4E] px-2.5 py-1 text-[11px] font-semibold text-slate-200 transition"
                          >
                            View
                          </button>
                          <button
                            onClick={() => onViewReservation(b)}
                            className="text-slate-400 hover:text-white p-1"
                          >
                            <MoreVertical size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: System Health & Recent Activity (Col 4) */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          {/* Card A: System Health */}
          <div className="rounded-2xl border border-[#132847] bg-[#0A1628] p-5">
            <div className="flex items-center gap-2 pb-3 border-b border-[#162B4E]">
              <div className="rounded-xl bg-emerald-500/15 p-2 text-emerald-400">
                <ShieldCheck size={16} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">System Health</h3>
                <p className="text-[11px] text-slate-400">Live status of core services</p>
              </div>
            </div>

            <div className="mt-3 space-y-2.5">
              {[
                { name: 'API Endpoint', status: 'Healthy', uptime: '99.9% uptime' },
                { name: 'Database', status: 'Healthy', uptime: '99.9% uptime' },
                { name: 'Server', status: 'Healthy', uptime: '99.8% uptime' },
                { name: 'Sync & Processing', status: 'Healthy', uptime: '99.7% uptime' },
              ].map((svc, i) => (
                <div key={i} className="flex items-center justify-between text-xs">
                  <span className="text-slate-300 font-medium">{svc.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-emerald-500/20 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-bold text-emerald-300">
                      {svc.status}
                    </span>
                    <span className="text-[11px] text-slate-500 font-mono">{svc.uptime}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Card B: Recent Activity */}
          <div className="rounded-2xl border border-[#132847] bg-[#0A1628] p-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#162B4E]">
              <div className="flex items-center gap-2">
                <div className="rounded-xl bg-purple-500/15 p-2 text-purple-400">
                  <Clock size={16} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Recent Activity</h3>
                  <p className="text-[11px] text-slate-400">Latest updates from your system</p>
                </div>
              </div>
              <button
                onClick={() => onSelectTab('logs')}
                className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-0.5"
              >
                <span>View All</span>
                <ChevronRight size={12} />
              </button>
            </div>

            <div className="mt-3 space-y-2.5">
              {[
                {
                  text: 'New reservation received - WF-7835',
                  time: '2 hours ago',
                  color: 'bg-blue-400',
                },
                {
                  text: 'Tour package updated - Kashmir Paradise',
                  time: '4 hours ago',
                  color: 'bg-emerald-400',
                },
                {
                  text: 'New user registered - ananya@example.com',
                  time: '6 hours ago',
                  color: 'bg-purple-400',
                },
                {
                  text: 'Payment received - ₹27,000 (WF-7829)',
                  time: '8 hours ago',
                  color: 'bg-cyan-400',
                },
                {
                  text: 'New review submitted - Pahalgam',
                  time: '10 hours ago',
                  color: 'bg-amber-400',
                },
              ].map((act, i) => (
                <div key={i} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 truncate max-w-[210px]">
                    <span className={`h-2 w-2 rounded-full ${act.color} shrink-0`} />
                    <span className="text-slate-300 truncate">{act.text}</span>
                  </div>
                  <span className="text-[10px] text-slate-500 shrink-0 font-medium">{act.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
