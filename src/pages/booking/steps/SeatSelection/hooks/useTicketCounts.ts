import { useCallback, useState } from 'react'

import {
  DEFAULT_TICKET_COUNTS,
  TICKET_COUNT_LIMITS,
  type SeatSelectionTicketCounts,
  type TicketCountKey,
} from '../constants'

function getChildrenWithoutSeatMax(adults: number): number {
  return adults
}

function cycleCount(current: number, min: number, max: number): number {
  if (current >= max) return min
  return current + 1
}

export function useTicketCounts(
  initial: SeatSelectionTicketCounts = DEFAULT_TICKET_COUNTS,
) {
  const [counts, setCounts] = useState<SeatSelectionTicketCounts>(initial)
  const [activeKey, setActiveKey] = useState<TicketCountKey>('adults')

  const cycleTicketCount = useCallback((key: TicketCountKey) => {
    setActiveKey(key)
    setCounts((prev) => {
      if (key === 'adults') {
        const adults = cycleCount(
          prev.adults,
          TICKET_COUNT_LIMITS.adults.min,
          TICKET_COUNT_LIMITS.adults.max,
        )
        return {
          ...prev,
          adults,
          childrenWithoutSeat: Math.min(prev.childrenWithoutSeat, adults),
        }
      }

      if (key === 'children') {
        return {
          ...prev,
          children: cycleCount(
            prev.children,
            TICKET_COUNT_LIMITS.children.min,
            TICKET_COUNT_LIMITS.children.max,
          ),
        }
      }

      const maxWithoutSeat = getChildrenWithoutSeatMax(prev.adults)
      return {
        ...prev,
        childrenWithoutSeat: cycleCount(prev.childrenWithoutSeat, 0, maxWithoutSeat),
      }
    })
  }, [])

  const isAtMax = useCallback(
    (key: TicketCountKey): boolean => {
      if (key === 'adults') return counts.adults >= TICKET_COUNT_LIMITS.adults.max
      if (key === 'children') return counts.children >= TICKET_COUNT_LIMITS.children.max
      return counts.childrenWithoutSeat >= getChildrenWithoutSeatMax(counts.adults)
    },
    [counts],
  )

  const remainingHint = useCallback(
    (key: TicketCountKey): string | null => {
      if (isAtMax(key)) {
        if (key === 'adults') return 'Достигнут максимум. Нажмите, чтобы начать сначала.'
        if (key === 'children') return 'Достигнут максимум. Нажмите, чтобы начать сначала.'
        return 'Достигнут максимум. Нажмите, чтобы сбросить до 0.'
      }

      if (key === 'adults') {
        const left = TICKET_COUNT_LIMITS.adults.max - counts.adults
        return left > 0 ? `Можно добавить еще ${left} пассажиров` : null
      }
      if (key === 'children') {
        const left = TICKET_COUNT_LIMITS.children.max - counts.children
        return left > 0
          ? `Можно добавить еще ${left} детей до 10 лет. Свое место в вагоне, как у взрослых, но дешевле в среднем на 50-65%.`
          : null
      }
      const left = getChildrenWithoutSeatMax(counts.adults) - counts.childrenWithoutSeat
      return `Можно добавить еще ${left} — не больше числа взрослых (${counts.adults}).`
    },
    [counts, isAtMax],
  )

  return {
    counts,
    activeKey,
    setActiveKey,
    cycleTicketCount,
    isAtMax,
    remainingHint,
  }
}
