"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { X, ChevronLeft, ChevronRight, ZoomIn, MapPin, Clock, Info, Star, Eye, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

// ── All 20 heritage places with REAL Unsplash images ──
const galleryItems = [
  // ═══ GUJARAT (10) ═══
  {
    id: "g1",
    src: "https://images.unsplash.com/photo-1687109168178-7a8dfae7ccce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8UmFuaSUyMGtpJTIwVmF2JTIwUGF0YW4lMjBzdGVwd2VsbHxlbnwwfHx8fDE3NzM3NTI4NDN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Rani ki Vav",
    description: "A UNESCO World Heritage stepwell in Patan with seven storeys of magnificent sculptures representing the pinnacle of Maru-Gurjara architecture.",
    location: "Patan, Gujarat",
    era: "11th Century",
    category: "Stepwell",
    rating: 4.8,
  },
  {
    id: "g2",
    src: "https://images.unsplash.com/photo-1609151745346-c624e507baa2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8Q2hhbXBhbmVyJTIwUGF2YWdhZGglMjBsYW5kbWFya3xlbnwwfHx8fDE3NzM3NTI4NDR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Champaner-Pavagadh",
    description: "A UNESCO World Heritage Site pre-Mughal Islamic city with a blend of Hindu-Muslim architecture set among forested hills.",
    location: "Panchmahal, Gujarat",
    era: "15th Century",
    category: "Archaeological Site",
    rating: 4.5,
  },
  {
    id: "g3",
    src: "https://plus.unsplash.com/premium_photo-1676285069083-62cc059bc602?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8RGhvbGF2aXJhJTIwR3VqYXJhdHxlbnwwfHx8fDE3NzM3NTI5NDV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Dholavira",
    description: "One of the five largest Harappan cities — a UNESCO World Heritage Indus Valley Civilisation site with 5,000-year-old reservoirs and gateways.",
    location: "Kutch, Gujarat",
    era: "3000 BCE",
    category: "Archaeological Site",
    rating: 4.4,
  },
  {
    id: "g4",
    src: "https://plus.unsplash.com/premium_photo-1676285069083-62cc059bc602?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8TG90aGFsJTIwR3VqYXJhdCUyMGxhbmRtYXJrfGVufDB8fHx8MTc3Mzc1Mjg0OHww&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Lothal",
    description: "An ancient Indus Valley port city featuring the world's earliest known dockyard, offering a rare window into 4,000-year-old maritime trade.",
    location: "Ahmedabad, Gujarat",
    era: "3700 BCE",
    category: "Archaeological Site",
    rating: 4.3,
  },
  {
    id: "g5",
    src: "https://plus.unsplash.com/premium_photo-1697730467431-323d86486a4c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8U29tbmF0aCUyMFRlbXBsZSUyMEd1amFyYXQlMjBsYW5kbWFya3xlbnwwfHx8fDE3NzM3NTI4NDl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Somnath Temple",
    description: "One of the twelve sacred Jyotirlinga shrines of Shiva, standing majestically on the Arabian Sea shore — a symbol of India's indomitable spirit.",
    location: "Gir Somnath, Gujarat",
    era: "Rebuilt 1951",
    category: "Temple",
    rating: 4.7,
  },
  {
    id: "g6",
    src: "https://images.unsplash.com/photo-1717326630036-029bbed12f7b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8RHdhcmthZGhpc2glMjBUZW1wbGUlMjBEd2Fya2ElMjBsYW5kbWFya3xlbnwwfHx8fDE3NzM3NTI4NTF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Dwarkadhish Temple",
    description: "One of the four sacred dhams of Hinduism, the Dwarkadhish Temple is dedicated to Lord Krishna and towers 51.8 metres above the coast.",
    location: "Dwarka, Gujarat",
    era: "15th–16th Century",
    category: "Temple",
    rating: 4.6,
  },
  {
    id: "g7",
    src: "https://images.unsplash.com/photo-1742315600524-a4ade9588af8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8TW9kaGVyYSUyMFN1biUyMFRlbXBsZSUyMGxhbmRtYXJrfGVufDB8fHx8MTc3Mzc1Mjg1M3ww&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Modhera Sun Temple",
    description: "A 1026 CE masterpiece of Maru-Gurjara architecture dedicated to Surya — sunlight illuminates the inner sanctum precisely during the equinoxes.",
    location: "Mehsana, Gujarat",
    era: "11th Century",
    category: "Temple",
    rating: 4.8,
  },
  {
    id: "g8",
    src: "https://images.unsplash.com/photo-1741207730591-79ec31061e62?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8QWRhbGFqJTIwU3RlcHdlbGwlMjBBaG1lZGFiYWR8ZW58MHx8fHwxNzczNzUyODU0fDA&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Adalaj Stepwell",
    description: "A stunning five-storey stepwell blending Hindu and Islamic motifs, with every surface covered in ornate carvings creating a mesmerising underground palace.",
    location: "Ahmedabad, Gujarat",
    era: "1499 CE",
    category: "Stepwell",
    rating: 4.5,
  },
  {
    id: "g9",
    src: "https://images.unsplash.com/photo-1710681849410-0d29f0c66139?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8TGF4bWklMjBWaWxhcyUyMFBhbGFjZSUyMFZhZG9kYXJhfGVufDB8fHx8MTc3Mzc1Mjg1Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Laxmi Vilas Palace",
    description: "Four times the size of Buckingham Palace — a grand Indo-Saracenic residence of the Gaekwad royal family featuring Italian marble and Venetian mosaics.",
    location: "Vadodara, Gujarat",
    era: "1890",
    category: "Palace",
    rating: 4.6,
  },
  {
    id: "g10",
    src: "https://images.unsplash.com/photo-1638374574093-7723c1c8f546?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8VXBhcmtvdCUyMEZvcnQlMjBKdW5hZ2FkaHxlbnwwfHx8fDE3NzM3NTI4NTh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Uparkot Fort",
    description: "A 2,300-year-old fort perched on a plateau in Junagadh, featuring Buddhist caves, ancient stepwells, cannons, and a mosque. Withstood 16 sieges.",
    location: "Junagadh, Gujarat",
    era: "319 BCE",
    category: "Fort",
    rating: 4.4,
  },
  // ═══ RAJASTHAN (10) ═══
  {
    id: "r1",
    src: "https://plus.unsplash.com/premium_photo-1661963054563-ce928e477ff3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8QW1iZXIlMjBGb3J0JTIwSmFpcHVyfGVufDB8fHx8MTc3Mzc1Mjg1OXww&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Amber Fort",
    description: "A UNESCO World Heritage hilltop fort with Sheesh Mahal (Palace of Mirrors), blending Hindu and Mughal styles, overlooking serene Maota Lake.",
    location: "Jaipur, Rajasthan",
    era: "1592 CE",
    category: "Fort",
    rating: 4.7,
  },
  {
    id: "r2",
    src: "https://plus.unsplash.com/premium_photo-1697730373328-26e408d64025?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8SGF3YSUyME1haGFsJTIwSmFpcHVyfGVufDB8fHx8MTc3Mzc1Mjg2MXww&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Hawa Mahal",
    description: "The iconic Palace of Winds — a five-storey pink sandstone façade with 953 intricately latticed jharokhas, Jaipur's most recognisable landmark.",
    location: "Jaipur, Rajasthan",
    era: "1799 CE",
    category: "Palace",
    rating: 4.6,
  },
  {
    id: "r3",
    src: "https://plus.unsplash.com/premium_photo-1697729447666-c39f50d595ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8Q2l0eSUyMFBhbGFjZSUyMEphaXB1cnxlbnwwfHx8fDE3NzM3NTI4NjJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    title: "City Palace Jaipur",
    description: "The heart of Jaipur's royal heritage — a magnificent blend of Rajput, Mughal, and European styles housing courtyards, museums, and famous silver urns.",
    location: "Jaipur, Rajasthan",
    era: "18th Century",
    category: "Palace",
    rating: 4.7,
  },
  {
    id: "r4",
    src: "https://plus.unsplash.com/premium_photo-1697730309688-cc2a3a573494?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8SmFudGFyJTIwTWFudGFyJTIwSmFpcHVyfGVufDB8fHx8MTc3Mzc1Mjg2NHww&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Jantar Mantar Jaipur",
    description: "A UNESCO World Heritage astronomical observatory — 19 masonry instruments including the colossal Samrat Yantra sundial, accurate to two seconds.",
    location: "Jaipur, Rajasthan",
    era: "1727–1734",
    category: "Monument",
    rating: 4.5,
  },
  {
    id: "r5",
    src: "https://plus.unsplash.com/premium_photo-1697729640715-b4f8b691b9ce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8Q2hpdHRvcmdhcmglMjBGb3J0fGVufDB8fHx8MTc3Mzc1Mjg2Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Chittorgarh Fort",
    description: "India's largest fort — a UNESCO World Heritage Site of Rajput valour perched on a 180-metre hill, with palaces, towers, and tales of legendary Jauhar.",
    location: "Chittorgarh, Rajasthan",
    era: "7th Century",
    category: "Fort",
    rating: 4.7,
  },
  {
    id: "r6",
    src: "https://plus.unsplash.com/premium_photo-1697730388194-0f8f7943dbad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8TWVocmFuZ2FyaCUyMEZvcnQlMjBKb2RocHVyfGVufDB8fHx8MTc3Mzc1Mjg2OHww&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Mehrangarh Fort",
    description: "Towering 122 metres above the Blue City with breathtaking views, seven gates, and one of Rajasthan's finest museum collections.",
    location: "Jodhpur, Rajasthan",
    era: "1459 CE",
    category: "Fort",
    rating: 4.9,
  },
  {
    id: "r7",
    src: "https://plus.unsplash.com/premium_photo-1723921309309-4d19183297c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8SmFpc2FsbWVyJTIwRm9ydHxlbnwwfHx8fDE3NzM3NTI4Njl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Jaisalmer Fort",
    description: "A living UNESCO World Heritage fort glowing gold in the Thar Desert sun — home to palaces, temples, and 3,000 residents within its ancient walls.",
    location: "Jaisalmer, Rajasthan",
    era: "1156 CE",
    category: "Fort",
    rating: 4.7,
  },
  {
    id: "r8",
    src: "https://plus.unsplash.com/premium_photo-1697730385162-fa617cfd46d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8S3VtYmhhbGdhcmglMjBGb3J0JTIwUmFqYXN0aGFufGVufDB8fHx8MTc3Mzc1Mjg3MXww&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Kumbhalgarh Fort",
    description: "A UNESCO World Heritage Site with the world's second-longest wall (36 km) across the Aravallis — birthplace of the legendary Maharana Pratap.",
    location: "Rajsamand, Rajasthan",
    era: "15th Century",
    category: "Fort",
    rating: 4.6,
  },
  {
    id: "r9",
    src: "https://plus.unsplash.com/premium_photo-1697730393612-882741d47f0f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8TGFrZSUyMFBhbGFjZSUyMFVkYWlwdXJ8ZW58MHx8fHwxNzczNzUyODczfDA&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Lake Palace",
    description: "Floating like a marble dream on Lake Pichola — a 250-year-old architectural wonder and one of the world's most romantic luxury heritage hotels.",
    location: "Udaipur, Rajasthan",
    era: "1746 CE",
    category: "Palace",
    rating: 4.9,
  },
  {
    id: "r10",
    src: "https://images.unsplash.com/photo-1753703986159-7dd19429b1c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8RGlsd2FyYSUyMFRlbXBsZXMlMjBNb3VudCUyMEFidXxlbnwwfHx8fDE3NzM3NTI4NzR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Dilwara Temples",
    description: "Five spectacular 11th–13th century Jain temples with breathtaking white marble carvings — considered the finest marble craftsmanship in the world.",
    location: "Mount Abu, Rajasthan",
    era: "11th–13th Century",
    category: "Temple",
    rating: 4.8,
  },
]

