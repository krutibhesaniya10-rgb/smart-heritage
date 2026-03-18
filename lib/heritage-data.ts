// ============================================================
//  Master Heritage Places Dataset — Gujarat & Rajasthan
//  20 curated sites with accurate coordinates and full metadata
// ============================================================

export interface HeritagePlace {
  id: string
  name: string
  state: string          // "Gujarat" | "Rajasthan"
  city: string           // city / district
  image: string
  images: string[]       // gallery
  panorama?: string      // Mapillary 360 embed URL
  panoImage?: string     // High-res equirectangular 360 JPEG
  duration: string       // recommended visit duration
  entryFee: string
  timings: string
  bestTime: string       // e.g. "October – March"
  lat: number
  lng: number
  /** @deprecated use state */
  region: string         // kept for backward-compat
  category: string       // Fort | Temple | Stepwell | …
  rating: number
  description: string
  history: string
  recommendations?: NearbyRecommendation[]
}

// ─────────────────────────────────────────────────────────────
//  GUJARAT — 10 places
// ─────────────────────────────────────────────────────────────
const gujaratPlaces: HeritagePlace[] = [
  {
    id: "g1",
    name: "Rani ki Vav",
    state: "Gujarat",
    city: "Patan",
    region: "Gujarat",
    category: "Stepwell",
    image: "https://images.unsplash.com/photo-1687109168178-7a8dfae7ccce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8UmFuaSUyMGtpJTIwVmF2JTIwUGF0YW4lMjBzdGVwd2VsbHxlbnwwfHx8fDE3NzM3NTI4NDN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    images: ["https://images.unsplash.com/photo-1687109168178-7a8dfae7ccce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8UmFuaSUyMGtpJTIwVmF2JTIwUGF0YW4lMjBzdGVwd2VsbHxlbnwwfHx8fDE3NzM3NTI4NDN8MA&ixlib=rb-4.1.0&q=80&w=1080", "https://images.unsplash.com/photo-1708172143882-fc766c585320?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8Mnx8UmFuaSUyMGtpJTIwVmF2JTIwUGF0YW4lMjBzdGVwd2VsbHxlbnwwfHx8fDE3NzM3NTI4NDN8MA&ixlib=rb-4.1.0&q=80&w=1080", "https://images.unsplash.com/photo-1645335585440-3bd5665f0705?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8M3x8UmFuaSUyMGtpJTIwVmF2JTIwUGF0YW4lMjBzdGVwd2VsbHxlbnwwfHx8fDE3NzM3NTI4NDN8MA&ixlib=rb-4.1.0&q=80&w=1080"],
    panorama: "https://www.mapillary.com/app/?lat=23.8589&lng=72.1016&z=17&focus=map&menu=false",
    panoImage: "https://upload.wikimedia.org/wikipedia/commons/e/e0/360_panorama_of_interior_of_Saint_John_the_Baptist_Church_in_Budapest.jpg",
    duration: "1-2 hours",
    entryFee: "₹40 (Indians) / ₹600 (Foreigners)",
    timings: "8:00 AM – 6:00 PM",
    bestTime: "October – March",
    lat: 23.8589,
    lng: 72.1016,
    rating: 4.8,
    description: "A UNESCO World Heritage Site, Rani ki Vav is an intricately constructed stepwell on the banks of the Saraswati River, renowned for its magnificent sculptures and seven storeys of carved galleries.",
    history: "Built in the 11th century in memory of King Bhimdev I by his widowed queen Udayamati, the stepwell was later buried by floods and unearthed only in the 1980s. It was inscribed as a UNESCO World Heritage Site in 2014 and is considered the finest example of Maru-Gurjara architecture.",
  },
  {
    id: "g2",
    name: "Champaner-Pavagadh Archaeological Park",
    state: "Gujarat",
    city: "Panchmahal",
    region: "Gujarat",
    category: "Archaeological Site",
    image: "https://images.unsplash.com/photo-1609151745346-c624e507baa2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8Q2hhbXBhbmVyJTIwUGF2YWdhZGglMjBsYW5kbWFya3xlbnwwfHx8fDE3NzM3NTI4NDR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    images: ["https://images.unsplash.com/photo-1609151745346-c624e507baa2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8Q2hhbXBhbmVyJTIwUGF2YWdhZGglMjBsYW5kbWFya3xlbnwwfHx8fDE3NzM3NTI4NDR8MA&ixlib=rb-4.1.0&q=80&w=1080", "https://images.unsplash.com/photo-1664719877542-93ffa163d428?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8Mnx8Q2hhbXBhbmVyJTIwUGF2YWdhZGglMjBsYW5kbWFya3xlbnwwfHx8fDE3NzM3NTI4NDR8MA&ixlib=rb-4.1.0&q=80&w=1080", "https://images.unsplash.com/photo-1635931927745-03db23cd8bd2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8M3x8Q2hhbXBhbmVyJTIwUGF2YWdhZGglMjBsYW5kbWFya3xlbnwwfHx8fDE3NzM3NTI4NDR8MA&ixlib=rb-4.1.0&q=80&w=1080"],
    panorama: "https://www.mapillary.com/app/?lat=22.4833&lng=73.5333&z=17&focus=map&menu=false",
    panoImage: "https://pchen66.github.io/panolens.js/examples/asset/textures/equirectangular/tunnel.jpg",
    duration: "3-4 hours",
    entryFee: "₹40 (Indians) / ₹600 (Foreigners)",
    timings: "8:00 AM – 6:00 PM",
    bestTime: "October – February",
    lat: 22.4833,
    lng: 73.5333,
    rating: 4.5,
    description: "A UNESCO World Heritage Site featuring a unique blend of Hindu and Muslim architecture, encompassing a pre-Mughal Islamic city and the sacred Pavagadh Hill with its ancient temples.",
    history: "The fortified city of Champaner was the capital of Gujarat from 1484–1535 under Sultan Mahmud Begada. The park contains an unexcavated ancient city, mosques, temples, tombs, and stepwells from the Chalcolithic to the Mughal era.",
  },
  {
    id: "g3",
    name: "Dholavira",
    state: "Gujarat",
    city: "Kutch",
    region: "Gujarat",
    category: "Archaeological Site",
    image: "https://plus.unsplash.com/premium_photo-1676285069083-62cc059bc602?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8RGhvbGF2aXJhJTIwR3VqYXJhdHxlbnwwfHx8fDE3NzM3NTI5NDV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    images: ["https://plus.unsplash.com/premium_photo-1676285069083-62cc059bc602?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8RGhvbGF2aXJhJTIwR3VqYXJhdHxlbnwwfHx8fDE3NzM3NTI5NDV8MA&ixlib=rb-4.1.0&q=80&w=1080", "https://images.unsplash.com/photo-1750405704388-1416715c359c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8Mnx8RGhvbGF2aXJhJTIwR3VqYXJhdHxlbnwwfHx8fDE3NzM3NTI5NDV8MA&ixlib=rb-4.1.0&q=80&w=1080", "https://images.unsplash.com/photo-1747487501299-d95d65c742a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8M3x8RGhvbGF2aXJhJTIwR3VqYXJhdHxlbnwwfHx8fDE3NzM3NTI5NDV8MA&ixlib=rb-4.1.0&q=80&w=1080"],
    panorama: "https://www.mapillary.com/app/?lat=23.8866&lng=70.2101&z=17&focus=map&menu=false",
    duration: "3-4 hours",
    entryFee: "₹40",
    timings: "8:00 AM – 5:00 PM",
    bestTime: "November – February",
    lat: 23.8866,
    lng: 70.2101,
    rating: 4.4,
    description: "One of the five largest Harappan cities and the most prominent Indus Valley Civilisation site in India, featuring impressive reservoirs, gateways, and an advanced urban grid dating back 5,000 years.",
    history: "Dholavira was inscribed as a UNESCO World Heritage Site in 2021. Occupied from c. 2650 BCE, it is known for its extraordinary water conservation system, large inscriptions, and unique city planning with three distinct zones — citadel, middle town, and lower town.",
  },
  {
    id: "g4",
    name: "Lothal",
    state: "Gujarat",
    city: "Ahmedabad",
    region: "Gujarat",
    category: "Archaeological Site",
    image: "https://plus.unsplash.com/premium_photo-1676285069083-62cc059bc602?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8TG90aGFsJTIwR3VqYXJhdCUyMGxhbmRtYXJrfGVufDB8fHx8MTc3Mzc1Mjg0OHww&ixlib=rb-4.1.0&q=80&w=1080",
    images: ["https://plus.unsplash.com/premium_photo-1676285069083-62cc059bc602?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8TG90aGFsJTIwR3VqYXJhdCUyMGxhbmRtYXJrfGVufDB8fHx8MTc3Mzc1Mjg0OHww&ixlib=rb-4.1.0&q=80&w=1080", "https://images.unsplash.com/photo-1650868469306-3b9a0a198945?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8Mnx8TG90aGFsJTIwR3VqYXJhdCUyMGxhbmRtYXJrfGVufDB8fHx8MTc3Mzc1Mjg0OHww&ixlib=rb-4.1.0&q=80&w=1080", "https://images.unsplash.com/photo-1717326630036-029bbed12f7b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8M3x8TG90aGFsJTIwR3VqYXJhdCUyMGxhbmRtYXJrfGVufDB8fHx8MTc3Mzc1Mjg0OHww&ixlib=rb-4.1.0&q=80&w=1080"],
    panorama: "https://www.mapillary.com/app/?lat=22.5222&lng=72.2528&z=17&focus=map&menu=false",
    duration: "2-3 hours",
    entryFee: "₹25",
    timings: "9:00 AM – 5:00 PM (closed Fridays)",
    bestTime: "October – March",
    lat: 22.5222,
    lng: 72.2528,
    rating: 4.3,
    description: "One of the southernmost cities of the ancient Indus Valley Civilisation, Lothal features the world's earliest known dockyard, a structured settlement, and a museum housing remarkable artefacts.",
    history: "Flourishing from c. 3700 BCE, Lothal was a major trade centre of the Harappan civilisation. Its tidal dockyard connected it to the Gulf of Khambhat. Excavations have revealed bead factories, a granary, and a burial site, making it invaluable for understanding ancient commerce and urban planning.",
  },
  {
    id: "g5",
    name: "Somnath Temple",
    state: "Gujarat",
    city: "Gir Somnath",
    region: "Gujarat",
    category: "Temple",
    image: "https://plus.unsplash.com/premium_photo-1697730467431-323d86486a4c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8U29tbmF0aCUyMFRlbXBsZSUyMEd1amFyYXQlMjBsYW5kbWFya3xlbnwwfHx8fDE3NzM3NTI4NDl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    images: ["https://plus.unsplash.com/premium_photo-1697730467431-323d86486a4c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8U29tbmF0aCUyMFRlbXBsZSUyMEd1amFyYXQlMjBsYW5kbWFya3xlbnwwfHx8fDE3NzM3NTI4NDl8MA&ixlib=rb-4.1.0&q=80&w=1080", "https://images.unsplash.com/photo-1747487501299-d95d65c742a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8Mnx8U29tbmF0aCUyMFRlbXBsZSUyMEd1amFyYXQlMjBsYW5kbWFya3xlbnwwfHx8fDE3NzM3NTI4NDl8MA&ixlib=rb-4.1.0&q=80&w=1080", "https://images.unsplash.com/photo-1650868469306-3b9a0a198945?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8M3x8U29tbmF0aCUyMFRlbXBsZSUyMEd1amFyYXQlMjBsYW5kbWFya3xlbnwwfHx8fDE3NzM3NTI4NDl8MA&ixlib=rb-4.1.0&q=80&w=1080"],
    panorama: "https://www.mapillary.com/app/?lat=20.8880&lng=70.4010&z=17&focus=map&menu=false",
    panoImage: "https://cdn.jsdelivr.net/npm/@photo-sphere-viewer/gallery-plugin/assets/test-1.jpg",
    duration: "2 hours",
    entryFee: "Free",
    timings: "6:00 AM – 9:30 PM",
    bestTime: "October – March",
    lat: 20.8880,
    lng: 70.4010,
    rating: 4.7,
    description: "One of the twelve Jyotirlinga shrines of Shiva and a symbol of India's indomitable spirit, Somnath Temple stands majestically on the shores of the Arabian Sea.",
    history: "Somnath has been rebuilt seven times after repeated destruction. The current temple, built in 1951 under Sardar Vallabhbhai Patel's initiative in the Chalukya style of architecture, is a symbol of post-Independence national pride. It is situated at the Triveni Sangam of Kapila, Hiran, and Saraswati rivers.",
  },
  {
    id: "g6",
    name: "Dwarkadhish Temple",
    state: "Gujarat",
    city: "Dwarka",
    region: "Gujarat",
    category: "Temple",
    image: "https://images.unsplash.com/photo-1717326630036-029bbed12f7b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8RHdhcmthZGhpc2glMjBUZW1wbGUlMjBEd2Fya2ElMjBsYW5kbWFya3xlbnwwfHx8fDE3NzM3NTI4NTF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    images: ["https://images.unsplash.com/photo-1717326630036-029bbed12f7b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8RHdhcmthZGhpc2glMjBUZW1wbGUlMjBEd2Fya2ElMjBsYW5kbWFya3xlbnwwfHx8fDE3NzM3NTI4NTF8MA&ixlib=rb-4.1.0&q=80&w=1080", "https://images.unsplash.com/photo-1717326630799-703fe906e283?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8Mnx8RHdhcmthZGhpc2glMjBUZW1wbGUlMjBEd2Fya2ElMjBsYW5kbWFya3xlbnwwfHx8fDE3NzM3NTI4NTF8MA&ixlib=rb-4.1.0&q=80&w=1080", "https://images.unsplash.com/photo-1722404348790-85bf847dd863?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8M3x8RHdhcmthZGhpc2glMjBUZW1wbGUlMjBEd2Fya2ElMjBsYW5kbWFya3xlbnwwfHx8fDE3NzM3NTI4NTF8MA&ixlib=rb-4.1.0&q=80&w=1080"],
    panorama: "https://www.mapillary.com/app/?lat=22.2383&lng=68.9678&z=17&focus=map&menu=false",
    duration: "1-2 hours",
    entryFee: "Free",
    timings: "6:00 AM – 1:00 PM, 5:00 PM – 9:30 PM",
    bestTime: "November – February",
    lat: 22.2383,
    lng: 68.9678,
    rating: 4.6,
    description: "One of the four sacred dhams of Hinduism, the Dwarkadhish Temple is dedicated to Lord Krishna and is one of India's most revered pilgrimage sites, towering 51.8 metres above sea level.",
    history: "The original temple is believed to have been built by Krishna's grandson Vajranabh over 2,500 years ago. The present five-storey temple dates to the 15th–16th centuries and is dedicated to Ranchhodraiji (Krishna). It is a principal abode of Vaishnavism and attracts millions of devotees annually.",
  },
  {
    id: "g7",
    name: "Modhera Sun Temple",
    state: "Gujarat",
    city: "Mehsana",
    region: "Gujarat",
    category: "Temple",
    image: "https://images.unsplash.com/photo-1742315600524-a4ade9588af8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8TW9kaGVyYSUyMFN1biUyMFRlbXBsZSUyMGxhbmRtYXJrfGVufDB8fHx8MTc3Mzc1Mjg1M3ww&ixlib=rb-4.1.0&q=80&w=1080",
    images: ["https://images.unsplash.com/photo-1742315600524-a4ade9588af8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8TW9kaGVyYSUyMFN1biUyMFRlbXBsZSUyMGxhbmRtYXJrfGVufDB8fHx8MTc3Mzc1Mjg1M3ww&ixlib=rb-4.1.0&q=80&w=1080", "https://images.unsplash.com/photo-1742315600576-6992f5925f8f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8Mnx8TW9kaGVyYSUyMFN1biUyMFRlbXBsZSUyMGxhbmRtYXJrfGVufDB8fHx8MTc3Mzc1Mjg1M3ww&ixlib=rb-4.1.0&q=80&w=1080", "https://images.unsplash.com/photo-1742315600511-255962708065?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8M3x8TW9kaGVyYSUyMFN1biUyMFRlbXBsZSUyMGxhbmRtYXJrfGVufDB8fHx8MTc3Mzc1Mjg1M3ww&ixlib=rb-4.1.0&q=80&w=1080"],
    panorama: "https://www.mapillary.com/app/?lat=23.5835&lng=72.1331&z=17&focus=map&menu=false",
    duration: "2-3 hours",
    entryFee: "₹40 (Indians) / ₹300 (Foreigners)",
    timings: "6:00 AM – 6:00 PM",
    bestTime: "October – March",
    lat: 23.5835,
    lng: 72.1331,
    rating: 4.8,
    description: "A masterpiece of Maru-Gurjara architecture built in 1026 CE, dedicated to Surya (Sun God). Its intricate carvings, a step tank, and precise solar alignment make it one of India's finest temples.",
    history: "Built by King Bhima I of the Chaulukya (Solanki) dynasty, the temple is so designed that the first rays of the rising sun illuminate the idol in the innermost sanctuary during the equinoxes. No worship is conducted here now; it is protected by the Archaeological Survey of India.",
  },
  {
    id: "g8",
    name: "Adalaj Stepwell",
    state: "Gujarat",
    city: "Ahmedabad",
    region: "Gujarat",
    category: "Stepwell",
    image: "https://images.unsplash.com/photo-1741207730591-79ec31061e62?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8QWRhbGFqJTIwU3RlcHdlbGwlMjBBaG1lZGFiYWR8ZW58MHx8fHwxNzczNzUyODU0fDA&ixlib=rb-4.1.0&q=80&w=1080",
    images: ["https://images.unsplash.com/photo-1741207730591-79ec31061e62?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8QWRhbGFqJTIwU3RlcHdlbGwlMjBBaG1lZGFiYWR8ZW58MHx8fHwxNzczNzUyODU0fDA&ixlib=rb-4.1.0&q=80&w=1080", "https://images.unsplash.com/photo-1741207676602-605e6a09023e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8Mnx8QWRhbGFqJTIwU3RlcHdlbGwlMjBBaG1lZGFiYWR8ZW58MHx8fHwxNzczNzUyODU0fDA&ixlib=rb-4.1.0&q=80&w=1080", "https://images.unsplash.com/photo-1741207756239-323f65b22660?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8M3x8QWRhbGFqJTIwU3RlcHdlbGwlMjBBaG1lZGFiYWR8ZW58MHx8fHwxNzczNzUyODU0fDA&ixlib=rb-4.1.0&q=80&w=1080"],
    panorama: "https://www.mapillary.com/app/?lat=23.1680&lng=72.5804&z=17&focus=map&menu=false",
    duration: "1 hour",
    entryFee: "Free",
    timings: "8:00 AM – 8:00 PM",
    bestTime: "October – March",
    lat: 23.1680,
    lng: 72.5804,
    rating: 4.5,
    description: "A stunning five-storey stepwell built in 1499 CE, blending Hindu and Islamic architectural motifs. Its ornate carvings on every surface create a mesmerising underground chamber.",
    history: "Built by Queen Rudabai in memory of her deceased husband, the Vaghela Chieftain Veer Singh, the stepwell was later completed by Sultan Mahmud Begada of Gujarat. The blending of Hindu and Islamic elements reflects the cultural syncretism of the era.",
  },
  {
    id: "g9",
    name: "Laxmi Vilas Palace",
    state: "Gujarat",
    city: "Vadodara",
    region: "Gujarat",
    category: "Palace",
    image: "https://images.unsplash.com/photo-1710681849410-0d29f0c66139?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8TGF4bWklMjBWaWxhcyUyMFBhbGFjZSUyMFZhZG9kYXJhfGVufDB8fHx8MTc3Mzc1Mjg1Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    images: ["https://images.unsplash.com/photo-1710681849410-0d29f0c66139?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8TGF4bWklMjBWaWxhcyUyMFBhbGFjZSUyMFZhZG9kYXJhfGVufDB8fHx8MTc3Mzc1Mjg1Nnww&ixlib=rb-4.1.0&q=80&w=1080", "https://images.unsplash.com/photo-1720588301389-1e6dacfa4e77?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8Mnx8TGF4bWklMjBWaWxhcyUyMFBhbGFjZSUyMFZhZG9kYXJhfGVufDB8fHx8MTc3Mzc1Mjg1Nnww&ixlib=rb-4.1.0&q=80&w=1080", "https://images.unsplash.com/photo-1720588301388-52b96fab37cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8M3x8TGF4bWklMjBWaWxhcyUyMFBhbGFjZSUyMFZhZG9kYXJhfGVufDB8fHx8MTc3Mzc1Mjg1Nnww&ixlib=rb-4.1.0&q=80&w=1080"],
    panorama: "https://www.mapillary.com/app/?lat=22.3009&lng=73.1802&z=17&focus=map&menu=false",
    duration: "2-3 hours",
    entryFee: "₹200",
    timings: "9:30 AM – 5:00 PM (closed Mondays)",
    bestTime: "October – March",
    lat: 22.3009,
    lng: 73.1802,
    rating: 4.6,
    description: "Four times the size of Buckingham Palace, Laxmi Vilas Palace is still the private residence of the Gaekwad royal family of Baroda. It is a grand Indo-Saracenic edifice featuring mosaic work, armour collections, and European paintings.",
    history: "Completed in 1890 by Maharaja Sayajirao Gaekwad III, the palace was designed by architect Major Charles Mant. The interiors blend Italian marble, Venetian mosaic floors, and trophy halls. It houses the Maharaja Fateh Singh Museum with a remarkable art collection.",
  },
  {
    id: "g10",
    name: "Uparkot Fort",
    state: "Gujarat",
    city: "Junagadh",
    region: "Gujarat",
    category: "Fort",
    image: "https://images.unsplash.com/photo-1638374574093-7723c1c8f546?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8VXBhcmtvdCUyMEZvcnQlMjBKdW5hZ2FkaHxlbnwwfHx8fDE3NzM3NTI4NTh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    images: ["https://images.unsplash.com/photo-1638374574093-7723c1c8f546?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8VXBhcmtvdCUyMEZvcnQlMjBKdW5hZ2FkaHxlbnwwfHx8fDE3NzM3NTI4NTh8MA&ixlib=rb-4.1.0&q=80&w=1080", "https://images.unsplash.com/photo-1640887217015-d95e1fa3bfa4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8Mnx8VXBhcmtvdCUyMEZvcnQlMjBKdW5hZ2FkaHxlbnwwfHx8fDE3NzM3NTI4NTh8MA&ixlib=rb-4.1.0&q=80&w=1080", "https://images.unsplash.com/photo-1638374574093-7723c1c8f546?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8VXBhcmtvdCUyMEZvcnQlMjBKdW5hZ2FkaHxlbnwwfHx8fDE3NzM3NTI4NTh8MA&ixlib=rb-4.1.0&q=80&w=1080"],
    panorama: "https://www.mapillary.com/app/?lat=21.5180&lng=70.4574&z=17&focus=map&menu=false",
    duration: "2-3 hours",
    entryFee: "₹30",
    timings: "7:00 AM – 6:00 PM",
    bestTime: "November – February",
    lat: 21.5180,
    lng: 70.4574,
    rating: 4.4,
    description: "Perched on a plateau in the heart of Junagadh, Uparkot Fort has a history spanning over 2,300 years. It features Buddhist caves, cannons, ancient stepwells, and a majestic mosque.",
    history: "Founded by Chandragupta Maurya around 319 BCE, the fort was later occupied by the Guptas, Chudasama Rajputs, and Mughal rulers. It has withstood 16 sieges over its long history. Within its walls stand the Jama Masjid converted from a 5th-century Buddhist monastery, and the Adi-Kadi and Navghan stepwells.",
  },
]

