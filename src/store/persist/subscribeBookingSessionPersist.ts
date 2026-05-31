import { resetBooking } from '@/store/slices/bookingSlice'
import {
  clearBookingSession,
  saveBookingToSession,
} from '@/store/persist/bookingSessionPersist'
import type { RootState } from '@/store/store'

export function handleBookingPersistAction(
  action: unknown,
  getState: () => RootState,
): void {
  if (resetBooking.match(action)) {
    clearBookingSession()
    return
  }

  const type = (action as { type?: string })?.type ?? ''
  if (type.startsWith('booking/')) {
    saveBookingToSession(getState().booking)
  }
}
