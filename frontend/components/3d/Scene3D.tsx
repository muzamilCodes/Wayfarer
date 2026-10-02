'use client';
import { Suspense, useEffect, useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';

interface Scene3DProps {
  children: React.ReactNode;
  className?: string;
  camera?: { position?: [number, number, number]; fov?: number };
  fallback?: React.ReactNode;
  dpr?: [number, number];
  frameloop?: 'always' | 'demand' | 'never';
}

export default function Scene3D({
  children,
  className = 'h-full w-full',
  camera = { position: [0, 0, 5], fov: 45 },
  fallback = null,
  dpr = [1, 1.5],
  frameloop = 'always',
}: Scene3DProps) {
  const [mounted, setMounted] = useState(false);
  const [inView, setInView] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(motionQuery.matches);

    // Pause rendering when element is outside of viewport
    if (typeof IntersectionObserver !== 'undefined' && containerRef.current) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          setInView(entry.isIntersecting);
        },
        { threshold: 0.05 }
      );
      observer.observe(containerRef.current);
      return () => observer.disconnect();
    }
  }, []);

  if (!mounted) {
    return <div ref={containerRef} className={className}>{fallback}</div>;
  }

  if (reducedMotion) {
    return <div ref={containerRef} className={className}>{fallback}</div>;
  }

  return (
    <div ref={containerRef} className={className} aria-hidden>
      <Suspense fallback={fallback}>
        <Canvas
          dpr={dpr}
          camera={camera}
          frameloop={inView ? frameloop : 'never'}
          gl={{
            powerPreference: 'low-power',
            antialias: true,
          }}
        >
          {children}
        </Canvas>
      </Suspense>
    </div>
  );
}