// ─────────────────────────────────────────────────────────────
//  RAJASTHAN — 10 places
// ─────────────────────────────────────────────────────────────
const rajasthanPlaces: HeritagePlace[] = [
  {
    id: "r1",
    name: "Amber Fort",
    state: "Rajasthan",
    city: "Jaipur",
    region: "Rajasthan",
    category: "Fort",
    image: "https://plus.unsplash.com/premium_photo-1661963054563-ce928e477ff3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8QW1iZXIlMjBGb3J0JTIwSmFpcHVyfGVufDB8fHx8MTc3Mzc1Mjg1OXww&ixlib=rb-4.1.0&q=80&w=1080",
    images: ["https://plus.unsplash.com/premium_photo-1661963054563-ce928e477ff3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8QW1iZXIlMjBGb3J0JTIwSmFpcHVyfGVufDB8fHx8MTc3Mzc1Mjg1OXww&ixlib=rb-4.1.0&q=80&w=1080", "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8Mnx8QW1iZXIlMjBGb3J0JTIwSmFpcHVyfGVufDB8fHx8MTc3Mzc1Mjg1OXww&ixlib=rb-4.1.0&q=80&w=1080", "https://images.unsplash.com/photo-1649073868642-bcbbd06239d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8M3x8QW1iZXIlMjBGb3J0JTIwSmFpcHVyfGVufDB8fHx8MTc3Mzc1Mjg1OXww&ixlib=rb-4.1.0&q=80&w=1080"],
    panorama: "https://www.mapillary.com/app/?lat=26.9855&lng=75.8513&z=17&focus=map&menu=false",
    panoImage: "https://cdn.jsdelivr.net/npm/@photo-sphere-viewer/gallery-plugin/assets/test-1.jpg",
    duration: "2-3 hours",
    entryFee: "₹100 (Indians) / ₹500 (Foreigners)",
    timings: "8:00 AM – 5:30 PM",
    bestTime: "October – March",
    lat: 26.9855,
    lng: 75.8513,
    rating: 4.7,
    description: "Overlooking Maota Lake, Amber Fort is an exemplary fusion of Hindu and Mughal architectural styles. Its sprawling complex houses the Sheesh Mahal (Palace of Mirrors) and intricate carved marble interiors.",
    history: "Built in 1592 by Raja Man Singh I of the Kachhwaha Rajput clan, the fort was later developed by his successors. Its four levels — each with a courtyard — reflect centuries of conquest, artistry, and royal life. It is a UNESCO World Heritage Site as part of the Hill Forts of Rajasthan.",
  },
  {
    id: "r2",
    name: "Hawa Mahal",
    state: "Rajasthan",
    city: "Jaipur",
    region: "Rajasthan",
    category: "Palace",
    image: "https://plus.unsplash.com/premium_photo-1697730373328-26e408d64025?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8SGF3YSUyME1haGFsJTIwSmFpcHVyfGVufDB8fHx8MTc3Mzc1Mjg2MXww&ixlib=rb-4.1.0&q=80&w=1080",
    images: ["https://plus.unsplash.com/premium_photo-1697730373328-26e408d64025?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8SGF3YSUyME1haGFsJTIwSmFpcHVyfGVufDB8fHx8MTc3Mzc1Mjg2MXww&ixlib=rb-4.1.0&q=80&w=1080", "https://images.unsplash.com/photo-1706961121783-4ae6c933983a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8Mnx8SGF3YSUyME1haGFsJTIwSmFpcHVyfGVufDB8fHx8MTc3Mzc1Mjg2MXww&ixlib=rb-4.1.0&q=80&w=1080", "https://images.unsplash.com/photo-1730047385285-40cfa7afdb1f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8M3x8SGF3YSUyME1haGFsJTIwSmFpcHVyfGVufDB8fHx8MTc3Mzc1Mjg2MXww&ixlib=rb-4.1.0&q=80&w=1080"],
    panorama: "https://www.mapillary.com/app/?lat=26.9239&lng=75.8267&z=17&focus=map&menu=false",
    duration: "1-2 hours",
    entryFee: "₹50 (Indians) / ₹200 (Foreigners)",
    timings: "9:00 AM – 5:00 PM",
    bestTime: "October – March",
    lat: 26.9239,
    lng: 75.8267,
    rating: 4.6,
    description: "The iconic 'Palace of Winds' — a five-storey pink sandstone façade with 953 intricately latticed jharokhas (windows) — remains Jaipur's most recognisable landmark.",
    history: "Built in 1799 by Maharaja Sawai Pratap Singh and designed by Lal Chand Ustad in the form of Lord Krishna's crown. The latticed windows allowed royal ladies to observe street life while remaining unseen, reflecting the purdah customs of the era.",
  },
  {
    id: "r3",
    name: "City Palace Jaipur",
    state: "Rajasthan",
    city: "Jaipur",
    region: "Rajasthan",
    category: "Palace",
    image: "https://plus.unsplash.com/premium_photo-1697729447666-c39f50d595ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8Q2l0eSUyMFBhbGFjZSUyMEphaXB1cnxlbnwwfHx8fDE3NzM3NTI4NjJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    images: ["https://plus.unsplash.com/premium_photo-1697729447666-c39f50d595ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8Q2l0eSUyMFBhbGFjZSUyMEphaXB1cnxlbnwwfHx8fDE3NzM3NTI4NjJ8MA&ixlib=rb-4.1.0&q=80&w=1080", "https://images.unsplash.com/photo-1716534133704-5a5c2a9c7512?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8Mnx8Q2l0eSUyMFBhbGFjZSUyMEphaXB1cnxlbnwwfHx8fDE3NzM3NTI4NjJ8MA&ixlib=rb-4.1.0&q=80&w=1080", "https://images.unsplash.com/photo-1667099639128-4b10f464f4a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8M3x8Q2l0eSUyMFBhbGFjZSUyMEphaXB1cnxlbnwwfHx8fDE3NzM3NTI4NjJ8MA&ixlib=rb-4.1.0&q=80&w=1080"],
    panorama: "https://www.mapillary.com/app/?lat=26.9258&lng=75.8237&z=17&focus=map&menu=false",
    duration: "2-3 hours",
    entryFee: "₹200 (Indians) / ₹700 (Foreigners)",
    timings: "9:30 AM – 5:00 PM",
    bestTime: "October – March",
    lat: 26.9258,
    lng: 75.8237,
    rating: 4.7,
    description: "The heart of Jaipur's royal heritage — a magnificent blend of Rajput, Mughal, and European styles housing courtyards, museums, textile galleries, and the famous pair of enormous silver urns.",
    history: "Founded by Maharaja Sawai Jai Singh II in the 18th century, the palace complex was added to over generations. Parts are still occupied by the Jaipur royal family. The Chandra Mahal within it houses a museum of royal costumes, carpets, manuscripts, and armour.",
  },
  {
    id: "r4",
    name: "Jantar Mantar Jaipur",
    state: "Rajasthan",
    city: "Jaipur",
    region: "Rajasthan",
    category: "Monument",
    image: "https://plus.unsplash.com/premium_photo-1697730309688-cc2a3a573494?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8SmFudGFyJTIwTWFudGFyJTIwSmFpcHVyfGVufDB8fHx8MTc3Mzc1Mjg2NHww&ixlib=rb-4.1.0&q=80&w=1080",
    images: ["https://plus.unsplash.com/premium_photo-1697730309688-cc2a3a573494?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8SmFudGFyJTIwTWFudGFyJTIwSmFpcHVyfGVufDB8fHx8MTc3Mzc1Mjg2NHww&ixlib=rb-4.1.0&q=80&w=1080", "https://images.unsplash.com/photo-1534757725210-578f70abd381?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8Mnx8SmFudGFyJTIwTWFudGFyJTIwSmFpcHVyfGVufDB8fHx8MTc3Mzc1Mjg2NHww&ixlib=rb-4.1.0&q=80&w=1080", "https://images.unsplash.com/photo-1602925622693-4dd322f55d46?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8M3x8SmFudGFyJTIwTWFudGFyJTIwSmFpcHVyfGVufDB8fHx8MTc3Mzc1Mjg2NHww&ixlib=rb-4.1.0&q=80&w=1080"],
    panorama: "https://www.mapillary.com/app/?lat=26.9246&lng=75.8243&z=17&focus=map&menu=false",
    duration: "1-2 hours",
    entryFee: "₹50 (Indians) / ₹200 (Foreigners)",
    timings: "9:00 AM – 4:30 PM",
    bestTime: "October – March",
    lat: 26.9246,
    lng: 75.8243,
    rating: 4.5,
    description: "A UNESCO World Heritage Site — a collection of 19 astronomical instruments built of masonry, the largest of which is the Samrat Yantra, a sundial accurate to two seconds.",
    history: "Built between 1727 and 1734 by Maharaja Sawai Jai Singh II, an astronomer-king, Jantar Mantar was used to compile astronomical tables, predict eclipses, and track celestial events. It is the largest and best-preserved of the five observatories he built across India.",
  },
  {
    id: "r5",
    name: "Chittorgarh Fort",
    state: "Rajasthan",
    city: "Chittorgarh",
    region: "Rajasthan",
    category: "Fort",
    image: "https://plus.unsplash.com/premium_photo-1697729640715-b4f8b691b9ce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8Q2hpdHRvcmdhcmglMjBGb3J0fGVufDB8fHx8MTc3Mzc1Mjg2Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    images: ["https://plus.unsplash.com/premium_photo-1697729640715-b4f8b691b9ce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8Q2hpdHRvcmdhcmglMjBGb3J0fGVufDB8fHx8MTc3Mzc1Mjg2Nnww&ixlib=rb-4.1.0&q=80&w=1080", "https://images.unsplash.com/photo-1717329162563-2f93e83cc717?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8Mnx8Q2hpdHRvcmdhcmglMjBGb3J0fGVufDB8fHx8MTc3Mzc1Mjg2Nnww&ixlib=rb-4.1.0&q=80&w=1080", "https://images.unsplash.com/photo-1684074463924-0535b3592491?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8M3x8Q2hpdHRvcmdhcmglMjBGb3J0fGVufDB8fHx8MTc3Mzc1Mjg2Nnww&ixlib=rb-4.1.0&q=80&w=1080"],
    panorama: "https://www.mapillary.com/app/?lat=24.8887&lng=74.6433&z=17&focus=map&menu=false",
    duration: "4-5 hours",
    entryFee: "₹40 (Indians) / ₹600 (Foreigners)",
    timings: "7:45 AM – 6:00 PM",
    bestTime: "October – March",
    lat: 24.8887,
    lng: 74.6433,
    rating: 4.7,
    description: "The largest fort in India and a UNESCO World Heritage Site, Chittorgarh Fort sits atop a 180-metre hill and is a testament to Rajput valor, featuring palaces, towers, temples, and reservoirs.",
    history: "Dating from the 7th century, Chittorgarh was the capital of Mewar and witnessed three historic sieges — by Alauddin Khilji (1303), Bahadur Shah of Gujarat (1535), and Akbar (1568). Each siege saw legendary acts of Jauhar (mass self-immolation) by Rajput women. The Vijay Stambha (Tower of Victory) was built to commemorate the conquest of Malwa in 1448.",
  },
  {
    id: "r6",
    name: "Mehrangarh Fort",
    state: "Rajasthan",
    city: "Jodhpur",
    region: "Rajasthan",
    category: "Fort",
    image: "https://plus.unsplash.com/premium_photo-1697730388194-0f8f7943dbad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8TWVocmFuZ2FyaCUyMEZvcnQlMjBKb2RocHVyfGVufDB8fHx8MTc3Mzc1Mjg2OHww&ixlib=rb-4.1.0&q=80&w=1080",
    images: ["https://plus.unsplash.com/premium_photo-1697730388194-0f8f7943dbad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8TWVocmFuZ2FyaCUyMEZvcnQlMjBKb2RocHVyfGVufDB8fHx8MTc3Mzc1Mjg2OHww&ixlib=rb-4.1.0&q=80&w=1080", "https://images.unsplash.com/photo-1642528928091-eb8451e950f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8Mnx8TWVocmFuZ2FyaCUyMEZvcnQlMjBKb2RocHVyfGVufDB8fHx8MTc3Mzc1Mjg2OHww&ixlib=rb-4.1.0&q=80&w=1080", "https://images.unsplash.com/photo-1642528922719-8876c7d17318?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8M3x8TWVocmFuZ2FyaCUyMEZvcnQlMjBKb2RocHVyfGVufDB8fHx8MTc3Mzc1Mjg2OHww&ixlib=rb-4.1.0&q=80&w=1080"],
    panorama: "https://www.mapillary.com/app/?lat=26.2978&lng=73.0185&z=17&focus=map&menu=false",
    duration: "3-4 hours",
    entryFee: "₹100 (Indians) / ₹600 (Foreigners)",
    timings: "9:00 AM – 5:00 PM",
    bestTime: "October – March",
    lat: 26.2978,
    lng: 73.0185,
    rating: 4.9,
    description: "One of the largest forts in India, Mehrangarh towers 122 metres above Jodhpur (the Blue City), offering breathtaking panoramic views and housing some of the finest Rajput-era exhibits.",
    history: "Founded in 1459 by Rao Jodha, chief of the Rathore clan. The fort spans 5 km, has seven magnificent gates, and took 500 years to reach its current form. Its museum holds one of the finest collections of royal palanquins, elephant howdahs, armour, and miniature paintings in Rajasthan.",
  },
  {
    id: "r7",
    name: "Jaisalmer Fort",
    state: "Rajasthan",
    city: "Jaisalmer",
    region: "Rajasthan",
    category: "Fort",
    image: "https://plus.unsplash.com/premium_photo-1723921309309-4d19183297c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8SmFpc2FsbWVyJTIwRm9ydHxlbnwwfHx8fDE3NzM3NTI4Njl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    images: ["https://plus.unsplash.com/premium_photo-1723921309309-4d19183297c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8SmFpc2FsbWVyJTIwRm9ydHxlbnwwfHx8fDE3NzM3NTI4Njl8MA&ixlib=rb-4.1.0&q=80&w=1080", "https://images.unsplash.com/photo-1732022648903-737e66c18b08?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8Mnx8SmFpc2FsbWVyJTIwRm9ydHxlbnwwfHx8fDE3NzM3NTI4Njl8MA&ixlib=rb-4.1.0&q=80&w=1080", "https://images.unsplash.com/photo-1710347454810-e3d493dcc538?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8M3x8SmFpc2FsbWVyJTIwRm9ydHxlbnwwfHx8fDE3NzM3NTI4Njl8MA&ixlib=rb-4.1.0&q=80&w=1080"],
    panorama: "https://www.mapillary.com/app/?lat=26.9124&lng=70.9188&z=17&focus=map&menu=false",
    duration: "3-4 hours",
    entryFee: "₹100",
    timings: "9:00 AM – 6:00 PM",
    bestTime: "November – February",
    lat: 26.9124,
    lng: 70.9188,
    rating: 4.7,
    description: "A 'living fort' and UNESCO World Heritage Site, Jaisalmer Fort glows like gold in the desert sun. It is home to palaces, temples, and thousands of residents, making it one of the world's largest inhabited forts.",
    history: "Built in 1156 CE by Rawal Jaisal of the Bhati Rajput clan on Trikuta Hill, the fort was a major trade post on the Silk Route. It is one of the very few living forts in the world, with about 3,000 people still residing within its walls.",
  },
  {
    id: "r8",
    name: "Kumbhalgarh Fort",
    state: "Rajasthan",
    city: "Rajsamand",
    region: "Rajasthan",
    category: "Fort",
    image: "https://plus.unsplash.com/premium_photo-1697730385162-fa617cfd46d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8S3VtYmhhbGdhcmglMjBGb3J0JTIwUmFqYXN0aGFufGVufDB8fHx8MTc3Mzc1Mjg3MXww&ixlib=rb-4.1.0&q=80&w=1080",
    images: ["https://plus.unsplash.com/premium_photo-1697730385162-fa617cfd46d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8S3VtYmhhbGdhcmglMjBGb3J0JTIwUmFqYXN0aGFufGVufDB8fHx8MTc3Mzc1Mjg3MXww&ixlib=rb-4.1.0&q=80&w=1080", "https://images.unsplash.com/photo-1695276514189-c426e5b7a37c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8Mnx8S3VtYmhhbGdhcmglMjBGb3J0JTIwUmFqYXN0aGFufGVufDB8fHx8MTc3Mzc1Mjg3MXww&ixlib=rb-4.1.0&q=80&w=1080", "https://images.unsplash.com/photo-1672157932491-eb5df8e36994?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8M3x8S3VtYmhhbGdhcmglMjBGb3J0JTIwUmFqYXN0aGFufGVufDB8fHx8MTc3Mzc1Mjg3MXww&ixlib=rb-4.1.0&q=80&w=1080"],
    panorama: "https://www.mapillary.com/app/?lat=25.1510&lng=73.5874&z=17&focus=map&menu=false",
    duration: "3-4 hours",
    entryFee: "₹40 (Indians) / ₹600 (Foreigners)",
    timings: "9:00 AM – 6:00 PM",
    bestTime: "October – March",
    lat: 25.1510,
    lng: 73.5874,
    rating: 4.6,
    description: "A UNESCO World Heritage Site, Kumbhalgarh has the world's second-longest wall (36 km), stretching over the Aravalli Hills, and encompasses 360 temples and a palace within its vast perimeter.",
    history: "Built in the 15th century by Rana Kumbha of Mewar, the fort was the birthplace of Maharana Pratap. Its massive walls, called 'the Great Wall of India', were constructed using an estimated 100,000 workers over several decades. The fort was rarely captured in history, only once when the combined armies of the Mughals cut off its water supply.",
  },
  {
    id: "r9",
    name: "Lake Palace",
    state: "Rajasthan",
    city: "Udaipur",
    region: "Rajasthan",
    category: "Palace",
    image: "https://plus.unsplash.com/premium_photo-1697730393612-882741d47f0f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8TGFrZSUyMFBhbGFjZSUyMFVkYWlwdXJ8ZW58MHx8fHwxNzczNzUyODczfDA&ixlib=rb-4.1.0&q=80&w=1080",
    images: ["https://plus.unsplash.com/premium_photo-1697730393612-882741d47f0f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8TGFrZSUyMFBhbGFjZSUyMFVkYWlwdXJ8ZW58MHx8fHwxNzczNzUyODczfDA&ixlib=rb-4.1.0&q=80&w=1080", "https://images.unsplash.com/photo-1696861524777-978d87c7cff2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8Mnx8TGFrZSUyMFBhbGFjZSUyMFVkYWlwdXJ8ZW58MHx8fHwxNzczNzUyODczfDA&ixlib=rb-4.1.0&q=80&w=1080", "https://images.unsplash.com/photo-1700985959163-ed9aa14a99bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8M3x8TGFrZSUyMFBhbGFjZSUyMFVkYWlwdXJ8ZW58MHx8fHwxNzczNzUyODczfDA&ixlib=rb-4.1.0&q=80&w=1080"],
    panorama: "https://www.mapillary.com/app/?lat=24.5757&lng=73.6832&z=17&focus=map&menu=false",
    duration: "2-3 hours",
    entryFee: "Hotel access only (Taj Lake Palace)",
    timings: "By appointment",
    bestTime: "October – March",
    lat: 24.5757,
    lng: 73.6832,
    rating: 4.9,
    description: "Floating like a marble dream on the serene waters of Lake Pichola, the Lake Palace is a 250-year-old architectural wonder now converted into a luxury heritage hotel — one of the most romantic hotels in the world.",
    history: "Built in 1746 by Maharana Jagat Singh II as a summer retreat, the palace spans a 4-acre island in Lake Pichola. It appears to float on the water, especially at dusk. Converted into a luxury hotel (now Taj Lake Palace), it has hosted royalty, celebrities, and served as a James Bond film set.",
  },
  {
    id: "r10",
    name: "Dilwara Temples",
    state: "Rajasthan",
    city: "Mount Abu",
    region: "Rajasthan",
    category: "Temple",
    image: "https://images.unsplash.com/photo-1753703986159-7dd19429b1c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8RGlsd2FyYSUyMFRlbXBsZXMlMjBNb3VudCUyMEFidXxlbnwwfHx8fDE3NzM3NTI4NzR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    images: ["https://images.unsplash.com/photo-1753703986159-7dd19429b1c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8RGlsd2FyYSUyMFRlbXBsZXMlMjBNb3VudCUyMEFidXxlbnwwfHx8fDE3NzM3NTI4NzR8MA&ixlib=rb-4.1.0&q=80&w=1080", "https://images.unsplash.com/photo-1642347983243-b3e10029f41b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8Mnx8RGlsd2FyYSUyMFRlbXBsZXMlMjBNb3VudCUyMEFidXxlbnwwfHx8fDE3NzM3NTI4NzR8MA&ixlib=rb-4.1.0&q=80&w=1080", "https://images.unsplash.com/photo-1753703986146-4d0ba1887655?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8M3x8RGlsd2FyYSUyMFRlbXBsZXMlMjBNb3VudCUyMEFidXxlbnwwfHx8fDE3NzM3NTI4NzR8MA&ixlib=rb-4.1.0&q=80&w=1080"],
    panorama: "https://www.mapillary.com/app/?lat=24.6032&lng=72.7190&z=17&focus=map&menu=false",
    duration: "2-3 hours",
    entryFee: "Free (no photography inside)",
    timings: "12:00 PM – 6:00 PM",
    bestTime: "October – March",
    lat: 24.6032,
    lng: 72.7190,
    rating: 4.8,
    description: "Five spectacular Jain temples built between the 11th and 13th centuries, renowned for their breathtaking white marble carvings — considered among the finest examples of marble craftsmanship in the world.",
    history: "The temples were built by Vimal Shah and Tejpal, wealthy Jain merchants and ministers. The Vimal Vasahi (1031 CE) and Luna Vasahi (1230 CE) are the most celebrated. Every inch of the marble interior — ceilings, pillars, arches — is intricately carved with deities, dancers, and geometric patterns of astonishing delicacy.",
  },
]

