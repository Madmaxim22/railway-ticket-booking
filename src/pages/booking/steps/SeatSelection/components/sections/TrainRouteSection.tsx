import RouteArrowIcon from '@/shared/ui/icons/RouteArrowIcon'
import TrainRouteIcon from '@/shared/ui/icons/TrainRouteIcon'
import TripArrowIcon from '@/shared/ui/icons/TripArrowIcon'
import DurationIcon from '@/pages/booking/steps/SeatSelection/icons/DurationIcon'
import type { TrainOption } from '@/pages/booking/steps/SeatSelection/types'
import './TrainRouteSection.css'

type TrainRouteSectionProps = {
  train: TrainOption
}

function renderDuration(duration: string) {
  const parts = duration.trim().split(/\s+/)
  if (parts.length < 3) {
    return duration
  }

  const mainPart = parts.slice(0, -2).join(' ')
  const minutesPart = parts.slice(-2).join(' ')

  return (
    <>
      {mainPart}
      <br />
      {minutesPart}
    </>
  )
}

export function TrainRouteSection({ train }: TrainRouteSectionProps) {
  return (
    <div className="seat-selection-page__route">
      <div className="seat-selection-page__route-col seat-selection-page__route-col--left">
        <TrainRouteIcon className="seat-selection-page__route-icon" />
        <div className="seat-selection-page__route-col-content">
          <p className="seat-selection-page__train-number">{train.trainNumber}</p>
          <p className="seat-selection-page__station-city">
            {train.departureCityTrain}
            <RouteArrowIcon className="seat-selection-page__route-arrow" />
          </p>
          <p className="seat-selection-page__station-city seat-selection-page__station-city--active">
            {train.departureCityPassenger}
            <RouteArrowIcon className="seat-selection-page__route-arrow-active" />
          </p>
          <p className="seat-selection-page__station-city seat-selection-page__station-city--active">
            {train.arrivalCityPassenger}
            <RouteArrowIcon className="seat-selection-page__route-arrow" />
          </p>
          <p className="seat-selection-page__station-city">{train.arrivalCityTrain}</p>
        </div>
      </div>
      <div className="seat-selection-page__route-col seat-selection-page__route-col--center">
        <div className="seat-selection-page__route-col-content">
          <p className="seat-selection-page__time">{train.departureTime}</p>
          <p className="seat-selection-page__station-city">{train.departureCityPassenger}</p>
          <p className="seat-selection-page__station-name">{train.fromStation}</p>
        </div>
        <TripArrowIcon className="seat-selection-page__arrow-icon" />
        <div className="seat-selection-page__route-col-content">
          <p className="seat-selection-page__time">{train.arrivalTime}</p>
          <p className="seat-selection-page__station-city">{train.arrivalCityTrain}</p>
          <p className="seat-selection-page__station-name">{train.toStation}</p>
        </div>
      </div>
      <div className="seat-selection-page__route-col seat-selection-page__route-col--right">
        <DurationIcon className="seat-selection-page__duration-icon" />
        <p className="seat-selection-page__duration">{renderDuration(train.duration)}</p>
      </div>
    </div>
  )
}
