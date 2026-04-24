import { useState } from 'react'
import './TimeRangeMenu.css'
import BackIcon from '../icons/BackIcon'
import ForthIcon from '../icons/ForthIcon'
import CloseToggleIcon from '../icons/CloseToggleIcon'
import OpenToggleIcon from '../icons/OpenToggleIcon'
import TimeRangeSlider from '../slider/TimeRangeSlider'

export default function TimeRangeMenu({ title, isOpen, onToggle }) {
  const [fromHour, setFromHour] = useState(0)
  const [toHour, setToHour] = useState(24)
  const [arrivalFromHour, setArrivalFromHour] = useState(0)
  const [arrivalToHour, setArrivalToHour] = useState(24)

  return (
    <div className="search-filters__time-section">
      <div className="search-filters__time-content">
        {title === 'Туда' ? <BackIcon className="search-filters__time-icon" /> : <ForthIcon className="search-filters__time-icon" />}
        <p className="search-filters__time-title">{title}</p>

        <button type="button" className="search-filters__time-button" onClick={onToggle}>
          {isOpen ? <OpenToggleIcon className="search-filters__time-icon" /> : <CloseToggleIcon className="search-filters__time-icon" />}
        </button>
      </div>
      
      {isOpen && (
        <>
          <div className="search-filters__time-slider-container">
            <p className="search-filters__time-slider-title">Время отбытия</p>
            <TimeRangeSlider
              value={[fromHour, toHour]}
              onChange={([nextFromHour, nextToHour]) => {
                setFromHour(nextFromHour)
                setToHour(nextToHour)
              }}
            />
          </div>
          <div className="search-filters__time-slider-container">
            <p className="search-filters__time-slider-title">Время прибытия</p>
            <TimeRangeSlider
              value={[arrivalFromHour, arrivalToHour]}
              onChange={([nextFromHour, nextToHour]) => {
                setArrivalFromHour(nextFromHour)
                setArrivalToHour(nextToHour)
              }}
            />
          </div>
        </>
      )}
    </div>
  )
}
