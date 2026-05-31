import { describe, expect, it } from 'vitest'
import { filtersReducer, mergeFilters, resetFilters } from './filtersSlice'

describe('filtersSlice', () => {
  it('мерджит фильтры в состояние', () => {
    const state = filtersReducer(undefined, mergeFilters({ price_min: 1000, price_max: 5000 }))

    expect(state).toEqual({ price_min: 1000, price_max: 5000 })
  })

  it('сбрасывает фильтры к начальному состоянию', () => {
    const withFilters = filtersReducer(undefined, mergeFilters({ price_min: 1000 }))
    const state = filtersReducer(withFilters, resetFilters())

    expect(state).toEqual({})
  })
})
