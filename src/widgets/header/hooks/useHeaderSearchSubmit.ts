import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
  type FormEvent,
  type MutableRefObject,
} from 'react'
import { prefetchTrainSearchAnimation } from '@/shared/lib/prefetchTrainSearchAnimation'
import { useNavigate } from 'react-router-dom'
import type { HeaderCitySearchFields } from './useHeaderCitySearchFields'
import { useHeaderSearchUrlHydration } from './useHeaderSearchUrlHydration'
import { formatApiDate } from '@/shared/lib/formatApiDate'
import { parseFilterDate } from '@/shared/lib/parseFilterDate'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { selectRoutesQueryParams } from '@/store/selectors/routesQuerySelectors'
import { mergeSearch } from '@/store/slices/searchSlice'
import { buildBookingSearchUrl } from '@/store/url/bookingSearchUrlParams'
import type { RootState } from '@/store/store'

export function useHeaderSearchSubmit(
  citySearch: HeaderCitySearchFields,
  clearFormErrorRef: MutableRefObject<(() => void) | null>,
) {
  const dispatch = useAppDispatch()
  const search = useAppSelector((s: RootState) => s.search)
  const routesParams = useAppSelector(selectRoutesQueryParams)
  const navigate = useNavigate()
  const [formError, setFormError] = useState<string | null>(null)
  const [departureDate, setDepartureDateState] = useState<Date | null>(() =>
    parseFilterDate(search.date_start),
  )
  const [arrivalDate, setArrivalDateState] = useState<Date | null>(() => parseFilterDate(search.date_end))

  const clearFormError = useCallback(() => {
    setFormError(null)
  }, [])

  useLayoutEffect(() => {
    clearFormErrorRef.current = clearFormError
    return () => {
      clearFormErrorRef.current = null
    }
  }, [clearFormError, clearFormErrorRef])

  const setDepartureDate = useCallback(
    (date: Date | null) => {
      clearFormError()
      setDepartureDateState(date)
    },
    [clearFormError],
  )

  const setArrivalDate = useCallback(
    (date: Date | null) => {
      clearFormError()
      setArrivalDateState(date)
    },
    [clearFormError],
  )

  const { fromCity, toCity, fromField, toField, setFromCity, setToCity } = citySearch

  useHeaderSearchUrlHydration({
    fromField,
    toField,
    setFromCity,
    setToCity,
    setDepartureDate,
    setArrivalDate,
  })

  useEffect(() => {
    setDepartureDateState(parseFilterDate(search.date_start))
  }, [search.date_start])

  useEffect(() => {
    setArrivalDateState(parseFilterDate(search.date_end))
  }, [search.date_end])

  useEffect(() => {
    if (fromCity && toCity) {
      void prefetchTrainSearchAnimation()
    }
  }, [fromCity, toCity])

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    clearFormError()

    if (!fromCity) {
      setFormError('Выберите город отправления из списка подсказок.')
      return
    }

    if (!toCity) {
      setFormError('Выберите город прибытия из списка подсказок.')
      return
    }

    const searchPatch = {
      from_city_id: fromCity._id,
      to_city_id: toCity._id,
      date_start: departureDate ? formatApiDate(departureDate) : undefined,
      date_end: arrivalDate ? formatApiDate(arrivalDate) : undefined,
    }

    dispatch(mergeSearch(searchPatch))

    void prefetchTrainSearchAnimation()

    const nextParams = {
      ...routesParams,
      ...searchPatch,
    }
    const searchUrl = buildBookingSearchUrl(nextParams, {
      fromName: fromCity.name,
      toName: toCity.name,
    })

    navigate({ pathname: '/booking/trains', search: searchUrl.replace(/^\?/, '') })
  }

  return {
    departureDate,
    setDepartureDate,
    arrivalDate,
    setArrivalDate,
    handleSubmit,
    formError,
  }
}
