import type { Metadata } from 'next';
import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import Cover from '@/components/Cover';
import { ApiError, Empty } from '@/components/States';
import { getBlogs } from '@/lib/api';
export const metadata: Metadata = { title: 'Travel blog', description: 'Kashmir travel guides, seasons and itineraries.' };
export default async function Blog() {
  const d = await getBlogs();
  return (<><PageHeader title="Travel blog" subtitle="Guides written for people planning their first Kashmir trip." />
    <div className="container-x pb-8 pt-4">{!d ? <ApiError /> : d.items.length === 0 ? <Empty title="No articles yet" hint="Publish a post from the admin." /> :
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{d.items.map((b) => (
        <Link key={b._id} href={`/blog/${b.slug}`} className="group overflow-hidden rounded-2xl border border-lake/10 bg-white transition-shadow hover:shadow-lg">
          <div className="relative aspect-[16/9] overflow-hidden"><div className="absolute inset-0 transition-transform duration-500 group-hover:scale-105"><Cover name={b.title} /></div></div>
          <div className="p-5"><p className="text-xs text-mist">{b.category}</p><h2 className="mt-1 font-display text-lg font-semibold text-lake">{b.title}</h2><p className="mt-2 text-sm text-mist">{b.excerpt}</p></div>
        </Link>))}</div>}</div></>);
}
