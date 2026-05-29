import {
  useCallback,
  useLayoutEffect,
  useState,
  type FormEvent,
  type MutableRefObject,
} from 'react'
import { useNavigate } from 'react-router-dom'
import type { HeaderCitySearchFields } from './useHeaderCitySearchFields'
import { formatApiDate } from '@/shared/lib/formatApiDate'
import { parseFilterDate } from '@/shared/lib/parseFilterDate'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { mergeSearch } from '@/store/slices/searchSlice'
import type { RootState } from '@/store/store'

export function useHeaderSearchSubmit(
  citySearch: HeaderCitySearchFields,
  clearFormErrorRef: MutableRefObject<(() => void) | null>,
) {
  const dispatch = useAppDispatch()
  const search = useAppSelector((s: RootState) => s.search)
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

  const { fromCity, toCity } = citySearch

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

    dispatch(
      mergeSearch({
        from_city_id: fromCity._id,
        to_city_id: toCity._id,
        date_start: departureDate ? formatApiDate(departureDate) : undefined,
        date_end: arrivalDate ? formatApiDate(arrivalDate) : undefined,
      }),
    )

    navigate('/booking/trains')
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
