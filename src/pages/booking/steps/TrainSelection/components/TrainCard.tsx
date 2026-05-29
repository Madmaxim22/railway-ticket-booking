import './TrainCard.css'
import TrainRouteIcon from '@/shared/ui/icons/TrainRouteIcon'
import RouteArrowIcon from '@/shared/ui/icons/RouteArrowIcon'
import TripArrowIcon from '@/shared/ui/icons/TripArrowIcon'
import FarePriceIcon from '@/shared/ui/icons/FarePriceIcon'
import AmenitiesIconWiFi from '@/shared/ui/icons/amenities/AmenitiesIconWiFi'
import AmenitiesIconExpress from '@/shared/ui/icons/amenities/AmenitiesIconExpress'
import AmenitiesIconAirConditioning from '@/shared/ui/icons/amenities/AmenitiesIconAirConditioning'
import FareCountTooltip from './FareCountTooltip'
import type { RouteDirectionSegment, RoutesListItem } from '@/store/api/routesResponse.types'
import { formatTitleCaseWords } from '@/shared/lib/formatTitleCaseWords'
import { formatRouteDuration, formatRouteTime } from '@/shared/lib/routeFormatters'

export type Fare = {
  type: string
  count: number
  min_price: number
  top_price: number
  bottom_price: number
  side_price?: number
}

type TrainCardProps = {
  mode?: 'selection' | 'review'
  actionLabel?: string
  fares?: Fare[]
  showRoutePath?: boolean
  item: RoutesListItem
  onActionClick?: () => void
}

function buildFaresFromDepartureSegment(segment: RouteDirectionSegment): Fare[] {
  const { price_info: priceInfo, available_seats_info: availableSeats } = segment
  const fares: Fare[] = []

  if (segment.have_fourth_class) {
    fares.push({
      type: 'Сидячий',
      count: availableSeats.fourth || 0,
      min_price: Math.min(
        priceInfo.fourth.bottom_price,
        priceInfo.fourth.top_price,
      ),
      top_price: priceInfo.fourth.top_price,
      bottom_price: priceInfo.fourth.bottom_price,
    })
  }
  if (segment.have_third_class) {
    fares.push({
      type: 'Плацкарт',
      count: availableSeats.third || 0,
      min_price: Math.min(
        priceInfo.third.bottom_price, 
        priceInfo.third.top_price,
        priceInfo.third.side_price,
      ),
      top_price: priceInfo.third.top_price,
      bottom_price: priceInfo.third.bottom_price,
      side_price: priceInfo.third.side_price,
    })
  }
  if (segment.have_second_class) {
    fares.push({
      type: 'Купе',
      count: availableSeats.second || 0,
      min_price: Math.min(priceInfo.second.bottom_price, priceInfo.second.top_price),
      top_price: priceInfo.second.top_price,
      bottom_price: priceInfo.second.bottom_price,
    })
  }
  if (segment.have_first_class) {
    fares.push({
      type: 'Люкс',
      count: availableSeats.first || 0,
      min_price: Math.min(priceInfo.first.bottom_price, priceInfo.first.top_price),
      top_price: priceInfo.first.top_price,
      bottom_price: priceInfo.first.bottom_price,
    })
  }

  return fares
}

