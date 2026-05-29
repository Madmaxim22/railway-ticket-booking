import { skipToken } from '@reduxjs/toolkit/query'
import { useCallback, useEffect, useRef, useState, type ChangeEvent, type FocusEvent, type KeyboardEvent } from 'react'
import { useSearchCitiesQuery, type CitySuggestion } from '@/store/api/citiesApi'
import { useDebounce } from '@/shared/hooks/useDebounce'

function normalizeCityName(value: string) {
  return value.trim().toLowerCase()
}

export function useCityAutocompleteField(initialValue = '') {
  const [value, setValue] = useState(initialValue)
  const [isFocused, setIsFocused] = useState(false)
  const previousLengthRef = useRef(0)
  const inputRef = useRef<HTMLInputElement>(null)

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

  const [highlightedIndex, setHighlightedIndex] = useState(-1)

  const onFocus = () => {
    setIsFocused(true)
  }

  /** Вызывать на обёртке поля (инпут + список), чтобы Tab на кнопки подсказок не закрывал выпадашку. */
  const onContainerBlur = (event: FocusEvent<HTMLElement>) => {
    const next = event.relatedTarget as Node | null
    if (next && event.currentTarget.contains(next)) return
    setIsFocused(false)
    setHighlightedIndex(-1)
  }

  const selectableSuggestions =
    isFocused && trimmedValue.length >= 2 && !isFetching ? suggestions : []

  useEffect(() => {
    setHighlightedIndex(-1)
  }, [trimmedValue, suggestions, isFetching])

  const selectSuggestion = (city: CitySuggestion) => {
    setValue(city.name)
    setIsFocused(false)
    setHighlightedIndex(-1)
  }

  const setInputValue = useCallback((next: string) => {
    setValue(next)
    setHighlightedIndex(-1)
  }, [])

  const focusInput = useCallback(() => {
    requestAnimationFrame(() => {
      inputRef.current?.focus()
    })
  }, [])

  const onInputKeyDown = (event: KeyboardEvent<HTMLInputElement>, onPick: (city: CitySuggestion) => void) => {
    if (!isFocused || trimmedValue.length < 2) return

    if (event.key === 'Escape') {
      event.preventDefault()
      setIsFocused(false)
      setHighlightedIndex(-1)
      return
    }

    const list = selectableSuggestions
    if (list.length === 0) return

    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setHighlightedIndex((i) => (i < 0 ? 0 : Math.min(list.length - 1, i + 1)))
      return
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault()
      setHighlightedIndex((i) => (i <= 0 ? -1 : i - 1))
      return
    }

    if (event.key === 'Enter') {
      const index = highlightedIndex >= 0 ? highlightedIndex : 0
      const city = list[index]
      if (city) {
        event.preventDefault()
        onPick(city)
      }
    }
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
    highlightedIndex,
    selectableSuggestions,
    inputRef,
    onChange,
    onFocus,
    onContainerBlur,
    onInputKeyDown,
    selectSuggestion,
    setInputValue,
    focusInput,
    findExactSuggestions,
  }
}
