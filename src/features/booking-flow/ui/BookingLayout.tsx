import { Outlet, useMatch } from 'react-router-dom'

import { useBookingStepGuard } from '@/features/booking-flow/hooks/useBookingStepGuard'
import { BookingSearchBody } from '@/features/booking-flow/ui/BookingSearchBody'
import SearchForm from '@/features/route-search/ui/SearchForm'
import TripSummary from '@/widgets/trip-summary/TripSummary'
import Breadcrumbs from '@/widgets/booking-breadcrumbs/Breadcrumbs'

import './BookingLayout.css'

export default function BookingLayout() {
  const { isStepAllowed } = useBookingStepGuard()

  const isTrainsStep = useMatch('/booking/trains')
  const isSeatsStep = useMatch('/booking/seats')
  const asideIsSearchFilters = Boolean(isTrainsStep || isSeatsStep)

  if (!isStepAllowed) {
    return <div className="booking-layout booking-layout--redirecting" aria-busy="true" />
  }

  return (
    <div className="booking-layout">
      <Breadcrumbs />
      {asideIsSearchFilters ? (
        <SearchForm>
          <BookingSearchBody />
        </SearchForm>
      ) : (
        <div className="booking-layout__body">
          <TripSummary />
          <main className="booking-layout__main">
            <Outlet />
          </main>
        </div>
      )}
    </div>
  )
}
