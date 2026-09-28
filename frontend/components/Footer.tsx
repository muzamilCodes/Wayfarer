import Link from 'next/link';

const cols: Record<string, [string, string][]> = {
  Explore: [['Destinations', '/destinations'], ['Tours', '/tours'], ['Hotels', '/hotels'], ['Activities', '/activities'], ['Travel guides', '/blog']],
  Company: [['About', '/about'], ['Contact', '/contact'], ['Offers', '/offers']],
  Policies: [['Terms', '/terms'], ['Privacy', '/privacy'], ['Cancellation', '/cancellation-policy'], ['Refunds', '/refund-policy']],
};

export default function Footer() {
  return (
    <footer className="mt-24 bg-deep text-glacier">
      <div className="container-x grid gap-10 py-14 md:grid-cols-4">
        <div>
          <p className="font-display text-2xl font-bold text-snow">Wayfarer</p>
          <p className="mt-3 max-w-xs text-sm text-glacier/80">Tours, stays and cabs across Kashmir, Ladakh and the Himalaya, arranged by people who live there.</p>
        </div>
        {Object.entries(cols).map(([h, ls]) => (
          <div key={h}>
            <p className="font-display font-semibold text-snow">{h}</p>
            <ul className="mt-3 space-y-2 text-sm">
              {ls.map(([l, href]) => <li key={href}><Link href={href} className="hover:text-saffron">{l}</Link></li>)}
            </ul>
          </div>
        ))}
      </div>
      <p className="border-t border-white/10 py-5 text-center text-xs text-glacier/60">© {new Date().getFullYear()} Wayfarer. All rights reserved.</p>
    </footer>
  );
}
