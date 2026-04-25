import DatePickerPopover from '../../../../components/DatePickerPopover'
import { useCallback, useState } from 'react'
import CarriageFilterItem from './carriage/CarriageFilterItem'
import PriceRangeSlider from './slider/PriceRangeSlider'
import TimeRangeMenu from './time/TimeRangeMenu'
import { carriageFilterConfigs } from './carriage/carriageFilterConfigs'
import CalendarIcon from './icons/CalendarIcon'
import AmenitiesIconWiFi from '../icons/amenities/AmenitiesIconWiFi'
import AmenitiesIconExpress from '../icons/amenities/AmenitiesIconExpress'
import AmenitiesIconFoot from '../icons/amenities/AmenitiesIconFoot'
import FarePriceIcon from '../icons/FarePriceIcon'
import './SearchFilters.css'

export default function SearchFilters() {
  const latestTickets = [
    { id: 1, from: 'Санкт-Петербург', departureStation: 'Ленинградский вокзал',  to: 'Москва', arrivalStation: 'Казанский вокзал', date: '17.08.2018', price: '2 500' },
    { id: 2, from: 'Москва', departureStation: 'Казанский вокзал', to: 'Казань', arrivalStation: 'Казанский вокзал', date: '17.08.2018', price: '3 500' },
    { id: 3, from: 'Казань', departureStation: 'Казанский вокзал', to: 'Нижний Новгород', arrivalStation: 'Нижний Новгородский вокзал', date: '17.08.2018', price: '3 800' }
  ]
  const [departureDate, setDepartureDate] = useState(null)
  const [arrivalDate, setArrivalDate] = useState(null)
  const [isDepartureTimeOpen, setIsDepartureTimeOpen] = useState(false)
  const [isArrivalTimeOpen, setIsArrivalTimeOpen] = useState(false)
  const [filters, setFilters] = useState({
    isCoupeEnabled: true,
    isPlatkartEnabled: false,
    isSittingEnabled: false,
    isLuxEnabled: false,
    isWiFiEnabled: false,
    isExpressEnabled: false
  })

  const toggleFilter = useCallback((filterName) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: !prev[filterName]
    }))
  }, [])

  return (
    <aside className="search-filters">
      <div className="search-filters__direction-section">
        <div className="search-filters__group">
          <p className="search-filters__title">Дата поездки</p>
          <div className="search-filters__field">
            <DatePickerPopover
              value={departureDate}
              onChange={setDepartureDate}
              placeholder="30.08.2018"
              inputClassName="search-filters__input"
            />
            <CalendarIcon className="search-filters__icon" />
          </div>
        </div>
        <div className="search-filters__group">
          <p className="search-filters__title">Дата возвращения</p>
          <div className="search-filters__field">
            <DatePickerPopover
              value={arrivalDate}
              onChange={setArrivalDate}
              placeholder="30.08.2018"
              inputClassName="search-filters__input"
            />
            <CalendarIcon className="search-filters__icon" />
          </div>
        </div>
      </div>
      <div className="search-filters__type-carriage-section">
        <div className="search-filters__group">
          <ul className="search-filters__list">
            {carriageFilterConfigs.map(({ id, label, icon: Icon }) => (
              <CarriageFilterItem
                key={id}
                Icon={Icon}
                id={id}
                label={label}
                isActive={filters[id]}
                onToggle={toggleFilter}
              />
            ))}
          </ul>   
        </div>  
      </div>
      <div className="search-filters__price-section">
        <div className="search-filters__group">
          <p className="search-filters__title">Стоимость</p>
          <PriceRangeSlider />
        </div>
      </div>
      <div className="search-filters__back-section">
        <TimeRangeMenu
          title="Туда"
          isOpen={isDepartureTimeOpen}
          onToggle={() => setIsDepartureTimeOpen((prev) => !prev)}
        />
      </div>
      <div className="search-filters__forth-section">
        <TimeRangeMenu
          title="Обратно"
          isOpen={isArrivalTimeOpen}
          onToggle={() => setIsArrivalTimeOpen((prev) => !prev)}
        />
      </div>
      <div className="search-filters__latest-tickets">
        <p className="search-filters__latest-tickets-title">Последние билеты</p>
        <ul className="search-filters__latest-tickets-list">
          {latestTickets.map((ticket) => (
            <li key={ticket.id} className="search-filters__latest-ticket-card">
              <div className="search-filters__latest-ticket-route">
                <div className="search-filters__latest-ticket-route-from">
                  <p className="search-filters__latest-ticket-city">{ticket.from}</p>
                  <p className="search-filters__latest-ticket-station">{ticket.departureStation}</p> 
                </div>
                <div className="search-filters__latest-ticket-route-to">
                  <p className="search-filters__latest-ticket-city search-filters__latest-ticket-city--to">{ticket.to}</p>
                  <p className="search-filters__latest-ticket-station">{ticket.arrivalStation}</p>
                </div>
              </div>
              <div className="search-filters__latest-ticket-meta">
                <div className="search-filters__latest-ticket-amenities">
                  <AmenitiesIconWiFi className="search-filters__latest-ticket-amenity-icon" />
                  <AmenitiesIconExpress className="search-filters__latest-ticket-amenity-icon" />
                  <AmenitiesIconFoot className="search-filters__latest-ticket-amenity-icon" />
                </div>
                <p className="search-filters__latest-ticket-price">
                  <span className="search-filters__latest-ticket-price-from">от</span>
                  <span className="search-filters__latest-ticket-price-value">{ticket.price}</span>
                  <FarePriceIcon className="search-filters__latest-ticket-price-icon" />
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}