"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { ChevronLeft, MapPin, ZoomIn, EyeOff, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PlaceData {
  id: string
  name: string
  description: string
  location: string
  category: string
  image_url: string
  gallery_images: string[]
  rating: number
  era: string
}

export default function PlaceGalleryPage() {
  const params = useParams()
  const router = useRouter()
  const [place, setPlace] = useState<PlaceData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [lightboxImg, setLightboxImg] = useState<string | null>(null)

  useEffect(() => {
    if (!params.id) return

    async function fetchPlace() {
      try {
        const res = await fetch(`/api/places/${params.id}`)
        if (!res.ok) throw new Error("Failed to load place data")
        const data = await res.json()
        setPlace(data)
      } catch (err) {
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchPlace()
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-8 h-8 animate-spin text-[#5e3417]" />
        <p className="text-[#8c623b]">Loading gallery securely...</p>
      </div>
    )
  }

  if (error || !place) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center space-y-4">
        <EyeOff className="w-12 h-12 text-[#8c623b] opacity-50" />
        <h2 className="text-2xl font-bold text-[#5e3417]">Gallery Not Found</h2>
        <Button variant="outline" onClick={() => router.back()}>
          Go Back
        </Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#faf9f6]">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b border-[#e2d5c4] bg-[#faf9f6]/95 backdrop-blur supports-[backdrop-filter]:bg-[#faf9f6]/80 p-4 flex items-center shadow-sm">
        <Button variant="ghost" className="mr-4 text-[#5e3417] hover:bg-[#e2d5c4]/50" onClick={() => router.back()}>
          <ChevronLeft className="w-5 h-5 mr-1" /> Back
        </Button>
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-[#5e3417] leading-tight">
            {place.name} Gallery
          </h1>
          <p className="flex items-center text-sm text-[#8c623b] mt-0.5 font-medium">
            <MapPin className="w-3.5 h-3.5 mr-1" />
            {place.location}
          </p>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-3xl mb-12">
          <span className="inline-block px-3 py-1 bg-[#8c623b]/10 text-[#8c623b] text-xs font-bold uppercase tracking-wider rounded-full mb-4">
            {place.category}
          </span>
          <p className="text-[#5e3417]/80 text-base md:text-lg leading-relaxed">
            {place.description}
          </p>
        </div>

        {/* Gallery Grid - Only images for THIS specific place */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {place.gallery_images.map((imgSrc, i) => (
            <button
              key={i}
              onClick={() => setLightboxImg(imgSrc)}
              className="relative aspect-video sm:aspect-square md:aspect-[4/3] w-full overflow-hidden rounded-xl bg-[#e2d5c4] group focus:outline-none focus:ring-4 focus:ring-[#8c623b]/50 transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-1"
            >
              <Image 
                src={imgSrc} 
                alt={`${place.name} view ${i + 1}`} 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                 <ZoomIn className="text-white w-8 h-8 drop-shadow-md" />
              </div>
            </button>
          ))}
        </div>

        {place.gallery_images.length === 0 && (
          <div className="text-center py-20 text-[#8c623b]">
            <p className="text-xl">No images available for {place.name}</p>
          </div>
        )}
      </main>

      {/* Lightbox isolated viewer */}
      {lightboxImg && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 animate-in fade-in duration-300"
          onClick={() => setLightboxImg(null)}
        >
          <Button 
            variant="ghost" 
            size="icon"
            className="absolute top-4 right-4 md:top-8 md:right-8 text-white hover:bg-white/20 z-10"
            onClick={() => setLightboxImg(null)}
          >
            <ChevronLeft className="w-8 h-8 rotate-180" /> {/* temporary X styling */}
            <span className="sr-only">Close gallery</span>
          </Button>

          <div className="relative w-full max-w-6xl aspect-square sm:aspect-video rounded-xl overflow-hidden shadow-2xl">
            <Image
              src={lightboxImg}
              alt={place.name}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </div>
          <p className="absolute bottom-6 left-0 right-0 text-center text-white/50 text-sm pointer-events-none">
            Click anywhere to close
          </p>
        </div>
      )}
    </div>
  )
}
