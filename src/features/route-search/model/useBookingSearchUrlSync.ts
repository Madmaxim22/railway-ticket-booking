import { useEffect, useLayoutEffect, useRef } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'

import { selectRoutesQueryParams } from '@/store/selectors/routesQuerySelectors'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { mergeFilters } from '@/store/slices/filtersSlice'
import { mergeSearch } from '@/store/slices/searchSlice'
import { mergeTrains } from '@/store/slices/trainsSlice'
import {
  buildBookingSearchUrl,
  hasBookingSearchInUrl,
  parseBookingSearchUrl,
} from '@/store/url/bookingSearchUrlParams'

function isBookingFlowPath(pathname: string): boolean {
  return pathname.includes('/booking') && !pathname.endsWith('/booking/success')
}

/**
 * Двусторонняя синхронизация search / filters / trains с query в URL на шагах бронирования.
 */
export function useBookingSearchUrlSync() {
  const dispatch = useAppDispatch()
  const location = useLocation()
  const [searchParams, setSearchParams] = useSearchParams()
  const params = useAppSelector(selectRoutesQueryParams)
  const skipNextUrlWrite = useRef(false)
  const hydratedFromUrl = useRef(false)

  useLayoutEffect(() => {
    if (hydratedFromUrl.current) return
    if (!hasBookingSearchInUrl(searchParams)) {
      hydratedFromUrl.current = true
      return
    }

    const { search, filters, trains } = parseBookingSearchUrl(searchParams)
    if (Object.keys(search).length > 0) dispatch(mergeSearch(search))
    if (Object.keys(filters).length > 0) dispatch(mergeFilters(filters))
    if (Object.keys(trains).length > 0) dispatch(mergeTrains(trains))

    skipNextUrlWrite.current = true
    hydratedFromUrl.current = true
  }, [dispatch, searchParams])

  useEffect(() => {
    if (!isBookingFlowPath(location.pathname)) return
    if (!params.from_city_id?.trim() || !params.to_city_id?.trim()) return

    const cityLabels = {
      fromName: searchParams.get('fromName') ?? undefined,
      toName: searchParams.get('toName') ?? undefined,
    }
    const nextSearch = buildBookingSearchUrl(params, cityLabels)
    const currentSearch = location.search || ''
    const normalizedCurrent = currentSearch.startsWith('?') ? currentSearch : `?${currentSearch}`
    const normalizedNext = nextSearch || ''

    if (skipNextUrlWrite.current) {
      skipNextUrlWrite.current = false
      if (normalizedNext === normalizedCurrent || (!normalizedNext && !normalizedCurrent)) {
        return
      }
    }

    if (normalizedNext === normalizedCurrent) return

    const nextParams = new URLSearchParams(normalizedNext.replace(/^\?/, ''))
    setSearchParams(nextParams, { replace: true })
  }, [location.pathname, location.search, params, setSearchParams])
}
