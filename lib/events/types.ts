export type IndianState = "Gujarat" | "Rajasthan"

export type RecurrenceType = "single" | "range" | "daily" | "weekly" | "weekend"

export type HeritageEvent = {
  id: string
  name: string
  description: string
  state: IndianState

  placeId: string
  placeName: string

  startDate: string // YYYY-MM-DD
  endDate?: string // YYYY-MM-DD

  recurrence: RecurrenceType
  /** Used for `weekly` (0=Sun..6=Sat). For `weekend`, DOW is implicit. */
  daysOfWeek?: number[]

  imageUrl?: string
  organizer?: string

  isFestival?: boolean
  festivalKey?: string
}

export type EventsApiQuery = {
  id?: string
  month?: number // 1-12
  state?: IndianState | "All"
  upcoming?: boolean
  sort?: "nearest" | "startDate"
}

export type EventsApiItem = HeritageEvent & {
  /** Nearest upcoming date within query constraints (YYYY-MM-DD) */
  nextOccursOn: string | null
  /** Human-friendly summary (e.g., "Every Sunday (Mar–Jun)") */
  dateLabel: string
}

