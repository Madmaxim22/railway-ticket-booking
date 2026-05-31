import { describe, expect, it } from 'vitest'

import {
  formatRussianPhoneDisplay,
  isValidRussianPhone,
  parseRussianPhoneDigits,
} from './formatRussianPhone'

describe('formatRussianPhone', () => {
  it('форматирует ввод в маску +7 XXX XXX XX XX', () => {
    expect(formatRussianPhoneDisplay('89991234567')).toBe('+7 999 123 45 67')
    expect(formatRussianPhoneDisplay('9991234567')).toBe('+7 999 123 45 67')
  })

  it('нормализует 8 в 7', () => {
    expect(parseRussianPhoneDigits('8 (999) 123-45-67')).toBe('79991234567')
  })

  it('принимает только полный мобильный номер РФ', () => {
    expect(isValidRussianPhone('+7 999 123 45 67')).toBe(true)
    expect(isValidRussianPhone('+7 999 123 45 6')).toBe(false)
    expect(isValidRussianPhone('+7 499 123 45 67')).toBe(false)
  })
})
