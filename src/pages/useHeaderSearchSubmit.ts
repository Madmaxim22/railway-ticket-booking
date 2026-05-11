import { useCallback, useLayoutEffect, useState, type FormEvent, type MutableRefObject } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  buildRoutesSearchQuery,
  routesApi,
  type RoutesSearchParams,
} from '@/store/api/routesApi'
import { useAppDispatch } from '@/store/hooks'
import { formatApiDate } from '@/shared/lib/formatApiDate'
import type { HeaderCitySearchFields } from './useHeaderCitySearchFields'

export function useHeaderSearchSubmit(
  citySearch: HeaderCitySearchFields,
  clearFormErrorRef: MutableRefObject<(() => void) | null>,
) {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [departureDate, setDepartureDateInternal] = useState<Date | null>(null)
  const [arrivalDate, setArrivalDateInternal] = useState<Date | null>(null)
  const [formError, setFormError] = useState<string | null>(null)

  const clearFormError = useCallback(() => {
    setFormError(null)
  }, [])

  useLayoutEffect(() => {
    clearFormErrorRef.current = clearFormError
    return () => {
      clearFormErrorRef.current = null
    }
  }, [clearFormError, clearFormErrorRef])

  const setDepartureDate = (date: Date | null) => {
    clearFormError()
    setDepartureDateInternal(date)
  }

  const setArrivalDate = (date: Date | null) => {
    clearFormError()
    setArrivalDateInternal(date)
  }

  const {
    setFromCity,
    setToCity,
    resolveFromByLastSuggestions,
    resolveToByLastSuggestions,
  } = citySearch

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    clearFormError()

    const resolvedFromResult = resolveFromByLastSuggestions()
    if (resolvedFromResult.reason === 'ambiguous') {
      setFormError('Город отправления найден в нескольких вариантах. Выберите город из подсказок.')
      return
    }
    const resolvedFrom = resolvedFromResult.city
    if (!resolvedFrom?._id || !resolvedFrom.name) {
      setFormError('Укажите город отправления: выберите точное значение из подсказок.')
      return
    }

    const resolvedToResult = resolveToByLastSuggestions()
    if (resolvedToResult.reason === 'ambiguous') {
      setFormError('Город прибытия найден в нескольких вариантах. Выберите город из подсказок.')
      return
    }
    const resolvedTo = resolvedToResult.city
    if (!resolvedTo?._id || !resolvedTo.name) {
      setFormError('Укажите город прибытия: выберите точное значение из подсказок.')
      return
    }

    setFromCity(resolvedFrom)
    setToCity(resolvedTo)

    const params: RoutesSearchParams = {
      from_city_id: resolvedFrom._id,
      to_city_id: resolvedTo._id,
    }
    if (departureDate) {
      params.date_start = formatApiDate(departureDate)
    }
    if (arrivalDate) {
      params.date_start_arrival = formatApiDate(arrivalDate)
    }
    const prefetchParams: RoutesSearchParams = {
      ...params,
      limit: 5,
      offset: 0,
      sort: 'date',
    }

    try {
      await dispatch(
        routesApi.endpoints.searchRoutes.initiate(prefetchParams, { forceRefetch: true }),
      ).unwrap()

      const qs = buildRoutesSearchQuery(params)
      navigate({
        pathname: '/booking/trains',
        search: qs.startsWith('?') ? qs.slice(1) : qs,
      })
    } catch (error) {
      console.error('Не удалось загрузить маршруты перед переходом', error)
      setFormError('Не удалось загрузить маршруты. Попробуйте ещё раз.')
    }
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
