import { useEffect, useMemo, useRef, useState } from 'react'

type SortOption<T extends string> = {
  readonly value: T
  readonly label: string
}

type UseTrainSortParams<T extends string> = {
  options: readonly SortOption<T>[]
  initialValue?: T
  /** Управляемый режим: значение сортировки снаружи */
  value?: T
  onSelect?: (value: T) => void
}

export function useTrainSort<T extends string>({
  options,
  initialValue,
  value: controlledValue,
  onSelect,
}: UseTrainSortParams<T>) {
  if (options.length === 0) {
    throw new Error('Sort options must contain at least one element')
  }

  const fallbackValue = options[0].value
  const isControlled = controlledValue !== undefined
  const [internalValue, setInternalValue] = useState<T>(() => initialValue ?? fallbackValue)
  const selectedSortValue = isControlled ? (controlledValue as T) : internalValue
  const [isSortMenuOpen, setIsSortMenuOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement | null>(null)

  const selectedSortLabel = useMemo(() => {
    const fallbackLabel = options[0].label
    return (
      options.find((option) => option.value === selectedSortValue)?.label ??
      fallbackLabel
    )
  }, [options, selectedSortValue])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!dropdownRef.current) return
      if (!(event.target instanceof Node)) return
      if (!dropdownRef.current.contains(event.target)) {
        setIsSortMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const toggleSortMenu = () => {
    setIsSortMenuOpen((prev) => !prev)
  }

  const selectSort = (value: T) => {
    onSelect?.(value)
    if (!isControlled) {
      setInternalValue(value)
    }
    setIsSortMenuOpen(false)
  }

  return {
    isSortMenuOpen,
    selectedSortValue,
    selectedSortLabel,
    dropdownRef,
    toggleSortMenu,
    selectSort,
  }
}
