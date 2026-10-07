'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Compass, Mail } from 'lucide-react';

const InfoIcon = ({ size = 19, strokeWidth = 2 }: { size?: number; strokeWidth?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <path d="M12 16v-4"/>
    <path d="M12 8h.01"/>
  </svg>
);

export default function MobileBottomNav() {
  const pathname = usePathname();

  // Don't show inside admin
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  const navItems = [
    {
      label: 'Home',
      href: '/',
      icon: Home,
      isActive: pathname === '/',
    },
    {
      label: 'Destinations',
      href: '/destinations',
      icon: Compass,
      isActive: pathname?.startsWith('/destinations'),
    },
    {
      label: 'About',
      href: '/about',
      icon: InfoIcon,
      isActive: pathname === '/about',
    },
    {
      label: 'Contact',
      href: '/contact',
      icon: Mail,
      isActive: pathname === '/contact',
    },
  ];

  return (
    <nav
      aria-label="Mobile Navigation"
      className="fixed bottom-0 inset-x-0 z-50 md:hidden bg-[#0A1624]/95 backdrop-blur-lg border-t border-white/10 px-4 py-2 pb-safe shadow-[0_-8px_24px_rgba(0,0,0,0.35)]"
    >
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all duration-200 ${
                item.isActive
                  ? 'text-[#10B981] font-bold scale-105'
                  : 'text-gray-400 hover:text-white font-medium'
              }`}
            >
              <div
                className={`relative flex items-center justify-center w-8 h-8 rounded-full transition-all ${
                  item.isActive ? 'bg-[#10B981]/15 text-[#10B981]' : ''
                }`}
              >
                <Icon size={19} strokeWidth={item.isActive ? 2.4 : 1.8} />
                {item.isActive && (
                  <span className="absolute -bottom-0.5 w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                )}
              </div>
              <span className="text-[10px] tracking-tight mt-0.5">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
