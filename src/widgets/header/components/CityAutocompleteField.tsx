import type { ChangeEvent } from 'react'
import LocationPinIcon from '@/shared/ui/icons/LocationPinIcon'
import type { CitySuggestion } from '@/store/api/citiesApi'
import type { useCityAutocompleteField } from '../hooks/useCityAutocompleteField'

type CityAutocompleteFieldState = ReturnType<typeof useCityAutocompleteField>

type CityAutocompleteFieldProps = {
  field: CityAutocompleteFieldState
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
  return (
    <div className="header__search-form-field" onBlur={field.onContainerBlur}>
      <input
        type="text"
        placeholder={placeholder}
        className="header__search-form-input"
        value={field.value}
        onFocus={field.onFocus}
        onChange={onChange}
        onKeyDown={(e) => field.onInputKeyDown(e, onSelect)}
        role="combobox"
        aria-expanded={field.shouldShowSuggestions}
        aria-controls={suggestionsId}
        aria-autocomplete="list"
      />
      {field.shouldShowSuggestions && (
        <ul
          id={suggestionsId}
          className="header__search-form-suggestions"
          role="listbox"
          aria-label={suggestionsAriaLabel}
        >
          {field.isFetching && (
            <li className="header__search-form-suggestion-item header__search-form-suggestion-item--muted">
              Загрузка...
            </li>
          )}
          {!field.isFetching && field.suggestions.length === 0 && (
            <li className="header__search-form-suggestion-item header__search-form-suggestion-item--muted">
              Ничего не найдено
            </li>
          )}
          {!field.isFetching &&
            field.suggestions.map((city, index) => (
              <li key={city._id} role="presentation">
                <button
                  type="button"
                  role="option"
                  aria-selected={field.highlightedIndex === index}
                  className={
                    field.highlightedIndex === index
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
