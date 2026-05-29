import type { SeatSelectionTicketCounts } from '@/entities/booking/model/ticketCounts'
import { CHILD_SEAT_PRICE_RATIO } from '@/entities/booking/lib/pricingConstants'
import type { BookingPassengerPrices } from '@/store/slices/bookingSlice'
import type { RouteDirectionSegment } from '@/store/api/routesResponse.types'

/** Грубая оценка до выбора мест (только min_price маршрута). */
export function estimateBookingPassengerPrices(
  departure: RouteDirectionSegment | null,
  returnTrip: RouteDirectionSegment | null,
  counts: SeatSelectionTicketCounts,
): { passengerPrices: BookingPassengerPrices; totalPrice: number } {
  const legMin = (departure?.min_price ?? 0) + (returnTrip?.min_price ?? 0)
  const directions = (departure ? 1 : 0) + (returnTrip ? 1 : 0) || 1

  const adults = legMin * counts.adults * directions
  const children = Math.round(legMin * CHILD_SEAT_PRICE_RATIO * counts.children * directions)
  const childrenWithoutSeat = 0

  const passengerPrices: BookingPassengerPrices = {
    adults,
    children,
    childrenWithoutSeat,
  }

  return {
    passengerPrices,
    totalPrice: adults + children + childrenWithoutSeat,
  }
}
