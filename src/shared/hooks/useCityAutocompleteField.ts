import { skipToken } from '@reduxjs/toolkit/query'
import { useEffect, useRef, useState, type ChangeEvent } from 'react'
import { useSearchCitiesQuery, type CitySuggestion } from '@/store/api/citiesApi'
import { useDebounce } from './useDebounce'

function normalizeCityName(value: string) {
  return value.trim().toLowerCase()
}

export function useCityAutocompleteField(initialValue = '') {
  const [value, setValue] = useState(initialValue)
  const [isFocused, setIsFocused] = useState(false)
  const previousLengthRef = useRef(0)

  const trimmedValue = value.trim()
  const debouncedValue = useDebounce(trimmedValue, 350)
  const shouldFetchImmediately = trimmedValue.length >= 2 && previousLengthRef.current < 2
  const query = shouldFetchImmediately ? trimmedValue : debouncedValue

  useEffect(() => {
    previousLengthRef.current = trimmedValue.length
  }, [trimmedValue])

  const { data: suggestions = [], isFetching } = useSearchCitiesQuery(
    query.length >= 2 ? query : skipToken,
  )

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  const onFocus = () => {
    setIsFocused(true)
  }

  const onBlur = () => {
    window.setTimeout(() => setIsFocused(false), 100)
  }

  const selectSuggestion = (city: CitySuggestion) => {
    setValue(city.name)
    setIsFocused(false)
  }

  const findExactSuggestions = (name: string) => {
    const target = normalizeCityName(name)
    if (!target) return [] as CitySuggestion[]
    return suggestions.filter((city) => normalizeCityName(city.name) === target)
  }

  return {
    value,
    query,
    suggestions,
    isFetching,
    shouldShowSuggestions: isFocused && trimmedValue.length >= 2,
    onChange,
    onFocus,
    onBlur,
    selectSuggestion,
    findExactSuggestions,
  }
}
