import { useState, type ChangeEvent, type MutableRefObject } from 'react'
import { useCityAutocompleteField } from './useCityAutocompleteField'
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
    toField.focusInput()
  }

  const handleToSelect = (city: CitySuggestion) => {
    clearFormErrorRef.current?.()
    toField.selectSuggestion(city)
    setToCity(city)
  }

  const handleSwapDirections = () => {
    clearFormErrorRef.current?.()
    const nextFromValue = toField.value
    const nextToValue = fromField.value
    const nextFromCity = toCity
    const nextToCity = fromCity
    fromField.setInputValue(nextFromValue)
    toField.setInputValue(nextToValue)
    setFromCity(nextFromCity)
    setToCity(nextToCity)
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
    handleSwapDirections,
  }
}

export type HeaderCitySearchFields = ReturnType<typeof useHeaderCitySearchFields>
