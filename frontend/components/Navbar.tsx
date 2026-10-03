'use client';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Menu, X, User as UserIcon, ShieldCheck, Calendar, LogOut, ChevronDown } from 'lucide-react';
import { useAuth } from '@/lib/auth';

const links: [string, string][] = [
  ['Home', '/'],
  ['Destinations', '/destinations'],
  ['Tours', '/tours'],
  ['Hotels', '/hotels'],
  ['Cabs', '/cabs'],
  ['Blog', '/blog'],
  ['Admin', '/admin'],
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, loading, signOut } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const h = (e: MouseEvent) => { if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) setMenuOpen(false); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  const handleLogout = async () => { setMenuOpen(false); await signOut(); router.push('/'); };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
      <div className="container-x flex h-[64px] items-center justify-between">

        {/* Logo - Paradise Journey */}
        <Link href="/" className="group flex items-center gap-2.5 font-sans text-xl font-extrabold text-gray-900 tracking-tight">
          <svg className="w-7 h-7 text-[#3B71FE] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
          </svg>
          <span className="text-[21px] font-extrabold text-gray-900 tracking-tight">Paradise Journey</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-6 lg:flex" aria-label="Main">
          {[
            ['Home', '/'],
            ['Destinations', '/destinations'],
            ['Tours', '/tours'],
            ['Hotels', '/hotels'],
            ['Flights', '/tours'],
            ['Blog', '/blog'],
          ].map(([label, href]) => {
            const active = pathname === href || (href !== '/' && pathname.startsWith(href));
            return (
              <Link
                key={label}
                href={href}
                className={`relative py-5 text-[14px] transition-colors ${
                  active
                    ? 'font-bold text-[#3B71FE]'
                    : 'font-medium text-gray-700 hover:text-gray-950'
                }`}
              >
                {label}
                {active && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2.5px] rounded-full bg-[#3B71FE]" />
                )}
              </Link>
            );
          })}
          <div className="flex items-center gap-1 text-[14px] font-medium text-gray-700 hover:text-gray-950 cursor-pointer">
            <span>Pages</span>
            <ChevronDown size={14} className="text-gray-500" />
          </div>
        </nav>

        {/* Right side */}
        <div className="hidden items-center gap-4 lg:flex">
          <Link
            href="/admin"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border border-slate-200 bg-slate-50 text-slate-700 hover:bg-blue-50 hover:text-[#3B71FE] hover:border-blue-200 transition"
          >
            <ShieldCheck size={14} className="text-[#3B71FE]" />
            <span>Admin Studio</span>
          </Link>

          {loading ? (
            <div className="h-8 w-16 animate-pulse rounded-full bg-gray-100" />
          ) : user ? (
            <div className="relative" ref={dropdownRef}>
              <button onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center gap-2 rounded-full border border-gray-200 bg-white py-1.5 pl-2 pr-3 text-[13px] font-semibold text-gray-700 hover:bg-gray-50 transition"
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#E85D04] text-xs font-bold text-white">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="max-w-[90px] truncate">{user.name.split(' ')[0]}</span>
                <ChevronDown size={14} className={`text-gray-400 transition-transform ${menuOpen ? 'rotate-180' : ''}`} />
              </button>
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-52 rounded-xl border border-gray-200 bg-white p-1.5 shadow-xl animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="border-b border-gray-100 px-3 py-2">
                    <p className="text-xs font-semibold text-gray-900 truncate">{user.name}</p>
                    <p className="text-[11px] text-gray-400 truncate">{user.email}</p>
                    {user.role === 'admin' && <span className="mt-1 inline-flex items-center gap-1 rounded bg-orange-100 px-1.5 py-0.5 text-[10px] font-bold text-[#E85D04]"><ShieldCheck size={10} /> Admin</span>}
                  </div>
                  <div className="py-1">
                    <Link href="/account" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50"><UserIcon size={14} className="text-gray-400" /> Profile</Link>
                    <Link href="/bookings" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50"><Calendar size={14} className="text-gray-400" /> Bookings</Link>
                    {user.role === 'admin' && <Link href="/admin" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium text-[#E85D04] hover:bg-orange-50"><ShieldCheck size={14} /> Admin</Link>}
                  </div>
                  <div className="border-t border-gray-100 pt-1">
                    <button onClick={handleLogout} className="flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium text-red-500 hover:bg-red-50"><LogOut size={14} /> Log out</button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link href="/login" className="inline-flex items-center gap-1.5 text-[14px] font-medium text-gray-700 hover:text-gray-950 transition">
                <UserIcon size={16} className="text-gray-500" />
                <span>Sign In</span>
              </Link>
              <Link href="/register" className="text-[14px] font-medium text-gray-700 hover:text-gray-950 transition">
                Register
              </Link>
            </>
          )}
          <Link href="/plan" className="rounded-xl bg-[#FF5B00] hover:bg-[#E04F00] text-white px-5 py-2.5 text-[13px] font-semibold shadow-sm transition hover:shadow-md">
            Explore Tours
          </Link>
        </div>

        {/* Mobile toggle */}
        <button className="rounded-lg p-2 text-gray-700 hover:bg-gray-100 lg:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <nav className="container-x pb-5 lg:hidden border-t border-gray-100">
          <div className="pt-3 space-y-1">
            {links.map(([label, href]) => {
              const active = pathname === href || (href !== '/' && pathname.startsWith(href));
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className={`block py-2.5 px-3.5 rounded-xl text-sm font-semibold transition ${
                    active ? 'bg-blue-50 text-[#3B71FE]' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </div>
          <div className="mt-3 border-t border-gray-100 pt-3 space-y-1">
            {user ? (
              <>
                <Link href="/account" onClick={() => setOpen(false)} className="flex items-center gap-2 py-2 px-3 text-sm font-semibold text-gray-700"><UserIcon size={16} /> Account</Link>
                <Link href="/bookings" onClick={() => setOpen(false)} className="flex items-center gap-2 py-2 px-3 text-sm font-semibold text-gray-700"><Calendar size={16} /> Bookings</Link>
                {user.role === 'admin' && <Link href="/admin" onClick={() => setOpen(false)} className="flex items-center gap-2 py-2 px-3 text-sm font-semibold text-[#FF5B00]"><ShieldCheck size={16} /> Admin</Link>}
                <button onClick={() => { setOpen(false); handleLogout(); }} className="flex items-center gap-2 py-2 px-3 text-sm font-semibold text-red-500"><LogOut size={16} /> Log out</button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-2 pb-2">
                <Link href="/login" onClick={() => setOpen(false)} className="text-center rounded-xl border border-gray-200 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50">Sign In</Link>
                <Link href="/register" onClick={() => setOpen(false)} className="text-center rounded-xl border border-gray-200 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50">Register</Link>
              </div>
            )}
            <Link href="/plan" onClick={() => setOpen(false)} className="block mt-2 text-center rounded-xl bg-[#FF5B00] text-white py-3 text-sm font-bold shadow-md shadow-orange-500/20">Explore Tours</Link>
          </div>
        </nav>
      )}
    </header>
  );
}
