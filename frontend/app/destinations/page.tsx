import type { Metadata } from 'next';
import DestinationsExplorerClient from './DestinationsExplorerClient';

export const metadata: Metadata = {
  title: 'Explore All 20 Districts of Jammu & Kashmir | Tourist Places & Valleys',
  description:
    'Discover every single district and tourist place in Jammu & Kashmir: Srinagar, Gulmarg, Pahalgam, Sonamarg, Vaishno Devi, Bhaderwah, Gurez, Patnitop, Kishtwar, and more.',
};

export default function DestinationsPage({
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
