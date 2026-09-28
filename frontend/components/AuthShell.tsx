'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';

/** Split screen: animated parallax mountains on the left, the form on the right. */
export default function AuthShell({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  const layer = (d: string, fill: string, dur: number, amp: number) => (
    <motion.svg viewBox="0 0 600 240" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 h-1/2 w-[110%]"
      animate={{ x: [0, amp, 0] }} transition={{ duration: dur, repeat: Infinity, ease: 'easeInOut' }} aria-hidden>
      <path d={d} fill={fill} />
    </motion.svg>
  );
  return (
    <div className="grid min-h-[calc(100vh-4rem)] lg:grid-cols-2">
      <div className="relative hidden overflow-hidden text-snow lg:block" style={{ background: 'linear-gradient(180deg,#0F3B4A,#3D6F82 60%,#B7D3DC)' }}>
        <motion.div className="absolute right-16 top-24 h-24 w-24 rounded-full bg-[#F6D28B]" animate={{ y: [0, -12, 0] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }} />
        {layer('M0 240V140l60-60 50 40 70-90 80 100 60-50 90 80 70-60 120 90v50z', '#9CC3CF', 14, -18)}
        {layer('M0 240V170l80-70 60 50 90-80 90 90 70-40 110 80 100-60v100z', '#3D6F82', 10, 14)}
        {layer('M0 240V190l100-60 80 60 100-70 100 80 90-50 130 60v30z', '#0F3B4A', 7, -10)}
        <div className="relative p-12">
          <Link href="/" className="font-display text-2xl font-bold">Wayfarer</Link>
          <p className="mt-16 max-w-sm font-display text-4xl font-bold leading-tight">The valley is waiting. Your trips, in one place.</p>
        </div>
      </div>
      <div className="flex items-center justify-center px-5 py-12">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-md">
          <h1 className="text-3xl font-bold text-lake">{title}</h1>
          <p className="mt-2 text-sm text-mist">{subtitle}</p>
          <div className="mt-8">{children}</div>
        </motion.div>
      </div>
    </div>
  );
}
