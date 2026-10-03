import type { Metadata } from 'next';
import DestinationsExplorerClient from './destinations/DestinationsExplorerClient';

export const metadata: Metadata = {
  title: 'Paradise Journey | Explore Beautiful Places in Jammu & Kashmir',
  description:
    'Discover amazing places, unforgettable experiences and the best deals across all 20 districts of Jammu & Kashmir: Srinagar, Gulmarg, Pahalgam, Sonamarg, Vaishno Devi, Bhaderwah, Gurez, and more.',
};

export default function Home({
  searchParams,
}: {
  searchParams?: { q?: string; region?: string };
}) {
  return (
    <DestinationsExplorerClient
      initialQuery={searchParams?.q || ''}
      initialRegion={searchParams?.region || 'All'}
    />
  );
}
