import { describe, expect, it } from 'vitest'

import { mergeCityLabelsIntoSearchPatch, cityLabelsFromSearch } from './searchCityLabels'

describe('searchCityLabels', () => {
  it('добавляет подписи городов в patch поиска', () => {
    expect(
      mergeCityLabelsIntoSearchPatch(
        { from_city_id: '1', to_city_id: '2' },
        { fromName: 'Москва', toName: 'СПб' },
      ),
    ).toEqual({
      from_city_id: '1',
      to_city_id: '2',
      from_city_name: 'Москва',
      to_city_name: 'СПб',
    })
  })

  it('возвращает подписи из search slice для URL', () => {
    expect(
      cityLabelsFromSearch({
        from_city_name: ' Москва ',
        to_city_name: 'СПб',
      }),
    ).toEqual({ fromName: 'Москва', toName: 'СПб' })
  })
})
