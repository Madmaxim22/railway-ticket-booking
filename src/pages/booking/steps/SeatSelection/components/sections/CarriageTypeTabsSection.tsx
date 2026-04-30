import { carriageTabs } from '../../constants'
import SeatTypeCoupeIcon from '../../icons/SeatTypeCoupeIcon'
import SeatTypeLuxIcon from '../../icons/SeatTypeLuxIcon'
import SeatTypePlatzkartIcon from '../../icons/SeatTypePlatzkartIcon'
import SeatTypeSittingIcon from '../../icons/SeatTypeSittingIcon'
import type { CarriageType } from '../../types'
import './CarriageTypeTabsSection.css'

type CarriageTypeTabsSectionProps = {
  activeType: CarriageType
  onTypeChange: (type: CarriageType) => void
  availableTypes: Set<CarriageType>
}

function getTypeIcon(type: CarriageType) {
  switch (type) {
    case 'seated':
      return SeatTypeSittingIcon
    case 'platkart':
      return SeatTypePlatzkartIcon
    case 'coupe':
      return SeatTypeCoupeIcon
    case 'lux':
      return SeatTypeLuxIcon
    default:
      return SeatTypeSittingIcon
  }
}

export function CarriageTypeTabsSection({
  activeType,
  onTypeChange,
  availableTypes
}: CarriageTypeTabsSectionProps) {
  return (
    <div className="seat-selection-page__carriage-types">
      <h2 className="seat-selection-page__section-title">Тип вагона</h2>
      <div className="seat-selection-page__tabs">
        {carriageTabs.map((tab) => {
          const Icon = getTypeIcon(tab.key)
          const isActive = tab.key === activeType
          const isDisabled = !availableTypes.has(tab.key)
          return (
            <button
              key={tab.key}
              type="button"
              disabled={isDisabled}
              className={`
                seat-selection-page__tab 
                ${isActive ? 'seat-selection-page__tab--active' : ''} 
                ${isDisabled ? 'seat-selection-page__tab--disabled' : ''} 
              `}
              onClick={() => !isDisabled && onTypeChange(tab.key)}
            >
              <Icon className="seat-selection-page__tab-icon" />
              <p className="seat-selection-page__tab-label">{tab.label}</p>
            </button>
          )
        })}
      </div>
    </div>
  )
}
