import './TrainCard.css'
import TrainRouteIcon from '@/shared/ui/icons/TrainRouteIcon'
import RouteArrowIcon from '@/shared/ui/icons/RouteArrowIcon'
import TripArrowIcon from '@/shared/ui/icons/TripArrowIcon'
import FarePriceIcon from '@/shared/ui/icons/FarePriceIcon'
import AmenitiesIconWiFi from '@/shared/ui/icons/amenities/AmenitiesIconWiFi'
import AmenitiesIconExpress from '@/shared/ui/icons/amenities/AmenitiesIconExpress'
import AmenitiesIconFoot from '@/shared/ui/icons/amenities/AmenitiesIconFoot'
import FareCountTooltip from './FareCountTooltip'

type Fare = {
  type: string
  count: number
  price: string
}

type TrainCardProps = {
  mode?: 'selection' | 'review'
  actionLabel?: string
  fares?: Fare[]
  showRoutePath?: boolean
}

const defaultFares: Fare[] = [
  { type: 'Плацкарт', count: 52, price: '2 530' },
  { type: 'Купе', count: 24, price: '3 820' },
  { type: 'Люкс', count: 15, price: '4 950' },
]

export default function TrainCard({
  mode = 'selection',
  actionLabel = 'Выбрать места',
  fares = defaultFares,
  showRoutePath = true,
}: TrainCardProps) {

  const trainNumber = '116С'
  const departureCityTrain = 'Адлер'
  const arrivalCityTrain = 'Санкт-Петербург'
  const departureCityPassenger = 'Москва'
  const arrivalCityPassenger = 'Санкт-Петербург'
  const trainDuration = '8:32'
  const trainDurationReturn = '8:32'
  const trainDeparture = '10:00'
  const trainArrival = '12:00'
  const trainDepartureReturn = '00:41'
  const trainArrivalReturn = '09:13'
  const trainStationDeparture = 'Ленинградский вокзал'
  const trainStationArrival = 'Ладожский вокзал'
  const isReviewMode = mode === 'review'

  return (
    <article className={`train-card${isReviewMode ? ' train-card--review' : ''}`}>
      <section className="train-card__route">
        <TrainRouteIcon className="train-card__route-icon" />
        <p className="train-card__train-number">{trainNumber}</p>
        {showRoutePath ? (
          <div className="train-card__route-path">
            <p className="train-card__train-route-city">{departureCityTrain}</p>
            <RouteArrowIcon className="train-card__arrow" />
            <p className="train-card__train-route-city train-card__train-route-city-active">{departureCityPassenger}</p>
            <RouteArrowIcon className="train-card__arrow-active" />
            <p className="train-card__train-route-city train-card__train-route-city-active">{arrivalCityPassenger}</p>
            <RouteArrowIcon className="train-card__arrow" />
            <p className="train-card__train-route-city">{arrivalCityTrain}</p>
          </div>
        ) : (
          <>
            <p className="train-card__train-route-city train-card__train-route-city-active">{departureCityTrain} →</p>
            <p className="train-card__train-route-city train-card__train-route-city-active">{departureCityPassenger}</p>
          </>
        )}
      </section>
      <section className="train-card__schedule">
      <div className="train-card__trip">
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
      <div className="train-card__trip train-card__trip--return">
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

      </section>

      <section className="train-card__prices">
        {fares.map((fare) => (
          <div key={fare.type} className="train-card__fare-row">
            <span className="train-card__fare-type">{fare.type}</span>
            {isReviewMode ? (
              <span className="train-card__fare-count">{fare.count}</span>
            ) : (
              <FareCountTooltip
                count={fare.count}
                upperCount={19}
                upperPrice="2 920"
                lowerCount={5}
                lowerPrice="3 530"
              />
            )}
            <span className="train-card__fare-from">от</span>
            <span className="train-card__fare-price">{fare.price}</span>
            <FarePriceIcon className="train-card__fare-price-icon" />
          </div>
        ))}
        <div className="train-card__prices-bottom">
          <div className="train-card__amenities">
            <AmenitiesIconWiFi className="train-card__amenities-icon" />
            <AmenitiesIconExpress className="train-card__amenities-icon" />
            <AmenitiesIconFoot className="train-card__amenities-icon" />
          </div>

          <div className="train-card__booking-button">
            <button className={`train-card__booking-button-text${isReviewMode ? ' train-card__booking-button-text--review' : ''}`}>
              {actionLabel}
            </button>
          </div>
        </div>
      </section>
    </article>
  )
}