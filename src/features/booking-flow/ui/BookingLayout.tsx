import { Outlet, useMatch } from 'react-router-dom'

import { useBookingStepGuard } from '@/features/booking-flow/hooks/useBookingStepGuard'
import SearchFilters from '@/features/route-search/ui/SearchFilters'
import TripSummary from '@/widgets/trip-summary/TripSummary'
import Breadcrumbs from '@/widgets/booking-breadcrumbs/Breadcrumbs'
import SearchForm from '@/features/route-search/ui/SearchForm'

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
