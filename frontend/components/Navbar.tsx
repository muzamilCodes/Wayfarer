'use client';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
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
  ['Destinations', '/destinations'],
  ['Tours', '/tours'],
  ['Hotels', '/hotels'],
  ['Cabs', '/cabs'],
  ['Activities', '/activities'],
  ['Travel Blog', '/blog'],
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, loading, signOut } = useAuth();
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

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
    <header className="sticky top-0 z-50 border-b border-lake/10 bg-snow/80 backdrop-blur-md transition-all">
      <div className="container-x flex h-16 items-center justify-between">
        {/* Brand logo */}
        <Link href="/" className="group flex items-center gap-2 font-display text-xl font-bold text-lake">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-lake text-snow shadow-sm transition-transform group-hover:scale-105">
            W
          </span>
          <span className="tracking-tight">Wayfarer</span>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden items-center gap-6 text-sm lg:flex" aria-label="Main Navigation">
          {links.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className="text-mist font-medium transition-colors hover:text-lake"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Desktop Auth Controls */}
        <div className="hidden items-center gap-4 lg:flex">
          {loading ? (
            <div className="h-9 w-20 animate-pulse rounded-full bg-lake/10" />
          ) : user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center gap-2 rounded-full border border-lake/15 bg-white/90 py-1.5 pl-2 pr-3 text-sm font-semibold text-lake shadow-sm hover:border-lake/30 hover:bg-white transition-all"
                aria-label="User account menu"
                aria-expanded={menuOpen}
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-lake text-xs font-bold text-snow">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="max-w-[110px] truncate">{user.name.split(' ')[0]}</span>
                <ChevronDown size={14} className={`text-mist transition-transform ${menuOpen ? 'rotate-180' : ''}`} />
              </button>

              {menuOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-lake/15 bg-white p-2 shadow-xl backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="border-b border-lake/10 px-3 py-2">
                    <p className="text-xs font-semibold text-lake truncate">{user.name}</p>
                    <p className="text-[11px] text-mist truncate">{user.email}</p>
                    {user.role === 'admin' && (
                      <span className="mt-1 inline-flex items-center gap-1 rounded bg-saffron/20 px-1.5 py-0.5 text-[10px] font-bold uppercase text-deep">
                        <ShieldCheck size={11} /> Admin
                      </span>
                    )}
                  </div>

                  <div className="py-1">
                    <Link
                      href="/account"
                      onClick={() => setMenuOpen(false)}
                      className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-lake hover:bg-lake/5 transition-colors"
                    >
                      <UserIcon size={14} className="text-mist" />
                      <span>Account Profile</span>
                    </Link>

                    <Link
                      href="/bookings"
                      onClick={() => setMenuOpen(false)}
                      className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-lake hover:bg-lake/5 transition-colors"
                    >
                      <Calendar size={14} className="text-mist" />
                      <span>My Bookings</span>
                    </Link>

                    {user.role === 'admin' && (
                      <Link
                        href="/admin"
                        onClick={() => setMenuOpen(false)}
                        className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-crocus hover:bg-crocus/10 transition-colors"
                      >
                        <ShieldCheck size={14} />
                        <span>Admin Area</span>
                      </Link>
                    )}
                  </div>

                  <div className="border-t border-lake/10 pt-1">
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
            <Link
              href="/login"
              className="text-sm font-semibold text-lake hover:text-deep transition-colors px-2"
            >
              Log in
            </Link>
          )}

          <Link href="/plan" className="btn btn-dark text-xs py-2.5 px-5 shadow-sm">
            Plan my trip
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <button
          className="rounded-xl p-2 text-lake hover:bg-lake/5 lg:hidden"
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
          <div className="border-t border-lake/10 pt-3">
            {links.map(([label, href]) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="block py-2.5 text-sm font-semibold text-lake hover:text-crocus"
              >
                {label}
              </Link>
            ))}
          </div>

          <div className="mt-2 border-t border-lake/10 pt-3">
            {user ? (
              <>
                <Link
                  href="/account"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 py-2 text-sm font-semibold text-lake"
                >
                  <UserIcon size={16} /> My Account ({user.name.split(' ')[0]})
                </Link>
                <Link
                  href="/bookings"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 py-2 text-sm font-semibold text-lake"
                >
                  <Calendar size={16} /> My Bookings
                </Link>
                {user.role === 'admin' && (
                  <Link
                    href="/admin"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2 py-2 text-sm font-semibold text-crocus"
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
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="block py-2 text-sm font-semibold text-lake"
              >
                Log in
              </Link>
            )}
            <Link
              href="/plan"
              onClick={() => setOpen(false)}
              className="btn btn-dark mt-3 w-full text-center"
            >
              Plan my trip
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
