import { describe, expect, it } from 'vitest'
import { mergeSearch, searchReducer } from './searchSlice'

describe('searchSlice', () => {
  it('обновляет города и даты через mergeSearch', () => {
    const state = searchReducer(
      undefined,
      mergeSearch({
        from_city_id: '1',
        to_city_id: '2',
        date_start: '2026-05-31',
        date_end: '2026-06-01',
      }),
    )

    expect(state).toEqual({
      from_city_id: '1',
      to_city_id: '2',
      date_start: '2026-05-31',
      date_end: '2026-06-01',
    })
  })

  it('не затирает города при частичном обновлении', () => {
    const initial = searchReducer(undefined, mergeSearch({ from_city_id: '1', to_city_id: '2' }))
    const state = searchReducer(initial, mergeSearch({ date_start: '2026-05-31' }))

    expect(state.from_city_id).toBe('1')
    expect(state.to_city_id).toBe('2')
    expect(state.date_start).toBe('2026-05-31')
  })
})
