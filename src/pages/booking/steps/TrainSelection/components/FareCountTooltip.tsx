import './FareCountTooltip.css'
import FarePriceIcon from '@/shared/ui/icons/FarePriceIcon'
import type { Fare } from './TrainCard'

type FareCountTooltipProps = {
  fare: Fare
}

export default function FareCountTooltip({
  fare,
}: FareCountTooltipProps) {
  return (
    <span className="fare-count-tooltip">
      <span className="train-card__fare-count">{fare.count}</span>
      <span className="fare-count-tooltip__popup" role="tooltip">
        <span className="fare-count-tooltip__row">
          <span className="fare-count-tooltip__label">верхние</span>
          <span className="fare-count-tooltip__count">{fare.count}</span>
          <span className="fare-count-tooltip__price">{fare.top_price}</span>
        <FarePriceIcon className="fare-count-tooltip__icon" />
        </span>
        <span className="fare-count-tooltip__row">
          <span className="fare-count-tooltip__label">нижние</span>
          <span className="fare-count-tooltip__count">{fare.count}</span>
          <span className="fare-count-tooltip__price">{fare.bottom_price}</span>
          <FarePriceIcon className="fare-count-tooltip__icon" />
        </span>
        {fare.type === 'Плацкарт' && (
          <span className="fare-count-tooltip__row">
            <span className="fare-count-tooltip__label">сидячие</span>
            <span className="fare-count-tooltip__count">{fare.count}</span>
            <span className="fare-count-tooltip__price">{fare.side_price}</span>
            <FarePriceIcon className="fare-count-tooltip__icon" />
          </span>
        )}
      </span>
    </span>
  )
}
