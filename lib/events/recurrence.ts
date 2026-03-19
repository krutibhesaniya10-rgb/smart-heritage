import { addDays, compareDateParts, dayOfWeek, isBetweenInclusive, parseYmd, toYmd, type DateParts } from "@/lib/events/date-utils"
import type { HeritageEvent } from "@/lib/events/types"

function monthRange(year: number, month: number): { start: DateParts; end: DateParts } {
  const start = { y: year, m: month, d: 1 }
  const endDt = new Date(year, month, 0) // month is 1-based; day 0 gives last day of previous month
  const end = { y: endDt.getFullYear(), m: endDt.getMonth() + 1, d: endDt.getDate() }
  return { start, end }
}

export function getDateLabel(event: HeritageEvent): string {
  const start = parseYmd(event.startDate)
  const end = event.endDate ? parseYmd(event.endDate) : undefined

  const startMon = new Date(start.y, start.m - 1, start.d).toLocaleDateString("en-US", { month: "short" })
  const endMon = end ? new Date(end.y, end.m - 1, end.d).toLocaleDateString("en-US", { month: "short" }) : undefined

  switch (event.recurrence) {
    case "single":
      return event.isFestival ? "Festival day" : "One-day event"
    case "range":
      return endMon ? `${startMon}-${endMon} ${start.y}` : `${startMon} ${start.y}`
    case "daily":
      return endMon ? `Daily (${startMon}-${endMon})` : `Daily (${startMon})`
    case "weekend":
      return endMon ? `Weekends (${startMon}-${endMon})` : `Weekends (${startMon})`
    case "weekly": {
      const days = event.daysOfWeek?.length ? event.daysOfWeek : [0]
      const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
      const dayLabel = days.map((d) => dayNames[d] ?? "?").join(", ")
      return endMon ? `${dayLabel} (${startMon}-${endMon})` : `${dayLabel} (${startMon})`
    }
    default:
      return startMon
  }
}

export function eventHasOccurrenceInMonth(event: HeritageEvent, year: number, month: number): boolean {
  const { start: mStart, end: mEnd } = monthRange(year, month)
  const eStart = parseYmd(event.startDate)
  const eEnd = event.endDate ? parseYmd(event.endDate) : eStart

  // Any overlap with month window at all?
  const overlap = compareDateParts(eStart, mEnd) <= 0 && compareDateParts(eEnd, mStart) >= 0
  if (!overlap) return false

  if (event.recurrence === "single") {
    return compareDateParts(eStart, mStart) >= 0 && compareDateParts(eStart, mEnd) <= 0
  }
  if (event.recurrence === "range" || event.recurrence === "daily") return true

  const wantDays = event.recurrence === "weekend" ? [0, 6] : (event.daysOfWeek ?? [])
  if (!wantDays.length) return true

  // Find at least one matching weekday in the overlapping window.
  let cursor: DateParts = compareDateParts(eStart, mStart) > 0 ? eStart : mStart
  const last = compareDateParts(eEnd, mEnd) < 0 ? eEnd : mEnd
  for (let i = 0; i < 62; i++) {
    if (compareDateParts(cursor, last) > 0) break
    if (wantDays.includes(dayOfWeek(cursor))) return true
    cursor = addDays(cursor, 1)
  }
  return false
}

export function nextOccurrenceOnOrAfter(
  event: HeritageEvent,
  fromYmd: string,
  opts?: { month?: number; year?: number }
): string | null {
  const from = parseYmd(fromYmd)
  const eStart = parseYmd(event.startDate)
  const eEnd = event.endDate ? parseYmd(event.endDate) : eStart

  const year = opts?.year ?? from.y
  const month = opts?.month
  const monthWindow = month ? monthRange(year, month) : null

  const clampStart = (p: DateParts): DateParts => {
    let c = p
    if (compareDateParts(c, eStart) < 0) c = eStart
    if (monthWindow && compareDateParts(c, monthWindow.start) < 0) c = monthWindow.start
    return c
  }

  const clampEnd = (): DateParts => {
    let c = eEnd
    if (monthWindow && compareDateParts(c, monthWindow.end) > 0) c = monthWindow.end
    return c
  }

  const endLimit = clampEnd()

  if (event.recurrence === "single") {
    const d = eStart
    if (monthWindow && (compareDateParts(d, monthWindow.start) < 0 || compareDateParts(d, monthWindow.end) > 0)) return null
    if (compareDateParts(d, from) < 0) return null
    return toYmd(d)
  }

  if (event.recurrence === "range") {
    // If it's ongoing, next occurrence is today.
    if (isBetweenInclusive(from, eStart, eEnd)) {
      const today = monthWindow ? clampStart(from) : from
      if (compareDateParts(today, endLimit) <= 0) return toYmd(today)
      return null
    }
    const start = clampStart(eStart)
    if (compareDateParts(start, from) < 0) return null
    if (compareDateParts(start, endLimit) > 0) return null
    return toYmd(start)
  }

  if (event.recurrence === "daily") {
    const start = clampStart(from)
    if (compareDateParts(start, endLimit) > 0) return null
    return toYmd(start)
  }

  const wantDays = event.recurrence === "weekend" ? [0, 6] : (event.daysOfWeek ?? [])
  const start = clampStart(from)

  if (!wantDays.length) {
    if (compareDateParts(start, endLimit) > 0) return null
    return toYmd(start)
  }

  let cursor = start
  for (let i = 0; i < 370; i++) {
    if (compareDateParts(cursor, endLimit) > 0) return null
    if (compareDateParts(cursor, eStart) >= 0 && compareDateParts(cursor, eEnd) <= 0) {
      if (wantDays.includes(dayOfWeek(cursor))) return toYmd(cursor)
    }
    cursor = addDays(cursor, 1)
  }

  return null
}