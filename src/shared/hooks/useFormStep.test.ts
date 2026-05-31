import { act, renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { useFormStep } from './useFormStep'

type Draft = { name: string; email: string }
type Errors = Partial<Record<keyof Draft, string>>

describe('useFormStep', () => {
  it('хранит draft и очищает ошибку поля при clearFieldError', () => {
    const { result } = renderHook(() =>
      useFormStep<Draft, Errors>({
        initial: { name: '', email: '' },
        validate: (value) => ({
          isValid: Boolean(value.name && value.email),
          errors: {
            ...(value.name ? {} : { name: 'Обязательно' }),
            ...(value.email ? {} : { email: 'Обязательно' }),
          },
        }),
      }),
    )

    act(() => {
      result.current.validate({ name: '', email: '' })
    })

    expect(result.current.errors.name).toBe('Обязательно')

    act(() => {
      result.current.setDraft({ name: 'Иван', email: '' })
      result.current.clearFieldError('name')
    })

    expect(result.current.draft.name).toBe('Иван')
    expect(result.current.errors.name).toBeUndefined()
  })

  it('submit вызывает onCommit только при успешной валидации', () => {
    const onCommit = vi.fn()

    const { result } = renderHook(() =>
      useFormStep<Draft, Errors>({
        initial: { name: 'Иван', email: '' },
        validate: (value) => ({
          isValid: Boolean(value.email),
          errors: value.email ? {} : { email: 'Обязательно' },
        }),
        onCommit,
      }),
    )

    let submitted = false

    act(() => {
      submitted = result.current.submit()
    })

    expect(submitted).toBe(false)
    expect(onCommit).not.toHaveBeenCalled()

    act(() => {
      result.current.setDraft({ name: 'Иван', email: 'a@b.ru' })
    })

    act(() => {
      submitted = result.current.submit()
    })

    expect(submitted).toBe(true)
    expect(onCommit).toHaveBeenCalledWith({ name: 'Иван', email: 'a@b.ru' })
  })
})