// ─────────────────────────────────────────────────────────────
//  Combined export
// ─────────────────────────────────────────────────────────────
export const heritagePlaces: HeritagePlace[] = [...gujaratPlaces, ...rajasthanPlaces]

// ─────────────────────────────────────────────────────────────
//  Nearby Recommendations
// ─────────────────────────────────────────────────────────────
export interface NearbyRecommendation {
  id: string
  name: string
  type: "cafe" | "scenic" | "cultural" | "restaurant"
  lat: number
  lng: number
  rating: number
  description: string
  nearbyPlaceId: string
}

export const nearbyRecommendations: NearbyRecommendation[] = [
  { id: "nr1", name: "Patan Heritage Café", type: "cafe", lat: 23.861, lng: 72.104, rating: 4.3, description: "Cozy café near Rani ki Vav with traditional Gujarati snacks and masala chai.", nearbyPlaceId: "g1" },
  { id: "nr2", name: "Pavagadh Viewpoint", type: "scenic", lat: 22.488, lng: 73.537, rating: 4.7, description: "Stunning hilltop views over the Champaner forest and plains.", nearbyPlaceId: "g2" },
  { id: "nr3", name: "Desert Trail Café – Kutch", type: "cafe", lat: 23.889, lng: 70.213, rating: 4.1, description: "Rustic café with Kutchi specialties near Dholavira.", nearbyPlaceId: "g3" },
  { id: "nr4", name: "Somnath Beach Promenade", type: "scenic", lat: 20.890, lng: 70.403, rating: 4.5, description: "Beautiful coastal walk along the Arabian Sea.", nearbyPlaceId: "g5" },
  { id: "nr5", name: "Dwarka Sunset Point", type: "scenic", lat: 22.239, lng: 68.970, rating: 4.6, description: "Watch the sun set over the Arabian Sea from Dwarka's coast.", nearbyPlaceId: "g6" },
  { id: "nr6", name: "Modhera Heritage Café", type: "cafe", lat: 23.585, lng: 72.135, rating: 4.1, description: "Refreshments near the Sun Temple with local specialties.", nearbyPlaceId: "g7" },
  { id: "nr7", name: "Jaipur Blue Pottery Studio", type: "cultural", lat: 26.925, lng: 75.830, rating: 4.4, description: "Live demonstrations of Jaipur's famous blue pottery craft.", nearbyPlaceId: "r2" },
  { id: "nr8", name: "Nahargarh Viewpoint", type: "scenic", lat: 26.940, lng: 75.850, rating: 4.7, description: "Panoramic views of the Pink City from the Aravalli Hills.", nearbyPlaceId: "r1" },
  { id: "nr9", name: "Jodhpur Spice Garden", type: "restaurant", lat: 26.300, lng: 73.020, rating: 4.5, description: "Authentic Rajasthani cuisine with a rooftop view of the Blue City.", nearbyPlaceId: "r6" },
  { id: "nr10", name: "Mandore Gardens", type: "cultural", lat: 26.310, lng: 73.010, rating: 4.2, description: "Historic cenotaphs and lush gardens near Jodhpur.", nearbyPlaceId: "r6" },
  { id: "nr11", name: "Sam Sand Dunes", type: "scenic", lat: 26.875, lng: 70.767, rating: 4.8, description: "Golden sand dunes for sunset camel safaris near Jaisalmer.", nearbyPlaceId: "r7" },
  { id: "nr12", name: "Lake Pichola Boat Ride", type: "scenic", lat: 24.576, lng: 73.683, rating: 4.9, description: "Serene boat ride at sunset on Lake Pichola with views of the Lake Palace.", nearbyPlaceId: "r9" },
  { id: "nr13", name: "Mount Abu Nakki Lake", type: "scenic", lat: 24.598, lng: 72.712, rating: 4.4, description: "Tranquil boating on Nakki Lake surrounded by Aravalli peaks.", nearbyPlaceId: "r10" },
  { id: "nr14", name: "Laxmi Vilas Café", type: "cafe", lat: 22.301, lng: 73.182, rating: 4.3, description: "Heritage café within the palace grounds serving royal-style snacks.", nearbyPlaceId: "g9" },
]

