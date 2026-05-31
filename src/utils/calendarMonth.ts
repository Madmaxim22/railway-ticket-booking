export type CalendarCell = {
  date: Date
  inCurrentMonth: boolean
}

/** Неделя с понедельника: индекс колонки 0–6 (пн–вс). */
export function getMondayFirstColumnIndex(date: Date): number {
  return (date.getDay() + 6) % 7
}

/**
 * Ячейки календаря для отображаемого месяца (year, month 0–11).
 * Включает дни до/после для полных недель.
 */
export function buildMonthCells(viewYear: number, viewMonth: number): CalendarCell[] {
  const first = new Date(viewYear, viewMonth, 1)
  const daysInCurrent = new Date(viewYear, viewMonth + 1, 0).getDate()
  const leading = getMondayFirstColumnIndex(first)

  const prevMonth = viewMonth === 0 ? 11 : viewMonth - 1
  const prevYear = viewMonth === 0 ? viewYear - 1 : viewYear
  const daysInPrev = new Date(viewYear, viewMonth, 0).getDate()

  const cells: CalendarCell[] = []

  for (let i = 0; i < leading; i++) {
    const day = daysInPrev - leading + i + 1
    cells.push({
      date: new Date(prevYear, prevMonth, day),
      inCurrentMonth: false,
    })
  }

  for (let day = 1; day <= daysInCurrent; day++) {
    cells.push({
      date: new Date(viewYear, viewMonth, day),
      inCurrentMonth: true,
    })
  }

  const nextMonth = viewMonth === 11 ? 0 : viewMonth + 1
  const nextYear = viewMonth === 11 ? viewYear + 1 : viewYear
  let nextDay = 1
  while (cells.length % 7 !== 0) {
    cells.push({
      date: new Date(nextYear, nextMonth, nextDay),
      inCurrentMonth: false,
    })
    nextDay += 1
  }

  return cells
}

export const MONTH_NAMES_RU = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
] as const

export const DATE_RU_FORMAT_RE = /^\d{2}\.\d{2}\.\d{4}$/

export function formatDateRu(date: Date | null | undefined): string {
  if (!date) return ''
  const d = String(date.getDate()).padStart(2, '0')
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const y = date.getFullYear()
  return `${d}.${m}.${y}`
}

/** Маска ввода дд.мм.гггг при наборе с клавиатуры. */
export function formatDateRuInput(raw: string): string {
  const digits = raw.replace(/\D/g, '').slice(0, 8)

  if (digits.length <= 2) {
    return digits
  }

  if (digits.length <= 4) {
    return `${digits.slice(0, 2)}.${digits.slice(2)}`
  }

  return `${digits.slice(0, 2)}.${digits.slice(2, 4)}.${digits.slice(4)}`
}

/** Разбор даты дд.мм.гггг; minDate — не раньше этой календарной даты. */
export function parseDateRu(text: string, options?: { minDate?: Date }): Date | null {
  const trimmed = text.trim()
  if (!trimmed) return null
  if (!DATE_RU_FORMAT_RE.test(trimmed)) return null

  const [dayRaw, monthRaw, yearRaw] = trimmed.split('.')
  const day = Number(dayRaw)
  const month = Number(monthRaw)
  const year = Number(yearRaw)

  if (month < 1 || month > 12 || day < 1 || day > 31) return null

  const parsed = new Date(year, month - 1, day)
  const isInvalidCalendarDate =
    parsed.getFullYear() !== year || parsed.getMonth() !== month - 1 || parsed.getDate() !== day

  if (isInvalidCalendarDate) return null
  if (options?.minDate && isCalendarDayBefore(parsed, options.minDate)) return null

  return parsed
}

export function isSameCalendarDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

/** Начало текущих суток по локальному времени. */
export function startOfToday(): Date {
  const n = new Date()
  return new Date(n.getFullYear(), n.getMonth(), n.getDate())
}

/** Сравнение только календарных дат (без времени). */
export function isCalendarDayBefore(a: Date, b: Date): boolean {
  const da = new Date(a.getFullYear(), a.getMonth(), a.getDate())
  const db = new Date(b.getFullYear(), b.getMonth(), b.getDate())
  return da < db
}
