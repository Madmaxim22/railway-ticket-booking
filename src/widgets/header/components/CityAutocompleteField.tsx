import type { ChangeEvent } from 'react'
import LocationPinIcon from '@/shared/ui/icons/LocationPinIcon'
import type { CitySuggestion } from '@/store/api/citiesApi'
import type { CityAutocompleteFieldApi } from '../hooks/useCityAutocompleteField'

type CityAutocompleteFieldProps = {
  field: CityAutocompleteFieldApi
  placeholder: string
  suggestionsId: string
  suggestionsAriaLabel: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  onSelect: (city: CitySuggestion) => void
}

export function CityAutocompleteField({
  field,
  placeholder,
  suggestionsId,
  suggestionsAriaLabel,
  onChange,
  onSelect,
}: CityAutocompleteFieldProps) {
  const {
    value,
    inputRef,
    onFocus,
    onContainerBlur,
    onInputKeyDown,
    shouldShowSuggestions,
    isFetching,
    suggestions,
    highlightedIndex,
  } = field

  return (
    <div className="header__search-form-field" onBlur={onContainerBlur}>
      <input
        ref={inputRef}
        type="text"
        placeholder={placeholder}
        className="header__search-form-input"
        value={value}
        onFocus={onFocus}
        onChange={onChange}
        onKeyDown={(e) => onInputKeyDown(e, onSelect)}
        role="combobox"
        aria-expanded={shouldShowSuggestions}
        aria-controls={suggestionsId}
        aria-autocomplete="list"
      />
      {shouldShowSuggestions && (
        <ul
          id={suggestionsId}
          className="header__search-form-suggestions"
          role="listbox"
          aria-label={suggestionsAriaLabel}
        >
          {isFetching && (
            <li className="header__search-form-suggestion-item header__search-form-suggestion-item--muted">
              Загрузка...
            </li>
          )}
          {!isFetching && suggestions.length === 0 && (
            <li className="header__search-form-suggestion-item header__search-form-suggestion-item--muted">
              Ничего не найдено
            </li>
          )}
          {!isFetching &&
            suggestions.map((city, index) => (
              <li key={city._id} role="presentation">
                <button
                  type="button"
                  role="option"
                  aria-selected={highlightedIndex === index}
                  className={
                    highlightedIndex === index
                      ? 'header__search-form-suggestion-button header__search-form-suggestion-button--highlighted'
                      : 'header__search-form-suggestion-button'
                  }
                  onMouseDown={() => onSelect(city)}
                >
                  {city.name}
                </button>
              </li>
            ))}
        </ul>
      )}
      <LocationPinIcon className="header__search-form-icon" />
    </div>
  )
}
