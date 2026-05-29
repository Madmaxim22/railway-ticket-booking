import './TimeRangeMenu.css'
import BackIcon from '@/shared/ui/icons/BackIcon'
import ForthIcon from '@/shared/ui/icons/ForthIcon'
import CloseToggleIcon from '@/shared/ui/icons/CloseToggleIcon'
import OpenToggleIcon from '@/shared/ui/icons/OpenToggleIcon'
import TimeRangeSlider from '../slider/TimeRangeSlider'

export default function TimeRangeMenu({
  title,
  isOpen,
  onToggle,
  onDepartureTimeAfterChange,
  onArrivalTimeAfterChange,
  disableArrivalTimeSlider = false,
  isToggleDisabled = false,
  toggleDisabledTitle = 'Сначала выберите дату возвращения',
}) {
  return (
    <div className="search-filters__time-section">
      <div className="search-filters__time-content">
        {title === 'Туда' ? <BackIcon className="search-filters__time-icon" /> : <ForthIcon className="search-filters__time-icon" />}
        <p className="search-filters__time-title">{title}</p>

        <button
          type="button"
          className={`search-filters__time-button ${isOpen ? 'search-filters__time-button--open' : ''}`}
          disabled={isToggleDisabled}
          title={isToggleDisabled ? toggleDisabledTitle : undefined}
          aria-label={isToggleDisabled ? `${title}. ${toggleDisabledTitle}` : `${title}. ${isOpen ? 'Свернуть' : 'Развернуть'} фильтр по времени`}
          onClick={onToggle}
        >
          {isOpen ? <OpenToggleIcon className="search-filters__time-icon-open" /> : <CloseToggleIcon className="search-filters__time-icon-close" />}
        </button>
      </div>
      
      <div className="search-filters__time-sliders" hidden={!isOpen}>
        <div className="search-filters__time-slider-container">
          <p className="search-filters__time-slider-title">Время отбытия</p>
          <TimeRangeSlider onAfterChange={onDepartureTimeAfterChange} />
        </div>
        <div className="search-filters__time-slider-container">
          <p className="search-filters__time-slider-title">Время прибытия</p>
          <TimeRangeSlider onAfterChange={onArrivalTimeAfterChange} disabled={disableArrivalTimeSlider} />
        </div>
      </div>
    </div>
  )
}
