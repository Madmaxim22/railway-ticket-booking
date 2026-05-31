import { splitRoutesQueryPatch } from '@/store/splitRoutesQueryPatch'
import { loadBookingFromSession } from '@/store/persist/bookingSessionPersist'
import type { FiltersState } from '@/store/slices/filtersSlice'
import type { SearchState } from '@/store/slices/searchSlice'
import type { TrainsState } from '@/store/slices/trainsSlice'
import type { BookingState } from '@/store/slices/bookingSlice'
import {
  hasBookingSearchInUrl,
  parseBookingSearchUrl,
} from '@/store/url/bookingSearchUrlParams'
import { mergeCityLabelsIntoSearchPatch } from '@/store/url/searchCityLabels'

export type PreloadedAppSlices = {
  search?: SearchState
  filters?: FiltersState
  trains?: Partial<TrainsState>
  booking?: BookingState
}

export function getPreloadedSlicesFromBrowser(): PreloadedAppSlices | undefined {
  if (typeof window === 'undefined') return undefined

  const preloaded: PreloadedAppSlices = {}
  const searchParams = new URLSearchParams(window.location.search)

  if (hasBookingSearchInUrl(searchParams)) {
    const { search, filters, trains, cityLabels } = parseBookingSearchUrl(searchParams)
    const searchWithLabels = mergeCityLabelsIntoSearchPatch(search, cityLabels)
    const patch = { ...searchWithLabels, ...filters, ...trains }
    const split = splitRoutesQueryPatch(patch)

    if (Object.keys(split.search).length > 0) {
      preloaded.search = {
        from_city_id: '',
        to_city_id: '',
        ...split.search,
      }
    }
    if (Object.keys(split.filters).length > 0) {
      preloaded.filters = split.filters
    }
    if (Object.keys(split.trains).length > 0) {
      preloaded.trains = split.trains
    }
  }

  const booking = loadBookingFromSession()
  if (booking) {
    preloaded.booking = booking
  }

  return Object.keys(preloaded).length > 0 ? preloaded : undefined
}
