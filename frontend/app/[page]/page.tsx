import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PageHeader from '@/components/PageHeader';
import dynamic from 'next/dynamic';
import Reveal from '@/components/3d/Reveal';
import TiltCard3D from '@/components/3d/TiltCard3D';
import Link from 'next/link';
import { ShieldCheck, Tag, Sparkles, Compass } from 'lucide-react';

const FloatingIcon3D = dynamic(() => import('@/components/3d/FloatingIcon3D'), {
  ssr: false,
});

const pages: Record<
  string,
  {
    title: string;
    subtitle?: string;
    body: string[];
    icon?: 'compass' | 'tag';
    offers?: Array<{ title: string; code: string; desc: string; disc: string }>;
  }
> = {
  about: {
    title: 'About Paradise Journey',
    subtitle: 'Locally guided mountain journeys across Kashmir, Ladakh and the Himalaya.',
    icon: 'compass',
    body: [
      'Paradise Journey was born in the heart of Srinagar out of a profound love for the high Himalaya. For over a decade, we have been crafting bespoke private journeys that celebrate the timeless beauty and warmth of the Kashmiri and Ladakhi valleys.',
      'Unlike aggregator platforms, our team lives and works here. Every recommendation—from the best phase to ride the Gulmarg gondola on a clear morning, to which heritage houseboat has the warmest cedar interiors and freshest saffron kehwa—comes from genuine local knowledge.',
      'We partner exclusively with verified local drivers, traditional Shikara artisans, certified mountain guides, and boutique family-run chalets. When you travel with Paradise Journey, your journey directly supports regional Himalayan families and sustainable mountain tourism.',
    ],
  },
  offers: {
    title: 'Seasonal Offers & Privileges',
    subtitle: 'Exclusive discounts and seasonal promotions for early Himalayan bookings.',
    icon: 'tag',
    body: [
      'Take advantage of limited-time seasonal coupons applied directly at reservation. All offers include our standard free cancellation up to 7 days before departure.',
    ],
    offers: [
      {
        title: 'Early Bird Winter Ski Tour',
        code: 'SNOW2026',
        desc: 'Save 15% on any 5+ day Gulmarg ski and snow expedition package.',
        disc: '15% OFF',
      },
      {
        title: 'Spring Tulip Festival Special',
        code: 'TULIPKASHMIR',
        desc: 'Complimentary shikara photoshoot and 10% discount on 6+ day valley tours.',
        disc: '10% OFF',
      },
      {
        title: 'Ladakh High Passes Roadtrip',
        code: 'LADAKH4X4',
        desc: 'Save ₹5,000 on private Innova Crysta / Thar bookings for Pangong Lake expeditions.',
        disc: '₹5,000 OFF',
      },
    ],
  },
  terms: {
    title: 'Terms & Conditions',
    subtitle: 'Clear, transparent travel terms for all Wayfarer packages and reservations.',
    body: [
      '1. Booking Confirmation: All reservations are confirmed upon receipt of the initial deposit or voucher generation. Final itineraries are subject to road weather accessibility.',
      '2. Mountain Safety & Permits: Permits for high-altitude zones (such as Khardung La and Pangong Tso) are arranged by Wayfarer. Travelers are advised to follow altitude acclimatization protocols.',
      '3. Inclusions: All confirmed hotel categories, private cabs, daily breakfast and dinners, and specified sightseeing activities are guaranteed as per the issued voucher.',
      '4. Force Majeure: In the event of unforeseen snowfall, pass closures, or weather conditions, alternative scenic routes or adjusted night stays will be provided in consultation with you.',
    ],
  },
  privacy: {
    title: 'Privacy Policy',
    subtitle: 'How we safeguard your personal information and trip details.',
    body: [
      '1. Data Collection: We collect only necessary details (names, travel dates, contact numbers) required to issue permits, arrange private transport, and secure hotel stays.',
      '2. Session Security: All user passwords are encrypted using modern Argon2id hashing algorithms. Sessions are maintained via secure, httpOnly cookies.',
      '3. No Third-Party Selling: We never sell or license your personal contact details or travel preferences to third-party marketing companies.',
      '4. Data Rights: You may request the export or deletion of your account and saved itineraries at any time through your Account settings or by contacting our team.',
    ],
  },
  'cancellation-policy': {
    title: 'Cancellation Policy',
    subtitle: 'Hassle-free cancellation guidelines tailored for mountain journeys.',
    body: [
      '1. Free Cancellation: Enjoy free cancellation with a 100% refund up to 7 days prior to your scheduled arrival date.',
      '2. Within 7 Days: Cancellations made between 3 to 7 days before departure are subject to a 20% administrative fee for hotel reservation releases.',
      '3. Weather-Related Disruptions: If major mountain passes or flights are canceled due to severe weather, 100% of your remaining booking funds are transferable to any future date within 12 months with no penalty.',
    ],
  },
  'refund-policy': {
    title: 'Refund Policy',
    subtitle: 'Transparent refund timelines and payment reversal methods.',
    body: [
      '1. Processing Timelines: Approved refunds are processed immediately and credited back to the original payment source within 3 to 5 business days.',
      '2. Payment Methods: Refunds are issued via the identical payment route (UPI, Net Banking, Credit/Debit card) used during booking.',
      '3. Direct Inquiries: For any refund tracking or invoice queries, our accounts desk is reachable directly via WhatsApp or official support email.',
    ],
  },
  careers: {
    title: 'Careers at Paradise Journey',
    subtitle: 'Join our team shaping authentic Himalayan hospitality and mountain expeditions.',
    body: [
      '1. Local Guiding & Trek Leaders: We are looking for certified mountaineering guides and passionate local storytellers across Srinagar, Gulmarg, and Ladakh.',
      '2. Fleet Management & Logistics: Opportunities for transport coordinators and client relation managers based in Srinagar and Jammu.',
      '3. How to Apply: Send your CV and portfolio to careers@paradisejourney.local or reach out via our contact desk.',
    ],
  },
  press: {
    title: 'Press & Media',
    subtitle: 'Latest news, press releases, and editorial stories from Paradise Journey.',
    body: [
      '1. Media Inquiries: For interviews, editorial imagery of Jammu & Kashmir, and press trip sponsorship, contact our communications desk.',
      '2. Awards & Recognition: Honored as one of the leading regional experiential travel providers promoting eco-friendly mountain tourism.',
      '3. Brand Assets: High-resolution media kits and photography permits are available upon verification.',
    ],
  },
  faq: {
    title: "Frequently Asked Questions (FAQ's)",
    subtitle: 'Helpful answers to common queries regarding permits, weather, and tour bookings.',
    body: [
      '1. Best Time to Visit Kashmir: April to October is ideal for lush green meadows and Dal Lake stays; December to March is ideal for snow and skiing in Gulmarg.',
      '2. Inner Line Permits: We arrange all necessary permits for Pangong Tso, Nubra Valley, Gurez Valley, and border circuit zones.',
      '3. Vehicle & Pickup: Private airport pickups and 24/7 dedicated local drivers are included in all confirmed package bookings.',
      '4. Custom Itineraries: You can personalize any existing tour or create a custom plan directly through our website.',
    ],
  },
  sustainability: {
    title: 'Sustainability & Eco-Tourism',
    subtitle: 'Our pledge to preserve the pristine environment of the Western Himalayas.',
    body: [
      '1. Leave No Trace: We educate our trekking groups on waste management and strictly adhere to zero single-use plastic policies in high alpine passes.',
      '2. Direct Community Impact: Over 85% of tour proceeds remain directly within local Kashmiri and Ladakhi communities through vetted homestays and local artisans.',
      '3. Wildlife Conservation: We actively support conservation awareness programs in Dachigam National Park and Kishtwar High Altitude Sanctuary.',
    ],
  },
};

