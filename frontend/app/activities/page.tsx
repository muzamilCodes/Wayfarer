import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import ListingCard from '@/components/ListingCard';
import { ApiError, Empty } from '@/components/States';
import { getActivities } from '@/lib/api';
export const metadata: Metadata = { title: 'Activities', description: 'Gondola rides, shikara trips, trekking and more.' };
export default async function Activities() {
  const d = await getActivities();
  return (<><PageHeader title="Activities" subtitle="Things to do once you arrive, from gondolas to shikaras." />
    <div className="container-x pb-8 pt-4">{!d ? <ApiError /> : d.items.length === 0 ? <Empty title="No activities yet" hint="Seed the backend or add activities from the admin." /> :
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{d.items.map((a) => <ListingCard key={a._id} l={a} unit="per person" />)}</div>}</div></>);
}
