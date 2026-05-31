import { describe, expect, it } from 'vitest'
import { formatTitleCaseWords } from './formatTitleCaseWords'

describe('formatTitleCaseWords', () => {
  it('приводит каждое слово к Title Case', () => {
    expect(formatTitleCaseWords('москва санкт-петербург')).toBe('Москва Санкт-Петербург')
  })

  it('обрезает пробелы по краям', () => {
    expect(formatTitleCaseWords('  москва  ')).toBe('Москва')
  })

  it('сохраняет дефисы внутри слова', () => {
    expect(formatTitleCaseWords('ростов-на-дону')).toBe('Ростов-На-Дону')
  })
})
