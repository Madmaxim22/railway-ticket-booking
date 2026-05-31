import { describe, expect, it } from 'vitest'
import { formatApiDate } from './formatApiDate'

describe('formatApiDate', () => {
  it('форматирует дату в YYYY-MM-DD', () => {
    expect(formatApiDate(new Date(2026, 4, 31))).toBe('2026-05-31')
  })

  it('дополняет месяц и день нулями', () => {
    expect(formatApiDate(new Date(2026, 0, 5))).toBe('2026-01-05')
  })
})
