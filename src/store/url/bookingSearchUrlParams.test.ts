import { describe, expect, it } from 'vitest'

import type { RoutesQueryParams } from '@/store/api/routesQueryParams.types'
import {
  buildBookingSearchUrl,
  hasBookingSearchInUrl,
  parseBookingSearchUrl,
} from './bookingSearchUrlParams'

describe('bookingSearchUrlParams', () => {
  it('сериализует и парсит основной поиск', () => {
    const params: RoutesQueryParams = {
      from_city_id: 'city-a',
      to_city_id: 'city-b',
      date_start: '2026-06-01',
      date_end: '2026-06-10',
      sort: 'date',
      limit: 5,
      offset: 0,
    }

    const url = buildBookingSearchUrl(params, { fromName: 'Москва', toName: 'СПб' })
    const searchParams = new URLSearchParams(url.replace(/^\?/, ''))

    expect(hasBookingSearchInUrl(searchParams)).toBe(true)
    expect(searchParams.get('from')).toBe('city-a')
    expect(searchParams.get('to')).toBe('city-b')
    expect(searchParams.get('date')).toBe('2026-06-01')
    expect(searchParams.get('return')).toBe('2026-06-10')
    expect(searchParams.get('fromName')).toBe('Москва')
    expect(searchParams.get('toName')).toBe('СПб')

    const parsed = parseBookingSearchUrl(searchParams)
    expect(parsed.search).toEqual({
      from_city_id: 'city-a',
      to_city_id: 'city-b',
      date_start: '2026-06-01',
      date_end: '2026-06-10',
    })
    expect(parsed.cityLabels).toEqual({ fromName: 'Москва', toName: 'СПб' })
  })

  it('добавляет в URL только нестандартную пагинацию и фильтры', () => {
    const params: RoutesQueryParams = {
      from_city_id: '1',
      to_city_id: '2',
      offset: 10,
      have_wifi: true,
      price_from: 1000,
    }

    const searchParams = new URLSearchParams(buildBookingSearchUrl(params).replace(/^\?/, ''))
    expect(searchParams.get('offset')).toBe('10')
    expect(searchParams.get('have_wifi')).toBe('true')
    expect(searchParams.get('price_from')).toBe('1000')
    expect(searchParams.has('limit')).toBe(false)
    expect(searchParams.has('sort')).toBe(false)
  })
})
