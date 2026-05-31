import { describe, expect, it } from 'vitest'

import {
  mergeSliderSearchFromFilters,
  SLIDER_SEARCH_INITIAL,
  sliderSearchFromFilters,
} from './sliderSearchState'

describe('sliderSearchState', () => {
  it('sliderSearchFromFilters подставляет числовые поля из Redux, остальное — дефолты', () => {
    expect(
      sliderSearchFromFilters({
        price_from: 1500,
        price_to: 4000,
        start_departure_hour_from: 8,
        start_departure_hour_to: 18,
      }),
    ).toEqual({
      ...SLIDER_SEARCH_INITIAL,
      price_from: 1500,
      price_to: 4000,
      start_departure_hour_from: 8,
      start_departure_hour_to: 18,
    })
  })

  it('mergeSliderSearchFromFilters обновляет только изменившиеся ключи', () => {
    const prev = sliderSearchFromFilters({ price_from: 1000, price_to: 5000 })
    const next = mergeSliderSearchFromFilters(prev, { price_from: 2000 })
    expect(next).toEqual({ ...prev, price_from: 2000 })
    expect(mergeSliderSearchFromFilters(prev, { price_from: 1000 })).toBe(prev)
  })
})
