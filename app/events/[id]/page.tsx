"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Calendar, MapPin, ArrowLeft, Loader2, Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { formatDateShort } from "@/lib/events/date-utils"
import { fetchEventById } from "@/lib/events/client"
import type { EventsApiItem } from "@/lib/events/types"

function festivalLabel(event: EventsApiItem): string {
  if (!event.isFestival) return "Festival"
  if (event.festivalKey === "ram_navami") return "Ram Navami"
  if (event.festivalKey === "mahashivratri") return "Mahashivratri"
  return "Festival"
}

export default function EventDetailsPage() {
  const params = useParams<{ id: string }>()
  const id = params?.id

  const [event, setEvent] = useState<EventsApiItem | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    const run = async () => {
      if (!id) return
      try {
        setIsLoading(true)
        setError(null)
        const item = await fetchEventById(String(id))
        if (cancelled) return
        setEvent(item)
      } catch (e) {
        if (cancelled) return
        setError(e instanceof Error ? e.message : "Failed to load event")
      } finally {
        if (!cancelled) setIsLoading(false)
      }
    }

    run()
    return () => {
      cancelled = true
    }
  }, [id])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
        Loading event
      </div>
    )
  }

  if (error || !event) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-10">
          <Button asChild variant="outline" className="mb-6">
            <Link href="/events">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Events
            </Link>
          </Button>

          <div className="rounded-lg border p-6 text-sm bg-muted/30">{error ?? "Event not found."}</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-10">
        <Button asChild variant="outline" className="mb-6">
          <Link href="/events">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Events
          </Link>
        </Button>

        <Card className="overflow-hidden">
          <div className="relative h-64 md:h-80">
            {event.imageUrl ? (
              <Image src={event.imageUrl} alt={event.name} fill className="object-cover" priority />
            ) : (
              <div className="absolute inset-0 bg-muted" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />

            <div className="absolute top-5 left-5 flex gap-2">
              <Badge variant="secondary">{event.state}</Badge>
              {event.isFestival ? (
                <Badge className="bg-heritage-clay text-primary-foreground">
                  <Star className="w-3.5 h-3.5 mr-1" />
                  {festivalLabel(event)}
                </Badge>
              ) : null}
            </div>

            <div className="absolute bottom-5 left-5 right-5">
              <h1 className="text-2xl md:text-3xl font-bold text-foreground text-balance">{event.name}</h1>
              <div className="mt-2 flex flex-col sm:flex-row sm:items-center gap-2 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-heritage-clay" />
                  <span className="text-sm">
                    {event.nextOccursOn ? formatDateShort(event.nextOccursOn) : formatDateShort(event.startDate)}
                  </span>
                  <span className="text-sm">• {event.dateLabel}</span>
                </div>
                <div className="hidden sm:block">•</div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-heritage-clay" />
                  <Link href={`/heritage/${event.placeId}`} className="text-sm hover:underline underline-offset-4">
                    {event.placeName}
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <CardContent className="p-6 md:p-8">
            <p className="text-muted-foreground leading-relaxed mb-6">{event.description}</p>

            {event.organizer ? (
              <div className="text-sm text-muted-foreground mb-6">
                <span className="font-medium text-foreground">Organized by:</span> {event.organizer}
              </div>
            ) : null}

            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild className="bg-primary hover:bg-primary/90">
                <Link href={`/trip-planner?addPlaceId=${encodeURIComponent(event.placeId)}`}>Add to Trip Planner</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href={`/heritage/${event.placeId}`}>View Place</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}