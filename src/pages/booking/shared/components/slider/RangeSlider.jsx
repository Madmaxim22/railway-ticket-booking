import { useEffect, useState } from 'react'
import './RangeSlider.css'

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}

export default function RangeSlider({
  minLimit,
  maxLimit,
  step = 1,
  value,
  initialMin,
  initialMax,
  minGap = 0,
  onChange,
  formatValue = (nextValue) => String(nextValue),
  minAriaLabel,
  maxAriaLabel
}) {
  const limitsSpan = Math.max(0, maxLimit - minLimit)
  const isControlled = Array.isArray(value) && value.length === 2
  const [currentMin, setCurrentMin] = useState(() => (
    clamp(initialMin ?? minLimit, minLimit, maxLimit - minGap)
  ))
  const [currentMax, setCurrentMax] = useState(() => (
    clamp(initialMax ?? maxLimit, minLimit + minGap, maxLimit)
  ))
  const [activeThumb, setActiveThumb] = useState(null)

  useEffect(() => {
    const safeInitialMin = clamp(initialMin ?? minLimit, minLimit, maxLimit - minGap)
    const safeInitialMax = clamp(initialMax ?? maxLimit, minLimit + minGap, maxLimit)

    if (isControlled) {
      const safeControlledMin = clamp(value[0], minLimit, maxLimit - minGap)
      const safeControlledMax = clamp(value[1], minLimit + minGap, maxLimit)

      setCurrentMin(Math.min(safeControlledMin, safeControlledMax - minGap))
      setCurrentMax(Math.max(safeControlledMax, safeControlledMin + minGap))
      return
    }

    setCurrentMin(safeInitialMin)
    setCurrentMax(safeInitialMax)
  }, [
    initialMax,
    initialMin,
    isControlled,
    maxLimit,
    minGap,
    minLimit,
    value
  ])

  const minPercent = limitsSpan > 0 ? ((currentMin - minLimit) / limitsSpan) * 100 : 0
  const maxPercent = limitsSpan > 0 ? ((currentMax - minLimit) / limitsSpan) * 100 : 0
  const rangeWidthPercent = Math.max(0, maxPercent - minPercent)
  const isRangeVisible = rangeWidthPercent > 0

  const updateRange = (nextMin, nextMax) => {
    if (!isControlled) {
      setCurrentMin(nextMin)
      setCurrentMax(nextMax)
    }

    onChange?.([nextMin, nextMax])
  }

  return (
    <div className="range-slider">
      <div className="range-slider__track-wrap">
        <div className="range-slider__track" />
        <div
          className="range-slider__range"
          style={{
            left: `${minPercent}%`,
            width: `${rangeWidthPercent}%`,
            opacity: isRangeVisible ? 1 : 0
          }}
        />

        <input
          type="range"
          className={`range-slider__input range-slider__input--min ${activeThumb === 'min' ? 'range-slider__input--active' : ''}`}
          aria-label={minAriaLabel}
          min={minLimit}
          max={maxLimit}
          step={step}
          value={currentMin}
          onMouseDown={() => setActiveThumb('min')}
          onTouchStart={() => setActiveThumb('min')}
          onFocus={() => setActiveThumb('min')}
          onChange={(event) => {
            const nextValue = Number(event.target.value)
            updateRange(Math.min(nextValue, currentMax - minGap), currentMax)
          }}
        />

        <input
          type="range"
          className={`range-slider__input range-slider__input--max ${activeThumb === 'max' ? 'range-slider__input--active' : ''}`}
          aria-label={maxAriaLabel}
          min={minLimit}
          max={maxLimit}
          step={step}
          value={currentMax}
          onMouseDown={() => setActiveThumb('max')}
          onTouchStart={() => setActiveThumb('max')}
          onFocus={() => setActiveThumb('max')}
          onChange={(event) => {
            const nextValue = Number(event.target.value)
            updateRange(currentMin, Math.max(nextValue, currentMin + minGap))
          }}
        />
      </div>
      <div className="range-slider__values">
        <span>{formatValue(currentMin)}</span>
        <span>{formatValue(currentMax)}</span>
        <span>{formatValue(maxLimit)}</span>
      </div>
    </div>
  )
}
