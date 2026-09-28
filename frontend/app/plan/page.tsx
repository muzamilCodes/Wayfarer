'use client';
import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import PageHeader from '@/components/PageHeader';
import { inr } from '@/lib/format';
import { post } from '@/lib/api';

const HOTEL = { budget: 1800, standard: 3500, premium: 6500, luxury: 12000 } as const;
const CAR = { sedan: 3200, suv: 4800, tempo: 8500 } as const; // per day incl. driver
const STOPS = ['Srinagar', 'Gulmarg', 'Pahalgam', 'Sonamarg'];
const field = 'mt-1 w-full rounded-xl border border-lake/20 bg-white px-3 py-2';

export default function Plan() {
  const [adults, setAdults] = useState(2); const [children, setChildren] = useState(0); const [days, setDays] = useState(5);
  const [hotel, setHotel] = useState<keyof typeof HOTEL>('standard'); const [car, setCar] = useState<keyof typeof CAR>('sedan');
  const [acts, setActs] = useState(2); const [email, setEmail] = useState(''); const [sent, setSent] = useState('');

  const est = useMemo(() => {
    const people = adults + children, rooms = Math.ceil((adults + children * 0.5) / 2);
    const h = HOTEL[hotel] * rooms * days, t = CAR[car] * days, a = 1500 * acts * people, f = 700 * people * days;
    return { rooms, h, t, a, f, total: h + t + a + f };
  }, [adults, children, days, hotel, car, acts]);

  const itinerary = Array.from({ length: days }, (_, i) => `Day ${i + 1}: ${STOPS[Math.min(STOPS.length - 1, Math.floor((i * STOPS.length) / days))]}`);
  const row = (l: string, v: number) => <div className="flex justify-between py-2 text-sm"><span className="text-mist">{l}</span><span>{inr(v)}</span></div>;
  const num = (v: number, set: (n: number) => void, min: number, max: number) => (e: React.ChangeEvent<HTMLInputElement>) => set(Math.max(min, Math.min(max, +e.target.value || min)));

  return (<>
    <PageHeader title="Plan my trip" subtitle="Adjust anything and see a Kashmir estimate update instantly." />
    <div className="container-x grid gap-8 pb-8 lg:grid-cols-[3fr_2fr]">
      <div className="grid gap-4 rounded-2xl border border-lake/10 bg-white p-6 sm:grid-cols-2">
        <label className="text-sm">Adults<input type="number" value={adults} onChange={num(adults, setAdults, 1, 30)} className={field} /></label>
        <label className="text-sm">Children<input type="number" value={children} onChange={num(children, setChildren, 0, 30)} className={field} /></label>
        <label className="text-sm">Days<input type="number" value={days} onChange={num(days, setDays, 2, 14)} className={field} /></label>
        <label className="text-sm">Activities per person<input type="number" value={acts} onChange={num(acts, setActs, 0, 10)} className={field} /></label>
        <label className="text-sm">Hotel category<select value={hotel} onChange={(e) => setHotel(e.target.value as keyof typeof HOTEL)} className={field}>{Object.keys(HOTEL).map((k) => <option key={k} value={k}>{k}</option>)}</select></label>
        <label className="text-sm">Transport<select value={car} onChange={(e) => setCar(e.target.value as keyof typeof CAR)} className={field}><option value="sedan">Sedan</option><option value="suv">SUV</option><option value="tempo">Tempo Traveller</option></select></label>
        <div className="sm:col-span-2"><h2 className="font-display text-lg font-semibold text-lake">Suggested route</h2>
          <ol className="mt-2 grid gap-1 text-sm sm:grid-cols-2">{itinerary.map((d) => <li key={d} className="rounded-lg bg-glacier px-3 py-1.5 text-lake">{d}</li>)}</ol></div>
      </div>
      <aside className="h-fit space-y-2 rounded-2xl bg-lake p-6 text-snow lg:sticky lg:top-24">
        <h2 className="font-display text-xl font-semibold">Estimated cost</h2>
        <div className="divide-y divide-white/10 [&_span:first-child]:!text-glacier">{row(`Hotels (${est.rooms} rooms)`, est.h)}{row('Transport', est.t)}{row('Activities', est.a)}{row('Food', est.f)}</div>
        <motion.p key={est.total} initial={{ scale: 1.06 }} animate={{ scale: 1 }} className="pt-3 font-display text-4xl font-bold text-saffron">{inr(est.total)}</motion.p>
        <p className="text-xs text-glacier">Approximate. Final price depends on season and availability.</p>
        {sent ? <p role="status" className="rounded-xl bg-white/10 p-3 text-sm">{sent}</p> : (
          <form className="space-y-2 pt-3" onSubmit={async (e) => {
            e.preventDefault();
            try { await post('/enquiries', { name: email.split('@')[0] || 'Guest', email, destination: 'Kashmir', travellers: adults + children,
              message: `Plan: ${days} days, ${hotel} hotels, ${car}, ${acts} activities each. Estimate ${inr(est.total)}.` }); setSent('Sent. Our team will confirm this plan with you.'); }
            catch (er) { setSent((er as Error).message); }
          }}>
            <label className="sr-only" htmlFor="pe">Your email</label>
            <input id="pe" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email" className="w-full rounded-xl px-3 py-2 text-ink" />
            <button className="btn btn-primary w-full">Send this plan to our team</button>
          </form>)}
      </aside>
    </div></>);
}
