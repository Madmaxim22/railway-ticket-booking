import type { BookingSearchCityLabels } from '@/store/url/bookingSearchUrlParams'
import type { SearchPatch } from '@/store/splitRoutesQueryPatch'

export function mergeCityLabelsIntoSearchPatch(
  search: SearchPatch,
  cityLabels: BookingSearchCityLabels,
): SearchPatch {
  return {
    ...search,
    ...(cityLabels.fromName ? { from_city_name: cityLabels.fromName } : {}),
    ...(cityLabels.toName ? { to_city_name: cityLabels.toName } : {}),
  }
}

export function cityLabelsFromSearch(search: {
  from_city_name?: string
  to_city_name?: string
}): BookingSearchCityLabels {
  return {
    fromName: search.from_city_name?.trim() || undefined,
    toName: search.to_city_name?.trim() || undefined,
  }
}
