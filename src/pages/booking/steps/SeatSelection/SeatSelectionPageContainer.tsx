import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { SeatSelectionTrainCard } from './components/SeatSelectionTrainCard'
import { useSeatSelectionTrains } from './hooks/useSeatSelectionTrains'
import { useTicketCounts } from './hooks/useTicketCounts'
import { validateSeatSelection } from './lib/validateSeatSelection'

export function SeatSelectionPageContainer() {
  const navigate = useNavigate()
  const { trains, isLoading, isError, errorMessage, isMissingNavigation } =
    useSeatSelectionTrains()
  const {
    counts: ticketCounts,
    activeKey,
    setActiveKey,
    cycleTicketCount,
    isAtMax,
    remainingHint,
  } = useTicketCounts()
  const [selectedSeatsByTrainId, setSelectedSeatsByTrainId] = useState<Record<string, number[]>>(
    {},
  )
  const [seatSelectionHint, setSeatSelectionHint] = useState<string | null>(null)

  useEffect(() => {
    setSelectedSeatsByTrainId((prev) => {
      const next: Record<string, number[]> = {}
      for (const train of trains) {
        next[train.id] = prev[train.id] ?? []
      }
      return next
    })
  }, [trains])

  const handleSelectedSeatsChange = useCallback((trainId: string, seats: number[]) => {
    setSelectedSeatsByTrainId((prev) => ({ ...prev, [trainId]: seats }))
    setSeatSelectionHint(null)
  }, [])

  const handleTicketCycle = useCallback(
    (key: Parameters<typeof cycleTicketCount>[0]) => {
      cycleTicketCount(key)
      setSeatSelectionHint(null)
    },
    [cycleTicketCount],
  )

  const handleNext = () => {
    const validationMessage = validateSeatSelection(
      trains,
      selectedSeatsByTrainId,
      ticketCounts,
    )

    if (validationMessage) {
      setSeatSelectionHint(validationMessage)
      return
    }

    setSeatSelectionHint(null)
    navigate('/booking/passengers')
  }

  if (isMissingNavigation) {
    return (
      <div className="seat-selection-page">
        <h1 className="seat-selection-page__title">выбор мест</h1>
        <p className="seat-selection-page__error" role="alert">
          Сначала выберите поезд на предыдущем шаге.
        </p>
      </div>
    )
  }

  return (
    <div className="seat-selection-page">
      <h1 className="seat-selection-page__title">выбор мест</h1>

      {isError && (
        <p className="seat-selection-page__error" role="alert">
          {errorMessage}
        </p>
      )}

      {isLoading && trains.length === 0 && (
        <p className="seat-selection-page__loading">Загрузка мест…</p>
      )}

      {trains.map((train, index) => (
        <SeatSelectionTrainCard
          key={train.id}
          train={train}
          isReturn={index === 1}
          selectedSeats={selectedSeatsByTrainId[train.id] ?? []}
          onSelectedSeatsChange={(seats) => handleSelectedSeatsChange(train.id, seats)}
          showTicketsSection={index === 0}
          ticketsSectionProps={{
            counts: ticketCounts,
            activeKey,
            onActiveKeyChange: setActiveKey,
            onCycle: handleTicketCycle,
            isAtMax,
            remainingHint,
          }}
        />
      ))}

      {seatSelectionHint && (
        <p className="seat-selection-page__hint" role="alert">
          {seatSelectionHint}
        </p>
      )}

      <button
        type="button"
        className="seat-selection-page__next-button"
        disabled={isLoading}
        onClick={handleNext}
      >
        Далее
      </button>
    </div>
  )
}
