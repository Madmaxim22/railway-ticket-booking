import { Navigate, Outlet, useMatch } from 'react-router-dom'

import { getBookingStepRedirect } from '@/features/booking-flow/lib/bookingStepAccess'
import { useBookingStep } from '@/features/booking-flow/hooks/useBookingStep'
import SearchFilters from '@/features/route-search/ui/SearchFilters'
import TripSummary from '@/widgets/trip-summary/TripSummary'
import Breadcrumbs from '@/widgets/booking-breadcrumbs/Breadcrumbs'
import SearchForm from '@/features/route-search/ui/SearchForm'
import { useAppSelector } from '@/store/hooks'
import { selectBooking } from '@/store/slices/bookingSlice'

import './BookingLayout.css'

export default function BookingLayout() {
  const booking = useAppSelector(selectBooking)
  const bookingStep = useBookingStep()
  const redirectTo = bookingStep ? getBookingStepRedirect(booking, bookingStep) : null

  const isTrainsStep = useMatch('/booking/trains')
  const isSeatsStep = useMatch('/booking/seats')
  const asideIsSearchFilters = Boolean(isTrainsStep || isSeatsStep)

  if (redirectTo) {
    return <Navigate to={redirectTo} replace />
  }

  return (
    <div className="booking-layout">
      <Breadcrumbs />
      <div className="booking-layout__body">
        {asideIsSearchFilters ? (
          <SearchForm>
            <>
              <SearchFilters />
              <main className="booking-layout__main">
                <Outlet />
              </main>
            </>
          </SearchForm>
        ) : (
          <>
            <TripSummary />
            <main className="booking-layout__main">
              <Outlet />
            </main>
          </>
        )}
      </div>
    </div>
  )
}
