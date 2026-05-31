import { useCallback, useMemo, useState } from 'react'

import type { BookingSeatSelection } from '@/store/slices/bookingSlice'

import {
  buildSelectionByTrainId,
  type TrainSelectionState,
} from '../lib/buildSelectionByTrainId'
import type { CarriageType, TrainOption } from '../types'

function getActiveTypeForCarriage(
  train: { carriages: Array<{ id: string; type: CarriageType }> },
  carriageId: string,
): CarriageType {
  return train.carriages.find((carriage) => carriage.id === carriageId)?.type ?? 'coupe'
}

type UseSeatSelectionStateParams = {
  trains: TrainOption[]
  departureSegmentId: string | undefined
  returnSegmentId: string | undefined
  departureSeats: BookingSeatSelection | null
  returnTripSeats: BookingSeatSelection | null
}

export function useSeatSelectionState({
  trains,
  departureSegmentId,
  returnSegmentId,
  departureSeats,
  returnTripSeats,
}: UseSeatSelectionStateParams) {
  const [selectionByTrainId, setSelectionByTrainId] = useState<Record<string, TrainSelectionState>>(
    {},
  )
  const [seatSelectionHint, setSeatSelectionHint] = useState<string | null>(null)

  const selectionSeedSignature = [
    trains.map((train) => train.id).join(','),
    departureSegmentId ?? '',
    returnSegmentId ?? '',
    departureSeats?.carriageId ?? '',
    departureSeats?.seats.join(',') ?? '',
    returnTripSeats?.carriageId ?? '',
    returnTripSeats?.seats.join(',') ?? '',
  ].join('|')

  const [lastSelectionSeedSignature, setLastSelectionSeedSignature] = useState('')

  if (trains.length > 0 && selectionSeedSignature !== lastSelectionSeedSignature) {
    setLastSelectionSeedSignature(selectionSeedSignature)
    setSelectionByTrainId((prev) =>
      buildSelectionByTrainId({
        trains,
        departureSegmentId,
        returnSegmentId,
        departureSeats,
        returnTripSeats,
        previous: prev,
      }),
    )
  }

  const selectedSeatsByTrainId = useMemo(
    () =>
      Object.fromEntries(
        Object.entries(selectionByTrainId).map(([trainId, selection]) => [
          trainId,
          selection.seats,
        ]),
      ),
    [selectionByTrainId],
  )

  const clearSeatSelectionHint = useCallback(() => {
    setSeatSelectionHint(null)
  }, [])

  const updateTrainSelection = useCallback(
    (trainId: string, patch: Partial<TrainSelectionState>) => {
      setSelectionByTrainId((prev) => {
        const current = prev[trainId]
        if (!current) return prev
        return { ...prev, [trainId]: { ...current, ...patch } }
      })
      setSeatSelectionHint(null)
    },
    [],
  )

  const selectCarriage = useCallback(
    (train: TrainOption, trainId: string, carriageId: string) => {
      updateTrainSelection(trainId, {
        carriageId,
        activeType: getActiveTypeForCarriage(train, carriageId),
        seats: [],
      })
    },
    [updateTrainSelection],
  )

  return {
    selectionByTrainId,
    selectedSeatsByTrainId,
    seatSelectionHint,
    setSeatSelectionHint,
    clearSeatSelectionHint,
    updateTrainSelection,
    selectCarriage,
  }
}
