import type { BookingContactInfo } from '@/store/slices/bookingSlice'

const CYRILLIC_RE = /^[А-ЯЁ]+$/i
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const REQUIRED_FIELD_MESSAGE = 'Поле обязательно для заполнения'

export type ContactValidationErrors = Partial<Record<keyof BookingContactInfo, string>>

export type ContactValidationResult = {
  isValid: boolean
  errors: ContactValidationErrors
}

function validateCyrillicName(
  value: string,
  errors: ContactValidationErrors,
  key: 'firstName' | 'lastName' | 'patronymic',
  required: boolean,
) {
  const normalized = value.trim()

  if (!normalized) {
    if (required) {
      errors[key] = REQUIRED_FIELD_MESSAGE
    }
    return
  }

  if (!CYRILLIC_RE.test(normalized)) {
    errors[key] = 'Только буквы русского языка'
  }
}

function validatePhone(phone: string, errors: ContactValidationErrors) {
  const trimmed = phone.trim()

  if (!trimmed) {
    errors.phone = REQUIRED_FIELD_MESSAGE
    return
  }

  const digits = trimmed.replace(/\D/g, '')
  if (digits.length < 10) {
    errors.phone = 'Укажите номер телефона полностью'
  }
}

function validateEmail(email: string, errors: ContactValidationErrors) {
  const trimmed = email.trim()

  if (!trimmed) {
    errors.email = REQUIRED_FIELD_MESSAGE
    return
  }

  if (!EMAIL_RE.test(trimmed)) {
    errors.email = 'Укажите корректный e-mail'
  }
}

export function validateContactInfo(contact: BookingContactInfo): ContactValidationResult {
  const errors: ContactValidationErrors = {}

  validateCyrillicName(contact.lastName, errors, 'lastName', true)
  validateCyrillicName(contact.firstName, errors, 'firstName', true)
  validateCyrillicName(contact.patronymic, errors, 'patronymic', false)
  validatePhone(contact.phone, errors)
  validateEmail(contact.email, errors)

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}

export function isValidContactInfo(
  contact: BookingContactInfo | null,
): contact is BookingContactInfo {
  return contact != null && validateContactInfo(contact).isValid
}
