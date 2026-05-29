export type BookingEditNavigationState = {
  fromConfirmation?: boolean
}

export function readFromConfirmationFlag(state: unknown): boolean {
  if (!state || typeof state !== 'object') return false
  return Boolean((state as BookingEditNavigationState).fromConfirmation)
}
