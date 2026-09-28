import type { Metadata } from 'next';
import Link from 'next/link';
import { Users } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import { ApiError, Empty } from '@/components/States';
import { getVehicles } from '@/lib/api';
import { inr } from '@/lib/format';
export const metadata: Metadata = { title: 'Cabs & transport', description: 'Sedans, SUVs and tempo travellers with local drivers.' };
export default async function Cabs() {
  const d = await getVehicles();
  return (<><PageHeader title="Cabs & transport" subtitle="Private cars with local drivers. Fares below are per kilometre." />
    <div className="container-x pb-8 pt-4">{!d ? <ApiError /> : d.items.length === 0 ? <Empty title="No vehicles yet" hint="Seed the backend to add vehicles." /> :
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{d.items.map((v) => (
        <article key={v._id} className="rounded-2xl border border-lake/10 bg-white p-6">
          <p className="text-xs capitalize text-mist">{v.category.replace('_', ' ')}</p>
          <h3 className="mt-1 font-display text-xl font-semibold text-lake">{v.name}</h3>
          <p className="mt-3 inline-flex items-center gap-2 text-sm text-mist"><Users size={16} />Up to {v.seats} passengers</p>
          <p className="mt-4"><span className="font-display text-2xl font-bold text-lake">{inr(v.pricePerKm)}</span><span className="text-xs text-mist"> per km</span></p>
          <Link href="/plan" className="btn btn-dark mt-5 w-full">Add to my plan</Link>
        </article>))}</div>}</div></>);
}
