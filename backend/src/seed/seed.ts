// DEMO DATA ONLY. Never run against production. Run: npm run seed
import mongoose from 'mongoose';
import argon2 from 'argon2';
import { env } from '../config/env';
import { Destination } from '../models/Destination';
import { Package } from '../models/Package';
import { Hotel } from '../models/Hotel';
import { Activity } from '../models/Activity';
import { Vehicle } from '../models/Vehicle';
import { User } from '../models/User';
import { Blog } from '../models/Blog';

if (env.NODE_ENV === 'production') { console.error('Refusing to seed in production'); process.exit(1); }

const dest = [
  ['Srinagar', 'Jammu & Kashmir', 'The summer capital: Dal Lake, houseboats and Mughal gardens.', 34.0837, 74.7973, 'Apr-Oct', 9500],
  ['Gulmarg', 'Jammu & Kashmir', 'Meadow of flowers: gondola, skiing and alpine views.', 34.0484, 74.3805, 'Dec-Mar, Jun-Sep', 11000],
  ['Pahalgam', 'Jammu & Kashmir', 'Lidder river valley with Betaab and Aru valleys.', 34.0161, 75.3150, 'Apr-Oct', 10000],
  ['Sonamarg', 'Jammu & Kashmir', 'Meadow of gold, gateway to Thajiwas Glacier.', 34.3020, 75.2930, 'May-Sep', 10500],
  ['Ladakh', 'Ladakh', 'High-altitude desert, monasteries and Pangong Lake.', 34.1526, 77.5771, 'May-Sep', 22000],
  ['Manali', 'Himachal Pradesh', 'Snowy passes, Solang valley and Rohtang.', 32.2396, 77.1887, 'Mar-Jun, Dec-Feb', 12000],
] as const;

(async () => {
  await mongoose.connect(env.MONGODB_URI);
  await Promise.all([Destination, Package, Hotel, Activity, Vehicle, Blog].map((m: any) => m.deleteMany({})));
  const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-');

  const ds = await Destination.insertMany(dest.map(([name, region, description, lat, lng, bestTime, startingPrice], i) => ({
    name, slug: slug(name), region, description, bestTime, startingPrice, popularity: 100 - i * 10,
    rating: 4.5, location: { type: 'Point', coordinates: [lng, lat] }, images: [],
  })));
  const by = (n: string) => ds.find((d) => d.name === n)!._id;

  await Hotel.insertMany([
    { name: 'Demo Lakeview Houseboat', destination: by('Srinagar'), pricePerNight: 4500, amenities: ['Wi-Fi', 'Breakfast', 'Heating'], rating: 4.4 },
    { name: 'Demo Gulmarg Snow Lodge', destination: by('Gulmarg'), pricePerNight: 6500, amenities: ['Heating', 'Restaurant', 'Parking'], rating: 4.3 },
    { name: 'Demo Pahalgam Riverside Resort', destination: by('Pahalgam'), pricePerNight: 5200, amenities: ['Wi-Fi', 'Breakfast', 'Room service'], rating: 4.5 },
  ].map((h) => ({ ...h, slug: slug(h.name) })));

  await Activity.insertMany([
    { name: 'Gulmarg Gondola Ride', destination: by('Gulmarg'), price: 1800, durationHours: 3 },
    { name: 'Dal Lake Shikara Ride', destination: by('Srinagar'), price: 800, durationHours: 1 },
    { name: 'Pahalgam Pony Ride', destination: by('Pahalgam'), price: 1200, durationHours: 2 },
  ].map((a) => ({ ...a, slug: slug(a.name), description: 'Demo activity' })));

  await Vehicle.insertMany([
    { category: 'sedan', name: 'Dzire', seats: 4, pricePerKm: 14 },
    { category: 'suv', name: 'Innova', seats: 6, pricePerKm: 20 },
    { category: 'tempo_traveller', name: 'Tempo Traveller 12S', seats: 12, pricePerKm: 32 },
  ]);

  await Package.create({
    title: 'Kashmir Paradise 7 Days', slug: 'kashmir-7-days', destination: by('Srinagar'), durationDays: 7,
    basePrice: 18500, discountPercent: 10, isPublished: true, rating: 4.6, reviewCount: 0,
    overview: 'Srinagar, Gulmarg, Pahalgam and Sonamarg in one journey.',
    highlights: ['Shikara ride on Dal Lake', 'Gulmarg gondola', 'Betaab Valley'],
    itinerary: [1, 2, 3, 4, 5, 6, 7].map((day) => ({ day, title: `Day ${day}`, description: 'Demo itinerary', meals: ['Breakfast', 'Dinner'] })),
    included: ['Hotels', 'Breakfast & dinner', 'Private cab', 'Sightseeing'],
    excluded: ['Flights', 'Lunch', 'Personal expenses'],
    pickupLocation: 'Srinagar Airport', transport: 'Private sedan/SUV',
    cancellationPolicy: 'Free cancellation up to 15 days before travel.',
  });


  await Blog.insertMany([
    { title: 'Best Time to Visit Kashmir', slug: 'best-time-to-visit-kashmir', category: 'Guides', tags: ['kashmir', 'season'],
      excerpt: 'Spring tulips, summer meadows, autumn chinars or winter snow: pick your Kashmir.',
      content: ['Kashmir changes character with every season. April brings the tulip garden in Srinagar to bloom.', 'June to September is ideal for Pahalgam and Sonamarg, when roads are open and meadows are green.', 'For skiing and snow at Gulmarg, plan between December and March.'] },
    { title: 'Gulmarg Travel Guide', slug: 'gulmarg-travel-guide', category: 'Guides', tags: ['gulmarg', 'gondola'],
      excerpt: 'Gondola phases, skiing, and how many days you really need.',
      content: ['Gulmarg is about 50 km from Srinagar. Book the gondola ahead in peak season.', 'Phase 1 is easy for everyone. Phase 2 goes higher, so carry warm layers even in summer.'] },
    { title: 'Kashmir Honeymoon Guide', slug: 'kashmir-honeymoon-guide', category: 'Honeymoon', tags: ['honeymoon', 'srinagar'],
      excerpt: 'A five night flow that balances houseboat evenings with mountain days.',
      content: ['Start with two nights in Srinagar including a sunset shikara ride.', 'Move to Pahalgam for riverside quiet, then finish in Gulmarg.'] },
  ].map((b) => ({ ...b, author: 'Wayfarer Team' })));

  await User.deleteOne({ email: 'admin@demo.local' });
  await User.create({ name: 'Demo Admin', email: 'admin@demo.local', role: 'admin', emailVerified: true,
    passwordHash: await argon2.hash('ChangeMe123!') });

  console.log('Seeded demo data. Admin: admin@demo.local / ChangeMe123!');
  await mongoose.disconnect();
})();
