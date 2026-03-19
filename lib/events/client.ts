import type { EventsApiItem, EventsApiQuery } from "@/lib/events/types"

function toQueryString(query: EventsApiQuery): string {
  const params = new URLSearchParams()
  if (query.id) params.set("id", query.id)
  if (query.month) params.set("month", String(query.month))
  if (query.state && query.state !== "All") params.set("state", query.state)
  if (typeof query.upcoming === "boolean") params.set("upcoming", query.upcoming ? "1" : "0")
  if (query.sort) params.set("sort", query.sort)
  const qs = params.toString()
  return qs ? `?${qs}` : ""
}

export async function fetchEvents(query: EventsApiQuery): Promise<EventsApiItem[]> {
  const base = process.env.NEXT_PUBLIC_EVENTS_API_URL || "/api/events"
  const res = await fetch(`${base}${toQueryString(query)}`, { cache: "no-store" })
  if (!res.ok) throw new Error(`Failed to load events (${res.status})`)
  const data = await res.json()
  return Array.isArray(data) ? (data as EventsApiItem[]) : ([data] as EventsApiItem[])
}

export async function fetchEventById(id: string): Promise<EventsApiItem | null> {
  const items = await fetchEvents({ id, upcoming: false })
  return items[0] ?? null
}
