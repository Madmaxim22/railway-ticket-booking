import type { RouteDirectionSegment } from '@/store/api/routesResponse.types'

export type SeatSelectionDirection = {
  routeId: string
  segment: RouteDirectionSegment
}

export type SeatSelectionNavigationState = {
  departure: SeatSelectionDirection
  returnTrip?: SeatSelectionDirection
}

export function readSeatSelectionNavigationState(
  state: unknown,
): SeatSelectionNavigationState | null {
  if (!state || typeof state !== 'object') return null
  const value = state as Partial<SeatSelectionNavigationState>
  if (!value.departure?.routeId || !value.departure?.segment) return null
  return {
    departure: value.departure,
    ...(value.returnTrip?.routeId && value.returnTrip?.segment
      ? { returnTrip: value.returnTrip }
      : {}),
  }
}
