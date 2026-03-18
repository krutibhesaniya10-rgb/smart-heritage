"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Search, MapPin, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const carouselImages = [
  { src: "/images/hero-monument.jpg", alt: "Historic monument at golden hour" },
  { src: "/images/heritage-1.jpg", alt: "Ancient temple with intricate carvings" },
  { src: "/images/heritage-2.jpg", alt: "Historic fortress on hilltop" },
  { src: "/images/heritage-3.jpg", alt: "Royal palace courtyard" },
]

// Heritage places for search
const heritagePlaces = [
  { id: "1", name: "Ancient Temple Complex", location: "Heritage Valley" },
  { id: "2", name: "Royal Fortress", location: "Hill District" },
  { id: "3", name: "Palace of Mirrors", location: "Cultural Quarter" },
  { id: "4", name: "Sacred Gardens", location: "Riverside" },
  { id: "5", name: "Victory Monument", location: "Central Square" },
]

export default function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<typeof heritagePlaces>([])
  const [showResults, setShowResults] = useState(false)
  const [noResults, setNoResults] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const router = useRouter()

  // Auto-slide carousel
  useEffect(() => {
    if (isPaused) return
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length)
    }, 4000) // 4 seconds per slide
    return () => clearInterval(interval)
  }, [isPaused])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length)
  }

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length)
  }

  // Search functionality
  const handleSearch = useCallback(() => {
    const query = searchQuery.trim().toLowerCase()
    if (!query) {
      setSearchResults([])
      setShowResults(false)
      setNoResults(false)
      return
    }

    const results = heritagePlaces.filter(
      (place) =>
        place.name.toLowerCase().includes(query) ||
        place.location.toLowerCase().includes(query)
    )

    if (results.length === 1) {
      // Direct redirect if only one result
      router.push(`/heritage/${results[0].id}`)
    } else if (results.length > 1) {
      setSearchResults(results)
      setShowResults(true)
      setNoResults(false)
    } else {
      setSearchResults([])
      setShowResults(false)
      setNoResults(true)
    }
  }, [searchQuery, router])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchQuery(value)
    setNoResults(false)

    if (value.trim()) {
      const query = value.trim().toLowerCase()
      const results = heritagePlaces.filter(
        (place) =>
          place.name.toLowerCase().includes(query) ||
          place.location.toLowerCase().includes(query)
      )
      setSearchResults(results)
      setShowResults(results.length > 0)
      if (results.length === 0 && value.length > 2) {
        setNoResults(true)
      }
    } else {
      setSearchResults([])
      setShowResults(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  const selectPlace = (place: typeof heritagePlaces[0]) => {
    router.push(`/heritage/${place.id}`)
    setShowResults(false)
    setSearchQuery("")
  }

  return (
    <section
      className="relative min-h-[90vh] flex items-center justify-center"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Carousel Background */}
      <div className="absolute inset-0 z-0">
        {carouselImages.map((image, index) => (
          <div
            key={image.src}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
              priority={index === 0}
            />
          </div>
        ))}
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Carousel Controls */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#5e3417]/80 hover:bg-[#5e3417] text-white flex items-center justify-center transition-all hover:scale-110"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#5e3417]/80 hover:bg-[#5e3417] text-white flex items-center justify-center transition-all hover:scale-110"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
      </button>

      {/* Carousel Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {carouselImages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${index === currentSlide
              ? "bg-[#8c623b] w-8"
              : "bg-white/50 hover:bg-white/80"
              }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Content - Centered */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Explore 500+ Heritage Sites
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 text-balance">
            Discover Culture & Heritage
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-8 text-pretty max-w-2xl mx-auto">
            Journey through time and explore magnificent monuments, ancient temples,
            and historic palaces. Experience the rich cultural heritage with virtual
            tours and plan your visit with real-time crowd predictions.
          </p>

          {/* Search Bar */}
          <div className="relative glass rounded-2xl p-2 mb-8 max-w-xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-white rounded-xl">
                <Search className="w-5 h-5 text-[#8c623b]" />
                <input
                  type="text"
                  placeholder="Search heritage places..."
                  value={searchQuery}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-transparent outline-none text-[#5e3417] placeholder:text-[#8c623b]/60"
                />
              </div>
              <Button
                size="lg"
                onClick={handleSearch}
                className="bg-[#8c623b] hover:bg-[#8c623b]/90 text-white px-8 rounded-xl transition-all hover:scale-105"
              >
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
            </div>

            {/* Search Results Dropdown */}
            {showResults && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl overflow-hidden z-30 animate-fade-in">
                {searchResults.map((place) => (
                  <button
                    key={place.id}
                    onClick={() => selectPlace(place)}
                    className="w-full px-4 py-3 text-left hover:bg-[#f9edd2] transition-colors flex items-center gap-3 border-b border-[#d4c4a8] last:border-0"
                  >
                    <MapPin className="w-4 h-4 text-[#8c623b]" />
                    <div>
                      <p className="font-medium text-[#5e3417]">{place.name}</p>
                      <p className="text-sm text-[#8c623b]">{place.location}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* No Results Message */}
            {noResults && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl p-4 z-30 animate-fade-in">
                <p className="text-[#5d222c] text-center">
                  No heritage place found. Try searching for &ldquo;Temple&rdquo; or &ldquo;Palace&rdquo;
                </p>
              </div>
            )}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/map">
              <Button
                size="lg"
                className="bg-[#8c623b] hover:bg-[#8c623b]/90 text-white rounded-xl transition-all hover:scale-105 hover:shadow-lg"
              >
                <MapPin className="w-4 h-4 mr-2" />
                Explore Map
              </Button>
            </Link>
            <Link href="/virtual-tour">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-[#5e3417] text-[#5e3417] bg-transparent hover:bg-[#5e3417]/10 rounded-xl transition-all hover:scale-105"
              >
                Start Virtual Tour
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
