import { configureStore, type Middleware, type Store } from '@reduxjs/toolkit'
import type { RootState } from '@/store/store'
import { describe, expect, it, beforeEach } from 'vitest'

import { DEFAULT_TICKET_COUNTS } from '@/entities/booking/model/ticketCounts'
import {
  clearBookingSession,
  loadBookingFromSession,
  saveBookingToSession,
} from '@/store/persist/bookingSessionPersist'
import { handleBookingPersistAction } from '@/store/persist/subscribeBookingSessionPersist'
import { resetLocalBookingState } from '@/store/lib/resetLocalBookingState'
import {
  bookingReducer,
  setSelectedRoutes,
  type BookingState,
} from '@/store/slices/bookingSlice'

type TestState = { booking: BookingState }

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
  totalPrice: 1000,
  passengers: [],
  contactInfo: null,
  paymentMethod: 'online',
}

const testBookingPersistMiddleware: Middleware<object, TestState> =
  (storeApi) => (next) => (action) => {
    const result = next(action)
    handleBookingPersistAction(action, () => storeApi.getState() as RootState)
    return result
  }

function createTestStore(): Store<TestState> {
  const store = configureStore({
    reducer: { booking: bookingReducer },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(testBookingPersistMiddleware),
  })

  return store
}

describe('resetLocalBookingState', () => {
  let store: Store<TestState>

  beforeEach(() => {
    clearBookingSession()
    store = createTestStore()
  })

  it('сбрасывает booking в store', () => {
    store.dispatch(setSelectedRoutes({ departure: sampleBooking.departure! }))

    resetLocalBookingState(store.dispatch)

    expect(store.getState().booking.departure).toBeNull()
    expect(store.getState().booking.departureSeats).toBeNull()
    expect(store.getState().booking.totalPrice).toBeNull()
  })

  it('очищает sessionStorage', () => {
    saveBookingToSession(sampleBooking)
    expect(loadBookingFromSession()).not.toBeUndefined()

    resetLocalBookingState(store.dispatch)

    expect(loadBookingFromSession()).toBeUndefined()
  })
})