const categories = [
  "All", "Temple", "Fort", "Palace", "Stepwell", "Archaeological Site", "Monument",
]

export default function ImageGallery() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [activeState, setActiveState] = useState("All")

  const filteredItems = galleryItems.filter((item) => {
    const matchCat = selectedCategory === "All" || item.category === selectedCategory
    const matchState = activeState === "All" || item.location.includes(activeState)
    return matchCat && matchState
  })

  const openLightbox = (index: number) => setLightboxIndex(index)
  const closeLightbox = () => setLightboxIndex(null)

  const goToPrevious = () => {
    if (lightboxIndex !== null)
      setLightboxIndex(lightboxIndex === 0 ? filteredItems.length - 1 : lightboxIndex - 1)
  }
  const goToNext = () => {
    if (lightboxIndex !== null)
      setLightboxIndex(lightboxIndex === filteredItems.length - 1 ? 0 : lightboxIndex + 1)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (lightboxIndex === null) return
    if (e.key === "ArrowLeft") goToPrevious()
    if (e.key === "ArrowRight") goToNext()
    if (e.key === "Escape") closeLightbox()
  }

  return (
    <section className="py-16 bg-[#f9edd2]" onKeyDown={handleKeyDown} tabIndex={0}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="text-[#8c623b] text-sm font-medium uppercase tracking-wider">
            Heritage Collection
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#5e3417] mt-2 mb-3">
            Explore Heritage Through Images
          </h2>
          <p className="text-[#8c623b] max-w-2xl mx-auto">
            Discover {galleryItems.length} magnificent heritage sites across Gujarat & Rajasthan.
            Each photograph captures centuries of history, architecture, and tradition.
          </p>
        </div>

        {/* State filter */}
        <div className="flex justify-center gap-2 mb-4">
          {["All", "Gujarat", "Rajasthan"].map((s) => (
            <button key={s} onClick={() => setActiveState(s)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all hover:scale-105 ${
                activeState === s
                  ? "bg-[#5e3417] text-[#f9edd2] shadow-lg"
                  : "bg-white text-[#5e3417] hover:bg-[#8c623b]/10 border border-[#d4c4a8]"
              }`}>
              {s === "All" ? "All States" : s}
            </button>
          ))}
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((category) => (
            <button key={category} onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all hover:scale-105 ${
                selectedCategory === category
                  ? "bg-[#8c623b] text-white shadow-md"
                  : "bg-white text-[#5e3417] hover:bg-[#8c623b]/10 border border-[#d4c4a8]"
              }`}>
              {category}
            </button>
          ))}
        </div>

        {/* Results count */}
        <p className="text-center text-sm text-[#8c623b] mb-6">
          Showing {filteredItems.length} of {galleryItems.length} sites
        </p>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredItems.map((item, index) => (
            <Card
              key={item.id}
              className="overflow-hidden bg-white border-[#d4c4a8] hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Image */}
              <button
                onClick={() => openLightbox(index)}
                className="relative aspect-[4/3] w-full overflow-hidden group"
              >
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  className={`object-cover transition-transform duration-500 ${
                    hoveredId === item.id ? "scale-110" : "scale-100"
                  }`}
                />
                {/* Hover overlay */}
                <div className={`absolute inset-0 bg-[#5e3417]/60 flex items-center justify-center transition-opacity duration-300 ${
                  hoveredId === item.id ? "opacity-100" : "opacity-0"
                }`}>
                  <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
                    <ZoomIn className="w-5 h-5 text-[#5e3417]" />
                  </div>
                </div>
                {/* Category badge */}
                <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 bg-[#8c623b] text-white text-[10px] font-medium rounded-full">
                  {item.category}
                </span>
                {/* Rating badge */}
                <span className="absolute top-2.5 right-2.5 px-2 py-0.5 bg-black/60 text-white text-[10px] font-medium rounded-full flex items-center gap-0.5">
                  <Star className="w-2.5 h-2.5 fill-yellow-400 text-yellow-400" />{item.rating}
                </span>
              </button>

              {/* Info Card */}
              <CardContent className="p-4">
                <h3 className="text-base font-semibold text-[#5e3417] mb-1.5 line-clamp-1">
                  {item.title}
                </h3>
                <p className="text-[#8c623b] text-xs leading-relaxed mb-3 line-clamp-2">
                  {item.description}
                </p>
                <div className="flex items-center justify-between text-[11px] text-[#8c623b]">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {item.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {item.era}
                  </span>
                </div>
                {/* Action buttons */}
                <div className="flex gap-2 mt-3">
                  <Link href={`/heritage/${item.id}`} className="flex-1">
                    <Button size="sm" className="w-full h-7 text-[10px] bg-[#5e3417] hover:bg-[#8c623b]">
                      <ExternalLink className="w-3 h-3 mr-1" />View Details
                    </Button>
                  </Link>
                  <Button size="sm" variant="outline" className="h-7 text-[10px] border-[#d4c4a8] text-[#5e3417]"
                    onClick={() => openLightbox(index)}>
                    <Eye className="w-3 h-3 mr-1" />Gallery
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty state */}
        {filteredItems.length === 0 && (
          <div className="text-center py-20 text-[#8c623b]">
            <MapPin className="w-12 h-12 mx-auto mb-4 opacity-30" />
            <p className="text-lg font-medium">No sites match your filters</p>
            <p className="text-sm mt-1 opacity-70">Try a different state or category combination.</p>
          </div>
        )}

        {/* ── Lightbox ── */}
        {lightboxIndex !== null && (
          <div
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center animate-fade-in"
            onClick={(e) => e.target === e.currentTarget && closeLightbox()}
          >
            {/* Close */}
            <Button variant="ghost" size="icon"
              className="absolute top-4 right-4 text-white hover:bg-white/10 z-10"
              onClick={closeLightbox}>
              <X className="w-6 h-6" />
            </Button>

            {/* Nav */}
            <Button variant="ghost" size="icon"
              className="absolute left-4 text-white hover:bg-white/10"
              onClick={goToPrevious}>
              <ChevronLeft className="w-8 h-8" />
            </Button>
            <Button variant="ghost" size="icon"
              className="absolute right-4 text-white hover:bg-white/10"
              onClick={goToNext}>
              <ChevronRight className="w-8 h-8" />
            </Button>

            {/* Content */}
            <div className="flex flex-col lg:flex-row items-center gap-6 max-w-6xl mx-4 w-full">
              {/* Large image */}
              <div className="relative w-full lg:w-2/3 aspect-video rounded-xl overflow-hidden">
                <Image
                  src={filteredItems[lightboxIndex].src}
                  alt={filteredItems[lightboxIndex].title}
                  fill
                  className="object-contain"
                />
              </div>

              {/* Info panel */}
              <div className="lg:w-1/3 text-white p-4">
                <span className="inline-block px-3 py-1 bg-[#8c623b] text-white text-xs font-medium rounded-full mb-3">
                  {filteredItems[lightboxIndex].category}
                </span>
                <h3 className="text-2xl font-bold mb-2">
                  {filteredItems[lightboxIndex].title}
                </h3>
                <div className="flex items-center gap-2 mb-3">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-white/90 text-sm font-medium">{filteredItems[lightboxIndex].rating}</span>
                </div>
                <p className="text-white/80 leading-relaxed mb-4 text-sm">
                  {filteredItems[lightboxIndex].description}
                </p>
                <div className="flex flex-col gap-2 text-sm text-white/70">
                  <span className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#8c623b]" />
                    {filteredItems[lightboxIndex].location}
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#8c623b]" />
                    {filteredItems[lightboxIndex].era}
                  </span>
                </div>
                <div className="mt-4 flex gap-2">
                  <Link href={`/heritage/${filteredItems[lightboxIndex].id}`}>
                    <Button size="sm" className="bg-[#5e3417] text-white hover:bg-[#8c623b]">
                      View Full Details
                    </Button>
                  </Link>
                </div>
                <p className="text-white/50 text-xs mt-4 flex items-center gap-1">
                  <Info className="w-3 h-3" />
                  {lightboxIndex + 1} / {filteredItems.length}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
