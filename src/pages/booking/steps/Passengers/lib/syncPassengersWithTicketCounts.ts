import {
  getTotalPassengerCount,
  type SeatSelectionTicketCounts,
} from '@/pages/booking/steps/SeatSelection/constants'

import {
  createPassenger,
  getPassengerCategoryAtIndex,
  type Passenger,
} from '../passengers.types'

function preservePassengerFields(target: Passenger, source: Passenger): Passenger {
  return {
    ...target,
    lastName: source.lastName,
    firstName: source.firstName,
    middleName: source.middleName,
    gender: source.gender,
    birthDate: source.birthDate,
    limitedMobility: source.limitedMobility,
    series: source.series,
    number: source.number,
  }
}

export function buildPassengersFromTicketCounts(counts: SeatSelectionTicketCounts): Passenger[] {
  const total = getTotalPassengerCount(counts)
  return Array.from({ length: total }, (_, index) =>
    createPassenger(index + 1, getPassengerCategoryAtIndex(index, counts)),
  )
}

export function syncPassengersWithTicketCounts(
  prev: Passenger[],
  counts: SeatSelectionTicketCounts,
): Passenger[] {
  const total = getTotalPassengerCount(counts)
  if (total === 0) return []

  let nextId = prev.reduce((max, p) => Math.max(max, p.id), 0) + 1

  return Array.from({ length: total }, (_, index) => {
    const category = getPassengerCategoryAtIndex(index, counts)
    const existing = prev[index]

    if (existing?.category === category) {
      return existing
    }

    if (existing) {
      return preservePassengerFields(createPassenger(existing.id, category), existing)
    }

    const id = nextId
    nextId += 1
    return createPassenger(id, category)
  })
}
