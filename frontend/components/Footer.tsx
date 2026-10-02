'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Facebook, Instagram, Twitter, Youtube, Send, Check } from 'lucide-react';

export default function Footer() {
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
      setSubscribed(false);
    }, 4000);
  };

  return (
    <footer className="mt-20 bg-[#0A2733] text-slate-300">
      <div className="container-x py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand info */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2.5 font-display text-2xl font-extrabold text-white">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#E85D04] text-white shadow-md font-black text-sm">
                W
              </span>
              <span>Wayfarer</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm text-slate-400 leading-relaxed">
              Wayfarer is your trusted travel partner for discovering amazing places and unforgettable experiences across all 20 districts of Jammu & Kashmir.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-[#E85D04] text-white transition-colors"
              >
                <Facebook size={16} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-[#E85D04] text-white transition-colors"
              >
                <Instagram size={16} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-[#E85D04] text-white transition-colors"
              >
                <Twitter size={16} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-[#E85D04] text-white transition-colors"
              >
                <Youtube size={16} />
              </a>
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Company</h4>
            <ul className="mt-4 space-y-3 text-sm text-slate-400">
              <li><Link href="/about" className="hover:text-[#E85D04] transition-colors">About Us</Link></li>
              <li><Link href="/careers" className="hover:text-[#E85D04] transition-colors">Careers</Link></li>
              <li><Link href="/press" className="hover:text-[#E85D04] transition-colors">Press & Media</Link></li>
              <li><Link href="/blog" className="hover:text-[#E85D04] transition-colors">Travel Guides</Link></li>
              <li><Link href="/sustainability" className="hover:text-[#E85D04] transition-colors">Sustainability</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Support</h4>
            <ul className="mt-4 space-y-3 text-sm text-slate-400">
              <li><Link href="/contact" className="hover:text-[#E85D04] transition-colors">Help Center</Link></li>
              <li><Link href="/faq" className="hover:text-[#E85D04] transition-colors">FAQ&apos;s</Link></li>
              <li><Link href="/plan" className="hover:text-[#E85D04] transition-colors">Booking Tools</Link></li>
              <li><Link href="/terms" className="hover:text-[#E85D04] transition-colors">Terms & Conditions</Link></li>
              <li><Link href="/privacy" className="hover:text-[#E85D04] transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Newsletter</h4>
            <p className="mt-4 text-sm text-slate-400 leading-relaxed">
              Subscribe to get the best travel deals and inspiration straight to your inbox.
            </p>
            <form onSubmit={handleSubscribe} className="mt-4">
              <div className="flex flex-col gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full rounded-lg bg-white/10 border border-white/10 px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#E85D04] focus:border-transparent"
                />
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-[#E85D04] hover:bg-[#dc5400] px-4 py-2.5 text-sm font-bold text-white transition-colors shadow-sm"
                >
                  {subscribed ? (
                    <>
                      <Check size={14} /> Subscribed!
                    </>
                  ) : (
                    'Subscribe'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Top Destinations row */}
        <div className="mt-10 border-t border-white/10 pt-8">
          <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Top Destinations</h4>
          <div className="flex flex-wrap gap-3">
            {['Srinagar', 'Gulmarg', 'Pahalgam', 'Sonamarg', 'Gurez Valley', 'Vaishno Devi', 'Patnitop', 'Bhaderwah', 'Doodhpathri', 'Kishtwar'].map((dest) => (
              <Link
                key={dest}
                href={`/destinations?q=${encodeURIComponent(dest)}`}
                className="rounded-full bg-white/5 border border-white/10 px-3.5 py-1.5 text-xs font-medium text-slate-400 hover:bg-[#E85D04]/20 hover:text-[#E85D04] hover:border-[#E85D04]/30 transition-all"
              >
                {dest}
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom copyright & payment cards */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Wayfarer. All rights reserved.</p>

          {/* Payment Badges */}
          <div className="flex items-center gap-2">
            <span className="rounded bg-white px-2.5 py-1 text-[10px] font-bold text-blue-900 shadow-sm">VISA</span>
            <span className="rounded bg-white px-2.5 py-1 text-[10px] font-bold text-red-600 shadow-sm">Mastercard</span>
            <span className="rounded bg-white px-2.5 py-1 text-[10px] font-bold text-blue-600 shadow-sm">AMEX</span>
            <span className="rounded bg-white px-2.5 py-1 text-[10px] font-bold text-amber-600 shadow-sm">DISCOVER</span>
            <span className="rounded bg-white px-2.5 py-1 text-[10px] font-bold text-blue-700 shadow-sm">PayPal</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
