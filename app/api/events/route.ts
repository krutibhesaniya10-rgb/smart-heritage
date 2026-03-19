import { NextResponse } from "next/server"
import { heritagePlaces } from "@/lib/heritage-data"
import { todayLocalParts, toYmd } from "@/lib/events/date-utils"
import { eventHasOccurrenceInMonth, getDateLabel, nextOccurrenceOnOrAfter } from "@/lib/events/recurrence"
import { heritageEventsSeed } from "@/lib/events/seed"
import type { EventsApiItem, IndianState } from "@/lib/events/types"

function isIndianState(v: string | null): v is IndianState {
  return v === "Gujarat" || v === "Rajasthan"
}

export async function GET(request: Request) {
  const url = new URL(request.url)

  const id = url.searchParams.get("id") ?? undefined
  const monthRaw = url.searchParams.get("month")
  const month = monthRaw ? Number(monthRaw) : undefined
  const stateRaw = url.searchParams.get("state")
  const state = isIndianState(stateRaw) ? stateRaw : undefined
  const upcomingRaw = url.searchParams.get("upcoming")
  const upcoming = upcomingRaw === null ? true : upcomingRaw === "1" || upcomingRaw.toLowerCase() === "true"
  const sort = (url.searchParams.get("sort") as "nearest" | "startDate" | null) ?? "nearest"

  const today = todayLocalParts()
  const todayYmd = toYmd(today)

  const events = heritageEventsSeed
    .filter((e) => (id ? e.id === id : true))
    .filter((e) => (state ? e.state === state : true))
    .filter((e) => (month ? eventHasOccurrenceInMonth(e, today.y, month) : true))
    .map((e): EventsApiItem => {
      const place = heritagePlaces.find((p) => p.id === e.placeId)

      const fromYmd = upcoming
        ? todayYmd
        : month
          ? `${today.y}-${String(month).padStart(2, "0")}-01`
          : todayYmd

      const nextOccursOn = upcoming
        ? nextOccurrenceOnOrAfter(e, fromYmd, { month, year: today.y })
        : nextOccurrenceOnOrAfter(e, fromYmd, { month, year: today.y })

      return {
        ...e,
        imageUrl: e.imageUrl ?? place?.image,
        placeName: e.placeName || place?.name || e.placeId,
        nextOccursOn,
        dateLabel: getDateLabel(e),
      }
    })
    .filter((e) => (upcoming ? Boolean(e.nextOccursOn) : true))

  const sorted = [...events].sort((a, b) => {
    if (sort === "startDate") return a.startDate.localeCompare(b.startDate)

    const ad = a.nextOccursOn ?? "9999-12-31"
    const bd = b.nextOccursOn ?? "9999-12-31"
    const cmp = ad.localeCompare(bd)
    if (cmp !== 0) return cmp
    return a.name.localeCompare(b.name)
  })

  return NextResponse.json(sorted)
}
