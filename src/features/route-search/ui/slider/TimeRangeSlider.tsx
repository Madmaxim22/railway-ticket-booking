import RangeSlider, { type RangeSliderProps } from './RangeSlider'

function formatHour(value: number): string {
  return `${String(value).padStart(2, '0')}:00`
}

type TimeRangeSliderProps = Partial<
  Pick<RangeSliderProps, 'onChange' | 'onAfterChange' | 'disabled' | 'minLimit' | 'maxLimit' | 'step'>
>

export default function TimeRangeSlider({
  onChange,
  onAfterChange,
  disabled = false,
  minLimit = 0,
  maxLimit = 24,
  step = 1,
}: TimeRangeSliderProps) {
  return (
    <>
      <RangeSlider
        disabled={disabled}
        minLimit={minLimit}
        maxLimit={maxLimit}
        step={step}
        minGap={1}
        onChange={onChange}
        onAfterChange={onAfterChange}
        minAriaLabel="Минимальное время"
        maxAriaLabel="Максимальное время"
        formatValue={formatHour}
      />
    </>
  )
}
