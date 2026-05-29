import type { TrainOption } from '../types'
import type { TrainSeatSelection } from './seatSelectionPricing'

export function createDefaultTrainSeatSelection(train: TrainOption): TrainSeatSelection | null {
  const firstCarriage = train.carriages[0]
  if (!firstCarriage) return null

  return {
    carriageId: firstCarriage.id,
    seats: [],
  }
}
