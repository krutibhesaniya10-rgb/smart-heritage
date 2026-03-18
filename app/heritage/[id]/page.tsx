import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { MapPin, Clock, Ticket, Star, Navigation, Calendar, Camera, ChevronLeft, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import CrowdPredictionChart from "@/components/heritage/crowd-prediction-chart"
import ImageGallery from "@/components/heritage/image-gallery"
import { heritagePlaces } from "@/lib/heritage-data"
import PanoViewerTrigger from "@/components/virtual-tour/pano-viewer-trigger"

export async function generateStaticParams() {
  return heritagePlaces.map(p => ({ id: p.id }))
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const place = heritagePlaces.find(p => p.id === id)
  return {
    title: place ? `${place.name} – Heritage Explorer` : "Heritage Site – Heritage Explorer",
    description: place?.description ?? "Explore this magnificent heritage site",
  }
}

export default async function HeritageDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const place = heritagePlaces.find(p => p.id === id)

  if (!place) notFound()

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="relative h-[50vh] md:h-[60vh]">
        <Image src={place.images[0]} alt={place.name} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />

        {/* Back */}
        <div className="absolute top-4 left-4 z-10">
          <Link href="/map">
            <Button variant="secondary" size="sm" className="gap-2 glass">
              <ChevronLeft className="w-4 h-4" />Back to Map
            </Button>
          </Link>
        </div>

        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
          <div className="container mx-auto">
            <span className="inline-block px-3 py-1 rounded-full bg-heritage-clay text-primary-foreground text-sm font-medium mb-3">
              {place.category}
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3">{place.name}</h1>
            <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-heritage-clay" />{place.city}, {place.state}
              </span>
              <span className="flex items-center gap-2">
                <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />{place.rating} Rating
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                <Camera className="w-5 h-5 text-heritage-clay" />Photo Gallery
              </h2>
              <ImageGallery images={place.images} name={place.name} />
            </section>

            {/* Description */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">About</h2>
              <p className="text-muted-foreground leading-relaxed">{place.description}</p>
            </section>

            {/* History */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">History</h2>
              <p className="text-muted-foreground leading-relaxed">{place.history}</p>
            </section>

            {/* Crowd Prediction */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-heritage-clay" />Best Time to Visit
              </h2>
              <CrowdPredictionChart bestTime={`${place.bestTime} — ${place.timings}`} />
            </section>

            {/* Nearby Recommendations */}
            {place.recommendations && place.recommendations.length > 0 && (
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">📍 Nearby Suggestions</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {place.recommendations.map(rec => (
                    <div key={rec.id} className="flex items-start gap-3 p-3 bg-muted rounded-xl">
                      <div className="w-9 h-9 rounded-lg bg-heritage-clay/10 flex items-center justify-center flex-shrink-0 text-lg">
                        {rec.type === "cafe" ? "☕" : rec.type === "scenic" ? "🌅" : rec.type === "restaurant" ? "🍽️" : "🏛️"}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">{rec.name}</p>
                        <p className="text-xs text-muted-foreground">{rec.description}</p>
                        <p className="text-xs font-medium text-yellow-600 mt-0.5">★ {rec.rating}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            <Card className="sticky top-24">
              <CardContent className="p-6 space-y-5">
                <h3 className="text-lg font-semibold text-foreground">Visitor Information</h3>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-heritage-clay/10 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-heritage-clay" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Visiting Hours</p>
                      <p className="font-medium text-foreground text-sm">{place.timings}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-heritage-clay/10 flex items-center justify-center flex-shrink-0">
                      <Ticket className="w-5 h-5 text-heritage-clay" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Entry Fee</p>
                      <p className="font-medium text-foreground text-sm">{place.entryFee}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-heritage-clay/10 flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-5 h-5 text-heritage-clay" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Best Time to Visit</p>
                      <p className="font-medium text-foreground text-sm">{place.bestTime}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-heritage-clay/10 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-heritage-clay" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Duration</p>
                      <p className="font-medium text-foreground text-sm">{place.duration}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-border space-y-2">
                  <Button className="w-full bg-primary hover:bg-primary/90" asChild>
                    <a href={`https://www.openstreetmap.org/directions?engine=fossgis_osrm_car&route=;${place.lat},${place.lng}`} target="_blank" rel="noreferrer">
                      <Navigation className="w-4 h-4 mr-2" />Get Directions
                    </a>
                  </Button>
                  <Link href="/trip-planner" className="block">
                    <Button variant="outline" className="w-full">
                      <Camera className="w-4 h-4 mr-2" />Add to Trip Planner
                    </Button>
                  </Link>
                  <PanoViewerTrigger 
                    imageUrl={place.panoImage} 
                    title={place.name} 
                  />
                  {place.panorama && (
                    <a href={place.panorama} target="_blank" rel="noreferrer" className="block">
                      <Button variant="ghost" className="w-full text-xs text-muted-foreground hover:text-heritage-clay">
                        Alternative Mapillary 360° View ↗
                      </Button>
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Mini map preview */}
            <Card>
              <CardContent className="p-0 overflow-hidden rounded-xl">
                <iframe
                  src={`https://www.openstreetmap.org/export/embed.html?bbox=${place.lng - 0.05},${place.lat - 0.04},${place.lng + 0.05},${place.lat + 0.04}&layer=mapnik&marker=${place.lat},${place.lng}`}
                  className="w-full h-48 border-0"
                  title="Location map"
                />
                <div className="p-2 text-center">
                  <a href={`https://www.openstreetmap.org/?mlat=${place.lat}&mlon=${place.lng}#map=15/${place.lat}/${place.lng}`}
                    target="_blank" rel="noreferrer"
                    className="text-xs text-blue-600 hover:underline">
                    View larger map ↗
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
