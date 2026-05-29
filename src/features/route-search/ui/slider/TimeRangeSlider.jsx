import RangeSlider from './RangeSlider'

function formatHour(value) {
  return `${String(value).padStart(2, '0')}:00`
}

export default function TimeRangeSlider({
  onChange,
  onAfterChange,
  disabled = false,
  minLimit = 0,
  maxLimit = 24,
  step = 1,
}) {
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
