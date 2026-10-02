'use client';
import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import PageHeader from '@/components/PageHeader';
import { inr } from '@/lib/format';
import { post } from '@/lib/api';
import { useAuth } from '@/lib/auth';
import {
  Calendar,
  Users,
  Compass,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Hotel,
  Car,
  Check,
} from 'lucide-react';
import Reveal from '@/components/3d/Reveal';

const HOTEL = {
  budget: { name: 'Standard Cozy Stay', price: 1800 },
  standard: { name: 'Deluxe Valley View', price: 3500 },
  premium: { name: 'Boutique Pine Chalet', price: 6500 },
  luxury: { name: '5-Star Heritage / Houseboat', price: 12000 },
} as const;

const CAR = {
  sedan: { name: 'Private Sedan (Dzire / Etios)', price: 3200 },
  suv: { name: 'Mountain SUV (Innova Crysta 4WD)', price: 4800 },
  tempo: { name: 'Luxury Tempo Traveller 12S', price: 8500 },
} as const;

const INTERESTS = [
  'Dal Lake Sunset Shikara',
  'Gulmarg Gondola Ride',
  'Pahalgam Lidder Rafting',
  'Sonamarg Glacier Pony Trek',
  'Traditional Wazwan Feast',
  'Saffron Valley Photography',
];

const STOPS = ['Srinagar', 'Gulmarg', 'Pahalgam', 'Sonamarg', 'Ladakh'];

