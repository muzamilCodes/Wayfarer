'use client';
import Link from 'next/link';
import { Star } from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Destination } from '@/types';
import Cover from './Cover';
import { inr } from '@/lib/format';

export default function DestinationCard({ d }: { d: Destination }) {
  const x = useMotionValue(0), y = useMotionValue(0);
  const rx = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), { stiffness: 200, damping: 20 });
  const ry = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), { stiffness: 200, damping: 20 });

  return (
    <motion.div style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      onPointerMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); x.set((e.clientX - r.left) / r.width - 0.5); y.set((e.clientY - r.top) / r.height - 0.5); }}
      onPointerLeave={() => { x.set(0); y.set(0); }}>
      <Link href={`/destinations/${d.slug}`} className="group relative block aspect-[4/5] overflow-hidden rounded-3xl bg-lake">
        <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"><Cover img={d.images[0]} name={d.name} /></div>
        <div className="absolute inset-0 bg-gradient-to-t from-deep/90 via-deep/20 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-5 text-snow">
          <p className="text-xs text-glacier/80">{d.region}</p>
          <h3 className="font-display text-2xl font-semibold">{d.name}</h3>
          <p className="mt-1 line-clamp-2 text-sm text-glacier/90">{d.description}</p>
          <div className="mt-3 flex items-center justify-between text-sm">
            <span>From {inr(d.startingPrice)}</span>
            <span className="inline-flex items-center gap-1"><Star size={14} className="fill-saffron text-saffron" />{d.rating.toFixed(1)}</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
