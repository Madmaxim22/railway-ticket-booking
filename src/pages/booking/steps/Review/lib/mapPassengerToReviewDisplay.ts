import {
  DOCUMENT_OPTIONS,
  TYPE_OPTIONS,
  type Passenger,
} from '@/pages/booking/steps/Passengers/passengers.types'

export type OrderReviewPassengerView = {
  id: number
  fullName: string
  type: string
  gender: string
  birthDate: string
  document: string
}

const GENDER_LABELS: Record<Passenger['gender'], string> = {
  male: 'Пол мужской',
  female: 'Пол женский',
}

function getPassengerTypeLabel(passenger: Passenger): string {
  if (passenger.category === 'childWithoutSeat') {
    return 'Ребёнок без места'
  }

  return TYPE_OPTIONS.find(option => option.value === passenger.type)?.label ?? 'Взрослый'
}

function getDocumentLabel(passenger: Passenger): string {
  const documentName =
    DOCUMENT_OPTIONS.find(option => option.value === passenger.documentType)?.label ?? ''
  const series = passenger.series.trim()
  const number = passenger.number.trim()

  if (passenger.documentType === 'passport') {
    return `${documentName} ${series} ${number}`.trim()
  }

  return `${documentName} ${series} ${number}`.trim()
}

export function mapPassengerToReviewDisplay(passenger: Passenger): OrderReviewPassengerView {
  const fullName = [passenger.lastName, passenger.firstName, passenger.middleName]
    .map(part => part.trim())
    .filter(Boolean)
    .join(' ')

  return {
    id: passenger.id,
    fullName,
    type: getPassengerTypeLabel(passenger),
    gender: GENDER_LABELS[passenger.gender],
    birthDate: `Дата рождения ${passenger.birthDate.trim()}`,
    document: getDocumentLabel(passenger),
  }
}
