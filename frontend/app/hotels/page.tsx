import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import ListingCard from '@/components/ListingCard';
import { ApiError, Empty } from '@/components/States';
import { getHotels } from '@/lib/api';
export const metadata: Metadata = { title: 'Hotels', description: 'Houseboats, lodges and resorts across Kashmir.' };
export default async function Hotels() {
  const d = await getHotels();
  return (<><PageHeader title="Hotels" subtitle="Houseboats, snow lodges and riverside resorts, priced per night." />
    <div className="container-x pb-8 pt-4">{!d ? <ApiError /> : d.items.length === 0 ? <Empty title="No hotels yet" hint="Seed the backend or add hotels from the admin." /> :
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{d.items.map((h) => <ListingCard key={h._id} l={h} unit="per night" />)}</div>}</div></>);
}
