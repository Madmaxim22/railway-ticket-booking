/** Нормализует ввод до 11 цифр: 7XXXXXXXXXX */
export function parseRussianPhoneDigits(raw: string): string {
  let digits = raw.replace(/\D/g, '')

  if (digits.length === 0) {
    return ''
  }

  if (digits.startsWith('8')) {
    digits = `7${digits.slice(1)}`
  } else if (!digits.startsWith('7')) {
    digits = `7${digits}`
  }

  return digits.slice(0, 11)
}

/** Маска отображения: +7 XXX XXX XX XX */
export function formatRussianPhoneDisplay(raw: string): string {
  const digits = parseRussianPhoneDigits(raw)

  if (digits.length === 0) {
    return ''
  }

  const national = digits.slice(1)
  let formatted = '+7'

  if (national.length > 0) {
    formatted += ` ${national.slice(0, 3)}`
  }
  if (national.length > 3) {
    formatted += ` ${national.slice(3, 6)}`
  }
  if (national.length > 6) {
    formatted += ` ${national.slice(6, 8)}`
  }
  if (national.length > 8) {
    formatted += ` ${national.slice(8, 10)}`
  }

  return formatted
}

/** Мобильный РФ: +7 9XX XXX XX XX */
const RU_MOBILE_PHONE_RE = /^79\d{9}$/

export function isValidRussianPhone(value: string): boolean {
  const digits = parseRussianPhoneDigits(value)
  return RU_MOBILE_PHONE_RE.test(digits)
}
