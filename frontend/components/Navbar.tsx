'use client';
import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, User as UserIcon } from 'lucide-react';
import { useAuth } from '@/lib/auth';

const links = [['Destinations', '/destinations'], ['Tours', '/tours'], ['Hotels', '/hotels'], ['Cabs', '/cabs'], ['Activities', '/activities'], ['Travel Blog', '/blog']];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, loading } = useAuth();
  const account = user
    ? <Link href="/account" className="inline-flex items-center gap-2 text-sm font-medium text-lake"><UserIcon size={18} />{user.name.split(' ')[0]}</Link>
    : <Link href="/login" className="text-sm font-medium text-lake">{loading ? '' : 'Log in'}</Link>;
  return (
    <header className="sticky top-0 z-50 border-b border-lake/10 bg-snow/90 backdrop-blur">
      <div className="container-x flex h-16 items-center justify-between">
        <Link href="/" className="font-display text-xl font-bold text-lake">Wayfarer</Link>
        <nav className="hidden items-center gap-6 text-sm lg:flex" aria-label="Main">
          {links.map(([l, h]) => <Link key={h} href={h} className="text-mist transition-colors hover:text-lake">{l}</Link>)}
        </nav>
        <div className="hidden items-center gap-5 lg:flex">{account}<Link href="/plan" className="btn btn-dark">Plan my trip</Link></div>
        <button className="lg:hidden" aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      </div>
      {open && (
        <nav className="container-x flex flex-col gap-1 pb-4 lg:hidden" aria-label="Mobile" onClick={() => setOpen(false)}>
          {links.map(([l, h]) => <Link key={h} href={h} className="py-2 text-lake">{l}</Link>)}
          <Link href={user ? '/account' : '/login'} className="py-2 text-lake">{user ? 'My account' : 'Log in'}</Link>
          <Link href="/plan" className="btn btn-dark mt-2">Plan my trip</Link>
        </nav>
      )}
    </header>
  );
}
