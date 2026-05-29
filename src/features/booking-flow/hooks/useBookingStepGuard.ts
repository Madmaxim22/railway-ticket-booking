import { useLayoutEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { getBookingStepRedirect } from '@/features/booking-flow/lib/bookingStepAccess'
import { useAppSelector } from '@/store/hooks'
import { selectBooking } from '@/store/slices/bookingSlice'

import { useBookingStep } from './useBookingStep'

export function useBookingStepGuard() {
  const navigate = useNavigate()
  const booking = useAppSelector(selectBooking)
  const bookingStep = useBookingStep()
  const redirectTo = bookingStep ? getBookingStepRedirect(booking, bookingStep) : null

  useLayoutEffect(() => {
    if (redirectTo) {
      navigate(redirectTo, { replace: true })
    }
  }, [navigate, redirectTo])

  return { isStepAllowed: redirectTo == null }
}
