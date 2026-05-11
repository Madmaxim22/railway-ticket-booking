import { useCallback, useLayoutEffect, useState, type FormEvent, type MutableRefObject } from 'react'
import type { HeaderCitySearchFields } from './useHeaderCitySearchFields'
import type { RoutesQueryParams } from '@/store/api/routesQueryParams.types'
import { useNavigate } from 'react-router-dom'

export function useHeaderSearchSubmit(
  citySearch: HeaderCitySearchFields,
  clearFormErrorRef: MutableRefObject<(() => void) | null>,
  sendServer: (patch?: Partial<RoutesQueryParams>) => void
) {
  const [departureDate, setDepartureDateInternal] = useState<Date | null>(null)
  const [arrivalDate, setArrivalDateInternal] = useState<Date | null>(null)
  const [formError, setFormError] = useState<string | null>(null)
  const navigate = useNavigate()

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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
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

    sendServer({  
      from_city_id: resolvedFrom._id,
      to_city_id: resolvedTo._id,
      ...(departureDate ? { date_start: departureDate } : {}),
      ...(arrivalDate ? { date_end_arrival: arrivalDate } : {}),
    })

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