// Attach recommendations to places
heritagePlaces.forEach(place => {
  place.recommendations = nearbyRecommendations.filter(r => r.nearbyPlaceId === place.id)
})

// ─────────────────────────────────────────────────────────────
//  Utility Functions
// ─────────────────────────────────────────────────────────────

/** Haversine formula — returns distance in kilometres */
export function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLng = (lng2 - lng1) * Math.PI / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2)
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

/** Estimated driving time string */
export function getTravelTime(distanceKm: number): string {
  const minutes = Math.round((distanceKm / 50) * 60)
  if (minutes < 60) return `${minutes} min`
  return `${Math.floor(minutes / 60)}h ${minutes % 60}m`
}

/** Nearest-neighbour route optimisation */
export function optimizeRoute(places: HeritagePlace[]): HeritagePlace[] {
  if (places.length <= 2) return places
  const remaining = [...places]
  const optimized: HeritagePlace[] = []
  let current = remaining.shift()!
  optimized.push(current)
  while (remaining.length > 0) {
    let nearestIdx = 0, nearestDist = Infinity
    remaining.forEach((p, i) => {
      const d = calculateDistance(current.lat, current.lng, p.lat, p.lng)
      if (d < nearestDist) { nearestDist = d; nearestIdx = i }
    })
    current = remaining.splice(nearestIdx, 1)[0]
    optimized.push(current)
  }
  return optimized
}

