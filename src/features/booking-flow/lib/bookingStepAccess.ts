import { isValidContactInfo } from '@/features/payment/lib/validateContactInfo'
import type { BookingState } from '@/store/slices/bookingSlice'

export type BookingStep = 'trains' | 'seats' | 'passengers' | 'payment' | 'confirmation'

export type BookingBreadcrumbId = 'tickets' | 'passengers' | 'payment' | 'review'

const breadcrumbIdToStep: Record<BookingBreadcrumbId, BookingStep> = {
  tickets: 'trains',
  passengers: 'passengers',
  payment: 'payment',
  review: 'confirmation',
}

function hasSelectedDeparture(booking: BookingState): boolean {
  return booking.departure != null
}

function hasCompleteSeatSelections(booking: BookingState): boolean {
  if (!booking.departureSeats) return false
  if (booking.returnTrip != null && !booking.returnTripSeats) return false
  return true
}

function hasPassengers(booking: BookingState): boolean {
  return booking.passengers.length > 0
}

function hasPaymentDetails(booking: BookingState): boolean {
  return isValidContactInfo(booking.contactInfo) && booking.paymentMethod != null
}

/** Путь для редиректа или `null`, если шаг доступен при текущем состоянии бронирования. */
export function getBookingStepRedirect(
  booking: BookingState,
  step: BookingStep,
): string | null {
  if (step === 'trains') return null

  if (!hasSelectedDeparture(booking)) {
    return '/booking/trains'
  }

  if (step === 'seats') return null

  if (!hasCompleteSeatSelections(booking)) {
    return '/booking/seats'
  }

  if (step === 'passengers') return null

  if (!hasPassengers(booking)) {
    return '/booking/passengers'
  }

  if (step === 'payment') return null

  if (!hasPaymentDetails(booking)) {
    return '/booking/payment'
  }

  return null
}

/** Можно ли перейти по крошке без редиректа guard (для NavLink). */
export function canAccessBookingBreadcrumb(
  booking: BookingState,
  breadcrumbId: BookingBreadcrumbId,
): boolean {
  const step = breadcrumbIdToStep[breadcrumbId]
  return getBookingStepRedirect(booking, step) === null
}
