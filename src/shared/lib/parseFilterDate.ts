/** Приводит значение даты из параметров маршрута к `Date` для полей ввода. */
export function parseFilterDate(value: string | Date | undefined): Date | null {
  if (value === undefined) return null
  if (value instanceof Date) return Number.isNaN(value.getTime()) ? null : value
  const d = new Date(value)
  return Number.isNaN(d.getTime()) ? null : d
}
