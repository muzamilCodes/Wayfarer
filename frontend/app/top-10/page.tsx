import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Sparkles, MapPin } from 'lucide-react';
import JKTop10Section from '@/components/JKTop10Section';

export const metadata: Metadata = {
  title: 'Jammu & Kashmir: Top 10 Trending Destinations | Travel Guide & Google Maps',
  description:
    'Complete travel guide with direct Google Maps navigation links, coordinates, and high-resolution photo galleries for the Top 10 tourist places in Jammu & Kashmir: Srinagar, Gulmarg, Pahalgam, Sonamarg, Doodhpathri, Gurez Valley, Yusmarg, Katra, Patnitop, and Bhaderwah.',
};

export default function Top10Page() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20">
      {/* Top Breadcrumb Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="container-x py-3.5 flex items-center justify-between text-xs sm:text-sm">
          <div className="flex items-center gap-2 text-gray-500 overflow-x-auto whitespace-nowrap">
            <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/destinations" className="hover:text-blue-600 transition-colors">Destinations</Link>
            <span>/</span>
            <span className="font-semibold text-gray-900">Top 10 Trending Destinations</span>
          </div>
          <Link
            href="/destinations"
            className="inline-flex items-center gap-1.5 font-semibold text-blue-600 hover:text-blue-700 transition-colors shrink-0"
          >
            <ArrowLeft size={14} /> All 20 Districts
          </Link>
        </div>
      </div>

      <div className="container-x pt-6">
        <JKTop10Section />
      </div>
    </div>
  );
}
