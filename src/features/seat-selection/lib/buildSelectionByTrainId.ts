import type { BookingSeatSelection } from '@/store/slices/bookingSlice'

import { createDefaultTrainSeatSelection } from './createDefaultTrainSeatSelection'
import type { CarriageType, TrainOption } from '../types'
import type { TrainSeatSelection } from './seatSelectionPricing'

export type TrainSelectionState = TrainSeatSelection & {
  activeType: CarriageType
}

function getSavedSeatSelectionForTrain(
  trainId: string,
  departureSegmentId: string | undefined,
  returnSegmentId: string | undefined,
  departureSeats: BookingSeatSelection | null,
  returnTripSeats: BookingSeatSelection | null,
): BookingSeatSelection | null {
  if (trainId === departureSegmentId && departureSeats) return departureSeats
  if (trainId === returnSegmentId && returnTripSeats) return returnTripSeats
  return null
}

type BuildSelectionParams = {
  trains: TrainOption[]
  departureSegmentId: string | undefined
  returnSegmentId: string | undefined
  departureSeats: BookingSeatSelection | null
  returnTripSeats: BookingSeatSelection | null
  previous: Record<string, TrainSelectionState>
}

export function buildSelectionByTrainId({
  trains,
  departureSegmentId,
  returnSegmentId,
  departureSeats,
  returnTripSeats,
  previous,
}: BuildSelectionParams): Record<string, TrainSelectionState> {
  const next: Record<string, TrainSelectionState> = {}

  for (const train of trains) {
    const existing = previous[train.id]
    if (existing) {
      next[train.id] = existing
      continue
    }

    const saved = getSavedSeatSelectionForTrain(
      train.id,
      departureSegmentId,
      returnSegmentId,
      departureSeats,
      returnTripSeats,
    )

    if (saved) {
      const carriage = train.carriages.find((item) => item.id === saved.carriageId)
      const activeType = carriage?.type ?? train.carriages[0]?.type ?? 'coupe'

      next[train.id] = {
        carriageId: saved.carriageId,
        seats: [...saved.seats],
        activeType,
      }
      continue
    }

    const defaults = createDefaultTrainSeatSelection(train)
    if (!defaults) continue

    next[train.id] = {
      ...defaults,
      activeType: train.carriages[0]?.type ?? 'coupe',
    }
  }

  return next
}
