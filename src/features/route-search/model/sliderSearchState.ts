import type { FiltersState } from '@/store/slices/filtersSlice'

export const SLIDER_SEARCH_INITIAL = {
  price_from: 0,
  price_to: 7000,
  start_departure_hour_from: 0,
  start_departure_hour_to: 24,
  start_arrival_hour_from: 0,
  start_arrival_hour_to: 24,
  end_departure_hour_from: 0,
  end_departure_hour_to: 24,
  end_arrival_hour_from: 0,
  end_arrival_hour_to: 24,
} as const

export type SliderSearchState = {
  [K in keyof typeof SLIDER_SEARCH_INITIAL]: number
}

export const SLIDER_SEARCH_KEYS = Object.keys(
  SLIDER_SEARCH_INITIAL,
) as (keyof SliderSearchState)[]

export function sliderSearchFromFilters(filters: FiltersState): SliderSearchState {
  const next = { ...SLIDER_SEARCH_INITIAL }
  for (const key of SLIDER_SEARCH_KEYS) {
    const value = filters[key]
    if (typeof value === 'number' && !Number.isNaN(value)) {
      next[key] = value
    }
  }
  return next
}

export function mergeSliderSearchFromFilters(
  prev: SliderSearchState,
  filters: FiltersState,
): SliderSearchState {
  let changed = false
  const next = { ...prev }
  for (const key of SLIDER_SEARCH_KEYS) {
    const value = filters[key]
    if (typeof value === 'number' && !Number.isNaN(value) && prev[key] !== value) {
      next[key] = value
      changed = true
    }
  }
  return changed ? next : prev
}
