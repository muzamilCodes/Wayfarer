'use client';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import {
  Menu,
  X,
  User as UserIcon,
  ShieldCheck,
  Calendar,
  LogOut,
  ChevronDown,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '@/lib/auth';

const links = [
  ['Home', '/'],
  ['Destinations', '/destinations'],
  ['Tours', '/tours'],
  ['Hotels', '/hotels'],
  ['Cabs', '/cabs'],
  ['Activities', '/activities'],
  ['Blog', '/blog'],
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, loading, signOut } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Track scroll for transparent → solid navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  const handleLogout = async () => {
    setMenuOpen(false);
    await signOut();
    router.push('/');
  };

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100' 
        : 'bg-white/80 backdrop-blur-md border-b border-slate-100/50'
    }`}>
      <div className="container-x flex h-16 items-center justify-between">
        {/* Brand logo */}
        <Link href="/" className="group flex items-center gap-2.5 font-display text-xl font-bold text-[#0F3B4A]">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#E85D04] text-white shadow-sm transition-transform group-hover:scale-105 font-black text-sm">
            W
          </span>
          <span className="tracking-tight">Wayfarer</span>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden items-center gap-1 text-sm lg:flex" aria-label="Main Navigation">
          {links.map(([label, href]) => {
            const isActive = pathname === href || (href !== '/' && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                className={`px-3 py-2 rounded-lg font-medium transition-colors ${
                  isActive
                    ? 'text-[#E85D04] bg-orange-50 font-semibold'
                    : 'text-slate-600 hover:text-[#0F3B4A] hover:bg-slate-50'
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Auth Controls */}
        <div className="hidden items-center gap-3 lg:flex">
          {loading ? (
            <div className="h-9 w-20 animate-pulse rounded-full bg-slate-100" />
          ) : user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center gap-2 rounded-full border border-slate-200 bg-white py-1.5 pl-2 pr-3 text-sm font-semibold text-slate-700 shadow-sm hover:border-slate-300 hover:bg-slate-50 transition-all"
                aria-label="User account menu"
                aria-expanded={menuOpen}
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#E85D04] text-xs font-bold text-white">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="max-w-[110px] truncate">{user.name.split(' ')[0]}</span>
                <ChevronDown size={14} className={`text-slate-400 transition-transform ${menuOpen ? 'rotate-180' : ''}`} />
              </button>

              {menuOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="border-b border-slate-100 px-3 py-2">
                    <p className="text-xs font-semibold text-slate-900 truncate">{user.name}</p>
                    <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
                    {user.role === 'admin' && (
                      <span className="mt-1 inline-flex items-center gap-1 rounded bg-orange-100 px-1.5 py-0.5 text-[10px] font-bold uppercase text-[#E85D04]">
                        <ShieldCheck size={11} /> Admin
                      </span>
                    )}
                  </div>

                  <div className="py-1">
                    <Link
                      href="/account"
                      onClick={() => setMenuOpen(false)}
                      className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                    >
                      <UserIcon size={14} className="text-slate-400" />
                      <span>Account Profile</span>
                    </Link>

                    <Link
                      href="/bookings"
                      onClick={() => setMenuOpen(false)}
                      className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                    >
                      <Calendar size={14} className="text-slate-400" />
                      <span>My Bookings</span>
                    </Link>

                    {user.role === 'admin' && (
                      <Link
                        href="/admin"
                        onClick={() => setMenuOpen(false)}
                        className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-[#E85D04] hover:bg-orange-50 transition-colors"
                      >
                        <ShieldCheck size={14} />
                        <span>Admin Area</span>
                      </Link>
                    )}
                  </div>

                  <div className="border-t border-slate-100 pt-1">
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors"
                    >
                      <LogOut size={14} />
                      <span>Log out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm font-semibold text-slate-600 hover:text-[#0F3B4A] transition-colors px-3 py-2"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="text-sm font-semibold text-slate-600 hover:text-[#0F3B4A] transition-colors px-3 py-2"
              >
                Register
              </Link>
            </>
          )}

          <Link href="/plan" className="rounded-full bg-[#E85D04] hover:bg-[#dc5400] text-white px-5 py-2.5 text-xs font-bold shadow-md shadow-orange-500/20 transition-all hover:scale-105 active:scale-95">
            Explore Tours
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <button
          className="rounded-xl p-2 text-slate-700 hover:bg-slate-100 lg:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <nav
          className="container-x flex flex-col gap-1 pb-6 lg:hidden animate-in slide-in-from-top duration-200"
          aria-label="Mobile Navigation"
        >
          <div className="border-t border-slate-100 pt-3">
            {links.map(([label, href]) => {
              const isActive = pathname === href || (href !== '/' && pathname.startsWith(href));
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className={`block py-2.5 px-2 rounded-lg text-sm font-semibold transition-colors ${
                    isActive ? 'text-[#E85D04] bg-orange-50' : 'text-slate-700 hover:text-[#E85D04] hover:bg-slate-50'
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </div>

          <div className="mt-2 border-t border-slate-100 pt-3">
            {user ? (
              <>
                <Link
                  href="/account"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 py-2 text-sm font-semibold text-slate-700"
                >
                  <UserIcon size={16} /> My Account ({user.name.split(' ')[0]})
                </Link>
                <Link
                  href="/bookings"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 py-2 text-sm font-semibold text-slate-700"
                >
                  <Calendar size={16} /> My Bookings
                </Link>
                {user.role === 'admin' && (
                  <Link
                    href="/admin"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2 py-2 text-sm font-semibold text-[#E85D04]"
                  >
                    <ShieldCheck size={16} /> Admin Area
                  </Link>
                )}
                <button
                  onClick={() => {
                    setOpen(false);
                    handleLogout();
                  }}
                  className="flex items-center gap-2 py-2 text-sm font-semibold text-rose-600"
                >
                  <LogOut size={16} /> Log out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="block py-2 text-sm font-semibold text-slate-700"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  onClick={() => setOpen(false)}
                  className="block py-2 text-sm font-semibold text-slate-700"
                >
                  Register
                </Link>
              </>
            )}
            <Link
              href="/plan"
              onClick={() => setOpen(false)}
              className="mt-3 block w-full text-center rounded-full bg-[#E85D04] hover:bg-[#dc5400] text-white px-5 py-3 text-sm font-bold shadow-md"
            >
              Explore Tours
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
