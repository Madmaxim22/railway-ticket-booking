import './FormField.css'

import { useId, type ChangeEventHandler } from 'react'

export type GenderFieldProps = {
  label?: string
  value: 'male' | 'female'
  onChange: (next: 'male' | 'female') => void
}

export function GenderField({ label = 'Пол', value, onChange}: GenderFieldProps) {
  const labelId = useId()

  return (
    <div className="field-label field-label--gender">
      <span id={labelId} className="field-label__label">
        {label}
      </span>
      <div className="gender-toggle" role="radiogroup" aria-labelledby={labelId}>
        <button
          type="button"
          role="radio"
          className={value === 'male' ? 'active' : ''}
          aria-checked={value === 'male'}
          aria-label="Мужской"
          onClick={() => onChange('male')}
        >
          М
        </button>
        <button
          type="button"
          role="radio"
          className={value === 'female' ? 'active' : ''}
          aria-checked={value === 'female'}
          aria-label="Женский"
          onClick={() => onChange('female')}
        >
          Ж
        </button>
      </div>
    </div>
  )
}

export type TextFieldProps = {
  label: string
  value: string
  onChange: ChangeEventHandler<HTMLInputElement>
  placeholder?: string
  inputClassName?: string
  invalid?: boolean
  errorText?: string
}

export function TextField({
  label,
  value,
  onChange,
  placeholder,
  inputClassName = 'field',
  invalid = false,
  errorText,
}: TextFieldProps) {
  return (
    <label className="field-label field-label--text">
      <span className="field-label__label">{label}</span>
      <input
        className={[inputClassName, invalid ? 'field-label__field--error' : ''].join(' ').trim()}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        aria-invalid={invalid}
      />
      {errorText ? <span className="field-label__error-text">{errorText}</span> : null}
    </label>
  )
}

export type DateFieldProps = {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  inputClassName?: string
  invalid?: boolean
  errorText?: string
}

function formatDateValue(raw: string) {
  const digits = raw.replace(/\D/g, '').slice(0, 8)

  if (digits.length <= 2) {
    return digits
  }

  if (digits.length <= 4) {
    return `${digits.slice(0, 2)}.${digits.slice(2)}`
  }

  return `${digits.slice(0, 2)}.${digits.slice(2, 4)}.${digits.slice(4)}`
}

export function DateField({
  label,
  value,
  onChange,
  placeholder = 'дд.мм.гггг',
  inputClassName = 'field',
  invalid = false,
  errorText,
}: DateFieldProps) {
  return (
    <label className="field-label field-label--text">
      <span className="field-label__label">{label}</span>
      <input
        className={[inputClassName, invalid ? 'field-label__field--error' : ''].join(' ').trim()}
        value={value}
        onChange={e => onChange(formatDateValue(e.target.value))}
        placeholder={placeholder}
        aria-invalid={invalid}
        inputMode="numeric"
        maxLength={10}
      />
      {errorText ? <span className="field-label__error-text">{errorText}</span> : null}
    </label>
  )
}

export type SelectFieldOption<T extends string = string> = {
  readonly value: T
  readonly label: string
}

export type SelectFieldProps<T extends string> = {
  label: string
  value: T
  options: readonly SelectFieldOption<T>[]
  onChange: (next: T) => void
  selectClassName?: string
}

export function SelectField<T extends string>({
  label,
  value,
  options,
  onChange,
  selectClassName = 'field',
}: SelectFieldProps<T>) {
  return (
    <label className="field-label field-label--select">
      <span>{label}</span>
      <select
        className={selectClassName}
        value={value}
        onChange={e => onChange(e.target.value as T)}
      >
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </label>
  )
}

export type CheckboxFieldProps = {
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
}

export function CheckboxField({ label, checked, onChange}: CheckboxFieldProps) {
  return (
    <div className="field-label field-label--checkbox">
      <input className="checkbox-label__input" type="checkbox" checked={checked} onChange={e => onChange(e.target.checked)} />
      <span className="field-label__label field-label__label--checkbox">{label}</span>
    </div>
  )
}
export type DocumentFieldProps = {
  label: string
  children: React.ReactNode
}

export function DocumentField({ label, children}: DocumentFieldProps) {
  return (
    <div className="field-label field-label--document">
      <span className="document-label__label">{label}</span>
      {children}
    </div>
  )
}