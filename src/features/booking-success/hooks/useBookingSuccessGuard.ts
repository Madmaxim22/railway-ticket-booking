import { useLayoutEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { readBookingSuccessNavigationState } from '../lib/bookingSuccessNavigation'

export function useBookingSuccessGuard() {
  const location = useLocation()
  const navigate = useNavigate()
  const successState = readBookingSuccessNavigationState(location.state)

  useLayoutEffect(() => {
    if (!successState) {
      navigate('/', { replace: true })
    }
  }, [navigate, successState])

  return { successState }
}
