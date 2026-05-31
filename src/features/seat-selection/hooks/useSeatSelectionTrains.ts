import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { useGetRouteSeatsQuery } from '@/store/api/routesApi'
import { buildRouteSeatsQueryString } from '@/store/api/routesSeatsQuerySerialize'
import { selectRouteSeatsQueryParams } from '@/store/selectors/routeSeatsQuerySelectors'
import { useAppSelector } from '@/store/hooks'
import { mapRouteSeatsToTrainOption } from '../lib/mapRouteSeatsToTrainOption'
import {
  buildSeatSelectionNavigationStateFromBooking,
  readSeatSelectionNavigationState,
} from '../lib/seatSelectionNavigation'
import { selectBooking } from '@/store/slices/bookingSlice'
import type { TrainOption } from '../types'
import { formatRtkQueryError } from '@/shared/lib/formatRtkQueryError'

export function useSeatSelectionTrains() {
  const location = useLocation()
  const booking = useAppSelector(selectBooking)
  const navigation = useMemo(
    () =>
      readSeatSelectionNavigationState(location.state) ??
      buildSeatSelectionNavigationStateFromBooking(booking),
    [location.state, booking],
  )
  const seatsFilters = useAppSelector(selectRouteSeatsQueryParams)
  const queryString = useMemo(
    () => buildRouteSeatsQueryString(seatsFilters),
    [seatsFilters],
  )

  const departureQuery = useGetRouteSeatsQuery(
    { routeId: navigation?.departure.routeId ?? '', queryString },
    { skip: !navigation?.departure.routeId },
  )

  const returnQuery = useGetRouteSeatsQuery(
    { routeId: navigation?.returnTrip?.routeId ?? '', queryString },
    { skip: !navigation?.returnTrip?.routeId },
  )

  const trains = useMemo((): TrainOption[] => {
    if (!navigation) return []
    const result: TrainOption[] = []

    if (departureQuery.data) {
      result.push(
        mapRouteSeatsToTrainOption(navigation.departure.segment, departureQuery.data),
      )
    }

    if (navigation.returnTrip && returnQuery.data) {
      result.push(
        mapRouteSeatsToTrainOption(navigation.returnTrip.segment, returnQuery.data),
      )
    }

    return result
  }, [navigation, departureQuery.data, returnQuery.data])

  const isLoading =
    departureQuery.isLoading || departureQuery.isFetching ||
    (navigation?.returnTrip != null && (returnQuery.isLoading || returnQuery.isFetching))

  const isError = departureQuery.isError || returnQuery.isError
  const error = departureQuery.error ?? returnQuery.error

  const isMissingNavigation = navigation == null

  return {
    trains,
    isLoading,
    isError,
    errorMessage: isError ? formatRtkQueryError(error, 'Не удалось загрузить места.') : null,
    isMissingNavigation,
  }
}
