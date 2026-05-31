import { act, renderHook } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { useSubmitMutation } from './useSubmitMutation'

const options = {
  fallback: 'Не удалось выполнить запрос.',
  statusErrorPrefix: 'Ошибка запроса',
  rejectedMessage: 'Сервер отклонил запрос.',
}

describe('useSubmitMutation', () => {
  it('возвращает data при status: true', async () => {
    const { result } = renderHook(() => useSubmitMutation<{ status: boolean; id: string }>(options))

    let outcome: Awaited<ReturnType<typeof result.current.submit>> | undefined

    await act(async () => {
      outcome = await result.current.submit(async () => ({ status: true, id: '42' }))
    })

    expect(outcome).toEqual({ ok: true, data: { status: true, id: '42' } })
  })

  it('возвращает rejectedMessage при status: false', async () => {
    const { result } = renderHook(() => useSubmitMutation<{ status: boolean }>(options))

    let outcome: Awaited<ReturnType<typeof result.current.submit>> | undefined

    await act(async () => {
      outcome = await result.current.submit(async () => ({ status: false }))
    })

    expect(outcome).toEqual({ ok: false, message: options.rejectedMessage })
  })

  it('форматирует ошибку unwrap через formatRtkQueryError', async () => {
    const { result } = renderHook(() => useSubmitMutation<{ status: boolean }>(options))

    let outcome: Awaited<ReturnType<typeof result.current.submit>> | undefined

    await act(async () => {
      outcome = await result.current.submit(async () => {
        throw { status: 500, data: { message: 'Внутренняя ошибка' } }
      })
    })

    expect(outcome).toEqual({ ok: false, message: 'Внутренняя ошибка' })
  })

  it('использует fallback при неизвестной ошибке', async () => {
    const { result } = renderHook(() => useSubmitMutation<{ status: boolean }>(options))

    let outcome: Awaited<ReturnType<typeof result.current.submit>> | undefined

    await act(async () => {
      outcome = await result.current.submit(async () => {
        throw 'network'
      })
    })

    expect(outcome).toEqual({ ok: false, message: options.fallback })
  })
})
