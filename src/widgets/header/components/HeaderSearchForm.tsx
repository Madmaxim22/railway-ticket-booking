import DatePickerPopover from '@/components/DatePickerPopover'
import CalendarIcon from '@/shared/ui/icons/CalendarIcon'
import SearchSwapIcon from '@/shared/ui/icons/SearchSwapIcon'
import type { HeaderViewProps } from '../hooks/useHeader'
import { CityAutocompleteField } from './CityAutocompleteField'

type HeaderSearchFormProps = Pick<
  HeaderViewProps,
  | 'fromField'
  | 'toField'
  | 'handleFromChange'
  | 'handleToChange'
  | 'handleFromSelect'
  | 'handleToSelect'
  | 'handleSwapDirections'
  | 'departureDate'
  | 'setDepartureDate'
  | 'arrivalDate'
  | 'setArrivalDate'
  | 'handleSubmit'
  | 'formError'
  | 'searchFormPanelClassName'
>

export function HeaderSearchForm({
  fromField,
  toField,
  handleFromChange,
  handleToChange,
  handleFromSelect,
  handleToSelect,
  handleSwapDirections,
  departureDate,
  setDepartureDate,
  arrivalDate,
  setArrivalDate,
  handleSubmit,
  formError,
  searchFormPanelClassName,
}: HeaderSearchFormProps) {
  return (
    <div className={searchFormPanelClassName}>
      <form className="header__search-form" onSubmit={handleSubmit}>
        <div className="header__search-form-body">
          <div className="header__search-form-content-item">
            <p className="header__search-form-title">Направление:</p>
            <div className="header__search-form-fields">
              <CityAutocompleteField
                field={fromField}
                placeholder="Откуда"
                suggestionsId="header-city-from-suggestions"
                suggestionsAriaLabel="Подсказки городов отправления"
                onChange={handleFromChange}
                onSelect={handleFromSelect}
              />
              <button
                type="button"
                className="header__search-form-swap"
                onClick={handleSwapDirections}
                aria-label="Поменять местами откуда и куда"
              >
                <SearchSwapIcon className="header__search-form-swap-icon" />
              </button>
              <CityAutocompleteField
                field={toField}
                placeholder="Куда"
                suggestionsId="header-city-to-suggestions"
                suggestionsAriaLabel="Подсказки городов прибытия"
                onChange={handleToChange}
                onSelect={handleToSelect}
              />
            </div>
          </div>

          <div className="header__search-form-content-item">
            <p className="header__search-form-title">Дата:</p>
            <div className="header__search-form-fields">
              <div className="header__search-form-field">
                <DatePickerPopover
                  id="departure-date"
                  value={departureDate}
                  onChange={setDepartureDate}
                  placeholder="Дата отправления"
                  inputClassName="header__search-form-input"
                />
                <CalendarIcon className="header__search-form-icon" />
              </div>
              <div className="header__search-form-field">
                <DatePickerPopover
                  id="arrival-date"
                  value={arrivalDate}
                  onChange={setArrivalDate}
                  placeholder="Дата прибытия"
                  inputClassName="header__search-form-input"
                />
                <CalendarIcon className="header__search-form-icon" />
              </div>
            </div>
          </div>
        </div>
        <button type="submit" className="header__search-form-button">
          найти билеты
        </button>
        {formError ? (
          <p className="header__search-form-error" role="alert">
            {formError}
          </p>
        ) : null}
      </form>
    </div>
  )
}
