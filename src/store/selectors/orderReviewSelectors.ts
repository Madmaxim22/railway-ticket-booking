import { createSelector } from '@reduxjs/toolkit'

import {
  buildRoutesListItemFromBooking,
  hasReturnTripInBooking,
} from '@/features/order-review/lib/buildRoutesListItemFromBooking'
import { mapPassengerToReviewDisplay } from '@/features/order-review/lib/mapPassengerToReviewDisplay'
import type { PaymentMethod } from '@/store/slices/bookingSlice'
import { selectBooking } from '@/store/slices/bookingSlice'
import { selectTripSummaryViewModel } from '@/store/selectors/tripSummarySelectors'

const PAYMENT_METHOD_LABELS: Record<PaymentMethod, string> = {
  online: 'Онлайн',
  cash: 'Наличными',
}

export const selectOrderReviewViewModel = createSelector(
  [selectBooking, selectTripSummaryViewModel],
  (booking, tripSummary) => {
    const trainCardItem = buildRoutesListItemFromBooking(booking)
    const passengers = booking.passengers.map(mapPassengerToReviewDisplay)

    return {
      trainCardItem,
      showReturnTrip: hasReturnTripInBooking(booking),
      passengers,
      totalPrice: tripSummary.totalPrice,
      paymentMethodLabel: booking.paymentMethod
        ? PAYMENT_METHOD_LABELS[booking.paymentMethod]
        : 'Наличными',
    }
  },
)
