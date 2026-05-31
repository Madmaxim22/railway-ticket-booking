import {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useImperativeHandle,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from 'react'

import {
  MONTH_NAMES_RU,
  buildMonthCells,
  formatDateRu,
  formatDateRuInput,
  isCalendarDayBefore,
  isSameCalendarDay,
  parseDateRu,
  startOfToday,
  type CalendarCell,
} from '@/utils/calendarMonth'
import './DatePickerPopover.css'

function addMonths(year: number, month: number, delta: number): { year: number; month: number } {
  const d = new Date(year, month + delta, 1)
  return { year: d.getFullYear(), month: d.getMonth() }
}

export type DatePickerPopoverHandle = {
  openCalendar: () => void
}

type DatePickerPopoverProps = {
  value: Date | null | undefined
  onChange: (date: Date | null) => void
  placeholder?: string
  inputClassName?: string
  id?: string
}

const DatePickerPopover = forwardRef<DatePickerPopoverHandle, DatePickerPopoverProps>(
  function DatePickerPopover(
    { value, onChange, placeholder = 'Выберите дату', inputClassName = '', id: idProp },
    ref,
  ) {
    const reactId = useId()
    const inputId = idProp ?? `datepicker-${reactId.replace(/:/g, '')}`
    const wrapRef = useRef<HTMLDivElement>(null)
    const [open, setOpen] = useState(false)
    const [inputText, setInputText] = useState(() => (value ? formatDateRu(value) : ''))
    const [isFocused, setIsFocused] = useState(false)

    const initial = value ?? new Date()
    const [viewYear, setViewYear] = useState(initial.getFullYear())
    const [viewMonth, setViewMonth] = useState(initial.getMonth())

    useEffect(() => {
      if (!isFocused) {
        setInputText(value ? formatDateRu(value) : '')
      }
    }, [value, isFocused])

    useEffect(() => {
      if (!open) return undefined

      const onDocMouseDown = (e: MouseEvent) => {
        if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
          setOpen(false)
        }
      }
      const onKey = (e: globalThis.KeyboardEvent) => {
        if (e.key === 'Escape') setOpen(false)
      }

      document.addEventListener('mousedown', onDocMouseDown)
      document.addEventListener('keydown', onKey)
      return () => {
        document.removeEventListener('mousedown', onDocMouseDown)
        document.removeEventListener('keydown', onKey)
      }
    }, [open])

    const todayStart = startOfToday()
    const cells = buildMonthCells(viewYear, viewMonth)
    const title = `${MONTH_NAMES_RU[viewMonth]}`

    const prevTarget = addMonths(viewYear, viewMonth, -1)
    const lastDayOfPrevMonth = new Date(prevTarget.year, prevTarget.month + 1, 0)
    const canGoPrev = lastDayOfPrevMonth >= todayStart

    const goPrev = () => {
      if (!canGoPrev) return
      setViewYear(prevTarget.year)
      setViewMonth(prevTarget.month)
    }

    const goNext = () => {
      const { year, month } = addMonths(viewYear, viewMonth, 1)
      setViewYear(year)
      setViewMonth(month)
    }

    const isDayDisabled = (date: Date) => isCalendarDayBefore(date, todayStart)

    const openCalendar = useCallback(() => {
      const anchor = value ?? new Date()
      setViewYear(anchor.getFullYear())
      setViewMonth(anchor.getMonth())
      setOpen(true)
    }, [value])

    useImperativeHandle(ref, () => ({ openCalendar }), [openCalendar])

    const commitInput = () => {
      const trimmed = inputText.trim()
      if (!trimmed) {
        onChange(null)
        setInputText('')
        return
      }

      const parsed = parseDateRu(trimmed, { minDate: todayStart })
      if (parsed) {
        onChange(parsed)
        setInputText(formatDateRu(parsed))
        return
      }

      setInputText(value ? formatDateRu(value) : '')
    }

    const handleDayClick = (cell: CalendarCell) => {
      if (isDayDisabled(cell.date)) return
      onChange(cell.date)
      setInputText(formatDateRu(cell.date))
      setOpen(false)
    }

    const handleInputChange = (next: string) => {
      setInputText(formatDateRuInput(next))
    }

    const handleInputFocus = () => {
      setIsFocused(true)
    }

    const handleInputBlur = () => {
      setIsFocused(false)
      commitInput()
    }

    const handleInputKeyDown = (e: ReactKeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        e.preventDefault()
        commitInput()
        setOpen(false)
        return
      }

      if (e.key === 'ArrowDown' && !open) {
        e.preventDefault()
        openCalendar()
        return
      }

      if (e.key === 'Escape') {
        setOpen(false)
        setInputText(value ? formatDateRu(value) : '')
      }
    }

    return (
      <div
        className={['date-picker', open && 'date-picker--open'].filter(Boolean).join(' ')}
        ref={wrapRef}
      >
        <input
          id={inputId}
          type="text"
          className={inputClassName}
          placeholder={placeholder}
          value={inputText}
          onChange={(e) => handleInputChange(e.target.value)}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onKeyDown={handleInputKeyDown}
          inputMode="numeric"
          maxLength={10}
          aria-haspopup="dialog"
          aria-expanded={open}
        />
        {open && (
          <div className="date-picker__popover" role="dialog" aria-label="Календарь">
            <div className="date-picker__caret" aria-hidden />
            <div className="date-picker__header">
              <button
                type="button"
                className="date-picker__nav date-picker__nav--prev"
                onClick={goPrev}
                disabled={!canGoPrev}
                aria-label="Предыдущий месяц"
              >
                <svg width="10" height="12" viewBox="0 0 10 12" aria-hidden>
                  <path d="M8 0 L2 6 L8 12 Z" fill="currentColor" />
                </svg>
              </button>
              <span className="date-picker__title">{title}</span>
              <button
                type="button"
                className="date-picker__nav date-picker__nav--next"
                onClick={goNext}
                aria-label="Следующий месяц"
              >
                <svg width="10" height="12" viewBox="0 0 10 12" aria-hidden>
                  <path d="M2 0 L8 6 L2 12 Z" fill="currentColor" />
                </svg>
              </button>
            </div>
            <div className="date-picker__grid" role="grid">
              {cells.map((cell, index) => {
                const col = index % 7
                const isWeekend = col >= 5
                const selected = value && isSameCalendarDay(cell.date, value)
                const disabled = isDayDisabled(cell.date)
                return (
                  <button
                    key={`${cell.date.getTime()}-${index}`}
                    type="button"
                    role="gridcell"
                    disabled={disabled}
                    className={[
                      'date-picker__day',
                      !cell.inCurrentMonth && 'date-picker__day--outside',
                      isWeekend && 'date-picker__day--weekend',
                      selected && 'date-picker__day--selected',
                      disabled && 'date-picker__day--disabled',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => handleDayClick(cell)}
                  >
                    {cell.date.getDate()}
                  </button>
                )
              })}
            </div>
          </div>
        )}
      </div>
    )
  },
)

export default DatePickerPopover
