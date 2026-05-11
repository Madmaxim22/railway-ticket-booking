/**
 * Сериализация `RoutesQueryParams` в строку query для GET /routes.
 * Порядок ключей фиксирован — предсказуемый URL и единообразие с кэшем RTK Query.
 */
import { formatApiDate } from '@/shared/lib/formatApiDate'
import type { RoutesQueryParams } from './routesQueryParams.types'

/** Ключи в порядке добавления в URL (совпадает с полями запроса к API). */
const QUERY_KEYS: (keyof RoutesQueryParams)[] = [
  'from_city_id',
  'to_city_id',
  'date_start',
  'date_end',
  'date_start_arrival',
  'date_end_arrival',
  'have_first_class',
  'have_second_class',
  'have_third_class',
  'have_fourth_class',
  'have_wifi',
  'have_air_conditioning',
  'have_express',
  'price_from',
  'price_to',
  'start_departure_hour_from',
  'start_departure_hour_to',
  'start_arrival_hour_from',
  'start_arrival_hour_to',
  'end_departure_hour_from',
  'end_departure_hour_to',
  'end_arrival_hour_from',
  'end_arrival_hour_to',
  'limit',
  'offset',
  'sort',
]

/** Добавляет один параметр: даты через `formatApiDate`, boolean как `"true"` / `"false"`. */
function appendSearchParam(
  searchParams: URLSearchParams,
  key: string,
  value: string | number | boolean | Date,
) {
  if (value instanceof Date) {
    searchParams.append(key, formatApiDate(value))
    return
  }
  if (typeof value === 'boolean') {
    searchParams.append(key, value ? 'true' : 'false')
    return
  }
  searchParams.append(key, String(value))
}

/**
 * Собирает `URLSearchParams` только из заданных полей; пропускает `undefined`, `null`,
 * пустые строки после trim.
 */
export function buildRoutesQueryString(params: RoutesQueryParams): string {
  const searchParams = new URLSearchParams()
  for (const key of QUERY_KEYS) {
    const raw = params[key]
    if (raw === undefined || raw === null) continue
    if (typeof raw === 'string' && raw.trim() === '') continue
    appendSearchParam(searchParams, key, raw as string | number | boolean | Date)
  }
  return searchParams.toString()
}
