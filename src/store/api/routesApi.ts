import { baseApi } from './baseApi'

export type RouteSort = 'date' | 'price' | 'duration'

export type RoutesSearchParams = {
  from_city_id: string
  to_city_id: string
  date_start?: string
  date_end?: string
  date_start_arrival?: string
  date_end_arrival?: string
  have_first_class?: boolean
  have_second_class?: boolean
  have_third_class?: boolean
  have_fourth_class?: boolean
  have_wifi?: boolean
  have_air_conditioning?: boolean
  have_express?: boolean
  price_from?: number
  price_to?: number
  start_departure_hour_from?: number
  start_departure_hour_to?: number
  start_arrival_hour_from?: number
  start_arrival_hour_to?: number
  end_departure_hour_from?: number
  end_departure_hour_to?: number
  end_arrival_hour_from?: number
  end_arrival_hour_to?: number
  limit?: number
  offset?: number
  sort?: RouteSort
}

export type CityRef = {
  _id: string
  name: string
}

export type RouteEndpoint = {
  railway_station_name: string
  city: CityRef
  datetime: number
}

export type TrainRef = {
  _id: string
  name: string
}

export type ClassPriceInfo = {
  price: number
  top_price: number
  bottom_price: number
  side_price: number
  linens_price: number
  wifi_price: number
}

export type PriceInfo = {
  first: ClassPriceInfo
  second: ClassPriceInfo
  third: ClassPriceInfo
  fourth: ClassPriceInfo
}

export type SeatsInfo = {
  first: number
  second: number
  third: number
  fourth: number
}

export type RouteSegment = {
  _id: string
  have_first_class: boolean
  have_second_class: boolean
  have_third_class: boolean
  have_fourth_class: boolean
  have_wifi: boolean
  have_air_conditioning: boolean
  train: TrainRef
  from: RouteEndpoint
  to: RouteEndpoint
  min_price: number
  duration: number
  price_info: PriceInfo
  seats_info: SeatsInfo
}

export type RouteDirectionItem = {
  have_first_class: boolean
  have_second_class: boolean
  have_third_class: boolean
  have_fourth_class: boolean
  have_wifi: boolean
  have_air_conditioning: boolean
  is_express: boolean
  min_price: number
  arrival: RouteSegment
  departure: RouteSegment
  total_avaliable_seats: number
}

export type RoutesSearchResponse = {
  total_count: number
  items: RouteDirectionItem[]
}

function appendSearchParam(
  search: URLSearchParams,
  key: string,
  value: string | number | boolean,
) {
  search.append(key, String(value))
}

export function buildRoutesSearchQuery(params: RoutesSearchParams): string {
  const search = new URLSearchParams()
  appendSearchParam(search, 'from_city_id', params.from_city_id)
  appendSearchParam(search, 'to_city_id', params.to_city_id)

  const optionalEntries: [string, string | number | boolean | undefined][] = [
    ['date_start', params.date_start],
    ['date_end', params.date_end],
    ['date_start_arrival', params.date_start_arrival],
    ['date_end_arrival', params.date_end_arrival],
    ['have_first_class', params.have_first_class],
    ['have_second_class', params.have_second_class],
    ['have_third_class', params.have_third_class],
    ['have_fourth_class', params.have_fourth_class],
    ['have_wifi', params.have_wifi],
    ['have_air_conditioning', params.have_air_conditioning],
    ['have_express', params.have_express],
    ['price_from', params.price_from],
    ['price_to', params.price_to],
    ['start_departure_hour_from', params.start_departure_hour_from],
    ['start_departure_hour_to', params.start_departure_hour_to],
    ['start_arrival_hour_from', params.start_arrival_hour_from],
    ['start_arrival_hour_to', params.start_arrival_hour_to],
    ['end_departure_hour_from', params.end_departure_hour_from],
    ['end_departure_hour_to', params.end_departure_hour_to],
    ['end_arrival_hour_from', params.end_arrival_hour_from],
    ['end_arrival_hour_to', params.end_arrival_hour_to],
    ['limit', params.limit],
    ['offset', params.offset],
    ['sort', params.sort],
  ]

  for (const [key, value] of optionalEntries) {
    if (value === undefined || value === null || value === '') continue
    appendSearchParam(search, key, value)
  }

  const qs = search.toString()
  return qs ? `?${qs}` : ''
}

export function routesParamsFromSearchParams(
  searchParams: URLSearchParams,
): Partial<RoutesSearchParams> & Pick<RoutesSearchParams, 'from_city_id' | 'to_city_id'> {
  const getStr = (key: string) => {
    const v = searchParams.get(key)
    return v === null || v === '' ? undefined : v
  }
  const getNum = (key: string) => {
    const v = searchParams.get(key)
    if (v === null || v === '') return undefined
    const n = Number(v)
    return Number.isFinite(n) ? n : undefined
  }
  const getBool = (key: string) => {
    const v = searchParams.get(key)
    if (v === null) return undefined
    if (v === 'true') return true
    if (v === 'false') return false
    return undefined
  }

  const sortRaw = searchParams.get('sort')
  const sort: RouteSort | undefined =
    sortRaw === 'date' || sortRaw === 'price' || sortRaw === 'duration'
      ? sortRaw
      : undefined

  return {
    from_city_id: searchParams.get('from_city_id') ?? '',
    to_city_id: searchParams.get('to_city_id') ?? '',
    date_start: getStr('date_start'),
    date_end: getStr('date_end'),
    date_start_arrival: getStr('date_start_arrival'),
    date_end_arrival: getStr('date_end_arrival'),
    have_first_class: getBool('have_first_class'),
    have_second_class: getBool('have_second_class'),
    have_third_class: getBool('have_third_class'),
    have_fourth_class: getBool('have_fourth_class'),
    have_wifi: getBool('have_wifi'),
    have_air_conditioning: getBool('have_air_conditioning'),
    have_express: getBool('have_express'),
    price_from: getNum('price_from'),
    price_to: getNum('price_to'),
    start_departure_hour_from: getNum('start_departure_hour_from'),
    start_departure_hour_to: getNum('start_departure_hour_to'),
    start_arrival_hour_from: getNum('start_arrival_hour_from'),
    start_arrival_hour_to: getNum('start_arrival_hour_to'),
    end_departure_hour_from: getNum('end_departure_hour_from'),
    end_departure_hour_to: getNum('end_departure_hour_to'),
    end_arrival_hour_from: getNum('end_arrival_hour_from'),
    end_arrival_hour_to: getNum('end_arrival_hour_to'),
    limit: getNum('limit'),
    offset: getNum('offset'),
    sort,
  }
}

export const routesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    searchRoutes: builder.query<RoutesSearchResponse, RoutesSearchParams>({
      query: (params) => ({
        url: `/routes${buildRoutesSearchQuery(params)}`,
      }),
    }),
  }),
})

export const { useSearchRoutesQuery } = routesApi
