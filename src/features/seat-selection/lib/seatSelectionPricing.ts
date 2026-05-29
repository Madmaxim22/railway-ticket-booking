import type { SeatSelectionTicketCounts } from '../constants'
import { CHILD_SEAT_PRICE_RATIO } from '@/entities/booking/lib/pricingConstants'
import type { BookingPassengerPrices } from '@/store/slices/bookingSlice'
import type { Carriage, TrainOption } from '../types'

export { CHILD_SEAT_PRICE_RATIO } from '@/entities/booking/lib/pricingConstants'

export type TrainSeatSelection = {
  carriageId: string
  seats: number[]
}

export function getSeatPrice(carriage: Carriage, seatNumber: number): number {
  if (carriage.type === 'seated') {
    return carriage.bottomPrice
  }

  if (carriage.type === 'lux') {
    return carriage.luxPrice ?? carriage.bottomPrice
  }

  if (carriage.sidePrice && seatNumber > 32) {
    return carriage.sidePrice
  }

  return seatNumber % 2 === 0 ? carriage.topPrice : carriage.bottomPrice
}

export function calculateCarriageSeatsTotal(carriage: Carriage, seatNumbers: number[]): number {
  return seatNumbers.reduce((total, seatNumber) => total + getSeatPrice(carriage, seatNumber), 0)
}

function findCarriage(train: TrainOption, carriageId: string): Carriage | undefined {
  return train.carriages.find((carriage) => carriage.id === carriageId)
}

function collectSeatPrices(train: TrainOption, selection: TrainSeatSelection): number[] {
  const carriage = findCarriage(train, selection.carriageId)
  if (!carriage) return []
  return selection.seats.map((seatNumber) => getSeatPrice(carriage, seatNumber))
}

/**
 * Распределяет цены выбранных мест по категориям пассажиров:
 * на каждом направлении первые `adults` мест — по полной цене, остальные — со скидкой для детей.
 */
export function calculateBookingPassengerPrices(
  trains: TrainOption[],
  selectionsByTrainId: Record<string, TrainSeatSelection>,
  counts: SeatSelectionTicketCounts,
): { passengerPrices: BookingPassengerPrices; totalPrice: number } {
  let adultsTotal = 0
  let childrenTotal = 0

  for (const train of trains) {
    const selection = selectionsByTrainId[train.id]
    if (!selection) continue

    const seatPrices = collectSeatPrices(train, selection)
    seatPrices.forEach((price, index) => {
      if (index < counts.adults) {
        adultsTotal += price
      } else {
        childrenTotal += Math.round(price * CHILD_SEAT_PRICE_RATIO)
      }
    })
  }

  const childrenWithoutSeatTotal = 0

  return {
    passengerPrices: {
      adults: adultsTotal,
      children: childrenTotal,
      childrenWithoutSeat: childrenWithoutSeatTotal,
    },
    totalPrice: adultsTotal + childrenTotal + childrenWithoutSeatTotal,
  }
}
