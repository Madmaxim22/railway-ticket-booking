export function routeDateTimeToDate(value: number): Date {
  if (!value) return new Date(NaN)
  return new Date(value < 1e12 ? value * 1000 : value)
}

export function formatRouteTime(value: number): string {
  const d = routeDateTimeToDate(value)
  if (Number.isNaN(d.getTime())) return '—'
  return d.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
}

/** Длительность: минуты или секунды (если значение большое — считаем секундами). */
export function formatRouteDuration(raw: number): string {
  if (!Number.isFinite(raw) || raw < 0) return '—'
  const minutes = raw > 10_000 ? Math.round(raw / 60) : Math.round(raw)
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return `${h}:${String(m).padStart(2, '0')}`
}

export function formatRoutePrice(value: number): string {
  return new Intl.NumberFormat('ru-RU').format(value)
}
