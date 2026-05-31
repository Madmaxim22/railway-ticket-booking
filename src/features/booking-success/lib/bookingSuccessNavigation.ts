import type { BookingContactInfo } from '@/store/slices/bookingSlice'
import type { CreateOrderResponse } from '@/store/api/orderRequest.types'

export type BookingSuccessNavigationState = {
  orderCreated: true
  orderNumber: string
  totalPrice: number
  payerGreeting: string
}

const ORDER_NUMBER_LETTERS = 'АБВГДЕКЛМНОПРСТУ'

export function formatPayerGreetingName(contactInfo: BookingContactInfo): string {
  const parts = [contactInfo.firstName.trim(), contactInfo.patronymic.trim()].filter(Boolean)
  if (parts.length === 0) {
    return ''
  }
  return `${parts.join(' ')}!`
}

export function formatOrderNumber(date = new Date()): string {
  const digits = String(date.getTime() % 1000).padStart(3, '0')
  const letterIndexA = date.getMilliseconds() % ORDER_NUMBER_LETTERS.length
  const letterIndexB = (date.getSeconds() + date.getMinutes()) % ORDER_NUMBER_LETTERS.length
  return `${digits}${ORDER_NUMBER_LETTERS[letterIndexA]}${ORDER_NUMBER_LETTERS[letterIndexB]}`
}

export function buildBookingSuccessNavigationState(
  result: CreateOrderResponse,
  totalPrice: number,
  contactInfo: BookingContactInfo | null,
): BookingSuccessNavigationState {
  const orderNumber = result.order_id?.trim() || formatOrderNumber()
  const payerName = contactInfo ? formatPayerGreetingName(contactInfo) : ''

  return {
    orderCreated: true,
    orderNumber,
    totalPrice: result.total ?? totalPrice,
    payerGreeting: payerName || 'Уважаемый клиент!',
  }
}

export function readBookingSuccessNavigationState(
  state: unknown,
): BookingSuccessNavigationState | null {
  if (!state || typeof state !== 'object') return null

  const value = state as Partial<BookingSuccessNavigationState>
  if (value.orderCreated !== true) return null
  if (typeof value.orderNumber !== 'string' || !value.orderNumber.trim()) return null
  if (
    typeof value.totalPrice !== 'number' ||
    !Number.isFinite(value.totalPrice) ||
    value.totalPrice < 0
  ) {
    return null
  }

  const payerGreeting =
    typeof value.payerGreeting === 'string' && value.payerGreeting.trim()
      ? value.payerGreeting
      : 'Уважаемый клиент!'

  return {
    orderCreated: true,
    orderNumber: value.orderNumber.trim(),
    totalPrice: value.totalPrice,
    payerGreeting,
  }
}
