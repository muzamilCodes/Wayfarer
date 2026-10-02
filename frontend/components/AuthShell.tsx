'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import TiltCard3D from './3d/TiltCard3D';

const SnowGlobeScene = dynamic(() => import('./3d/SnowGlobeScene'), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-white/20 border-t-white" />
    </div>
  ),
});

export default function AuthShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative grid min-h-[calc(100vh-4rem)] lg:grid-cols-2">
      {/* Left: Calm 3D Himalayan Snow Globe Scene */}
      <div className="relative hidden overflow-hidden bg-gradient-to-b from-deep via-lake to-[#1B4B5C] lg:flex lg:flex-col lg:justify-between p-12 text-snow">
        <div className="relative z-10 flex items-center justify-between">
          <Link href="/" className="font-display text-2xl font-bold tracking-tight text-snow">
            Wayfarer
          </Link>
          <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold backdrop-blur">
            Kashmir & Ladakh Tours
          </span>
        </div>

        {/* 3D Canvas Container */}
        <div className="relative my-auto h-[440px] w-full">
          <SnowGlobeScene />
        </div>

        <div className="relative z-10">
          <p className="max-w-md font-display text-3xl font-bold leading-tight">
            The valley is calling. Your personalized Himalayan expeditions, all in one place.
          </p>
          <p className="mt-3 text-sm text-glacier">
            Secure reservations • Curated local guides • 24/7 mountain assistance
          </p>
        </div>

        {/* Soft background ambient aurora */}
        <div className="absolute top-1/3 left-1/4 h-72 w-72 rounded-full bg-saffron/10 blur-3xl pointer-events-none" />
      </div>

      {/* Right: Glassmorphism Auth Card with Subtle 3D Tilt */}
      <div className="flex items-center justify-center px-5 py-12">
        <div className="w-full max-w-md">
          <TiltCard3D maxTilt={6} glare={false}>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="rounded-3xl border border-lake/15 bg-white/80 p-8 shadow-xl backdrop-blur-xl sm:p-10"
            >
              <h1 className="text-3xl font-bold text-lake">{title}</h1>
              <p className="mt-2 text-sm text-mist">{subtitle}</p>
              <div className="mt-8">{children}</div>
            </motion.div>
          </TiltCard3D>
        </div>
      </div>
    </div>
  );
}
