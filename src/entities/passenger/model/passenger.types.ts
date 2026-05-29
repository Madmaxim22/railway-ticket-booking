import type { SeatSelectionTicketCounts } from '@/entities/booking/model/ticketCounts'

export type Gender = 'male' | 'female'
export type PassengerType = 'adult' | 'child'

/** Категория из выбора билетов на шаге мест; определяет тип и документ по умолчанию. */
export type PassengerCategory = 'adult' | 'child' | 'childWithoutSeat'

export const TYPE_OPTIONS = [
  { value: 'child', label: 'Детский' },
  { value: 'adult', label: 'Взрослый' },
] as const satisfies readonly { value: PassengerType; label: string }[]

export type DocumentType = 'passport' | 'birth_certificate'

export const DOCUMENT_OPTIONS = [
  { value: 'passport', label: 'Паспорт РФ' },
  { value: 'birth_certificate', label: 'Свидетельство о рождении' },
] as const satisfies readonly { value: DocumentType; label: string }[]

export type Passenger = {
  id: number
  category: PassengerCategory
  type: PassengerType
  lastName: string
  firstName: string
  middleName: string
  gender: Gender
  birthDate: string
  limitedMobility: boolean
  documentType: DocumentType
  series: string
  number: string
}

export type PassengerFieldErrorKey = 'lastName' | 'firstName' | 'middleName' | 'birthDate' | 'series' | 'number'

export type PassengerValidationErrors = Partial<Record<PassengerFieldErrorKey, string>>

export type PassengerFooterState = 'default' | 'error' | 'success'

export type PassengerValidationResult = {
  isValid: boolean
  errors: PassengerValidationErrors
  footerMessage?: string
}

export function getPassengerCategoryAtIndex(
  index: number,
  counts: SeatSelectionTicketCounts,
): PassengerCategory {
  if (index < counts.adults) return 'adult'
  if (index < counts.adults + counts.children) return 'child'
  return 'childWithoutSeat'
}

export function getPassengerCardTitle(
  index: number,
  category: PassengerCategory,
  counts: SeatSelectionTicketCounts,
): string {
  if (category === 'childWithoutSeat') {
    const num = index - counts.adults - counts.children + 1
    return counts.childrenWithoutSeat > 1 ? `Ребёнок без места ${num}` : 'Ребёнок без места'
  }
  return `Пассажир ${index + 1}`
}

export function createPassenger(id: number, category: PassengerCategory = 'adult'): Passenger {
  const isAdult = category === 'adult'
  return {
    id,
    category,
    type: isAdult ? 'adult' : 'child',
    lastName: '',
    firstName: '',
    middleName: '',
    gender: 'female',
    birthDate: '',
    limitedMobility: false,
    documentType: isAdult ? 'passport' : 'birth_certificate',
    series: '',
    number: '',
  }
}
