export interface TouristPlace {
  name: string;
  category: 'Must-Visit' | 'Heritage' | 'Adventure' | 'Spiritual' | 'Lake & Nature' | 'Scenic View' | 'Offbeat & Camping' | 'Family & Leisure';
  description: string;
  image?: string;
}

export interface JKDistrictDestination {
  id: string;
  district: string;
  tagline: string;
  division: 'Kashmir Valley' | 'Jammu Division' | 'Chenab Valley' | 'Pir Panjal';
  listingsCount: number;
  rating: number;
  reviewsCount: number;
  startingPrice: number; // in INR
  duration: string; // e.g., '3 - 5 Days'
  durationCategory: '1-3' | '4-7' | '8-14' | '15+';
  travelTypes: string[];
  budgetTier: 'budget' | 'mid' | 'luxury';
  bestSeason: string;
  altitude: string;
  image: string;
  shortDescription: string;
  overview: string;
  touristPlaces: TouristPlace[];
  coordinates: [number, number]; // [lng, lat]
  popularKey: string;
}

export const JK_ALL_DISTRICTS: JKDistrictDestination[] = [
  // 1. SRINAGAR
  {
    id: 'srinagar',
    district: 'Srinagar',
    tagline: 'Heart of the Kashmir Valley & Summer Capital',
    division: 'Kashmir Valley',
    listingsCount: 24,
    rating: 4.9,
    reviewsCount: 4120,
    startingPrice: 8500,
    duration: '3 - 5 Days',
    durationCategory: '4-7',
    travelTypes: ['Nature & Alpine Lakes', 'Heritage & Mughal Architecture', 'Honeymoon & Romance', 'Family & Leisure'],
    budgetTier: 'mid',
    bestSeason: 'April – October (Spring/Autumn), Dec – Feb (Snow)',
    altitude: '1,585 m (5,200 ft)',
    image: 'https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&w=1200&q=80',
    shortDescription: 'Dal Lake shikara rides, carved cedar houseboats, terraced Mughal gardens, and ancient hillside shrines.',
    overview: 'Srinagar is the jewel of Kashmir, renowned worldwide for its tranquil Dal and Nigeen Lakes, ornate royal Mughal gardens like Nishat and Shalimar, vibrant floating markets, and historic wooden architecture of Downtown Srinagar.',
    touristPlaces: [
      { name: 'Dal Lake & Shikara Rides', category: 'Lake & Nature', description: 'Iconic water body famous for luxury cedar wood houseboats, floating vegetable markets, and golden hour boat rides.', image: 'https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&w=600&q=80' },
      { name: 'Nigeen Lake', category: 'Lake & Nature', description: 'Quieter, pristine sister lake surrounded by willows, houseboats, and peaceful water reflections.', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80' },
      { name: 'Shalimar Bagh', category: 'Heritage', description: 'The famous Mughal "Abode of Love" built by Emperor Jahangir for Empress Nur Jahan in 1619 with stepped terraces and fountains.', image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80' },
      { name: 'Nishat Bagh', category: 'Heritage', description: 'The grand "Garden of Delight" featuring 12 cascading terraces overlooking Dal Lake against Zabarwan hills.', image: 'https://images.unsplash.com/photo-1518457607834-6e8d80c183c5?auto=format&fit=crop&w=600&q=80' },
      { name: 'Pari Mahal', category: 'Heritage', description: 'Seven-terraced astronomical observatory and palace built by Prince Dara Shikoh with panoramic views of Srinagar.', image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=600&q=80' },
      { name: 'Indira Gandhi Memorial Tulip Garden', category: 'Must-Visit', description: 'Asia’s largest tulip garden boasting over 1.5 million blooming flowers in vibrant colors during springtime.', image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=600&q=80' },
      { name: 'Shankaracharya Temple', category: 'Spiritual', description: 'Ancient 9th-century stone Shiva shrine on Gopadari Hill offering 360-degree views across Srinagar valley.', image: 'https://images.unsplash.com/photo-1566438480900-0609be27a4be?auto=format&fit=crop&w=600&q=80' },
      { name: 'Hazratbal Shrine', category: 'Spiritual', description: 'Majestic white marble shrine on the northern bank of Dal Lake housing the sacred relic (Moi-e-Muqqadas).', image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=600&q=80' },
      { name: 'Jama Masjid Srinagar', category: 'Spiritual', description: 'Historic 14th-century grand mosque in Nowhatta supported by 378 monumental carved deodar wood pillars.', image: 'https://images.unsplash.com/photo-1590073844006-33379778ae09?auto=format&fit=crop&w=600&q=80' }
    ],
    coordinates: [74.7973, 34.0837],
    popularKey: 'srinagar'
  },

  // 2. ANANTNAG
  {
    id: 'anantnag',
    district: 'Anantnag (Pahalgam)',
    tagline: 'Valley of Shepherds & Land of Springs',
    division: 'Kashmir Valley',
    listingsCount: 26,
    rating: 4.8,
    reviewsCount: 3650,
    startingPrice: 9800,
    duration: '3 - 6 Days',
    durationCategory: '4-7',
    travelTypes: ['Nature & Alpine Lakes', 'Adventure & High Passes', 'Honeymoon & Romance', 'Sacred Pilgrimage & Temples'],
    budgetTier: 'mid',
    bestSeason: 'April – October (Summers & Autumn foliage)',
    altitude: '2,130 m (7,000 ft)',
    image: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1200&q=80',
    shortDescription: 'Pahalgam Lidder River, Betaab Valley, Aru wilderness, Martand Sun Temple, and Verinag Spring.',
    overview: 'Anantnag is rich in lush deodar forests, rushing trout streams, and ancient architectural marvels. It serves as the primary base for the holy Amarnath Yatra and holds world-renowned valleys like Betaab and Aru.',
    touristPlaces: [
      { name: 'Pahalgam (Betaab Valley & Aru Valley)', category: 'Must-Visit', description: 'Iconic valley basin renowned for pristine Lidder River rafting, pine-clad mountain gorges, and alpine meadows.', image: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=600&q=80' },
      { name: 'Betaab Valley', category: 'Scenic View', description: 'Breathtaking valley named after the Bollywood movie, bordered by crystal streams and snow-capped peaks.', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80' },
      { name: 'Aru Valley', category: 'Adventure', description: 'Scenic alpine village and trailhead for treks to Kolahoi Glacier, Tarsar-Marsar, and Katrinag.', image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80' },
      { name: 'Martand Sun Temple', category: 'Heritage', description: 'Monumental 8th-century stone temple built by Emperor Lalitaditya Muktapida with colonnaded Greek-influenced arches.', image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80' },
      { name: 'Achabal Gardens', category: 'Heritage', description: 'Historic cascading pleasure garden constructed by Mughal Empress Nur Jahan with natural gushing cascades.', image: 'https://images.unsplash.com/photo-1518457607834-6e8d80c183c5?auto=format&fit=crop&w=600&q=80' },
      { name: 'Kokernag', category: 'Lake & Nature', description: 'Collection of multi-colored spring channels, Kashmir’s largest freshwater spring, and aromatic rose garden.', image: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=600&q=80' },
      { name: 'Verinag Spring', category: 'Heritage', description: 'Deep octagonal royal Mughal tank marking the official source of River Jhelum with crystal emerald water.', image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=600&q=80' },
      { name: 'Daksum', category: 'Offbeat & Camping', description: 'Quiet forest retreat with wooden chalets, deep gorges, and switchbacks ascending to Sinthan Top.', image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=600&q=80' }
    ],
    coordinates: [75.3150, 34.0161],
    popularKey: 'pahalgam'
  },

  // 3. BARAMULLA
  {
    id: 'baramulla',
    district: 'Baramulla (Gulmarg)',
    tagline: 'Meadow of Flowers & Winter Sports Capital of India',
    division: 'Kashmir Valley',
    listingsCount: 22,
    rating: 4.9,
    reviewsCount: 3890,
    startingPrice: 11500,
    duration: '2 - 4 Days',
    durationCategory: '1-3',
    travelTypes: ['Snow & Winter Sports', 'Adventure & High Passes', 'Honeymoon & Romance', 'Nature & Alpine Lakes'],
    budgetTier: 'luxury',
    bestSeason: 'Dec – Mar (Skiing & Powder Snow), May – Sep (Lush Wildflower Meadows)',
    altitude: '2,650 m (8,690 ft) to 3,950 m (Apharwat Peak)',
    image: 'https://images.unsplash.com/photo-1614082242765-7c98ca0f3df3?auto=format&fit=crop&w=1200&q=80',
    shortDescription: 'World-famous Gulmarg Gondola, Apharwat Peak skiing, Tangmarg waterfalls, and pine-scented highlands.',
    overview: 'Baramulla is home to Gulmarg, one of the world’s top ski resorts with the highest operating cable car in Asia. Beyond skiing, it offers high-altitude meadows, alpine trekking trails, and historic border posts.',
    touristPlaces: [
      { name: 'Gulmarg Gondola (Cable Car)', category: 'Must-Visit', description: 'Asia’s highest operating cable car transporting skiers and visitors up to Kongdoori and 13,780 ft at Apharwat Peak.', image: 'https://images.unsplash.com/photo-1614082242765-7c98ca0f3df3?auto=format&fit=crop&w=600&q=80' },
      { name: 'Khilanmarg', category: 'Scenic View', description: 'Vibrant highland meadow carpeted with blooming wildflowers in summer and powdery snow slopes in winter.', image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80' },
      { name: 'Apharwat Peak', category: 'Adventure', description: 'Towering summit above Gulmarg offering exhilarating downhill ski trails and panoramic sights of Nanga Parbat.', image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80' },
      { name: 'Wular Lake', category: 'Lake & Nature', description: 'Asia’s grand freshwater lake spanning Baramulla and Bandipora, teeming with migratory birdlife and water willows.', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80' },
      { name: 'Eco Park Baramulla', category: 'Family & Leisure', description: 'Serene island river park situated on the banks of River Jhelum near Khadinyar with landscaped walks.', image: 'https://images.unsplash.com/photo-1518457607834-6e8d80c183c5?auto=format&fit=crop&w=600&q=80' },
      { name: 'Baba Reshi Shrine', category: 'Spiritual', description: 'Famous 15th-century Sufi saint shrine with intricate wooden Kashmiri carving and tranquil deodar forest surroundings.', image: 'https://images.unsplash.com/photo-1566438480900-0609be27a4be?auto=format&fit=crop&w=600&q=80' }
    ],
    coordinates: [74.3805, 34.0484],
    popularKey: 'gulmarg'
  },

  // 4. GANDERBAL
  {
    id: 'ganderbal',
    district: 'Ganderbal (Sonamarg)',
    tagline: 'Meadow of Gold & Gateway to Great Alpine Lakes',
    division: 'Kashmir Valley',
    listingsCount: 19,
    rating: 4.8,
    reviewsCount: 2980,
    startingPrice: 9200,
    duration: '2 - 4 Days',
    durationCategory: '1-3',
    travelTypes: ['Adventure & High Passes', 'Nature & Alpine Lakes', 'Sacred Pilgrimage & Temples', 'Offbeat & Camping'],
    budgetTier: 'mid',
    bestSeason: 'May – October (Trekking & Glaciers)',
    altitude: '2,740 m (8,990 ft)',
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80',
    shortDescription: 'Sonamarg Thajiwas Glacier, Great Lakes alpine treks, Zoji La Pass gateway, and holy Kheer Bhawani shrine.',
    overview: 'Ganderbal holds Sonamarg ("Meadow of Gold") along the roaring Sindh River. It is the starting point for the world-famous Kashmir Great Lakes trek and the Zojila Pass crossing into Ladakh.',
    touristPlaces: [
      { name: 'Sonamarg & Thajiwas Glacier', category: 'Must-Visit', description: 'Perennial alpine glacier reachable via trek or pony, offering snow sledging, ice climbing, and silver fir forests.', image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=600&q=80' },
      { name: 'Zero Point (Zoji La Pass)', category: 'Adventure', description: 'High-altitude mountain crossing with year-round ice bridges, towering snow walls, and hot tea stalls.', image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=600&q=80' },
      { name: 'Manasbal Lake', category: 'Lake & Nature', description: 'Deepest freshwater lake in Kashmir, known as the "Gem of Kashmir" with lotus fields, shikara rides, and water skiing.', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80' },
      { name: 'Kheer Bhawani Temple (Tulmulla)', category: 'Spiritual', description: 'Most sacred Hindu Kashmiri Pandit shrine built over a miraculous spring that alters water color.', image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80' },
      { name: 'Naranag Ruins', category: 'Heritage', description: '8th-century stone temple complex dedicated to Lord Shiva tucked amidst ancient walnut forests and mountain streams.', image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=600&q=80' }
    ],
    coordinates: [75.2930, 34.3020],
    popularKey: 'sonamarg'
  },

  // 5. BUDGAM
  {
    id: 'budgam',
    district: 'Budgam (Doodhpathri & Yusmarg)',
    tagline: 'Valley of Milk & Meadow of Jesus',
    division: 'Kashmir Valley',
    listingsCount: 16,
    rating: 4.8,
    reviewsCount: 2240,
    startingPrice: 7800,
    duration: '2 - 3 Days',
    durationCategory: '1-3',
    travelTypes: ['Nature & Alpine Lakes', 'Offbeat & Camping', 'Family & Leisure', 'Spiritual'],
    budgetTier: 'budget',
    bestSeason: 'May – October (Lush Greenery), Dec – Feb (Winter Snow)',
    altitude: '2,730 m (Doodhpathri) / 2,400 m (Yusmarg)',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
    shortDescription: 'Doodhpathri frothing streams, Yusmarg deodar glades, Nilnag blue lake, and Charar-i-Sharief shrine.',
    overview: 'Budgam features rolling emerald pastures that rival European alps. Doodhpathri gets its name from milky frothing river water, while Yusmarg offers silent pine tranquility away from crowds.',
    touristPlaces: [
      { name: 'Doodhpathri', category: 'Must-Visit', description: 'Vast grassy alpine bowl traversed by the gushing Shaliganga and Sukhnag rivers against pine ridges.', image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80' },
      { name: 'Tosamaidan', category: 'Adventure', description: 'Massive historical high-altitude meadow once traversed by the Mughals, now opened for trekking and camping.', image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80' },
      { name: 'Yusmarg', category: 'Scenic View', description: 'Tranquil alpine retreat framed by the majestic snow peaks of Tatakooti and Sunset Peak.', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80' },
      { name: 'Nilnag Lake', category: 'Lake & Nature', description: 'Enchanting pine-fringed blue-water lake accessible by a peaceful hike through cedar forests.', image: 'https://images.unsplash.com/photo-1518457607834-6e8d80c183c5?auto=format&fit=crop&w=600&q=80' },
      { name: 'Shrine of Sheikh Noor-ud-Din Wali (Charar-e-Sharief)', category: 'Spiritual', description: '600-year-old revered wooden Sufi shrine of Sheikh Noor-ud-din Wali (Nund Rishi), patron saint of Kashmir.', image: 'https://images.unsplash.com/photo-1566438480900-0609be27a4be?auto=format&fit=crop&w=600&q=80' }
    ],
    coordinates: [74.7800, 34.0200],
    popularKey: 'doodhpathri'
  },

  // 6. KUPWARA
  {
    id: 'kupwara',
    district: 'Kupwara (Bangus & Lolab)',
    tagline: 'Land of Love, Pine Fragrance & Emerald Bangus Meadow',
    division: 'Kashmir Valley',
    listingsCount: 14,
    rating: 4.8,
    reviewsCount: 1530,
    startingPrice: 8900,
    duration: '3 - 5 Days',
    durationCategory: '4-7',
    travelTypes: ['Offbeat & Camping', 'Nature & Alpine Lakes', 'Adventure & High Passes'],
    budgetTier: 'budget',
    bestSeason: 'May – October',
    altitude: '1,650 m to 3,000 m (Bangus)',
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80',
    shortDescription: 'Unexplored Bangus Valley highlands, scenic Lolab fruit orchards, Kalaroos caves, and Teetwal border valley.',
    overview: 'Kupwara is Kashmir’s greenest border frontier, blessed with the colossal Bangus Valley (covering 300 sq km of pristine meadows) and the poetic Lolab Valley filled with apple orchards and cedar groves.',
    touristPlaces: [
      { name: 'Lolab Valley', category: 'Scenic View', description: 'Famous for fruit orchards, dense deodar forests, springs, and pastoral serenity celebrated by poet Allama Iqbal.', image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=600&q=80' },
      { name: 'Bungus Valley (Bangus)', category: 'Must-Visit', description: 'Unblemished mega-meadow surrounded by Chowkibal and Shamsbari mountain ranges with carpeted wildflowers.', image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80' },
      { name: 'Sadhna Pass', category: 'Adventure', description: 'Dramatic mountain pass at 10,269 ft connecting Kupwara to Karnah Valley, providing sweeping Himalayan views.', image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=600&q=80' },
      { name: 'Seemab Valley', category: 'Lake & Nature', description: 'Lush green picnic glades centered around clear water bodies and perennial pine forests.', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80' },
      { name: 'Kheer Bhawani Temple (Tikker)', category: 'Spiritual', description: 'Historic sacred shrine of Goddess Ragnya Devi set amidst towering chinar trees in Tikker village.', image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80' }
    ],
    coordinates: [74.2500, 34.5300],
    popularKey: 'bangus'
  },

  // 7. KULGAM
  {
    id: 'kulgam',
    district: 'Kulgam (Aharbal)',
    tagline: 'Rice Bowl of Kashmir & The Niagara Falls of the Valley',
    division: 'Kashmir Valley',
    listingsCount: 13,
    rating: 4.7,
    reviewsCount: 1640,
    startingPrice: 7200,
    duration: '2 - 3 Days',
    durationCategory: '1-3',
    travelTypes: ['Nature & Alpine Lakes', 'Adventure & High Passes', 'Offbeat & Camping'],
    budgetTier: 'budget',
    bestSeason: 'April – October (Peak water flow in summers)',
    altitude: '2,266 m (Aharbal)',
    image: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=1200&q=80',
    shortDescription: 'Aharbal roaring waterfall, high-altitude Kausar Nag alpine lake, Kungwattan meadows, and apple orchards.',
    overview: 'Kulgam is renowned for the mighty Aharbal Waterfall, where the Veshav River plunges 25 meters down a sheer granite gorge. It is also the gateway to holy alpine lakes and the Pir Panjal mountain range.',
    touristPlaces: [
      { name: 'Aharbal Waterfall', category: 'Must-Visit', description: 'Thunderous 25-meter plunge of the Veshav River through narrow pine ravines with misty spray and rainbow views.', image: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=600&q=80' },
      { name: 'Kousarnag Lake (Kausar Nag)', category: 'Lake & Nature', description: 'High-altitude sacred glacial lake at 12,000 ft in the Pir Panjal range, shaped like a footprint and frozen in winter.', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80' },
      { name: 'Chiranbal Meadows', category: 'Scenic View', description: 'Vast continuous twin pasture meadows dissected by crystal clear glacial rivers, ideal for camping.', image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80' },
      { name: 'Panchanpathri', category: 'Adventure', description: 'Scenic vantage viewpoint offering clear sights of South Kashmir valley bowl and deep deodar forests.', image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80' },
      { name: 'Vasaknag Spring', category: 'Lake & Nature', description: 'Fabled freshwater spring in Kund village that flows abundantly for six months and recedes during winter.', image: 'https://images.unsplash.com/photo-1518457607834-6e8d80c183c5?auto=format&fit=crop&w=600&q=80' }
    ],
    coordinates: [74.9000, 33.6400],
    popularKey: 'aharbal'
  },

  // 8. PULWAMA
  {
    id: 'pulwama',
    district: 'Pulwama (Pampore)',
    tagline: 'Saffron Capital of India & Ancient Heritage',
    division: 'Kashmir Valley',
    listingsCount: 14,
    rating: 4.7,
    reviewsCount: 1480,
    startingPrice: 6500,
    duration: '1 - 2 Days',
    durationCategory: '1-3',
    travelTypes: ['Heritage & Mughal Architecture', 'Nature & Alpine Lakes', 'Family & Leisure'],
    budgetTier: 'budget',
    bestSeason: 'October – November (Saffron Harvest & Purple Bloom), April – Oct (General)',
    altitude: '1,630 m',
    image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80',
    shortDescription: 'Pampore purple saffron bloom, 9th-century Awantipora temple ruins, Shikargah wildlife, and Tarsar trails.',
    overview: 'Pulwama is synonymous with world-famous Kashmiri Saffron (Kong). In autumn, vast plateaus of Pampore turn into sea of purple blooms. It boasts 9th-century stone temple ruins and lush forests.',
    touristPlaces: [
      { name: 'Saffron Fields (Pampore)', category: 'Must-Visit', description: 'Miles of purple saffron crocuses blooming in October/November; visit saffron processing centers and spice bazaars.', image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=600&q=80' },
      { name: 'Shikargah', category: 'Adventure', description: 'Former royal hunting reserve of Maharaja Hari Singh near Tral, surrounded by dense pine forests and wildlife.', image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80' },
      { name: 'Avantishwar Temple Ruins', category: 'Heritage', description: '9th-century monumental stone temple complex built by King Avantivarman dedicated to Lord Vishnu and Lord Shiva.', image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80' },
      { name: 'Tarsar & Marsar Lakes Trek Base', category: 'Lake & Nature', description: 'Scenic starting base in Tral valley leading into the legendary twin alpine almond-shaped glacial lakes.', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80' }
    ],
    coordinates: [74.9200, 33.8700],
    popularKey: 'pulwama'
  },

  // 9. SHOPIAN
  {
    id: 'shopian',
    district: 'Shopian (Peer Ki Gali)',
    tagline: 'Apple Capital of Kashmir & Historic Imperial Mughal Road',
    division: 'Kashmir Valley',
    listingsCount: 12,
    rating: 4.7,
    reviewsCount: 1320,
    startingPrice: 6900,
    duration: '1 - 3 Days',
    durationCategory: '1-3',
    travelTypes: ['Adventure & High Passes', 'Heritage & Mughal Architecture', 'Nature & Alpine Lakes'],
    budgetTier: 'budget',
    bestSeason: 'June – October (When Mughal Road is fully open)',
    altitude: '2,146 m (Town) to 3,490 m (Peer Ki Gali)',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    shortDescription: 'Peer Ki Gali mountain pass, historic Mughal Road, Hirpora Wildlife Sanctuary, and sweet apple orchards.',
    overview: 'Shopian produces the highest quality apples in the subcontinent and guards the historic Mughal Road that emperors Akbar and Jahangir traveled. Peer Ki Gali pass is its crowning panoramic jewel.',
    touristPlaces: [
      { name: 'Peer Ki Gali (Mughal Road)', category: 'Must-Visit', description: 'High-altitude mountain pass at 11,450 ft on Mughal Road with dramatic alpine meadows and saint shrine.', image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80' },
      { name: 'Peer Marg', category: 'Scenic View', description: 'Picturesque high alpine pasture carpeted in wildflowers offering breathtaking vistas across the Pir Panjal crest.', image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80' },
      { name: 'Dubjan', category: 'Lake & Nature', description: 'Scenic trout stream glade surrounded by dense pine woods on the banks of Rambiara River.', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80' },
      { name: 'Hirpora Wildlife Sanctuary', category: 'Adventure', description: 'Protected habitat of the endangered Pir Panjal Markhor (wild goat), Himalayan brown bear, and Tibetan wolf.', image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=600&q=80' }
    ],
    coordinates: [74.8300, 33.7200],
    popularKey: 'shopian'
  },

  // 10. BANDIPORA
  {
    id: 'bandipora',
    district: 'Bandipora (Gurez Valley)',
    tagline: 'Untouched Himalayan Frontier & Asia’s Wular Lake',
    division: 'Kashmir Valley',
    listingsCount: 15,
    rating: 4.9,
    reviewsCount: 1820,
    startingPrice: 10500,
    duration: '3 - 5 Days',
    durationCategory: '4-7',
    travelTypes: ['Offbeat & Camping', 'Adventure & High Passes', 'Nature & Alpine Lakes'],
    budgetTier: 'mid',
    bestSeason: 'June – October (When Razdan Pass is snow-free)',
    altitude: '2,400 m (Gurez) to 3,557 m (Razdan Pass)',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    shortDescription: 'Gurez Valley, Habba Khatoon pyramid peak, Kishanganga riverbank, Razdan Pass, and vast Wular Lake.',
    overview: 'Bandipora is home to Gurez Valley, voted India’s best offbeat destination. Guarded by the legendary pyramidal Habba Khatoon peak and the turquoise Kishanganga River, it is an unspoiled fairytale realm.',
    touristPlaces: [
      { name: 'Wular Lake View Points', category: 'Lake & Nature', description: 'Panoramic cliff viewpoints overlooking one of Asia’s largest freshwater lakes with migratory bird sanctuaries.', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80' },
      { name: 'Gurez Valley', category: 'Must-Visit', description: 'Secluded Dard-Shin frontier valley with traditional logwood houses and warm Himalayan hospitality under Habba Khatoon.', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80' },
      { name: 'Razdan Pass', category: 'Adventure', description: 'High-altitude mountain pass at 11,672 ft offering stupendous panoramas of Mount Harmukh and surrounding snow massifs.', image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=600&q=80' },
      { name: 'Kishanganga River', category: 'Lake & Nature', description: 'Crystal-clear turquoise glacier river ideal for riverside camping, trout angling, and rafting.', image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80' }
    ],
    coordinates: [74.6500, 34.6300],
    popularKey: 'gurez'
  },

  // 11. JAMMU
  {
    id: 'jammu',
    district: 'Jammu',
    tagline: 'City of Temples & Historic Winter Capital of J&K',
    division: 'Jammu Division',
    listingsCount: 25,
    rating: 4.8,
    reviewsCount: 3950,
    startingPrice: 5500,
    duration: '2 - 4 Days',
    durationCategory: '1-3',
    travelTypes: ['Sacred Pilgrimage & Temples', 'Heritage & Mughal Architecture', 'Family & Leisure'],
    budgetTier: 'budget',
    bestSeason: 'October – March (Pleasant Winters)',
    altitude: '327 m (1,073 ft)',
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80',
    shortDescription: 'Bahu Fort, Raghunath Temple, royal Mubarak Mandi Palace, Akhnoor Chenab riverfront, and Jamboo Zoo.',
    overview: 'Jammu, known as the City of Temples, is steeped in rich Dogra history. Overlooking the Tawi River, it features grand royal palaces, ancient cave shrines, and acts as the prime railway hub for travelers.',
    touristPlaces: [
      { name: 'Bahu Fort & Bagh-e-Bahu', category: 'Must-Visit', description: '3,000-year-old historic citadel housing the revered Bawe Wali Mata shrine, terraced fountains, and India’s largest underground aquarium.', image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80' },
      { name: 'Raghunath Temple', category: 'Spiritual', description: 'One of the largest temple complexes in North India built by Maharaja Gulab Singh with gold-plated sanctums.', image: 'https://images.unsplash.com/photo-1566438480900-0609be27a4be?auto=format&fit=crop&w=600&q=80' },
      { name: 'Mubarak Mandi Palace', category: 'Heritage', description: 'Royal Dogra palace complex blending Rajasthani, Mughal, and European baroque architecture overlooking River Tawi.', image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=600&q=80' },
      { name: 'Amar Mahal Palace Museum', category: 'Heritage', description: 'French chateau-style red sandstone palace holding the 120 kg solid gold throne, royal library, and Pahari miniatures.', image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80' },
      { name: 'Peer Kho Cave Temple', category: 'Spiritual', description: 'Ancient natural cave shrine of Lord Shiva believed to be the meditation cavern of epic hero Jamvant.', image: 'https://images.unsplash.com/photo-1518457607834-6e8d80c183c5?auto=format&fit=crop&w=600&q=80' }
    ],
    coordinates: [74.8570, 32.7266],
    popularKey: 'jammu'
  },

  // 12. REASI
  {
    id: 'reasi',
    district: 'Reasi (Vaishno Devi & Katra)',
    tagline: 'Holy Vaishno Devi, Shiv Khori Cave & World’s Highest Rail Bridge',
    division: 'Jammu Division',
    listingsCount: 28,
    rating: 5.0,
    reviewsCount: 5200,
    startingPrice: 6500,
    duration: '2 - 4 Days',
    durationCategory: '1-3',
    travelTypes: ['Sacred Pilgrimage & Temples', 'Adventure & High Passes', 'Family & Leisure'],
    budgetTier: 'mid',
    bestSeason: 'All Year Round (Navratras & Spring/Autumn especially popular)',
    altitude: '750 m (Katra) to 1,585 m (Bhavan)',
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80',
    shortDescription: 'Mata Vaishno Devi Shrine, Shiv Khori cave, world’s highest Chenab Rail Bridge, and Siar Baba waterfall.',
    overview: 'Reasi is one of the world’s foremost pilgrimage centers, home to Shri Mata Vaishno Devi Shrine at Katra and miraculous Shiv Khori cave. It also hosts the modern engineering marvel: the Chenab Arch Rail Bridge.',
    touristPlaces: [
      { name: 'Mata Vaishno Devi Shrine (Katra)', category: 'Must-Visit', description: 'Revered Trikuta mountain cave temple visited by millions, accessible by battery cars, ropeway, or walking trek.', image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=600&q=80' },
      { name: 'Shiv Khori Cave', category: 'Spiritual', description: 'Kilometer-long natural limestone cave housing a miraculous self-formed natural stalagmite Shiva Lingam.', image: 'https://images.unsplash.com/photo-1566438480900-0609be27a4be?auto=format&fit=crop&w=600&q=80' },
      { name: 'Reasi Fort (Bhimargarh)', category: 'Heritage', description: 'Historic hilltop stone fort constructed by legendary Dogra General Zorawar Singh commanding the valley.', image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80' },
      { name: 'Sihar Baba Waterfall (Siar Baba)', category: 'Lake & Nature', description: 'Spectacular 100-foot natural single-drop waterfall cascading into an emerald bathing pool on Chenab bank.', image: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=600&q=80' },
      { name: 'Salal Dam', category: 'Scenic View', description: 'Colossal hydroelectric engineering dam built over deep rock gorges of River Chenab.', image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=600&q=80' }
    ],
    coordinates: [74.8300, 33.0800],
    popularKey: 'vaishnodevi'
  },

  // 13. UDHAMPUR
  {
    id: 'udhampur',
    district: 'Udhampur (Patnitop)',
    tagline: 'Pine-Cloaked Patnitop, Ancient Krimchi Temples & Holy Sudh Mahadev',
    division: 'Jammu Division',
    listingsCount: 20,
    rating: 4.8,
    reviewsCount: 3100,
    startingPrice: 7500,
    duration: '2 - 4 Days',
    durationCategory: '1-3',
    travelTypes: ['Nature & Alpine Lakes', 'Snow & Winter Sports', 'Heritage & Mughal Architecture', 'Sacred Pilgrimage & Temples'],
    budgetTier: 'budget',
    bestSeason: 'May – October (Pleasant Summer Weather), Dec – Feb (Snow & Sledging)',
    altitude: '2,024 m (Patnitop)',
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80',
    shortDescription: 'Patnitop pine plateau, Skyview cable car, Krimchi Pandava temples, Sudh Mahadev, and Natha Top snow.',
    overview: 'Udhampur is famous for Patnitop hill station surrounded by towering deodar forests, panoramic views of the Chenab basin, and ancient 8th-century Krimchi terracotta stone temples.',
    touristPlaces: [
      { name: 'Patnitop', category: 'Must-Visit', description: 'Pristine pine plateau with paragliding, nature trails, snow-shoeing, and Skyview cable car ropeway.', image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=600&q=80' },
      { name: 'Nathatop', category: 'Scenic View', description: 'High-altitude panoramic ridge offering snow sledging in winter and unobstructed views of Kishtwar ranges.', image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80' },
      { name: 'Krimchi Pandava Temples', category: 'Heritage', description: 'Group of 7 ancient classical stone temples dating back to 8th–9th century with intricate Nagara architecture.', image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80' },
      { name: 'Sudhmahadev Temple', category: 'Spiritual', description: 'Ancient temple housing a 2,800-year-old trident of Lord Shiva and sacred Papnashini natural spring.', image: 'https://images.unsplash.com/photo-1566438480900-0609be27a4be?auto=format&fit=crop&w=600&q=80' },
      { name: 'Mantalai', category: 'Spiritual', description: 'Legendary wedding ground of Lord Shiva and Goddess Parvati amidst serene deodar forests and apple orchards.', image: 'https://images.unsplash.com/photo-1518457607834-6e8d80c183c5?auto=format&fit=crop&w=600&q=80' },
      { name: 'Ramnagar Fort', category: 'Heritage', description: 'Grand historic fort with painted ceilings, wall frescoes, and defensive moats built by Raja Suchet Singh.', image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=600&q=80' }
    ],
    coordinates: [75.1300, 32.9200],
    popularKey: 'patnitop'
  },

  // 14. KATHUA
  {
    id: 'kathua',
    district: 'Kathua (Basohli & Sarthal)',
    tagline: 'Basohli Paintings, Atal Setu Bridge & Mini-Switzerland Sarthal',
    division: 'Jammu Division',
    listingsCount: 17,
    rating: 4.8,
    reviewsCount: 2150,
    startingPrice: 6200,
    duration: '2 - 4 Days',
    durationCategory: '1-3',
    travelTypes: ['Heritage & Mughal Architecture', 'Nature & Alpine Lakes', 'Adventure & High Passes'],
    budgetTier: 'budget',
    bestSeason: 'October – April (Basohli & Lakes), May – Sep (Bani Sarthal High Meadows)',
    altitude: '300 m to 2,200 m (Sarthal)',
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80',
    shortDescription: 'Basohli Miniature Art capital, Atal Setu cable bridge, Ranjit Sagar Lake watersports, and Bani-Sarthal valley.',
    overview: 'Kathua is the historic gateway to J&K, world-renowned for 17th-century Basohli Miniature Paintings, the iconic Atal Setu cable-stayed bridge over Ravi River, and the alpine wonderland of Bani-Sarthal.',
    touristPlaces: [
      { name: 'Basohli (Ranjit Sagar Dam & Atal Setu Bridge)', category: 'Must-Visit', description: 'Striking 592-meter cable-stayed bridge and massive reservoir offering motorboat rides, kayaking, and Basohli art.', image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=600&q=80' },
      { name: 'Jasrota Wildlife Sanctuary', category: 'Lake & Nature', description: 'Ancient ruined fort palace of Jasrotia rulers surrounded by sprawling bamboo and deer forests.', image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=600&q=80' },
      { name: 'Chamera Lake Borders', category: 'Scenic View', description: 'Scenic inter-state reservoir border with tranquil waters, surrounding pine hills, and water sports.', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80' },
      { name: 'Sukrala Mata Temple', category: 'Spiritual', description: 'Revered hilltop shrine dedicated to Goddess Mal Mata perched amidst pine-covered Shivalik ridges.', image: 'https://images.unsplash.com/photo-1566438480900-0609be27a4be?auto=format&fit=crop&w=600&q=80' }
    ],
    coordinates: [75.5200, 32.3700],
    popularKey: 'basohli'
  },

  // 15. SAMBA
  {
    id: 'samba',
    district: 'Samba (Mansar Lake & Purmandal)',
    tagline: 'Sacred Mansar Lake, Samba Fort & "Chhota Kashi" Purmandal',
    division: 'Jammu Division',
    listingsCount: 13,
    rating: 4.7,
    reviewsCount: 1540,
    startingPrice: 5200,
    duration: '1 - 2 Days',
    durationCategory: '1-3',
    travelTypes: ['Sacred Pilgrimage & Temples', 'Nature & Alpine Lakes', 'Heritage & Mughal Architecture'],
    budgetTier: 'budget',
    bestSeason: 'October – April',
    altitude: '384 m (1,260 ft)',
    image: 'https://images.unsplash.com/photo-1518457607834-6e8d80c183c5?auto=format&fit=crop&w=1200&q=80',
    shortDescription: 'Mansar Lake & Wildlife Sanctuary, Samba Fort citadel, Purmandal "Chhota Kashi", and Utterbehni shrines.',
    overview: 'Samba is the land of brave Dogra warriors, renowned for its holy freshwater lakes, historic hill citadels, and Purmandal—known as "Chhota Kashi" where ancient stone temples line the mystical underground Devika river.',
    touristPlaces: [
      { name: 'Mansar Lake', category: 'Must-Visit', description: 'Sacred picturesque lake ringed by forested hills, boating facilities, Sheshnag temple, and tortoise reserve.', image: 'https://images.unsplash.com/photo-1518457607834-6e8d80c183c5?auto=format&fit=crop&w=600&q=80' },
      { name: 'Utterbehani (Utterbehni)', category: 'Spiritual', description: 'Rare sacred river spot where the holy Devika flows northward (Uttar Vahini), dotted with historic stone shrines.', image: 'https://images.unsplash.com/photo-1566438480900-0609be27a4be?auto=format&fit=crop&w=600&q=80' },
      { name: 'Purmandal Temple Complex', category: 'Spiritual', description: 'Ancient holy pilgrimage center ("Chhota Kashi") dedicated to Lord Shiva on the sandy bed of the subterranean Holy Devika River.', image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80' },
      { name: 'Samba Fort', category: 'Heritage', description: '19th-century brick and stone citadel built by the Dogra kings perched atop a strategic hillock.', image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=600&q=80' }
    ],
    coordinates: [75.1200, 32.5600],
    popularKey: 'mansar'
  },

  // 16. DODA
  {
    id: 'doda',
    district: 'Doda (Bhaderwah - "Chota Kashmir")',
    tagline: 'Chota Kashmir, Jai Valley Meadows & Padri Pass',
    division: 'Chenab Valley',
    listingsCount: 18,
    rating: 4.8,
    reviewsCount: 2450,
    startingPrice: 8200,
    duration: '3 - 5 Days',
    durationCategory: '4-7',
    travelTypes: ['Offbeat & Camping', 'Nature & Alpine Lakes', 'Adventure & High Passes'],
    budgetTier: 'budget',
    bestSeason: 'April – October (Spring/Summer), Dec – Feb (Heavy Snow in Padri)',
    altitude: '1,613 m (Bhaderwah) to 3,200 m (Padri Pass)',
    image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80',
    shortDescription: 'Bhaderwah "Chota Kashmir", Jai Valley trout streams, Padri Pass snow ridge, and Gupt Ganga temple.',
    overview: 'Doda is celebrated for Bhaderwah, famously titled "Chota Kashmir" for its green valleys, perennial sparkling springs, deodar-clad slopes, and the high-altitude Padri Pass connecting to Himachal Pradesh.',
    touristPlaces: [
      { name: 'Bhaderwah Valley (Chinta Valley, Jai Valley, Padri Pass)', category: 'Must-Visit', description: 'Picturesque "Chota Kashmir" bowl filled with bubbling streams, serpentine Jai Valley, and high Padri Pass.', image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=600&q=80' },
      { name: 'Chinta Valley', category: 'Scenic View', description: 'Scenic orchards and hilltop meadow featuring the ancient Subar Nag temple with 360-degree vistas.', image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80' },
      { name: 'Jai Valley', category: 'Lake & Nature', description: 'Evergreen 32 km long valley with serpentine trout streams, horse riding trails, and igloo log huts.', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80' },
      { name: 'Padri Pass', category: 'Adventure', description: 'Vast grassy meadow pass at 10,500 ft holding perennial snowfields and linking to Chamba.', image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=600&q=80' },
      { name: 'Lal Draman', category: 'Scenic View', description: 'High-altitude panoramic pasture overlooking the Chenab river gorge, pine woods, and snow peaks.', image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=600&q=80' }
    ],
    coordinates: [75.5400, 33.1400],
    popularKey: 'bhaderwah'
  },

  // 17. KISHTWAR
  {
    id: 'kishtwar',
    district: 'Kishtwar (Sinthan Top)',
    tagline: 'Land of Sapphire, Saffron, Sinthan Pass & Warwan Valley',
    division: 'Chenab Valley',
    listingsCount: 16,
    rating: 4.8,
    reviewsCount: 1890,
    startingPrice: 9500,
    duration: '4 - 7 Days',
    durationCategory: '4-7',
    travelTypes: ['Adventure & High Passes', 'Offbeat & Camping', 'Nature & Alpine Lakes'],
    budgetTier: 'mid',
    bestSeason: 'June – October',
    altitude: '1,638 m to 3,800 m (Sinthan Top)',
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80',
    shortDescription: 'Snowbound Sinthan Top (12,500 ft), remote Warwan Valley, Kishtwar National Park, and Machail pilgrimage.',
    overview: 'Kishtwar is a dramatically rugged Himalayan district renowned for the world-famous Padder Blue Sapphire mines, high-altitude Kishtwar National Park, snowbound Sinthan Top, and secluded Warwan Valley.',
    touristPlaces: [
      { name: 'Kishtwar National Park', category: 'Adventure', description: 'Rugged 400 sq km reserve home to snow leopards, brown bears, musk deer, and rare Himalayan monal pheasants.', image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=600&q=80' },
      { name: 'Machail Mata Temple', category: 'Spiritual', description: 'Famous pilgrimage temple deep in the mountains, accessible via the legendary Machail Yatra padayatra.', image: 'https://images.unsplash.com/photo-1566438480900-0609be27a4be?auto=format&fit=crop&w=600&q=80' },
      { name: 'Sarthal Devi Temple', category: 'Spiritual', description: 'Historic 18-armed Goddess Ashtadash Bhuja shrine situated amidst deodar hills.', image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80' },
      { name: 'Chowgan Grounds', category: 'Scenic View', description: 'Massive natural green field in Kishtwar town spanning 165 acres used for celebrations, strolls, and community sports.', image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80' }
    ],
    coordinates: [75.7600, 33.3100],
    popularKey: 'kishtwar'
  },

  // 18. RAMBAN
  {
    id: 'ramban',
    district: 'Ramban (Sanasar & Baglihar)',
    tagline: 'Adventure Sanasar, Mighty Baglihar Dam & Chenab Gorges',
    division: 'Chenab Valley',
    listingsCount: 15,
    rating: 4.7,
    reviewsCount: 1720,
    startingPrice: 6800,
    duration: '2 - 3 Days',
    durationCategory: '1-3',
    travelTypes: ['Adventure & High Passes', 'Nature & Alpine Lakes', 'Offbeat & Camping'],
    budgetTier: 'budget',
    bestSeason: 'April – November',
    altitude: '2,050 m (Sanasar)',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80',
    shortDescription: 'Sanasar Lake paragliding, Baglihar hydroelectric dam, Mahu Mangat meadows, and Tata Pani springs.',
    overview: 'Ramban sits in the heart of Jammu and Kashmir along the roaring Chenab River gorge. It is the adventure hub of Jammu with paragliding, zip-lines, and aeromodelling at serene Sanasar Lake.',
    touristPlaces: [
      { name: 'Sanasar Meadows & Lake', category: 'Must-Visit', description: 'Cup-shaped alpine meadow and lake featuring paragliding, tandem flights, 9-hole golf course, and zip lines.', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=600&q=80' },
      { name: 'Baglihar Dam', category: 'Scenic View', description: 'Towering 143-meter gravity dam creating a massive turquoise reservoir amidst steep granite cliffs on River Chenab.', image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=600&q=80' },
      { name: 'Pogal Paristan Valley', category: 'Lake & Nature', description: 'Enchanting secluded valley surrounded by steep pine peaks with traditional Dogra & Pahari culture.', image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80' },
      { name: 'Tata Pani (Hot Spring)', category: 'Spiritual', description: 'Natural thermal sulfur springs on the riverbed with medicinal healing properties for joint and skin ailments.', image: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=600&q=80' }
    ],
    coordinates: [75.2400, 33.2400],
    popularKey: 'sanasar'
  },

  // 19. RAJOURI
  {
    id: 'rajouri',
    district: 'Rajouri',
    tagline: 'Land of Kings, Seven Alpine Lakes & Shahdara Sharief',
    division: 'Pir Panjal',
    listingsCount: 15,
    rating: 4.8,
    reviewsCount: 1690,
    startingPrice: 6700,
    duration: '2 - 4 Days',
    durationCategory: '1-3',
    travelTypes: ['Sacred Pilgrimage & Temples', 'Adventure & High Passes', 'Nature & Alpine Lakes'],
    budgetTier: 'budget',
    bestSeason: 'April – October',
    altitude: '915 m to 3,800 m (High Lakes)',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
    shortDescription: 'Seven Alpine Lakes of Pir Panjal, Shahdara Sharief Sufi shrine, Deera Ki Gali, and historic Chingus Fort.',
    overview: 'Rajouri, known historically as Rajapuri ("Land of Kings"), links Jammu with Kashmir. It boasts high-altitude glacial lakes, lush oak-covered passes like Deera Ki Gali, and renowned spiritual shrines.',
    touristPlaces: [
      { name: 'Chingus Fort', category: 'Heritage', description: 'Historic 16th-century Mughal inn where the internal organs of Mughal Emperor Jahangir were entombed.', image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=600&q=80' },
      { name: 'Dehra Ki Gali (DKG)', category: 'Scenic View', description: 'Dense oak and pine-covered mountain pass at 6,600 ft on the Mughal Road with misty cloud inversions.', image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=600&q=80' },
      { name: 'Thannamandi', category: 'Scenic View', description: 'Picturesque valley and historical Mughal staging town famous for carved Kashmiri wooden handicrafts.', image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80' },
      { name: 'Shadra Sharief Shrine (Shahdara Sharief)', category: 'Spiritual', description: 'Famous 19th-century Sufi shrine of Baba Ghulam Shah Badshah set in a picturesque valley basin.', image: 'https://images.unsplash.com/photo-1566438480900-0609be27a4be?auto=format&fit=crop&w=600&q=80' },
      { name: 'Mangladevi Fort', category: 'Heritage', description: 'Historic hilltop fort and ancient shrine providing sweeping commanding views of the Nowshera valley.', image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80' }
    ],
    coordinates: [74.3100, 33.3800],
    popularKey: 'rajouri'
  },

  // 20. POONCH
  {
    id: 'poonch',
    district: 'Poonch',
    tagline: 'Land of Waterfalls, Historic Forts & Swami Buddha Amarnath',
    division: 'Pir Panjal',
    listingsCount: 14,
    rating: 4.7,
    reviewsCount: 1420,
    startingPrice: 7000,
    duration: '2 - 4 Days',
    durationCategory: '1-3',
    travelTypes: ['Nature & Alpine Lakes', 'Sacred Pilgrimage & Temples', 'Heritage & Mughal Architecture'],
    budgetTier: 'budget',
    bestSeason: 'May – October',
    altitude: '981 m (Town) to 3,500 m (Passes)',
    image: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&w=1200&q=80',
    shortDescription: 'Noori Chamb waterfall where Queen Nur Jahan bathed, grand Poonch Fort, and Buddha Amarnath shrine.',
    overview: 'Poonch is rich in dramatic gorges, historic architecture, and cascades along the Pir Panjal range. Empress Nur Jahan fell in love with the majestic Noori Chamb waterfall here during her royal travels.',
    touristPlaces: [
      { name: 'Poonch Fort', category: 'Heritage', description: 'Imposing 18th-century royal palace fort built by Raja Rustam Khan showcasing Mughal and Dogra courtyards.', image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80' },
      { name: 'Noori Chamb Waterfall', category: 'Must-Visit', description: '100-foot roaring waterfall named after Mughal Empress Nur Jahan, who had an imperial mirror pool crafted here.', image: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&w=600&q=80' },
      { name: 'Loran Valley', category: 'Scenic View', description: 'Lush mountain valley located at the base of Tatakooti peak with gushing streams and pine forests.', image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80' },
      { name: 'Nandishool Waterfall', category: 'Lake & Nature', description: 'Spectacular 150-foot multi-tier glacial waterfall deep inside Loran forest wilderness.', image: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=600&q=80' },
      { name: 'Swami Buddha Amarnath Temple', category: 'Spiritual', description: 'Ancient natural white stone Shiva temple located on the banks of River Pulsata surrounded by green hills.', image: 'https://images.unsplash.com/photo-1566438480900-0609be27a4be?auto=format&fit=crop&w=600&q=80' }
    ],
    coordinates: [74.1000, 33.7700],
    popularKey: 'poonch'
  }
];
