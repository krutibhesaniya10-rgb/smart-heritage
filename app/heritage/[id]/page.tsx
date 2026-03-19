import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  MapPin, Clock, Ticket, Star, Navigation, Calendar,
  Camera, ChevronLeft, Users, Compass, ExternalLink,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import CrowdPredictionChart from "@/components/heritage/crowd-prediction-chart"
import ImageGallery from "@/components/heritage/image-gallery"
import { heritagePlaces } from "@/lib/heritage-data"
import PanoViewerTrigger from "@/components/virtual-tour/pano-viewer-trigger"

// ─────────────────────────────────────────────────────────────────────────────
//  Static params for all heritage places
// ─────────────────────────────────────────────────────────────────────────────
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

// ─────────────────────────────────────────────────────────────────────────────
//  Info row helper
// ─────────────────────────────────────────────────────────────────────────────
function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: string
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-10 h-10 rounded-xl bg-[#5e3417]/10 flex items-center justify-center flex-shrink-0 text-[#5e3417]">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">{label}</p>
        <p className="text-sm font-semibold text-foreground mt-0.5">{value}</p>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
//  Page
// ─────────────────────────────────────────────────────────────────────────────
export default async function HeritageDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const place = heritagePlaces.find(p => p.id === id)
  if (!place) notFound()

  const directionsUrl = `https://www.openstreetmap.org/directions?engine=fossgis_osrm_car&route=;${place.lat},${place.lng}`
  const largerMapUrl  = `https://www.openstreetmap.org/?mlat=${place.lat}&mlon=${place.lng}#map=15/${place.lat}/${place.lng}`
  const embedMapUrl   = `https://www.openstreetmap.org/export/embed.html?bbox=${place.lng - 0.05},${place.lat - 0.04},${place.lng + 0.05},${place.lat + 0.04}&layer=mapnik&marker=${place.lat},${place.lng}`

  return (
    <div className="min-h-screen bg-background">

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <div className="relative h-[50vh] md:h-[62vh]">
        <Image
          src={place.images[0]}
          alt={place.name}
          fill
          className="object-cover"
          priority
        />
        {/* gradient scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />

        {/* Back button */}
        <div className="absolute top-4 left-4 z-10">
          <Link href="/map">
            <Button variant="secondary" size="sm" className="gap-2 backdrop-blur-md bg-white/80 hover:bg-white border-0 shadow-lg">
              <ChevronLeft className="w-4 h-4" />
              Back to Map
            </Button>
          </Link>
        </div>

        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-8 md:px-10 md:pb-10">
          <div className="container mx-auto">
            <span className="inline-block px-3 py-1 rounded-full bg-[#5e3417] text-white text-xs font-bold uppercase tracking-widest mb-3">
              {place.category}
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-3 leading-tight">
              {place.name}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
              <span className="flex items-center gap-1.5 text-sm">
                <MapPin className="w-4 h-4 text-[#5e3417]" />
                {place.city}, {place.state}
              </span>
              <span className="flex items-center gap-1.5 text-sm">
                <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                {place.rating} Rating
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main Content ──────────────────────────────────────────────────── */}
      <div className="container mx-auto px-4 py-10">
        {/*
          KEY LAYOUT:
          - lg:grid-cols-[1fr_340px]  → left gets all remaining space, right is fixed 340px
          - items-start               → children start at top (required for sticky to work!)
          - The sticky wrapper must be a direct child of this grid
        */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8 xl:gap-10 items-start">

          {/* ── LEFT: Scrollable content ──────────────────────────────────── */}
          <div className="space-y-10 min-w-0">

            {/* Photo Gallery */}
            <section>
              <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Camera className="w-5 h-5 text-[#5e3417]" />
                Photo Gallery
              </h2>
              <ImageGallery images={place.images} name={place.name} />
            </section>

            {/* About */}
            <section>
              <h2 className="text-xl font-bold text-foreground mb-3">About</h2>
              <p className="text-muted-foreground leading-relaxed text-[15px]">
                {place.description}
              </p>
            </section>

            {/* History */}
            <section>
              <h2 className="text-xl font-bold text-foreground mb-3">History</h2>
              <p className="text-muted-foreground leading-relaxed text-[15px]">
                {place.history}
              </p>
            </section>

            {/* Crowd / Best Time */}
            <section>
              <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-[#5e3417]" />
                Best Time to Visit
              </h2>
              <CrowdPredictionChart bestTime={`${place.bestTime} — ${place.timings}`} />
            </section>

            {/* Nearby Recommendations */}
            {place.recommendations && place.recommendations.length > 0 && (
              <section>
                <h2 className="text-xl font-bold text-foreground mb-4">📍 Nearby Suggestions</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {place.recommendations.map(rec => (
                    <div key={rec.id} className="flex items-start gap-3 p-4 bg-muted rounded-2xl border border-border/50 hover:border-[#5e3417]/30 transition-colors">
                      <div className="w-10 h-10 rounded-xl bg-[#5e3417]/10 flex items-center justify-center flex-shrink-0 text-lg">
                        {rec.type === "cafe" ? "☕" : rec.type === "scenic" ? "🌅" : rec.type === "restaurant" ? "🍽️" : "🏛️"}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-foreground">{rec.name}</p>
                        <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{rec.description}</p>
                        <p className="text-xs font-bold text-yellow-600 mt-1">★ {rec.rating}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* ── RIGHT: Sticky sidebar ─────────────────────────────────────── */}
          {/*
            sticky + top-24 = sticks 96px from top (clears the navbar)
            max-h-[calc(100vh-7rem)] + overflow-y-auto = prevents overflow below viewport
            The parent grid has items-start which is REQUIRED for sticky to work
          */}
          <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-muted-foreground/20 scrollbar-track-transparent">

            {/* Visitor Info Card */}
            <Card className="rounded-2xl shadow-lg border-border/60 overflow-hidden">
              <CardContent className="p-6 space-y-5">
                {/* Header */}
                <div>
                  <h3 className="text-lg font-bold text-foreground">Visitor Information</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{place.name}</p>
                </div>

                {/* Info rows */}
                <div className="space-y-4">
                  <InfoRow icon={<Clock className="w-4.5 h-4.5" />}  label="Hours"    value={place.timings}  />
                  <InfoRow icon={<Ticket className="w-4.5 h-4.5" />} label="Entry Fee" value={place.entryFee} />
                  <InfoRow icon={<Calendar className="w-4.5 h-4.5" />} label="Best Time" value={place.bestTime} />
                  <InfoRow icon={<Clock className="w-4.5 h-4.5" />}  label="Duration"  value={place.duration} />
                </div>

                {/* Action buttons */}
                <div className="pt-4 border-t border-border space-y-2.5">
                  {/* Get Directions */}
                  <Button className="w-full bg-[#5e3417] hover:bg-[#7a4520] text-white shadow-md hover:shadow-lg transition-all" asChild>
                    <a href={directionsUrl} target="_blank" rel="noreferrer">
                      <Navigation className="w-4 h-4 mr-2" />
                      Get Directions
                    </a>
                  </Button>

                  {/* Add to Trip Planner */}
                  <Button
                    variant="outline"
                    className="w-full border-[#5e3417]/30 text-[#5e3417] hover:bg-[#5e3417]/5 hover:border-[#5e3417] transition-all"
                    asChild
                  >
                    <Link href={`/trip-planner?addPlaceId=${place.id}`}>
                      <Calendar className="w-4 h-4 mr-2" />
                      Add to Trip Planner
                    </Link>
                  </Button>

                  {/* 360° Virtual Tour */}
                  <PanoViewerTrigger
                    imageUrl={place.panoImage}
                    title={place.name}
                  />

                  {/* Mapillary fallback */}
                  {place.panorama && (
                    <a href={place.panorama} target="_blank" rel="noreferrer" className="block">
                      <Button variant="ghost" className="w-full text-xs text-muted-foreground hover:text-[#5e3417] gap-1.5 transition-colors">
                        <ExternalLink className="w-3.5 h-3.5" />
                        View on Mapillary 360°
                      </Button>
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* ── Map Card ────────────────────────────────────────────────── */}
            <Card className="rounded-2xl shadow-lg border-border/60 overflow-hidden">
              <CardContent className="p-0">
                {/* Map iframe */}
                <div className="relative">
                  <iframe
                    src={embedMapUrl}
                    className="w-full h-52 border-0"
                    title={`Map — ${place.name}`}
                    loading="lazy"
                  />
                </div>

                {/* Map footer */}
                <div className="px-4 py-3 bg-muted/50 flex items-center justify-between border-t border-border/50">
                  <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <MapPin className="w-3.5 h-3.5 text-[#5e3417]" />
                    {place.lat.toFixed(4)}, {place.lng.toFixed(4)}
                  </span>
                  <a
                    href={largerMapUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 font-medium transition-colors"
                  >
                    <Compass className="w-3 h-3" />
                    Larger map
                  </a>
                </div>
              </CardContent>
            </Card>

          </div>
          {/* end sticky sidebar */}

        </div>
      </div>
    </div>
  )
}
