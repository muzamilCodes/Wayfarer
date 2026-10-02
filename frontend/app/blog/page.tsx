import type { Metadata } from 'next';
import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import Cover from '@/components/Cover';
import { Empty } from '@/components/States';
import { getBlogs } from '@/lib/api';
import TiltCard3D from '@/components/3d/TiltCard3D';
import Reveal from '@/components/3d/Reveal';
import { BookOpen, Calendar, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Travel Blog & Himalayan Guides',
  description: 'First-hand Kashmir travel guides, season breakdowns, and cultural itineraries.',
};

export default async function Blog() {
  const d = await getBlogs();

  return (
    <>
      <PageHeader
        title="Himalayan Journal & Guides"
        subtitle="Insights from local mountain guides on picking seasons, gondola passes, and houseboats."
      />

      <div className="container-x pb-16 pt-4">
        {!d || d.items.length === 0 ? (
          <Empty title="No articles yet" hint="Curated guides are being written." />
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {d.items.map((b, i) => (
              <Reveal key={b._id} delay={i * 0.1}>
                <TiltCard3D maxTilt={8} glare={true} className="h-full">
                  <Link
                    href={`/blog/${b.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-3xl border border-lake/10 bg-white/90 shadow-sm backdrop-blur transition-all hover:border-lake/30 hover:shadow-xl"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-110">
                        <Cover name={b.title} />
                      </div>
                      <span className="absolute left-3.5 top-3.5 rounded-full bg-lake/80 backdrop-blur-md px-3 py-1 text-xs font-bold text-snow">
                        {b.category || 'Guide'}
                      </span>
                    </div>

                    <div className="flex flex-1 flex-col p-6" style={{ transform: 'translateZ(20px)' }}>
                      <div className="flex items-center gap-2 text-xs text-mist">
                        <Calendar size={13} />
                        <span>
                          {new Date(b.createdAt).toLocaleDateString('en-IN', {
                            dateStyle: 'medium',
                          })}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <BookOpen size={12} /> 4 min read
                        </span>
                      </div>

                      <h2 className="mt-3 font-display text-xl font-bold text-lake transition-colors group-hover:text-crocus line-clamp-2">
                        {b.title}
                      </h2>

                      <p className="mt-2 text-sm text-mist line-clamp-3 leading-relaxed">
                        {b.excerpt}
                      </p>

                      <div className="mt-auto pt-6 flex items-center gap-1.5 text-xs font-bold text-crocus group-hover:translate-x-1 transition-transform">
                        <span>Read full guide</span>
                        <ArrowRight size={13} />
                      </div>
                    </div>
                  </Link>
                </TiltCard3D>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
