import type { RoutesQueryParams } from '@/store/api/routesQueryParams.types'
import { splitRoutesQueryPatch } from '@/store/splitRoutesQueryPatch'
import type { FiltersState } from '@/store/slices/filtersSlice'
import type { SearchState } from '@/store/slices/searchSlice'
import type { TrainsState } from '@/store/slices/trainsSlice'

/** Короткие ключи в адресной строке для основного поиска */
const SEARCH_SHORT_TO_API: Record<string, keyof SearchState> = {
  from: 'from_city_id',
  to: 'to_city_id',
  date: 'date_start',
  return: 'date_end',
}

/** Поля поиска, которые попадают в query API и в URL (без UI-подписей городов). */
type SearchUrlApiKey = 'from_city_id' | 'to_city_id' | 'date_start' | 'date_end'

const SEARCH_API_TO_SHORT: Record<SearchUrlApiKey, string> = {
  from_city_id: 'from',
  to_city_id: 'to',
  date_start: 'date',
  date_end: 'return',
}

/** Опциональные подписи городов только для UI шапки (не уходят в API) */
export const CITY_NAME_URL_KEYS = {
  fromName: 'fromName',
  toName: 'toName',
} as const

export type BookingSearchCityLabels = {
  fromName?: string
  toName?: string
}

const TRAINS_DEFAULTS: TrainsState = {
  sort: 'date',
  limit: 5,
  offset: 0,
}

const FILTER_PARAM_KEYS = new Set<keyof RoutesQueryParams>([
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
])

function parseBooleanParam(value: string): boolean | undefined {
  if (value === 'true') return true
  if (value === 'false') return false
  return undefined
}

function parseNumberParam(value: string): number | undefined {
  const n = Number(value)
  return Number.isFinite(n) ? n : undefined
}

function appendIfPresent(params: URLSearchParams, key: string, value: string | undefined) {
  const trimmed = value?.trim()
  if (!trimmed) return
  params.set(key, trimmed)
}

/**
 * Парсит query страницы бронирования в патчи слайсов search / filters / trains.
 */
export function parseBookingSearchUrl(searchParams: URLSearchParams): {
  search: Partial<SearchState>
  filters: Partial<FiltersState>
  trains: Partial<TrainsState>
  cityLabels: BookingSearchCityLabels
} {
  const search: Partial<SearchState> = {}
  const filters: Partial<FiltersState> = {}
  const trains: Partial<TrainsState> = {}
  const cityLabels: BookingSearchCityLabels = {}

  for (const [shortKey, apiKey] of Object.entries(SEARCH_SHORT_TO_API)) {
    const value = searchParams.get(shortKey)?.trim()
    if (value) {
      search[apiKey] = value
    }
  }

  const fromName = searchParams.get(CITY_NAME_URL_KEYS.fromName)?.trim()
  const toName = searchParams.get(CITY_NAME_URL_KEYS.toName)?.trim()
  if (fromName) cityLabels.fromName = fromName
  if (toName) cityLabels.toName = toName

  const sort = searchParams.get('sort')?.trim()
  if (sort === 'date' || sort === 'price' || sort === 'duration') {
    trains.sort = sort
  }

  const limit = searchParams.get('limit')
  if (limit != null) {
    const parsed = parseNumberParam(limit)
    if (parsed !== undefined) trains.limit = parsed
  }

  const offset = searchParams.get('offset')
  if (offset != null) {
    const parsed = parseNumberParam(offset)
    if (parsed !== undefined) trains.offset = parsed
  }

  for (const key of FILTER_PARAM_KEYS) {
    const raw = searchParams.get(key)
    if (raw == null || raw.trim() === '') continue

    if (key.startsWith('have_')) {
      const bool = parseBooleanParam(raw)
      if (bool !== undefined) {
        ;(filters as Record<string, unknown>)[key] = bool
      }
      continue
    }

    const num = parseNumberParam(raw)
    if (num !== undefined) {
      ;(filters as Record<string, unknown>)[key] = num
    }
  }

  return { search, filters, trains, cityLabels }
}

export function hasBookingSearchInUrl(searchParams: URLSearchParams): boolean {
  return (
    Boolean(searchParams.get('from')?.trim()) &&
    Boolean(searchParams.get('to')?.trim())
  )
}

/**
 * Собирает query для адресной строки из параметров маршрутов и подписей городов.
 */
export function buildBookingSearchUrl(
  params: RoutesQueryParams,
  cityLabels?: BookingSearchCityLabels,
): string {
  const urlParams = new URLSearchParams()

  for (const apiKey of Object.keys(SEARCH_API_TO_SHORT) as SearchUrlApiKey[]) {
    const shortKey = SEARCH_API_TO_SHORT[apiKey]
    const value = params[apiKey]
    if (typeof value === 'string' && value.trim()) {
      urlParams.set(shortKey, value.trim())
    }
  }

  appendIfPresent(urlParams, CITY_NAME_URL_KEYS.fromName, cityLabels?.fromName)
  appendIfPresent(urlParams, CITY_NAME_URL_KEYS.toName, cityLabels?.toName)

  if (params.sort && params.sort !== TRAINS_DEFAULTS.sort) {
    urlParams.set('sort', params.sort)
  }
  if (params.limit !== undefined && params.limit !== TRAINS_DEFAULTS.limit) {
    urlParams.set('limit', String(params.limit))
  }
  if (params.offset !== undefined && params.offset !== TRAINS_DEFAULTS.offset) {
    urlParams.set('offset', String(params.offset))
  }

  for (const key of FILTER_PARAM_KEYS) {
    const value = params[key]
    if (value === undefined || value === null) continue
    if (typeof value === 'boolean') {
      urlParams.set(key, value ? 'true' : 'false')
    } else {
      urlParams.set(key, String(value))
    }
  }

  const qs = urlParams.toString()
  return qs ? `?${qs}` : ''
}

/** Применяет patch к RoutesQueryParams (для тестов и согласованности с splitRoutesQueryPatch). */
export function routesQueryPatchFromUrl(searchParams: URLSearchParams): Partial<RoutesQueryParams> {
  const { search, filters, trains } = parseBookingSearchUrl(searchParams)
  return {
    ...search,
    ...filters,
    ...trains,
  }
}

export function applyUrlPatchToSlices(patch: Partial<RoutesQueryParams>) {
  return splitRoutesQueryPatch(patch)
}
