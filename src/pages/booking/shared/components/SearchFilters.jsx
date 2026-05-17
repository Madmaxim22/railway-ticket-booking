import { useCallback, useEffect, useMemo, useState } from 'react'
import DatePickerPopover from '@/components/DatePickerPopover'
import { formatApiDate } from '@/shared/lib/formatApiDate'
import { parseFilterDate } from '@/shared/lib/parseFilterDate'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { mergeFilters } from '@/store/slices/filtersSlice'
import { mergeSearch, selectSearch } from '@/store/slices/searchSlice'
import { useGetLastRoutesQuery } from '@/store/api/routesApi'
import { formatTitleCaseWords } from '@/shared/lib/formatTitleCaseWords'
import CalendarIcon from '@/shared/ui/icons/CalendarIcon'
import AmenitiesIconWiFi from '@/shared/ui/icons/amenities/AmenitiesIconWiFi'
import AmenitiesIconExpress from '@/shared/ui/icons/amenities/AmenitiesIconExpress'
import AmenitiesIconAirConditioning from '@/shared/ui/icons/amenities/AmenitiesIconAirConditioning'
import FarePriceIcon from '@/shared/ui/icons/FarePriceIcon'
import CarriageFilterItem from './carriage/CarriageFilterItem'
import PriceRangeSlider from './slider/PriceRangeSlider'
import TimeRangeMenu from './time/TimeRangeMenu'
import { carriageFilterConfigs } from './carriage/carriageFilterConfigs'
import './SearchFilters.css'

/** Соответствие слайдеров полям поиска (API). `arrivalDate` = date_end — при его отсутствии слайдер end_arrival_* отключён. */
const SLIDER_SEARCH_INITIAL = {
  price_from: 0,
  price_to: 7000,
  start_departure_hour_from: 0,
  start_departure_hour_to: 24,
  start_arrival_hour_from: 0,
  start_arrival_hour_to: 24,
  end_departure_hour_from: 0,
  end_departure_hour_to: 24,
  end_arrival_hour_from: 0,
  end_arrival_hour_to: 24,
}

function stationWithVokzal(name) {
  const trimmed = String(name).trim()
  if (trimmed.toLowerCase().includes('вокзал')) return trimmed
  return `${trimmed} вокзал`
}

