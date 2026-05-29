import type { RouteDirectionSegment, RoutesListItem } from '@/store/api/routesResponse.types'
import type { BookingState } from '@/store/slices/bookingSlice'

function sumAvailableSeats(segment: RouteDirectionSegment): number {
  const seats = segment.available_seats_info
  return seats.first + seats.second + seats.third + seats.fourth
}

function mergeSegmentFlags(
  departure: RouteDirectionSegment,
  returnSegment: RouteDirectionSegment | null,
): Pick<
  RoutesListItem,
  | 'have_first_class'
  | 'have_second_class'
  | 'have_third_class'
  | 'have_fourth_class'
  | 'have_wifi'
  | 'have_air_conditioning'
  | 'is_express'
  | 'min_price'
  | 'total_avaliable_seats'
> {
  const segments = returnSegment ? [departure, returnSegment] : [departure]

  return {
    have_first_class: segments.some(s => s.have_first_class),
    have_second_class: segments.some(s => s.have_second_class),
    have_third_class: segments.some(s => s.have_third_class),
    have_fourth_class: segments.some(s => s.have_fourth_class),
    have_wifi: segments.some(s => s.have_wifi),
    have_air_conditioning: segments.some(s => s.have_air_conditioning),
    is_express: segments.some(s => s.is_express),
    min_price: Math.min(...segments.map(s => s.min_price)),
    total_avaliable_seats: segments.reduce((sum, s) => sum + sumAvailableSeats(s), 0),
  }
}

export function buildRoutesListItemFromBooking(booking: BookingState): RoutesListItem | null {
  if (!booking.departure) return null

  const departure = booking.departure.segment
  const returnSegment = booking.returnTrip?.segment ?? null

  return {
    ...mergeSegmentFlags(departure, returnSegment),
    departure,
    arrival: returnSegment ?? departure,
  }
}

export function hasReturnTripInBooking(booking: BookingState): boolean {
  return booking.returnTrip != null
}
