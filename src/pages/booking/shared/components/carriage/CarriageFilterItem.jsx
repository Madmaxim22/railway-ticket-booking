import { memo } from 'react'

function CarriageFilterItem({ Icon, id, label, isActive, onToggle }) {
  return (
    <li className="search-filters__item">
      <Icon className="search-filters__carriage-icon" />
      <p className="search-filters__item-title">{label}</p>
      <label className="search-filters__toggle">
        <input
          type="checkbox"
          className="search-filters__toggle-input"
          checked={isActive}
          onChange={() => onToggle(id)}
          aria-label={`Переключить ${label}`}
        />
        <span className="search-filters__toggle-track" aria-hidden />
      </label>
    </li>
  )
}

export default memo(CarriageFilterItem)