export const dynamicParams = false;
export const generateStaticParams = () => Object.keys(pages).map((page) => ({ page }));

export function generateMetadata({ params }: { params: { page: string } }): Metadata {
  return { title: pages[params.page]?.title || 'Wayfarer' };
}

export default function Info({ params }: { params: { page: string } }) {
  const p = pages[params.page];
  if (!p) notFound();

  const isSpecial = params.page === 'about' || params.page === 'offers';

  return (
    <>
      <PageHeader title={p.title} subtitle={p.subtitle} />

      <div className="container-x max-w-4xl pb-16 pt-2">
        {/* About Page with 3D Compass & Stats */}
        {params.page === 'about' && (
          <div className="mb-12">
            <Reveal>
              <div className="flex flex-col sm:flex-row items-center justify-between rounded-3xl border border-lake/10 bg-white/80 p-8 shadow-sm backdrop-blur-xl gap-6">
                <div>
                  <span className="rounded-full bg-saffron/20 border border-saffron/30 px-3 py-1 text-xs font-bold uppercase tracking-wider text-deep">
                    Our Himalayan Heritage
                  </span>
                  <h2 className="mt-2 font-display text-2xl font-bold text-lake">
                    Rooted in the Mountains
                  </h2>
                  <p className="mt-1 text-sm text-mist max-w-md">
                    We bridge travelers with true Himalayan hospitality, handcrafted timber houseboats, and untouched alpine serenity.
                  </p>
                </div>
                {/* 3D Compass Element */}
                <div className="h-32 w-32 shrink-0">
                  <FloatingIcon3D type="compass" className="h-full w-full" />
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {[
                  { label: 'Happy Travelers', val: '12,500+' },
                  { label: 'Local Guides & Drivers', val: '85+ Experts' },
                  { label: 'Scenic Himalayan Valleys', val: '14 Regions' },
                ].map((stat, i) => (
                  <div key={i} className="rounded-2xl border border-lake/10 bg-white/90 p-5 text-center shadow-sm">
                    <p className="font-display text-3xl font-bold text-lake">{stat.val}</p>
                    <p className="mt-1 text-xs font-medium text-mist">{stat.label}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        )}

        {/* Offers Page with 3D Tag & Promo Cards */}
        {params.page === 'offers' && (
          <div className="mb-12">
            <Reveal>
              <div className="flex flex-col sm:flex-row items-center justify-between rounded-3xl border border-lake/10 bg-white/80 p-8 shadow-sm backdrop-blur-xl gap-6 mb-8">
                <div>
                  <span className="rounded-full bg-emerald-100 text-emerald-800 px-3 py-1 text-xs font-bold uppercase tracking-wider">
                    Verified Promotional Codes
                  </span>
                  <h2 className="mt-2 font-display text-2xl font-bold text-lake">
                    Exclusive Himalayan Savings
                  </h2>
                  <p className="mt-1 text-sm text-mist max-w-md">
                    Apply these promotion codes during your trip planning or inquiry to unlock discounted rates.
                  </p>
                </div>
                {/* 3D Discount Tag Element */}
                <div className="h-28 w-28 shrink-0">
                  <FloatingIcon3D type="tag" className="h-full w-full" />
                </div>
              </div>
            </Reveal>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {p.offers?.map((offer, idx) => (
                <Reveal key={offer.code} delay={idx * 0.1}>
                  <TiltCard3D maxTilt={8} glare={true} className="h-full">
                    <div className="flex h-full flex-col justify-between rounded-3xl border border-lake/15 bg-white/90 p-6 shadow-sm backdrop-blur">
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="rounded-full bg-saffron px-3 py-0.5 text-xs font-bold text-deep">
                            {offer.disc}
                          </span>
                          <Sparkles size={16} className="text-saffron" />
                        </div>
                        <h3 className="mt-3 font-display text-lg font-bold text-lake">
                          {offer.title}
                        </h3>
                        <p className="mt-1 text-xs text-mist leading-relaxed">
                          {offer.desc}
                        </p>
                      </div>

                      <div className="mt-6 pt-4 border-t border-lake/10 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] text-mist uppercase font-semibold">Coupon Code</span>
                          <p className="font-mono text-sm font-bold text-crocus tracking-wider">
                            {offer.code}
                          </p>
                        </div>
                        <Link href="/plan" className="btn btn-dark text-xs py-2 px-4">
                          Apply
                        </Link>
                      </div>
                    </div>
                  </TiltCard3D>
                </Reveal>
              ))}
            </div>
          </div>
        )}

        {/* Policy & Body Paragraphs with Soft Reveal */}
        <article className="space-y-6">
          {p.body.map((text, i) => (
            <Reveal key={i} delay={i * 0.06} yOffset={16}>
              <div className="rounded-2xl border border-lake/5 bg-white/70 p-6 backdrop-blur shadow-sm">
                <p className="text-base sm:text-lg leading-relaxed text-ink/90">
                  {text}
                </p>
              </div>
            </Reveal>
          ))}
        </article>
      </div>
    </>
  );
}
