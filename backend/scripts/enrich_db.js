const mongoose = require('mongoose');

async function seed() {
  await mongoose.connect('mongodb://127.0.0.1:27017/TRAVEL2');
  const db = mongoose.connection;

  // 1. Update Destinations with HD images & complete information
  const destData = [
    {
      slug: 'srinagar',
      name: 'Srinagar',
      region: 'Kashmir Valley',
      description: 'The crowning jewel of Kashmir nestled on the banks of Jhelum. Renowned for Dal Lake, traditional houseboats, Mughal Gardens, and Shankaracharya Temple.',
      images: [
        { url: 'https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&w=1200&q=80', publicId: 'sri-1' },
        { url: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=800&q=80', publicId: 'sri-2' }
      ],
      location: { type: 'Point', coordinates: [74.7973, 34.0837] },
      bestTime: 'April to October',
      startingPrice: 14500,
      rating: 4.9,
      popularity: 98,
      isPublished: true
    },
    {
      slug: 'gulmarg',
      name: 'Gulmarg',
      region: 'Kashmir Valley',
      description: 'World-famous Meadow of Flowers, home to Asia\'s highest Gondola cable car (3,980m), Apharwat peak ski slopes, and lush alpine meadows.',
      images: [
        { url: 'https://images.unsplash.com/photo-1605649487212-47bdab064df8?auto=format&fit=crop&w=1200&q=80', publicId: 'gul-1' },
        { url: 'https://images.unsplash.com/photo-1566837945700-30057527ade0?auto=format&fit=crop&w=800&q=80', publicId: 'gul-2' }
      ],
      location: { type: 'Point', coordinates: [74.3805, 34.0484] },
      bestTime: 'Dec to March (Snow) | May to Sept (Meadow)',
      startingPrice: 18500,
      rating: 4.9,
      popularity: 96,
      isPublished: true
    },
    {
      slug: 'pahalgam',
      name: 'Pahalgam',
      region: 'Kashmir Valley',
      description: 'Valley of Shepherds surrounded by dense pine forests and the roaring Lidder River. Gateway to Betaab Valley, Aru Valley, and Baisaran Valley.',
      images: [
        { url: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=1200&q=80', publicId: 'pah-1' },
        { url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80', publicId: 'pah-2' }
      ],
      location: { type: 'Point', coordinates: [75.1950, 34.0163] },
      bestTime: 'March to November',
      startingPrice: 16000,
      rating: 4.8,
      popularity: 93,
      isPublished: true
    },
    {
      slug: 'sonamarg',
      name: 'Sonamarg',
      region: 'Kashmir Valley',
      description: 'The Golden Meadow situated along Sindh River, backed by towering snowy peaks and the Thajiwas Glacier with pony treks.',
      images: [
        { url: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1200&q=80', publicId: 'son-1' }
      ],
      location: { type: 'Point', coordinates: [75.2952, 34.3000] },
      bestTime: 'May to October',
      startingPrice: 13500,
      rating: 4.7,
      popularity: 89,
      isPublished: true
    },
    {
      slug: 'vaishno-devi',
      name: 'Vaishno Devi (Katra)',
      region: 'Jammu Division',
      description: 'One of the holiest Hindu pilgrimages in India, nestled in the holy Trikuta Hills of Reasi district with scenic battery car & helicopter links.',
      images: [
        { url: 'https://images.unsplash.com/photo-1626014303757-65644775b6d1?auto=format&fit=crop&w=1200&q=80', publicId: 'vd-1' }
      ],
      location: { type: 'Point', coordinates: [74.9490, 32.9928] },
      bestTime: 'All Year Round',
      startingPrice: 9500,
      rating: 4.9,
      popularity: 95,
      isPublished: true
    },
    {
      slug: 'leh',
      name: 'Leh-Ladakh (via J&K)',
      region: 'Ladakh / J&K Border',
      description: 'Spectacular moonscapes, high mountain passes including Khardung La & Chang La, ancient Buddhist monasteries, and the cobalt blue Pangong Lake.',
      images: [
        { url: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1200&q=80', publicId: 'leh-1' }
      ],
      location: { type: 'Point', coordinates: [77.5771, 34.1526] },
      bestTime: 'June to September',
      startingPrice: 32000,
      rating: 4.9,
      popularity: 92,
      isPublished: true
    }
  ];

  for (const d of destData) {
    await db.collection('destinations').updateOne(
      { slug: d.slug },
      { $set: d },
      { upsert: true }
    );
  }
  console.log('Destinations updated with HD images and data.');

  // 2. Seed Payments for existing Bookings
  const bookings = await db.collection('bookings').find().toArray();
  const users = await db.collection('users').find().toArray();
  const fallbackUser = users[0]?._id;

  await db.collection('payments').deleteMany({});
  const paymentDocs = bookings.map((b, idx) => ({
    booking: b._id,
    user: b.user || fallbackUser,
    provider: idx % 2 === 0 ? 'razorpay' : 'upi',
    orderId: `order_${b.bookingId || 'WF'}_${Date.now().toString().slice(-4)}`,
    paymentId: `pay_${b.bookingId || 'WF'}_${1000 + idx}`,
    amount: b.total || 25000,
    status: b.status === 'confirmed' || b.status === 'completed' ? 'paid' : 'created',
    createdAt: b.createdAt || new Date(),
    updatedAt: new Date(),
  }));
  if (paymentDocs.length > 0) {
    await db.collection('payments').insertMany(paymentDocs);
    console.log(`Created ${paymentDocs.length} real payment records.`);
  }

  // 3. Seed Reviews for packages
  const packages = await db.collection('packages').find().toArray();
  await db.collection('reviews').deleteMany({});
  const reviewDocs = [
    {
      user: users[0]?._id || fallbackUser,
      booking: bookings[0]?._id,
      package: packages[0]?._id,
      rating: 5,
      text: 'Unforgettable experience! Dal Lake shikara ride at sunset was breathtaking, and our driver was super punctual and polite.',
      status: 'approved',
      createdAt: new Date('2026-05-18T10:30:00Z'),
      updatedAt: new Date()
    },
    {
      user: users[1]?._id || fallbackUser,
      booking: bookings[1]?._id,
      package: packages[1]?._id,
      rating: 5,
      text: 'Gulmarg Phase 2 Gondola ride was thrilling! Snow was deep and pristine. Wayfarer took care of all permits and equipment.',
      status: 'approved',
      createdAt: new Date('2026-06-02T14:15:00Z'),
      updatedAt: new Date()
    },
    {
      user: users[2]?._id || fallbackUser,
      booking: bookings[2]?._id,
      package: packages[2]?._id,
      rating: 5,
      text: 'Leh-Ladakh road trip via Zojila pass was life-changing. Great hotel recommendations and 24/7 oxygen cylinder in cab.',
      status: 'approved',
      createdAt: new Date('2026-06-25T09:00:00Z'),
      updatedAt: new Date()
    },
    {
      user: users[0]?._id || fallbackUser,
      booking: bookings[3]?._id,
      package: packages[3]?._id,
      rating: 4,
      text: 'Gurez Valley is truly an untouched heaven. Wooden bridges and Habba Khatoon peak were mesmerising. Road was slightly bumpy.',
      status: 'approved',
      createdAt: new Date('2026-07-10T16:45:00Z'),
      updatedAt: new Date()
    },
    {
      user: users[1]?._id || fallbackUser,
      booking: bookings[4]?._id,
      package: packages[4]?._id,
      rating: 5,
      text: 'Pahalgam riverside camp was serene. Authentic Kashmiri Wazwan food arranged by the team was simply out of this world!',
      status: 'pending',
      createdAt: new Date('2026-08-20T11:20:00Z'),
      updatedAt: new Date()
    }
  ];

  await db.collection('reviews').insertMany(reviewDocs);
  console.log(`Created ${reviewDocs.length} real review records.`);

  process.exit(0);
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});
