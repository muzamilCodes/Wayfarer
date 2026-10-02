import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PageHeader from '@/components/PageHeader';
import { SITE, getBlog } from '@/lib/api';
import Reveal from '@/components/3d/Reveal';
import Link from 'next/link';
import { ArrowLeft, User, Calendar, Clock } from 'lucide-react';

type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const b = await getBlog(params.slug);
  return b
    ? {
        title: `${b.title} | Wayfarer Travel Blog`,
        description: b.excerpt,
        alternates: { canonical: `/blog/${b.slug}` },
      }
    : {};
}

export default async function Post({ params }: Props) {
  const b = await getBlog(params.slug);
  if (!b) notFound();

  const ld = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: b.title,
    author: { '@type': 'Person', name: b.author },
    datePublished: b.createdAt,
    mainEntityOfPage: `${SITE}/blog/${b.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
      />

      {/* Parallax Hero Header */}
      <div className="relative overflow-hidden bg-gradient-to-b from-deep via-lake to-[#1B4B5C] py-20 text-snow">
        <div className="container-x relative z-10 max-w-3xl">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-semibold text-glacier hover:text-snow mb-6 transition-colors"
          >
            <ArrowLeft size={14} /> Back to all articles
          </Link>

          <span className="inline-block rounded-full bg-saffron/20 border border-saffron/30 px-3 py-1 text-xs font-bold text-saffron uppercase tracking-wider mb-4">
            {b.category || 'Himalayan Guide'}
          </span>

          <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            {b.title}
          </h1>

          <div className="mt-6 flex flex-wrap items-center gap-5 text-xs text-glacier/90">
            <span className="flex items-center gap-1.5 font-medium">
              <User size={14} /> {b.author}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Calendar size={14} />
              {new Date(b.createdAt).toLocaleDateString('en-IN', {
                dateStyle: 'long',
              })}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Clock size={14} /> 5 min read
            </span>
          </div>
        </div>

        {/* Ambient background glow */}
        <div className="absolute right-0 top-1/4 h-72 w-72 rounded-full bg-saffron/10 blur-3xl pointer-events-none" />
      </div>

      {/* Article Content with Smooth Staggered Paragraph Reveals */}
      <article className="container-x max-w-3xl space-y-8 py-14 text-lg leading-relaxed text-ink/90">
        <Reveal>
          <p className="font-display text-2xl font-semibold text-lake leading-snug">
            {b.excerpt}
          </p>
        </Reveal>

        {b.content?.map((paragraph, index) => (
          <Reveal key={index} delay={index * 0.08} yOffset={20}>
            <p className="text-base sm:text-lg text-mist/95 leading-relaxed">
              {paragraph}
            </p>
          </Reveal>
        ))}

        {/* Article tags & footer */}
        <Reveal delay={0.3}>
          <div className="mt-12 rounded-3xl border border-lake/10 bg-white/70 p-8 backdrop-blur shadow-sm">
            <h3 className="font-display text-base font-bold text-lake mb-3">
              Explore Related Topics
            </h3>
            <div className="flex flex-wrap gap-2">
              {b.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-xl bg-glacier/60 px-3 py-1 text-xs font-semibold text-lake"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-lake/10 pt-4">
              <span className="text-xs text-mist">Ready to experience this firsthand?</span>
              <Link href="/plan" className="btn btn-primary text-xs py-2 px-5">
                Plan My Journey
              </Link>
            </div>
          </div>
        </Reveal>
      </article>
    </>
  );
}
