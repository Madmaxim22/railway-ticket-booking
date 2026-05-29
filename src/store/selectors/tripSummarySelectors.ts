import { createSelector } from '@reduxjs/toolkit'

import { mapSegmentToTripLeg, type TripLegView } from '@/pages/booking/shared/lib/mapSegmentToTripLeg'
import { estimateBookingPassengerPrices } from '@/pages/booking/shared/lib/estimateBookingPrices'
import type { BookingPassengerPrices } from '@/store/slices/bookingSlice'
import { selectBooking } from '@/store/slices/bookingSlice'
import { selectSearch } from '@/store/slices/searchSlice'
import type { SeatSelectionTicketCounts } from '@/pages/booking/steps/SeatSelection/constants'
import { parseFilterDate } from '@/shared/lib/parseFilterDate'
import { formatDateRu } from '@/utils/calendarMonth'

function formatSearchDateLabel(apiDate: string | undefined): string {
  const parsed = parseFilterDate(apiDate)
  return parsed ? formatDateRu(parsed) : '—'
}

export type TripSummaryViewModel = {
  hasBooking: boolean
  departureDateLabel: string
  returnDateLabel: string
  departureLeg: TripLegView | null
  returnLeg: TripLegView | null
  ticketCounts: SeatSelectionTicketCounts
  passengerPrices: BookingPassengerPrices
  totalPrice: number
}

export const selectTripSummaryViewModel = createSelector(
  [selectBooking, selectSearch],
  (booking, search): TripSummaryViewModel => {
    const departureLeg = booking.departure
      ? mapSegmentToTripLeg(booking.departure.segment)
      : null
    const returnLeg = booking.returnTrip
      ? mapSegmentToTripLeg(booking.returnTrip.segment)
      : null

    const pricing =
      booking.passengerPrices && booking.totalPrice != null
        ? { passengerPrices: booking.passengerPrices, totalPrice: booking.totalPrice }
        : estimateBookingPassengerPrices(
            booking.departure?.segment ?? null,
            booking.returnTrip?.segment ?? null,
            booking.ticketCounts,
          )

    return {
      hasBooking: booking.departure != null,
      departureDateLabel: formatSearchDateLabel(search.date_start),
      returnDateLabel: formatSearchDateLabel(search.date_end),
      departureLeg,
      returnLeg,
      ticketCounts: booking.ticketCounts,
      passengerPrices: pricing.passengerPrices,
      totalPrice: pricing.totalPrice,
    }
  },
)
