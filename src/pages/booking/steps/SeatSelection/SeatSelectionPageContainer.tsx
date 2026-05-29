import { trains } from './constants'
import { SeatSelectionTrainCard } from './components/SeatSelectionTrainCard'
import { useLocation } from 'react-router-dom'

export function SeatSelectionPageContainer() {
  const location = useLocation()
  const hasReturnDirection = (location.state as { hasReturnDirection?: boolean } | null)
    ?.hasReturnDirection === true
  const trainsForRender = hasReturnDirection ? trains : trains.slice(0, 1)

  return (
    <div className="seat-selection-page">
      <h1 className="seat-selection-page__title">выбор мест</h1>
      {trainsForRender.map((train, index) => (
        <SeatSelectionTrainCard key={train.id} train={train} isReturn={index === 1} />
      ))}
      <button type="button" className="seat-selection-page__next-button">Далее</button>
    </div>
  )
}
