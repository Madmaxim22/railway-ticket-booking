import { Outlet, useMatch } from 'react-router-dom'

import { useRoutesSearchModel } from '@/features/route-search/model/useRoutesSearchModel'
import { useSearchLoadingVisibility } from '@/features/train-selection/hooks/useSearchLoadingVisibility'
import SearchFilters from '@/features/route-search/ui/SearchFilters'
import { SearchLoadingScreen } from '@/shared/ui/SearchLoadingScreen/SearchLoadingScreen'

export function BookingSearchBody() {
  const isTrainsStep = useMatch('/booking/trains')
  const { isFetching, isError, data } = useRoutesSearchModel()
  const items = data?.items ?? []

  const { showLoading, markAnimationReady } = useSearchLoadingVisibility(
    isFetching,
    items.length > 0,
    isError,
  )

  const isLoading = Boolean(isTrainsStep && showLoading)

  return (
    <div
      className={`booking-layout__body${isLoading ? ' booking-layout__body--loading' : ''}`}
    >
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
