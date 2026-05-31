import { createSelector, createSlice, type PayloadAction } from '@reduxjs/toolkit'

import type { RootState } from '@/store/store'

import {
  DEFAULT_TICKET_COUNTS,
  type SeatSelectionTicketCounts,
} from '@/entities/booking/model/ticketCounts'
import type { Passenger } from '@/entities/passenger/model/passenger.types'
import type { RouteDirectionSegment } from '@/store/api/routesResponse.types'

export type PaymentMethod = 'online' | 'cash'

export type BookingContactInfo = {
  firstName: string
  lastName: string
  patronymic: string
  phone: string
  email: string
}

export type BookingSeatSelection = {
  carriageId: string
  seats: number[]
}

export type BookingDirection = {
  routeId: string
  segment: RouteDirectionSegment
}

export type BookingPassengerPrices = {
  adults: number
  children: number
  childrenWithoutSeat: number
}

export type BookingState = {
  departure: BookingDirection | null
  returnTrip: BookingDirection | null
  departureSeats: BookingSeatSelection | null
  returnTripSeats: BookingSeatSelection | null
  ticketCounts: SeatSelectionTicketCounts
  passengerPrices: BookingPassengerPrices | null
  totalPrice: number | null
  passengers: Passenger[]
  contactInfo: BookingContactInfo | null
  paymentMethod: PaymentMethod | null
}

const initialState: BookingState = {
  departure: null,
  returnTrip: null,
  departureSeats: null,
  returnTripSeats: null,
  ticketCounts: { ...DEFAULT_TICKET_COUNTS },
  passengerPrices: null,
  totalPrice: null,
  passengers: [],
  contactInfo: null,
  paymentMethod: null,
}

export const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    setSelectedRoutes(
      state,
      action: PayloadAction<{ departure: BookingDirection; returnTrip?: BookingDirection }>,
    ) {
      state.departure = action.payload.departure
      state.returnTrip = action.payload.returnTrip ?? null
      state.departureSeats = null
      state.returnTripSeats = null
      state.passengerPrices = null
      state.totalPrice = null
    },
    setSeatSelections(
      state,
      action: PayloadAction<{
        departure: BookingSeatSelection
        returnTrip?: BookingSeatSelection
      }>,
    ) {
      state.departureSeats = action.payload.departure
      state.returnTripSeats = action.payload.returnTrip ?? null
    },
    setTicketCounts(state, action: PayloadAction<SeatSelectionTicketCounts>) {
      state.ticketCounts = action.payload
      state.passengerPrices = null
      state.totalPrice = null
    },
    setBookingPricing(
      state,
      action: PayloadAction<{ passengerPrices: BookingPassengerPrices; totalPrice: number }>,
    ) {
      state.passengerPrices = action.payload.passengerPrices
      state.totalPrice = action.payload.totalPrice
    },
    setPassengers(state, action: PayloadAction<Passenger[]>) {
      state.passengers = action.payload
    },
    setContactInfo(state, action: PayloadAction<BookingContactInfo>) {
      state.contactInfo = action.payload
    },
    setPaymentMethod(state, action: PayloadAction<PaymentMethod>) {
      state.paymentMethod = action.payload
    },
    resetBooking: () => ({
      ...initialState,
      ticketCounts: { ...DEFAULT_TICKET_COUNTS },
    }),
  },
})

export const {
  setSelectedRoutes,
  setSeatSelections,
  setTicketCounts,
  setBookingPricing,
  setPassengers,
  setContactInfo,
  setPaymentMethod,
  resetBooking,
} = bookingSlice.actions
export const bookingReducer = bookingSlice.reducer

export const selectBooking = (state: RootState) => state.booking

export const selectBookingTicketCounts = createSelector(
  selectBooking,
  (booking) => booking.ticketCounts,
)

export const selectBookingPassengers = createSelector(
  selectBooking,
  (booking) => booking.passengers,
)

export const selectBookingPaymentMethod = createSelector(
  selectBooking,
  (booking) => booking.paymentMethod,
)

export const selectBookingContactInfo = createSelector(
  selectBooking,
  (booking) => booking.contactInfo,
)
