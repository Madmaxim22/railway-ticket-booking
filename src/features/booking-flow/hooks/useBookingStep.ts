import { useMatch } from 'react-router-dom'

import type { BookingStep } from '../lib/bookingStepAccess'

export function useBookingStep(): BookingStep | null {
  const isTrains = useMatch('/booking/trains')
  const isSeats = useMatch('/booking/seats')
  const isPassengers = useMatch('/booking/passengers')
  const isPayment = useMatch('/booking/payment')
  const isConfirmation = useMatch('/booking/confirmation')

  if (isTrains) return 'trains'
  if (isSeats) return 'seats'
  if (isPassengers) return 'passengers'
  if (isPayment) return 'payment'
  if (isConfirmation) return 'confirmation'

  return null
}
