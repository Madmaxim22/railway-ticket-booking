import { Outlet, useMatch } from 'react-router-dom'

import { useRoutesSearchModel } from '@/features/route-search/model/useRoutesSearchModel'
import { useSearchLoadingVisibility } from '@/features/train-selection/hooks/useSearchLoadingVisibility'
import SearchFilters from '@/features/route-search/ui/SearchFilters'
import { SearchLoadingScreen } from '@/shared/ui/SearchLoadingScreen/SearchLoadingScreen'

export function BookingSearchBody() {
  const isTrainsStep = useMatch('/booking/trains')
  const isSeatsStep = useMatch('/booking/seats')
  const { isFetching, isError, data } = useRoutesSearchModel()
  const items = data?.items ?? []

  const { showLoading, markAnimationReady } = useSearchLoadingVisibility(
    isFetching,
    items.length > 0,
    isError,
  )

  const isLoading = Boolean(isTrainsStep && showLoading)

  const bodyClassName = [
    'booking-layout__body',
    isLoading && 'booking-layout__body--loading',
    isSeatsStep && 'booking-layout__body--seats',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={bodyClassName}>
      {isLoading && (
        <SearchLoadingScreen
          className="search-loading-screen--overlay"
          onAnimationReady={markAnimationReady}
        />
      )}
      <SearchFilters />
      <main className="booking-layout__main">
        <Outlet />
      </main>
    </div>
  )
}
