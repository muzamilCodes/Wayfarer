'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Facebook, Instagram, Twitter, Youtube, Check } from 'lucide-react';

export default function Footer() {
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => { setEmail(''); setSubscribed(false); }, 4000);
  };

  return (
    <footer className="bg-[#0B1528] text-gray-400">
      <div className="container-x py-14">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">

          {/* Column 1: Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2 font-sans text-xl font-extrabold text-white">
              <svg className="w-6 h-6 text-[#3B71FE]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
              </svg>
              <span>Paradise Journey</span>
            </Link>
            <p className="mt-4 text-[13px] text-gray-400 leading-relaxed">
              Paradise Journey is your trusted travel partner for discovering amazing places and unforgettable experiences around Jammu &amp; Kashmir.
            </p>
            <div className="mt-5 flex items-center gap-2.5">
              {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-gray-300 hover:bg-[#FF5B00] hover:text-white transition-colors">
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Company */}
          <div>
            <h4 className="text-[12px] font-bold uppercase tracking-wider text-white">COMPANY</h4>
            <ul className="mt-4 space-y-2.5 text-[13px]">
              {[['About Us', '/about'], ['Careers', '/careers'], ['Press & Media', '/press'], ['Travel Guides', '/blog'], ['Sustainability', '/sustainability']].map(([label, href]) => (
                <li key={href}><Link href={href} className="hover:text-white transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Column 3: Support */}
          <div>
            <h4 className="text-[12px] font-bold uppercase tracking-wider text-white">SUPPORT</h4>
            <ul className="mt-4 space-y-2.5 text-[13px]">
              {[['Help Center', '/contact'], ["FAQ's", '/faq'], ['Booking Tools', '/plan'], ['Terms & Conditions', '/terms'], ['Privacy Policy', '/privacy']].map(([label, href]) => (
                <li key={href}><Link href={href} className="hover:text-white transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Column 4: Top Destinations */}
          <div>
            <h4 className="text-[12px] font-bold uppercase tracking-wider text-white">TOP DESTINATIONS</h4>
            <ul className="mt-4 space-y-2.5 text-[13px]">
              {[['Srinagar', '/destinations?q=Srinagar'], ['Gulmarg', '/destinations?q=Gulmarg'], ['Pahalgam', '/destinations?q=Pahalgam'], ['Sonamarg', '/destinations?q=Sonamarg'], ['Vaishno Devi', '/destinations?q=Vaishno+Devi'], ['Bhaderwah', '/destinations?q=Bhaderwah']].map(([label, href]) => (
                <li key={label}><Link href={href} className="hover:text-white transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Column 5: Newsletter */}
          <div>
            <h4 className="text-[12px] font-bold uppercase tracking-wider text-white">NEWSLETTER</h4>
            <p className="mt-4 text-[13px] text-gray-400 leading-relaxed">
              Subscribe to get the best travel deals and inspiration straight to your inbox.
            </p>
            <form onSubmit={handleSubscribe} className="mt-4 flex rounded-lg overflow-hidden bg-white shadow-sm">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 px-3 py-2.5 text-[13px] text-gray-800 placeholder:text-gray-400 focus:outline-none min-w-0 bg-transparent"
              />
              <button type="submit" className="shrink-0 bg-[#FF5B00] hover:bg-[#E04F00] px-4 text-[12.5px] font-bold text-white transition-colors">
                {subscribed ? <Check size={16} /> : 'Subscribe'}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10 pt-6 text-[12px] text-gray-400">
          <p>© 2026 Paradise Journey. All rights reserved.</p>
          <div className="flex items-center gap-1.5">
            {['VISA', 'Mastercard', 'AMEX', 'DISCOVER', 'PayPal'].map(card => (
              <span key={card} className="rounded bg-white px-2 py-0.5 text-[10px] font-bold text-gray-800 shadow-sm">{card}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
