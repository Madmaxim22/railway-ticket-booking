import type { BookingState } from '@/store/slices/bookingSlice'

const STORAGE_KEY = 'railway-ticket-booking:booking-v1'

function isBookingEmpty(booking: BookingState): boolean {
  return (
    booking.departure == null &&
    booking.returnTrip == null &&
    booking.departureSeats == null &&
    booking.returnTripSeats == null &&
    booking.passengers.length === 0 &&
    booking.contactInfo == null &&
    booking.paymentMethod == null
  )
}

/** Не восстанавливаем способ оплаты после перезагрузки — пользователь выбирает заново. */
export function sanitizeBookingForSessionRestore(booking: BookingState): BookingState {
  return {
    ...booking,
    paymentMethod: null,
  }
}

export function loadBookingFromSession(): BookingState | undefined {
  if (typeof sessionStorage === 'undefined') return undefined

  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (!raw) return undefined

    const parsed = JSON.parse(raw) as BookingState
    if (!parsed || typeof parsed !== 'object') return undefined
    if (isBookingEmpty(parsed)) return undefined

    return sanitizeBookingForSessionRestore(parsed)
  } catch {
    return undefined
  }
}

export function saveBookingToSession(booking: BookingState): void {
  if (typeof sessionStorage === 'undefined') return

  try {
    if (isBookingEmpty(booking)) {
      sessionStorage.removeItem(STORAGE_KEY)
      return
    }
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(booking))
  } catch {
    /* quota / private mode — игнорируем */
  }
}

export function clearBookingSession(): void {
  if (typeof sessionStorage === 'undefined') return
  sessionStorage.removeItem(STORAGE_KEY)
}
