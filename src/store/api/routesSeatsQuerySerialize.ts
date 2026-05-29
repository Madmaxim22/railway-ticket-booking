import type { RouteSeatsQueryParams } from './routesSeatsQueryParams.types'

const QUERY_KEYS: (keyof RouteSeatsQueryParams)[] = [
  'have_first_class',
  'have_second_class',
  'have_third_class',
  'have_fourth_class',
  'have_wifi',
  'have_air_conditioning',
  'have_express',
]

function appendSearchParam(searchParams: URLSearchParams, key: string, value: boolean) {
  searchParams.append(key, value ? 'true' : 'false')
}

export function buildRouteSeatsQueryString(params: RouteSeatsQueryParams): string {
  const searchParams = new URLSearchParams()
  for (const key of QUERY_KEYS) {
    const raw = params[key]
    if (raw === undefined || raw === null) continue
    appendSearchParam(searchParams, key, raw)
  }
  return searchParams.toString()
}
