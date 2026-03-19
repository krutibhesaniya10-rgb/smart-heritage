export type DateParts = { y: number; m: number; d: number }

export function parseYmd(ymd: string): DateParts {
  const [y, m, d] = ymd.split("-").map((p) => Number(p))
  if (!y || !m || !d) throw new Error(`Invalid YYYY-MM-DD: ${ymd}`)
  return { y, m, d }
}

export function toYmd(parts: DateParts): string {
  const mm = String(parts.m).padStart(2, "0")
  const dd = String(parts.d).padStart(2, "0")
  return `${parts.y}-${mm}-${dd}`
}

export function compareDateParts(a: DateParts, b: DateParts): number {
  if (a.y !== b.y) return a.y - b.y
  if (a.m !== b.m) return a.m - b.m
  return a.d - b.d
}

export function isBetweenInclusive(x: DateParts, start: DateParts, end: DateParts): boolean {
  return compareDateParts(x, start) >= 0 && compareDateParts(x, end) <= 0
}

export function addDays(parts: DateParts, days: number): DateParts {
  const dt = new Date(parts.y, parts.m - 1, parts.d)
  dt.setDate(dt.getDate() + days)
  return { y: dt.getFullYear(), m: dt.getMonth() + 1, d: dt.getDate() }
}

export function dayOfWeek(parts: DateParts): number {
  const dt = new Date(parts.y, parts.m - 1, parts.d)
  return dt.getDay()
}

export function todayLocalParts(): DateParts {
  const now = new Date()
  return { y: now.getFullYear(), m: now.getMonth() + 1, d: now.getDate() }
}

export function formatDateShort(ymd: string): string {
  const { y, m, d } = parseYmd(ymd)
  const dt = new Date(y, m - 1, d)
  return dt.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
}
