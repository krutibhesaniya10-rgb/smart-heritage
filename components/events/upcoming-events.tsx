"use client"

import { useEffect, useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Calendar, MapPin, Star, Loader2, ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { fetchEvents } from "@/lib/events/client"
import { formatDateShort } from "@/lib/events/date-utils"
import type { EventsApiItem, IndianState } from "@/lib/events/types"

const monthOptions: { value: string; label: string }[] = [
  { value: "all", label: "All months" },
  { value: "3", label: "March" },
  { value: "4", label: "April" },
  { value: "5", label: "May" },
  { value: "6", label: "June" },
]

const stateOptions: { value: string; label: string }[] = [
  { value: "All", label: "All states" },
  { value: "Gujarat", label: "Gujarat" },
  { value: "Rajasthan", label: "Rajasthan" },
]

function festivalBadgeLabel(event: EventsApiItem): string {
  if (!event.isFestival) return "Festival"
  if (event.festivalKey === "ram_navami") return "Ram Navami"
  if (event.festivalKey === "mahashivratri") return "Mahashivratri"
  return "Festival"
}

export default function UpcomingEvents() {
  const [month, setMonth] = useState<string>("all")
  const [stateFilter, setStateFilter] = useState<"All" | IndianState>("All")
  const [upcomingOnly, setUpcomingOnly] = useState(true)

  const [items, setItems] = useState<EventsApiItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    const run = async () => {
      try {
        setIsLoading(true)
        setError(null)

        const data = await fetchEvents({
          month: month === "all" ? undefined : Number(month),
          state: stateFilter,
          upcoming: upcomingOnly,
          sort: "nearest",
        })

        if (cancelled) return
        setItems(data)
      } catch (e) {
        if (cancelled) return
        setError(e instanceof Error ? e.message : "Failed to load events")
        setItems([])
      } finally {
        if (!cancelled) setIsLoading(false)
      }
    }

    run()
    return () => {
      cancelled = true
    }
  }, [month, stateFilter, upcomingOnly])

  const events = useMemo(() => {
    // Defensive client-side sort (in case backend doesn’t sort)
    return [...items].sort((a, b) => {
      const ad = a.nextOccursOn ?? "9999-12-31"
      const bd = b.nextOccursOn ?? "9999-12-31"
      const cmp = ad.localeCompare(bd)
      if (cmp !== 0) return cmp
      return a.name.localeCompare(b.name)
    })
  }, [items])

  return (
    <section className="px-6 py-8 md:py-12">
      <div className="max-w-7xl mx-auto">
        {/* Filters */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full lg:max-w-3xl">
            <div className="space-y-2">
              <Label>Month</Label>
              <Select value={month} onValueChange={setMonth}>
                <SelectTrigger>
                  <SelectValue placeholder="Select month" />
                </SelectTrigger>
                <SelectContent>
                  {monthOptions.map((m) => (
                    <SelectItem key={m.value} value={m.value}>
                      {m.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>State</Label>
              <Select value={stateFilter} onValueChange={(v) => setStateFilter(v === "Gujarat" || v === "Rajasthan" ? v : "All")}>
                <SelectTrigger>
                  <SelectValue placeholder="Select state" />
                </SelectTrigger>
                <SelectContent>
                  {stateOptions.map((s) => (
                    <SelectItem key={s.value} value={s.value}>
                      {s.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-3 sm:justify-end sm:pb-1">
              <Switch checked={upcomingOnly} onCheckedChange={setUpcomingOnly} id="upcoming-only" />
              <Label htmlFor="upcoming-only">Upcoming only</Label>
            </div>
          </div>

          <div className="text-sm text-muted-foreground">
            {isLoading ? "Loading…" : `${events.length} event${events.length === 1 ? "" : "s"}`}
          </div>
        </div>

        {/* State */}
        {error ? (
          <div className="rounded-lg border p-6 text-sm text-destructive bg-destructive/5">
            {error}
          </div>
        ) : isLoading ? (
          <div className="flex items-center justify-center py-16 text-muted-foreground">
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Loading upcoming events
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-20">
            <Calendar className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No events found</h3>
            <p className="text-muted-foreground">Try changing the month or state filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <Card
                key={event.id}
                className={`group h-full overflow-hidden rounded-2xl gap-0 p-0 ${
                  event.isFestival ? "ring-1 ring-heritage-clay/40" : ""
                }`}
              >
                <div className="relative h-56 md:h-64">
                  {event.imageUrl ? (
                    <Image
                      src={event.imageUrl}
                      alt={event.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500 ease-in-out"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-muted" />
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />

                  <div className="absolute top-4 left-4 flex gap-2">
                    {event.isFestival ? (
                      <Badge className="bg-heritage-clay text-primary-foreground">
                        <Star className="w-3.5 h-3.5 mr-1" />
                        {festivalBadgeLabel(event)}
                      </Badge>
                    ) : null}
                    <Badge variant="secondary" className="bg-primary-foreground/15 text-primary-foreground">
                      {event.state}
                    </Badge>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-primary-foreground line-clamp-1">
                      {event.name}
                    </h3>
                    <div className="text-primary-foreground/85 text-sm flex items-center gap-2 mt-2">
                      <MapPin className="w-4 h-4" />
                      <Link
                        href={`/heritage/${event.placeId}`}
                        className="hover:underline underline-offset-4 line-clamp-1"
                        title={event.placeName}
                      >
                        {event.placeName}
                      </Link>
                    </div>
                  </div>
                </div>

                <CardContent className="p-6 flex flex-1 flex-col space-y-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4 text-heritage-clay" />
                    <span className="font-medium text-foreground">
                      {event.nextOccursOn ? formatDateShort(event.nextOccursOn) : "—"}
                    </span>
                    <span className="text-muted-foreground">• {event.dateLabel}</span>
                  </div>

                  <p className="text-base text-muted-foreground leading-relaxed line-clamp-3">{event.description}</p>

                  <div className="flex gap-3 pt-2 mt-auto">
                    <Button asChild className="flex-1 bg-primary hover:bg-primary/90">
                      <Link href={`/events/${event.id}`}>
                        View Details
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>

                    <Button asChild variant="outline" className="whitespace-nowrap">
                      <Link href={`/trip-planner?addPlaceId=${encodeURIComponent(event.placeId)}`}>
                        Add to Trip Planner
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
