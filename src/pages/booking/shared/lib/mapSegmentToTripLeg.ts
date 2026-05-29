import { formatTitleCaseWords } from '@/shared/lib/formatTitleCaseWords'
import {
  formatRouteDuration,
  formatRouteTime,
  routeDateTimeToDate,
} from '@/shared/lib/routeFormatters'
import type { RouteDirectionSegment } from '@/store/api/routesResponse.types'
import { formatDateRu } from '@/utils/calendarMonth'

export type TripLegView = {
  trainNumber: string
  fromCity: string
  toCity: string
  duration: string
  departureTime: string
  arrivalTime: string
  departureDate: string
  arrivalDate: string
  departureCity: string
  arrivalCity: string
  departureStation: string
  arrivalStation: string
}

export function mapSegmentToTripLeg(segment: RouteDirectionSegment): TripLegView {
  const fromDate = routeDateTimeToDate(segment.from.datetime)
  const toDate = routeDateTimeToDate(segment.to.datetime)

  return {
    trainNumber: segment.train.name,
    fromCity: formatTitleCaseWords(segment.from.city.name),
    toCity: formatTitleCaseWords(segment.to.city.name),
    duration: formatRouteDuration(segment.duration),
    departureTime: formatRouteTime(segment.from.datetime),
    arrivalTime: formatRouteTime(segment.to.datetime),
    departureDate: formatDateRu(fromDate),
    arrivalDate: formatDateRu(toDate),
    departureCity: formatTitleCaseWords(segment.from.city.name),
    arrivalCity: formatTitleCaseWords(segment.to.city.name),
    departureStation: formatTitleCaseWords(segment.from.railway_station_name),
    arrivalStation: formatTitleCaseWords(segment.to.railway_station_name),
  }
}
