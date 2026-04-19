/** Неделя с понедельника: индекс колонки 0–6 (пн–вс). */
export function getMondayFirstColumnIndex(date) {
  return (date.getDay() + 6) % 7
}

/**
 * Ячейки календаря для отображаемого месяца (year, month 0–11).
 * Включает дни до/после для полных недель.
 */
export function buildMonthCells(viewYear, viewMonth) {
  const first = new Date(viewYear, viewMonth, 1)
  const daysInCurrent = new Date(viewYear, viewMonth + 1, 0).getDate()
  const leading = getMondayFirstColumnIndex(first)

  const prevMonth = viewMonth === 0 ? 11 : viewMonth - 1
  const prevYear = viewMonth === 0 ? viewYear - 1 : viewYear
  const daysInPrev = new Date(viewYear, viewMonth, 0).getDate()

  const cells = []

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
]

export function formatDateRu(date) {
  if (!date) return ''
  const d = String(date.getDate()).padStart(2, '0')
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const y = date.getFullYear()
  return `${d}.${m}.${y}`
}

export function isSameCalendarDay(a, b) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

/** Начало текущих суток по локальному времени. */
export function startOfToday() {
  const n = new Date()
  return new Date(n.getFullYear(), n.getMonth(), n.getDate())
}

/** Сравнение только календарных дат (без времени). */
export function isCalendarDayBefore(a, b) {
  const da = new Date(a.getFullYear(), a.getMonth(), a.getDate())
  const db = new Date(b.getFullYear(), b.getMonth(), b.getDate())
  return da < db
}
