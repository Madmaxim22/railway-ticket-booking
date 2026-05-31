import { describe, expect, it } from 'vitest'

import {
  buildBookingSuccessNavigationState,
  formatOrderNumber,
  formatPayerGreetingName,
  readBookingSuccessNavigationState,
} from './bookingSuccessNavigation'

describe('formatPayerGreetingName', () => {
  it('собирает имя и отчество с восклицательным знаком', () => {
    expect(
      formatPayerGreetingName({
        firstName: 'Иван',
        lastName: 'Иванов',
        patronymic: 'Иванович',
        phone: '',
        email: '',
      }),
    ).toBe('Иван Иванович!')
  })
})

describe('formatOrderNumber', () => {
  it('возвращает номер из 3 цифр и 2 букв', () => {
    const value = formatOrderNumber(new Date('2026-05-31T12:34:56.789Z'))
    expect(value).toMatch(/^\d{3}[А-Я]{2}$/)
  })
})

describe('buildBookingSuccessNavigationState', () => {
  it('берёт order_id и total из ответа API, если они есть', () => {
    expect(
      buildBookingSuccessNavigationState(
        { status: true, order_id: ' 285АА ', total: 7760 },
        1000,
        {
          firstName: 'Иван',
          lastName: 'Иванов',
          patronymic: 'Иванович',
          phone: '',
          email: '',
        },
      ),
    ).toEqual({
      orderCreated: true,
      orderNumber: '285АА',
      totalPrice: 7760,
      payerGreeting: 'Иван Иванович!',
    })
  })

  it('подставляет сумму бронирования и генерирует номер, если API их не вернул', () => {
    const state = buildBookingSuccessNavigationState({ status: true }, 4321, null)

    expect(state.orderCreated).toBe(true)
    expect(state.totalPrice).toBe(4321)
    expect(state.orderNumber).toMatch(/^\d{3}[А-Я]{2}$/)
    expect(state.payerGreeting).toBe('Уважаемый клиент!')
  })
})

describe('readBookingSuccessNavigationState', () => {
  it('возвращает null без флага orderCreated', () => {
    expect(readBookingSuccessNavigationState({ orderNumber: '123', totalPrice: 100 })).toBeNull()
  })

  it('принимает валидное состояние навигации', () => {
    expect(
      readBookingSuccessNavigationState({
        orderCreated: true,
        orderNumber: '285АА',
        totalPrice: 7760,
        payerGreeting: 'Иван Иванович!',
      }),
    ).toEqual({
      orderCreated: true,
      orderNumber: '285АА',
      totalPrice: 7760,
      payerGreeting: 'Иван Иванович!',
    })
  })
})
