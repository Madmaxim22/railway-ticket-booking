import { useLayoutEffect, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'

import { parseFilterDate } from '@/shared/lib/parseFilterDate'
import type { CitySuggestion } from '@/store/api/citiesApi'
import {
  CITY_NAME_URL_KEYS,
  parseBookingSearchUrl,
} from '@/store/url/bookingSearchUrlParams'
import type { HeaderCitySearchFields } from './useHeaderCitySearchFields'

type HydrationTargets = Pick<
  HeaderCitySearchFields,
  'fromField' | 'toField' | 'setFromCity' | 'setToCity'
> & {
  setDepartureDate: (date: Date | null) => void
  setArrivalDate: (date: Date | null) => void
}

/**
 * Подставляет в шапку города и даты из URL (после F5 или перехода по ссылке).
 */
export function useHeaderSearchUrlHydration(targets: HydrationTargets) {
  const [searchParams] = useSearchParams()
  const applied = useRef(false)

  useLayoutEffect(() => {
    if (applied.current) return

    const { search, cityLabels } = parseBookingSearchUrl(searchParams)
    const fromId = search.from_city_id?.trim()
    const toId = search.to_city_id?.trim()
    if (!fromId && !toId && !search.date_start && !search.date_end) return

    if (fromId) {
      const fromName = cityLabels.fromName ?? searchParams.get(CITY_NAME_URL_KEYS.fromName)?.trim()
      if (fromName) {
        const city: CitySuggestion = { _id: fromId, name: fromName }
        targets.fromField.setInputValue(fromName)
        targets.setFromCity(city)
      }
    }

    if (toId) {
      const toName = cityLabels.toName ?? searchParams.get(CITY_NAME_URL_KEYS.toName)?.trim()
      if (toName) {
        const city: CitySuggestion = { _id: toId, name: toName }
        targets.toField.setInputValue(toName)
        targets.setToCity(city)
      }
    }

    if (search.date_start) {
      targets.setDepartureDate(parseFilterDate(search.date_start))
    }
    if (search.date_end) {
      targets.setArrivalDate(parseFilterDate(search.date_end))
    }

    applied.current = true
    // eslint-disable-next-line react-hooks/exhaustive-deps -- однократная гидратация из URL
  }, [searchParams])
}
