export type SeatSelectionTicketCounts = {
  adults: number
  children: number
  childrenWithoutSeat: number
}

export type TicketCountKey = keyof SeatSelectionTicketCounts

export const DEFAULT_TICKET_COUNTS: SeatSelectionTicketCounts = {
  adults: 2,
  children: 1,
  childrenWithoutSeat: 0,
}

export const TICKET_COUNT_LIMITS = {
  adults: { min: 1, max: 5 },
  children: { min: 0, max: 4 },
  childrenWithoutSeat: { min: 0 },
} as const

/** Места на схеме нужны всем, кроме детей «без места». */
export function getRequiredSeatsCount(
  counts: SeatSelectionTicketCounts = DEFAULT_TICKET_COUNTS,
): number {
  return counts.adults + counts.children
}

/** Все пассажиры, для которых нужно заполнить данные на шаге «Пассажиры». */
export function getTotalPassengerCount(
  counts: SeatSelectionTicketCounts = DEFAULT_TICKET_COUNTS,
): number {
  return counts.adults + counts.children + counts.childrenWithoutSeat
}
