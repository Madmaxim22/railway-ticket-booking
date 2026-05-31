import type { Passenger, PassengerValidationErrors } from '../passengers.types'

export type PassengersFormValidationResult = {
  isValid: boolean
  errors: Record<number, PassengerValidationErrors>
  firstInvalidId: number | null
}

export function validateAllPassengers(
  passengers: Passenger[],
  validatePassenger: (passenger: Passenger) => { isValid: boolean; errors: PassengerValidationErrors },
): PassengersFormValidationResult {
  let firstInvalidId: number | null = null
  const errors: Record<number, PassengerValidationErrors> = {}

  for (const passenger of passengers) {
    const result = validatePassenger(passenger)
    errors[passenger.id] = result.errors

    if (!result.isValid && firstInvalidId === null) {
      firstInvalidId = passenger.id
    }
  }

  return {
    isValid: firstInvalidId === null,
    errors,
    firstInvalidId,
  }
}
