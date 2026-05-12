const locale = 'ru-RU' as const

function capitalizeSegment(segment: string): string {
  if (segment.length === 0) return segment
  return segment[0].toLocaleUpperCase(locale) + segment.slice(1).toLocaleLowerCase(locale)
}

/**
 * Каждое слово с заглавной буквы (по пробелам и по дефису внутри слова), остальные буквы — строчные.
 */
export function formatTitleCaseWords(value: string): string {
  return value
    .trim()
    .split(/\s+/)
    .map((word) => (word.length === 0 ? word : word.split('-').map(capitalizeSegment).join('-')))
    .join(' ')
}
