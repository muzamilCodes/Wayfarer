export interface Top10GalleryImage {
  url: string;
  title: string;
  caption: string;
}

export interface JKTop10Destination {
  id: string;
  rank: number;
  name: string;
  subtitle: string;
  district: string;
  division: 'Kashmir Valley' | 'Jammu Division';
  overview: string; // The exact text from the provided travel guide
  englishOverview: string;
  bestTime: string; // From the provided travel guide
  bestSeasonBadge: string;
  rating: number;
  reviewsCount: number;
  startingPrice: number;
  altitude: string;
  nearestHub: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  googleMapsUrl: string;
  googleMapsEmbedUrl: string;
  coverImage: string;
  gallery: Top10GalleryImage[];
  highlights: string[];
  activities: string[];
  districtSlug: string;
}

export const JK_TOP_10_DESTINATIONS: JKTop10Destination[] = [
  // 1. Srinagar (Dal Lake & Mughal Gardens)
  {
    id: 'srinagar',
    rank: 1,
    name: 'Srinagar (Dal Lake & Mughal Gardens)',
    subtitle: 'Kashmir ka Dil, Iconic Shikaras & Royal Mughal Gardens',
    district: 'Srinagar',
    division: 'Kashmir Valley',
    overview: 'Kashmir ka dil aur summer capital. Iconic shikara rides, wooden houseboats par stay, aur Nishat-Shalimar jaise historic Mughal Gardens ke liye mashhoor.',
    englishOverview: 'The heart and summer capital of Jammu & Kashmir, famous across the world for serene Dal and Nigeen Lakes, tranquil carved cedar houseboats, floating flower & vegetable markets, and terraced Mughal Gardens built under Emperor Jahangir.',
    bestTime: 'April to October (Pleasant), Dec-Jan (Snow)',
    bestSeasonBadge: 'Apr - Oct (Pleasant) | Dec - Jan (Snow)',
    rating: 4.9,
    reviewsCount: 4850,
    startingPrice: 8500,
    altitude: '1,585 m (5,200 ft)',
    nearestHub: 'Sheikh ul-Alam International Airport, Srinagar (12 km)',
    coordinates: {
      lat: 34.0837,
      lng: 74.7973,
    },
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Dal+Lake+Srinagar+Jammu+and+Kashmir',
    googleMapsEmbedUrl: 'https://maps.google.com/maps?q=Dal+Lake+Srinagar+Jammu+and+Kashmir&t=&z=13&ie=UTF8&iwloc=&output=embed',
    coverImage: 'https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&w=1400&q=85',
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&w=1200&q=80',
        title: 'Dal Lake Morning Shikara Ride',
        caption: 'Tranquil wooden shikaras gliding on the glassy waters of Dal Lake in early morning light.',
      },
      {
        url: 'https://images.unsplash.com/photo-1597074866923-dc0589150358?auto=format&fit=crop&w=1200&q=80',
        title: 'Handcrafted Wooden Houseboats',
        caption: 'Heritage cedar-carved houseboats anchored with majestic Zabarwan mountain views.',
      },
      {
        url: 'https://images.unsplash.com/photo-1566837945700-30057527ade0?auto=format&fit=crop&w=1200&q=80',
        title: 'Nishat & Shalimar Mughal Gardens',
        caption: 'Terraced Persian cascading fountains, centuries-old chinar trees, and blossoming flowerbeds.',
      },
      {
        url: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1200&q=80',
        title: 'Char Chinar Island & Floating Markets',
        caption: 'Iconic four ancient chinars in the midst of Dal Lake and the bustling early morning floating market.',
      },
      {
        url: 'https://images.unsplash.com/photo-1614082242765-7c98ca0f3df3?auto=format&fit=crop&w=1200&q=80',
        title: 'Winter Wonderland at Dal Lake',
        caption: 'Snow blankets the wooden houseboats and surrounding Pir Panjal mountains.',
      },
    ],
    highlights: [
      'Iconic Shikara Ride on Dal & Nigeen Lakes',
      'Overnight stay in Handcrafted Cedar Houseboat',
      'UNESCO-recognized Nishat Bagh & Shalimar Bagh',
      'Floating Vegetable Market at Sunrise',
      'Char Chinar Island & Hazratbal Shrine',
      'Downtown Srinagar Heritage Walking Trail',
    ],
    activities: ['Shikara Boat Rides', 'Houseboat Stay', 'Photography', 'Heritage Tours', 'Local Handicraft Shopping', 'Mughal Garden Walks'],
    districtSlug: 'srinagar',
  },

  // 2. Gulmarg
  {
    id: 'gulmarg',
    rank: 2,
    name: 'Gulmarg',
    subtitle: "Meadow of Flowers & Asia's Premier Skiing Paradise",
    district: 'Baramulla',
    division: 'Kashmir Valley',
    overview: 'Asia ka top skiing destination. World-famous Gulmarg Gondola (Asia ki sabse unchi cable cars me se ek) aur Apharwat Peak ki year-round barf yahan ka main attraction hai.',
    englishOverview: "Ranked among Asia's top winter sports hubs and premier alpine resorts. Home to the legendary two-phase Gulmarg Gondola ascending to 13,780 ft on Apharwat Peak, endless powder snow slopes, and lush wildflower fairways in summer.",
    bestTime: 'Dec to March (Skiing), April to June (Meadows)',
    bestSeasonBadge: 'Dec - Mar (Skiing & Snow) | Apr - Jun (Meadows)',
    rating: 4.9,
    reviewsCount: 5210,
    startingPrice: 11000,
    altitude: '2,650 m (8,694 ft) to 4,200 m (Apharwat Peak)',
    nearestHub: 'Srinagar Airport (51 km, ~1.5 hours drive via Tangmarg)',
    coordinates: {
      lat: 34.0484,
      lng: 74.3805,
    },
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Gulmarg+Gondola+Baramulla+Jammu+and+Kashmir',
    googleMapsEmbedUrl: 'https://maps.google.com/maps?q=Gulmarg+Gondola+Baramulla+Jammu+and+Kashmir&t=&z=13&ie=UTF8&iwloc=&output=embed',
    coverImage: 'https://images.unsplash.com/photo-1614082242765-7c98ca0f3df3?auto=format&fit=crop&w=1400&q=85',
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1614082242765-7c98ca0f3df3?auto=format&fit=crop&w=1200&q=80',
        title: 'Gulmarg Gondola to Apharwat Peak',
        caption: 'The world-renowned two-phase cable car traversing towering snow-clad pines up to 13,780 ft.',
      },
      {
        url: 'https://images.unsplash.com/photo-1551524559-8af4e6624178?auto=format&fit=crop&w=1200&q=80',
        title: 'Powder Skiing & Snowboarding Slopes',
        caption: 'Himalayan deep powder snow on Apharwat Peak attracts skiers and snowboarders from around the globe.',
      },
      {
        url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
        title: 'Verdant Summer Golf Course & Meadows',
        caption: 'In summer, the snow gives way to a carpet of vibrant lupines and the highest green golf course.',
      },
      {
        url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
        title: 'Historic St. Mary’s Church & Strawberry Valley',
        caption: 'Victorian-era stone architecture surrounded by dense deodar pine forests and horse riding trails.',
      },
    ],
    highlights: [
      'Two-Stage Gulmarg Gondola (Phase 1 Kongdoori & Phase 2 Apharwat Peak)',
      'World-Class Powder Skiing & Snowboarding with Certified Instructors',
      'Panoramic 360° Views of Nanga Parbat on Clear Days',
      'High-Altitude 18-Hole Historic Golf Course',
      'Alpather Frozen Lake Trek',
      'Snowmobiling, ATV Rides & Sledge Expeditions',
    ],
    activities: ['Gondola Cable Car Ride', 'Skiing & Snowboarding', 'Snowmobiling', 'Alpather Lake Trekking', 'Horseback Riding', 'Golfing'],
    districtSlug: 'baramulla',
  },

  // 3. Pahalgam
  {
    id: 'pahalgam',
    rank: 3,
    name: 'Pahalgam',
    subtitle: 'Valley of Shepherds, Roaring Lidder & Betaab Valley',
    district: 'Anantnag',
    division: 'Kashmir Valley',
    overview: "Lidder river ke kinare basi valley. Betaab Valley, Aru Valley, aur Baisaran ('Mini Switzerland') ke haseen devdar ke jangal aur pony trekking ke liye famous.",
    englishOverview: 'Known as the Valley of Shepherds, Pahalgam rests at the confluence of the Lidder River and Sheshnag stream. Famous for the emerald beauty of Betaab Valley, tranquil Aru Valley, pine-surrounded Baisaran ("Mini Switzerland"), and as the traditional starting base of the holy Amarnath Yatra.',
    bestTime: 'March to November',
    bestSeasonBadge: 'Mar - Nov (Pleasant Meadows) | Dec - Feb (Snow)',
    rating: 4.8,
    reviewsCount: 4620,
    startingPrice: 10000,
    altitude: '2,130 m (6,990 ft)',
    nearestHub: 'Srinagar Airport (90 km, ~2.5 hours drive)',
    coordinates: {
      lat: 34.0161,
      lng: 75.3150,
    },
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Betaab+Valley+Pahalgam+Anantnag+Jammu+and+Kashmir',
    googleMapsEmbedUrl: 'https://maps.google.com/maps?q=Betaab+Valley+Pahalgam+Anantnag+Jammu+and+Kashmir&t=&z=13&ie=UTF8&iwloc=&output=embed',
    coverImage: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1400&q=85',
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1200&q=80',
        title: 'Betaab Valley & Flowing Lidder Waters',
        caption: 'Breathtaking cinematic scenery named after the Bollywood hit film Betaab, framed by willow groves.',
      },
      {
        url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
        title: 'Baisaran (Mini Switzerland of India)',
        caption: 'Vast rolling green meadows surrounded by dense deodar forests, accessible via pony trail or hike.',
      },
      {
        url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
        title: 'Aru Valley Alpine Settlement',
        caption: 'Tranquil village 12 km from Pahalgam, the trailhead for Kolahoi Glacier and Tarsar Marsar treks.',
      },
      {
        url: 'https://images.unsplash.com/photo-1518457607834-6e8d80c183c5?auto=format&fit=crop&w=1200&q=80',
        title: 'Lidder River White Water & Trout Fishing',
        caption: 'Chilly glacier waters rushing through boulders, world-famous for brown trout angling and river rafting.',
      },
    ],
    highlights: [
      'Betaab Valley Emerald Meadows & Willow Groves',
      'Baisaran Plateau (Mini Switzerland) Pony Trek',
      'Aru Valley & Kolahoi Glacier Base Camp',
      'Chandanwari Snow Point & Amarnath Yatra Gateway',
      'White-Water Rafting on Chilly Lidder River',
      'Mamal 12th-Century Historic Stone Temple',
    ],
    activities: ['River Rafting', 'Pony Trekking', 'Trout Angling', 'Photography', 'Camping & Bonfire', 'Nature Walks'],
    districtSlug: 'anantnag',
  },

  // 4. Sonamarg
  {
    id: 'sonamarg',
    rank: 4,
    name: 'Sonamarg',
    subtitle: 'Meadow of Gold, Thajiwas Glacier & Gateway to Ladakh',
    district: 'Ganderbal',
    division: 'Kashmir Valley',
    overview: "'Meadow of Gold'. Sindh river ke tat par alpine pahaad aur Thajiwas Glacier ka breathtaking view. Ladakh route ka shandaar gateway.",
    englishOverview: "Literally translating to 'Meadow of Gold', Sonamarg sits perched at 2,740 m along the roaring Sindh River. Surrounded by towering alpine peaks, the perennial frozen Thajiwas Glacier, and serving as the dramatic mountain gateway to Ladakh over the Zoji La pass.",
    bestTime: 'April to September',
    bestSeasonBadge: 'Apr - Sep (Glacier & Ladakh Route)',
    rating: 4.7,
    reviewsCount: 3890,
    startingPrice: 10500,
    altitude: '2,740 m (8,990 ft)',
    nearestHub: 'Srinagar Airport (80 km, ~2.5 hours via Srinagar-Leh Highway)',
    coordinates: {
      lat: 34.3020,
      lng: 75.2930,
    },
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Thajiwas+Glacier+Sonamarg+Ganderbal+Jammu+and+Kashmir',
    googleMapsEmbedUrl: 'https://maps.google.com/maps?q=Thajiwas+Glacier+Sonamarg+Ganderbal+Jammu+and+Kashmir&t=&z=13&ie=UTF8&iwloc=&output=embed',
    coverImage: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1400&q=85',
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80',
        title: 'Thajiwas Glacier Perennial Ice Fields',
        caption: 'Spectacular hanging glacier accessible via pony trek, offering year-round snow activities.',
      },
      {
        url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
        title: 'Sindh River & Pine-Covered Slopes',
        caption: 'The mighty Sindh River cascading through fir-carpeted gorges along the Srinagar-Leh Highway.',
      },
      {
        url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
        title: 'Baltal Valley & High Mountain Pass',
        caption: 'Dramatic mountain pass amphitheatre and the Northern gateway to the Great Lakes trek.',
      },
      {
        url: 'https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&w=1200&q=80',
        title: 'Golden Meadows under Alpine Peaks',
        caption: 'Yellow sycamore trees and alpine blossoms reflecting warm sunlight in the high valley.',
      },
    ],
    highlights: [
      'Thajiwas Glacier Year-Round Snowfield & Sledge Rides',
      'Roaring Sindh River White Water & Trout Fishing',
      'Trailhead for the Iconic Kashmir Great Lakes Trek',
      'Baltal Valley Scenic Base & Amarnath North Route',
      'Zoji La Pass (11,575 ft) Ladakh Gateway Excursion',
      'Zero Point Snow Adventure & Hot Kashmiri Kehwa',
    ],
    activities: ['Glacier Sledging', 'Pony Rides', 'Trekking', 'White-Water Rafting', 'Zero Point Excursion', 'Camping'],
    districtSlug: 'ganderbal',
  },

  // 5. Doodhpathri
  {
    id: 'doodhpathri',
    rank: 5,
    name: 'Doodhpathri',
    subtitle: 'Valley of Milk, Rolling Green Bugyals & Frothing Shaliganga',
    district: 'Budgam',
    division: 'Kashmir Valley',
    overview: "'Valley of Milk'. Ek tezi se trending offbeat spot jahan rolling green bugyals (maidan) aur tezi se behti milky river (Shaliganga) shanti deti hai.",
    englishOverview: "Dubbed the 'Valley of Milk', Doodhpathri is one of Kashmir's most rapidly trending offbeat eco-paradises. The roaring waters of the Shaliganga River froth into milky-white foam as they rush over smooth pebbles across endless rolling green bugyals (high-altitude meadows) ringed by dense deodar pine forests.",
    bestTime: 'May to September',
    bestSeasonBadge: 'May - Sep (Lush Velvet Meadows)',
    rating: 4.8,
    reviewsCount: 2340,
    startingPrice: 7200,
    altitude: '2,730 m (8,957 ft)',
    nearestHub: 'Srinagar City / Airport (42 km, ~1.5 hours drive via Budgam-Khan Sahib)',
    coordinates: {
      lat: 33.8647,
      lng: 74.5639,
    },
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Doodhpathri+Budgam+Jammu+and+Kashmir',
    googleMapsEmbedUrl: 'https://maps.google.com/maps?q=Doodhpathri+Budgam+Jammu+and+Kashmir&t=&z=13&ie=UTF8&iwloc=&output=embed',
    coverImage: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1400&q=85',
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
        title: 'Frothing Shaliganga River (Valley of Milk)',
        caption: 'The crystal clear mountain torrent splashing white foam over polished riverbed stones.',
      },
      {
        url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
        title: 'Endless Rolling Green Bugyals',
        caption: 'Wide expanse of lush emerald pastures that feel like natural green carpets in the sky.',
      },
      {
        url: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1200&q=80',
        title: 'Pine Forest Trails & Shepherd Hamlets',
        caption: 'Traditional Gujjar wooden mud dwellings, grazing sheep, and serene mountain air.',
      },
      {
        url: 'https://images.unsplash.com/photo-1518457607834-6e8d80c183c5?auto=format&fit=crop&w=1200&q=80',
        title: 'Parhzoor Meadow & Picnic Streams',
        caption: 'Quiet picnic spots along fresh spring rivulets, away from loud commercial tourist crowds.',
      },
    ],
    highlights: [
      'Milky Frothing Rapids of Shaliganga River',
      'Vast Uncommercialized Rolling Bugyals (Meadows)',
      'Parhzoor Alpine Grassland & Spring Brooks',
      'Fresh Kashmiri Shepherd Milk & Organic Kehwa',
      'Tranquil Deodar Pine Walking & Horse Riding Trails',
      'Untouched Natural Photography & Peaceful Picnics',
    ],
    activities: ['Riverside Picnicking', 'Horse Riding', 'Nature Walks', 'Offbeat Camping', 'Photography', 'River Wading'],
    districtSlug: 'budgam',
  },

  // 6. Gurez Valley
  {
    id: 'gurez',
    rank: 6,
    name: 'Gurez Valley',
    subtitle: 'High-Altitude Border Haven, Habba Khatoon Peak & Dard Heritage',
    district: 'Bandipora',
    division: 'Kashmir Valley',
    overview: 'High-altitude border valley jahan pyramid shape ki Habba Khatoon peak aur turquoise Kishanganga river behti hai. Authentic Dard-Shina culture aur peace.',
    englishOverview: 'Tucked along the Line of Control at 2,400 m, Gurez Valley is a hidden gem of immense natural and cultural grandeur. Guarded by the monumental pyramid of Habba Khatoon Peak, blessed by the shimmering turquoise waters of the Kishanganga River, and preserving the rare, ancient tribal traditions of the Dard-Shin people in traditional log-built villages.',
    bestTime: 'June to September',
    bestSeasonBadge: 'Jun - Sep (Razdan Pass Open)',
    rating: 4.9,
    reviewsCount: 2280,
    startingPrice: 8500,
    altitude: '2,400 m (7,874 ft) to 3,557 m (Razdan Pass)',
    nearestHub: 'Srinagar Airport (123 km via Bandipora & Razdan Pass, ~5 hours)',
    coordinates: {
      lat: 34.6369,
      lng: 74.8394,
    },
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Gurez+Valley+Dawar+Bandipora+Jammu+and+Kashmir',
    googleMapsEmbedUrl: 'https://maps.google.com/maps?q=Gurez+Valley+Dawar+Bandipora+Jammu+and+Kashmir&t=&z=12&ie=UTF8&iwloc=&output=embed',
    coverImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1400&q=85',
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
        title: 'Pyramidal Habba Khatoon Peak',
        caption: 'The legendary triangular mountain towering over Dawar town, named after Kashmir’s iconic poetess queen.',
      },
      {
        url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
        title: 'Turquoise Kishanganga River Waters',
        caption: 'Clean glacial waters snaking through the dramatic Himalayan canyon of Gurez.',
      },
      {
        url: 'https://images.unsplash.com/photo-1518457607834-6e8d80c183c5?auto=format&fit=crop&w=1200&q=80',
        title: 'Authentic Dardic Log Hamlets in Dawar',
        caption: 'Unique centuries-old wooden log cabins and stone huts that preserve ancient Himalayan culture.',
      },
      {
        url: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80',
        title: 'Razdan Pass High Altitude Drive (11,672 ft)',
        caption: 'Thrilling mountain pass road offering panoramic vistas of Harmukh Peak and snow-capped ranges.',
      },
    ],
    highlights: [
      'Iconic Pyramidal Habba Khatoon Peak & Spring',
      'Turquoise Kishanganga River Riverside Camping',
      'Unique Dard-Shin Tribal Culture & Log Architecture',
      'Thrilling Razdan Pass Crossing (11,672 ft)',
      'Dawar Market & Historic Border Observation Viewpoints',
      'Tulail Valley & Chakwali Border Outpost Excursion',
    ],
    activities: ['Border Eco-Tourism', 'Riverside Camping', 'Trout Fishing', 'Cultural Photography', 'High Pass Off-Roading', 'Star Gazing'],
    districtSlug: 'bandipora',
  },

  // 7. Yusmarg
  {
    id: 'yusmarg',
    rank: 7,
    name: 'Yusmarg',
    subtitle: 'Meadow of Jesus, Nilnag Alpine Lake & Dense Pine Solitude',
    district: 'Budgam',
    division: 'Kashmir Valley',
    overview: "'Meadow of Jesus'. Pine forest aur dense deodar ke beech ghire shant maidan. Dudh Ganga river trek aur Nilnag lake ke liye ek peaceful picnic spot.",
    englishOverview: "Known as the 'Meadow of Jesus' in local folklore, Yusmarg is an oasis of peace enveloped by immense old-growth pine and deodar forests at 2,396 m. Overlooked by the snow-crested Tatakooti Peak, it offers thrilling pony treks down into the Dudh Ganga boulder gorge and serene forested hikes to the emerald waters of Nilnag Lake.",
    bestTime: 'May to September',
    bestSeasonBadge: 'May - Sep (Alpine Blooms & Forest Treks)',
    rating: 4.7,
    reviewsCount: 1980,
    startingPrice: 6900,
    altitude: '2,396 m (7,860 ft)',
    nearestHub: 'Srinagar Airport (47 km, ~1.5 hours drive via Chadoora-Charar-i-Sharief)',
    coordinates: {
      lat: 33.8319,
      lng: 74.6644,
    },
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Yusmarg+Budgam+Jammu+and+Kashmir',
    googleMapsEmbedUrl: 'https://maps.google.com/maps?q=Yusmarg+Budgam+Jammu+and+Kashmir&t=&z=13&ie=UTF8&iwloc=&output=embed',
    coverImage: 'https://images.unsplash.com/photo-1518457607834-6e8d80c183c5?auto=format&fit=crop&w=1400&q=85',
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1518457607834-6e8d80c183c5?auto=format&fit=crop&w=1200&q=80',
        title: 'Expansive Yusmarg Meadow Bowl',
        caption: 'Enormous green basin encircled by towering deodar forests and distant Tatakooti snow peak.',
      },
      {
        url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
        title: 'Dudh Ganga River Gorge & Boulder Rapids',
        caption: 'Roaring foaming mountain torrent flowing through a dramatic pine-clad canyon.',
      },
      {
        url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
        title: 'Nilnag Lake Pine Sanctuary',
        caption: 'Peaceful turquoise lake tucked into a dense forest basin, famous for tranquil reflections.',
      },
      {
        url: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1200&q=80',
        title: 'Horseback Trekking Through Pine Ridges',
        caption: 'Scenic equestrian trails leading towards Sang-e-Safed frozen lake and high shepherd huts.',
      },
    ],
    highlights: [
      'Expansive Yusmarg Alpine Basin (Meadow of Jesus)',
      'Exciting Dudh Ganga River Gorge Trail',
      'Nilnag Lake Turquoise Forest Oasis',
      'Panoramic Vistas of Tatakooti Peak (4,725 m)',
      'En-Route Visit to Historic Shrine of Sheikh Noor-ud-Din Wali at Charar-i-Sharief',
      'Sang-e-Safed (White Rocks) High Altitude Day Hike',
    ],
    activities: ['Horseback Riding', 'Forest Hiking', 'Picnicking', 'Dudh Ganga Riverside Trek', 'Nilnag Lake Excursion', 'Nature Photography'],
    districtSlug: 'budgam',
  },

  // 8. Katra (Mata Vaishno Devi)
  {
    id: 'katra-vaishnodevi',
    rank: 8,
    name: 'Katra (Mata Vaishno Devi)',
    subtitle: 'Sacred Trikuta Hills & Holy Cave Shrine Pilgrimage Hub',
    district: 'Reasi',
    division: 'Jammu Division',
    overview: 'Jammu region ka sabse pavitra pilgrimage center. Trikuta pahaad par sthit Mata Vaishno Devi Holy Cave shrine ke darshan ka base camp.',
    englishOverview: "India's premier sacred pilgrimage center located in the Trikuta Mountain foothills of Jammu. Katra serves as the vibrant base camp for millions of devotees embarking on the sacred 13-km trek to the holy cave shrine of Shri Mata Vaishno Devi Ji, nestled high in the hills.",
    bestTime: 'Year-round (March-April, Sept-Oct best)',
    bestSeasonBadge: 'Year-Round (Navratri & Autumn Best)',
    rating: 4.9,
    reviewsCount: 6840,
    startingPrice: 6500,
    altitude: '754 m (Katra Base) to 1,585 m (Holy Bhawan)',
    nearestHub: 'Shri Mata Vaishno Devi Katra Railway Station (SVDK) / Jammu Airport (48 km)',
    coordinates: {
      lat: 32.9915,
      lng: 74.9535,
    },
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Shri+Mata+Vaishno+Devi+Katra+Jammu+and+Kashmir',
    googleMapsEmbedUrl: 'https://maps.google.com/maps?q=Shri+Mata+Vaishno+Devi+Katra+Jammu+and+Kashmir&t=&z=13&ie=UTF8&iwloc=&output=embed',
    coverImage: 'https://images.unsplash.com/photo-1566438480900-0609be27a4be?auto=format&fit=crop&w=1400&q=85',
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1566438480900-0609be27a4be?auto=format&fit=crop&w=1200&q=80',
        title: 'Holy Shrine of Mata Vaishno Devi on Trikuta Mountain',
        caption: 'The sacred Bhawan glowing atop the Trikuta hills under star-filled Himalayan night skies.',
      },
      {
        url: 'https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&w=1200&q=80',
        title: 'Scenic Trikuta Pilgrimage Path',
        caption: 'Well-paved, illuminated 13-km pilgrim track overlooking lush Shivalik hills and valleys.',
      },
      {
        url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
        title: 'Bhairon Ghati Scenic Passenger Ropeway',
        caption: 'Modern passenger cable car whisking pilgrims from the Bhawan to the high ridge of Bhairon Temple.',
      },
      {
        url: 'https://images.unsplash.com/photo-1518457607834-6e8d80c183c5?auto=format&fit=crop&w=1200&q=80',
        title: 'Katra Base Camp & Shivalik Mountain Panorama',
        caption: 'Thriving base town equipped with modern hotels, helicopter services, and traditional dry-fruit bazaars.',
      },
    ],
    highlights: [
      'Sacred Darshan of Shri Mata Vaishno Devi Natural Pindies',
      'Illuminated 13-km Trikuta Mountain Pilgrimage Walk',
      'Modern Bhawan-to-Bhairon Ghati Passenger Ropeway',
      'Ban Ganga, Charan Paduka & Ardhkuwari Holy Cave',
      'Helicopter Service from Katra to Sanjichhat',
      'Day Excursion to World’s Highest Chenab Rail Bridge & Shiv Khori Cave',
    ],
    activities: ['Spiritual Darshan', 'Night Pilgrimage Trek', 'Ropeway Rides', 'Helicopter Tours', 'Local Bazaar Shopping', 'Shiv Khori Excursion'],
    districtSlug: 'reasi',
  },

  // 9. Patnitop
  {
    id: 'patnitop',
    rank: 9,
    name: 'Patnitop',
    subtitle: 'Scenic Plateau Hill Station, Skyview Empyrean Ropeway & Sanasar',
    district: 'Udhampur',
    division: 'Jammu Division',
    overview: 'Jammu belt ka scenic plateau hill station. Ab Skyview Empyrean ropeway/gondola, adventure park (zipline, tubing) aur snow view ke liye trending hai.',
    englishOverview: "Jammu region's most beloved pine-fringed hill resort, perched on a scenic plateau at 2,024 m along the NH-44 highway. Home to the state-of-the-art Skyview Empyrean gondola, thrilling outdoor adventure park (zipline, mountain tubing), paragliding at Sanasar, and blanketed in thick snow during peak winter.",
    bestTime: 'May-June (Summer), Dec-Feb (Snow)',
    bestSeasonBadge: 'May - Jun (Summer Resort) | Dec - Feb (Snow)',
    rating: 4.8,
    reviewsCount: 3240,
    startingPrice: 6800,
    altitude: '2,024 m (6,640 ft) to 2,700 m (Nathatop)',
    nearestHub: 'Udhampur Railway Station (44 km) / Jammu Airport (110 km)',
    coordinates: {
      lat: 33.0882,
      lng: 75.3263,
    },
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Patnitop+Skyview+Empyrean+Udhampur+Jammu+and+Kashmir',
    googleMapsEmbedUrl: 'https://maps.google.com/maps?q=Patnitop+Skyview+Empyrean+Udhampur+Jammu+and+Kashmir&t=&z=13&ie=UTF8&iwloc=&output=embed',
    coverImage: 'https://images.unsplash.com/photo-1518457607834-6e8d80c183c5?auto=format&fit=crop&w=1400&q=85',
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1518457607834-6e8d80c183c5?auto=format&fit=crop&w=1200&q=80',
        title: 'Dense Deodar Pines & Plateau Meadows',
        caption: 'Centuries-old towering deodar cedar trees casting cool shade across Patnitop’s green walking trails.',
      },
      {
        url: 'https://images.unsplash.com/photo-1614082242765-7c98ca0f3df3?auto=format&fit=crop&w=1200&q=80',
        title: 'Skyview by Empyrean Gondola & Adventure Park',
        caption: 'India’s highest ropeway gondola connecting Sanget to Patnitop, featuring zipline and tubing.',
      },
      {
        url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
        title: 'Sanasar Lake & Paragliding Arena',
        caption: 'A cup-shaped green meadow bowl 19 km from Patnitop, famous for tandem paragliding flights.',
      },
      {
        url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
        title: 'Nathatop 360-Degree Snow Panoramas',
        caption: 'High windswept ridge overlooking Kishtwar mountain ranges and the Shivalik foothills.',
      },
    ],
    highlights: [
      'Skyview by Empyrean State-of-the-Art Gondola Ropeway',
      'Adventure Park Activities: Zipline, All-Terrain Tubing & Magic Carpet',
      'Nathatop Snow Slopes & 360° Himalayan Mountain Views',
      'Sanasar Meadow Paragliding, Wilderness Camping & Lake',
      'Ancient 600-Year-Old Naag Devta Stone Temple',
      'Winter Snowfall & Pine-Wood Resort Stays',
    ],
    activities: ['Ropeway Cable Car', 'Paragliding', 'Ziplining & Tubing', 'Snow Activities', 'Pine Forest Walks', 'Camping'],
    districtSlug: 'udhampur',
  },

  // 10. Bhaderwah
  {
    id: 'bhaderwah',
    rank: 10,
    name: 'Bhaderwah',
    subtitle: "Mini Kashmir, Lush Jai Valley & Padri Pass Snows",
    district: 'Doda',
    division: 'Jammu Division',
    overview: "'Mini Kashmir' ke naam se mashhoor Doda district ki scenic valley. Jai Valley ke expansive meadows, Padri pass aur adventurous paragliding ke liye famous.",
    englishOverview: "Universally acclaimed as 'Mini Kashmir' (Chhota Kashmir), Bhaderwah is a breathtakingly scenic wonderland in Doda district. Famous for the meandering streams of emerald Jai Valley, the high alpine ridge of Padri Pass (10,500 ft) bordering Himachal Pradesh, pine-scented Chinta Valley, and thrilling paragliding opportunities.",
    bestTime: 'May to October',
    bestSeasonBadge: 'May - Oct (Lush Valleys) | Dec - Feb (Snow)',
    rating: 4.8,
    reviewsCount: 2180,
    startingPrice: 7500,
    altitude: '1,613 m (5,291 ft) to 3,200 m (Padri Pass)',
    nearestHub: 'Udhampur Railway Station (130 km, ~4 hours drive via Batote-Doda)',
    coordinates: {
      lat: 32.9789,
      lng: 75.7139,
    },
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Bhaderwah+Jai+Valley+Padri+Pass+Doda+Jammu+and+Kashmir',
    googleMapsEmbedUrl: 'https://maps.google.com/maps?q=Bhaderwah+Jai+Valley+Padri+Pass+Doda+Jammu+and+Kashmir&t=&z=12&ie=UTF8&iwloc=&output=embed',
    coverImage: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1400&q=85',
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
        title: 'Jai Valley Emerald Alpine Meadows',
        caption: 'A 32-km sprawling meadow bisected by the crystal-clear Jai stream, ideal for eco-camping.',
      },
      {
        url: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80',
        title: 'Padri Pass High Altitude Snow Ridge (10,500 ft)',
        caption: 'The highest motorable pass between Bhaderwah and Chamba (HP), carpeted in thick snow and wildflowers.',
      },
      {
        url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
        title: 'Paragliding & Chinta Valley Pine Orchards',
        caption: 'Scenic valley known for equestrian sports, apple orchards, and tandem paragliding launches.',
      },
      {
        url: 'https://images.unsplash.com/photo-1518457607834-6e8d80c183c5?auto=format&fit=crop&w=1200&q=80',
        title: 'Historic Gupt Ganga & Nag Devta Heritage',
        caption: 'Ancient stone temple dedicated to Lord Shiva and Vasuki Nag with natural underground freshwater springs.',
      },
    ],
    highlights: [
      'Jai Valley Expansive Alpine Meadow & Rivulet',
      'Padri Pass High Snow Ridge (10,500 ft) bordering Himachal',
      'Thrilling Tandem Paragliding over Pine Valleys',
      'Chinta Valley Horse Riding & Apple Orchards',
      'Historic 10th-Century Gupt Ganga & Vasuki Nag Temples',
      'Guldanda Snow Fields & Seoj High Altitude Trek',
    ],
    activities: ['Paragliding', 'Meadow Camping', 'Padri Pass Snow Trips', 'Trout Angling', 'Horseback Riding', 'Heritage Temple Visits'],
    districtSlug: 'doda',
  },
];
