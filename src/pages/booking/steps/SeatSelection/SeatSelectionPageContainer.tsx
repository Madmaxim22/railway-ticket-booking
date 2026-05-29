import { SeatSelectionTrainCard } from './components/SeatSelectionTrainCard'
import { useSeatSelectionTrains } from './hooks/useSeatSelectionTrains'

export function SeatSelectionPageContainer() {
  const { trains, isLoading, isError, errorMessage, isMissingNavigation } =
    useSeatSelectionTrains()

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
        />
      ))}

      <button type="button" className="seat-selection-page__next-button" disabled={isLoading}>
        Далее
      </button>
    </div>
  )
}
