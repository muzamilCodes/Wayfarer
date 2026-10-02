export interface TouristPlace {
  name: string;
  category: 'Must-Visit' | 'Heritage' | 'Adventure' | 'Spiritual' | 'Lake & Nature' | 'Scenic View' | 'Offbeat & Camping' | 'Family & Leisure';
  description: string;
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
      { name: 'Dal Lake & Shikara Rides', category: 'Lake & Nature', description: 'Iconic water body famous for luxury cedar wood houseboats, floating vegetable markets, and golden hour boat rides.' },
      { name: 'Nishat Bagh & Shalimar Bagh', category: 'Heritage', description: 'Terraced Mughal imperial gardens built by Jahangir and Asif Khan with fountains, chinar trees, and Zabarwan hill backdrop.' },
      { name: 'Shankaracharya Temple', category: 'Spiritual', description: 'Ancient 9th-century Shiva temple perched on Gopadari Hill offering a 360-degree panoramic view of Srinagar.' },
      { name: 'Hazratbal Shrine', category: 'Spiritual', description: 'White marble shrine on the banks of Dal Lake housing the sacred relic (Moi-e-Muqqadas) of Prophet Muhammad.' },
      { name: 'Indira Gandhi Memorial Tulip Garden', category: 'Must-Visit', description: 'Asia’s largest tulip garden boasting over 1.5 million blooming flowers in springtime on the foothills of Zabarwan.' },
      { name: 'Pari Mahal (Palace of Fairies)', category: 'Heritage', description: 'Seven-terraced astronomical observatory and garden built by Prince Dara Shikoh overlooking Dal Lake.' },
      { name: 'Nigeen Lake', category: 'Lake & Nature', description: 'Quieter, pristine sister lake surrounded by willows, houseboats, and water sports.' },
      { name: 'Hari Parbat Fort & Sharika Temple', category: 'Heritage', description: 'Historic 18th-century Durrani fortress hosting the revered Sharika Devi temple and Makhdoom Sahib shrine.' },
      { name: 'Old City & Khanqah-e-Moula', category: 'Heritage', description: 'Historic downtown, wooden pagoda architecture, Jamia Masjid, and artisan handicraft bazaars.' },
      { name: 'Dachigam National Park', category: 'Adventure', description: 'Protected Himalayan wildlife sanctuary and the last sanctuary of the endangered Kashmir Stag (Hangul).' }
    ],
    coordinates: [74.7973, 34.0837],
    popularKey: 'srinagar'
  },

  // 2. BARAMULLA
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
    overview: 'Baramulla is home to Gulmarg, one of the world’s top ski resorts with the highest operating cable car in Asia. Beyond skiing, it offers the highest green golf course, alpine trekking trails, and historic border posts.',
    touristPlaces: [
      { name: 'Gulmarg Gondola & Apharwat Peak', category: 'Must-Visit', description: 'Phase 1 to Kongdoori and Phase 2 reaching 13,780 ft at Apharwat Peak for breathtaking views of Nanga Parbat and K2.' },
      { name: 'Gulmarg Ski Resort & Slopes', category: 'Adventure', description: 'Premier powdery snow ski terrain, snowboarding schools, heli-skiing, and winter carnival.' },
      { name: 'Tangmarg & Ferozepur Nallah', category: 'Scenic View', description: 'Scenic gateway mountain town filled with bubbling icy trout streams, walnut orchards, and pony trails.' },
      { name: 'Alpathar Frozen Lake', category: 'Lake & Nature', description: 'High-altitude alpine triangular lake at the foot of Apharwat peaks, remaining frozen till late June.' },
      { name: 'Baba Reshi Shrine', category: 'Spiritual', description: 'Famous 15th-century Sufi saint shrine with intricate wooden Kashmiri woodwork and tranquil forest setting.' },
      { name: 'Gulmarg Historic Golf Course', category: 'Heritage', description: 'Established in 1911 by the British, it is the world’s highest 18-hole green golf course.' },
      { name: 'St. Mary’s Church & Maharani Temple', category: 'Heritage', description: 'Victorian-era stone church and the royal Dogra Maharani Temple featured in classic Bollywood cinema.' },
      { name: 'Eco Park Khadinyar', category: 'Scenic View', description: 'Serene island river park situated on the banks of River Jhelum near Baramulla town.' },
      { name: 'Uri & Kaman Post (Aman Setu)', category: 'Heritage', description: 'Historic Indo-Pak border peace bridge and memorial surrounded by towering mountain ravines.' }
    ],
    coordinates: [74.3805, 34.0484],
    popularKey: 'gulmarg'
  },

  // 3. ANANTNAG
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
      { name: 'Pahalgam & Lidder River', category: 'Must-Visit', description: 'Scenic resort town famous for white-water river rafting, trout angling, and riverside campsites.' },
      { name: 'Betaab Valley', category: 'Scenic View', description: 'Breathtaking valley named after the Bollywood blockbuster, bordered by pine-clad snow mountains.' },
      { name: 'Aru Valley & Kolahoi Glacier Base', category: 'Adventure', description: 'Pristine alpine hamlet and trailhead for expeditions to Kolahoi Glacier, Tarsar-Marsar, and Katrinag.' },
      { name: 'Baisaran Valley ("Mini Switzerland")', category: 'Scenic View', description: 'Lush green undulating meadow reachable by pony trek surrounded by dense deodar forests and snow peaks.' },
      { name: 'Chandanwari', category: 'Adventure', description: 'Starting point of the holy Amarnath Yatra pilgrimage, featuring natural snow bridges and sledge tracks.' },
      { name: 'Martand Sun Temple Ruins', category: 'Heritage', description: 'Monumental 8th-century stone temple built by Emperor Lalitaditya Muktapida with colonnaded Greek-influenced arches.' },
      { name: 'Verinag Spring & Mughal Arcade', category: 'Heritage', description: 'Deep octagonal royal Mughal tank marking the official source of River Jhelum with crystal emerald water.' },
      { name: 'Kokernag Botanical Garden & Springs', category: 'Lake & Nature', description: 'Collection of multi-colored spring channels, Kashmir’s largest freshwater spring, and aromatic rose garden.' },
      { name: 'Achabal Mughal Garden', category: 'Heritage', description: 'Historic cascading pleasure garden constructed by Mughal Empress Nur Jahan with natural gushing cascades.' },
      { name: 'Daksum & Sinthan Pass Approach', category: 'Adventure', description: 'Quiet forest retreat with wooden chalets, deep gorges, and switchbacks ascending to Sinthan Top.' }
    ],
    coordinates: [75.3150, 34.0161],
    popularKey: 'pahalgam'
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
      { name: 'Sonamarg & Thajiwas Glacier', category: 'Must-Visit', description: 'Perennial alpine glacier reachable via trek or pony, offering snow sledging, ice climbing, and silver fir forests.' },
      { name: 'Zero Point & Zoji La Pass', category: 'Adventure', description: 'High-mountain pass at 11,575 ft with thrilling hairpin turns and perennial snow walls on the Ladakh highway.' },
      { name: 'Kashmir Great Lakes (Gangabal, Vishansar, Kishansar)', category: 'Lake & Nature', description: 'Legendary 7-day high-altitude trek crossing turquoise glacial tarns beneath Mount Harmukh.' },
      { name: 'Kheer Bhawani Temple (Tulmulla)', category: 'Spiritual', description: 'Most sacred Hindu Kashmiri Pandit shrine built over a miraculous spring that alters water color.' },
      { name: 'Manasbal Lake', category: 'Lake & Nature', description: 'Deepest freshwater lake in Kashmir, known as the "Gem of Kashmir" with lotus fields and water skiing.' },
      { name: 'Baltal Valley', category: 'Scenic View', description: 'Vast scenic riverside camping valley and shortest ascent route to the Holy Cave of Amarnath.' },
      { name: 'Naranag Temple Ruins', category: 'Heritage', description: '8th-century stone temple complex dedicated to Lord Shiva tucked amidst ancient walnut forests.' },
      { name: 'Sindh River White Water Rafting', category: 'Adventure', description: 'Thrilling grade II to IV rapids flowing straight from the high glaciers down to Sonamarg.' }
    ],
    coordinates: [75.2930, 34.3020],
    popularKey: 'sonamarg'
  },

  // 5. BANDIPORA
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
      { name: 'Gurez Valley & Dawar Town', category: 'Must-Visit', description: 'Secluded Dard-Shin frontier valley with traditional logwood houses and warm Himalayan hospitality.' },
      { name: 'Habba Khatoon Peak', category: 'Scenic View', description: 'Colossal pyramid-shaped mountain named after the legendary 16th-century poetess-queen of Kashmir.' },
      { name: 'Kishanganga River Valley', category: 'Lake & Nature', description: 'Crystal-clear glacier-fed river ideal for river camping, trout fishing, and rafting.' },
      { name: 'Razdan Pass (11,672 ft)', category: 'Adventure', description: 'High-altitude mountain pass offering stupendous panoramas of Mount Harmukh and surrounding snow massifs.' },
      { name: 'Wular Lake & Watlab', category: 'Lake & Nature', description: 'One of the largest freshwater lakes in Asia, famous for migratory bird watching and sunset vistas.' },
      { name: 'Athwatoo & Tragbal', category: 'Offbeat & Camping', description: 'Hidden forest camping spots with roaring waterfalls and sweeping views of the northern valley.' },
      { name: 'Tulail Valley (Chakwali)', category: 'Adventure', description: 'The outermost border hamlet of Gurez with dramatic meadows and wooden tribal hamlets.' }
    ],
    coordinates: [74.6500, 34.6300],
    popularKey: 'gurez'
  },

  // 6. BUDGAM
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
      { name: 'Doodhpathri ("Valley of Milk")', category: 'Must-Visit', description: 'Vast grassy alpine bowl traversed by the gushing Shaliganga and Sukhnag rivers against pine ridges.' },
      { name: 'Yusmarg ("Meadow of Jesus")', category: 'Scenic View', description: 'Tranquil alpine retreat framed by the majestic snow peaks of Tatakooti and Sunset Peak.' },
      { name: 'Nilnag Lake', category: 'Lake & Nature', description: 'Enchanting pine-fringed blue-water lake accessible by a peaceful 4 km hike through cedar forests.' },
      { name: 'Tosamaidan Meadow', category: 'Adventure', description: 'Massive historical meadow once traversed by the Mughals, now opened for high-altitude trekking and camping.' },
      { name: 'Charar-i-Sharief Shrine', category: 'Spiritual', description: '600-year-old revered wooden Sufi shrine of Sheikh Noor-ud-din Wali (Nund Rishi), patron saint of Kashmir.' },
      { name: 'Sang-e-Safed (White Rocks)', category: 'Adventure', description: 'Trek route along frozen mountain streams and sheer white limestone rock formations.' },
      { name: 'Khag & Pehjan Hot Springs', category: 'Lake & Nature', description: 'Hidden pastoral meadows and therapeutic mineral water springs in the upper hills.' }
    ],
    coordinates: [74.7800, 34.0200],
    popularKey: 'doodhpathri'
  },

  // 7. KUPWARA
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
      { name: 'Bangus Valley (Bodh & Lokut Bangus)', category: 'Must-Visit', description: 'Unblemished mega-meadow surrounded by Chowkibal and Shamsbari mountain ranges with carpeted wildflowers.' },
      { name: 'Lolab Valley ("Wadi-e-Lolab")', category: 'Scenic View', description: 'Famous for fruit orchards, dense deodar forests, springs, and pastoral serenity celebrated by poet Allama Iqbal.' },
      { name: 'Kalaroos Caves & Stone Carvings', category: 'Heritage', description: 'Mysterious ancient subterranean caves and rock carvings with legends of underground tunnels to Central Asia.' },
      { name: 'Teetwal & Kishanganga LOC Crossing', category: 'Heritage', description: 'Historic border hamlet on the banks of Kishanganga River with the newly built Sharda Temple & Gurudwara.' },
      { name: 'Seemab Valley & Chandigam', category: 'Lake & Nature', description: 'Lush green picnic glades centered around clear water bodies and water bodies.' },
      { name: 'Sadhna Pass (10,269 ft)', category: 'Adventure', description: 'Dramatic mountain pass connecting Kupwara to Karnah Valley, providing sweeping Himalayan views.' },
      { name: 'Drangyari & Karnah', category: 'Offbeat & Camping', description: 'Highland pasture valley nestled under snowy ridges with tribal log cabin settlements.' }
    ],
    coordinates: [74.2500, 34.5300],
    popularKey: 'bangus'
  },

  // 8. KULGAM
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
      { name: 'Aharbal Waterfall ("Niagara of Kashmir")', category: 'Must-Visit', description: 'Thunderous 25-meter plunge of the Veshav River through narrow pine ravines with misty spray and rainbow views.' },
      { name: 'Kausar Nag Alpine Lake', category: 'Lake & Nature', description: 'High-altitude sacred glacial lake at 12,000 ft in the Pir Panjal range, shaped like a footprint and frozen in winter.' },
      { name: 'Kungwattan Alpine Meadow', category: 'Scenic View', description: 'Tranquil deodar plateau reachable by a scenic 8 km trek from Aharbal, ideal for camping under starlit skies.' },
      { name: 'Chimmer & Badamwari', category: 'Lake & Nature', description: 'Picturesque terraced apple and almond village with cascading forest brooks.' },
      { name: 'Panchanpathri & D.H. Pora', category: 'Adventure', description: 'Panoramic mountain viewpoint offering clear sights of the entire South Kashmir valley bowl.' },
      { name: 'Shrine of Mir Syed Ali Simnani', category: 'Spiritual', description: 'Venerable Islamic heritage shrine in Kulgam town with artistic Kashmiri wooden architecture.' }
    ],
    coordinates: [74.9000, 33.6400],
    popularKey: 'aharbal'
  },

  // 9. PULWAMA
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
      { name: 'Pampore Saffron Fields', category: 'Must-Visit', description: 'Miles of purple saffron crocuses blooming in October/November; visit saffron processing centers and spice bazaars.' },
      { name: 'Awantipora Ruins (Awantiswami & Avantisvara)', category: 'Heritage', description: '9th-century stone temple complex built by King Avantivarman dedicated to Lord Vishnu and Lord Shiva.' },
      { name: 'Shikargah Wildlife Sanctuary (Tral)', category: 'Adventure', description: 'Former royal hunting reserve of Maharaja Hari Singh, surrounded by dense pine forests and deer habitats.' },
      { name: 'Payar Monolithic Temple', category: 'Heritage', description: 'Exquisite 10th-century stone temple carved from a single boulder, featuring fine Hindu stone relief sculptures.' },
      { name: 'Tarsar-Marsar Trailhead (Aripal)', category: 'Lake & Nature', description: 'Tral valley entry to high-altitude mountain lakes and pristine shepherd summer settlements.' },
      { name: 'Jawbrari & Khrew Springs', category: 'Spiritual', description: 'Ancient sacred spring dedicated to Goddess Jwala Ji perched atop a rocky hillock.' }
    ],
    coordinates: [74.9200, 33.8700],
    popularKey: 'pulwama'
  },

  // 10. SHOPIAN
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
      { name: 'Peer Ki Gali (Pir Panjal Pass)', category: 'Must-Visit', description: 'High-altitude mountain pass at 11,450 ft on Mughal Road with dramatic alpine meadows and saint shrine.' },
      { name: 'Historic Mughal Road', category: 'Heritage', description: 'Ancient imperial route connecting Kashmir to Poonch and Rajouri with stone caravan sarais and royal monuments.' },
      { name: 'Hirpora Wildlife Sanctuary', category: 'Adventure', description: 'Habitat of the endangered Pir Panjal Markhor (wild goat), Himalayan brown bear, and Tibetan wolf.' },
      { name: 'Shopian Apple Orchards (Padpawan)', category: 'Scenic View', description: 'Expansive apple orchards covering rolling hill slopes laden with ruby Kashmiri apples during harvest.' },
      { name: 'Dubjan Trout Stream', category: 'Lake & Nature', description: 'Scenic glade along gushing glacier stream surrounded by pine woods, popular for picnicking.' },
      { name: 'Aliabad Sarai', category: 'Heritage', description: '16th-century stone caravanserai built by Emperor Akbar for resting royal retinues crossing Pir Panjal.' }
    ],
    coordinates: [74.8300, 33.7200],
    popularKey: 'shopian'
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
      { name: 'Bahu Fort & Bagh-e-Bahu Gardens', category: 'Must-Visit', description: '3,000-year-old historic citadel housing the revered Bawe Wali Mata shrine and terraced fountains.' },
      { name: 'Underwater Aquarium Bagh-e-Bahu', category: 'Family & Leisure', description: 'Subcontinent’s largest fish-shaped underground tunnel aquarium featuring hundreds of exotic marine species.' },
      { name: 'Raghunath Temple Complex', category: 'Spiritual', description: 'One of the largest temple complexes in North India built by Maharaja Gulab Singh with gold-plated sanctums.' },
      { name: 'Mubarak Mandi Palace & Pink Hall', category: 'Heritage', description: 'Royal royal Dogra palace complex blending Rajasthani, Mughal, and European baroque architecture.' },
      { name: 'Amar Mahal Palace Museum', category: 'Heritage', description: 'French chateau-style red palace holding the 120 kg solid gold throne, royal library, and Pahari miniatures.' },
      { name: 'Akhnoor Fort & Jia Pota Ghat', category: 'Heritage', description: 'Ancient fortress and Harappan excavation site on the roaring Chenab River where Maharaja Gulab Singh was crowned.' },
      { name: 'Jamboo Zoo (Nagrota)', category: 'Adventure', description: 'Expansive modern 3,200-acre zoological park showcasing Himalayan black bears, lions, and leopards.' },
      { name: 'Peer Kho Cave Temple', category: 'Spiritual', description: 'Ancient natural cave shrine of Lord Shiva believed to be the meditation cavern of the epic hero Jamvant.' }
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
      { name: 'Shri Mata Vaishno Devi Holy Cave Shrine', category: 'Must-Visit', description: 'Revered Trikuta mountain cave temple visited by millions, accessible by battery cars, ropeway, or walking trek.' },
      { name: 'Bhairon Ghati & Ropeway', category: 'Spiritual', description: 'Cable car ride connecting Bhavan to Bhairon temple atop steep cliffs with misty valley vistas.' },
      { name: 'Shiv Khori Holy Cave Shrine (Ransoo)', category: 'Spiritual', description: 'Kilometer-long natural limestone cave housing a miraculous self-formed natural stalagmite Shiva Lingam.' },
      { name: 'Chenab Rail Bridge (Kauri)', category: 'Must-Visit', description: 'World’s highest railway arch bridge towering 359 m (1,178 ft) over River Chenab, taller than the Eiffel Tower.' },
      { name: 'Siar Baba Waterfall', category: 'Lake & Nature', description: 'Spectacular 100-foot natural single-drop waterfall cascading into an emerald bathing pool on Chenab bank.' },
      { name: 'Baba Dhansar Spring & Waterfall', category: 'Spiritual', description: 'Sacred crystal-clear spring with naturally bubbling water and holy Shiva Karoo cave.' },
      { name: 'Salal Dam & Reservoir', category: 'Scenic View', description: 'Colossal hydroelectric engineering dam built over deep rock gorges of River Chenab.' },
      { name: 'Bhimgarh Fort', category: 'Heritage', description: 'Historic hilltop stone fort constructed by legendary Dogra General Zorawar Singh.' }
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
      { name: 'Patnitop Hill Station & Meadow', category: 'Must-Visit', description: 'Pristine pine plateau with paragliding, nature trails, snow-shoeing, and cozy wooden alpine cottages.' },
      { name: 'Skyview Patnitop Ropeway (Sanget to Patnitop)', category: 'Adventure', description: 'India’s highest ropeway system gliding over deep pine canyons and terraced hillsides.' },
      { name: 'Natha Top Snow Ridge', category: 'Scenic View', description: 'High-altitude panoramic ridge offering snow sledging in winter and unobstructed views of Kishtwar ranges.' },
      { name: 'Krimchi Temples ("Pandava Temples")', category: 'Heritage', description: 'Group of 7 ancient classical stone temples dating back to 8th–9th century with intricate Nagara architecture.' },
      { name: 'Sudh Mahadev Temple', category: 'Spiritual', description: 'Ancient temple housing a 2,800-year-old trident of Lord Shiva and sacred Papnashini natural spring.' },
      { name: 'Mantalai Sacred Deodar Glade', category: 'Lake & Nature', description: 'Site of the legendary wedding of Lord Shiva and Goddess Parvati amidst serene deodar forests and apple orchards.' },
      { name: 'Ramnagar Fort & Sheesh Mahal', category: 'Heritage', description: 'Grand historic fort with painted ceilings, wall frescoes, and defensive moats built by Raja Suchet Singh.' },
      { name: 'Kud & Hot Patisa Sweets', category: 'Family & Leisure', description: 'Famous mountain town stopover known across India for hot handmade Desi Ghee Patisa confection.' }
    ],
    coordinates: [75.1300, 32.9200],
    popularKey: 'patnitop'
  },

  // 14. DODA
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
      { name: 'Bhaderwah ("Chota Kashmir")', category: 'Must-Visit', description: 'Picturesque valley bowl filled with bubbling streams, ancient serpent temples, and mild alpine climate.' },
      { name: 'Jai Valley', category: 'Lake & Nature', description: 'Evergreen 32 km long valley with serpentine trout streams, horse riding trails, and igloo log huts.' },
      { name: 'Padri Pass (10,500 ft)', category: 'Adventure', description: 'Vast grassy meadow pass on the interstate border with Chamba, holding snowfields till early summer.' },
      { name: 'Gupt Ganga Temple', category: 'Spiritual', description: 'Ancient rock temple on River Neru containing the footprints of the Pandavas during their exile.' },
      { name: 'Lal Draman Meadow', category: 'Scenic View', description: 'High-altitude panoramic pasture overlooking the Chenab river gorge and snow peaks.' },
      { name: 'Seoj Dhar (Vast Alpine Plateau)', category: 'Adventure', description: 'Expansive high plateau with rolling grasslands, glacier streams, and Kailash Kund trekking route.' },
      { name: 'Chinta Valley & Subar Dhar', category: 'Offbeat & Camping', description: 'Scenic orchards and hilltop meadow featuring the ancient Subar Nag temple with 360-degree vistas.' }
    ],
    coordinates: [75.5400, 33.1400],
    popularKey: 'bhaderwah'
  },

  // 15. KISHTWAR
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
      { name: 'Sinthan Top (12,500 ft)', category: 'Must-Visit', description: 'Snowbound pass between Anantnag and Kishtwar offering perennial snow sledging, tea stalls, and 360° views.' },
      { name: 'Warwan Valley & Marwah Valley', category: 'Adventure', description: 'Ultra-offbeat paradise cut off from modern life with wooden log hamlets, glacier waterfalls, and wildflowers.' },
      { name: 'Kishtwar High Altitude National Park', category: 'Adventure', description: 'Rugged 400 sq km reserve home to snow leopards, brown bears, musk deer, and rare Himalayan monal pheasants.' },
      { name: 'Chowgan Ground', category: 'Scenic View', description: 'Massive natural green field in Kishtwar town spanning 165 acres used for celebrations, strolls, and polo.' },
      { name: 'Machail Mata Shrine (Padder)', category: 'Spiritual', description: 'Famous pilgrimage temple deep in the mountains, accessible via the legendary Machail Yatra padayatra.' },
      { name: 'Padder Valley (Sapphire Mines)', category: 'Heritage', description: 'World-famous origin of the rare royal peacock-blue Kashmiri sapphires nestled beneath towering crags.' },
      { name: 'Mughal Maidan & Chatroo Valley', category: 'Lake & Nature', description: 'Verdant river camping grounds with trout fishing along the Chatroo river.' }
    ],
    coordinates: [75.7600, 33.3100],
    popularKey: 'kishtwar'
  },

  // 16. RAMBAN
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
      { name: 'Sanasar Lake & Adventure Park', category: 'Must-Visit', description: 'Cup-shaped alpine meadow and lake featuring paragliding, tandem flights, 9-hole golf course, and zip lines.' },
      { name: 'Baglihar Dam & Chenab Gorge', category: 'Scenic View', description: 'Towering 143-meter gravity dam creating a massive turquoise reservoir amidst steep granite cliffs.' },
      { name: 'Mahu Mangat Valley', category: 'Offbeat & Camping', description: 'Hidden gem with pristine alpine streams, virgin deodar forests, and gentle trekking trails.' },
      { name: 'Pogal Paristan Fairytale Valley', category: 'Lake & Nature', description: 'Enchanting secluded valley surrounded by steep pine peaks with traditional Dogra & Pahari culture.' },
      { name: 'Tata Pani Hot Sulfur Springs', category: 'Spiritual', description: 'Natural thermal springs on the Chenab riverbed with medicinal healing properties for joint and skin ailments.' },
      { name: 'Neel Top Meadows', category: 'Scenic View', description: 'High-altitude panoramic pasture providing eye-level views of the Pir Panjal snow crest.' }
    ],
    coordinates: [75.2400, 33.2400],
    popularKey: 'sanasar'
  },

  // 17. KATHUA
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
      { name: 'Basohli & Miniature Painting Center', category: 'Heritage', description: 'Historic principality famous for fiery colored Basohli Miniature art school and GI-tagged Pashmina weaving.' },
      { name: 'Atal Setu Cable Bridge', category: 'Must-Visit', description: 'Striking 592-meter cable-stayed bridge over the turquoise backwaters of River Ravi, fourth of its kind in India.' },
      { name: 'Ranjit Sagar Lake & Dam', category: 'Lake & Nature', description: 'Massive reservoir offering motorboat rides, kayaking, island campsites, and water recreation.' },
      { name: 'Bani Valley & Sarthal Meadow ("Mini Switzerland of Jammu")', category: 'Scenic View', description: 'High-altitude snow glades, icy mountain streams, deodar forests, and Sarthal Devi Mata shrine.' },
      { name: 'Jasrota Fort & Wildlife Sanctuary', category: 'Heritage', description: 'Ancient ruined fort palace of Jasrotia rulers surrounded by sprawling bamboo and deer forests.' },
      { name: 'Dreamland Park Kathua', category: 'Family & Leisure', description: 'Beautiful urban amusement park and canal waterfront in the city center.' },
      { name: 'Chanchalo Devi Temple', category: 'Spiritual', description: 'Ancient hilltop temple in Basohli commanding panoramic views of the water reservoir and Shivalik hills.' }
    ],
    coordinates: [75.5200, 32.3700],
    popularKey: 'basohli'
  },

  // 18. POONCH
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
      { name: 'Noori Chamb Waterfall', category: 'Must-Visit', description: '100-foot roaring waterfall named after Mughal Empress Nur Jahan, who had an imperial mirror pool crafted here.' },
      { name: 'Poonch Fort (Qila)', category: 'Heritage', description: 'Imposing 18th-century royal palace fort built by Raja Rustam Khan showcasing Mughal and Dogra courtyards.' },
      { name: 'Swami Buddha Amarnath Temple (Mandi)', category: 'Spiritual', description: 'Ancient natural white stone Shiva temple located on the banks of River Pulsata surrounded by green hills.' },
      { name: 'Gurudwara Nangali Sahib', category: 'Spiritual', description: 'One of the most sacred and oldest Sikh shrines in northern India, drawing thousands of devotees.' },
      { name: 'Loran Valley & Sultanpathri', category: 'Scenic View', description: 'Lush mountain valley located at the base of Tatakooti peak with gushing streams and pine forests.' },
      { name: 'Nandishool Waterfall', category: 'Lake & Nature', description: 'Spectacular 150-foot multi-tier glacial waterfall deep inside Loran forest wilderness.' },
      { name: 'Pir Marg & Mughal Road Crossing', category: 'Adventure', description: 'Picturesque alpine pasture offering clear views of the southern and northern flanks of Pir Panjal.' }
    ],
    coordinates: [74.1000, 33.7700],
    popularKey: 'poonch'
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
      { name: 'Seven Lakes of Pir Panjal (Nandan Sar, Chandan Sar)', category: 'Must-Visit', description: 'Cluster of 7 pristine high-altitude glacial tarns at 12,000 ft reached via high alpine trekking.' },
      { name: 'Shahdara Sharief Shrine (Thannamandi)', category: 'Spiritual', description: 'Famous 19th-century Sufi shrine of Baba Ghulam Shah Badshah set in a picturesque valley basin.' },
      { name: 'Chingus Sarai & Fort', category: 'Heritage', description: 'Historic 16th-century Mughal inn where the internal organs of Mughal Emperor Jahangir were entombed.' },
      { name: 'Deera Ki Gali (DKG) & Buffliaz', category: 'Scenic View', description: 'Dense oak and pine-covered mountain pass at 6,600 ft on the Mughal Road with misty cloud inversions.' },
      { name: 'Kotranka & Budhal Valleys', category: 'Lake & Nature', description: 'Pristine highland hamlets flanked by snowy peaks, ideal for offbeat nature camping and angling.' },
      { name: 'Mangla Mata Temple', category: 'Spiritual', description: 'Historic Shakti shrine perched on a hillock overlooking the valley.' },
      { name: 'Rajouri Heritage Fort', category: 'Heritage', description: 'Historic stone fort situated atop a steep hill overlooking the town and River Tawi.' }
    ],
    coordinates: [74.3100, 33.3800],
    popularKey: 'rajouri'
  },

  // 20. SAMBA
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
      { name: 'Mansar Lake & Wildlife Sanctuary', category: 'Must-Visit', description: 'Sacred picturesque lake ringed by forested hills, boating facilities, Sheshnag temple, and tortoise reserve.' },
      { name: 'Samba Fort Citadel', category: 'Heritage', description: '19th-century brick and stone citadel built by the Dogra kings perched atop a strategic hillock.' },
      { name: 'Purmandal ("Chhota Kashi")', category: 'Spiritual', description: 'Ancient holy pilgrimage center dedicated to Lord Shiva on the sandy bed of the subterranean Holy Devika River.' },
      { name: 'Utterbehni Temple Complex', category: 'Spiritual', description: 'Rare sacred river spot where the holy Devika flows northward (Uttar Vahini), dotted with historic stone shrines.' },
      { name: 'Chichi Mata Temple', category: 'Spiritual', description: 'Ancient temple situated on the National Highway considered the sacred gateway to Vaishno Devi.' },
      { name: 'Mahore Garh Fort', category: 'Heritage', description: 'Historic 18th-century hilltop bastion with panoramic vistas of the Shivalik plains.' }
    ],
    coordinates: [75.1200, 32.5600],
    popularKey: 'mansar'
  }
];
