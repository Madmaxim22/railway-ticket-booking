import './FareCountTooltip.css'
import FarePriceIcon from '@/shared/ui/icons/FarePriceIcon'

type FareCountTooltipProps = {
  count: number
  upperCount: number
  upperPrice: string
  lowerCount: number
  lowerPrice: string
}

export default function FareCountTooltip({
  count,
  upperCount,
  upperPrice,
  lowerCount,
  lowerPrice,
}: FareCountTooltipProps) {
  return (
    <span className="fare-count-tooltip">
      <span className="train-card__fare-count">{count}</span>
      <span className="fare-count-tooltip__popup" role="tooltip">
        <span className="fare-count-tooltip__row">
          <span className="fare-count-tooltip__label">верхние</span>
          <span className="fare-count-tooltip__count">{upperCount}</span>
          <span className="fare-count-tooltip__price">{upperPrice}</span>
        <FarePriceIcon className="fare-count-tooltip__icon" />
        </span>
        <span className="fare-count-tooltip__row">
          <span className="fare-count-tooltip__label">нижние</span>
          <span className="fare-count-tooltip__count">{lowerCount}</span>
          <span className="fare-count-tooltip__price">{lowerPrice}</span>
          <FarePriceIcon className="fare-count-tooltip__icon" />
        </span>
      </span>
    </span>
  )
}
