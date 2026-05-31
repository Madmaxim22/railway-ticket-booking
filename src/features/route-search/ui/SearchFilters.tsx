import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import DatePickerPopover, { type DatePickerPopoverHandle } from '@/components/DatePickerPopover'
import { formatApiDate } from '@/shared/lib/formatApiDate'
import { parseFilterDate } from '@/shared/lib/parseFilterDate'
import { formatTitleCaseWords } from '@/shared/lib/formatTitleCaseWords'
import AmenitiesIconAirConditioning from '@/shared/ui/icons/amenities/AmenitiesIconAirConditioning'
import AmenitiesIconExpress from '@/shared/ui/icons/amenities/AmenitiesIconExpress'
import AmenitiesIconWiFi from '@/shared/ui/icons/amenities/AmenitiesIconWiFi'
import CalendarIcon from '@/shared/ui/icons/CalendarIcon'
import FarePriceIcon from '@/shared/ui/icons/FarePriceIcon'
import { useGetLastRoutesQuery } from '@/store/api/routesApi'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { useRoutesSearchModel } from '@/features/route-search/model/useRoutesSearchModel'
import {
  mergeSliderSearchFromFilters,
  sliderSearchFromFilters,
  type SliderSearchState,
} from '@/features/route-search/model/sliderSearchState'
import { mergeFilters, selectFilters, type FiltersState } from '@/store/slices/filtersSlice'
import { mergeSearch, selectSearch } from '@/store/slices/searchSlice'
import CarriageFilterItem from './carriage/CarriageFilterItem'
import { carriageFilterConfigs } from './carriage/carriageFilterConfigs'
import PriceRangeSlider from './slider/PriceRangeSlider'
import TimeRangeMenu from './time/TimeRangeMenu'
import './SearchFilters.css'

function stationWithVokzal(name: string): string {
  const trimmed = String(name).trim()
  if (trimmed.toLowerCase().includes('вокзал')) return trimmed
  return `${trimmed} вокзал`
}

