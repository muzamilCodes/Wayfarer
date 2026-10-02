'use client';
import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useAuth } from '@/lib/auth';
import {
  User as UserIcon,
  Calendar,
  Heart,
  ShieldCheck,
  LogOut,
  Clock,
  ArrowRight,
  AlertCircle,
} from 'lucide-react';
import { inr } from '@/lib/format';

function AccountContent() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const errorParam = searchParams.get('error');
  const [activeTab, setActiveTab] = useState<'profile' | 'bookings' | 'saved'>('profile');

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login?next=/account');
    }
  }, [loading, user, router]);

  if (loading || !user) {
    return (
      <div className="container-x py-32 text-center" role="status">
        <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-lake border-t-transparent" />
        <p className="mt-4 text-sm font-medium text-mist">Loading your account…</p>
      </div>
    );
  }

  const mockBookings = [
    {
      id: 'WF-7829',
      title: 'Kashmir Paradise: 7-Day Valley Odyssey',
      dates: 'May 12 – May 18, 2026',
      travellers: '2 Adults',
      status: 'Confirmed',
      amount: 37000,
      image: 'https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&w=600&q=80',
    },
  ];

  const mockSavedTrips = [
    {
      id: 'saved-1',
      title: 'Gulmarg Winter Wonderland Ski & Snow Tour',
      duration: '5 Days / 4 Nights',
      price: 24500,
      slug: 'gulmarg-winter-ski',
      image: 'https://images.unsplash.com/photo-1614082242765-7c98ca0f3df3?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'saved-2',
      title: 'Ladakh High Passes & Pangong Expedition',
      duration: '8 Days / 7 Nights',
      price: 29800,
      slug: 'ladakh-high-passes',
      image: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=600&q=80',
    },
  ];

  return (
    <div className="min-h-screen bg-snow/50 py-12">
      <div className="container-x">
        {errorParam === 'admin_required' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 flex items-center gap-3 rounded-2xl border border-rose-500/20 bg-rose-500/10 p-4 text-sm text-rose-800"
          >
            <AlertCircle size={20} className="shrink-0 text-rose-600" />
            <div>
              <p className="font-semibold">Administrator Access Required</p>
              <p className="text-xs text-rose-700">
                You must have an administrative role to access the /admin control center.
              </p>
            </div>
          </motion.div>
        )}

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-lake/10 pb-8">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-lake text-xl font-bold text-snow shadow-lg shadow-lake/20">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-lake">
                  Welcome, {user.name}
                </h1>
                <p className="text-sm text-mist">{user.email}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {user.role === 'admin' && (
              <Link
                href="/admin"
                className="btn btn-primary shadow-md shadow-saffron/20 text-xs py-2.5 px-5 flex items-center gap-2"
              >
                <ShieldCheck size={16} />
                <span>Admin Dashboard</span>
              </Link>
            )}
            <button
              onClick={async () => {
                await signOut();
                router.push('/');
              }}
              className="btn btn-ghost text-xs py-2.5 px-4 text-lake flex items-center gap-1.5"
            >
              <LogOut size={16} />
              <span>Log out</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mt-8 flex gap-2 border-b border-lake/10 pb-3">
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition-all ${
              activeTab === 'profile'
                ? 'bg-lake text-snow shadow'
                : 'text-mist hover:text-lake'
            }`}
          >
            <UserIcon size={16} />
            <span>Profile & Account</span>
          </button>

          <button
            onClick={() => setActiveTab('bookings')}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition-all ${
              activeTab === 'bookings'
                ? 'bg-lake text-snow shadow'
                : 'text-mist hover:text-lake'
            }`}
          >
            <Calendar size={16} />
            <span>My Bookings ({mockBookings.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('saved')}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition-all ${
              activeTab === 'saved'
                ? 'bg-lake text-snow shadow'
                : 'text-mist hover:text-lake'
            }`}
          >
            <Heart size={16} />
            <span>Saved Trips ({mockSavedTrips.length})</span>
          </button>
        </div>

        {/* Tab Contents */}
        <div className="mt-8">
          {activeTab === 'profile' && (
            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-3xl border border-lake/10 bg-white/90 p-6 shadow-sm backdrop-blur md:col-span-2">
                <h2 className="font-display text-xl font-bold text-lake">Profile Information</h2>
                <dl className="mt-6 space-y-4 divide-y divide-lake/5 text-sm">
                  <div className="flex justify-between pt-2">
                    <dt className="text-mist">Full Name</dt>
                    <dd className="font-semibold text-lake">{user.name}</dd>
                  </div>
                  <div className="flex justify-between pt-4">
                    <dt className="text-mist">Email Address</dt>
                    <dd className="flex items-center gap-2 font-semibold text-lake">
                      <span>{user.email}</span>
                      {user.emailVerified ? (
                        <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-semibold text-emerald-800">
                          Verified
                        </span>
                      ) : (
                        <Link
                          href="/verify-email"
                          className="rounded-full bg-amber-100 px-2 py-0.5 text-[11px] font-semibold text-amber-800 hover:underline"
                        >
                          Verify now
                        </Link>
                      )}
                    </dd>
                  </div>
                  <div className="flex justify-between pt-4">
                    <dt className="text-mist">User Role</dt>
                    <dd className="font-semibold capitalize text-lake">
                      {user.role}
                    </dd>
                  </div>
                  <div className="flex justify-between pt-4">
                    <dt className="text-mist">Himalayan Travel Status</dt>
                    <dd className="font-semibold text-crocus">Wayfarer Explorer</dd>
                  </div>
                </dl>
              </div>

              <div className="rounded-3xl border border-lake/10 bg-gradient-to-br from-lake to-deep p-6 text-snow shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-saffron">
                    <ShieldCheck size={20} />
                    <span className="text-xs font-bold uppercase tracking-wider">
                      Security & Privacy
                    </span>
                  </div>
                  <h3 className="mt-3 font-display text-lg font-bold">
                    Authenticated Session
                  </h3>
                  <p className="mt-2 text-xs text-glacier leading-relaxed">
                    Your session is guarded with encrypted httpOnly tokens. Passwords are securely hashed with Argon2id.
                  </p>
                </div>
                <div className="mt-6">
                  <Link href="/plan" className="btn btn-primary w-full text-xs py-2.5">
                    Plan New Expedition
                  </Link>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'bookings' && (
            <div className="space-y-4">
              <h2 className="font-display text-xl font-bold text-lake">Active & Past Bookings</h2>
              {mockBookings.map((b) => (
                <div
                  key={b.id}
                  className="overflow-hidden rounded-3xl border border-lake/10 bg-white/90 p-5 shadow-sm backdrop-blur transition-all hover:border-lake/20 sm:flex sm:items-center sm:justify-between gap-6"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={b.image}
                      alt={b.title}
                      className="h-20 w-24 rounded-2xl object-cover"
                    />
                    <div>
                      <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-800">
                        {b.status} • #{b.id}
                      </span>
                      <h3 className="mt-1 font-display text-base font-bold text-lake">
                        {b.title}
                      </h3>
                      <div className="mt-1 flex items-center gap-3 text-xs text-mist">
                        <span className="flex items-center gap-1">
                          <Calendar size={13} /> {b.dates}
                        </span>
                        <span>•</span>
                        <span>{b.travellers}</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 sm:mt-0 flex items-center justify-between sm:flex-col sm:items-end gap-2">
                    <p className="font-display text-lg font-bold text-lake">{inr(b.amount)}</p>
                    <Link
                      href={`/tours/kashmir-7-days`}
                      className="text-xs font-semibold text-crocus hover:underline flex items-center gap-1"
                    >
                      <span>View itinerary</span>
                      <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'saved' && (
            <div className="space-y-4">
              <h2 className="font-display text-xl font-bold text-lake">Saved Himalayan Itineraries</h2>
              <div className="grid gap-5 sm:grid-cols-2">
                {mockSavedTrips.map((trip) => (
                  <div
                    key={trip.id}
                    className="overflow-hidden rounded-3xl border border-lake/10 bg-white/90 shadow-sm backdrop-blur transition-all hover:border-lake/25 hover:shadow-md"
                  >
                    <img
                      src={trip.image}
                      alt={trip.title}
                      className="h-44 w-full object-cover"
                    />
                    <div className="p-5">
                      <div className="flex items-center gap-2 text-xs text-mist">
                        <Clock size={13} />
                        <span>{trip.duration}</span>
                      </div>
                      <h3 className="mt-1 font-display text-base font-bold text-lake">
                        {trip.title}
                      </h3>
                      <div className="mt-4 flex items-center justify-between pt-2 border-t border-lake/5">
                        <div>
                          <span className="text-[11px] text-mist">Starting from</span>
                          <p className="font-display text-base font-bold text-lake">
                            {inr(trip.price)}
                          </p>
                        </div>
                        <Link
                          href={`/tours/${trip.slug}`}
                          className="btn btn-dark text-xs py-2 px-4"
                        >
                          Explore
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AccountPage() {
  return (
    <Suspense
      fallback={
        <div className="container-x py-32 text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-lake border-t-transparent" />
          <p className="mt-4 text-sm font-medium text-mist">Loading account…</p>
        </div>
      }
    >
      <AccountContent />
    </Suspense>
  );
}
