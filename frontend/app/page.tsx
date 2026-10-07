import type { Metadata } from 'next';
import HomePageClient from '@/components/HomePageClient';

export const metadata: Metadata = {
  title: 'Paradise Journey | Explore Beautiful Places in Jammu & Kashmir',
  description:
    'Discover amazing places, breathtaking landscapes and the best travel deals across Jammu & Kashmir: Srinagar, Gulmarg, Leh Ladakh, Pahalgam, Sonamarg, Vaishno Devi, and more.',
};

export default function Home() {
  return <HomePageClient />;
}
