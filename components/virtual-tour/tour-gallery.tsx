"use client"

import { useState } from "react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight, Camera } from "lucide-react"
import { Button } from "@/components/ui/button"

const galleryImages = [
  { id: 1, src: "/images/heritage-1.jpg", title: "Temple Architecture", category: "Architecture" },
  { id: 2, src: "/images/heritage-2.jpg", title: "Fortress Walls", category: "Fortifications" },
  { id: 3, src: "/images/heritage-3.jpg", title: "Palace Gardens", category: "Landscapes" },
  { id: 4, src: "/images/virtual-tour.jpg", title: "Interior Details", category: "Interiors" },
  { id: 5, src: "/images/cultural-event.jpg", title: "Cultural Celebrations", category: "Events" },
  { id: 6, src: "/images/hero-monument.jpg", title: "Sunset Views", category: "Landscapes" },
]

const categories = ["All", "Architecture", "Fortifications", "Landscapes", "Interiors", "Events"]

export default function TourGallery() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const filteredImages = galleryImages.filter(
    (img) => selectedCategory === "All" || img.category === selectedCategory
  )

  const openLightbox = (index: number) => setLightboxIndex(index)
  const closeLightbox = () => setLightboxIndex(null)
  
  const goToPrevious = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex(lightboxIndex === 0 ? filteredImages.length - 1 : lightboxIndex - 1)
    }
  }
  
  const goToNext = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex(lightboxIndex === filteredImages.length - 1 ? 0 : lightboxIndex + 1)
    }
  }

  return (
    <section className="py-12 bg-muted/50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="text-heritage-clay text-sm font-medium uppercase tracking-wider">
            Heritage Collection
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
            Photo Gallery
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Browse through stunning photographs capturing the beauty and grandeur 
            of heritage sites from different angles and perspectives.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-muted-foreground hover:bg-card/80"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {filteredImages.map((image, index) => (
            <button
              key={image.id}
              onClick={() => openLightbox(index)}
              className="relative aspect-square rounded-xl overflow-hidden group"
            >
              <Image
                src={image.src}
                alt={image.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/40 transition-colors flex items-center justify-center">
                <Camera className="w-8 h-8 text-primary-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-primary-foreground font-medium text-sm">{image.title}</p>
                <p className="text-primary-foreground/70 text-xs">{image.category}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Lightbox */}
        {lightboxIndex !== null && (
          <div className="fixed inset-0 z-50 bg-primary/95 flex items-center justify-center animate-fade-in">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 text-primary-foreground hover:bg-primary-foreground/10"
              onClick={closeLightbox}
            >
              <X className="w-6 h-6" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 text-primary-foreground hover:bg-primary-foreground/10"
              onClick={goToPrevious}
            >
              <ChevronLeft className="w-8 h-8" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 text-primary-foreground hover:bg-primary-foreground/10"
              onClick={goToNext}
            >
              <ChevronRight className="w-8 h-8" />
            </Button>

            <div className="relative w-full max-w-5xl aspect-video mx-4">
              <Image
                src={filteredImages[lightboxIndex].src}
                alt={filteredImages[lightboxIndex].title}
                fill
                className="object-contain"
              />
            </div>

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
              <p className="text-primary-foreground font-medium text-lg">
                {filteredImages[lightboxIndex].title}
              </p>
              <p className="text-primary-foreground/70 text-sm">
                {lightboxIndex + 1} / {filteredImages.length}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
