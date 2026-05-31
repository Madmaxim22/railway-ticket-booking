import { describe, expect, it } from 'vitest'
import { formatRtkQueryError } from './formatRtkQueryError'

const fallback = 'Что-то пошло не так'

describe('formatRtkQueryError', () => {
  it('возвращает fallback для пустой или неизвестной ошибки', () => {
    expect(formatRtkQueryError(null, fallback)).toBe(fallback)
    expect(formatRtkQueryError(undefined, fallback)).toBe(fallback)
    expect(formatRtkQueryError('network', fallback)).toBe(fallback)
  })

  it('читает message и error из SerializedError', () => {
    expect(formatRtkQueryError({ message: 'Сервер недоступен' }, fallback)).toBe(
      'Сервер недоступен',
    )
    expect(formatRtkQueryError({ error: 'Timeout' }, fallback)).toBe('Timeout')
  })

  it('читает message и error из тела ответа FetchBaseQueryError', () => {
    expect(
      formatRtkQueryError({ status: 400, data: { message: 'Неверный запрос' } }, fallback),
    ).toBe('Неверный запрос')
    expect(formatRtkQueryError({ status: 500, data: { error: 'Internal' } }, fallback)).toBe(
      'Internal',
    )
  })

  it('форматирует ошибку по статусу с настраиваемым префиксом', () => {
    expect(formatRtkQueryError({ status: 404 }, { fallback, statusErrorPrefix: 'Ошибка запроса' })).toBe(
      'Ошибка запроса (404)',
    )
    expect(
      formatRtkQueryError({ status: 500 }, {
        fallback,
        statusErrorPrefix: 'Ошибка оформления заказа',
      }),
    ).toBe('Ошибка оформления заказа (500)')
  })

  it('приоритетно использует message/error, а не статус', () => {
    expect(
      formatRtkQueryError({ status: 500, data: { message: 'Мест нет' } }, {
        fallback,
        statusErrorPrefix: 'Ошибка запроса',
      }),
    ).toBe('Мест нет')
  })
})
