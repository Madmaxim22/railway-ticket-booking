import './DropdownField.css'

import { useDropdownField, type DropdownFieldProps } from './useDropdownField'

export type { DropdownFieldOption, DropdownFieldProps } from './useDropdownField'

export function DropdownField<T extends string>(props: DropdownFieldProps<T>) {
  const { rootRef, menuOpen, rootClass, selectedLabel, toggleMenu, selectOption } =
    useDropdownField(props)
  const { value, options } = props

  return (
    <div className={rootClass} ref={rootRef}>
      <button
        type="button"
        className="dropdown-field__trigger"
        aria-expanded={menuOpen}
        aria-haspopup="true"
        onClick={toggleMenu}
      >
        <span className="dropdown-field__value">{selectedLabel}</span>
        <svg
          width="12"
          height="5"
          viewBox="0 0 12 5"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="dropdown-field__chevron"
          aria-hidden
        >
          <path d="M6 4.58333L0 0H11.5L6 4.58333Z" fill="#928F94" />
        </svg>
      </button>
      {menuOpen && (
        <div className="dropdown-field__panel" role="listbox">
          {options.map(opt => (
            <button
              key={opt.value}
              type="button"
              role="option"
              aria-selected={value === opt.value}
              className="dropdown-field__option"
              onClick={() => selectOption(opt.value)}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
