'use client';
import { useState } from 'react';
import PageHeader from '@/components/PageHeader';
import { post } from '@/lib/api';

const field = 'mt-1 w-full rounded-xl border border-lake/20 bg-white px-4 py-3';
export default function Contact() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | string>('idle');
  const wa = process.env.NEXT_PUBLIC_WHATSAPP;
  return (<>
    <PageHeader title="Contact us" subtitle="Tell us where and when. We reply within a day." />
    <div className="container-x grid gap-10 pb-8 lg:grid-cols-[2fr_1fr]">
      {status === 'done' ? <p role="status" className="rounded-2xl bg-glacier p-8 text-lake">Thanks! Our team will contact you shortly.</p> : (
        <form className="grid gap-4 sm:grid-cols-2" onSubmit={async (e) => {
          e.preventDefault(); setStatus('sending');
          const f = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
          Object.keys(f).forEach((k) => { if (!f[k]) delete f[k]; });
          try { await post('/enquiries', f); setStatus('done'); } catch (er) { setStatus((er as Error).message); }
        }}>
          <label className="text-sm">Name<input name="name" required minLength={2} className={field} /></label>
          <label className="text-sm">Email<input name="email" type="email" required className={field} /></label>
          <label className="text-sm">Phone<input name="phone" type="tel" className={field} /></label>
          <label className="text-sm">Destination<input name="destination" className={field} /></label>
          <label className="text-sm">Travel date<input name="travelDate" type="date" className={field} /></label>
          <label className="text-sm">Travellers<input name="travellers" type="number" min={1} className={field} /></label>
          <label className="text-sm sm:col-span-2">Message<textarea name="message" rows={5} className={field} /></label>
          {status !== 'idle' && status !== 'sending' && <p role="alert" className="text-sm text-red-700 sm:col-span-2">{status}</p>}
          <button disabled={status === 'sending'} className="btn btn-dark sm:col-span-2">{status === 'sending' ? 'Sending…' : 'Send enquiry'}</button>
        </form>)}
      <aside className="space-y-3 text-sm">
        {wa && <a className="btn btn-primary w-full" href={`https://wa.me/${wa}`} target="_blank" rel="noreferrer">Chat on WhatsApp</a>}
        <p className="text-mist">You can also send the form and we will call you back.</p>
      </aside>
    </div></>);
}
