import type { AppDispatch } from '@/store/store'
import { resetBooking } from '@/store/slices/bookingSlice'

/** Сбрасывает прогресс бронирования в Redux и sessionStorage (через persist-middleware). */
export function resetLocalBookingState(dispatch: AppDispatch): void {
  dispatch(resetBooking())
}
