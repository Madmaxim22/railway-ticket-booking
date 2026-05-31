import RangeSlider, { type RangeSliderProps } from './RangeSlider'

type PriceRangeSliderProps = Partial<
  Pick<
    RangeSliderProps,
    'minLimit' | 'maxLimit' | 'valueMin' | 'valueMax' | 'step' | 'onChange' | 'onAfterChange'
  >
>

export default function PriceRangeSlider({
  minLimit = 0,
  maxLimit = 7000,
  valueMin,
  valueMax,
  step = 10,
  onChange,
  onAfterChange,
}: PriceRangeSliderProps) {
  return (
    <>
      <div className="range-slider__labels">
        <span>от</span>
        <span>до</span>
      </div>
      <RangeSlider
        minLimit={minLimit}
        maxLimit={maxLimit}
        valueMin={valueMin}
        valueMax={valueMax}
        step={step}
        minGap={100}
        minAriaLabel="Минимальная цена"
        maxAriaLabel="Максимальная цена"
        formatValue={(value) => String(value)}
        onChange={onChange}
        onAfterChange={onAfterChange}
      />
    </>
  )
}
