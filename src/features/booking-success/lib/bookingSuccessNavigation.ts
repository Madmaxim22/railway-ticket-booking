import type { BookingContactInfo } from '@/store/slices/bookingSlice'

export type BookingSuccessNavigationState = {
  payerGreeting: string
}

export function formatPayerGreetingName(contactInfo: BookingContactInfo): string {
  const parts = [contactInfo.firstName.trim(), contactInfo.patronymic.trim()].filter(Boolean)
  if (parts.length === 0) {
    return ''
  }
  return `${parts.join(' ')}!`
}

export function readBookingSuccessNavigationState(
  state: unknown,
): BookingSuccessNavigationState | null {
  if (!state || typeof state !== 'object') return null
  const value = state as Partial<BookingSuccessNavigationState>
  if (typeof value.payerGreeting !== 'string' || !value.payerGreeting.trim()) {
    return null
  }
  return { payerGreeting: value.payerGreeting }
}
