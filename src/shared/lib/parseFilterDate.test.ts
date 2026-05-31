import { describe, expect, it } from 'vitest'
import { parseFilterDate } from './parseFilterDate'

describe('parseFilterDate', () => {
  it('возвращает null для undefined', () => {
    expect(parseFilterDate(undefined)).toBeNull()
  })

  it('возвращает тот же Date для валидной даты', () => {
    const date = new Date(2026, 4, 31)
    expect(parseFilterDate(date)).toBe(date)
  })

  it('парсит строку ISO', () => {
    const result = parseFilterDate('2026-05-31')
    expect(result).toBeInstanceOf(Date)
    expect(result?.getFullYear()).toBe(2026)
  })

  it('возвращает null для невалидной строки', () => {
    expect(parseFilterDate('not-a-date')).toBeNull()
  })

  it('возвращает null для Invalid Date', () => {
    expect(parseFilterDate(new Date('invalid'))).toBeNull()
  })
})
