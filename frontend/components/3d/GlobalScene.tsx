'use client';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const ParticlesSnow = dynamic(() => import('./ParticlesSnow'), {
  ssr: false,
});

export default function GlobalScene() {
  const [mounted, setMounted] = useState(false);
  const [isLowEnd, setIsLowEnd] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Detect reduced motion or low-power devices
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 640;
    if (prefersReducedMotion || (isMobile && navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4)) {
      setIsLowEnd(true);
    }
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      {/* Soft Himalayan aurora ambient glow */}
      <div className="absolute -top-[20%] left-1/2 -translate-x-1/2 h-[600px] w-[900px] rounded-full bg-gradient-to-b from-glacier/30 via-crocus/5 to-transparent blur-3xl" />
      <div className="absolute top-[40%] -left-[10%] h-[500px] w-[500px] rounded-full bg-saffron/4 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-[600px] w-[600px] rounded-full bg-lake/5 blur-3xl" />

      {/* Floating real-time snow particles (disabled for low-end/reduced-motion) */}
      {mounted && !isLowEnd && <ParticlesSnow count={140} />}
    </div>
  );
}
