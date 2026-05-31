import { describe, expect, it, beforeEach } from 'vitest'

import { DEFAULT_TICKET_COUNTS } from '@/entities/booking/model/ticketCounts'
import type { BookingState } from '@/store/slices/bookingSlice'
import {
  clearBookingSession,
  loadBookingFromSession,
  sanitizeBookingForSessionRestore,
  saveBookingToSession,
} from './bookingSessionPersist'

const sampleBooking: BookingState = {
  departure: {
    routeId: 'r1',
    segment: {
      _id: 'seg1',
      have_first_class: true,
      have_second_class: true,
      have_third_class: true,
      have_fourth_class: true,
      have_wifi: false,
      have_air_conditioning: false,
      is_express: false,
      train: { _id: 't1', name: 'Поезд' },
      from: {
        railway_station_name: 'A',
        city: { _id: 'c1', name: 'A' },
        datetime: 0,
      },
      to: {
        railway_station_name: 'B',
        city: { _id: 'c2', name: 'B' },
        datetime: 1,
      },
      min_price: 100,
      duration: 60,
      price_info: {
        first: { price: 1, top_price: 1, bottom_price: 1, side_price: 1, linens_price: 0, wifi_price: 0 },
        second: { price: 1, top_price: 1, bottom_price: 1, side_price: 1, linens_price: 0, wifi_price: 0 },
        third: { price: 1, top_price: 1, bottom_price: 1, side_price: 1, linens_price: 0, wifi_price: 0 },
        fourth: { price: 1, top_price: 1, bottom_price: 1, side_price: 1, linens_price: 0, wifi_price: 0 },
      },
      available_seats_info: { first: 1, second: 1, third: 1, fourth: 1 },
    },
  },
  returnTrip: null,
  departureSeats: { carriageId: 'car1', seats: [1] },
  returnTripSeats: null,
  ticketCounts: { ...DEFAULT_TICKET_COUNTS },
  passengerPrices: null,
  totalPrice: null,
  passengers: [],
  contactInfo: null,
  paymentMethod: 'online',
}

describe('bookingSessionPersist', () => {
  beforeEach(() => {
    clearBookingSession()
  })

  it('сохраняет и восстанавливает бронирование без способа оплаты', () => {
    saveBookingToSession(sampleBooking)
    const restored = loadBookingFromSession()

    expect(restored?.departure?.routeId).toBe('r1')
    expect(restored?.paymentMethod).toBeNull()
  })

  it('sanitizeBookingForSessionRestore обнуляет paymentMethod', () => {
    expect(sanitizeBookingForSessionRestore(sampleBooking).paymentMethod).toBeNull()
  })
})