export default function TrainCard({
  mode = 'selection',
  actionLabel = 'Выбрать места',
  showRoutePath = true,
  item,
  onActionClick,
}: TrainCardProps) {

  const trainNumber = '111С'
  const departureCityPassenger = formatTitleCaseWords(item.departure.from.city.name)
  const arrivalCityPassenger = formatTitleCaseWords(item.departure.to.city.name)
  const trainDuration = formatRouteDuration(item.departure.duration)
  const trainDeparture = formatRouteTime(item.departure.from.datetime)
  const trainArrival = formatRouteTime(item.departure.to.datetime)
  const trainStationDeparture = item.departure.from.railway_station_name + ' вокзал'
  const trainStationArrival = item.departure.to.railway_station_name + ' вокзал'

  const isReturn = item.arrival != null
  const isReviewMode = mode === 'review'

  const trainDurationReturn = isReturn ? formatRouteDuration(item.arrival!.duration) : null
  const trainDepartureReturn = isReturn ? formatRouteTime(item.arrival!.from.datetime) : null
  const trainArrivalReturn = isReturn ? formatRouteTime(item.arrival!.to.datetime) : null

  const fares = buildFaresFromDepartureSegment(item.departure)

  return (
    <article className={`train-card${isReviewMode ? ' train-card--review' : ''}`}>
      <section className="train-card__route">
        <TrainRouteIcon className="train-card__route-icon" />
        <p className="train-card__train-number">{trainNumber}</p>
        {showRoutePath ? (
          <div className="train-card__route-path">
            <p className="train-card__train-route-city train-card__train-route-city-active">
              {departureCityPassenger}
              <RouteArrowIcon className="train-card__arrow-active" />
            </p>
            <p className="train-card__train-route-city train-card__train-route-city-active">{arrivalCityPassenger}</p>
          </div>
        ) : (
          <p className="train-card__train-route-city train-card__train-route-city-active">
            {departureCityPassenger} → {arrivalCityPassenger}
          </p>
        )}
      </section>
      <section className="train-card__schedule">
      <div className="train-card__trip" key={item.departure._id}>
        <div className="train-card__departure">
          <div className="train-card__time">{trainDeparture}</div>
          <div className="train-card__city">{departureCityPassenger}</div>
          <div className="train-card__station">{trainStationDeparture}</div>
        </div>
        <div className="train-card__duration">
          <span className="train-card__duration-value">{trainDuration}</span>
          <TripArrowIcon className="train-card__arrow-icon" />
        </div>
        <div className="train-card__arrival">
          <div className="train-card__time">{trainArrival}</div>
          <div className="train-card__city">{arrivalCityPassenger}</div>
          <div className="train-card__station">{trainStationArrival}</div>
        </div>
      </div>

      {/* обратный рейс */}
      {isReturn && (
        <div className="train-card__trip train-card__trip--return" key={item.arrival._id}>
          <div className="train-card__departure">
            <div className="train-card__time">{trainDepartureReturn}</div>
            <div className="train-card__city">{arrivalCityPassenger}</div>
            <div className="train-card__station">{trainStationArrival}</div>
          </div>
          <div className="train-card__duration">
            <span className="train-card__duration-value">{trainDurationReturn}</span>
            <TripArrowIcon className="train-card__arrow-icon" reverse />
          </div>
          <div className="train-card__arrival">
            <div className="train-card__time">{trainArrivalReturn}</div>
            <div className="train-card__city">{departureCityPassenger}</div>
            <div className="train-card__station">{trainStationDeparture}</div>
          </div>
        </div>  
      )}

      </section>

      <section className="train-card__prices">
        {fares.map((fare) => (
          <div key={fare.type} className="train-card__fare-row">
            <span className="train-card__fare-type">{fare.type}</span>
            {isReviewMode ? (
              <span className="train-card__fare-count">{fare.count}</span>
            ) : (
              <FareCountTooltip
                fare={fare}
              />
            )}
            <span className="train-card__fare-from">от</span>
            <span className="train-card__fare-price">{fare.min_price.toLocaleString('ru-RU')}</span>
            <FarePriceIcon className="train-card__fare-price-icon" />
          </div>
        ))}
        <div className="train-card__prices-bottom">
          {(item.departure.have_wifi || item.departure.have_air_conditioning || item.departure.is_express) && (
            <div className="train-card__amenities">
              {item.departure.have_wifi && <AmenitiesIconWiFi className="train-card__amenities-icon" />}
              {item.departure.have_air_conditioning && (
                <AmenitiesIconAirConditioning className="train-card__amenities-icon" />
              )}
              {item.departure.is_express && <AmenitiesIconExpress className="train-card__amenities-icon" />}
            </div>
          )}

          <div className="train-card__booking-button">
            <button
              type="button"
              className={`train-card__booking-button-text${isReviewMode ? ' train-card__booking-button-text--review' : ''}`}
              onClick={onActionClick}
            >
              {actionLabel}
            </button>
          </div>
        </div>
      </section>
    </article>
  )
}