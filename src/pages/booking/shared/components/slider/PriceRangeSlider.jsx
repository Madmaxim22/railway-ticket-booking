import RangeSlider from './RangeSlider'

export default function PriceRangeSlider({
  minLimit = 1920,
  maxLimit = 7000,
  initialMin = 1920,
  initialMax = 4500,
  step = 10,
  onChange
}) {
  return (
    <>
      <div className="range-slider__labels">
        <span>от</span>
        <span>до</span>
      </div>
      <RangeSlider
        minLimit={minLimit}
        maxLimit={maxLimit}
        initialMin={initialMin}
        initialMax={initialMax}
        step={step}
        minGap={100}
        minAriaLabel="Минимальная цена"
        maxAriaLabel="Максимальная цена"
        formatValue={(value) => String(value)}
        onChange={onChange}
      />
    </>
  )
}