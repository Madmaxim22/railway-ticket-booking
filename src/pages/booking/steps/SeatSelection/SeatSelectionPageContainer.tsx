import { trains } from './constants'
import { SeatSelectionTrainCard } from './components/SeatSelectionTrainCard'

export function SeatSelectionPageContainer() {
  return (
    <div className="seat-selection-page">
      <h1 className="seat-selection-page__title">выбор мест</h1>
      {trains.map((train, index) => (
        <SeatSelectionTrainCard key={train.id} train={train} isReturn={index === 1} />
      ))}
      <button type="button" className="seat-selection-page__next-button">Далее</button>
    </div>
  )
}