// ─────────────────────────────────────────────────────────────
//  Itinerary Generator
// ─────────────────────────────────────────────────────────────
export interface DayPlan {
  day: number
  date?: string
  places: (HeritagePlace & {
    travelTimeFromPrev?: string
    distanceFromPrev?: string
    recommendations: NearbyRecommendation[]
  })[]
  totalDistance: string
  totalTravelTime: string
}

export function generateItinerary(selectedPlaces: HeritagePlace[], startDate?: Date): DayPlan[] {
  const optimized = optimizeRoute(selectedPlaces)
  const maxPerDay = 3
  const days: DayPlan[] = []

  for (let d = 0; d < Math.ceil(optimized.length / maxPerDay); d++) {
    const dayPlaces = optimized.slice(d * maxPerDay, d * maxPerDay + maxPerDay)
    let totalDist = 0

    const enriched = dayPlaces.map((place, idx) => {
      const recs = nearbyRecommendations.filter(r => r.nearbyPlaceId === place.id)
      if (idx === 0) return { ...place, recommendations: recs }
      const prev = dayPlaces[idx - 1]
      const dist = calculateDistance(prev.lat, prev.lng, place.lat, place.lng)
      totalDist += dist
      return { ...place, travelTimeFromPrev: getTravelTime(dist), distanceFromPrev: `${dist.toFixed(1)} km`, recommendations: recs }
    })

    const date = startDate
      ? new Date(startDate.getTime() + d * 86400000).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'short' })
      : undefined

    days.push({ day: d + 1, date, places: enriched, totalDistance: `${totalDist.toFixed(1)} km`, totalTravelTime: getTravelTime(totalDist) })
  }
  return days
}