export default function SearchFilters() {
  const dispatch = useAppDispatch()
  const search = useAppSelector(selectSearch)
  const hasDateEnd = Boolean(search.date_end)
  const { data: lastRoutesData } = useGetLastRoutesQuery()

  const latestTickets = useMemo(() => {
    if (!lastRoutesData?.length) return []
    return lastRoutesData.map((item) => {
      const d = item.departure
      return {
        id: d._id,
        from: formatTitleCaseWords(d.from.city.name),
        to: formatTitleCaseWords(d.to.city.name),
        departureStation: stationWithVokzal(d.from.railway_station_name),
        arrivalStation: stationWithVokzal(d.to.railway_station_name),
        price: item.min_price.toLocaleString('ru-RU'),
        haveWifi: d.have_wifi,
        haveAirConditioning: d.have_air_conditioning,
        isExpress: d.is_express,
      }
    })
  }, [lastRoutesData])
  const [departureDate, setDepartureDate] = useState(() => parseFilterDate(search.date_start))
  const [arrivalDate, setArrivalDate] = useState(() => parseFilterDate(search.date_end))
  const [isDepartureTimeOpen, setIsDepartureTimeOpen] = useState(false)
  const [isArrivalTimeOpen, setIsArrivalTimeOpen] = useState(false)
  const [filters, setFilters] = useState({
    isCoupeEnabled: false,
    isPlatkartEnabled: false,
    isSittingEnabled: false,
    isLuxEnabled: false,
    isWiFiEnabled: false,
    isExpressEnabled: false
  })
  const [sliderSearch, setSliderSearch] = useState(SLIDER_SEARCH_INITIAL)

  const handlePriceAfterChange = useCallback(([from, to]) => {
    setSliderSearch((prev) => ({ ...prev, price_from: from, price_to: to }))
    dispatch(mergeFilters({ price_from: from, price_to: to }))
  }, [dispatch])

  const handleStartDepartureAfterChange = useCallback(([from, to]) => {
    const patch = {
      start_departure_hour_from: from,
      start_departure_hour_to: to,
    }
    setSliderSearch((prev) => ({ ...prev, ...patch }))
    dispatch(mergeFilters(patch))
  }, [dispatch])

  const handleStartArrivalAfterChange = useCallback(([from, to]) => {
    const patch = {
      start_arrival_hour_from: from,
      start_arrival_hour_to: to,
    }
    setSliderSearch((prev) => ({ ...prev, ...patch }))
    dispatch(mergeFilters(patch))
  }, [dispatch])

  const handleEndDepartureAfterChange = useCallback(([from, to]) => {
    const patch = {
      end_departure_hour_from: from,
      end_departure_hour_to: to,
    }
    setSliderSearch((prev) => ({ ...prev, ...patch }))
    dispatch(mergeFilters(patch))
  }, [dispatch])

  const handleEndArrivalAfterChange = useCallback(([from, to]) => {
    const patch = {
      end_arrival_hour_from: from,
      end_arrival_hour_to: to,
    }
    setSliderSearch((prev) => ({ ...prev, ...patch }))
    dispatch(mergeFilters(patch))
  }, [dispatch])

  const toggleFilter = useCallback((filterName) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: !prev[filterName]
    }))
  }, [])

  const handleDepartureDateChange = useCallback((date) => {
    setDepartureDate(date)
    dispatch(mergeSearch({ date_start: date ? formatApiDate(date) : undefined }))
  }, [dispatch])

  const handleArrivalDateChange = useCallback((date) => {
    setArrivalDate(date)
    dispatch(mergeSearch({ date_end: date ? formatApiDate(date) : undefined }))
  }, [dispatch])

  useEffect(() => {
    if (!hasDateEnd) {
      setIsArrivalTimeOpen(false)
    }
  }, [hasDateEnd])

  return (
    <aside className="search-filters">
      <div className="search-filters__direction-section">
        <div className="search-filters__group">
          <p className="search-filters__title">Дата поездки</p>
          <div className="search-filters__field">
            <DatePickerPopover
              value={departureDate}
              onChange={handleDepartureDateChange}
              placeholder="30.08.2018"
              inputClassName="search-filters__input"
            />
            <CalendarIcon className="search-filters__icon" width={20} height={22.35} />
          </div>
        </div>
        <div className="search-filters__group">
          <p className="search-filters__title">Дата возвращения</p>
          <div className="search-filters__field">
            <DatePickerPopover
              value={arrivalDate}
              onChange={handleArrivalDateChange}
              placeholder="30.08.2018"
              inputClassName="search-filters__input"
            />
            <CalendarIcon className="search-filters__icon" width={20} height={22.35} />
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
      <div
        className="search-filters__price-section"
        data-price-from={sliderSearch.price_from}
        data-price-to={sliderSearch.price_to}
      >
        <div className="search-filters__group">
          <p className="search-filters__title">Стоимость</p>
          <PriceRangeSlider onAfterChange={handlePriceAfterChange} />
        </div>
      </div>
      <div className="search-filters__back-section">
        <TimeRangeMenu
          title="Туда"
          isOpen={isDepartureTimeOpen}
          onToggle={() => setIsDepartureTimeOpen((prev) => !prev)}
          onDepartureTimeAfterChange={handleStartDepartureAfterChange}
          onArrivalTimeAfterChange={handleStartArrivalAfterChange}
        />
      </div>
      <div className="search-filters__forth-section">
        <TimeRangeMenu
          title="Обратно"
          isOpen={isArrivalTimeOpen}
          onToggle={() => setIsArrivalTimeOpen((prev) => !prev)}
          onDepartureTimeAfterChange={handleEndDepartureAfterChange}
          onArrivalTimeAfterChange={handleEndArrivalAfterChange}
          disableArrivalTimeSlider={!hasDateEnd}
          isToggleDisabled={!hasDateEnd}
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
                {(ticket.haveWifi || ticket.haveAirConditioning || ticket.isExpress) && (
                  <div className="search-filters__latest-ticket-amenities">
                    {ticket.haveWifi && (
                      <AmenitiesIconWiFi className="search-filters__latest-ticket-amenity-icon" />
                    )}
                    {ticket.haveAirConditioning && (
                      <AmenitiesIconAirConditioning className="search-filters__latest-ticket-amenity-icon" />
                    )}
                    {ticket.isExpress && (
                      <AmenitiesIconExpress className="search-filters__latest-ticket-amenity-icon" />
                    )}
                  </div>
                )}
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