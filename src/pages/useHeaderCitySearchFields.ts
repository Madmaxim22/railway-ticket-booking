import { useState, type ChangeEvent, type MutableRefObject } from 'react'
import { useCityAutocompleteField } from '@/shared/hooks/useCityAutocompleteField'
import type { CitySuggestion } from '@/store/api/citiesApi'

export function useHeaderCitySearchFields(
  clearFormErrorRef: MutableRefObject<(() => void) | null>,
) {
  const fromField = useCityAutocompleteField()
  const toField = useCityAutocompleteField()
  const [fromCity, setFromCity] = useState<CitySuggestion | null>(null)
  const [toCity, setToCity] = useState<CitySuggestion | null>(null)

  const handleFromChange = (event: ChangeEvent<HTMLInputElement>) => {
    clearFormErrorRef.current?.()
    fromField.onChange(event)
    setFromCity(null)
  }

  const handleToChange = (event: ChangeEvent<HTMLInputElement>) => {
    clearFormErrorRef.current?.()
    toField.onChange(event)
    setToCity(null)
  }

  const handleFromSelect = (city: CitySuggestion) => {
    clearFormErrorRef.current?.()
    fromField.selectSuggestion(city)
    setFromCity(city)
  }

  const handleToSelect = (city: CitySuggestion) => {
    clearFormErrorRef.current?.()
    toField.selectSuggestion(city)
    setToCity(city)
  }

  const resolveFromByLastSuggestions = () => {
    if (fromCity) return { city: fromCity, reason: null as null | 'not_found' | 'ambiguous' }
    const matches = fromField.findExactSuggestions(fromField.value)
    if (matches.length === 1) return { city: matches[0], reason: null as null | 'not_found' | 'ambiguous' }
    if (matches.length > 1) return { city: null, reason: 'ambiguous' as const }
    return { city: null, reason: 'not_found' as const }
  }

  const resolveToByLastSuggestions = () => {
    if (toCity) return { city: toCity, reason: null as null | 'not_found' | 'ambiguous' }
    const matches = toField.findExactSuggestions(toField.value)
    if (matches.length === 1) return { city: matches[0], reason: null as null | 'not_found' | 'ambiguous' }
    if (matches.length > 1) return { city: null, reason: 'ambiguous' as const }
    return { city: null, reason: 'not_found' as const }
  }

  return {
    fromField,
    toField,
    fromCity,
    toCity,
    setFromCity,
    setToCity,
    handleFromChange,
    handleToChange,
    handleFromSelect,
    handleToSelect,
    resolveFromByLastSuggestions,
    resolveToByLastSuggestions,
  }
}

export type HeaderCitySearchFields = ReturnType<typeof useHeaderCitySearchFields>
