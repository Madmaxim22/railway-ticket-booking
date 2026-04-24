import { Outlet, useLocation } from 'react-router-dom'

import SearchFilters from './shared/components/SearchFilters'
import TripSummary from './shared/components/TripSummary'
import Breadcrumbs from './shared/breadcrumbs/Breadcrumbs'

import './BookingLayout.css'

const SEARCH_FILTERS_PATHS = ['/booking/trains', '/booking/seats']

export default function BookingLayout() {
  const { pathname } = useLocation()
  const asideIsSearchFilters = SEARCH_FILTERS_PATHS.includes(pathname)

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
