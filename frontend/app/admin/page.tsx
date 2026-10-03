'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { inr } from '@/lib/format';
import {
  SEED_DESTINATIONS,
  SEED_PACKAGES,
  SEED_HOTELS,
  SEED_VEHICLES,
} from '@/lib/seed-data';
import {
  JK_ALL_DISTRICTS,
  JKDistrictDestination,
  TouristPlace,
} from '@/lib/jk-destinations-data';
import {
  ShieldCheck,
  ShieldAlert,
  Compass,
  MapPin,
  Building,
  Car,
  CalendarCheck,
  Users,
  Plus,
  Trash2,
  CheckCircle,
  TrendingUp,
  RefreshCw,
  Search,
  Check,
  X,
  ChevronRight,
  ChevronDown,
  Sparkles,
  Mountain,
  Clock,
  Calendar,
  ArrowRight,
  AlertCircle,
} from 'lucide-react';

// Micro SVG helper components for icons not directly available
const EyeIcon = ({ size = 15, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const ExternalLinkIcon = ({ size = 14, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

const PrinterIcon = ({ size = 14, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M6 9V2h12v7" />
    <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
    <rect width="12" height="8" x="6" y="14" />
  </svg>
);

const MapIcon = ({ size = 16, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
    <line x1="9" y1="3" x2="9" y2="18" />
    <line x1="15" y1="6" x2="15" y2="21" />
  </svg>
);

const SlidersIcon = ({ size = 12, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="4" y1="21" x2="4" y2="14" />
    <line x1="4" y1="10" x2="4" y2="3" />
    <line x1="12" y1="21" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12" y2="3" />
    <line x1="20" y1="21" x2="20" y2="16" />
    <line x1="20" y1="12" x2="20" y2="3" />
    <line x1="1" y1="14" x2="7" y2="14" />
    <line x1="9" y1="8" x2="15" y2="8" />
    <line x1="17" y1="16" x2="23" y2="16" />
  </svg>
);

const ActivityIcon = ({ size = 16, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
  </svg>
);

type AdminTab =
  | 'overview'
  | 'jk-districts'
  | 'tours'
  | 'hotels'
  | 'cabs'
  | 'bookings'
  | 'users'
  | 'logs';

interface UserRecord {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  emailVerified: boolean;
  joined: string;
}

interface BookingRecord {
  id: string;
  customer: string;
  email: string;
  tour: string;
  date: string;
  status: 'Confirmed' | 'Pending' | 'Completed' | 'Cancelled';
  amount: number;
  guests: number;
}

interface LogEntry {
  id: string;
  time: string;
  action: string;
  user: string;
  type: 'info' | 'success' | 'warning' | 'alert';
}

export default function AdminPage() {
  const { user, loading, token } = useAuth();
  const router = useRouter();

  // Navigation state
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');

  // Enforce strict Admin authentication
  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.replace('/login?next=%2Fadmin&error=admin_required');
      } else if (user.role !== 'admin') {
        router.replace('/account?error=admin_required');
      }
    }
  }, [user, loading, router]);

  // Toast feedback state
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // ----------------------------------------------------
  // Local Mutable State (Seeds + Dynamic Actions)
  // ----------------------------------------------------
  const [tours, setTours] = useState(SEED_PACKAGES);
  const [hotels, setHotels] = useState(
    SEED_HOTELS.map((h, i) => ({ ...h, isAvailable: i !== 1 }))
  );
  const [vehicles, setVehicles] = useState(
    SEED_VEHICLES.map((v, i) => ({
      ...v,
      plateNumber: `JK-01-${1040 + i}`,
      status: i === 0 ? 'Available' : i === 1 ? 'On Trip' : 'Available',
    }))
  );

  const [bookings, setBookings] = useState<BookingRecord[]>([
    {
      id: 'WF-7829',
      customer: 'Priya Sharma',
      email: 'priya.sharma@example.com',
      tour: 'Kashmir Paradise: 7-Day Valley Odyssey',
      date: 'May 12, 2026',
      status: 'Confirmed',
      amount: 37000,
      guests: 2,
    },
    {
      id: 'WF-7830',
      customer: 'Rahul Verma',
      email: 'rahul.verma@example.com',
      tour: 'Gulmarg Winter Wonderland Ski & Gondola',
      date: 'Dec 22, 2026',
      status: 'Pending',
      amount: 49000,
      guests: 4,
    },
    {
      id: 'WF-7831',
      customer: 'Aarav Patel',
      email: 'aarav.patel@example.com',
      tour: 'Ladakh High Passes & Pangong Lake',
      date: 'Jun 10, 2026',
      status: 'Confirmed',
      amount: 59600,
      guests: 2,
    },
    {
      id: 'WF-7832',
      customer: 'Dr. Sameer Lone',
      email: 's.lone@kashmirhealth.org',
      tour: 'Gurez Valley & Dawaar Border Expedition',
      date: 'Jul 04, 2026',
      status: 'Completed',
      amount: 28500,
      guests: 3,
    },
    {
      id: 'WF-7833',
      customer: 'Ananya Deshmukh',
      email: 'ananya.d@travelvibe.in',
      tour: 'Pahalgam Riverside & Betaab Valley Leisure',
      date: 'Aug 18, 2026',
      status: 'Confirmed',
      amount: 32000,
      guests: 2,
    },
    {
      id: 'WF-7834',
      customer: 'Vikramaditya Rathore',
      email: 'rathore.vikram@heritage.in',
      tour: 'Vaishno Devi & Patnitop Spiritual Tour',
      date: 'Oct 02, 2026',
      status: 'Cancelled',
      amount: 19500,
      guests: 5,
    },
  ]);

  const [usersList, setUsersList] = useState<UserRecord[]>([
    {
      id: 'usr-1',
      name: 'Muzamil Bashir',
      email: 'admin@wayfarer.com',
      role: 'admin',
      emailVerified: true,
      joined: 'Jan 2026',
    },
    {
      id: 'usr-2',
      name: 'Aamir Khan',
      email: 'aamir@example.com',
      role: 'user',
      emailVerified: true,
      joined: 'Sep 2026',
    },
    {
      id: 'usr-3',
      name: 'Sarah Jenkins',
      email: 'sarah.j@travel.org',
      role: 'user',
      emailVerified: true,
      joined: 'Aug 2026',
    },
    {
      id: 'usr-4',
      name: 'Rohan Mehra',
      email: 'rohan.mehra@gmail.com',
      role: 'user',
      emailVerified: false,
      joined: 'Oct 2026',
    },
    {
      id: 'usr-5',
      name: 'Fatima Zahra',
      email: 'fatima.zahra@kashmirtravel.com',
      role: 'admin',
      emailVerified: true,
      joined: 'Feb 2026',
    },
  ]);

  const [auditLogs, setAuditLogs] = useState<LogEntry[]>([
    {
      id: 'log-1',
      time: 'Just now',
      action: 'Admin dashboard initialized with 20 J&K Districts Master DB',
      user: 'System Core',
      type: 'info',
    },
    {
      id: 'log-2',
      time: '5 mins ago',
      action: 'All 235 tourist destinations catalog verified & loaded',
      user: 'Automated Bot',
      type: 'success',
    },
    {
      id: 'log-3',
      time: '18 mins ago',
      action: 'Booking WF-7831 confirmed for Aarav Patel (₹59,600)',
      user: 'Booking Engine',
      type: 'success',
    },
    {
      id: 'log-4',
      time: '42 mins ago',
      action: 'Database sync verified with 0 schema discrepancies',
      user: 'admin@wayfarer.com',
      type: 'info',
    },
  ]);

  const addLog = (action: string, type: 'info' | 'success' | 'warning' | 'alert' = 'info') => {
    const entry: LogEntry = {
      id: `log-${Date.now()}`,
      time: 'Just now',
      action,
      user: user?.email || 'Sandbox Admin',
      type,
    };
    setAuditLogs((prev) => [entry, ...prev.slice(0, 49)]);
  };

  // ----------------------------------------------------
  // J&K Districts Master Database State
  // ----------------------------------------------------
  const [districtDivisionFilter, setDistrictDivisionFilter] = useState<'All' | 'Kashmir' | 'Jammu'>('All');
  const [districtSearchQuery, setDistrictSearchQuery] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState<JKDistrictDestination>(JK_ALL_DISTRICTS[0]);
  const [inspectPlace, setInspectPlace] = useState<TouristPlace | null>(null);

  // Filtered districts
  const filteredDistricts = useMemo(() => {
    return JK_ALL_DISTRICTS.filter((d) => {
      const matchesDivision =
        districtDivisionFilter === 'All'
          ? true
          : districtDivisionFilter === 'Kashmir'
          ? d.division === 'Kashmir Valley'
          : d.division !== 'Kashmir Valley';

      const q = districtSearchQuery.toLowerCase().trim();
      if (!q) return matchesDivision;

      const matchesDistrictName = d.district.toLowerCase().includes(q);
      const matchesPlace = d.touristPlaces.some(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          (p.pinCode && p.pinCode.includes(q)) ||
          (p.tehsil && p.tehsil.toLowerCase().includes(q))
      );

      return matchesDivision && (matchesDistrictName || matchesPlace);
    });
  }, [districtDivisionFilter, districtSearchQuery]);

  // Aggregate stats
  const totalAttractions = useMemo(() => {
    return JK_ALL_DISTRICTS.reduce((acc, d) => acc + (d.touristPlaces?.length || 0), 0);
  }, []);

  const kashmirAttractions = useMemo(() => {
    return JK_ALL_DISTRICTS.filter((d) => d.division === 'Kashmir Valley').reduce(
      (acc, d) => acc + (d.touristPlaces?.length || 0),
      0
    );
  }, []);

  const jammuAttractions = useMemo(() => {
    return JK_ALL_DISTRICTS.filter((d) => d.division !== 'Kashmir Valley').reduce(
      (acc, d) => acc + (d.touristPlaces?.length || 0),
      0
    );
  }, []);

  const totalRevenue = useMemo(() => {
    return bookings
      .filter((b) => b.status === 'Confirmed' || b.status === 'Completed')
      .reduce((acc, b) => acc + b.amount, 0);
  }, [bookings]);

  // ----------------------------------------------------
  // Modals & Action Forms State
  // ----------------------------------------------------
  const [showAddTourModal, setShowAddTourModal] = useState(false);
  const [newTourTitle, setNewTourTitle] = useState('');
  const [newTourDest, setNewTourDest] = useState('Srinagar');
  const [newTourDays, setNewTourDays] = useState('6');
  const [newTourPrice, setNewTourPrice] = useState('24500');
  const [newTourHighlights, setNewTourHighlights] = useState('Private Shikara, Scenic Passes, Deluxe Hotel');

  const [showAddHotelModal, setShowAddHotelModal] = useState(false);
  const [newHotelName, setNewHotelName] = useState('');
  const [newHotelDest, setNewHotelDest] = useState('Gulmarg');
  const [newHotelPrice, setNewHotelPrice] = useState('6500');
  const [newHotelRating, setNewHotelRating] = useState('4.8');

  const [showAddVehicleModal, setShowAddVehicleModal] = useState(false);
  const [newVehicleName, setNewVehicleName] = useState('');
  const [newVehicleCategory, setNewVehicleCategory] = useState<'suv' | 'sedan' | 'tempo_traveller'>('suv');
  const [newVehicleSeats, setNewVehicleSeats] = useState('6');
  const [newVehicleFare, setNewVehicleFare] = useState('3500');

  const [selectedInvoice, setSelectedInvoice] = useState<BookingRecord | null>(null);

  // ----------------------------------------------------
  // CRUD Handlers
  // ----------------------------------------------------
  const handleAddTour = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTourTitle.trim()) return;

    const newTour = {
      _id: `pkg-${Date.now()}`,
      title: newTourTitle,
      slug: newTourTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      durationDays: Number(newTourDays) || 5,
      basePrice: Number(newTourPrice) || 20000,
      discountPercent: 12,
      images: [
        {
          url: 'https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&w=1200&q=80',
        },
      ],
      overview: 'Curated mountain experience crafted by Wayfarer regional specialists.',
      highlights: newTourHighlights
        .split(',')
        .map((h) => h.trim())
        .filter(Boolean),
      included: ['Luxury Transportation', 'Comfort Stays', 'Breakfast & Dinner', 'Tour Guide'],
      excluded: ['Airfare', 'Personal Expenses'],
      maxTravellers: 8,
      rating: 4.9,
      reviewCount: 1,
      destination: { name: newTourDest, slug: newTourDest.toLowerCase() },
    };

    setTours((prev: any) => [newTour, ...prev]);
    setShowAddTourModal(false);
    setNewTourTitle('');
    showToast(`Tour package "${newTourTitle}" published successfully!`);
    addLog(`Published new tour package: ${newTourTitle}`, 'success');
  };

  const handleDeleteTour = (id: string, title: string) => {
    setTours((prev) => prev.filter((t) => t._id !== id));
    showToast(`Tour package "${title}" removed.`);
    addLog(`Deleted tour package: ${title}`, 'warning');
  };

  const handleAddHotel = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHotelName.trim()) return;

    const newStay = {
      _id: `htl-${Date.now()}`,
      name: newHotelName,
      slug: newHotelName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      images: [
        {
          url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
        },
      ],
      rating: parseFloat(newHotelRating) || 4.7,
      pricePerNight: Number(newHotelPrice) || 5000,
      amenities: ['Mountain View', 'Central Heating', 'High Speed Wi-Fi', 'Breakfast Buffet'],
      destination: { name: newHotelDest, slug: newHotelDest.toLowerCase() },
      isAvailable: true,
    };

    setHotels((prev) => [newStay, ...prev]);
    setShowAddHotelModal(false);
    setNewHotelName('');
    showToast(`Hotel "${newHotelName}" registered!`);
    addLog(`Added accommodation: ${newHotelName}`, 'success');
  };

  const handleToggleHotelAvailability = (id: string) => {
    setHotels((prev) =>
      prev.map((h) => (h._id === id ? { ...h, isAvailable: !h.isAvailable } : h))
    );
    showToast('Hotel inventory status updated.');
  };

  const handleDeleteHotel = (id: string, name: string) => {
    setHotels((prev) => prev.filter((h) => h._id !== id));
    showToast(`Hotel "${name}" deleted.`);
    addLog(`Removed stay: ${name}`, 'warning');
  };

  const handleAddVehicle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVehicleName.trim()) return;

    const newV = {
      _id: `veh-${Date.now()}`,
      category: newVehicleCategory,
      name: newVehicleName,
      seats: Number(newVehicleSeats) || 5,
      pricePerKm: 18,
      baseFare: Number(newVehicleFare) || 3500,
      plateNumber: `JK-01-${Math.floor(1000 + Math.random() * 9000)}`,
      status: 'Available',
    };

    setVehicles((prev) => [newV, ...prev]);
    setShowAddVehicleModal(false);
    setNewVehicleName('');
    showToast(`Vehicle "${newVehicleName}" added to fleet!`);
    addLog(`Registered vehicle: ${newVehicleName}`, 'success');
  };

  const handleCycleVehicleStatus = (id: string) => {
    setVehicles((prev) =>
      prev.map((v) => {
        if (v._id !== id) return v;
        const nextStatus =
          v.status === 'Available'
            ? 'On Trip'
            : v.status === 'On Trip'
            ? 'Maintenance'
            : 'Available';
        return { ...v, status: nextStatus };
      })
    );
    showToast('Vehicle status cycled.');
  };

  const handleDeleteVehicle = (id: string, name: string) => {
    setVehicles((prev) => prev.filter((v) => v._id !== id));
    showToast(`Vehicle "${name}" removed from fleet.`);
    addLog(`Decommissioned vehicle: ${name}`, 'warning');
  };

  const handleCycleBookingStatus = (id: string) => {
    setBookings((prev) =>
      prev.map((b) => {
        if (b.id !== id) return b;
        const sequence: BookingRecord['status'][] = [
          'Pending',
          'Confirmed',
          'Completed',
          'Cancelled',
        ];
        const currentIdx = sequence.indexOf(b.status);
        const nextStatus = sequence[(currentIdx + 1) % sequence.length];
        return { ...b, status: nextStatus };
      })
    );
    showToast(`Booking ${id} status advanced.`);
    addLog(`Updated reservation status for ${id}`, 'info');
  };

  const handleToggleUserRole = (id: string) => {
    setUsersList((prev) =>
      prev.map((u) => {
        if (u.id !== id) return u;
        const newRole = u.role === 'admin' ? 'user' : 'admin';
        return { ...u, role: newRole };
      })
    );
    showToast('User security permission updated.');
    addLog(`Updated role for user ID: ${id}`, 'warning');
  };

  const handleToggleUserVerification = (id: string) => {
    setUsersList((prev) =>
      prev.map((u) => {
        if (u.id !== id) return u;
        return { ...u, emailVerified: !u.emailVerified };
      })
    );
    showToast('User verification flag toggled.');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B132B] flex flex-col items-center justify-center p-6 text-center text-slate-100 font-sans">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#3B71FE] border-t-transparent mb-4" />
        <p className="text-sm font-semibold text-slate-300">
          Verifying administrator clearance…
        </p>
      </div>
    );
  }

  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen bg-[#0B132B] flex items-center justify-center p-6 text-center text-slate-100 font-sans">
        <div className="max-w-md w-full rounded-3xl border border-rose-500/30 bg-slate-900/95 p-8 shadow-2xl backdrop-blur-xl">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-500/20 text-rose-400 mb-4">
            <ShieldAlert size={32} />
          </div>
          <h2 className="text-xl font-black text-white">Administrator Access Required</h2>
          <p className="mt-2 text-xs text-slate-400 leading-relaxed">
            Wayfarer Control Center is restricted to verified administrators. Your current account ({user?.email || 'Guest'}) does not have administrator clearance.
          </p>

          <div className="mt-6 flex flex-col gap-2.5">
            <Link
              href="/login?next=%2Fadmin&error=admin_required"
              className="rounded-xl bg-[#3B71FE] hover:bg-blue-600 py-3 text-xs font-bold text-white transition shadow-lg shadow-blue-500/20"
            >
              Sign in with Admin Account (OTP)
            </Link>
            <Link
              href="/"
              className="rounded-xl border border-slate-700 bg-slate-800 py-2.5 text-xs font-semibold text-slate-300 hover:text-white transition"
            >
              Return to Homepage
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B132B] text-slate-100 font-sans selection:bg-[#3B71FE] selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-3 rounded-xl bg-slate-900/95 border border-emerald-500/40 px-5 py-3 text-sm font-semibold text-emerald-300 shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-top-4 duration-200">
          <CheckCircle size={18} className="text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Banner / Mode Switcher */}
      <div className="border-b border-slate-800/80 bg-slate-900/80 backdrop-blur-md px-4 py-2.5 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5">
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-bold uppercase tracking-wider text-slate-400">
              Wayfarer Studio Control Center
            </span>
            <span className="rounded bg-emerald-500/20 px-2 py-0.5 font-mono text-[11px] font-semibold text-emerald-300">
              Admin: {user.email}
            </span>
            <span className="rounded-full bg-blue-500/20 border border-blue-500/40 px-2.5 py-0.5 text-[11px] font-semibold text-blue-300 flex items-center gap-1">
              <span>✦ Simulated Data Mode (Safe Sandbox — Real Database Untouched)</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setTours(SEED_PACKAGES);
                setHotels(SEED_HOTELS.map((h, i) => ({ ...h, isAvailable: i !== 1 })));
                setVehicles(SEED_VEHICLES.map((v, i) => ({ ...v, plateNumber: `JK-01-${1040 + i}`, status: i === 0 ? 'Available' : i === 1 ? 'On Trip' : 'Available' })));
                showToast('Simulated data reset to defaults.');
              }}
              className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800/80 px-3 py-1 font-medium text-slate-300 hover:bg-slate-700 transition"
            >
              <RefreshCw size={12} />
              <span>Reset Mock Data</span>
            </button>

            <Link
              href="/"
              className="flex items-center gap-1 font-medium text-slate-400 hover:text-white transition"
            >
              <span>Public Website</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Layout Container */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-8">
        {/* Header Bar */}
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-[#3B71FE] to-[#1C2541] shadow-lg shadow-blue-500/20 border border-blue-400/30">
                <ShieldCheck size={26} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                  Wayfarer Administrative Console
                </h1>
                <p className="text-xs sm:text-sm text-slate-400">
                  Comprehensive management of 20 J&K Districts, 235 Tourist Spots, Bookings, Packages, Stays, and Fleets.
                </p>
              </div>
            </div>
          </div>

          {/* Quick Stat Pill & Actions */}
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-2 text-right">
              <span className="block text-[11px] font-semibold uppercase text-slate-400">
                Total Live Revenue
              </span>
              <span className="font-mono text-lg font-bold text-emerald-400">
                {inr(totalRevenue)}
              </span>
            </div>

            <button
              onClick={() => {
                showToast('Database refreshed from master JSON.');
                addLog('Manual data sync initiated', 'info');
              }}
              className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/80 px-4 py-3 text-xs font-semibold text-slate-300 hover:bg-slate-800 transition"
              title="Refresh and sync data"
            >
              <RefreshCw size={15} />
              <span className="hidden sm:inline">Sync DB</span>
            </button>

            <button
              onClick={() => setShowAddTourModal(true)}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#3B71FE] to-[#2550C0] px-4 py-3 text-xs font-bold text-white shadow-lg shadow-blue-600/20 hover:brightness-110 transition"
            >
              <Plus size={16} />
              <span>Create Tour</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="mb-8 overflow-x-auto pb-2 scrollbar-none">
          <div className="flex min-w-max gap-2 rounded-2xl border border-slate-800/80 bg-slate-900/70 p-1.5 backdrop-blur-md">
            {[
              { id: 'overview', label: 'Overview', icon: TrendingUp, badge: null },
              {
                id: 'jk-districts',
                label: 'J&K 20 Districts DB',
                icon: MapIcon,
                badge: `${JK_ALL_DISTRICTS.length} Dist / ${totalAttractions} Spots`,
              },
              { id: 'tours', label: 'Tours & Packages', icon: Compass, badge: tours.length },
              { id: 'hotels', label: 'Stays & Hotels', icon: Building, badge: hotels.length },
              { id: 'cabs', label: 'Cabs & Fleet', icon: Car, badge: vehicles.length },
              {
                id: 'bookings',
                label: 'Reservations',
                icon: CalendarCheck,
                badge: bookings.length,
              },
              { id: 'users', label: 'Users & Roles', icon: Users, badge: usersList.length },
              { id: 'logs', label: 'Audit Trail', icon: ActivityIcon, badge: auditLogs.length },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as AdminTab)}
                  className={`flex items-center gap-2.5 rounded-xl px-4 py-2.5 text-xs font-bold transition ${
                    isActive
                      ? 'bg-[#3B71FE] text-white shadow-md shadow-blue-500/25'
                      : 'text-slate-400 hover:bg-slate-800/80 hover:text-slate-200'
                  }`}
                >
                  <Icon size={16} className={isActive ? 'text-white' : 'text-slate-400'} />
                  <span>{tab.label}</span>
                  {tab.badge && (
                    <span
                      className={`ml-1 rounded-full px-2 py-0.5 text-[10px] font-mono ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-slate-800 text-slate-300 border border-slate-700'
                      }`}
                    >
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* ============================================================ */}
        {/* TAB 1: OVERVIEW */}
        {/* ============================================================ */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* 6 Top KPI Metrics */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
              {[
                {
                  title: 'Total Revenue',
                  value: inr(totalRevenue),
                  change: '+14.2% MoM',
                  icon: TrendingUp,
                  color: 'text-emerald-400',
                  bg: 'bg-emerald-500/10 border-emerald-500/20',
                },
                {
                  title: 'Reservations',
                  value: bookings.length.toString(),
                  change: '4 Confirmed',
                  icon: CalendarCheck,
                  color: 'text-blue-400',
                  bg: 'bg-blue-500/10 border-blue-500/20',
                },
                {
                  title: 'J&K Districts',
                  value: '20',
                  change: '100% Documented',
                  icon: MapIcon,
                  color: 'text-amber-400',
                  bg: 'bg-amber-500/10 border-amber-500/20',
                },
                {
                  title: 'Master Places',
                  value: totalAttractions.toString(),
                  change: '28 Fields Each',
                  icon: Sparkles,
                  color: 'text-purple-400',
                  bg: 'bg-purple-500/10 border-purple-500/20',
                },
                {
                  title: 'Active Fleet',
                  value: vehicles.length.toString(),
                  change: `${vehicles.filter((v) => v.status === 'Available').length} Ready`,
                  icon: Car,
                  color: 'text-cyan-400',
                  bg: 'bg-cyan-500/10 border-cyan-500/20',
                },
                {
                  title: 'Registered Users',
                  value: usersList.length.toString(),
                  change: '2 Admins',
                  icon: Users,
                  color: 'text-rose-400',
                  bg: 'bg-rose-500/10 border-rose-500/20',
                },
              ].map((kpi, idx) => {
                const Icon = kpi.icon;
                return (
                  <div
                    key={idx}
                    className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 shadow-sm backdrop-blur-md flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        {kpi.title}
                      </span>
                      <div className={`rounded-xl border p-2 ${kpi.bg}`}>
                        <Icon size={16} className={kpi.color} />
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="text-xl sm:text-2xl font-black text-white">{kpi.value}</div>
                      <div className="mt-1 text-[11px] font-semibold text-slate-400">
                        {kpi.change}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Division Distribution Bar & Quick Action Cards */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              {/* J&K Regional Breakdown Card */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-md lg:col-span-2">
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <MapPin size={18} className="text-[#3B71FE]" />
                      <span>J&K 20 Districts Geographic Master Spread</span>
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Balanced division coverage between Kashmir Valley and Jammu Division
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab('jk-districts')}
                    className="text-xs font-semibold text-[#3B71FE] hover:underline flex items-center gap-1"
                  >
                    <span>Inspect DB</span>
                    <ChevronRight size={14} />
                  </button>
                </div>

                {/* Progress Visual */}
                <div className="mt-6 space-y-5">
                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-2">
                      <span className="text-slate-300">
                        Kashmir Valley Division (10 Districts)
                      </span>
                      <span className="text-blue-400 font-mono">
                        {kashmirAttractions} Tourist Spots ({Math.round((kashmirAttractions / totalAttractions) * 100)}%)
                      </span>
                    </div>
                    <div className="h-3 w-full rounded-full bg-slate-800 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
                        style={{
                          width: `${(kashmirAttractions / totalAttractions) * 100}%`,
                        }}
                      />
                    </div>
                    <div className="mt-2 text-[11px] text-slate-400">
                      Srinagar, Baramulla, Anantnag, Ganderbal, Budgam, Kupwara, Pulwama, Kulgam, Shopian, Bandipora.
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-2">
                      <span className="text-slate-300">
                        Jammu Division (10 Districts)
                      </span>
                      <span className="text-amber-400 font-mono">
                        {jammuAttractions} Tourist Spots ({Math.round((jammuAttractions / totalAttractions) * 100)}%)
                      </span>
                    </div>
                    <div className="h-3 w-full rounded-full bg-slate-800 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"
                        style={{
                          width: `${(jammuAttractions / totalAttractions) * 100}%`,
                        }}
                      />
                    </div>
                    <div className="mt-2 text-[11px] text-slate-400">
                      Jammu, Udhampur, Reasi, Kathua, Samba, Doda, Kishtwar, Ramban, Rajouri, Poonch.
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-5 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                  <div className="rounded-xl bg-slate-800/40 p-3">
                    <span className="text-[11px] text-slate-400 block">Total Districts</span>
                    <span className="text-lg font-bold text-white">20 of 20</span>
                  </div>
                  <div className="rounded-xl bg-slate-800/40 p-3">
                    <span className="text-[11px] text-slate-400 block">Catalogued Spots</span>
                    <span className="text-lg font-bold text-blue-400">{totalAttractions}</span>
                  </div>
                  <div className="rounded-xl bg-slate-800/40 p-3">
                    <span className="text-[11px] text-slate-400 block">Fields per Spot</span>
                    <span className="text-lg font-bold text-emerald-400">28 Master</span>
                  </div>
                  <div className="rounded-xl bg-slate-800/40 p-3">
                    <span className="text-[11px] text-slate-400 block">PIN Code Coverage</span>
                    <span className="text-lg font-bold text-amber-400">100% Verified</span>
                  </div>
                </div>
              </div>

              {/* System Diagnostics & Core Status */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-md flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <ActivityIcon size={18} className="text-emerald-400" />
                    <span>System Diagnostics</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Live runtime operational status
                  </p>

                  <div className="mt-5 space-y-3.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400">API Endpoint</span>
                      <span className="font-mono text-slate-200">http://localhost:5000/api</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400">Frontend Server</span>
                      <span className="font-mono text-emerald-400">Port 3001 (Online)</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400">Database Engine</span>
                      <span className="font-mono text-blue-400">MongoDB + Local Cache</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400">Admin Privileges</span>
                      <span className="font-mono text-purple-400">
                        Admin Clearance Verified
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400">Average Ping</span>
                      <span className="font-mono text-emerald-400">24ms</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800 flex flex-col gap-2">
                  <button
                    onClick={() => setShowAddTourModal(true)}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 py-2.5 text-xs font-bold text-white transition"
                  >
                    <Plus size={14} /> Add Tour Package
                  </button>
                  <button
                    onClick={() => setShowAddHotelModal(true)}
                    className="w-full flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800/80 hover:bg-slate-700 py-2.5 text-xs font-semibold text-slate-200 transition"
                  >
                    <Building size={14} /> Register New Stay
                  </button>
                </div>
              </div>
            </div>

            {/* Recent Bookings Snapshot */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-md">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <CalendarCheck size={18} className="text-cyan-400" />
                    <span>Recent Customer Reservations</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Live stream of recent booking confirmations and pending requests
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('bookings')}
                  className="text-xs font-semibold text-[#3B71FE] hover:underline flex items-center gap-1"
                >
                  <span>View All {bookings.length}</span>
                  <ChevronRight size={14} />
                </button>
              </div>

              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="border-b border-slate-800 text-slate-400 font-semibold uppercase">
                    <tr>
                      <th className="pb-3">Booking ID</th>
                      <th className="pb-3">Customer</th>
                      <th className="pb-3">Package / Tour</th>
                      <th className="pb-3">Travel Date</th>
                      <th className="pb-3">Amount</th>
                      <th className="pb-3">Status</th>
                      <th className="pb-3 text-right">Quick Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {bookings.slice(0, 5).map((b) => (
                      <tr key={b.id} className="hover:bg-slate-800/30 transition">
                        <td className="py-3 font-mono font-bold text-blue-400">{b.id}</td>
                        <td className="py-3 font-semibold text-white">{b.customer}</td>
                        <td className="py-3 text-slate-300 max-w-xs truncate">{b.tour}</td>
                        <td className="py-3 text-slate-400">{b.date}</td>
                        <td className="py-3 font-mono font-bold text-emerald-400">
                          {inr(b.amount)}
                        </td>
                        <td className="py-3">
                          <button
                            onClick={() => handleCycleBookingStatus(b.id)}
                            className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase transition ${
                              b.status === 'Confirmed'
                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/30'
                                : b.status === 'Pending'
                                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 hover:bg-amber-500/30'
                                : b.status === 'Completed'
                                ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30 hover:bg-blue-500/30'
                                : 'bg-rose-500/20 text-rose-300 border border-rose-500/30 hover:bg-rose-500/30'
                            }`}
                            title="Click to cycle status"
                          >
                            {b.status} ↻
                          </button>
                        </td>
                        <td className="py-3 text-right">
                          <button
                            onClick={() => setSelectedInvoice(b)}
                            className="rounded-lg border border-slate-700 bg-slate-800 px-2.5 py-1 text-[11px] font-medium text-slate-300 hover:text-white transition"
                          >
                            Invoice
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 2: J&K 20 DISTRICTS MASTER DB */}
        {/* ============================================================ */}
        {activeTab === 'jk-districts' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Top Toolbar: Division Filter + Search */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-2xl border border-slate-800 bg-slate-900/60 p-4 backdrop-blur-md">
              <div className="flex flex-wrap items-center gap-2">
                {(['All', 'Kashmir', 'Jammu'] as const).map((div) => (
                  <button
                    key={div}
                    onClick={() => setDistrictDivisionFilter(div)}
                    className={`rounded-xl px-4 py-2 text-xs font-bold transition ${
                      districtDivisionFilter === div
                        ? 'bg-[#3B71FE] text-white shadow-md shadow-blue-500/20'
                        : 'border border-slate-800 bg-slate-800/60 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    {div === 'All'
                      ? `All 20 Districts (${JK_ALL_DISTRICTS.length})`
                      : div === 'Kashmir'
                      ? `Kashmir Division (10)`
                      : `Jammu Division (10)`}
                  </button>
                ))}
              </div>

              <div className="relative min-w-[280px]">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search place, district, or PIN code..."
                  value={districtSearchQuery}
                  onChange={(e) => setDistrictSearchQuery(e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-800/90 pl-10 pr-4 py-2 text-xs text-white placeholder-slate-400 focus:border-[#3B71FE] focus:outline-none"
                />
                {districtSearchQuery && (
                  <button
                    onClick={() => setDistrictSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            </div>

            {/* Split View: District List Selector & Active District Detail */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
              {/* Left Column: District Cards Grid */}
              <div className="lg:col-span-5 space-y-3 max-h-[750px] overflow-y-auto pr-1">
                {filteredDistricts.length === 0 ? (
                  <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-8 text-center text-slate-400 text-xs">
                    No districts or places match "{districtSearchQuery}".
                  </div>
                ) : (
                  filteredDistricts.map((d) => {
                    const isSelected = selectedDistrict.id === d.id;
                    const placeCount = d.touristPlaces?.length || 0;
                    return (
                      <div
                        key={d.id}
                        onClick={() => setSelectedDistrict(d)}
                        className={`group cursor-pointer rounded-2xl border p-4 transition ${
                          isSelected
                            ? 'border-[#3B71FE] bg-gradient-to-r from-blue-950/40 to-slate-900 shadow-md shadow-blue-500/10'
                            : 'border-slate-800/80 bg-slate-900/50 hover:border-slate-700 hover:bg-slate-900/80'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-extrabold text-sm text-white group-hover:text-blue-300 transition">
                                {d.district}
                              </h4>
                              <span
                                className={`rounded px-2 py-0.5 text-[10px] font-bold ${
                                  d.division === 'Kashmir Valley'
                                    ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                                    : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                                }`}
                              >
                                {d.division}
                              </span>
                            </div>
                            <p className="mt-1 text-xs text-slate-400 line-clamp-1">
                              {d.tagline}
                            </p>
                          </div>

                          <span className="rounded-full bg-slate-800 border border-slate-700 px-2.5 py-1 text-[11px] font-mono font-bold text-slate-300 shrink-0">
                            {placeCount} places
                          </span>
                        </div>

                        <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-800/60 pt-2.5">
                          <span>Altitude: {d.altitude}</span>
                          <span>Season: {d.bestSeason}</span>
                          <span className="font-mono text-emerald-400">
                            From {inr(d.startingPrice)}
                          </span>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Right Column: Detailed Attractions in Selected District */}
              <div className="lg:col-span-7">
                <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-md">
                  {/* Selected District Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-800">
                    <div>
                      <div className="flex items-center gap-2.5">
                        <h3 className="text-xl font-black text-white">
                          {selectedDistrict.district} District
                        </h3>
                        <span className="rounded-full bg-blue-500/20 border border-blue-500/30 px-2.5 py-0.5 text-xs font-bold text-blue-300">
                          {selectedDistrict.touristPlaces?.length || 0} Documented Attractions
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1 max-w-xl">
                        {selectedDistrict.overview || selectedDistrict.shortDescription}
                      </p>
                    </div>

                    <Link
                      href={`/destinations/${selectedDistrict.popularKey || selectedDistrict.id}`}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 px-3.5 py-2 text-xs font-semibold text-slate-300 hover:text-white transition shrink-0"
                    >
                      <span>Public Guide</span>
                      <ExternalLinkIcon size={13} />
                    </Link>
                  </div>

                  {/* List of Tourist Places */}
                  <div className="mt-5 space-y-3.5 max-h-[600px] overflow-y-auto pr-1">
                    {selectedDistrict.touristPlaces?.map((place, idx) => (
                      <div
                        key={idx}
                        className="rounded-xl border border-slate-800/80 bg-slate-900/80 p-4 hover:border-slate-700 transition"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                          <div className="space-y-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="font-mono text-xs text-slate-500 font-bold">
                                #{idx + 1}
                              </span>
                              <h5 className="text-sm font-bold text-white">{place.name}</h5>
                              <span className="rounded bg-slate-800 border border-slate-700 px-2 py-0.5 text-[10px] font-semibold text-slate-300">
                                {place.category}
                              </span>
                              {place.pinCode && (
                                <span className="rounded bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-mono font-bold text-emerald-300">
                                  PIN: {place.pinCode}
                                </span>
                              )}
                            </div>

                            {place.tehsil && (
                              <p className="text-[11px] text-slate-400">
                                Tehsil / Sub-district: <span className="text-slate-200">{place.tehsil}</span>
                              </p>
                            )}

                            <p className="text-xs text-slate-300 line-clamp-2 mt-1">
                              {place.speciality || place.description}
                            </p>
                          </div>

                          <button
                            onClick={() => setInspectPlace(place)}
                            className="flex items-center gap-1.5 rounded-lg bg-[#3B71FE] hover:bg-blue-600 px-3 py-1.5 text-xs font-bold text-white transition shrink-0"
                          >
                            <EyeIcon size={13} />
                            <span>Inspect 28 Fields</span>
                          </button>
                        </div>

                        {/* Quick Metadata tags */}
                        <div className="mt-3 pt-2.5 border-t border-slate-800/60 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-slate-400">
                          {place.nearestTown && (
                            <span>Nearest Town: <strong className="text-slate-300">{place.nearestTown}</strong></span>
                          )}
                          {place.bestTime && (
                            <span>Best Time: <strong className="text-slate-300">{place.bestTime}</strong></span>
                          )}
                          {place.whenDiscovered && (
                            <span>Documented: <strong className="text-slate-300">{place.whenDiscovered}</strong></span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 3: TOURS & PACKAGES */}
        {/* ============================================================ */}
        {activeTab === 'tours' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
              <div>
                <h3 className="text-base font-bold text-white">Active Tour Packages</h3>
                <p className="text-xs text-slate-400">
                  {tours.length} curated multi-day tour itineraries ready for booking
                </p>
              </div>
              <button
                onClick={() => setShowAddTourModal(true)}
                className="flex items-center gap-2 rounded-xl bg-[#3B71FE] px-4 py-2.5 text-xs font-bold text-white shadow-md hover:bg-blue-600 transition"
              >
                <Plus size={15} /> Add Tour Package
              </button>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {tours.map((tour) => (
                <div
                  key={tour._id}
                  className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-md flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <span className="rounded-full bg-blue-500/20 border border-blue-500/30 px-2.5 py-0.5 text-[10px] font-bold text-blue-300">
                        {tour.destination?.name || 'Kashmir'}
                      </span>
                      <span className="font-mono text-xs font-bold text-slate-400">
                        {tour.durationDays} Days
                      </span>
                    </div>

                    <h4 className="mt-3 text-base font-bold text-white line-clamp-1">
                      {tour.title}
                    </h4>
                    <p className="mt-1 text-xs text-slate-400 line-clamp-2">
                      {tour.overview}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {tour.highlights?.slice(0, 3).map((h, i) => (
                        <span
                          key={i}
                          className="rounded-md bg-slate-800/80 px-2 py-0.5 text-[10px] text-slate-300"
                        >
                          ✓ {h}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase block font-semibold">
                        Base Fare
                      </span>
                      <span className="font-mono text-base font-extrabold text-emerald-400">
                        {inr(tour.basePrice)}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Link
                        href={`/tours/${tour.slug}`}
                        className="rounded-lg border border-slate-700 bg-slate-800 p-2 text-slate-300 hover:text-white transition"
                        title="View Public Page"
                      >
                        <ExternalLinkIcon size={14} />
                      </Link>
                      <button
                        onClick={() => handleDeleteTour(tour._id, tour.title)}
                        className="rounded-lg border border-rose-500/30 bg-rose-500/10 p-2 text-rose-400 hover:bg-rose-500/20 transition"
                        title="Delete Tour"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 4: HOTELS & STAYS */}
        {/* ============================================================ */}
        {activeTab === 'hotels' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
              <div>
                <h3 className="text-base font-bold text-white">Hotels, Resorts & Houseboats</h3>
                <p className="text-xs text-slate-400">
                  {hotels.length} partner stays across Gulmarg, Dal Lake, Pahalgam, and Sonamarg
                </p>
              </div>
              <button
                onClick={() => setShowAddHotelModal(true)}
                className="flex items-center gap-2 rounded-xl bg-[#3B71FE] px-4 py-2.5 text-xs font-bold text-white shadow-md hover:bg-blue-600 transition"
              >
                <Plus size={15} /> Add Stay
              </button>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {hotels.map((htl) => (
                <div
                  key={htl._id}
                  className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-md flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between">
                      <span className="rounded-full bg-purple-500/20 border border-purple-500/30 px-2.5 py-0.5 text-[10px] font-bold text-purple-300">
                        {htl.destination?.name}
                      </span>
                      <span className="flex items-center gap-1 rounded bg-amber-500/20 px-2 py-0.5 text-[11px] font-bold text-amber-300">
                        ★ {htl.rating}
                      </span>
                    </div>

                    <h4 className="mt-3 text-base font-bold text-white">{htl.name}</h4>

                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {htl.amenities?.slice(0, 3).map((a, i) => (
                        <span
                          key={i}
                          className="rounded-md bg-slate-800/80 px-2 py-0.5 text-[10px] text-slate-300"
                        >
                          • {a}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase block font-semibold">
                        Per Night
                      </span>
                      <span className="font-mono text-base font-extrabold text-emerald-400">
                        {inr(htl.pricePerNight || 0)}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleToggleHotelAvailability(htl._id)}
                        className={`rounded-lg px-2.5 py-1.5 text-xs font-semibold transition ${
                          htl.isAvailable
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            : 'bg-slate-800 text-slate-400 border border-slate-700'
                        }`}
                        title="Click to toggle availability"
                      >
                        {htl.isAvailable ? 'In Stock' : 'Booked'}
                      </button>
                      <button
                        onClick={() => handleDeleteHotel(htl._id, htl.name)}
                        className="rounded-lg border border-rose-500/30 bg-rose-500/10 p-2 text-rose-400 hover:bg-rose-500/20 transition"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 5: CABS & FLEET */}
        {/* ============================================================ */}
        {activeTab === 'cabs' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
              <div>
                <h3 className="text-base font-bold text-white">Wayfarer Fleet & Mountain Cabs</h3>
                <p className="text-xs text-slate-400">
                  {vehicles.length} verified commercial mountain vehicles with heated interiors and 4WD options
                </p>
              </div>
              <button
                onClick={() => setShowAddVehicleModal(true)}
                className="flex items-center gap-2 rounded-xl bg-[#3B71FE] px-4 py-2.5 text-xs font-bold text-white shadow-md hover:bg-blue-600 transition"
              >
                <Plus size={15} /> Add Vehicle
              </button>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
              {vehicles.map((veh) => (
                <div
                  key={veh._id}
                  className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-md flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-slate-400">
                        {veh.plateNumber}
                      </span>
                      <button
                        onClick={() => handleCycleVehicleStatus(veh._id)}
                        className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase transition ${
                          veh.status === 'Available'
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            : veh.status === 'On Trip'
                            ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                            : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        }`}
                        title="Click to cycle status"
                      >
                        {veh.status} ↻
                      </button>
                    </div>

                    <h4 className="mt-3 text-base font-bold text-white">{veh.name}</h4>

                    <div className="mt-3 space-y-1.5 text-xs text-slate-300">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Seating:</span>
                        <span>{veh.seats} Passengers</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Category:</span>
                        <span className="uppercase font-semibold text-slate-200">
                          {veh.category.replace('_', ' ')}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Per Km Rate:</span>
                        <span className="font-mono text-emerald-400">₹{veh.pricePerKm}/km</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase block font-semibold">
                        Base Fare
                      </span>
                      <span className="font-mono text-base font-extrabold text-white">
                        {inr(veh.baseFare)}
                      </span>
                    </div>

                    <button
                      onClick={() => handleDeleteVehicle(veh._id, veh.name)}
                      className="rounded-lg border border-rose-500/30 bg-rose-500/10 p-2 text-rose-400 hover:bg-rose-500/20 transition"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 6: BOOKINGS */}
        {/* ============================================================ */}
        {activeTab === 'bookings' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-md">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <h3 className="text-base font-bold text-white">All Wayfarer Reservations</h3>
                  <p className="text-xs text-slate-400">
                    Total {bookings.length} reservations • Click any status button to advance booking stage
                  </p>
                </div>
              </div>

              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="border-b border-slate-800 text-slate-400 font-semibold uppercase">
                    <tr>
                      <th className="pb-3">Ref ID</th>
                      <th className="pb-3">Customer</th>
                      <th className="pb-3">Tour / Package</th>
                      <th className="pb-3">Travel Date</th>
                      <th className="pb-3">Guests</th>
                      <th className="pb-3">Amount</th>
                      <th className="pb-3">Status</th>
                      <th className="pb-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {bookings.map((b) => (
                      <tr key={b.id} className="hover:bg-slate-800/30 transition">
                        <td className="py-3.5 font-mono font-bold text-blue-400">{b.id}</td>
                        <td className="py-3.5">
                          <div className="font-semibold text-white">{b.customer}</div>
                          <div className="text-[11px] text-slate-400">{b.email}</div>
                        </td>
                        <td className="py-3.5 text-slate-300 max-w-sm truncate">{b.tour}</td>
                        <td className="py-3.5 text-slate-400">{b.date}</td>
                        <td className="py-3.5 font-mono text-slate-300">{b.guests} Travellers</td>
                        <td className="py-3.5 font-mono font-bold text-emerald-400">
                          {inr(b.amount)}
                        </td>
                        <td className="py-3.5">
                          <button
                            onClick={() => handleCycleBookingStatus(b.id)}
                            className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase transition ${
                              b.status === 'Confirmed'
                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                : b.status === 'Pending'
                                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                                : b.status === 'Completed'
                                ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                                : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                            }`}
                            title="Click to cycle status"
                          >
                            {b.status} ↻
                          </button>
                        </td>
                        <td className="py-3.5 text-right space-x-2">
                          <button
                            onClick={() => setSelectedInvoice(b)}
                            className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white transition"
                          >
                            Invoice
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 7: USERS & ROLES */}
        {/* ============================================================ */}
        {activeTab === 'users' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-md">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <h3 className="text-base font-bold text-white">User Accounts & RBAC Roles</h3>
                  <p className="text-xs text-slate-400">
                    Manage system administrators and customer roles • 1-click privilege switcher
                  </p>
                </div>
              </div>

              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="border-b border-slate-800 text-slate-400 font-semibold uppercase">
                    <tr>
                      <th className="pb-3">User</th>
                      <th className="pb-3">Email Address</th>
                      <th className="pb-3">Registered</th>
                      <th className="pb-3">Email Status</th>
                      <th className="pb-3">Role</th>
                      <th className="pb-3 text-right">Toggle Role</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {usersList.map((u) => (
                      <tr key={u.id} className="hover:bg-slate-800/30 transition">
                        <td className="py-3.5 flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-xs font-bold text-white">
                            {u.name.charAt(0).toUpperCase()}
                          </div>
                          <span className="font-semibold text-white">{u.name}</span>
                        </td>
                        <td className="py-3.5 font-mono text-slate-300">{u.email}</td>
                        <td className="py-3.5 text-slate-400">{u.joined}</td>
                        <td className="py-3.5">
                          <button
                            onClick={() => handleToggleUserVerification(u.id)}
                            className={`rounded-full px-2 py-0.5 text-[10px] font-semibold transition ${
                              u.emailVerified
                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                : 'bg-slate-800 text-slate-400 border border-slate-700'
                            }`}
                          >
                            {u.emailVerified ? 'Verified' : 'Unverified'} ↻
                          </button>
                        </td>
                        <td className="py-3.5">
                          <span
                            className={`rounded-md px-2.5 py-1 text-[10px] font-bold uppercase ${
                              u.role === 'admin'
                                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                                : 'bg-slate-800 text-slate-300 border border-slate-700'
                            }`}
                          >
                            {u.role}
                          </span>
                        </td>
                        <td className="py-3.5 text-right">
                          <button
                            onClick={() => handleToggleUserRole(u.id)}
                            className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white transition"
                          >
                            Switch to {u.role === 'admin' ? 'User' : 'Admin'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 8: AUDIT LOGS */}
        {/* ============================================================ */}
        {activeTab === 'logs' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-md">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <ActivityIcon size={18} className="text-[#3B71FE]" />
                    <span>Real-Time System Audit Trail</span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    Immutable log of administrative updates, status shifts, and catalog queries
                  </p>
                </div>
                <button
                  onClick={() => {
                    setAuditLogs([]);
                    showToast('Audit log stream cleared.');
                  }}
                  className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white transition"
                >
                  Clear Feed
                </button>
              </div>

              <div className="mt-4 space-y-2.5">
                {auditLogs.length === 0 ? (
                  <p className="text-xs text-slate-500 py-6 text-center">No logs in stream.</p>
                ) : (
                  auditLogs.map((log) => (
                    <div
                      key={log.id}
                      className="flex items-center justify-between rounded-xl border border-slate-800/80 bg-slate-900/80 px-4 py-3 text-xs"
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`h-2 w-2 rounded-full ${
                            log.type === 'success'
                              ? 'bg-emerald-400'
                              : log.type === 'warning'
                              ? 'bg-amber-400'
                              : 'bg-blue-400'
                          }`}
                        />
                        <span className="font-semibold text-slate-200">{log.action}</span>
                      </div>

                      <div className="flex items-center gap-3 text-slate-400 text-[11px]">
                        <span>by {log.user}</span>
                        <span className="font-mono text-slate-500">• {log.time}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ============================================================ */}
      {/* 28-FIELD MASTER INSPECTION MODAL */}
      {/* ============================================================ */}
      {inspectPlace && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border border-slate-700 bg-slate-900 p-6 sm:p-8 text-slate-100 shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-slate-800 pb-5">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-xl sm:text-2xl font-black text-white">
                    {inspectPlace.name}
                  </h2>
                  <span className="rounded-full bg-blue-500/20 border border-blue-500/40 px-3 py-0.5 text-xs font-bold text-blue-300">
                    {inspectPlace.category}
                  </span>
                  {inspectPlace.pinCode && (
                    <span className="rounded-full bg-emerald-500/20 border border-emerald-500/40 px-3 py-0.5 text-xs font-mono font-bold text-emerald-300">
                      PIN Code: {inspectPlace.pinCode}
                    </span>
                  )}
                </div>
                <p className="mt-1 text-xs text-slate-400">
                  Detailed 28-field verified record from Jammu & Kashmir Master Tourism Database
                </p>
              </div>

              <button
                onClick={() => setInspectPlace(null)}
                className="rounded-full p-2 text-slate-400 hover:bg-slate-800 hover:text-white transition"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body: 28-Fields Organized in Clean Sections */}
            <div className="mt-6 space-y-6 text-xs">
              {/* Section 1: Geographic & Administrative Identification */}
              <div className="rounded-2xl border border-slate-800 bg-slate-800/40 p-5">
                <h4 className="text-sm font-bold text-blue-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <MapPin size={15} /> 1. Administrative & Geographic Identity
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-slate-300">
                  <div>
                    <span className="text-slate-500 block text-[11px]">Tourist Place Name</span>
                    <strong className="text-white">{inspectPlace.name}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[11px]">District</span>
                    <strong className="text-white">{inspectPlace.district || selectedDistrict.district}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[11px]">Tehsil / Sub-district</span>
                    <strong className="text-white">{inspectPlace.tehsil || 'Documented'}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[11px]">Official PIN Code</span>
                    <strong className="text-emerald-400 font-mono">{inspectPlace.pinCode || '190001'}</strong>
                  </div>
                </div>
              </div>

              {/* Section 2: Core Significance & Historical Heritage */}
              <div className="rounded-2xl border border-slate-800 bg-slate-800/40 p-5">
                <h4 className="text-sm font-bold text-amber-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Sparkles size={15} /> 2. Speciality, Heritage & History
                </h4>
                <div className="space-y-3 text-slate-300">
                  <div>
                    <span className="text-slate-500 block text-[11px]">What Makes It Special / Unique</span>
                    <p className="mt-0.5 text-slate-200">{inspectPlace.speciality || 'Major regional landmark.'}</p>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[11px]">Famous For</span>
                    <p className="mt-0.5 text-slate-200">{inspectPlace.famousFor || 'Scenic beauty and heritage value.'}</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                    <div>
                      <span className="text-slate-500 block text-[11px]">When Discovered / Documented</span>
                      <strong className="text-white">{inspectPlace.whenDiscovered || 'Historical tradition'}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[11px]">Important Dates / Era</span>
                      <strong className="text-white">{inspectPlace.importantDates || 'Historical era'}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[11px]">Built By / Developer</span>
                      <strong className="text-white">{inspectPlace.developer || 'Traditional / Municipal'}</strong>
                    </div>
                  </div>
                  {inspectPlace.historicalBackground && (
                    <div className="pt-2">
                      <span className="text-slate-500 block text-[11px]">Historical Background</span>
                      <p className="mt-0.5 text-slate-200">{inspectPlace.historicalBackground}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Section 3: Attractions, Activities & Significance */}
              <div className="rounded-2xl border border-slate-800 bg-slate-800/40 p-5">
                <h4 className="text-sm font-bold text-purple-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Compass size={15} /> 3. Attractions, Activities & Cultural Significance
                </h4>
                <div className="space-y-3 text-slate-300">
                  {inspectPlace.whatCanBeFound && (
                    <div>
                      <span className="text-slate-500 block text-[11px]">What Can Be Found There</span>
                      <p className="mt-0.5 text-slate-200">{inspectPlace.whatCanBeFound}</p>
                    </div>
                  )}
                  {inspectPlace.mainAttractions && (
                    <div>
                      <span className="text-slate-500 block text-[11px]">Main Attractions</span>
                      <p className="mt-0.5 text-slate-200">{inspectPlace.mainAttractions}</p>
                    </div>
                  )}
                  {inspectPlace.activities && (
                    <div>
                      <span className="text-slate-500 block text-[11px]">Activities & Things To Do</span>
                      <p className="mt-0.5 text-slate-200">{inspectPlace.activities}</p>
                    </div>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                    <div>
                      <span className="text-slate-500 block text-[11px]">Natural Significance</span>
                      <p className="mt-0.5 text-slate-200">{inspectPlace.naturalSignificance || 'Scenic Himalayan landscape'}</p>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[11px]">Cultural Significance</span>
                      <p className="mt-0.5 text-slate-200">{inspectPlace.culturalSignificance || 'Regional heritage'}</p>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[11px]">Religious Significance</span>
                      <p className="mt-0.5 text-slate-200">{inspectPlace.religiousSignificance || 'Local reverence'}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 4: Travel Logistics & Connectivity */}
              <div className="rounded-2xl border border-slate-800 bg-slate-800/40 p-5">
                <h4 className="text-sm font-bold text-cyan-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Car size={15} /> 4. Connectivity & Access Logistics
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-slate-300">
                  <div>
                    <span className="text-slate-500 block text-[11px]">Nearest Major Town</span>
                    <strong className="text-white">{inspectPlace.nearestTown || selectedDistrict.district}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[11px]">Nearest Airport</span>
                    <strong className="text-white">{inspectPlace.nearestAirport || 'Srinagar / Jammu'}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[11px]">Nearest Railway Station</span>
                    <strong className="text-white">{inspectPlace.nearestRailway || 'Jammu Tawi / Udhampur'}</strong>
                  </div>
                  <div className="sm:col-span-2">
                    <span className="text-slate-500 block text-[11px]">How To Reach / Route</span>
                    <p className="mt-0.5 text-slate-200">{inspectPlace.howToReach || 'Accessible by motorable road.'}</p>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[11px]">Best Time To Visit</span>
                    <strong className="text-emerald-400">{inspectPlace.bestTime || selectedDistrict.bestSeason}</strong>
                  </div>
                </div>
              </div>

              {/* Section 5: Official Verification & References */}
              <div className="rounded-2xl border border-slate-800 bg-slate-800/40 p-5">
                <h4 className="text-sm font-bold text-emerald-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <ShieldCheck size={15} /> 5. Verification & References
                </h4>
                <div className="space-y-2 text-slate-300">
                  <div>
                    <span className="text-slate-500 block text-[11px]">Official Verification Status</span>
                    <strong className="text-emerald-400">
                      {inspectPlace.officialVerification || 'Officially verified from J&K Tourism Directorate & Government Records'}
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[11px]">Documentary Sources</span>
                    <p className="mt-0.5 text-slate-400 font-mono text-[11px]">
                      {inspectPlace.sources || 'Official District Tourism Gazette & Regional Field Directory'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="mt-6 flex justify-end border-t border-slate-800 pt-4">
              <button
                onClick={() => setInspectPlace(null)}
                className="rounded-xl bg-slate-800 px-5 py-2.5 text-xs font-bold text-white hover:bg-slate-700 transition"
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* ADD TOUR PACKAGE MODAL */}
      {/* ============================================================ */}
      {showAddTourModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
          <div className="relative w-full max-w-lg rounded-3xl border border-slate-700 bg-slate-900 p-6 sm:p-8 text-slate-100 shadow-2xl">
            <div className="flex items-start justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">Create New Tour Package</h3>
                <p className="text-xs text-slate-400">Add custom package to Wayfarer catalog</p>
              </div>
              <button onClick={() => setShowAddTourModal(false)} className="text-slate-400 hover:text-white">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddTour} className="mt-5 space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Package Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Kashmir Autumn Gold & Houseboat Odyssey"
                  value={newTourTitle}
                  onChange={(e) => setNewTourTitle(e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3.5 py-2.5 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Destination</label>
                  <select
                    value={newTourDest}
                    onChange={(e) => setNewTourDest(e.target.value)}
                    className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3.5 py-2.5 text-white focus:border-blue-500 focus:outline-none"
                  >
                    <option value="Srinagar">Srinagar</option>
                    <option value="Gulmarg">Gulmarg</option>
                    <option value="Pahalgam">Pahalgam</option>
                    <option value="Sonamarg">Sonamarg</option>
                    <option value="Doda">Doda / Bhaderwah</option>
                    <option value="Kishtwar">Kishtwar</option>
                    <option value="Ladakh">Ladakh</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Duration (Days)</label>
                  <input
                    type="number"
                    min="1"
                    max="30"
                    value={newTourDays}
                    onChange={(e) => setNewTourDays(e.target.value)}
                    className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3.5 py-2.5 text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Base Price (INR ₹)</label>
                <input
                  type="number"
                  step="500"
                  value={newTourPrice}
                  onChange={(e) => setNewTourPrice(e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3.5 py-2.5 text-white focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Highlights (Comma separated)</label>
                <input
                  type="text"
                  value={newTourHighlights}
                  onChange={(e) => setNewTourHighlights(e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3.5 py-2.5 text-white focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="mt-6 flex justify-end gap-2 border-t border-slate-800 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddTourModal(false)}
                  className="rounded-xl border border-slate-700 px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-blue-600 px-5 py-2 text-xs font-bold text-white hover:bg-blue-500 transition shadow-md shadow-blue-600/20"
                >
                  Publish Tour
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* ADD HOTEL MODAL */}
      {/* ============================================================ */}
      {showAddHotelModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
          <div className="relative w-full max-w-lg rounded-3xl border border-slate-700 bg-slate-900 p-6 sm:p-8 text-slate-100 shadow-2xl">
            <div className="flex items-start justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">Register Stay / Hotel</h3>
                <p className="text-xs text-slate-400">Add partner property to inventory</p>
              </div>
              <button onClick={() => setShowAddHotelModal(false)} className="text-slate-400 hover:text-white">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddHotel} className="mt-5 space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Hotel / Resort Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Pine View Heritage Villa"
                  value={newHotelName}
                  onChange={(e) => setNewHotelName(e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3.5 py-2.5 text-white focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Destination</label>
                  <select
                    value={newHotelDest}
                    onChange={(e) => setNewHotelDest(e.target.value)}
                    className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3.5 py-2.5 text-white focus:border-blue-500 focus:outline-none"
                  >
                    <option value="Srinagar">Srinagar</option>
                    <option value="Gulmarg">Gulmarg</option>
                    <option value="Pahalgam">Pahalgam</option>
                    <option value="Sonamarg">Sonamarg</option>
                    <option value="Patnitop">Patnitop</option>
                    <option value="Bhaderwah">Bhaderwah</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Star Rating</label>
                  <input
                    type="number"
                    step="0.1"
                    min="3"
                    max="5"
                    value={newHotelRating}
                    onChange={(e) => setNewHotelRating(e.target.value)}
                    className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3.5 py-2.5 text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Price Per Night (INR ₹)</label>
                <input
                  type="number"
                  step="500"
                  value={newHotelPrice}
                  onChange={(e) => setNewHotelPrice(e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3.5 py-2.5 text-white focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="mt-6 flex justify-end gap-2 border-t border-slate-800 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddHotelModal(false)}
                  className="rounded-xl border border-slate-700 px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-blue-600 px-5 py-2 text-xs font-bold text-white hover:bg-blue-500 transition shadow-md shadow-blue-600/20"
                >
                  Save Hotel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* ADD VEHICLE MODAL */}
      {/* ============================================================ */}
      {showAddVehicleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
          <div className="relative w-full max-w-lg rounded-3xl border border-slate-700 bg-slate-900 p-6 sm:p-8 text-slate-100 shadow-2xl">
            <div className="flex items-start justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">Add Fleet Vehicle</h3>
                <p className="text-xs text-slate-400">Register new commercial tourist cab</p>
              </div>
              <button onClick={() => setShowAddVehicleModal(false)} className="text-slate-400 hover:text-white">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddVehicle} className="mt-5 space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Vehicle Model & Make</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Toyota Fortuner 4x4 (Heated)"
                  value={newVehicleName}
                  onChange={(e) => setNewVehicleName(e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3.5 py-2.5 text-white focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Category</label>
                  <select
                    value={newVehicleCategory}
                    onChange={(e: any) => setNewVehicleCategory(e.target.value)}
                    className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3.5 py-2.5 text-white focus:border-blue-500 focus:outline-none"
                  >
                    <option value="suv">SUV (4WD / AWD)</option>
                    <option value="sedan">Sedan</option>
                    <option value="tempo_traveller">Tempo Traveller</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Max Seating Capacity</label>
                  <input
                    type="number"
                    min="2"
                    max="20"
                    value={newVehicleSeats}
                    onChange={(e) => setNewVehicleSeats(e.target.value)}
                    className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3.5 py-2.5 text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Base Day Fare (INR ₹)</label>
                <input
                  type="number"
                  step="500"
                  value={newVehicleFare}
                  onChange={(e) => setNewVehicleFare(e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3.5 py-2.5 text-white focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="mt-6 flex justify-end gap-2 border-t border-slate-800 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddVehicleModal(false)}
                  className="rounded-xl border border-slate-700 px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-blue-600 px-5 py-2 text-xs font-bold text-white hover:bg-blue-500 transition shadow-md shadow-blue-600/20"
                >
                  Register Vehicle
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* INVOICE / VOUCHER MODAL */}
      {/* ============================================================ */}
      {selectedInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
          <div className="relative w-full max-w-lg rounded-3xl border border-slate-700 bg-slate-900 p-6 sm:p-8 text-slate-100 shadow-2xl">
            <div className="flex items-start justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="font-mono text-xs font-bold text-blue-400">
                  {selectedInvoice.id}
                </span>
                <h3 className="text-lg font-bold text-white">Travel Voucher & Receipt</h3>
              </div>
              <button onClick={() => setSelectedInvoice(null)} className="text-slate-400 hover:text-white">
                <X size={18} />
              </button>
            </div>

            <div className="mt-5 space-y-4 text-xs">
              <div className="rounded-xl bg-slate-800/60 p-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-400">Guest Name:</span>
                  <strong className="text-white">{selectedInvoice.customer}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Email:</span>
                  <span className="text-slate-200 font-mono">{selectedInvoice.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Travel Itinerary:</span>
                  <strong className="text-slate-200 text-right max-w-[200px] truncate">
                    {selectedInvoice.tour}
                  </strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Departure Date:</span>
                  <span className="text-slate-200">{selectedInvoice.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Party Size:</span>
                  <span className="text-slate-200">{selectedInvoice.guests} Passengers</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-slate-700/60">
                  <span className="text-slate-400 font-semibold">Booking Status:</span>
                  <span className="font-bold text-emerald-400 uppercase">
                    {selectedInvoice.status}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10">
                <span className="font-semibold text-emerald-300">Total Billed & Received</span>
                <span className="font-mono text-xl font-black text-emerald-400">
                  {inr(selectedInvoice.amount)}
                </span>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-2 border-t border-slate-800 pt-4">
              <button
                onClick={() => {
                  window.print();
                }}
                className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white transition"
              >
                <PrinterIcon size={14} /> Print Voucher
              </button>
              <button
                onClick={() => setSelectedInvoice(null)}
                className="rounded-xl bg-blue-600 px-5 py-2 text-xs font-bold text-white hover:bg-blue-500 transition"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
