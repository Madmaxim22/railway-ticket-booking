import { useEffect, useRef, useState } from 'react'

export type DropdownFieldOption<T extends string = string> = {
  readonly value: T
  readonly label: string
}

export type DropdownFieldProps<T extends string> = {
  value: T
  options: readonly DropdownFieldOption<T>[]
  onChange: (next: T) => void
  className?: string
}

export function useDropdownField<T extends string>({
  value,
  options,
  onChange,
  className = '',
}: DropdownFieldProps<T>) {
  const [menuOpen, setMenuOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const selectedLabel = options.find(o => o.value === value)?.label ?? value

  useEffect(() => {
    if (!menuOpen) return
    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setMenuOpen(false)
    }
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [menuOpen])

  const rootClass =
    `dropdown-field${menuOpen ? ' dropdown-field--open' : ''}` +
    (className ? ` ${className}` : '')

  const toggleMenu = () => setMenuOpen(o => !o)

  const selectOption = (next: T) => {
    onChange(next)
    setMenuOpen(false)
  }

  return {
    rootRef,
    menuOpen,
    rootClass,
    selectedLabel,
    toggleMenu,
    selectOption,
  }
}
