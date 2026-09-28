'use client';
import { useState } from 'react';
import { discounted, inr } from '@/lib/format';

/** Displays an estimate only. The backend recomputes the real price at checkout. */
export default function BookingPanel({ base, discount, max }: { base: number; discount: number; max: number }) {
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [date, setDate] = useState('');
  const [notice, setNotice] = useState(false);
  const unit = discounted(base, discount);
  const total = unit * adults + Math.round(unit * 0.7) * children;
  const field = 'mt-1 w-full rounded-xl border border-lake/20 bg-white px-3 py-2';

  return (
    <aside id="book" className="space-y-4 rounded-2xl border border-lake/10 bg-white p-6 shadow-sm lg:sticky lg:top-24">
      <p><span className="font-display text-3xl font-bold text-lake">{inr(unit)}</span> <span className="text-sm text-mist">per adult</span></p>
      <label className="block text-sm">Travel date
        <input type="date" value={date} min={new Date().toISOString().slice(0, 10)} onChange={(e) => setDate(e.target.value)} className={field} /></label>
      <div className="grid grid-cols-2 gap-3">
        <label className="text-sm">Adults
          <input type="number" min={1} max={max} value={adults} onChange={(e) => setAdults(Math.max(1, Math.min(max, +e.target.value || 1)))} className={field} /></label>
        <label className="text-sm">Children
          <input type="number" min={0} max={max} value={children} onChange={(e) => setChildren(Math.max(0, Math.min(max, +e.target.value || 0)))} className={field} /></label>
      </div>
      <div className="flex justify-between border-t border-lake/10 pt-4 font-semibold text-lake"><span>Estimated total</span><span>{inr(total)}</span></div>
      <button disabled={!date} onClick={() => setNotice(true)} className="btn btn-primary w-full disabled:cursor-not-allowed disabled:opacity-50">Book now</button>
      {!date && <p className="text-xs text-mist">Pick a travel date to continue.</p>}
      {notice && <p role="status" className="rounded-xl bg-glacier p-3 text-sm text-lake">Checkout and payment are not connected yet. They arrive in the booking phase.</p>}
      <button className="btn btn-ghost w-full text-lake">Add to wishlist</button>
    </aside>
  );
}
