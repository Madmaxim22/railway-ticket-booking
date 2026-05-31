import { useMemo } from 'react'
import { useGetRouteSeatsQuery } from '@/store/api/routesApi'
import { buildRouteSeatsQueryString } from '@/store/api/routesSeatsQuerySerialize'
import { selectRouteSeatsQueryParams } from '@/store/selectors/routeSeatsQuerySelectors'
import { useAppSelector } from '@/store/hooks'
import { mapRouteSeatsToTrainOption } from '../lib/mapRouteSeatsToTrainOption'
import { selectBooking } from '@/store/slices/bookingSlice'
import type { TrainOption } from '../types'
import { formatRtkQueryError } from '@/shared/lib/formatRtkQueryError'

export function useSeatSelectionTrains() {
  const booking = useAppSelector(selectBooking)
  const hasSelectedRoutes = Boolean(
    booking.departure?.routeId && booking.departure.segment,
  )
  const seatsFilters = useAppSelector(selectRouteSeatsQueryParams)
  const queryString = useMemo(
    () => buildRouteSeatsQueryString(seatsFilters),
    [seatsFilters],
  )

  const departureQuery = useGetRouteSeatsQuery(
    { routeId: booking.departure?.routeId ?? '', queryString },
    { skip: !booking.departure?.routeId },
  )

  const returnQuery = useGetRouteSeatsQuery(
    { routeId: booking.returnTrip?.routeId ?? '', queryString },
    { skip: !booking.returnTrip?.routeId },
  )

  const trains = useMemo((): TrainOption[] => {
    if (!hasSelectedRoutes || !booking.departure) return []
    const result: TrainOption[] = []

    if (departureQuery.data) {
      result.push(
        mapRouteSeatsToTrainOption(booking.departure.segment, departureQuery.data),
      )
    }

    if (booking.returnTrip && returnQuery.data) {
      result.push(
        mapRouteSeatsToTrainOption(booking.returnTrip.segment, returnQuery.data),
      )
    }

    return result
  }, [hasSelectedRoutes, booking.departure, booking.returnTrip, departureQuery.data, returnQuery.data])

  const isLoading =
    departureQuery.isLoading || departureQuery.isFetching ||
    (booking.returnTrip != null && (returnQuery.isLoading || returnQuery.isFetching))

  const isError = departureQuery.isError || returnQuery.isError
  const error = departureQuery.error ?? returnQuery.error

  const isMissingNavigation = !hasSelectedRoutes

  return {
    trains,
    isLoading,
    isError,
    errorMessage: isError ? formatRtkQueryError(error, 'Не удалось загрузить места.') : null,
    isMissingNavigation,
  }
}
