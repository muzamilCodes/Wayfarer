import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PageHeader from '@/components/PageHeader';
import { SITE, getBlog } from '@/lib/api';
type Props = { params: { slug: string } };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const b = await getBlog(params.slug);
  return b ? { title: b.title, description: b.excerpt, alternates: { canonical: `/blog/${b.slug}` } } : {};
}
export default async function Post({ params }: Props) {
  const b = await getBlog(params.slug);
  if (!b) notFound();
  const ld = { '@context': 'https://schema.org', '@type': 'Article', headline: b.title, author: { '@type': 'Person', name: b.author }, datePublished: b.createdAt, mainEntityOfPage: `${SITE}/blog/${b.slug}` };
  return (<><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    <PageHeader title={b.title} subtitle={`By ${b.author} · ${new Date(b.createdAt).toLocaleDateString('en-IN', { dateStyle: 'long' })}`} />
    <article className="container-x max-w-2xl space-y-5 pb-8 pt-2 text-lg leading-relaxed">{b.content?.map((p, i) => <p key={i}>{p}</p>)}</article></>);
}
