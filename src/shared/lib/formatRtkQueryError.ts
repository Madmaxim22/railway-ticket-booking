export type FormatRtkQueryErrorOptions = {
  /** Сообщение, если ошибку не удалось разобрать */
  fallback: string
  /** Префикс для ошибки только со статусом, например «Ошибка запроса (404)» */
  statusErrorPrefix?: string
}

const DEFAULT_STATUS_ERROR_PREFIX = 'Ошибка запроса'

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object'
}

function readApiPayloadMessage(data: unknown): string | null {
  if (!isRecord(data)) return null
  if (typeof data.message === 'string') return data.message
  if (typeof data.error === 'string') return data.error
  return null
}

/**
 * Преобразует ошибку RTK Query (FetchBaseQueryError / SerializedError) в текст для UI.
 */
export function formatRtkQueryError(
  error: unknown,
  options: FormatRtkQueryErrorOptions | string,
): string {
  const { fallback, statusErrorPrefix = DEFAULT_STATUS_ERROR_PREFIX } =
    typeof options === 'string' ? { fallback: options } : options

  if (!isRecord(error)) return fallback

  if (typeof error.message === 'string') return error.message
  if (typeof error.error === 'string') return error.error

  if ('data' in error) {
    const fromData = readApiPayloadMessage(error.data)
    if (fromData) return fromData
  }

  if ('status' in error) {
    return `${statusErrorPrefix} (${String(error.status)})`
  }

  return fallback
}
