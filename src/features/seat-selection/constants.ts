import type { CarriageType } from '@/entities/booking/model/seatSelection.types'

export {
  DEFAULT_TICKET_COUNTS,
  TICKET_COUNT_LIMITS,
  getRequiredSeatsCount,
  getTotalPassengerCount,
  type SeatSelectionTicketCounts,
  type TicketCountKey,
} from '@/entities/booking/model/ticketCounts'

export const carriageTabs: Array<{ key: CarriageType; label: string }> = [
  { key: 'seated', label: 'Сидячий' },
  { key: 'platkart', label: 'Плацкарт' },
  { key: 'coupe', label: 'Купе' },
  { key: 'lux', label: 'Люкс' },
]
