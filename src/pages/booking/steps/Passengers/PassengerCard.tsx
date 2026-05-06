import { DropdownField } from '@/components/DropdownField/DropdownField'
import { CheckboxField, DateField, DocumentField, GenderField, TextField } from '@/components/FormField/FormField'
import { DigitCellsInput } from '@/components/FormField/DigitCellsInput'
import {
  ErrorStatusIcon,
  RemovePassengerIcon,
  SuccessStatusIcon,
  ToggleCloseIcon,
  ToggleOpenIcon,
} from '@/shared/ui/icons/passengers/PassengerFormIcons'

import {
  DOCUMENT_OPTIONS,
  TYPE_OPTIONS,
  type Passenger,
  type PassengerFooterState,
  type PassengerValidationErrors,
} from './passengers.types'

export type PassengerCardProps = {
  passenger: Passenger
  index: number
  isOpen: boolean
  onToggleOpen: () => void
  onChange: <K extends keyof Passenger>(id: number, key: K, value: Passenger[K]) => void
  onRemove: (id: number) => void
  errors?: PassengerValidationErrors
  footerState?: PassengerFooterState
  onNextPassenger: (id: number) => void
}

export function PassengerCard({
  passenger: p,
  index,
  isOpen,
  onToggleOpen,
  onChange,
  onRemove,
  errors = {},
  footerState = 'default',
  onNextPassenger,
}: PassengerCardProps) {
  const id = p.id
  const isErrorFooter = footerState === 'error'
  const isSuccessFooter = footerState === 'success'
  const footerErrors = Array.from(new Set(Object.values(errors).filter(Boolean)))

  return (
    <section className="passenger-card">
      <header className={`passenger-card__header${isOpen ? ' passenger-card__header--open' : ''}`}>
        <button type="button" className="passenger-card__toggle-btn" aria-label="Свернуть" onClick={onToggleOpen}>
          {isOpen ? (
            <ToggleOpenIcon className="passenger-card__toggle-icon passenger-card__toggle-icon--open" />
          ) : (
            <ToggleCloseIcon className="passenger-card__toggle-icon passenger-card__toggle-icon--close" />
          )}
        </button>

        <h2 className="passenger-card__title">Пассажир {index + 1}</h2>

        {isOpen && (
          <button
            type="button"
            className="passenger-card__remove-btn"
            aria-label="Удалить пассажира"
            onClick={() => onRemove(id)}
          >
            <RemovePassengerIcon className="passenger-card__remove-icon" />
          </button>
        )}
      </header>

      {isOpen && (
        <div className="passenger-card__body">
          <div className="passenger-card__block passenger-card__block--type">
            <DropdownField 
              value={p.type}  
              options={TYPE_OPTIONS}
              onChange={next => onChange(id, 'type', next)}
            />
          </div>

          <div className="passenger-card__block passenger-card__block--fio">
            <TextField 
              label="Фамилия" 
              inputClassName="field-label__field field-label__field--fio" 
              value={p.lastName} 
              onChange={e => onChange(id, 'lastName', e.target.value)} 
              invalid={Boolean(errors.lastName)}
            />
            <TextField 
              label="Имя" 
              inputClassName="field-label__field field-label__field--fio" 
              value={p.firstName} 
              onChange={e => onChange(id, 'firstName', e.target.value)} 
              invalid={Boolean(errors.firstName)}
            />
            <TextField 
              label="Отчество" 
              inputClassName="field-label__field field-label__field--fio" 
              value={p.middleName} 
              onChange={e => onChange(id, 'middleName', e.target.value)} 
              invalid={Boolean(errors.middleName)}
            />
          </div>

          <div className="passenger-card__block passenger-card__block--gender-birth">
            <GenderField 
              label="Пол" 
              value={p.gender} 
              onChange={next => onChange(id, 'gender', next)} 
            />

            <DateField
              label="Дата рождения"
              inputClassName="field-label__field field-label__field--birth-date"
              placeholder="дд.мм.гггг"
              value={p.birthDate}
              onChange={next => onChange(id, 'birthDate', next)}
              invalid={Boolean(errors.birthDate)}
            />
          </div>

          <div className="passenger-card__block passenger-card__block--limited-mobility">
            <CheckboxField
              label="ограниченная подвижность"
              checked={p.limitedMobility}
              onChange={next => onChange(id, 'limitedMobility', next)}
            />
          </div>


          <div className="passenger-card__block passenger-card__block--document">
            <DocumentField label="Тип документа">
              <DropdownField
                className={p.documentType === 'birth_certificate' ? 'document-label__dropdown document-label__dropdown--birth-certificate' : 'document-label__dropdown'}
                value={p.documentType}
                options={DOCUMENT_OPTIONS}
                onChange={next => onChange(id, 'documentType', next)}
              />
            </DocumentField>
            
            {p.documentType === 'passport' && (
              <>
                <DigitCellsInput
                  label="Серия"
                  length={4}
                  value={p.series}
                  onChange={next => onChange(id, 'series', next)}
                  variant="passport"
                  invalid={Boolean(errors.series)}
                />
                <DigitCellsInput
                  label="Номер"
                  length={6}
                  value={p.number}
                  onChange={next => onChange(id, 'number', next)}
                  variant="passport"
                  invalid={Boolean(errors.number)}
                />
              </>
            )}

            {p.documentType === 'birth_certificate' && (
              <DigitCellsInput
                label="Номер"
                length={12}
                value={p.number}
                onChange={next => onChange(id, 'number', next)}
                variant="birth_certificate"
                placeholder="12 символов"
                invalid={Boolean(errors.number)}
              />
            )}
          </div>

          {isErrorFooter ? (
            <div className="passenger-card__footer passenger-card__footer--error">
              <ErrorStatusIcon />

              {footerErrors.length > 0 ? (
                <ul className="passenger-card__footer-errors">
                  {footerErrors.map(errorText => (
                    <li key={errorText} className="passenger-card__footer-error-item">
                      {errorText}
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          ) : isSuccessFooter ? (
            <div className="passenger-card__footer passenger-card__footer--success">
              <SuccessStatusIcon />
              <span className="passenger-card__footer-success-text">Готово</span>
              <button
                type="button"
                className="next-passenger-btn next-passenger-btn--success"
                onClick={() => onNextPassenger(id)}
              >
                Следующий пассажир
              </button>
            </div>
          ) : (
            <div className="passenger-card__footer">
              <button type="button" className="next-passenger-btn" onClick={() => onNextPassenger(id)}>
                Следующий пассажир
              </button>
            </div>
          )}
        </div>
      )}
    </section>
  )
}
