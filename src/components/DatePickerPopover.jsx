import { useEffect, useId, useRef, useState } from 'react'
import {
  MONTH_NAMES_RU,
  buildMonthCells,
  formatDateRu,
  isCalendarDayBefore,
  isSameCalendarDay,
  startOfToday,
} from '../utils/calendarMonth'
import './DatePickerPopover.css'

function addMonths(year, month, delta) {
  const d = new Date(year, month + delta, 1)
  return { year: d.getFullYear(), month: d.getMonth() }
}

export default function DatePickerPopover({
  value,
  onChange,
  placeholder = 'Выберите дату',
  inputClassName = '',
  id: idProp,
}) {
  const reactId = useId()
  const inputId = idProp ?? `datepicker-${reactId.replace(/:/g, '')}`
  const wrapRef = useRef(null)
  const [open, setOpen] = useState(false)

  const initial = value ?? new Date()
  const [viewYear, setViewYear] = useState(initial.getFullYear())
  const [viewMonth, setViewMonth] = useState(initial.getMonth())

  useEffect(() => {
    if (open && value) {
      setViewYear(value.getFullYear())
      setViewMonth(value.getMonth())
    }
  }, [open, value])

  useEffect(() => {
    if (!open) return undefined

    const onDocMouseDown = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    const onKey = (e) => {
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

  const isDayDisabled = (date) => isCalendarDayBefore(date, todayStart)

  const handleDayClick = (cell) => {
    if (isDayDisabled(cell.date)) return
    onChange(cell.date)
    setOpen(false)
  }

  const openCalendar = () => {
    if (!value) {
      const t = new Date()
      setViewYear(t.getFullYear())
      setViewMonth(t.getMonth())
    }
    setOpen(true)
  }

  /** Без открытия в onFocus — иначе focus открывает попап, а click сразу переключает и закрывает. */
  const handleInputClick = () => {
    if (open) {
      setOpen(false)
      return
    }
    openCalendar()
  }

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      if (open) {
        setOpen(false)
      } else {
        openCalendar()
      }
    }
  }

  return (
    <div className={['date-picker', open && 'date-picker--open'].filter(Boolean).join(' ')} ref={wrapRef}>
      <input
        id={inputId}
        type="text"
        readOnly
        className={inputClassName}
        placeholder={placeholder}
        value={value ? formatDateRu(value) : ''}
        onClick={handleInputClick}
        onKeyDown={handleInputKeyDown}
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
}
