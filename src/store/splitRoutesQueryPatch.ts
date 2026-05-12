import type { RoutesQueryParams } from '@/store/api/routesQueryParams.types'
import type { FiltersState } from '@/store/slices/filtersSlice'
import type { SearchState } from '@/store/slices/searchSlice'
import type { TrainsState } from '@/store/slices/trainsSlice'

const SEARCH_KEYS = new Set<keyof RoutesQueryParams>([
  'from_city_id',
  'to_city_id',
  'date_start',
  'date_end',
])

const TRAINS_KEYS = new Set<keyof RoutesQueryParams>(['sort', 'limit', 'offset'])

export type SearchPatch = Partial<SearchState>
export type TrainsPatch = Partial<Pick<TrainsState, 'sort' | 'limit' | 'offset'>>

export function splitRoutesQueryPatch(patch: Partial<RoutesQueryParams>): {
  search: SearchPatch
  filters: Partial<FiltersState>
  trains: TrainsPatch
} {
  const search: SearchPatch = {}
  const filters: Partial<FiltersState> = {}
  const trains: TrainsPatch = {}

  for (const key of Object.keys(patch) as (keyof RoutesQueryParams)[]) {
    const value = patch[key]
    if (SEARCH_KEYS.has(key)) {
      ;(search as Record<string, unknown>)[key] = value
    } else if (TRAINS_KEYS.has(key)) {
      ;(trains as Record<string, unknown>)[key] = value
    } else {
      ;(filters as Record<string, unknown>)[key] = value
    }
  }

  return { search, filters, trains }
}
