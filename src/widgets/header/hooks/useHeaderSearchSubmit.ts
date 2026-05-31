import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
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
  const [departureDateOverride, setDepartureDateOverride] = useState<Date | null | undefined>(
    undefined,
  )
  const [arrivalDateOverride, setArrivalDateOverride] = useState<Date | null | undefined>(
    undefined,
  )
  const [prevDateStart, setPrevDateStart] = useState(search.date_start)
  const [prevDateEnd, setPrevDateEnd] = useState(search.date_end)

  if (search.date_start !== prevDateStart) {
    setPrevDateStart(search.date_start)
    setDepartureDateOverride(undefined)
  }

  if (search.date_end !== prevDateEnd) {
    setPrevDateEnd(search.date_end)
    setArrivalDateOverride(undefined)
  }

  const departureDateFromSearch = useMemo(
    () => parseFilterDate(search.date_start),
    [search.date_start],
  )
  const arrivalDateFromSearch = useMemo(() => parseFilterDate(search.date_end), [search.date_end])

  const departureDate =
    departureDateOverride !== undefined ? departureDateOverride : departureDateFromSearch
  const arrivalDate = arrivalDateOverride !== undefined ? arrivalDateOverride : arrivalDateFromSearch

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
      setDepartureDateOverride(date)
    },
    [clearFormError],
  )

  const setArrivalDate = useCallback(
    (date: Date | null) => {
      clearFormError()
      setArrivalDateOverride(date)
    },
    [clearFormError],
  )

  const {
    fromCity,
    toCity,
    fromField: { setInputValue: setFromInputValue },
    toField: { setInputValue: setToInputValue },
    setFromCity,
    setToCity,
  } = citySearch

  useHeaderSearchUrlHydration({
    fromField: citySearch.fromField,
    toField: citySearch.toField,
    setFromCity,
    setToCity,
    setDepartureDate,
    setArrivalDate,
  })

  useEffect(() => {
    const fromId = search.from_city_id?.trim()
    const fromName = search.from_city_name?.trim()
    if (!fromId || !fromName) return
    if (fromCity?._id === fromId && fromCity.name === fromName) return

    setFromInputValue(fromName)
    setFromCity({ _id: fromId, name: fromName })
  }, [fromCity, search.from_city_id, search.from_city_name, setFromCity, setFromInputValue])

  useEffect(() => {
    const toId = search.to_city_id?.trim()
    const toName = search.to_city_name?.trim()
    if (!toId || !toName) return
    if (toCity?._id === toId && toCity.name === toName) return

    setToInputValue(toName)
    setToCity({ _id: toId, name: toName })
  }, [search.to_city_id, search.to_city_name, setToCity, setToInputValue, toCity])

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
      from_city_name: fromCity.name,
      to_city_name: toCity.name,
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
