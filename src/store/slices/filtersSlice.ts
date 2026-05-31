import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import type { RootState } from '@/store/store'
import type { RoutesQueryParams } from '@/store/api/routesQueryParams.types'

/** Поля маршрута/дат «основного» поиска — живут в searchSlice */
type SearchSliceKeys = 'from_city_id' | 'to_city_id' | 'date_start' | 'date_end'

/** Пагинация и сортировка — trainsSlice */
type TrainsSliceKeys = 'sort' | 'limit' | 'offset'

/** Фильтры API (в т.ч. даты прибытия) — filtersSlice */
export type FiltersState = Partial<Omit<RoutesQueryParams, SearchSliceKeys | TrainsSliceKeys>>

const initialState: FiltersState = {}

export const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    mergeFilters(state, action: PayloadAction<FiltersState>) {
      for (const [key, value] of Object.entries(action.payload) as [keyof FiltersState, unknown][]) {
        ;(state as Record<string, unknown>)[key as string] = value
      }
    },
    resetFilters: () => ({ ...initialState }),
  },
})

export const { mergeFilters, resetFilters } = filtersSlice.actions
export const filtersReducer = filtersSlice.reducer

export const selectFilters = (state: RootState) => state.filters
