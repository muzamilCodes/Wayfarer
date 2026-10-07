import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  MapPin,
  Star,
  Calendar,
  Mountain,
  Clock,
  Compass,
  PhoneCall,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import Cover from '@/components/Cover';
import PackageCard from '@/components/PackageCard';
import { Empty } from '@/components/States';
import { getDestination, getPackages } from '@/lib/api';
import { inr } from '@/lib/format';
import { JK_ALL_DISTRICTS, JKDistrictDestination } from '@/lib/jk-destinations-data';
import TouristAttractionsList from '@/components/TouristAttractionsList';

type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = decodeURIComponent(params.slug).toLowerCase();
  const jkDistrict = JK_ALL_DISTRICTS.find(
    (d) => d.id.toLowerCase() === slug || d.district.toLowerCase() === slug
  );

  if (jkDistrict) {
    return {
      title: `${jkDistrict.district} Tourism Guide & Attractions | Wayfarer`,
      description: `${jkDistrict.tagline} - Explore ${jkDistrict.touristPlaces.length} top tourist places, attractions, best season, elevation, and tour packages in ${jkDistrict.district}, Jammu & Kashmir.`,
      alternates: { canonical: `/destinations/${jkDistrict.id}` },
    };
  }

  const d = await getDestination(params.slug);
  return d ? { title: d.name, description: d.description, alternates: { canonical: `/destinations/${d.slug}` } } : {};
}

