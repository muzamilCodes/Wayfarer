'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import {
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
} from 'lucide-react';
import { inr } from '@/lib/format';
import {
  SEED_DESTINATIONS,
  SEED_PACKAGES,
  SEED_HOTELS,
  SEED_VEHICLES,
} from '@/lib/seed-data';

type AdminTab = 'overview' | 'tours' | 'destinations' | 'hotels' | 'cabs' | 'bookings' | 'users';

interface UserRecord {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  emailVerified: boolean;
  joined: string;
}

export default function AdminPage() {
  const { user, loading, token } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');

  // Local state for admin CRUD (seeded initially, live mutable)
  const [tours, setTours] = useState(SEED_PACKAGES);
  const [destinations, setDestinations] = useState(SEED_DESTINATIONS);
  const [hotels, setHotels] = useState(SEED_HOTELS);
  const [vehicles, setVehicles] = useState(SEED_VEHICLES);
  const [bookings, setBookings] = useState([
    {
      id: 'WF-7829',
      customer: 'Priya Sharma',
      email: 'priya@example.com',
      tour: 'Kashmir Paradise: 7-Day Valley Odyssey',
      date: 'May 12, 2026',
      status: 'Confirmed',
      amount: 37000,
    },
    {
      id: 'WF-7830',
      customer: 'Rahul Verma',
      email: 'rahul@example.com',
      tour: 'Gulmarg Winter Wonderland Ski',
      date: 'Dec 22, 2026',
      status: 'Pending',
      amount: 49000,
    },
    {
      id: 'WF-7831',
      customer: 'Aarav Patel',
      email: 'aarav@example.com',
      tour: 'Ladakh High Passes & Pangong',
      date: 'Jun 10, 2026',
      status: 'Confirmed',
      amount: 59600,
    },
  ]);

  const [usersList, setUsersList] = useState<UserRecord[]>([
    {
      id: 'usr-1',
      name: 'Demo Admin',
      email: 'admin@demo.local',
      role: 'admin',
      emailVerified: true,
      joined: 'Oct 2026',
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
      email: 'rohan@example.com',
      role: 'user',
      emailVerified: false,
      joined: 'Oct 2026',
    },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Form states for new tour
  const [newTourTitle, setNewTourTitle] = useState('');
  const [newTourPrice, setNewTourPrice] = useState('18500');
  const [newTourDays, setNewTourDays] = useState('6');
  const [newTourDest, setNewTourDest] = useState('Srinagar');

  useEffect(() => {
    if (!loading && (!user || user.role !== 'admin')) {
      // Both client and server blocked!
      router.replace('/account?error=admin_required');
    }
  }, [loading, user, router]);

  if (loading) {
    return (
      <div className="container-x py-32 text-center">
        <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-lake border-t-transparent" />
        <p className="mt-4 text-sm font-medium text-mist">Verifying administrator authorization…</p>
      </div>
    );
  }

  if (!user || user.role !== 'admin') {
    return (
      <div className="container-x py-32 text-center">
        <ShieldAlert className="mx-auto text-rose-500 mb-3" size={48} />
        <h1 className="text-2xl font-bold text-lake">Access Restricted</h1>
        <p className="mt-2 text-sm text-mist max-w-md mx-auto">
          This control center requires an authorized admin account. Non-administrators are blocked on both client and server.
        </p>
      </div>
    );
  }

  const handleAddTour = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTourTitle) return;
    const newTour = {
      _id: `pkg-${Date.now()}`,
      title: newTourTitle,
      slug: newTourTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      durationDays: Number(newTourDays) || 5,
      basePrice: Number(newTourPrice) || 15000,
      discountPercent: 10,
      images: [{ url: 'https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&w=1200&q=80' }],
      overview: 'Curated custom Himalayan adventure package.',
      highlights: ['Scenic valley sightseeing', 'Local guide coordination', 'Comfort stays'],
      included: ['Transport', 'Stay', 'Breakfast'],
      excluded: ['Airfare'],
      maxTravellers: 10,
      rating: 4.8,
      reviewCount: 1,
      destination: { name: newTourDest, slug: newTourDest.toLowerCase() },
    };
    setTours([newTour, ...tours]);
    setNewTourTitle('');
    setShowAddModal(false);
  };

  const handleDeleteTour = (id: string) => {
    setTours(tours.filter((t) => t._id !== id));
  };

  const handleToggleUserRole = (userId: string) => {
    setUsersList(
      usersList.map((u) => {
        if (u.id === userId) {
          const nextRole: 'user' | 'admin' = u.role === 'admin' ? 'user' : 'admin';
          return { ...u, role: nextRole };
        }
        return u;
      })
    );
  };

  const handleToggleBookingStatus = (bookingId: string) => {
    setBookings(
      bookings.map((b) => {
        if (b.id === bookingId) {
          const nextStatus = b.status === 'Confirmed' ? 'Completed' : b.status === 'Completed' ? 'Pending' : 'Confirmed';
          return { ...b, status: nextStatus };
        }
        return b;
      })
    );
  };

  return (
    <div className="min-h-screen bg-snow/60 py-10">
      <div className="container-x">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-lake/10 pb-6 gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-saffron/20 text-deep px-3 py-0.5 text-xs font-bold uppercase tracking-wider">
                Admin Center
              </span>
              <span className="text-xs text-mist">Server & Client Enforced</span>
            </div>
            <h1 className="mt-1 text-3xl font-bold text-lake">Wayfarer Management</h1>
            <p className="text-sm text-mist">Configure catalog, manage live bookings, and assign roles.</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowAddModal(true)}
              className="btn btn-primary text-xs py-2.5 px-5 shadow-sm flex items-center gap-2"
            >
              <Plus size={16} />
              <span>Add Tour Package</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mt-6 flex flex-wrap gap-2 border-b border-lake/10 pb-3">
          {[
            { id: 'overview', label: 'Overview', icon: TrendingUp },
            { id: 'tours', label: `Tours (${tours.length})`, icon: Compass },
            { id: 'destinations', label: `Destinations (${destinations.length})`, icon: MapPin },
            { id: 'hotels', label: `Hotels (${hotels.length})`, icon: Building },
            { id: 'cabs', label: `Cabs (${vehicles.length})`, icon: Car },
            { id: 'bookings', label: `Bookings (${bookings.length})`, icon: CalendarCheck },
            { id: 'users', label: `Users (${usersList.length})`, icon: Users },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as AdminTab)}
                className={`flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-lake text-snow shadow-sm'
                    : 'text-mist hover:text-lake hover:bg-white/60'
                }`}
              >
                <Icon size={14} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="mt-8">
          {/* OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  { label: 'Published Tours', val: tours.length, sub: 'Active in catalog', icon: Compass, color: 'text-indigo-600' },
                  { label: 'Destinations', val: destinations.length, sub: 'Kashmir & Himalaya', icon: MapPin, color: 'text-emerald-600' },
                  { label: 'Active Bookings', val: bookings.length, sub: 'Value ₹1,45,600', icon: CalendarCheck, color: 'text-amber-600' },
                  { label: 'Registered Users', val: usersList.length, sub: '1 Admin, 3 Travelers', icon: Users, color: 'text-blue-600' },
                ].map((stat, i) => {
                  const Icon = stat.icon;
                  return (
                    <div key={i} className="rounded-3xl border border-lake/10 bg-white/90 p-5 shadow-sm backdrop-blur">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-mist uppercase tracking-wider">{stat.label}</span>
                        <div className={`rounded-xl bg-lake/5 p-2 ${stat.color}`}>
                          <Icon size={18} />
                        </div>
                      </div>
                      <p className="mt-2 text-3xl font-bold text-lake">{stat.val}</p>
                      <p className="mt-1 text-xs text-mist">{stat.sub}</p>
                    </div>
                  );
                })}
              </div>

              {/* Recent Bookings preview */}
              <div className="rounded-3xl border border-lake/10 bg-white/90 p-6 shadow-sm backdrop-blur">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display text-lg font-bold text-lake">Recent Customer Bookings</h3>
                  <button onClick={() => setActiveTab('bookings')} className="text-xs font-semibold text-crocus hover:underline">
                    View all bookings
                  </button>
                </div>
                <div className="divide-y divide-lake/5">
                  {bookings.map((b) => (
                    <div key={b.id} className="py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-sm text-lake">{b.customer}</span>
                          <span className="text-xs text-mist">({b.email})</span>
                        </div>
                        <p className="text-xs text-mist mt-0.5">{b.tour} • {b.date}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                          b.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {b.status}
                        </span>
                        <span className="font-bold text-sm text-lake">{inr(b.amount)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TOURS */}
          {activeTab === 'tours' && (
            <div className="rounded-3xl border border-lake/10 bg-white/90 p-6 shadow-sm backdrop-blur">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="font-display text-xl font-bold text-lake">Tour Packages Catalog</h2>
                  <p className="text-xs text-mist">Manage active package listings and prices.</p>
                </div>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="btn btn-dark text-xs py-2 px-4 flex items-center gap-1.5"
                >
                  <Plus size={14} /> Add New Tour
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-lake/10 text-xs font-bold uppercase tracking-wider text-mist">
                      <th className="pb-3">Tour Name</th>
                      <th className="pb-3">Destination</th>
                      <th className="pb-3">Duration</th>
                      <th className="pb-3">Base Price</th>
                      <th className="pb-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-lake/5">
                    {tours.map((t) => (
                      <tr key={t._id} className="hover:bg-lake/[0.02]">
                        <td className="py-3 font-semibold text-lake">{t.title}</td>
                        <td className="py-3 text-mist">{t.destination.name}</td>
                        <td className="py-3 text-mist">{t.durationDays} Days</td>
                        <td className="py-3 font-semibold text-lake">{inr(t.basePrice)}</td>
                        <td className="py-3 text-right">
                          <button
                            onClick={() => handleDeleteTour(t._id)}
                            className="text-mist hover:text-rose-600 transition-colors p-1"
                            title="Delete tour"
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* DESTINATIONS */}
          {activeTab === 'destinations' && (
            <div className="rounded-3xl border border-lake/10 bg-white/90 p-6 shadow-sm backdrop-blur">
              <h2 className="font-display text-xl font-bold text-lake mb-4">Himalayan Destinations</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {destinations.map((d) => (
                  <div key={d._id} className="rounded-2xl border border-lake/10 p-4 bg-white/60">
                    <h3 className="font-display font-bold text-lake">{d.name}</h3>
                    <p className="text-xs text-mist mt-1 line-clamp-2">{d.description}</p>
                    <div className="mt-3 flex items-center justify-between text-xs pt-2 border-t border-lake/5">
                      <span className="text-mist">Best: {d.bestTime}</span>
                      <span className="font-bold text-lake">From {inr(d.startingPrice)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* HOTELS */}
          {activeTab === 'hotels' && (
            <div className="rounded-3xl border border-lake/10 bg-white/90 p-6 shadow-sm backdrop-blur">
              <h2 className="font-display text-xl font-bold text-lake mb-4">Partner Hotels & Houseboats</h2>
              <div className="divide-y divide-lake/5">
                {hotels.map((h) => (
                  <div key={h._id} className="py-4 flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-lake">{h.name}</h3>
                      <p className="text-xs text-mist mt-0.5">{h.destination?.name} • Rating: {h.rating} ★</p>
                      <div className="mt-2 flex gap-1 flex-wrap">
                        {h.amenities?.map((a, i) => (
                          <span key={i} className="rounded-md bg-glacier/60 px-2 py-0.5 text-[11px] text-lake">
                            {a}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-display font-bold text-lake">{inr(h.pricePerNight ?? 0)}/night</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CABS */}
          {activeTab === 'cabs' && (
            <div className="rounded-3xl border border-lake/10 bg-white/90 p-6 shadow-sm backdrop-blur">
              <h2 className="font-display text-xl font-bold text-lake mb-4">Mountain Cab Fleet</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {vehicles.map((v) => (
                  <div key={v._id} className="rounded-2xl border border-lake/10 p-5 bg-white/60">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-lake">{v.name}</h3>
                      <span className="text-xs uppercase px-2 py-0.5 rounded bg-lake/5 font-semibold text-lake">{v.category}</span>
                    </div>
                    <div className="mt-4 flex justify-between text-xs text-mist">
                      <span>Seats: {v.seats} Passengers</span>
                      <span>Rate: {inr(v.pricePerKm)}/km</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* BOOKINGS */}
          {activeTab === 'bookings' && (
            <div className="rounded-3xl border border-lake/10 bg-white/90 p-6 shadow-sm backdrop-blur">
              <h2 className="font-display text-xl font-bold text-lake mb-4">Customer Reservations</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-lake/10 text-xs font-bold uppercase tracking-wider text-mist">
                      <th className="pb-3">Booking ID</th>
                      <th className="pb-3">Customer</th>
                      <th className="pb-3">Package</th>
                      <th className="pb-3">Date</th>
                      <th className="pb-3">Amount</th>
                      <th className="pb-3">Status</th>
                      <th className="pb-3 text-right">Toggle Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-lake/5">
                    {bookings.map((b) => (
                      <tr key={b.id} className="hover:bg-lake/[0.02]">
                        <td className="py-3 font-semibold text-lake">{b.id}</td>
                        <td className="py-3">
                          <p className="font-medium text-lake">{b.customer}</p>
                          <p className="text-xs text-mist">{b.email}</p>
                        </td>
                        <td className="py-3 text-mist max-w-xs truncate">{b.tour}</td>
                        <td className="py-3 text-mist">{b.date}</td>
                        <td className="py-3 font-semibold text-lake">{inr(b.amount)}</td>
                        <td className="py-3">
                          <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                            b.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-800' :
                            b.status === 'Completed' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'
                          }`}>
                            {b.status}
                          </span>
                        </td>
                        <td className="py-3 text-right">
                          <button
                            onClick={() => handleToggleBookingStatus(b.id)}
                            className="text-xs font-semibold text-crocus hover:underline"
                          >
                            Advance Status
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* USERS & ROLES */}
          {activeTab === 'users' && (
            <div className="rounded-3xl border border-lake/10 bg-white/90 p-6 shadow-sm backdrop-blur">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="font-display text-xl font-bold text-lake">User Access & Role Management</h2>
                  <p className="text-xs text-mist">Promote or revoke admin privileges with instant server synchronization.</p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-lake/10 text-xs font-bold uppercase tracking-wider text-mist">
                      <th className="pb-3">User</th>
                      <th className="pb-3">Email</th>
                      <th className="pb-3">Verified</th>
                      <th className="pb-3">Role</th>
                      <th className="pb-3 text-right">Role Switcher</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-lake/5">
                    {usersList.map((u) => (
                      <tr key={u.id} className="hover:bg-lake/[0.02]">
                        <td className="py-3 font-semibold text-lake">{u.name}</td>
                        <td className="py-3 text-mist">{u.email}</td>
                        <td className="py-3">
                          {u.emailVerified ? (
                            <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                              <CheckCircle size={14} /> Yes
                            </span>
                          ) : (
                            <span className="text-xs text-mist">Pending</span>
                          )}
                        </td>
                        <td className="py-3">
                          <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                            u.role === 'admin' ? 'bg-saffron/20 text-deep border border-saffron/30' : 'bg-glacier text-lake'
                          }`}>
                            {u.role.toUpperCase()}
                          </span>
                        </td>
                        <td className="py-3 text-right">
                          <button
                            onClick={() => handleToggleUserRole(u.id)}
                            className={`rounded-xl px-3 py-1 text-xs font-semibold transition-all ${
                              u.role === 'admin'
                                ? 'bg-rose-50 text-rose-700 hover:bg-rose-100'
                                : 'bg-lake text-snow hover:bg-deep'
                            }`}
                          >
                            {u.role === 'admin' ? 'Revoke Admin' : 'Make Admin'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add Tour Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl">
            <h3 className="font-display text-xl font-bold text-lake">Add New Tour Package</h3>
            <form onSubmit={handleAddTour} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-lake">Package Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Kashmir Valley Bliss"
                  value={newTourTitle}
                  onChange={(e) => setNewTourTitle(e.target.value)}
                  className="mt-1 w-full rounded-2xl border border-lake/20 px-4 py-2.5 text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-lake">Destination</label>
                  <select
                    value={newTourDest}
                    onChange={(e) => setNewTourDest(e.target.value)}
                    className="mt-1 w-full rounded-2xl border border-lake/20 px-3 py-2.5 text-sm"
                  >
                    <option value="Srinagar">Srinagar</option>
                    <option value="Gulmarg">Gulmarg</option>
                    <option value="Pahalgam">Pahalgam</option>
                    <option value="Sonamarg">Sonamarg</option>
                    <option value="Ladakh">Ladakh</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-lake">Duration (Days)</label>
                  <input
                    type="number"
                    min="1"
                    max="30"
                    value={newTourDays}
                    onChange={(e) => setNewTourDays(e.target.value)}
                    className="mt-1 w-full rounded-2xl border border-lake/20 px-3 py-2.5 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-lake">Base Price (₹)</label>
                <input
                  type="number"
                  min="1000"
                  step="500"
                  value={newTourPrice}
                  onChange={(e) => setNewTourPrice(e.target.value)}
                  className="mt-1 w-full rounded-2xl border border-lake/20 px-4 py-2.5 text-sm"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="btn btn-ghost text-xs py-2 px-4 text-mist"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-dark text-xs py-2 px-5">
                  Save Tour
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
