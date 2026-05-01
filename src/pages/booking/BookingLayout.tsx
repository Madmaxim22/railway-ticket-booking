import { Outlet, useMatch } from 'react-router-dom'

import SearchFilters from './shared/components/SearchFilters'
import TripSummary from './shared/components/TripSummary'
import Breadcrumbs from './shared/breadcrumbs/Breadcrumbs'

import './BookingLayout.css'

export default function BookingLayout() {
  const isTrainsStep = useMatch('/booking/trains')
  const isSeatsStep = useMatch('/booking/seats')
  const asideIsSearchFilters = Boolean(isTrainsStep || isSeatsStep)

  return (
    <div className="booking-layout">
      <Breadcrumbs />
      <div className="booking-layout__body">
        {asideIsSearchFilters ? <SearchFilters /> : <TripSummary />}
        <main className="booking-layout__main">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