export default function PlanPage() {
  const router = useRouter();
  const { user } = useAuth();

  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);

  // Form State
  const [destination, setDestination] = useState('Kashmir (All Valleys)');
  const [days, setDays] = useState(6);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [hotel, setHotel] = useState<keyof typeof HOTEL>('standard');
  const [car, setCar] = useState<keyof typeof CAR>('suv');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([
    'Dal Lake Sunset Shikara',
    'Gulmarg Gondola Ride',
  ]);
  const [email, setEmail] = useState(user?.email || '');
  const [sent, setSent] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Live Animated Cost Calculations
  const est = useMemo(() => {
    const people = adults + children;
    const rooms = Math.ceil((adults + children * 0.5) / 2);
    const h = HOTEL[hotel].price * rooms * days;
    const t = CAR[car].price * days;
    const a = 1500 * selectedInterests.length * Math.max(1, people);
    const f = 750 * people * days;
    return { rooms, h, t, a, f, total: h + t + a + f };
  }, [adults, children, days, hotel, car, selectedInterests]);

  const itinerary = Array.from(
    { length: days },
    (_, i) =>
      `Day ${i + 1}: ${
        STOPS[
          Math.min(STOPS.length - 1, Math.floor((i * STOPS.length) / days))
        ]
      }`
  );

  const toggleInterest = (item: string) => {
    if (selectedInterests.includes(item)) {
      setSelectedInterests(selectedInterests.filter((x) => x !== item));
    } else {
      setSelectedInterests([...selectedInterests, item]);
    }
  };

  const nextStep = () => {
    setDirection(1);
    setStep((s) => Math.min(4, s + 1));
  };

  const prevStep = () => {
    setDirection(-1);
    setStep((s) => Math.max(1, s - 1));
  };

  const handleBook = async () => {
    if (!user) {
      router.push(`/login?next=/plan`);
      return;
    }
    setSubmitting(true);
    setSent('');
    try {
      await post('/enquiries', {
        name: user.name,
        email: user.email,
        destination,
        travellers: adults + children,
        message: `Wizard Plan: ${days} days (${destination}). Hotel: ${hotel}, Car: ${car}. Activities: ${selectedInterests.join(
          ', '
        )}. Estimated: ${inr(est.total)}.`,
      });
      setSent('Your customized Himalayan itinerary has been saved and submitted to our concierge!');
    } catch (er) {
      setSent((er as Error).message);
    } finally {
      setSubmitting(false);
    }
  };

  // 3D Flip/Slide variants
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 80 : -80,
      opacity: 0,
      rotateY: dir > 0 ? 25 : -25,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      rotateY: 0,
      scale: 1,
      transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 80 : -80,
      opacity: 0,
      rotateY: dir < 0 ? 25 : -25,
      scale: 0.95,
      transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
    }),
  };

  return (
    <>
      <PageHeader
        title="Custom Himalayan Wizard"
        subtitle="Craft your bespoke itinerary step-by-step with real-time live price calculation."
      />

      <div className="container-x grid gap-8 pb-16 pt-2 lg:grid-cols-[3fr_2fr]">
        {/* Left: 3D Flip Multi-Step Wizard */}
        <div>
          {/* Progress Indicators */}
          <div className="mb-8 flex items-center justify-between">
            {['Duration', 'Stay & Travelers', 'Experiences', 'Review & Book'].map(
              (name, i) => {
                const s = i + 1;
                const isCurrent = step === s;
                const isDone = step > s;
                return (
                  <div key={name} className="flex flex-1 items-center">
                    <button
                      onClick={() => {
                        setDirection(s > step ? 1 : -1);
                        setStep(s);
                      }}
                      className="group flex flex-col items-center gap-1.5"
                    >
                      <div
                        className={`flex h-9 w-9 items-center justify-center rounded-2xl text-xs font-bold transition-all ${
                          isDone
                            ? 'bg-emerald-500 text-snow shadow'
                            : isCurrent
                            ? 'bg-lake text-snow ring-4 ring-lake/15 shadow-md'
                            : 'bg-lake/10 text-mist'
                        }`}
                      >
                        {isDone ? <Check size={14} /> : s}
                      </div>
                      <span
                        className={`hidden sm:block text-[11px] font-semibold transition-colors ${
                          isCurrent
                            ? 'text-lake'
                            : isDone
                            ? 'text-emerald-700'
                            : 'text-mist'
                        }`}
                      >
                        {name}
                      </span>
                    </button>
                    {i < 3 && (
                      <div
                        className={`mx-2 h-0.5 flex-1 transition-colors ${
                          isDone ? 'bg-emerald-400' : 'bg-lake/10'
                        }`}
                      />
                    )}
                  </div>
                );
              }
            )}
          </div>

          {/* Step Container with 3D Flip Animation */}
          <div
            className="overflow-hidden rounded-3xl border border-lake/10 bg-white/90 p-8 shadow-sm backdrop-blur"
            style={{ perspective: 1200 }}
          >
            <AnimatePresence custom={direction} mode="wait">
              {step === 1 && (
                <motion.div
                  key="step-1"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="space-y-6"
                >
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-crocus">
                      Step 1 of 4
                    </span>
                    <h2 className="mt-1 font-display text-2xl font-bold text-lake">
                      Where and for how long?
                    </h2>
                    <p className="text-sm text-mist">
                      Choose your primary Himalayan region and length of trip.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-lake">
                      Primary Destination Region
                    </label>
                    <div className="mt-2 grid grid-cols-2 gap-3 sm:grid-cols-3">
                      {[
                        'Kashmir (All Valleys)',
                        'Gulmarg & Ski Slopes',
                        'Pahalgam & River Trails',
                        'Sonamarg & Glaciers',
                        'Leh & Ladakh Circuit',
                      ].map((d) => (
                        <button
                          key={d}
                          type="button"
                          onClick={() => setDestination(d)}
                          className={`rounded-2xl border p-3.5 text-left text-xs font-semibold transition-all ${
                            destination === d
                              ? 'border-lake bg-lake text-snow shadow-sm'
                              : 'border-lake/15 bg-white text-lake hover:border-lake/40'
                          }`}
                        >
                          {d}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-semibold text-lake">
                        Trip Duration: {days} Days
                      </label>
                      <span className="text-xs text-mist">{days - 1} Nights</span>
                    </div>
                    <input
                      type="range"
                      min="3"
                      max="14"
                      value={days}
                      onChange={(e) => setDays(Number(e.target.value))}
                      className="mt-3 w-full accent-lake"
                    />
                    <div className="flex justify-between text-[11px] text-mist mt-1">
                      <span>3 Days (Weekend)</span>
                      <span>7 Days (Classic)</span>
                      <span>14 Days (Grand Tour)</span>
                    </div>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      type="button"
                      onClick={nextStep}
                      className="btn btn-dark text-xs py-3 px-6 shadow-md flex items-center gap-2"
                    >
                      <span>Continue to Travelers</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step-2"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="space-y-6"
                >
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-crocus">
                      Step 2 of 4
                    </span>
                    <h2 className="mt-1 font-display text-2xl font-bold text-lake">
                      Travelers & Accommodation
                    </h2>
                    <p className="text-sm text-mist">
                      Specify party size and your preferred lodging tier.
                    </p>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-2xl border border-lake/15 p-4 bg-white/70">
                      <label className="block text-xs font-semibold text-lake">
                        Adults (12+ yrs)
                      </label>
                      <div className="mt-2 flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => setAdults((a) => Math.max(1, a - 1))}
                          className="flex h-9 w-9 items-center justify-center rounded-xl bg-lake/10 font-bold text-lake hover:bg-lake/20"
                        >
                          -
                        </button>
                        <span className="font-display text-xl font-bold text-lake">
                          {adults}
                        </span>
                        <button
                          type="button"
                          onClick={() => setAdults((a) => a + 1)}
                          className="flex h-9 w-9 items-center justify-center rounded-xl bg-lake/10 font-bold text-lake hover:bg-lake/20"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-lake/15 p-4 bg-white/70">
                      <label className="block text-xs font-semibold text-lake">
                        Children (Under 12)
                      </label>
                      <div className="mt-2 flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => setChildren((c) => Math.max(0, c - 1))}
                          className="flex h-9 w-9 items-center justify-center rounded-xl bg-lake/10 font-bold text-lake hover:bg-lake/20"
                        >
                          -
                        </button>
                        <span className="font-display text-xl font-bold text-lake">
                          {children}
                        </span>
                        <button
                          type="button"
                          onClick={() => setChildren((c) => c + 1)}
                          className="flex h-9 w-9 items-center justify-center rounded-xl bg-lake/10 font-bold text-lake hover:bg-lake/20"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-lake mb-2">
                      Hotel & Stay Category ({est.rooms} rooms estimated)
                    </label>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {(Object.keys(HOTEL) as (keyof typeof HOTEL)[]).map((key) => {
                        const hInfo = HOTEL[key];
                        const isSel = hotel === key;
                        return (
                          <button
                            key={key}
                            type="button"
                            onClick={() => setHotel(key)}
                            className={`rounded-2xl border p-4 text-left transition-all ${
                              isSel
                                ? 'border-lake bg-lake text-snow shadow-sm'
                                : 'border-lake/15 bg-white text-lake hover:border-lake/40'
                            }`}
                          >
                            <p className="font-display font-bold text-sm">
                              {hInfo.name}
                            </p>
                            <p
                              className={`text-xs mt-1 ${
                                isSel ? 'text-glacier' : 'text-mist'
                              }`}
                            >
                              {inr(hInfo.price)} / room / night
                            </p>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="pt-4 flex justify-between items-center">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="btn btn-ghost text-xs py-3 px-5 text-lake flex items-center gap-1.5"
                    >
                      <ArrowLeft size={14} /> Back
                    </button>
                    <button
                      type="button"
                      onClick={nextStep}
                      className="btn btn-dark text-xs py-3 px-6 shadow-md flex items-center gap-2"
                    >
                      <span>Continue to Experiences</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step-3"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="space-y-6"
                >
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-crocus">
                      Step 3 of 4
                    </span>
                    <h2 className="mt-1 font-display text-2xl font-bold text-lake">
                      Transport & Alpine Activities
                    </h2>
                    <p className="text-sm text-mist">
                      Select your private cab fleet and curated excursions.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-lake mb-2">
                      Private Mountain Cab (Driver & Fuel Included)
                    </label>
                    <div className="grid gap-3 sm:grid-cols-3">
                      {(Object.keys(CAR) as (keyof typeof CAR)[]).map((key) => {
                        const cInfo = CAR[key];
                        const isSel = car === key;
                        return (
                          <button
                            key={key}
                            type="button"
                            onClick={() => setCar(key)}
                            className={`rounded-2xl border p-4 text-left transition-all ${
                              isSel
                                ? 'border-lake bg-lake text-snow shadow-sm'
                                : 'border-lake/15 bg-white text-lake hover:border-lake/40'
                            }`}
                          >
                            <p className="font-display font-bold text-xs">
                              {cInfo.name}
                            </p>
                            <p
                              className={`text-[11px] mt-1 ${
                                isSel ? 'text-glacier' : 'text-mist'
                              }`}
                            >
                              {inr(cInfo.price)} / day
                            </p>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-lake mb-2">
                      Handpicked Himalayan Experiences ({selectedInterests.length} selected)
                    </label>
                    <div className="grid gap-2 sm:grid-cols-2">
                      {INTERESTS.map((item) => {
                        const isSel = selectedInterests.includes(item);
                        return (
                          <button
                            key={item}
                            type="button"
                            onClick={() => toggleInterest(item)}
                            className={`flex items-center justify-between rounded-xl border p-3 text-left text-xs font-medium transition-all ${
                              isSel
                                ? 'border-crocus bg-crocus/10 text-lake font-bold'
                                : 'border-lake/10 bg-white text-mist hover:border-lake/30'
                            }`}
                          >
                            <span>{item}</span>
                            <div
                              className={`flex h-4 w-4 items-center justify-center rounded-md border ${
                                isSel
                                  ? 'border-crocus bg-crocus text-snow'
                                  : 'border-lake/20'
                              }`}
                            >
                              {isSel && <Check size={10} />}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="pt-4 flex justify-between items-center">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="btn btn-ghost text-xs py-3 px-5 text-lake flex items-center gap-1.5"
                    >
                      <ArrowLeft size={14} /> Back
                    </button>
                    <button
                      type="button"
                      onClick={nextStep}
                      className="btn btn-dark text-xs py-3 px-6 shadow-md flex items-center gap-2"
                    >
                      <span>Review Final Estimate</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 4 && (
                <motion.div
                  key="step-4"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="space-y-6"
                >
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                      Step 4 of 4 • Ready to Reserve
                    </span>
                    <h2 className="mt-1 font-display text-2xl font-bold text-lake">
                      Confirm Your Himalayan Plan
                    </h2>
                    <p className="text-sm text-mist">
                      Review your customized itinerary flow and secure the dates.
                    </p>
                  </div>

                  {/* Summary grid */}
                  <div className="rounded-2xl border border-lake/10 bg-glacier/30 p-5 space-y-3 text-xs">
                    <div className="flex justify-between">
                      <span className="text-mist">Destination:</span>
                      <strong className="text-lake">{destination}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-mist">Party:</span>
                      <strong className="text-lake">
                        {adults} Adults{children > 0 ? `, ${children} Children` : ''}
                      </strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-mist">Lodging:</span>
                      <strong className="text-lake">{HOTEL[hotel].name}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-mist">Transport:</span>
                      <strong className="text-lake">{CAR[car].name}</strong>
                    </div>
                  </div>

                  {/* Route overview */}
                  <div>
                    <h3 className="font-display font-bold text-sm text-lake mb-2">
                      Suggested Daily Flow
                    </h3>
                    <div className="grid gap-1.5 sm:grid-cols-2 text-xs">
                      {itinerary.map((d) => (
                        <div
                          key={d}
                          className="rounded-xl bg-white p-2.5 border border-lake/10 font-medium text-lake"
                        >
                          {d}
                        </div>
                      ))}
                    </div>
                  </div>

                  {sent ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="rounded-2xl bg-emerald-500/10 border border-emerald-500/20 p-5 text-center"
                    >
                      <CheckCircle2
                        className="mx-auto text-emerald-600 mb-2"
                        size={32}
                      />
                      <p className="font-bold text-sm text-lake">{sent}</p>
                      <p className="text-xs text-mist mt-1">
                        Our regional concierge will contact you within 2 business hours.
                      </p>
                    </motion.div>
                  ) : (
                    <div className="pt-2">
                      <button
                        onClick={handleBook}
                        disabled={submitting}
                        className="btn btn-primary w-full shadow-lg shadow-saffron/20 py-3.5 font-bold"
                      >
                        {submitting
                          ? 'Submitting plan…'
                          : user
                          ? 'Save & Submit Custom Plan'
                          : 'Log in to Save & Book This Plan'}
                      </button>
                    </div>
                  )}

                  <div className="pt-2 flex justify-between items-center">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="btn btn-ghost text-xs py-3 px-5 text-lake flex items-center gap-1.5"
                    >
                      <ArrowLeft size={14} /> Back
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right: Live Animated Cost Breakdown Summary Card */}
        <aside className="h-fit space-y-4 rounded-3xl bg-gradient-to-b from-lake to-deep p-8 text-snow shadow-xl lg:sticky lg:top-24">
          <div className="flex items-center gap-2 text-saffron">
            <Sparkles size={18} />
            <h2 className="font-display text-xl font-bold">Live Animated Estimate</h2>
          </div>

          <div className="divide-y divide-white/10 text-xs text-glacier">
            <div className="flex justify-between py-2.5">
              <span>
                Hotels ({est.rooms} rooms × {days} days)
              </span>
              <span className="font-semibold text-snow">{inr(est.h)}</span>
            </div>
            <div className="flex justify-between py-2.5">
              <span>Dedicated Transport ({days} days)</span>
              <span className="font-semibold text-snow">{inr(est.t)}</span>
            </div>
            <div className="flex justify-between py-2.5">
              <span>Experiences ({selectedInterests.length} activities)</span>
              <span className="font-semibold text-snow">{inr(est.a)}</span>
            </div>
            <div className="flex justify-between py-2.5">
              <span>Cuisine & Meal Allowances</span>
              <span className="font-semibold text-snow">{inr(est.f)}</span>
            </div>
          </div>

          {/* Animated Total */}
          <div className="border-t border-white/10 pt-4">
            <span className="text-xs uppercase tracking-wider text-glacier font-semibold">
              Total Package Estimate
            </span>
            <motion.p
              key={est.total}
              initial={{ scale: 1.12, color: '#FFFFFF' }}
              animate={{ scale: 1, color: '#D9A441' }}
              transition={{ duration: 0.3 }}
              className="mt-1 font-display text-4xl font-extrabold"
            >
              {inr(est.total)}
            </motion.p>
            <p className="mt-1 text-[11px] text-glacier/80 leading-relaxed">
              Transparent guaranteed pricing inclusive of taxes, permits, and sanitization fees.
            </p>
          </div>

          <div className="rounded-2xl bg-white/10 p-4 border border-white/10 text-xs">
            <p className="font-semibold text-snow">Wayfarer Price Guarantee</p>
            <p className="mt-0.5 text-glacier/90 text-[11px]">
              No hidden surge charges during high snow season or tulip festivals.
            </p>
          </div>
        </aside>
      </div>
    </>
  );
}
