'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import Link from 'next/link';
import { inr } from '@/lib/format';
import { Calendar, ArrowRight, ShieldCheck } from 'lucide-react';

export default function BookingsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login?next=/bookings');
    }
  }, [loading, user, router]);

  if (loading || !user) {
    return (
      <div className="container-x py-32 text-center">
        <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-lake border-t-transparent" />
        <p className="mt-4 text-sm font-medium text-mist">Loading bookings…</p>
      </div>
    );
  }

  const bookings = [
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

  return (
    <div className="container-x py-14">
      <div className="flex items-center justify-between border-b border-lake/10 pb-6">
        <div>
          <h1 className="text-3xl font-bold text-lake">My Himalayan Bookings</h1>
          <p className="mt-1 text-sm text-mist">Track active reservations, vouchers, and travel dates.</p>
        </div>
        <Link href="/plan" className="btn btn-primary text-xs py-2.5 px-5">
          Plan Another Trip
        </Link>
      </div>

      <div className="mt-8 space-y-4">
        {bookings.map((b) => (
          <div
            key={b.id}
            className="overflow-hidden rounded-3xl border border-lake/10 bg-white/90 p-6 shadow-sm backdrop-blur transition-all hover:border-lake/20 sm:flex sm:items-center sm:justify-between gap-6"
          >
            <div className="flex items-center gap-4">
              <img
                src={b.image}
                alt={b.title}
                className="h-24 w-28 rounded-2xl object-cover"
              />
              <div>
                <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-800">
                  {b.status} • #{b.id}
                </span>
                <h3 className="mt-1 font-display text-lg font-bold text-lake">
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
              <p className="font-display text-xl font-bold text-lake">{inr(b.amount)}</p>
              <span className="text-xs text-emerald-600 flex items-center gap-1">
                <ShieldCheck size={14} /> Voucher Issued
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
