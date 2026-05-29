import {
  getRequiredSeatsCount,
  type SeatSelectionTicketCounts,
} from '../constants'
import type { TrainOption } from '../types'

function formatPassengerBreakdown(counts: SeatSelectionTicketCounts): string {
  const parts: string[] = []
  if (counts.adults > 0) {
    parts.push(`${counts.adults} взросл${counts.adults === 1 ? 'ый' : 'ых'}`)
  }
  if (counts.children > 0) {
    parts.push(`${counts.children} детск${counts.children === 1 ? 'ий' : 'их'}`)
  }
  return parts.join(', ')
}

function formatDirectionSuffix(trainIndex: number, trainsCount: number): string {
  if (trainsCount <= 1) return ''
  return trainIndex === 0 ? ' (поезд туда)' : ' (поезд обратно)'
}

export function validateSeatSelection(
  trains: TrainOption[],
  selectedSeatsByTrainId: Record<string, number[]>,
  counts: SeatSelectionTicketCounts,
): string | null {
  const required = getRequiredSeatsCount(counts)
  const breakdown = formatPassengerBreakdown(counts)

  for (let index = 0; index < trains.length; index += 1) {
    const train = trains[index]
    const selected = selectedSeatsByTrainId[train.id]?.length ?? 0
    if (selected === required) continue

    const direction = formatDirectionSuffix(index, trains.length)

    if (selected === 0) {
      return `Выберите ${required} мест на схеме${direction} в соответствии с количеством пассажиров: ${breakdown}.`
    }

    return `На схеме${direction} выбрано ${selected} из ${required} мест. Выберите места в соответствии с количеством пассажиров (${breakdown}).`
  }

  return null
}
