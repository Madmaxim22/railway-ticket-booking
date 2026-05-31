import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from 'react'
import './RangeSlider.css'

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

const KEYS_COMMIT_RANGE = new Set([
  'ArrowLeft',
  'ArrowRight',
  'ArrowUp',
  'ArrowDown',
  'Home',
  'End',
  'PageUp',
  'PageDown',
])

type ActiveThumb = 'min' | 'max' | null

export type RangeSliderProps = {
  minLimit: number
  maxLimit: number
  valueMin?: number
  valueMax?: number
  step?: number
  minGap?: number
  disabled?: boolean
  onChange?: (range: [number, number]) => void
  onAfterChange?: (range: [number, number]) => void
  formatValue?: (value: number) => string
  minAriaLabel?: string
  maxAriaLabel?: string
}

export default function RangeSlider({
  minLimit,
  maxLimit,
  valueMin,
  valueMax,
  step = 1,
  minGap = 0,
  disabled = false,
  onChange,
  onAfterChange,
  formatValue = (nextValue) => String(nextValue),
  minAriaLabel,
  maxAriaLabel,
}: RangeSliderProps) {
  const limitsSpan = Math.max(0, maxLimit - minLimit)
  const [currentMin, setCurrentMin] = useState(() =>
    clamp(valueMin ?? minLimit, minLimit, maxLimit - minGap),
  )
  const [currentMax, setCurrentMax] = useState(() =>
    clamp(valueMax ?? maxLimit, minLimit + minGap, maxLimit),
  )
  const [activeThumb, setActiveThumb] = useState<ActiveThumb>(null)
  const rangeRef = useRef<[number, number]>([currentMin, currentMax])

  useEffect(() => {
    const nextMin = clamp(valueMin ?? minLimit, minLimit, maxLimit - minGap)
    const nextMax = clamp(valueMax ?? maxLimit, minLimit + minGap, maxLimit)
    // eslint-disable-next-line react-hooks/set-state-in-effect -- сброс локального диапазона при обновлении props
    setCurrentMin(nextMin)
    setCurrentMax(nextMax)
    rangeRef.current = [nextMin, nextMax]
  }, [minLimit, maxLimit, minGap, valueMin, valueMax])

  const minPercent = limitsSpan > 0 ? ((currentMin - minLimit) / limitsSpan) * 100 : 0
  const maxPercent = limitsSpan > 0 ? ((currentMax - minLimit) / limitsSpan) * 100 : 0
  const rangeWidthPercent = Math.max(0, maxPercent - minPercent)
  const isRangeVisible = rangeWidthPercent > 0

  const updateRange = (nextMin: number, nextMax: number) => {
    rangeRef.current = [nextMin, nextMax]
    setCurrentMin(nextMin)
    setCurrentMax(nextMax)
    onChange?.([nextMin, nextMax])
  }

  const commitAfterChange = useCallback(() => {
    onAfterChange?.(rangeRef.current)
  }, [onAfterChange])

  const attachPointerReleaseListener = useCallback(() => {
    if (disabled) {
      return
    }
    window.addEventListener('pointerup', commitAfterChange, { once: true })
  }, [commitAfterChange, disabled])

  const handleRangeKeyUp = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (disabled) {
        return
      }
      if (KEYS_COMMIT_RANGE.has(event.key)) {
        commitAfterChange()
      }
    },
    [commitAfterChange, disabled],
  )

  const thumbPointerHandlers = {
    onPointerDown: attachPointerReleaseListener,
    onKeyUp: handleRangeKeyUp,
  }

  return (
    <div className={`range-slider${disabled ? ' range-slider--disabled' : ''}`}>
      <div className="range-slider__track-wrap">
        <div className="range-slider__track" />
        <div
          className="range-slider__range"
          style={{
            left: `${Math.max(0, minPercent - 1)}%`,
            width: `${rangeWidthPercent}%`,
            opacity: isRangeVisible ? 1 : 0,
          }}
        />

        <input
          type="range"
          className={`range-slider__input range-slider__input--min ${activeThumb === 'min' ? 'range-slider__input--active' : ''}`}
          aria-label={minAriaLabel}
          disabled={disabled}
          min={minLimit}
          max={maxLimit}
          step={step}
          value={currentMin}
          onMouseDown={() => setActiveThumb('min')}
          onTouchStart={() => setActiveThumb('min')}
          onFocus={() => setActiveThumb('min')}
          {...thumbPointerHandlers}
          onChange={(event) => {
            const nextValue = Number(event.target.value)
            updateRange(Math.min(nextValue, currentMax - minGap), currentMax)
          }}
        />

        <input
          type="range"
          className={`range-slider__input range-slider__input--max ${activeThumb === 'max' ? 'range-slider__input--active' : ''}`}
          aria-label={maxAriaLabel}
          disabled={disabled}
          min={minLimit}
          max={maxLimit}
          step={step}
          value={currentMax}
          onMouseDown={() => setActiveThumb('max')}
          onTouchStart={() => setActiveThumb('max')}
          onFocus={() => setActiveThumb('max')}
          {...thumbPointerHandlers}
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
