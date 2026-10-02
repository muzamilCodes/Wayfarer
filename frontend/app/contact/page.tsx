'use client';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import PageHeader from '@/components/PageHeader';
import { post } from '@/lib/api';
import TiltCard3D from '@/components/3d/TiltCard3D';
import Reveal from '@/components/3d/Reveal';
import { Mail, Phone, MapPin, Send, MessageCircle, CheckCircle } from 'lucide-react';

const FloatingIcon3D = dynamic(() => import('@/components/3d/FloatingIcon3D'), {
  ssr: false,
});

const field =
  'mt-1 w-full rounded-2xl border border-lake/15 bg-white/90 px-4 py-3 text-sm text-ink placeholder:text-mist/70 shadow-sm transition-all focus:border-lake focus:bg-white focus:outline-none focus:ring-2 focus:ring-lake/20';

export default function Contact() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | string>('idle');
  const wa = process.env.NEXT_PUBLIC_WHATSAPP || '9682645127';

  return (
    <>
      <PageHeader
        title="Get in Touch with our Mountain Team"
        subtitle="Based in Srinagar and Leh. We respond to every inquiry within 2 to 4 business hours."
      />

      <div className="container-x grid gap-10 pb-16 pt-2 lg:grid-cols-[2fr_1fr]">
        <Reveal>
          <TiltCard3D maxTilt={4} glare={false}>
            <div className="rounded-3xl border border-lake/10 bg-white/80 p-8 shadow-sm backdrop-blur-xl sm:p-10">
              <div className="flex items-center justify-between border-b border-lake/10 pb-5 mb-6">
                <div>
                  <h2 className="font-display text-xl font-bold text-lake">
                    Send a Direct Inquiry
                  </h2>
                  <p className="text-xs text-mist">
                    Tell us your travel dates, preferred valleys, and group size.
                  </p>
                </div>
                {/* 3D Floating Envelope Icon */}
                <div className="h-16 w-16">
                  <FloatingIcon3D type="envelope" className="h-full w-full" />
                </div>
              </div>

              {status === 'done' ? (
                <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-8 text-center" role="status">
                  <CheckCircle className="mx-auto text-emerald-600 mb-3" size={40} />
                  <p className="font-display text-xl font-bold text-lake">Thank you!</p>
                  <p className="mt-1 text-sm text-mist">
                    Our Himalayan concierge has received your request and will connect with a curated plan.
                  </p>
                </div>
              ) : (
                <form
                  className="grid gap-4 sm:grid-cols-2"
                  onSubmit={async (e) => {
                    e.preventDefault();
                    setStatus('sending');
                    const f = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
                    Object.keys(f).forEach((k) => {
                      if (!f[k]) delete f[k];
                    });
                    try {
                      await post('/enquiries', f);
                      setStatus('done');
                    } catch (er) {
                      setStatus((er as Error).message);
                    }
                  }}
                >
                  <div>
                    <label className="text-xs font-semibold text-lake">Full Name</label>
                    <input name="name" required minLength={2} placeholder="John Doe" className={field} />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-lake">Email Address</label>
                    <input name="email" type="email" required placeholder="you@domain.com" className={field} />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-lake">Phone / WhatsApp</label>
                    <input name="phone" type="tel" placeholder="+91 98765 43210" className={field} />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-lake">Target Destination</label>
                    <input name="destination" placeholder="e.g. Kashmir & Gulmarg" className={field} />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-lake">Estimated Travel Date</label>
                    <input name="travelDate" type="date" className={field} />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-lake">Number of Travelers</label>
                    <input name="travellers" type="number" min={1} defaultValue={2} className={field} />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-xs font-semibold text-lake">Custom Preferences or Questions</label>
                    <textarea
                      name="message"
                      rows={4}
                      placeholder="Special stay requests, honeymoon arrangement, ski gear, or dietary preferences…"
                      className={field}
                    />
                  </div>

                  {status !== 'idle' && status !== 'sending' && (
                    <p role="alert" className="text-xs font-semibold text-rose-600 sm:col-span-2">
                      {status}
                    </p>
                  )}

                  <div className="sm:col-span-2 pt-2">
                    <button
                      disabled={status === 'sending'}
                      className="btn btn-dark w-full shadow-lg shadow-lake/15 flex items-center justify-center gap-2"
                    >
                      <Send size={15} />
                      <span>{status === 'sending' ? 'Sending to Concierge…' : 'Submit Inquiry'}</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </TiltCard3D>
        </Reveal>

        {/* Sidebar contact info */}
        <div className="space-y-6">
          <Reveal delay={0.2}>
            <div className="rounded-3xl border border-lake/10 bg-white/80 p-6 shadow-sm backdrop-blur-xl">
              <h3 className="font-display text-lg font-bold text-lake mb-4">Direct WhatsApp Support</h3>
              <p className="text-xs text-mist leading-relaxed mb-4">
                Need immediate road conditions or gondola slot advice? Message our local operations desk directly.
              </p>
              <a
                className="btn btn-primary w-full shadow-md shadow-saffron/20 flex items-center justify-center gap-2 text-xs"
                href={`https://wa.me/${wa}?text=Hello%20Wayfarer%2C%20I%20would%20like%20to%20inquire%20about%20a%20Himalayan%20tour.`}
                target="_blank"
                rel="noreferrer"
              >
                <MessageCircle size={16} />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="rounded-3xl border border-lake/10 bg-gradient-to-br from-lake to-deep p-6 text-snow shadow-sm">
              <h3 className="font-display text-lg font-bold">Regional Desks</h3>
              <div className="mt-4 space-y-3 text-xs text-glacier">
                <div className="flex items-start gap-2.5">
                  <MapPin size={16} className="text-saffron shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-snow block">Srinagar Main Office</strong>
                    <span>Boulevard Road, Opposite Ghat No. 7, Dal Lake, Srinagar 190001</span>
                  </div>
                </div>
                <div className="flex items-start gap-2.5 pt-2">
                  <MapPin size={16} className="text-saffron shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-snow block">Leh Ladakh Field Desk</strong>
                    <span>Fort Road, Main Market, Leh 194101</span>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </>
  );
}
