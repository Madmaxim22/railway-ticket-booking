import { createSelector } from '@reduxjs/toolkit'
import type { RouteSeatsQueryParams } from '@/store/api/routesSeatsQueryParams.types'
import { selectFilters } from '@/store/slices/filtersSlice'

const SEATS_FILTER_KEYS = [
  'have_first_class',
  'have_second_class',
  'have_third_class',
  'have_fourth_class',
  'have_wifi',
  'have_air_conditioning',
  'have_express',
] as const satisfies readonly (keyof RouteSeatsQueryParams)[]

export const selectRouteSeatsQueryParams = createSelector(
  [selectFilters],
  (filters): RouteSeatsQueryParams => {
    const params: RouteSeatsQueryParams = {}
    for (const key of SEATS_FILTER_KEYS) {
      const value = filters[key]
      if (value !== undefined) {
        params[key] = value
      }
    }
    return params
  },
)
