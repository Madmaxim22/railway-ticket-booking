export type Gender = 'male' | 'female'
export type PassengerType = 'adult' | 'child'

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

export function createPassenger(id: number): Passenger {
  return {
    id,
    type: 'adult',
    lastName: '',
    firstName: '',
    middleName: '',
    gender: 'female',
    birthDate: '',
    limitedMobility: false,
    documentType: 'passport',
    series: '',
    number: '',
  }
}
