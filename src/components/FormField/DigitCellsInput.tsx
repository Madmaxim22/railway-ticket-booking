import './DigitCellsInput.css'

type DigitCellsInputVariant = 'passport' | 'birth_certificate'

type DigitCellsInputProps = {
  label: string
  value: string
  length: number
  onChange: (next: string) => void
  className?: string
  variant?: DigitCellsInputVariant
  placeholder?: string
  invalid?: boolean
  errorText?: string
}

const PASSPORT_ALLOWED_RE = /[^0-9]/g
const BIRTH_CERT_ALLOWED_RE = /[^IVXА-ЯЁ0-9]/g


// TODO: Add strict validation for birth certificate
// const BIRTH_CERT_STRICT_RE = /^(?:X|IX|IV|V?I{1,3})[А-ЯЁ]{2}\d{6}$/

// export const isValidBirthCertificate = (value: string) => {
//   const normalized = value.trim().toUpperCase()
//   return BIRTH_CERT_STRICT_RE.test(normalized)
// }

export function DigitCellsInput({
  label,
  value,
  length,
  onChange,
  className = '',
  variant = 'passport',
  placeholder,
  invalid = false,
  errorText,
}: DigitCellsInputProps) {
  const sanitize = (raw: string) => {
    const cleaned =
      variant === 'birth_certificate'
        ? raw.replace(BIRTH_CERT_ALLOWED_RE, '')
        : raw.replace(PASSPORT_ALLOWED_RE, '')

    return cleaned.slice(0, length)
  }

  const normalized = sanitize(value)
  const chars = normalized.padEnd(length, '_').split('')
  const showPlaceholder = variant === 'birth_certificate' && normalized.length === 0 && Boolean(placeholder)

  const inputMode = variant === 'passport' ? 'numeric' : 'text'
  const pattern = variant === 'passport' ? '[0-9]*' : undefined

  return (
    <label className={`digit-cells digit-cells--${variant} ${invalid ? 'digit-cells--error' : ''} ${className}`.trim()}>
      <span className="digit-cells__label">{label}</span>

      <div className={`digit-cells__control ${invalid ? 'digit-cells__control--error' : ''}`.trim()}>
        <input
          className="digit-cells__native-input"
          value={normalized}
          onChange={e => onChange(sanitize(e.target.value))}
          inputMode={inputMode}
          pattern={pattern}
          autoComplete="off"
          aria-label={label}
          aria-invalid={invalid}
        />

        {showPlaceholder && <span className="digit-cells__placeholder">{placeholder}</span>}

        <div className="digit-cells__cells" aria-hidden="true">
          {chars.map((ch, i) => {
            const isEmpty = ch === '_'
            const isNext = i === normalized.length && normalized.length < length
            return (
              <span
                key={i}
                className={[
                  'digit-cells__cell',
                  isEmpty ? 'digit-cells__cell--empty' : 'digit-cells__cell--filled',
                  isNext ? 'digit-cells__cell--next' : '',
                ].join(' ')}
              >
                {ch}
              </span>
            )
          })}
        </div>
      </div>
      {errorText ? <span className="digit-cells__error-text">{errorText}</span> : null}
    </label>
  )
}