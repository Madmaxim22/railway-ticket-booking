import { describe, expect, it } from 'vitest'
import {
  formatRouteDuration,
  formatRoutePrice,
  formatRouteTime,
  routeDateTimeToDate,
} from './routeFormatters'

describe('routeDateTimeToDate', () => {
  it('конвертирует unix-секунды в Date', () => {
    const date = routeDateTimeToDate(1_700_000_000)
    expect(date.getTime()).toBe(1_700_000_000_000)
  })

  it('принимает миллисекунды без умножения', () => {
    const date = routeDateTimeToDate(1_700_000_000_000)
    expect(date.getTime()).toBe(1_700_000_000_000)
  })

  it('возвращает Invalid Date для нуля', () => {
    expect(Number.isNaN(routeDateTimeToDate(0).getTime())).toBe(true)
  })
})

describe('formatRouteDuration', () => {
  it('форматирует длительность в Ч:ММ', () => {
    expect(formatRouteDuration(5400)).toBe('1:30')
  })

  it('возвращает прочерк для отрицательных значений', () => {
    expect(formatRouteDuration(-1)).toBe('—')
  })
})

describe('formatRoutePrice', () => {
  it('форматирует цену с разделителями тысяч', () => {
    expect(formatRoutePrice(12345)).toMatch(/12[\s\u00a0]?345/)
  })
})

describe('formatRouteTime', () => {
  it('форматирует время из unix-секунд', () => {
    const date = new Date(2026, 4, 31, 14, 30)
    const unixSeconds = Math.floor(date.getTime() / 1000)
    expect(formatRouteTime(unixSeconds)).toBe('14:30')
  })
})
