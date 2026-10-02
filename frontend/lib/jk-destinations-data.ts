export interface TouristPlace {
  name: string;
  category: 'Must-Visit' | 'Heritage' | 'Adventure' | 'Spiritual' | 'Lake & Nature' | 'Scenic View' | 'Offbeat & Camping' | 'Family & Leisure';
  pinCode?: string;
  description: string;
  speciality?: string;
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
      {
        name: 'Dal Lake & Floating Market',
        pinCode: '190001',
        category: 'Lake & Nature',
        description: 'A vast urban lake offering iconic shikara cruises and unique early morning aquatic commerce.',
        speciality: 'Famous for its floating gardens, residential houseboats, and a vibrant early morning floating vegetable bazaar over the water.',
        image: 'https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Nigeen Lake',
        pinCode: '190006',
        category: 'Lake & Nature',
        description: 'A tranquil, deep blue body of water connected via a narrow strait to Dal Lake.',
        speciality: 'A highly peaceful option for luxury houseboats, water-skiing, and deep birdwatching without tourist crowds.',
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Shalimar Bagh',
        pinCode: '191121',
        category: 'Heritage',
        description: 'The grandest Mughal garden built in 1619 AD by Emperor Jahangir for Empress Nur Jahan.',
        speciality: 'Features a four-tiered architectural layout with a black marble pavilion surrounded by continuous cascades of water.',
        image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Nishat Bagh',
        pinCode: '191121',
        category: 'Heritage',
        description: 'Known as the Garden of Bliss, built in 1633 AD by Asif Khan with the Zabarwan range as a backdrop.',
        speciality: 'Boasts a towering 12-tiered terrace layout giving a wide open view over the pristine waters of the lake.',
        image: 'https://images.unsplash.com/photo-1518457607834-6e8d80c183c5?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Chashme Shahi',
        pinCode: '190001',
        category: 'Heritage',
        description: 'A terraced royal spring garden constructed in 1632 AD by Shah Jahan.',
        speciality: 'Houses a dynamic natural mineral spring historically recognized for its therapeutic and highly digestive water properties.',
        image: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Pari Mahal',
        pinCode: '190001',
        category: 'Heritage',
        description: 'An ancient seven-terraced castle built by Prince Dara Shikoh around old Buddhist ruins.',
        speciality: 'Served as a prominent astronomical learning centre and offers unparalleled vantage points over the entire valley.',
        image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Indira Gandhi Tulip Garden',
        pinCode: '190001',
        category: 'Must-Visit',
        description: 'The largest tulip sanctuary in entire Asia situated right at the foot of the mountains.',
        speciality: 'Hosts millions of colorful tulip variants blooming simultaneously every single spring season around March-April.',
        image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Shankaracharya Temple',
        pinCode: '190001',
        category: 'Spiritual',
        description: 'An ancient stone Hindu temple dedicated to Lord Shiva situated atop a high hill vault.',
        speciality: 'Dating back to ~200 BC, it is historically linked to the spiritual philosophy steps of Adi Shankaracharya.',
        image: 'https://images.unsplash.com/photo-1566438480900-0609be27a4be?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Hazratbal Shrine',
        pinCode: '190006',
        category: 'Spiritual',
        description: 'A majestic white-marbled domed shrine sitting gracefully on the edge of Dal Lake.',
        speciality: 'Preserves the Moi-e-Muqaddas, a highly revered sacred hair relic of the Prophet Muhammad.',
        image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Jama Masjid Nowhatta',
        pinCode: '190002',
        category: 'Spiritual',
        description: 'An imposing 14th-century architectural mosque constructed by Sultan Sikandar.',
        speciality: 'Features unique Indo-Saracenic columns crafted out of 370 massive solid trunks of single Deodar wood trees.',
        image: 'https://images.unsplash.com/photo-1590073844006-33379778ae09?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Dachigam National Park',
        pinCode: '190012',
        category: 'Lake & Nature',
        description: 'A massive alpine biosphere covering raw craggy mountains and rich river streams.',
        speciality: 'The final sanctuary and natural habitat for the critically endangered Hangul (Kashmir Red Stag).',
        image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Harwan Gardens & Kushan Ruins',
        pinCode: '191121',
        category: 'Heritage',
        description: 'A highly serene canal park located adjacent to historic 4th-century ancient Buddhist foundations.',
        speciality: 'Acts as the historic gateway for the rugged high-altitude trekking route to the remote alpine Marsar Lake.',
        image: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Badamwari Park',
        pinCode: '190003',
        category: 'Scenic View',
        description: 'An old historical almond orchard situated right on the slopes of the Hari Parbat Fort hills.',
        speciality: "The exact visual indicator of spring's arrival when thousands of almond trees bloom in soft white/pink tones.",
        image: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Hari Parbat Fort',
        pinCode: '190003',
        category: 'Heritage',
        description: 'An imposing historic fort fortification built originally by Akbar and fortified by Shuja Shah Durrani.',
        speciality: 'A triple-religious site housing the ancient Sharika Devi temple, Makhdoom Sahib shrine, and Gurdwara Chatti Padshahi.',
        image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Fakergujri & Dara Meadows',
        pinCode: '190006',
        category: 'Offbeat & Camping',
        description: 'An offbeat eco-tourism tribal village settlement located right on the extreme outskirts of Srinagar.',
        speciality: 'Offers quiet, pristine green step meadows and a raw glimpse into the simple lifestyle of local Gujjar communities.',
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80'
      }
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
      {
        name: 'Pahalgam Town & Confluence',
        pinCode: '192126',
        category: 'Must-Visit',
        description: 'A world-renowned alpine resort situated at the roaring intersection of the Lidder River.',
        speciality: 'A core launching pad for mountain treks, famous for angling, rafting, and unmatched riverside alpine vistas.',
        image: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Betaab Valley',
        pinCode: '192126',
        category: 'Scenic View',
        description: 'A stunning meadow canyon flanked by jagged snow-covered walls and turquoise channels.',
        speciality: "Renamed after the 1983 Hindi film 'Betaab' shot entirely here; features crystal gravel streams.",
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Aru Valley',
        pinCode: '192126',
        category: 'Adventure',
        description: 'A serene alpine mountain village sanctuary located 12 kilometers further uphill from Pahalgam.',
        speciality: 'The absolute primary base campsite for the legendary Kolahoi Glacier and Tarsar-Marsar multi-day treks.',
        image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Chandanwari',
        pinCode: '192126',
        category: 'Spiritual',
        description: 'A rugged high-altitude snowy canyon route where icy layers remain frozen well into the summer months.',
        speciality: 'The official sacred starting point for the holy annual foot pilgrimage of the Shri Amarnath Yatra.',
        image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Baisaran / Mini Switzerland',
        pinCode: '192126',
        category: 'Scenic View',
        description: 'A pristine, high-altitude clearing enclosed by towering rows of thick pine trees.',
        speciality: 'Replicates a perfect Swiss meadow landscape, offering breathtaking aerial perspectives over the town below.',
        image: 'https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Martand Sun Temple',
        pinCode: '192124',
        category: 'Heritage',
        description: 'An architectural marvel constructed in the 8th century AD by the legendary King Lalitaditya Muktapida.',
        speciality: 'A majestic colonnaded stone ruin dedicated to the Sun God, showcasing classical Kashmiri-Hellenistic style.',
        image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Achabal Gardens',
        pinCode: '192201',
        category: 'Heritage',
        description: 'A magnificent Mughal pleasure garden planned in 1620 AD by Empress Nur Jahan.',
        speciality: 'Features unique ancient gravity-fed stone step water cascades powered entirely by natural mountain hydraulic pressure.',
        image: 'https://images.unsplash.com/photo-1518457607834-6e8d80c183c5?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Kokernag Spring & Trout Farm',
        pinCode: '192202',
        category: 'Lake & Nature',
        description: 'A lush botanical destination centered around a massive collection of natural fresh springs.',
        speciality: "Hosts Asia's largest organized trout fish breeding farm amidst collection channels of icy water.",
        image: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Verinag Mughal Spring',
        pinCode: '192212',
        category: 'Heritage',
        description: 'An octagonal deep stone reservoir built by Jahangir over a massive water chasm.',
        speciality: 'The officially identified geographical source of the mighty Jhelum River; features deep indigo water.',
        image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Daksum Forest Retreat',
        pinCode: '192228',
        category: 'Offbeat & Camping',
        description: 'A deeply isolated, dark pine forest valley settlement along the pristine Bringi river valley.',
        speciality: 'A paradise of complete solitude, dense woods, wooden log bridges, and an absolute lack of commercial crowds.',
        image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Sinthan Top',
        pinCode: '192228',
        category: 'Adventure',
        description: 'A towering mountain pass elevation at 12,500 feet bridging Kashmir with the Kishtwar region.',
        speciality: 'Offers a complete 360-degree panoramic sight of both regions; stays heavily snowbound for most of the year.',
        image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Chatpal Village',
        pinCode: '192228',
        category: 'Offbeat & Camping',
        description: 'A tiny hidden mountain enclave deep in south Kashmir with zero tourist commercialization.',
        speciality: 'Unmatched for raw village walks, clear cold mountain brooks, and absolute natural isolation.',
        image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Margan Top & Chuharnag Lakes',
        pinCode: '192228',
        category: 'Adventure',
        description: 'A remote high pass at 14,000 feet leading to a group of 4 pristine high-altitude alpine lakes.',
        speciality: 'Allows travelers to trek to pristine alpine lakes (Chuharnag) within just 45 minutes of a short day-hike.',
        image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Tulian Lake',
        pinCode: '192126',
        category: 'Lake & Nature',
        description: 'A striking high-altitude alpine lake shaped like a crescent, locked between craggy mountain peaks.',
        speciality: 'Perched at 11,000 feet, this lake remains filled with massive chunks of floating ice even during mid-summer.',
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80'
      }
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
    bestSeason: 'Dec – March (Skiing & Powdery Snow), May – Sept (Lush Green Meadows)',
    altitude: '2,650 m (8,690 ft) to 4,200 m (Apharwat)',
    image: 'https://images.unsplash.com/photo-1614082242765-7c98ca0f3df3?auto=format&fit=crop&w=1200&q=80',
    shortDescription: 'World’s highest operating cable car, powdery ski trails, Apharwat Peak, and historic wooden shrines.',
    overview: 'Baramulla boasts India’s premier winter sports hub Gulmarg, framed by the towering Pir Panjal ranges. It features the legendary Gulmarg Gondola rising to 13,780 ft, golf meadows, and panoramic vistas of Nanga Parbat.',
    touristPlaces: [
      {
        name: 'Gulmarg Meadow bowl',
        pinCode: '193403',
        category: 'Must-Visit',
        description: "A massive high-altitude bowl meadow internationally acclaimed as India's premier ski resort.",
        speciality: "Home to the world's highest green golf course and deep powder snow fields ideal for winter sports.",
        image: 'https://images.unsplash.com/photo-1614082242765-7c98ca0f3df3?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Gulmarg Gondola Phase I & II',
        pinCode: '193403',
        category: 'Must-Visit',
        description: 'One of the absolute highest multi-stage operating cable car systems across the entire globe.',
        speciality: 'Ascends dramatically up to nearly 14,000 feet at Apharwat Peak, offering birds-eye views of the Line of Control.',
        image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Khilanmarg',
        pinCode: '193403',
        category: 'Scenic View',
        description: 'A wide, sprawling high-altitude meadow sitting directly above the main resort basin of Gulmarg.',
        speciality: 'Offers completely unobstructed sights of the towering Nanga Parbat and acts as a playground for off-piste skiing.',
        image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Alpather Lake',
        pinCode: '193403',
        category: 'Lake & Nature',
        description: 'A high-altitude frozen lake tucked directly behind the high ridges of the Apharwat mountain peak.',
        speciality: "Remains frozen almost completely throughout the year, giving it the global title of 'The Frozen Lake'.",
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Drung Waterfall',
        pinCode: '193403',
        category: 'Scenic View',
        description: 'A powerful cascading waterfall flowing down jagged rocks in a narrow, dense forest valley near Tangmarg.',
        speciality: 'Transforms into a spectacular solid ice formation during peak winter months, looking like a crystal sculpture.',
        image: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Baba Reshi Shrine',
        pinCode: '193403',
        category: 'Spiritual',
        description: 'A 15th-century sacred shrine dedicated to the highly revered Sufi saint Baba Payam-ud-Din Reshi.',
        speciality: 'Showcases exquisite ancient wooden relief carvings and multi-tiered traditional Kashmiri architectural styles.',
        image: 'https://images.unsplash.com/photo-1566438480900-0609be27a4be?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Wular Lake - Watlab View',
        pinCode: '193501',
        category: 'Lake & Nature',
        description: 'One of the single largest natural freshwater lake formations in the entire Asian subcontinent.',
        speciality: "The Watlab ridge point offers an expansive sweeping aerial view of the lake's lotus fields and fishing boats.",
        image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Eco Park Baramulla',
        pinCode: '193101',
        category: 'Family & Leisure',
        description: 'A modern island park designed directly inside the main channel of the flowing Jhelum River.',
        speciality: 'Combines wooden walkways with river view seating, popular for family day-outings and scenic evening walks.',
        image: 'https://images.unsplash.com/photo-1518457607834-6e8d80c183c5?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Goguldara Viewpoint',
        pinCode: '193402',
        category: 'Offbeat & Camping',
        description: 'A completely offbeat mountain ridge viewpoint situated near the outskirts of Tangmarg town.',
        speciality: 'Provides an absolute escape from commercial tourist crowds with stunning green step fields and pine vistas.',
        image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Uri Border - Kaman Aman Setu',
        pinCode: '193123',
        category: 'Heritage',
        description: 'The historic international peace bridge located directly on the frontier line separating the borders.',
        speciality: 'Offers unique border tourism opportunities showcasing the cross-border transit infrastructure and patriotic milestones.',
        image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=600&q=80'
      }
    ],
    coordinates: [74.3805, 34.0484],
    popularKey: 'gulmarg'
  },

  // 4. GANDERBAL
  {
    id: 'ganderbal',
    district: 'Ganderbal (Sonamarg)',
    tagline: 'Meadow of Gold & Gateway to Ladakh',
    division: 'Kashmir Valley',
    listingsCount: 18,
    rating: 4.8,
    reviewsCount: 2940,
    startingPrice: 8900,
    duration: '2 - 4 Days',
    durationCategory: '1-3',
    travelTypes: ['Nature & Alpine Lakes', 'Adventure & High Passes', 'Offbeat & Camping'],
    budgetTier: 'mid',
    bestSeason: 'May – October (Trekking & Glacier excursions)',
    altitude: '2,800 m (9,200 ft)',
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80',
    shortDescription: 'Sonamarg Thajiwas Glacier, Zero Point, emerald Manasbal Lake, and Naranag ruins.',
    overview: 'Ganderbal is an alpine wonderland cradling the Sindh River and historic Silk Route routes. From perennial snow at Thajiwas Glacier to ancient 8th-century stone temple ruins of Naranag, it is a haven for adventure seekers.',
    touristPlaces: [
      {
        name: 'Sonamarg Meadow',
        pinCode: '191202',
        category: 'Must-Visit',
        description: 'Known as the Meadow of Gold, a stunning alpine transit valley resting along the historical Silk Route.',
        speciality: 'Flanked by towering glaciers and alpine rivers; serves as the base for the Great Lakes Trek.',
        image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Thajiwas Glacier',
        pinCode: '191202',
        category: 'Must-Visit',
        description: 'A majestic, multi-layered perennial glacier system located just a short horse-ride away from Sonamarg.',
        speciality: 'Provides access to frozen sledging slopes and ice formations even during the absolute peak of summer.',
        image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Zero Point - Zojila',
        pinCode: '191202',
        category: 'Adventure',
        description: 'A high-altitude snowy clearing located right along the treacherous loops of the Zojila Pass.',
        speciality: 'Features intense high-altitude wind currents and immense snow walls where visitors enjoy snow scooters.',
        image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Manasbal Lake',
        pinCode: '191201',
        category: 'Lake & Nature',
        description: 'The officially recorded deepest natural lake in India, surrounded by ancient terraced villages.',
        speciality: 'Famous as a premium lotus blossom habitat and a major winter home for unique migratory birds.',
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Kheer Bhawani Temple - Tullamulla',
        pinCode: '191201',
        category: 'Spiritual',
        description: 'A highly sacred Hindu shrine built over a unique natural hexagonal water spring layout.',
        speciality: 'The spring water naturally changes its color tone to forecast upcoming geopolitical shifts or disasters.',
        image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Naranag Temple Ruins',
        pinCode: '191211',
        category: 'Heritage',
        description: 'An 8th-century architectural group of structural granite stone temples built by King Lalitaditya.',
        speciality: 'Features massive single-stone roof carvings; serves as the base camp for the Mount Harmukh trek.',
        image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Baltal Valley',
        pinCode: '191202',
        category: 'Spiritual',
        description: 'A wide, rugged gravel river plain located right at the foot of the massive Zojila mountain walls.',
        speciality: 'Acts as the ultra-fast alternative base camp for the Amarnath Yatra pilgrimage circuit.',
        image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Gangabal Alpine Lake',
        pinCode: '191211',
        category: 'Lake & Nature',
        description: 'A high-altitude, pristine glacier-fed lake sitting under the shadow of the sacred Harmukh Peak.',
        speciality: 'Highly revered by Kashmiri Pandits; a world-class sanctuary for wild brown and rainbow trout fishing.',
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80'
      }
    ],
    coordinates: [75.2952, 34.3056],
    popularKey: 'sonamarg'
  },

  // 5. BUDGAM
  {
    id: 'budgam',
    district: 'Budgam (Doodhpathri & Yusmarg)',
    tagline: 'Meadow of Milk & Verdant Pine Plateaus',
    division: 'Kashmir Valley',
    listingsCount: 16,
    rating: 4.7,
    reviewsCount: 1980,
    startingPrice: 7200,
    duration: '2 - 3 Days',
    durationCategory: '1-3',
    travelTypes: ['Nature & Alpine Lakes', 'Offbeat & Camping', 'Family & Leisure', 'Sacred Pilgrimage & Temples'],
    budgetTier: 'budget',
    bestSeason: 'May – October (Flowering pastures & pleasant weather)',
    altitude: '2,730 m (8,957 ft)',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
    shortDescription: 'Doodhpathri roaring foaming streams, pine-encircled Yusmarg, and Tosamaidan wilderness.',
    overview: 'Budgam is revered for rolling velvet meadows, untouched pine forests, and historic Sufi shrines. Doodhpathri and Yusmarg offer quiet mountain pastures ideal for nature walks and camping away from mass crowds.',
    touristPlaces: [
      {
        name: 'Doodhpathri Meadow',
        pinCode: '191111',
        category: 'Must-Visit',
        description: 'A wide, undulating alpine bowl grassland intersected by a highly active boulder river.',
        speciality: 'Known as the Valley of Milk because the fast river crashing over rocks creates a thick, frothy white appearance.',
        image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Yusmarg Pastures',
        pinCode: '191112',
        category: 'Scenic View',
        description: 'A massive, pine-ringed plateau field framed perfectly by the towering peaks of Sunset and Tatakooti.',
        speciality: 'Visually untouched by rapid development, offering pure horse-riding trails into old wilderness camps.',
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Tosamaidan Clearing',
        pinCode: '191112',
        category: 'Adventure',
        description: 'A massive alpine meadow historically used as a grazing pasture and connecting route through ancient mountain steps.',
        speciality: 'One of the largest open meadows in the inner Pir Panjal range, highly popular for wilderness trekking setups.',
        image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Nilnag Alpine Lake',
        pinCode: '191112',
        category: 'Lake & Nature',
        description: 'A high-altitude, teardrop-shaped lake tucked deep inside dense, sloping pine forests near Yusmarg.',
        speciality: 'The water features a deep, unique blue-green coloration mirroring the surrounding ancient conifer canopy.',
        image: 'https://images.unsplash.com/photo-1518457607834-6e8d80c183c5?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Charar-i-Sharief Shrine',
        pinCode: '191112',
        category: 'Spiritual',
        description: 'An ancient timber-and-masonry Sufi shrine dating back over 600 years.',
        speciality: 'Final resting place of Sheikh Noor-ud-Din Wali (Nund Rishi), the premier saint of Kashmiri spiritual syncretism.',
        image: 'https://images.unsplash.com/photo-1566438480900-0609be27a4be?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Lishpathri Meadow',
        pinCode: '191111',
        category: 'Offbeat & Camping',
        description: 'A newly promoted micro-meadow hidden further upstream from the main tourist base of Doodhpathri.',
        speciality: 'Totally isolated from mass tour routes, featuring untamed wildflower carpets and seasonal nomad shelters.',
        image: 'https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?auto=format&fit=crop&w=600&q=80'
      }
    ],
    coordinates: [74.7833, 33.9500],
    popularKey: 'doodhpathri'
  },

  // 6. KUPWARA
  {
    id: 'kupwara',
    district: 'Kupwara (Lolab & Bungus)',
    tagline: 'Land of Love, Beauty & Untamed Frontiers',
    division: 'Kashmir Valley',
    listingsCount: 14,
    rating: 4.7,
    reviewsCount: 1420,
    startingPrice: 7800,
    duration: '2 - 4 Days',
    durationCategory: '1-3',
    travelTypes: ['Offbeat & Camping', 'Nature & Alpine Lakes', 'Adventure & High Passes'],
    budgetTier: 'budget',
    bestSeason: 'May – October (Spring blooms & summer treks)',
    altitude: '1,615 m to 3,100 m (Bungus Valley)',
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80',
    shortDescription: 'Verdant Lolab Valley orchards, sprawling high-altitude Bungus meadows, and Sadhna Pass.',
    overview: 'Kupwara in Northern Kashmir represents raw Himalayan beauty. Celebrated by poets as the Valley of Love, Lolab features walnut groves, dense deodar forests, and the untamed expanse of Bungus Valley.',
    touristPlaces: [
      {
        name: 'Lolab Valley',
        pinCode: '193223',
        category: 'Scenic View',
        description: 'A sprawling, fruit-bearing valley basin flanked by dense forests and traditional wooden villages.',
        speciality: "Known as the 'Land of Love and Beauty', featuring endless walnut groves, apple orchards, and old rustic lifestyle loops.",
        image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Bungus Valley',
        pinCode: '193222',
        category: 'Must-Visit',
        description: 'A massive, high-altitude twin meadow ecosystem (Bod Bungus and Lokut Bungus) near the frontier lines.',
        speciality: 'Spans across thousands of acres of wild grassland, populated by rare mountain herbs and crystal stream networks.',
        image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Sadhna Pass',
        pinCode: '193224',
        category: 'Adventure',
        description: 'A towering mountain highway pass standing at an elevation of 10,200 feet over the jagged frontier ridges.',
        speciality: 'Originally known as Nastachun Pass, renamed after the legendary actress Sadhona; offers intense panoramic snowy sights.',
        image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Keran Border Valley',
        pinCode: '193224',
        category: 'Offbeat & Camping',
        description: 'A dramatic riverside border village positioned directly along the edge of the rushing Kishanganga channel.',
        speciality: 'Tourists can look across the narrow river directly into Pakistan-administered villages just a few meters away.',
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Kalaroos Caves & Satbern',
        pinCode: '193222',
        category: 'Heritage',
        description: 'Ancient stone structural formations and deep cavern systems carved out of a rocky forested hill layout.',
        speciality: 'Features the Satbern (seven doors) carved stone monument, locally rumored to be ancient secret transit tunnels to Russia.',
        image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Machil Hamlet',
        pinCode: '193222',
        category: 'Offbeat & Camping',
        description: 'A deeply remote, pristine border landscape village cut off by heavy snow for multiple months every winter.',
        speciality: 'Offers an absolute raw, untouched view of frontier wooden architecture and high mountain isolation.',
        image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=600&q=80'
      }
    ],
    coordinates: [74.2500, 34.5300],
    popularKey: 'lolab'
  },

  // 7. KULGAM
  {
    id: 'kulgam',
    district: 'Kulgam (Aharbal)',
    tagline: 'Rice Bowl of Kashmir & Niagara of the Valley',
    division: 'Kashmir Valley',
    listingsCount: 12,
    rating: 4.8,
    reviewsCount: 1670,
    startingPrice: 6900,
    duration: '2 - 3 Days',
    durationCategory: '1-3',
    travelTypes: ['Nature & Alpine Lakes', 'Adventure & High Passes', 'Offbeat & Camping'],
    budgetTier: 'budget',
    bestSeason: 'April – October (Rushing water cascades & pleasant weather)',
    altitude: '1,739 m to 3,962 m (Kousarnag Lake)',
    image: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=1200&q=80',
    shortDescription: 'Thunderous Aharbal Waterfall, alpine high-altitude Kousarnag lake, and lush Chiranbal meadows.',
    overview: 'Kulgam is famed for dramatic water cascades and glacial trails. Aharbal falls thunder through deep volcanic gorges, while the high-altitude glacial lake of Kousarnag attracts trekking enthusiasts.',
    touristPlaces: [
      {
        name: 'Aharbal Waterfall',
        pinCode: '192303',
        category: 'Must-Visit',
        description: 'A highly powerful, roaring waterfall formed as the Veshav River plunges down a narrow volcanic granite chasm.',
        speciality: "Universally crowned as the 'Niagara Falls of Kashmir' due to the intense volume and force of its plunging waters.",
        image: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Kousarnag Alpine Lake',
        pinCode: '192303',
        category: 'Lake & Nature',
        description: 'A large, high-altitude alpine lake locked between frozen mountain peaks in the Pir Panjal range.',
        speciality: 'Spans nearly 3 kilometers in length at 11,500 feet; highly sacred and a magnet for hardcore wilderness trekkers.',
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Chiranbal Meadows',
        pinCode: '192303',
        category: 'Scenic View',
        description: 'A massive, multi-tiered twin pasture land step flanked by thick conifer belts.',
        speciality: 'One of the widest single continuous meadow expanses in South Kashmir, ideal for large wild camping setups.',
        image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Vasaknag Spring',
        pinCode: '192301',
        category: 'Lake & Nature',
        description: 'A unique, natural freshwater limestone spring located in Waltengoo village.',
        speciality: 'Features a unique seasonal cycle where the water completely dries up in winter and spontaneously flows at full force in summer.',
        image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Panchanpathri Eco Spot',
        pinCode: '192302',
        category: 'Offbeat & Camping',
        description: 'A newly mapped, small riverside eco-tourism picnic clearing inside dense mountain woods.',
        speciality: 'A highly peaceful, lesser-known micro spot perfect for travelers looking to sit by clear mountain brooks away from crowds.',
        image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80'
      }
    ],
    coordinates: [75.0167, 33.6444],
    popularKey: 'aharbal'
  },

  // 8. PULWAMA
  {
    id: 'pulwama',
    district: 'Pulwama (Pampore)',
    tagline: 'Saffron Capital & Archaeological Wonders',
    division: 'Kashmir Valley',
    listingsCount: 11,
    rating: 4.6,
    reviewsCount: 1290,
    startingPrice: 6500,
    duration: '1 - 2 Days',
    durationCategory: '1-3',
    travelTypes: ['Heritage & Mughal Architecture', 'Nature & Alpine Lakes'],
    budgetTier: 'budget',
    bestSeason: 'October – November (Saffron harvest blooms in purple)',
    altitude: '1,630 m (5,350 ft)',
    image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80',
    shortDescription: 'Purple blooming Pampore saffron plateaus, Avantishwar Temple ruins, and Shikargah pine hills.',
    overview: 'Pulwama is globally famous as Kashmir’s Saffron Bowl. In late autumn, Pampore transforms into a breathtaking purple expanse of blooming saffron crocuses, paired with 9th-century temple ruins.',
    touristPlaces: [
      {
        name: 'Pampore Saffron Fields',
        pinCode: '192121',
        category: 'Must-Visit',
        description: 'Vast, flat architectural agricultural plateaus dedicated entirely to ancient saffron bulb cultivation.',
        speciality: 'One of the few places globally producing top-grade Kashmiri Saffron (Lacha/Mogra); turns into a purple blanket in autumn.',
        image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Avantishwar Temple Ruins',
        pinCode: '192121',
        category: 'Heritage',
        description: 'Imposing 9th-century stone temple ruins constructed by King Avantivarman along the Jhelum banks.',
        speciality: 'Showcases highly intricate classical stone relief carvings detailing ancient socio-religious history.',
        image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Shikargah Tral',
        pinCode: '192123',
        category: 'Offbeat & Camping',
        description: 'A historic, forested valley clearing surrounded by high pine ridges.',
        speciality: 'Originally the private royal hunting retreat of the last Maharaja rulers of Jammu & Kashmir.',
        image: 'https://images.unsplash.com/photo-1518457607834-6e8d80c183c5?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Aripal Village Spring',
        pinCode: '192123',
        category: 'Lake & Nature',
        description: 'A small, pristine natural freshwater basin spring located inside an offbeat rural pocket.',
        speciality: 'Produces crystal clear, ice-cold mineral water that feeds the local agricultural canal loops.',
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80'
      }
    ],
    coordinates: [74.9000, 33.8700],
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
    travelTypes: ['Adventure & High Passes', 'Nature & Alpine Lakes', 'Offbeat & Camping'],
    budgetTier: 'budget',
    bestSeason: 'June – October (Mughal Road open & crisp mountain passes)',
    altitude: '2,146 m (Town) to 3,490 m (Peer Ki Gali)',
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80',
    shortDescription: 'High-altitude Peer Ki Gali pass on historic Mughal Road, Hirpora wildlife, and apple orchards.',
    overview: 'Shopian produces the highest quality apples in the subcontinent and guards the historic Mughal Road that emperors Akbar and Jahangir traveled. Peer Ki Gali pass is its crowning panoramic jewel.',
    touristPlaces: [
      {
        name: 'Peer Ki Gali',
        pinCode: '192303',
        category: 'Must-Visit',
        description: 'The highest point along the historic Mughal Road pass, sitting at an elevation of 11,400 feet.',
        speciality: 'Houses the ancient, highly revered shrine of Sufi saint Peer Sheikh Ahmad Karim amidst grand mountain valleys.',
        image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Hirpora Wildlife Sanctuary',
        pinCode: '192303',
        category: 'Offbeat & Camping',
        description: 'A rugged mountain bio-reserve protecting critical alpine forest zones.',
        speciality: 'The critical, primary sanctuary protecting the remaining populations of the rare Markhor (giant horned mountain goat).',
        image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Dubjan Forest Glade',
        pinCode: '192303',
        category: 'Scenic View',
        description: 'A quiet, deep forest pine clearing located along the initial steps of the Mughal Road climb.',
        speciality: "Frequently called 'Mini Gulmarg' due to its lush sloping layout and presence of cool mountain stream crossings.",
        image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Peer Marg Meadow',
        pinCode: '192303',
        category: 'Scenic View',
        description: 'A vast, high-altitude offbeat meadow platform close to the mountain pass summit.',
        speciality: 'Offers sweeping, dramatic aerial views over the deep stone valleys and incoming historical tracks.',
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80'
      }
    ],
    coordinates: [74.8300, 33.7200],
    popularKey: 'shopian'
  },

  // 10. BANDIPORA
  {
    id: 'bandipora',
    district: 'Bandipora (Gurez Valley)',
    tagline: 'Crown of the North & Dard-Shin Heritage',
    division: 'Kashmir Valley',
    listingsCount: 15,
    rating: 4.9,
    reviewsCount: 2150,
    startingPrice: 9500,
    duration: '3 - 5 Days',
    durationCategory: '4-7',
    travelTypes: ['Offbeat & Camping', 'Adventure & High Passes', 'Nature & Alpine Lakes'],
    budgetTier: 'mid',
    bestSeason: 'June – September (Razdan Pass snow-free & lush wildflowers)',
    altitude: '2,400 m (Gurez) to 3,557 m (Razdan Pass)',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    shortDescription: 'Untouched Gurez Valley along Kishanganga, pyramidal Habba Khatoon Peak, and Razdan Pass.',
    overview: 'Bandipora is home to Gurez Valley, one of the most pristine and remote Himalayan wonderlands on earth. Flanked by the turquoise Kishanganga River and the legendary Habba Khatoon mountain.',
    touristPlaces: [
      {
        name: 'Gurez Valley - Dawar',
        pinCode: '193503',
        category: 'Must-Visit',
        description: 'A stunning, deep mountain valley basin locked behind the high ridge loops of the Razdan Pass.',
        speciality: 'Home to the unique Dard-Shin tribal community preserving ancient dialects; features unique traditional log architecture.',
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Habba Khatoon Peak',
        pinCode: '193503',
        category: 'Scenic View',
        description: 'A majestic, pyramid-shaped mountain peak towering over the main valley layout of Dawar.',
        speciality: 'Named directly after the iconic 16th-century Kashmiri poetess-queen; changes visual color tones under distinct sunlight angles.',
        image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Razdan Pass',
        pinCode: '193503',
        category: 'Adventure',
        description: 'A thrilling, high-altitude mountain highway pass sitting at 11,672 feet elevation.',
        speciality: 'The only highway entry point to Gurez, offering dramatic 360-degree aerial views over deep gorges.',
        image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Tulail Valley',
        pinCode: '193503',
        category: 'Offbeat & Camping',
        description: 'A deeply remote, narrow sub-valley stretching past Dawar along the roaring Kishanganga River.',
        speciality: 'Features absolute raw isolation, traditional mud-and-wood homes, and untouched mountain landscapes.',
        image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Athwatoo Eco-Spot',
        pinCode: '193502',
        category: 'Offbeat & Camping',
        description: 'A small, offbeat stream-side mountain hamlet surrounded by thick walnut and pine trees.',
        speciality: 'Offers highly active mountain torrents perfect for quiet nature camping and trout spotting away from mass tourism lanes.',
        image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80'
      }
    ],
    coordinates: [74.6500, 34.6000],
    popularKey: 'gurez'
  },

  // 11. JAMMU
  {
    id: 'jammu',
    district: 'Jammu (City of Temples)',
    tagline: 'Winter Capital & Spiritual Gateway of J&K',
    division: 'Jammu Division',
    listingsCount: 20,
    rating: 4.7,
    reviewsCount: 3200,
    startingPrice: 6200,
    duration: '2 - 3 Days',
    durationCategory: '1-3',
    travelTypes: ['Sacred Pilgrimage & Temples', 'Heritage & Mughal Architecture', 'Family & Leisure'],
    budgetTier: 'budget',
    bestSeason: 'October – March (Mild, pleasant winter weather)',
    altitude: '327 m (1,073 ft)',
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80',
    shortDescription: 'Historic Bahu Fort on River Tawi, French chateau Amar Mahal, and golden Raghunath Temple.',
    overview: 'Jammu is the vibrant cultural capital of the plains and foothills. Renowned as the City of Temples, it features ancient fortresses overlooking River Tawi, ornate Dogra royal palaces, and sacred cave shrines.',
    touristPlaces: [
      {
        name: 'Bahu Fort & Bagh-e-Bahu',
        pinCode: '180006',
        category: 'Heritage',
        description: 'An imposing, ~3,000-year-old stone fortress positioned on a high cliff over the Tavi River.',
        speciality: 'Houses the highly sacred Bawe Wali Mata temple inside, paired with an underground fish-shaped mega aquarium below.',
        image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Mubarak Mandi Palace',
        pinCode: '180001',
        category: 'Heritage',
        description: 'The majestic former royal palace seat of the Dogra dynasty rulers.',
        speciality: 'Showcases a rare, complex blend of European Baroque, Mughal courtly, and traditional Rajasthani architectural styles.',
        image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Amar Mahal Palace Museum',
        pinCode: '180001',
        category: 'Heritage',
        description: 'A grand golden-brick palace styled like a French Chateau built over rolling river views.',
        speciality: 'Preserves a massive 120-kilogram solid gold royal throne and rare historical Kangra/Pahari miniature artwork.',
        image: 'https://images.unsplash.com/photo-1566438480900-0609be27a4be?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Raghunath Temple Complex',
        pinCode: '180001',
        category: 'Spiritual',
        description: 'A massive, central seven-shrine temple complex commissioned by Maharaja Gulab Singh.',
        speciality: 'Interior walls are completely gold-plated and house lakhs of sacred Saligrams within dedicated temple layouts.',
        image: 'https://images.unsplash.com/photo-1590073844006-33379778ae09?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Peer Kho Cave Temple',
        pinCode: '180001',
        category: 'Spiritual',
        description: 'An ancient, natural limestone cave temple dedicated to Lord Shiva along the river banks.',
        speciality: 'Recognized as the historic meditation cavern of Jamvant (the legendary bear character from Ramayana lore).',
        image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Akhnoor Fort & Jio Pota Ghat',
        pinCode: '181201',
        category: 'Heritage',
        description: 'A massive brick fortress perched over the wide, roaring channel of the Chenab River.',
        speciality: 'The exact site where Maharaja Ranjit Singh performed the royal coronation of Gulab Singh as King of Jammu in 1822 AD.',
        image: 'https://images.unsplash.com/photo-1518457607834-6e8d80c183c5?auto=format&fit=crop&w=600&q=80'
      }
    ],
    coordinates: [74.8723, 32.7266],
    popularKey: 'jammu'
  },

  // 12. REASI
  {
    id: 'reasi',
    district: 'Reasi (Vaishno Devi & Shiv Khori)',
    tagline: 'Divine Abode of Maa Vaishno Devi & Chenab Rail Bridge',
    division: 'Jammu Division',
    listingsCount: 25,
    rating: 4.9,
    reviewsCount: 5200,
    startingPrice: 6500,
    duration: '2 - 4 Days',
    durationCategory: '1-3',
    travelTypes: ['Sacred Pilgrimage & Temples', 'Adventure & High Passes', 'Family & Leisure'],
    budgetTier: 'budget',
    bestSeason: 'Year-Round (Pilgrimage peak: Navratri, Summer, & Winters)',
    altitude: '754 m (Katra) to 1,585 m (Bhavan)',
    image: 'https://images.unsplash.com/photo-1566438480900-0609be27a4be?auto=format&fit=crop&w=1200&q=80',
    shortDescription: 'Shri Mata Vaishno Devi holy cave shrine, mystical Shiv Khori stalagmite, and Salal Dam.',
    overview: 'Reasi is one of the most sacred pilgrimage destinations in India, hosting millions of pilgrims visiting Shri Mata Vaishno Devi shrine in Katra and the mystical limestone stalagmites of Shiv Khori.',
    touristPlaces: [
      {
        name: 'Mata Vaishno Devi Shrine - Katra',
        pinCode: '182301',
        category: 'Must-Visit',
        description: 'One of India’s single most visited holy mountain cave shrines, tucked inside the Trikuta range.',
        speciality: 'Pilgrims trek uphill to view the natural, self-formed rock Pindis representing Maha Kali, Maha Lakshmi, and Maha Saraswati.',
        image: 'https://images.unsplash.com/photo-1566438480900-0609be27a4be?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Shiv Khori Cave',
        pinCode: '185203',
        category: 'Spiritual',
        description: 'A stunning, half-kilometer-long natural limestone cave configuration in Ransoo.',
        speciality: 'Houses a 4-foot-tall natural stalagmite structure shaped perfectly like a Shivling, with milky water dripping from the ceiling.',
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Bhimargarh Fort Reasi',
        pinCode: '182311',
        category: 'Heritage',
        description: 'A strategic defensive stone fort fort fortification built on a high hillock by Raja Bhim Dev.',
        speciality: 'Features giant storage reservoirs, massive stone entry gates, and served as the royal treasury shelter during crises.',
        image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Baba Dhansar Spring',
        pinCode: '182301',
        category: 'Spiritual',
        description: 'A highly sacred forest oasis where fresh water gushes out of a mossy hillside into an emerald pond.',
        speciality: 'The natural spring water drops consistently over a small, completely natural stone Shivling inside a grove.',
        image: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Salal Dam View',
        pinCode: '182312',
        category: 'Scenic View',
        description: 'A massive rock-fill hydroelectric dam configuration built across the fast-flowing Chenab River loops.',
        speciality: 'A prime engineering site giving dramatic views of raw industrial design locked between giant mountain walls.',
        image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=600&q=80'
      }
    ],
    coordinates: [74.8300, 33.0800],
    popularKey: 'vaishnodevi'
  },

  // 13. UDHAMPUR
  {
    id: 'udhampur',
    district: 'Udhampur (Patnitop)',
    tagline: 'Pine-Clad Plateaus & Pandava Heritage Temples',
    division: 'Jammu Division',
    listingsCount: 18,
    rating: 4.8,
    reviewsCount: 2840,
    startingPrice: 6800,
    duration: '2 - 3 Days',
    durationCategory: '1-3',
    travelTypes: ['Snow & Winter Sports', 'Nature & Alpine Lakes', 'Family & Leisure', 'Heritage & Mughal Architecture'],
    budgetTier: 'budget',
    bestSeason: 'Year-Round (Summer hill resort, Winter snowfall)',
    altitude: '2,024 m (6,640 ft) at Patnitop',
    image: 'https://images.unsplash.com/photo-1518457607834-6e8d80c183c5?auto=format&fit=crop&w=1200&q=80',
    shortDescription: 'Patnitop Skyview cable car ropeway, paragliding at Nathatop, Krimchi Pandava temples, and Sudhmahadev.',
    overview: 'Udhampur is the highland escape of Jammu region. Centered around the picturesque deodar-shaded plateau of Patnitop, it features paragliding slopes at Nathatop, and ancient Nagara temples at Krimchi.',
    touristPlaces: [
      {
        name: 'Patnitop Hill Station',
        pinCode: '182142',
        category: 'Must-Visit',
        description: 'A popular alpine hill resort plateau covered in towering pine and deodar forests.',
        speciality: 'Offers winter ski training slopes, a modern high-altitude ropeway system (Skyview), and crisp summer weather.',
        image: 'https://images.unsplash.com/photo-1518457607834-6e8d80c183c5?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Nathatop Viewpoint',
        pinCode: '182142',
        category: 'Adventure',
        description: 'A high, wind-swept mountain ridge clearing located a short drive past Patnitop.',
        speciality: 'The premier hub for mountain paragliding activities, giving clear views of snow-clad Himalayan peaks.',
        image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Krimchi Pandava Temples',
        pinCode: '182121',
        category: 'Heritage',
        description: 'A historical group of seven stone structural temples dating between the 8th and 11th centuries AD.',
        speciality: 'Built in the classical Nagara architectural style resembling Odisha temples, locally linked to Pandava legends.',
        image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Sudhmahadev Temple',
        pinCode: '182142',
        category: 'Spiritual',
        description: 'A highly sacred Shiva temple holding deep historical and mythological roots.',
        speciality: 'Houses the broken segments of an ancient, sacred iron trident belonging to Lord Shiva according to local faith.',
        image: 'https://images.unsplash.com/photo-1566438480900-0609be27a4be?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Mantalai',
        pinCode: '182142',
        category: 'Spiritual',
        description: 'A peaceful forest clearing centered around a small temple tank structure.',
        speciality: 'Universally revered by devotees as the exact geographical spot where Lord Shiva married Goddess Parvati.',
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Ramnagar Fort',
        pinCode: '182122',
        category: 'Heritage',
        description: 'A large stone fortification constructed under the orders of Raja Suchet Singh.',
        speciality: 'Surrounded by deep defensive trenches, featuring ancient interior court murals showing royal history.',
        image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=600&q=80'
      }
    ],
    coordinates: [75.0000, 32.9300],
    popularKey: 'patnitop'
  },

  // 14. KATHUA
  {
    id: 'kathua',
    district: 'Kathua (Basohli & Atal Setu)',
    tagline: 'Cradle of Miniature Art & Majestic Water Sports',
    division: 'Jammu Division',
    listingsCount: 12,
    rating: 4.6,
    reviewsCount: 1180,
    startingPrice: 5900,
    duration: '1 - 2 Days',
    durationCategory: '1-3',
    travelTypes: ['Nature & Alpine Lakes', 'Heritage & Mughal Architecture', 'Offbeat & Camping'],
    budgetTier: 'budget',
    bestSeason: 'October – April (Pleasant waterside weather)',
    altitude: '307 m to 1,800 m (Bani)',
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80',
    shortDescription: 'Ranjit Sagar Dam lake in Basohli, iconic Atal Setu cable bridge, and Sukrala Mata temple.',
    overview: 'Kathua borders Punjab and Himachal, celebrated for the world-famous Basohli miniature painting heritage, thrilling water sports at Ranjit Sagar Dam, the cable-stayed Atal Setu bridge, and the serene hill haven of Bani Valley.',
    touristPlaces: [
      {
        name: 'Basohli & Atal Setu',
        pinCode: '184201',
        category: 'Must-Visit',
        description: 'A historic arts town repositioned on the edge of the massive Ranjit Sagar Dam lake basin.',
        speciality: 'Home to the world-famous Basohli Miniature Painting style and the 592-meter Atal Setu, a premium cable-stayed bridge.',
        image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Jasrota Wildlife Sanctuary',
        pinCode: '184144',
        category: 'Offbeat & Camping',
        description: 'A nature reserve spreading over the old palace ruins of the ancient Jasrota kingdom.',
        speciality: 'Offers a mix of historical stone masonry walls buried inside dense bamboo and cheetal deer habitats.',
        image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Sukrala Mata Temple',
        pinCode: '184202',
        category: 'Spiritual',
        description: 'A highly popular hill temple perched on a rocky mountaintop clearing.',
        speciality: 'Houses a unique self-manifested stone slab image of the multi-armed Goddess Sukrala (a form of Sharda).',
        image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Bani Valley',
        pinCode: '184206',
        category: 'Scenic View',
        description: 'A stunning, low-altitude mountain glade surrounded by dense oak and conifer groves.',
        speciality: "Known as the 'Mini Gulmarg of Kathua', serving as a gateway to high mountain pass treks to Bhaderwah.",
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80'
      }
    ],
    coordinates: [75.5200, 32.3700],
    popularKey: 'basohli'
  },

  // 15. SAMBA
  {
    id: 'samba',
    district: 'Samba (Mansar Lake)',
    tagline: 'Sacred Serpent Lakes & Land of Brave Warriors',
    division: 'Jammu Division',
    listingsCount: 9,
    rating: 4.5,
    reviewsCount: 980,
    startingPrice: 5500,
    duration: '1 - 2 Days',
    durationCategory: '1-3',
    travelTypes: ['Nature & Alpine Lakes', 'Sacred Pilgrimage & Temples', 'Family & Leisure'],
    budgetTier: 'budget',
    bestSeason: 'October – March (Mild, pleasant weather for boating & temple walks)',
    altitude: '384 m (1,260 ft)',
    image: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=1200&q=80',
    shortDescription: 'Sacred Mansar Lake boating and flora, historic Purmandal temple complex, and Samba Fort.',
    overview: 'Samba is steeped in martial Rajput tradition and sacred folklore. Forest-fringed Mansar Lake is an important religious and eco-tourism spot, while Purmandal is revered as Chhota Kashi.',
    touristPlaces: [
      {
        name: 'Mansar Lake',
        pinCode: '184121',
        category: 'Must-Visit',
        description: 'A beautiful, forest-fringed natural lake holding deep sacred significance.',
        speciality: 'Circled by shrines dedicated to the Serpent God Sheshnag; a core site for ritual circumambulations by newlyweds.',
        image: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Purmandal Temple Complex',
        pinCode: '181141',
        category: 'Spiritual',
        description: 'An ancient stone Shiva temple complex constructed on the sandbeds of the Devika River.',
        speciality: "Known as 'Chhota Kashi', where water springs appear out of the dry river sand beds to wash rock lingams.",
        image: 'https://images.unsplash.com/photo-1566438480900-0609be27a4be?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Utterbehani',
        pinCode: '181141',
        category: 'Spiritual',
        description: 'A prominent religious site located a few kilometers further along the sacred Devika river channel.',
        speciality: 'Unique because the holy river flows backwards northwards (Uttar vahini) here, featuring grand bathing ghats.',
        image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Samba Fort Ruins',
        pinCode: '184121',
        category: 'Heritage',
        description: 'An old brick-and-mud fortress outpost dating back to early defensive Dogra deployments.',
        speciality: 'Offers an offbeat look at traditional frontier defense layouts overlooking the old town markets.',
        image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=600&q=80'
      }
    ],
    coordinates: [75.1200, 32.5700],
    popularKey: 'mansar'
  },

  // 16. DODA
  {
    id: 'doda',
    district: 'Doda (Bhaderwah Valley)',
    tagline: 'Mini Kashmir & Land of Nagas',
    division: 'Jammu Division',
    listingsCount: 15,
    rating: 4.8,
    reviewsCount: 1840,
    startingPrice: 7500,
    duration: '2 - 4 Days',
    durationCategory: '1-3',
    travelTypes: ['Nature & Alpine Lakes', 'Adventure & High Passes', 'Offbeat & Camping'],
    budgetTier: 'budget',
    bestSeason: 'April – October (Lush green valleys), Dec – Feb (Snow sledging)',
    altitude: '1,613 m (Bhaderwah) to 3,200 m (Padri Pass)',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
    shortDescription: 'Picturesque Bhaderwah, Jai Valley eco-resorts, Padri Pass snow sports, and Lal Draman.',
    overview: 'Doda boasts Bhaderwah, celebrated as "Chhota Kashmir" for its sweeping alpine meadows, bubbling streams, and ancient Naga temples. High passes like Padri connect it directly with Himachal Pradesh.',
    touristPlaces: [
      {
        name: 'Bhaderwah Valley',
        pinCode: '182222',
        category: 'Must-Visit',
        description: "A spectacular, wide mountain valley basin universally hailed as 'Mini Kashmir'.",
        speciality: 'Famous for its distinct cultural identity, vast apple orchards, and continuous cooling mountain air streams.',
        image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Jai Valley',
        pinCode: '182222',
        category: 'Scenic View',
        description: 'A stunning, 30-kilometer-long green meadow trough cut by a winding mountain stream.',
        speciality: 'Features unique dome-shaped eco-igloo camping structures and exceptional open horse-riding turf tracks.',
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Padri Pass',
        pinCode: '182222',
        category: 'Adventure',
        description: 'A high mountain highway pass standing at an altitude of 10,500 feet on the Himachal border line.',
        speciality: 'Covered under massive sheets of packed snow until mid-summer; the premier regional hub for snow-sledging.',
        image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Chinta Valley',
        pinCode: '182222',
        category: 'Scenic View',
        description: 'A peaceful, high-altitude sub-valley meadow surrounded completely by thick conifer walls.',
        speciality: 'Famous for horse trails and ancient mountain points giving views over deep inner valleys.',
        image: 'https://images.unsplash.com/photo-1518457607834-6e8d80c183c5?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Lal Draman Meadow',
        pinCode: '182202',
        category: 'Offbeat & Camping',
        description: 'A beautiful, offbeat high-altitude meadow platform located near Doda town.',
        speciality: 'Totally hidden from commercial crowds, offering pristine scenic camping grounds inside fir forests.',
        image: 'https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?auto=format&fit=crop&w=600&q=80'
      }
    ],
    coordinates: [75.5300, 33.1500],
    popularKey: 'bhaderwah'
  },

  // 17. KISHTWAR
  {
    id: 'kishtwar',
    district: 'Kishtwar (Land of Saffron & Sapphire)',
    tagline: 'Himalayan National Park & Sacred Machail Yatra',
    division: 'Jammu Division',
    listingsCount: 11,
    rating: 4.7,
    reviewsCount: 1120,
    startingPrice: 8200,
    duration: '2 - 4 Days',
    durationCategory: '1-3',
    travelTypes: ['Adventure & High Passes', 'Sacred Pilgrimage & Temples', 'Offbeat & Camping'],
    budgetTier: 'budget',
    bestSeason: 'May – October (Trekking season & Machail Yatra)',
    altitude: '1,638 m to 6,000 m (High Himalayan Peaks)',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    shortDescription: 'High-altitude Kishtwar National Park, Machail Mata shrine pilgrimage, and Chowgan plateau.',
    overview: 'Kishtwar is a rugged Himalayan territory renowned for sapphire mines, saffron plateaus, high-altitude national parks protecting snow leopards, and the arduous pilgrimage to Machail Mata.',
    touristPlaces: [
      {
        name: 'Kishtwar National Park',
        pinCode: '182204',
        category: 'Must-Visit',
        description: 'A massive, high-altitude wildlife reserve protecting rugged Himalayan slopes and glaciers.',
        speciality: 'A vital global sanctuary preserving endangered snow leopards, musk deer, and rare Himalayan black bears.',
        image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Chowgan Grounds',
        pinCode: '182204',
        category: 'Scenic View',
        description: 'A massive, natural flat pasture field stretching right in the center of Kishtwar town.',
        speciality: 'One of the largest natural urban clearings in the hills, serving as the cultural and sporting hub for the entire district.',
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Machail Mata Shrine',
        pinCode: '182204',
        category: 'Spiritual',
        description: 'A deeply remote, sacred temple dedicated to Goddess Chandi hidden inside the Paddar Valley.',
        speciality: "Centers around the famous annual 'Machail Yatra' foot pilgrimage through tough mountain canyons.",
        image: 'https://images.unsplash.com/photo-1566438480900-0609be27a4be?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Sarthal Devi Temple',
        pinCode: '182204',
        category: 'Spiritual',
        description: 'A hilltop cave temple housing an ancient eighteen-armed idol of the Goddess.',
        speciality: 'Reached via spectacular scenic paths over winding mountain drops, holding deep local spiritual heritage.',
        image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80'
      }
    ],
    coordinates: [75.7700, 33.3200],
    popularKey: 'kishtwar'
  },

  // 18. RAMBAN
  {
    id: 'ramban',
    district: 'Ramban (Sanasar & Chenab Gorge)',
    tagline: 'Adventure Hub of Jammu & Engineering Wonders',
    division: 'Jammu Division',
    listingsCount: 13,
    rating: 4.6,
    reviewsCount: 1340,
    startingPrice: 6600,
    duration: '2 - 3 Days',
    durationCategory: '1-3',
    travelTypes: ['Adventure & High Passes', 'Nature & Alpine Lakes', 'Offbeat & Camping'],
    budgetTier: 'budget',
    bestSeason: 'April – October (Paragliding & camping)',
    altitude: '1,156 m (Ramban) to 2,050 m (Sanasar)',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    shortDescription: 'Sanasar cup-shaped meadow adventure hub, paragliding, Baglihar Dam, and Tata Pani springs.',
    overview: 'Ramban bridges Jammu with the Kashmir Valley along the roaring Chenab River gorge. Sanasar offers exhilarating adventure sports like paragliding and camping, while Baglihar Dam showcases engineering prowess.',
    touristPlaces: [
      {
        name: 'Sanasar Meadows',
        pinCode: '182142',
        category: 'Must-Visit',
        description: 'A small, cup-shaped twin meadow clearing named after local lake basins.',
        speciality: 'The adventure playground of the region, popular for paragliding, hot-air ballooning, and wilderness camping setups.',
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Baglihar Dam View',
        pinCode: '182144',
        category: 'Scenic View',
        description: 'A towering, massive concrete gravity mega-dam engineered across the roaring Chenab gorge.',
        speciality: 'Offers an incredible visual display of modern civil engineering structural force locked inside deep canyons.',
        image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Pogal Paristan Valley',
        pinCode: '182144',
        category: 'Offbeat & Camping',
        description: 'A hidden twin-valley canyon route lined by traditional rustic wooden homes and terraced farms.',
        speciality: 'Deeply isolated offbeat area featuring pure, uncommercialized mountain village walks and cascading streams.',
        image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Tata Pani Hot Spring',
        pinCode: '182143',
        category: 'Lake & Nature',
        description: 'A natural, sulfur-rich geothermal hot spring pool located in Sangaldan.',
        speciality: 'High medicinal and therapeutic value, attracting thousands looking to cure skin and joint ailments.',
        image: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=600&q=80'
      }
    ],
    coordinates: [75.2400, 33.2400],
    popularKey: 'sanasar'
  },

  // 19. RAJOURI
  {
    id: 'rajouri',
    district: 'Rajouri (Imperial Mughal Road)',
    tagline: 'Land of Kings & Historic Caravanserais',
    division: 'Jammu Division',
    listingsCount: 14,
    rating: 4.7,
    reviewsCount: 1480,
    startingPrice: 6700,
    duration: '2 - 3 Days',
    durationCategory: '1-3',
    travelTypes: ['Heritage & Mughal Architecture', 'Adventure & High Passes', 'Sacred Pilgrimage & Temples'],
    budgetTier: 'budget',
    bestSeason: 'October – May (Pleasant valleys & winter snow at DKG)',
    altitude: '915 m (Rajouri) to 2,000 m (Dehra Ki Gali)',
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80',
    shortDescription: 'Historic Chingus Fort, Dehra Ki Gali mountain pass, and revered Shahdra Sharief Shrine.',
    overview: 'Rajouri has been an imperial transit corridor since the Mughal era. It features historical caravanserai forts like Chingus, the scenic pass of Dehra Ki Gali, and the revered Sufi shrine of Baba Ghulam Shah Badshah.',
    touristPlaces: [
      {
        name: 'Chingus Fort',
        pinCode: '185151',
        category: 'Heritage',
        description: 'A 16th-century walled Mughal transit inn fortification along the old imperial route.',
        speciality: 'The exact historical site where Emperor Jahangir’s internal organs were entombed in 1627 AD to preserve his body.',
        image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Dehra Ki Gali / DKG',
        pinCode: '185132',
        category: 'Adventure',
        description: 'A spectacular, high-altitude mountain highway pass cutting through thick pine forests.',
        speciality: 'Experiences intense winter snow transformations, serving as a scenic high-altitude viewing platform.',
        image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Shahdra Sharief Shrine',
        pinCode: '185135',
        category: 'Spiritual',
        description: 'A highly revered, grand hilltop Sufi shrine dating back to the 19th century.',
        speciality: 'Dedicated to Baba Ghulam Shah Badshah, visited by millions across distinct religious faiths seeking blessings.',
        image: 'https://images.unsplash.com/photo-1566438480900-0609be27a4be?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Thannamandi Town',
        pinCode: '185133',
        category: 'Heritage',
        description: 'An old, climate-cooled transit town used historically by Mughal entourages.',
        speciality: 'Famous for traditional wooden handicrafts, artistic furniture carving blocks, and cool mountain weather.',
        image: 'https://images.unsplash.com/photo-1518457607834-6e8d80c183c5?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Mangladevi Fort Ruins',
        pinCode: '185151',
        category: 'Heritage',
        description: 'A hilltop defensive fort fortification framework offering birds-eye views over border ridges.',
        speciality: 'An offbeat military outpost architectural ruin reflecting old regional defensive setups.',
        image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80'
      }
    ],
    coordinates: [74.3000, 33.3800],
    popularKey: 'rajouri'
  },

  // 20. POONCH
  {
    id: 'poonch',
    district: 'Poonch (Border Haven & Waterfalls)',
    tagline: 'Mini Switzerland of Jammu & Historic Border Forts',
    division: 'Jammu Division',
    listingsCount: 13,
    rating: 4.7,
    reviewsCount: 1390,
    startingPrice: 6900,
    duration: '2 - 4 Days',
    durationCategory: '1-3',
    travelTypes: ['Nature & Alpine Lakes', 'Heritage & Mughal Architecture', 'Sacred Pilgrimage & Temples', 'Offbeat & Camping'],
    budgetTier: 'budget',
    bestSeason: 'April – October (Rushing waterfalls & lush green valleys)',
    altitude: '981 m (Poonch) to 3,000 m (Pir Panjal ridges)',
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80',
    shortDescription: 'Grand Poonch Fort castle, cascading Noori Chamb waterfall, and Swami Buddha Amarnath.',
    overview: 'Poonch is a verdant border district encircled by the Pir Panjal mountains. It is famous for the grand 16th-century Poonch Fort, royal Mughal waterfall Noori Chamb, Loran valley, and Swami Buddha Amarnath temple.',
    touristPlaces: [
      {
        name: 'Poonch Fort Complex',
        pinCode: '185101',
        category: 'Heritage',
        description: 'A massive, grand castle fortification complex initiated in 1596 AD by Raja Rustam Khan.',
        speciality: 'Showcases an elegant, mixed architectural blend of Sikh courtly style and Dogra palace expansions.',
        image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Noori Chamb Waterfall',
        pinCode: '185102',
        category: 'Must-Visit',
        description: 'A historic, powerful natural waterfall cascade dropping down a smooth rock wall face.',
        speciality: 'Named directly after Mughal Empress Nur Jahan, who routinely used this specific pool for royal traveling baths.',
        image: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Swami Buddha Amarnath Temple',
        pinCode: '185102',
        category: 'Spiritual',
        description: 'An ancient stone temple located right on the banks of the Pulast River in Mandi.',
        speciality: 'Houses a unique, natural white stone Shivling, hosting the massive annual Buddha Amarnath Yatra.',
        image: 'https://images.unsplash.com/photo-1566438480900-0609be27a4be?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Loran Valley',
        pinCode: '185102',
        category: 'Scenic View',
        description: 'A beautiful, deep green alpine valley basin stretching right up to the foot of high border ridges.',
        speciality: 'Intersected by numerous clear rushing glacial torrents, offering absolute rustic isolation.',
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Nandishool Waterfall',
        pinCode: '185102',
        category: 'Lake & Nature',
        description: 'A spectacular, 150-foot-tall natural mountain water drop hidden deep inside the Loran forest lanes.',
        speciality: 'A completely raw, uncommercialized micro spot providing crystal-clear cold pools below giant conifer canopies.',
        image: 'https://images.unsplash.com/photo-1518457607834-6e8d80c183c5?auto=format&fit=crop&w=600&q=80'
      }
    ],
    coordinates: [74.1000, 33.7700],
    popularKey: 'poonch'
  }
];