export default async function DestinationPage({ params }: Props) {
  const slug = decodeURIComponent(params.slug).toLowerCase();
  const jkDistrict = JK_ALL_DISTRICTS.find(
    (d) => d.id.toLowerCase() === slug || d.district.toLowerCase() === slug
  );

  /* ─────────────────────────────────────────────────────────────
     1. JK DISTRICT DEDICATED FULL PAGE (All Tourist Places & Photos)
  ─────────────────────────────────────────────────────────────── */
  if (jkDistrict) {
    const relatedDistricts = JK_ALL_DISTRICTS
      .filter((d) => d.id !== jkDistrict.id && d.division === jkDistrict.division)
      .slice(0, 3);

    const badgeStyles: Record<string, string> = {
      'Must-Visit': 'bg-amber-100 text-amber-900 border-amber-200',
      'Heritage': 'bg-indigo-100 text-indigo-900 border-indigo-200',
      'Adventure': 'bg-sky-100 text-sky-900 border-sky-200',
      'Spiritual': 'bg-emerald-100 text-emerald-900 border-emerald-200',
      'Lake & Nature': 'bg-teal-100 text-teal-900 border-teal-200',
      'Scenic View': 'bg-purple-100 text-purple-900 border-purple-200',
      'Family & Leisure': 'bg-pink-100 text-pink-900 border-pink-200',
      'Offbeat & Camping': 'bg-orange-100 text-orange-900 border-orange-200',
    };

    const whatsappUrl = `https://wa.me/919419000000?text=${encodeURIComponent(
      `Hi Wayfarer! I want to plan a custom tour to ${jkDistrict.district}, Jammu & Kashmir.`
    )}`;

    return (
      <div className="min-h-screen bg-slate-50/50 pb-20">
        {/* Top Breadcrumb Bar */}
        <div className="bg-white border-b border-gray-200">
          <div className="container-x py-3 flex items-center justify-between text-xs sm:text-sm">
            <div className="flex items-center gap-2 text-gray-500 overflow-x-auto whitespace-nowrap">
              <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
              <span>/</span>
              <Link href="/destinations" className="hover:text-blue-600 transition-colors">Destinations</Link>
              <span>/</span>
              <span className="font-semibold text-gray-900">{jkDistrict.district}</span>
            </div>
            <Link
              href="/destinations"
              className="inline-flex items-center gap-1.5 font-semibold text-blue-600 hover:text-blue-700 transition-colors shrink-0"
            >
              <ArrowLeft size={14} /> Back to all destinations
            </Link>
          </div>
        </div>

        {/* Hero Banner */}
        <section className="relative h-[420px] sm:h-[480px] w-full overflow-hidden bg-slate-950">
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105"
            style={{ backgroundImage: `url(${jkDistrict.image})` }}
          />
          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-black/30" />

          {/* Hero Content */}
          <div className="container-x absolute inset-0 flex flex-col justify-end pb-8 sm:pb-12 text-white">
            <div className="flex flex-wrap items-center gap-2.5 mb-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#D9A441] px-3 py-1 text-xs font-bold text-slate-950 uppercase tracking-wider shadow-md">
                <Sparkles size={13} /> {jkDistrict.division}
              </span>
              <span className="rounded-full bg-white/20 backdrop-blur-md px-3 py-1 text-xs font-medium text-white border border-white/25">
                {jkDistrict.touristPlaces.length} Verified Attractions
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-1 text-xs font-semibold backdrop-blur-sm">
                <Star size={13} className="fill-emerald-400 text-emerald-400" /> {jkDistrict.rating.toFixed(1)} ({jkDistrict.reviewsCount.toLocaleString()} reviews)
              </span>
            </div>

            <h1 className="font-display text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white drop-shadow-md">
              {jkDistrict.district}
            </h1>
            <p className="mt-2 font-body text-sm sm:text-lg text-slate-200/90 font-medium max-w-3xl leading-relaxed">
              {jkDistrict.tagline}
            </p>
          </div>
        </section>

        {/* Quick Stats Ribbon */}
        <section className="border-b border-gray-200 bg-white shadow-sm font-body">
          <div className="container-x">
            <div className="grid grid-cols-2 sm:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-gray-100 py-3 sm:py-4">
              <div className="p-3 text-center sm:text-left flex items-center justify-center sm:justify-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-[#D9A441]">
                  <Calendar size={20} />
                </div>
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 block">Best Season</span>
                  <span className="font-bold text-sm sm:text-base text-gray-900">{jkDistrict.bestSeason}</span>
                </div>
              </div>

              <div className="p-3 text-center sm:text-left flex items-center justify-center sm:justify-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#3B71FE]">
                  <Mountain size={20} />
                </div>
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 block">Elevation</span>
                  <span className="font-bold text-sm sm:text-base text-gray-900">{jkDistrict.altitude}</span>
                </div>
              </div>

              <div className="p-3 text-center sm:text-left flex items-center justify-center sm:justify-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-[#6B4FA0]">
                  <Clock size={20} />
                </div>
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 block">Ideal Stay</span>
                  <span className="font-bold text-sm sm:text-base text-gray-900">{jkDistrict.duration}</span>
                </div>
              </div>

              <div className="p-3 text-center sm:text-left flex items-center justify-center sm:justify-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 block">Starting Package</span>
                  <span className="font-bold text-sm sm:text-base text-emerald-700">From {inr(jkDistrict.startingPrice)}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content Layout */}
        <div className="container-x mt-10 grid gap-10 lg:grid-cols-[1fr_360px] items-start">
          {/* Left Column: District Info & All Tourist Attractions */}
          <div className="space-y-10">
            {/* Overview Card */}
            <div className="rounded-3xl border border-gray-200/80 bg-white p-6 sm:p-8 shadow-sm">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2.5">
                <Compass className="text-[#3B71FE]" size={24} />
                About {jkDistrict.district}
              </h2>
              <p className="mt-4 font-body text-sm sm:text-base text-gray-600 leading-relaxed">
                {jkDistrict.overview}
              </p>
              <p className="mt-3 font-body text-xs sm:text-sm text-gray-500 leading-relaxed">
                {jkDistrict.shortDescription}
              </p>
            </div>

            {/* Tourist Attractions Section (Interactive Compact Cards + Master Details Modal) */}
            <div>
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 border-b border-gray-200 pb-4 mb-6">
                <div>
                  <span className="font-body text-xs font-bold uppercase tracking-wider text-[#3B71FE]">
                    Comprehensive Master Database
                  </span>
                  <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-gray-900 mt-1 flex items-center gap-2">
                    <MapPin className="text-rose-500" size={26} />
                    All Tourist Places in {jkDistrict.district} ({jkDistrict.touristPlaces.length} Spots)
                  </h2>
                </div>
                <span className="font-body text-xs text-gray-500 font-medium">
                  Click any card to explore full 25+ verified facts, history &amp; logistics
                </span>
              </div>

              {/* Interactive Tourist Attractions List & Master Modal */}
              <TouristAttractionsList
                districtName={jkDistrict.district}
                places={jkDistrict.touristPlaces}
              />
            </div>

            {/* Travel Experiences & Badges */}
            <div className="rounded-3xl border border-gray-200/80 bg-white p-6 sm:p-8 shadow-sm">
              <h3 className="text-base font-bold text-gray-900 mb-3">
                Experience Types &amp; Themes
              </h3>
              <div className="flex flex-wrap gap-2">
                {jkDistrict.travelTypes.map((type) => (
                  <span
                    key={type}
                    className="rounded-xl bg-blue-50 border border-blue-100 px-3.5 py-1.5 text-xs font-semibold text-[#3B71FE]"
                  >
                    {type}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Booking & Support Card */}
          <aside className="lg:sticky lg:top-24 space-y-6">
            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-lg">
              <div className="border-b border-gray-100 pb-4">
                <span className="inline-block rounded-full bg-blue-50 px-2.5 py-0.5 text-[11px] font-bold text-[#3B71FE] uppercase tracking-wider mb-2">
                  All-Inclusive Guided Tour
                </span>
                <div className="text-xs text-gray-500">Starting Price</div>
                <div className="mt-1 flex items-baseline gap-1.5">
                  <span className="text-3xl font-extrabold text-gray-900">
                    {inr(jkDistrict.startingPrice)}
                  </span>
                  <span className="text-xs text-gray-500">/ person (All-incl.)</span>
                </div>
              </div>

              {/* Package Inclusions */}
              <div className="py-4 space-y-2.5 text-xs sm:text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                  <span>Verified Chauffeur &amp; Private Cab</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                  <span>Curated Tour of all {jkDistrict.touristPlaces.length} attractions</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                  <span>3-Star / 4-Star Stay with Breakfast</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                  <span>24/7 Dedicated Local On-Ground Support</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 space-y-2.5">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-3 text-sm font-bold text-white shadow-md hover:bg-[#20ba59] transition-colors"
                >
                  <PhoneCall size={16} /> Chat on WhatsApp
                </a>
                <Link
                  href={`/plan?destination=${encodeURIComponent(jkDistrict.id)}`}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#3B71FE] px-4 py-3 text-sm font-bold text-white shadow-md hover:bg-[#2857D5] transition-colors"
                >
                  Plan Custom Itinerary <ArrowRight size={16} />
                </Link>
              </div>

              <p className="mt-4 text-center text-[11px] text-gray-400">
                Instant confirmation • Free cancellation available
              </p>
            </div>

            {/* Helpline Card */}
            <div className="rounded-2xl border border-gray-100 bg-slate-900 p-5 text-white text-center">
              <span className="text-xs text-slate-400 block mb-1">Need help choosing an itinerary?</span>
              <p className="text-sm font-bold text-white">Call Wayfarer Experts</p>
              <p className="mt-2 text-base font-extrabold text-[#D9A441]">+91 94190 00000</p>
              <span className="text-[11px] text-slate-400 block mt-1">Available 9 AM – 9 PM daily</span>
            </div>
          </aside>
        </div>

        {/* Related Destinations Carousel */}
        {relatedDistricts.length > 0 && (
          <section className="container-x mt-16 pt-12 border-t border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#3B71FE]">
                  More to Discover
                </span>
                <h2 className="text-2xl font-extrabold text-gray-900 mt-1">
                  Other Destinations in {jkDistrict.division}
                </h2>
              </div>
              <Link
                href="/destinations"
                className="inline-flex items-center gap-1 text-sm font-bold text-blue-600 hover:text-blue-700"
              >
                View all <ArrowRight size={14} />
              </Link>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedDistricts.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/destinations/${rel.id}`}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white hover:shadow-lg transition-all"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={rel.image}
                      alt={rel.district}
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 right-3 rounded-full bg-white/90 backdrop-blur-md px-2.5 py-0.5 text-[11px] font-bold text-gray-800 shadow-sm">
                      {rel.touristPlaces.length} Attractions
                    </span>
                  </div>
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-bold text-base text-gray-900 group-hover:text-blue-600 transition-colors">
                        {rel.district}
                      </h4>
                      <p className="mt-1 text-xs text-gray-500 line-clamp-2">
                        {rel.shortDescription}
                      </p>
                    </div>
                    <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-2 text-xs">
                      <span className="font-semibold text-emerald-700">From {inr(rel.startingPrice)}</span>
                      <span className="font-semibold text-blue-600 group-hover:underline inline-flex items-center gap-1">
                        Explore <ArrowRight size={12} />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    );
  }

  /* ─────────────────────────────────────────────────────────────
     2. LEGACY / FALLBACK DESTINATION (MongoDB / External Backend)
  ─────────────────────────────────────────────────────────────── */
  const d = await getDestination(params.slug);
  if (!d) notFound();
  const pk = await getPackages(`destination=${d.slug}&limit=12`);

  return (
    <>
      <section className="relative h-[50vh] min-h-[320px] overflow-hidden bg-lake text-snow">
        <Cover img={d.images?.[0]} name={d.name} />
        <div className="absolute inset-0 bg-gradient-to-t from-deep/85 to-transparent" />
        <div className="container-x absolute inset-x-0 bottom-0 pb-10">
          <p className="text-sm text-glacier">{d.region}, {d.country}</p>
          <h1 className="text-5xl font-bold md:text-6xl">{d.name}</h1>
        </div>
      </section>
      <div className="container-x grid gap-10 py-12 lg:grid-cols-[2fr_1fr]">
        <p className="max-w-prose text-lg leading-relaxed">{d.description}</p>
        <dl className="space-y-3 rounded-2xl border border-lake/10 bg-white p-6 text-sm">
          <div><dt className="text-mist">Best time to visit</dt><dd className="font-semibold text-lake">{d.bestTime ?? 'Year-round'}</dd></div>
          <div><dt className="text-mist">Tours from</dt><dd className="font-semibold text-lake">{inr(d.startingPrice)} per person</dd></div>
          <div><dt className="text-mist">Rating</dt><dd className="font-semibold text-lake">{d.rating.toFixed(1)} / 5</dd></div>
        </dl>
      </div>
      <section className="container-x pb-8">
        <h2 className="text-3xl font-bold text-lake">Tours in {d.name}</h2>
        <div className="mt-6">
          {!pk || pk.items.length === 0 ? (
            <Empty title={`No tours in ${d.name} yet`} hint="Check back soon or ask us for a custom plan." />
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {pk.items.map((p) => <PackageCard key={p._id} p={p} />)}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