export default function SearchFilters() {
  const dispatch = useAppDispatch()
  const { sendServer } = useRoutesSearchModel()
  const search = useAppSelector(selectSearch)
  const reduxFilters = useAppSelector(selectFilters)
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
  const departureDatePickerRef = useRef<DatePickerPopoverHandle>(null)
  const arrivalDatePickerRef = useRef<DatePickerPopoverHandle>(null)
  const [departureDate, setDepartureDate] = useState<Date | null>(() =>
    parseFilterDate(search.date_start),
  )
  const [arrivalDate, setArrivalDate] = useState<Date | null>(() =>
    parseFilterDate(search.date_end),
  )
  const [isDepartureTimeOpen, setIsDepartureTimeOpen] = useState(false)
  const [isArrivalTimeOpen, setIsArrivalTimeOpen] = useState(false)
  const [sliderSearch, setSliderSearch] = useState<SliderSearchState>(() =>
    sliderSearchFromFilters(reduxFilters),
  )

  useEffect(() => {
    setSliderSearch((prev) => mergeSliderSearchFromFilters(prev, reduxFilters))
  }, [
    reduxFilters.price_from,
    reduxFilters.price_to,
    reduxFilters.start_departure_hour_from,
    reduxFilters.start_departure_hour_to,
    reduxFilters.start_arrival_hour_from,
    reduxFilters.start_arrival_hour_to,
    reduxFilters.end_departure_hour_from,
    reduxFilters.end_departure_hour_to,
    reduxFilters.end_arrival_hour_from,
    reduxFilters.end_arrival_hour_to,
  ])

  const handlePriceAfterChange = useCallback(
    ([from, to]: [number, number]) => {
      setSliderSearch((prev) => ({ ...prev, price_from: from, price_to: to }))
      void sendServer({ price_from: from, price_to: to })
    },
    [sendServer],
  )

  const handleStartDepartureAfterChange = useCallback(
    ([from, to]: [number, number]) => {
      const patch = {
        start_departure_hour_from: from,
        start_departure_hour_to: to,
      }
      setSliderSearch((prev) => ({ ...prev, ...patch }))
      dispatch(mergeFilters(patch))
    },
    [dispatch],
  )

  const handleStartArrivalAfterChange = useCallback(
    ([from, to]: [number, number]) => {
      const patch = {
        start_arrival_hour_from: from,
        start_arrival_hour_to: to,
      }
      setSliderSearch((prev) => ({ ...prev, ...patch }))
      dispatch(mergeFilters(patch))
    },
    [dispatch],
  )

  const handleEndDepartureAfterChange = useCallback(
    ([from, to]: [number, number]) => {
      const patch = {
        end_departure_hour_from: from,
        end_departure_hour_to: to,
      }
      setSliderSearch((prev) => ({ ...prev, ...patch }))
      dispatch(mergeFilters(patch))
    },
    [dispatch],
  )

  const handleEndArrivalAfterChange = useCallback(
    ([from, to]: [number, number]) => {
      const patch = {
        end_arrival_hour_from: from,
        end_arrival_hour_to: to,
      }
      setSliderSearch((prev) => ({ ...prev, ...patch }))
      dispatch(mergeFilters(patch))
    },
    [dispatch],
  )

  const toggleFilter = useCallback(
    (apiKey: keyof FiltersState) => {
      const isCurrentlyActive = Boolean(reduxFilters[apiKey])
      dispatch(mergeFilters({ [apiKey]: isCurrentlyActive ? undefined : true }))
    },
    [dispatch, reduxFilters],
  )

  const handleDepartureDateChange = useCallback(
    (date: Date | null) => {
      setDepartureDate(date)
      dispatch(mergeSearch({ date_start: date ? formatApiDate(date) : undefined }))
    },
    [dispatch],
  )

  const handleArrivalDateChange = useCallback(
    (date: Date | null) => {
      setArrivalDate(date)
      dispatch(mergeSearch({ date_end: date ? formatApiDate(date) : undefined }))
    },
    [dispatch],
  )

  const arrivalTimeMenuOpen = hasDateEnd && isArrivalTimeOpen

  return (
    <aside className="search-filters">
      <div className="search-filters__direction-section">
        <div className="search-filters__group">
          <p className="search-filters__title">Дата поездки</p>
          <div className="search-filters__field">
            <DatePickerPopover
              ref={departureDatePickerRef}
              value={departureDate}
              onChange={handleDepartureDateChange}
              placeholder="30.08.2018"
              inputClassName="search-filters__input"
            />
            <button
              type="button"
              className="search-filters__icon-button"
              onClick={() => departureDatePickerRef.current?.openCalendar()}
              aria-label="Открыть календарь отправления"
            >
              <CalendarIcon className="search-filters__icon" width={20} height={22.35} />
            </button>
          </div>
        </div>
        <div className="search-filters__group">
          <p className="search-filters__title">Дата возвращения</p>
          <div className="search-filters__field">
            <DatePickerPopover
              ref={arrivalDatePickerRef}
              value={arrivalDate}
              onChange={handleArrivalDateChange}
              placeholder="30.08.2018"
              inputClassName="search-filters__input"
            />
            <button
              type="button"
              className="search-filters__icon-button"
              onClick={() => arrivalDatePickerRef.current?.openCalendar()}
              aria-label="Открыть календарь возвращения"
            >
              <CalendarIcon className="search-filters__icon" width={20} height={22.35} />
            </button>
          </div>
        </div>
      </div>
      <div className="search-filters__type-carriage-section">
        <div className="search-filters__group">
          <ul className="search-filters__list">
            {carriageFilterConfigs.map(({ id, label, icon: Icon, apiKey }) => (
              <CarriageFilterItem
                key={id}
                Icon={Icon}
                id={id}
                label={label}
                isActive={Boolean(reduxFilters[apiKey])}
                onToggle={() => toggleFilter(apiKey)}
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
          <PriceRangeSlider
            valueMin={sliderSearch.price_from}
            valueMax={sliderSearch.price_to}
            onAfterChange={handlePriceAfterChange}
          />
        </div>
      </div>
      <div className="search-filters__back-section">
        <TimeRangeMenu
          title="Туда"
          isOpen={isDepartureTimeOpen}
          onToggle={() => setIsDepartureTimeOpen((prev) => !prev)}
          departureHourFrom={sliderSearch.start_departure_hour_from}
          departureHourTo={sliderSearch.start_departure_hour_to}
          arrivalHourFrom={sliderSearch.start_arrival_hour_from}
          arrivalHourTo={sliderSearch.start_arrival_hour_to}
          onDepartureTimeAfterChange={handleStartDepartureAfterChange}
          onArrivalTimeAfterChange={handleStartArrivalAfterChange}
        />
      </div>
      <div className="search-filters__forth-section">
        <TimeRangeMenu
          title="Обратно"
          isOpen={arrivalTimeMenuOpen}
          onToggle={() => setIsArrivalTimeOpen((prev) => !prev)}
          departureHourFrom={sliderSearch.end_departure_hour_from}
          departureHourTo={sliderSearch.end_departure_hour_to}
          arrivalHourFrom={sliderSearch.end_arrival_hour_from}
          arrivalHourTo={sliderSearch.end_arrival_hour_to}
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
                  <p className="search-filters__latest-ticket-city search-filters__latest-ticket-city--to">
                    {ticket.to}
                  </p>
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
