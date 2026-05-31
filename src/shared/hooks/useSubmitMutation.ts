import { useCallback } from 'react'

import {
  formatRtkQueryError,
  type FormatRtkQueryErrorOptions,
} from '@/shared/lib/formatRtkQueryError'

export type UseSubmitMutationOptions = FormatRtkQueryErrorOptions & {
  /** Сообщение, когда API вернул `{ status: false }` без HTTP-ошибки */
  rejectedMessage: string
}

export type SubmitMutationOutcome<TData> =
  | { ok: true; data: TData }
  | { ok: false; message: string }

type StatusResponse = { status: boolean }

/**
 * Обёртка для RTK Query `.unwrap()`: try/catch, проверка `result.status`, formatRtkQueryError.
 */
export function useSubmitMutation<TData extends StatusResponse>(options: UseSubmitMutationOptions) {
  const { fallback, statusErrorPrefix, rejectedMessage } = options

  const submit = useCallback(
    async (request: () => Promise<TData>): Promise<SubmitMutationOutcome<TData>> => {
      try {
        const result = await request()

        if (!result.status) {
          return { ok: false, message: rejectedMessage }
        }

        return { ok: true, data: result }
      } catch (error) {
        return {
          ok: false,
          message: formatRtkQueryError(error, { fallback, statusErrorPrefix }),
        }
      }
    },
    [fallback, statusErrorPrefix, rejectedMessage],
  )

  return { submit }
}
