import { createSelector } from '@reduxjs/toolkit'
import type { RoutesQueryParams } from '@/store/api/routesQueryParams.types'
import { selectFilters, type FiltersState } from '@/store/slices/filtersSlice'
import { selectSearch, type SearchState } from '@/store/slices/searchSlice'
import { selectTrains, type TrainsState } from '@/store/slices/trainsSlice'

/** Минимальный фрагмент корневого состояния для сборки GET /routes */
export type RoutesQueryRootSlices = {
  search: SearchState
  filters: FiltersState
  trains: TrainsState
}

export const selectRoutesQueryParams = createSelector(
  [selectSearch, selectFilters, selectTrains],
  (search, filters, trains): RoutesQueryParams => ({
    from_city_id: search.from_city_id,
    to_city_id: search.to_city_id,
    ...(search.date_start !== undefined ? { date_start: search.date_start } : {}),
    ...(search.date_end !== undefined ? { date_end: search.date_end } : {}),
    ...filters,
    sort: trains.sort,
    limit: trains.limit,
    offset: trains.offset,
  }),
)
