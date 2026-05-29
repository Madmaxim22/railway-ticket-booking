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

function formatSeatsRequestError(error: unknown): string {
  if (!error || typeof error !== 'object') return 'Не удалось загрузить места.'
  if ('message' in error && typeof (error as { message: unknown }).message === 'string') {
    return (error as { message: string }).message
  }
  if ('error' in error && typeof (error as { error: unknown }).error === 'string') {
    return (error as { error: string }).error
  }
  if ('status' in error) {
    return `Ошибка запроса (${String((error as { status: unknown }).status)})`
  }
  return 'Не удалось загрузить места.'
}

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
    errorMessage: isError ? formatSeatsRequestError(error) : null,
    isMissingNavigation,
  }
}
