import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import {
  DEFAULT_TICKET_COUNTS,
  type SeatSelectionTicketCounts,
} from '@/pages/booking/steps/SeatSelection/constants'
import type { Passenger } from '@/pages/booking/steps/Passengers/passengers.types'
import type { RouteDirectionSegment } from '@/store/api/routesResponse.types'

export type PaymentMethod = 'online' | 'cash'

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
  ticketCounts: SeatSelectionTicketCounts
  passengerPrices: BookingPassengerPrices | null
  totalPrice: number | null
  passengers: Passenger[]
  paymentMethod: PaymentMethod | null
}

const initialState: BookingState = {
  departure: null,
  returnTrip: null,
  ticketCounts: { ...DEFAULT_TICKET_COUNTS },
  passengerPrices: null,
  totalPrice: null,
  passengers: [],
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
      state.passengerPrices = null
      state.totalPrice = null
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
  setTicketCounts,
  setBookingPricing,
  setPassengers,
  setPaymentMethod,
  resetBooking,
} = bookingSlice.actions
export const bookingReducer = bookingSlice.reducer

export const selectBooking = (state: { booking: BookingState }) => state.booking
export const selectBookingTicketCounts = (state: { booking: BookingState }) =>
  state.booking.ticketCounts
export const selectBookingPassengers = (state: { booking: BookingState }) =>
  state.booking.passengers
export const selectBookingPaymentMethod = (state: { booking: BookingState }) =>
  state.booking.paymentMethod
