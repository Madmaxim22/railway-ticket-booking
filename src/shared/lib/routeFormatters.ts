import { formatDateLocalHHMM } from './formatUnixSecondsToHHMM'

export function routeDateTimeToDate(value: number): Date {
  if (!value) return new Date(NaN)
  return new Date(value < 1e12 ? value * 1000 : value)
}

export function formatRouteTime(value: number): string {
  return formatDateLocalHHMM(routeDateTimeToDate(value))
}

/** Длительность поездки в секундах → «Ч:ММ» (часы и минуты). */
export function formatRouteDuration(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return '—'
  const totalMinutes = Math.round(seconds / 60)
  const h = Math.floor(totalMinutes / 60)
  const m = totalMinutes % 60
  return `${h}:${String(m).padStart(2, '0')}`
}

export function formatRoutePrice(value: number): string {
  return new Intl.NumberFormat('ru-RU').format(value)
}
