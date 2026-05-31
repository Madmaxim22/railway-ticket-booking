import type { FiltersState } from '@/store/slices/filtersSlice'

export type SliderSearchState = {
  price_from: number
  price_to: number
  start_departure_hour_from: number
  start_departure_hour_to: number
  start_arrival_hour_from: number
  start_arrival_hour_to: number
  end_departure_hour_from: number
  end_departure_hour_to: number
  end_arrival_hour_from: number
  end_arrival_hour_to: number
}

export const SLIDER_SEARCH_INITIAL: SliderSearchState = {
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
}

export const SLIDER_SEARCH_KEYS = Object.keys(
  SLIDER_SEARCH_INITIAL,
) as (keyof SliderSearchState)[]

export function sliderSearchFromFilters(filters: FiltersState): SliderSearchState {
  const next: SliderSearchState = { ...SLIDER_SEARCH_INITIAL }
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
