import type { Passenger, PassengerValidationResult } from './passengers.types'

const CYRILLIC_RE = /^[А-ЯЁ]+$/i
const BIRTH_DATE_FORMAT_RE = /^\d{2}\.\d{2}\.\d{4}$/
const PASSPORT_SERIES_RE = /^\d{4}$/
const PASSPORT_NUMBER_RE = /^\d{6}$/
const BIRTH_CERT_NUMBER_RE = /^(?:I|II|III|IV|V|VI|VII|VIII)[А-ЯЁ]{2}\d{6}$/

export const BIRTH_CERTIFICATE_HINT = 'Номер свидетельства о рождении указан некорректно\nПример: VIIIУН123124'

const normalize = (value: string) => value.trim().toUpperCase()

export function usePassengerValidation() {
  const validatePassenger = (passenger: Passenger): PassengerValidationResult => {
    const errors: PassengerValidationResult['errors'] = {}

    const lastName = normalize(passenger.lastName)
    const firstName = normalize(passenger.firstName)
    const middleName = normalize(passenger.middleName)
    const birthDate = passenger.birthDate.trim()
    const series = passenger.series.trim()
    const number = normalize(passenger.number)

    if (!lastName) {
      errors.lastName = 'Поле обязательно для заполнения'
    } else if (!CYRILLIC_RE.test(lastName)) {
      errors.lastName = 'Только буквы русского языка'
    }

    if (!firstName) {
      errors.firstName = 'Поле обязательно для заполнения'
    } else if (!CYRILLIC_RE.test(firstName)) {
      errors.firstName = 'Только буквы русского языка'
    }

    if (middleName && !CYRILLIC_RE.test(middleName)) {
      errors.middleName = 'Только буквы русского языка'
    }

    if (!BIRTH_DATE_FORMAT_RE.test(birthDate)) {
      errors.birthDate = 'Введите дату в формате дд.мм.гггг'
    } else {
      const [dayRaw, monthRaw, yearRaw] = birthDate.split('.')
      const day = Number(dayRaw)
      const month = Number(monthRaw)
      const year = Number(yearRaw)

      if (month > 12) {
        errors.birthDate = 'Некорректно указан месяц'
      } else if (day > 31) {
        errors.birthDate = 'Некорректно указано число'
      } else {
        const parsedDate = new Date(year, month - 1, day)
        const isInvalidCalendarDate =
          parsedDate.getFullYear() !== year || parsedDate.getMonth() !== month - 1 || parsedDate.getDate() !== day

        if (!isInvalidCalendarDate) {
          const today = new Date()
          today.setHours(0, 0, 0, 0)

          if (parsedDate > today) {
            errors.birthDate = 'Некорректно указана дата'
          }
        }
      }
    }

    if (passenger.documentType === 'passport') {
      if (!PASSPORT_SERIES_RE.test(series)) {
        errors.series = 'Серия паспорта должна содержать 4 цифры'
      }
      if (!PASSPORT_NUMBER_RE.test(number)) {
        errors.number = 'Номер паспорта должен содержать 6 цифр'
      }
    }

    if (passenger.documentType === 'birth_certificate' && !BIRTH_CERT_NUMBER_RE.test(number)) {
      errors.number = BIRTH_CERTIFICATE_HINT
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    }
  }

  return {
    validatePassenger,
  }
}
