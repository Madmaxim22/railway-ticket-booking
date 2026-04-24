import DatePickerPopover from '../../../../components/DatePickerPopover'
import { useCallback, useState } from 'react'
import CarriageFilterItem from './carriage/CarriageFilterItem'
import PriceRangeSlider from './slider/PriceRangeSlider'
import TimeRangeMenu from './time/TimeRangeMenu'
import { carriageFilterConfigs } from './carriage/carriageFilterConfigs'
import CalendarIcon from './icons/CalendarIcon'
import './SearchFilters.css'

export default function SearchFilters() {
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
    </aside>
  )
}