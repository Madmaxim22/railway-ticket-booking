import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useDebounce } from './useDebounce'

describe('useDebounce', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('возвращает начальное значение сразу', () => {
    const { result } = renderHook(() => useDebounce('initial', 350))
    expect(result.current).toBe('initial')
  })

  it('обновляет значение после задержки', () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 350), {
      initialProps: { value: 'a' },
    })

    rerender({ value: 'b' })
    expect(result.current).toBe('a')

    act(() => {
      vi.advanceTimersByTime(350)
    })

    expect(result.current).toBe('b')
  })
})
