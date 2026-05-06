import { DropdownField } from '@/components/DropdownField/DropdownField'
import { CheckboxField, DateField, DocumentField, GenderField, TextField } from '@/components/FormField/FormField'
import { DigitCellsInput } from '@/components/FormField/DigitCellsInput'

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
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="passenger-card__toggle-icon passenger-card__toggle-icon--open"
            >
              <circle cx="16" cy="16" r="15" stroke="#928F94" strokeWidth="2" />
              <line
                x1="8"
                y1="16"
                x2="24"
                y2="16"
                stroke="#928F94"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="passenger-card__toggle-icon passenger-card__toggle-icon--close"
            >
              <path
                d="M14.9444 8.46381L14.9444 14.9449L8.46329 14.9449C7.8604 14.9449 7.40823 15.3971 7.40823 16C7.40823 16.6029 7.8604 17.0551 8.46329 17.0551L14.9444 17.0551L14.9444 23.5362C14.9444 24.1391 15.3966 24.5913 15.9241 24.5159L16.0748 24.5159C16.6777 24.5159 17.1299 24.0637 17.0546 23.5362L17.0546 17.0551L23.385 17.0551C23.9878 17.0551 24.44 16.6029 24.44 16C24.44 15.3971 23.9878 14.9449 23.385 14.9449L17.0546 14.9449L17.0546 8.46381C17.0546 7.86091 16.6024 7.40874 16.0748 7.4841L15.9241 7.4841C15.3212 7.4841 14.8691 7.93628 14.9444 8.46381Z"
                fill="#FFA800"
              />
              <circle cx="16" cy="16" r="15" stroke="#FFA800" strokeWidth="2" />
            </svg>
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
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="passenger-card__remove-icon"
            >
              <path
                d="M10.3 0.3L6 4.6L1.7 0.3C1.3 -0.1 0.7 -0.1 0.3 0.3C-0.1 0.7 -0.1 1.3 0.3 1.7L4.6 6L0.3 10.3C-0.1 10.7 -0.1 11.3 0.3 11.6L0.4 11.7C0.8 12.1 1.4 12.1 1.7 11.7L6 7.4L10.2 11.6C10.6 12 11.2 12 11.6 11.6C12 11.2 12 10.6 11.6 10.2L7.4 6L11.7 1.7C12.1 1.3 12.1 0.7 11.7 0.4L11.6 0.3C11.2 -0.1 10.6 -0.1 10.3 0.3Z"
                fill="#928F94"
              />
            </svg>
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
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M16 32C24.8369 32 32 24.8365 32 16C32 7.16345 24.8369 0 16 0C7.16309 0 0 7.16345 0 16C0 24.8365 7.16309 32 16 32ZM16 14.6L20.2998 10.3C20.5996 9.90002 21.2002 9.90002 21.5996 10.3L21.7002 10.4C22.0996 10.7 22.0996 11.3 21.7002 11.7L17.4004 16L21.5996 20.2C22 20.6 22 21.2 21.5996 21.6C21.3662 21.8337 21.0645 21.9309 20.7744 21.8915C20.5674 21.8634 20.3662 21.7662 20.2002 21.6L16 17.4L11.7002 21.7C11.4004 22.1 10.7998 22.1 10.4004 21.7L10.2998 21.6C9.90039 21.3 9.90039 20.7 10.2998 20.3L14.5996 16L10.2998 11.7C10.0811 11.4811 9.98242 11.2021 10.0029 10.929C10.0205 10.7031 10.1191 10.4811 10.2998 10.3C10.7002 9.90002 11.2998 9.90002 11.7002 10.3L16 14.6Z" fill="white" fill-opacity="0.81"/>
              </svg>

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
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M16 32C24.8369 32 32 24.8365 32 16C32 7.16345 24.8369 0 16 0C7.16309 0 0 7.16345 0 16C0 24.8365 7.16309 32 16 32ZM10.2168 15.8293L10.207 15.8401C9.93262 16.1293 9.93262 16.6112 10.1973 16.9111C10.8311 17.5991 11.4551 18.2819 12.0703 18.9553C12.6914 19.6343 13.3037 20.3038 13.9092 20.9598C13.958 21.0134 14.0361 21.0134 14.085 20.9598L22.8018 11.4272C23.0664 11.1381 23.0664 10.6667 22.8018 10.3776L22.665 10.2169C22.4004 9.92773 21.959 9.92773 21.6953 10.2169L13.9189 18.7213C13.8799 18.7642 13.8311 18.7642 13.791 18.7213C12.9297 17.7681 12.0479 16.7933 11.1768 15.8401C10.9121 15.5509 10.4814 15.5509 10.2168 15.8293Z" fill="#F9FEF7"/>
              </svg>
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
