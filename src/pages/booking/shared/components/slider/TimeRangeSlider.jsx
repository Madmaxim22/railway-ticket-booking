import RangeSlider from './RangeSlider'

function formatHour(value) {
  return `${String(value).padStart(2, '0')}:00`
}

export default function TimeRangeSlider({
  value,
  onChange,
  minLimit = 0,
  maxLimit = 24,
  step = 1,
}) {
  const [fromHour = minLimit, toHour = maxLimit] = value ?? []

  return (
    <>
      <RangeSlider
        minLimit={minLimit}
        maxLimit={maxLimit}
        step={step}
        minGap={1}
        value={[fromHour, toHour]}
        onChange={onChange}
        minAriaLabel="Минимальное время"
        maxAriaLabel="Максимальное время"
        formatValue={formatHour}
      />
    </>
  )
}
