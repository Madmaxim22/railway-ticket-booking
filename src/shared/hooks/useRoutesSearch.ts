import { useCallback, useRef, useState } from 'react'
import { useLazyGetRoutesQuery } from '@/store/api/routesApi'
import { buildRoutesQueryString } from '@/store/api/routesQuerySerialize'
import type { RoutesQueryParams, RoutesSortParam } from '@/store/api/routesQueryParams.types'

/** Параметры инициализации хука поиска маршрутов (города, сортировка, пагинация). */
export type UseRoutesSearchOptions = {
  initialFilters?: Partial<RoutesQueryParams>
}

/** Базовые значения фильтров до пользовательского ввода и после сброса. */
const defaultFilters: RoutesQueryParams = {
  from_city_id: '',
  to_city_id: '',
  sort: 'date',
  limit: 5,
  offset: 0,
}

/**
 * Сливает частичное обновление с полным набором параметров запроса маршрутов.
 * Поля городов задаются явно: так сохраняются пустые строки и не затираются `undefined` из patch.
 */
function mergeRoutesQueryParams(
  base: RoutesQueryParams,
  patch: Partial<RoutesQueryParams>,
): RoutesQueryParams {
  return {
    ...base,
    ...patch,
    from_city_id: patch.from_city_id ?? base.from_city_id,
    to_city_id: patch.to_city_id ?? base.to_city_id,
  }
}

/**
 * Состояние фильтров поиска поездов и ленивый RTK Query-запрос к API маршрутов.
 * `filtersRef` дублирует актуальные фильтры для стабильных колбэков и атомарного merge+trigger.
 */
export function useRoutesSearch(options: UseRoutesSearchOptions = {}) {
  // TODO: Возможно стоит убрать, так как не используется в отрисовке
  /** Фильтры поиска поездов в состоянии и сеттер для их обновления. */
  const [filters, setFilters] = useState<RoutesQueryParams>(() =>
    mergeRoutesQueryParams(defaultFilters, options.initialFilters ?? {}),
  )
  /** Актуальные фильтры без задержки ре-рендера (для `sendServer` и `mergeRoutesFilters`). */
  const filtersRef = useRef(filters)
  /** Текст ошибки валидации городов перед вызовом API. */
  const [cityIdsError, setCityIdsError] = useState<string | null>(null)

  const [trigger, queryState] = useLazyGetRoutesQuery()

  /** Обновляет фильтры в состоянии и в ref, сбрасывает ошибку городов. */
  const mergeRoutesFilters = useCallback((patch: Partial<RoutesQueryParams>) => {
    setCityIdsError(null)
    const next = mergeRoutesQueryParams(filtersRef.current, patch)
    filtersRef.current = next
    setFilters(next)
  }, [])

  /** Возвращает фильтры к `defaultFilters`, поверх накладывая `initialFilters` из опций. */
  const resetFilters = useCallback(() => {
    setCityIdsError(null)
    const next = mergeRoutesQueryParams(defaultFilters, options.initialFilters ?? {})
    filtersRef.current = next
    setFilters(next)
  }, [options.initialFilters])

  /** Строка query для текущего `filters` (например, для ручного кэша или логирования). */
  const buildQueryStringFromState = useCallback(
    () => buildRoutesQueryString(filters),
    [filters],
  )

  /**
   * Опциональный `patch` объединяется с текущими фильтрами и сразу уходит запрос
   * (чтобы не терять обновления при вызове подряд merge + send в одном обработчике).
   */
  const sendServer = useCallback((patch?: Partial<RoutesQueryParams>) => {
    const merged = mergeRoutesQueryParams(filtersRef.current, patch ?? {})
    filtersRef.current = merged
    setFilters(merged)

    const from = merged.from_city_id.trim()
    const to = merged.to_city_id.trim()
    if (!from || !to) {
      setCityIdsError('Укажите идентификаторы городов отправления и назначения.')
      return undefined
    }
    setCityIdsError(null)
    return trigger(buildRoutesQueryString(merged))
  }, [trigger])

  /** Сеттеры ниже — тонкие обёртки над `mergeRoutesFilters` для удобства UI. */

  const setSort = useCallback(
    (sort: RoutesSortParam) => {
      mergeRoutesFilters({ sort })
    },
    [mergeRoutesFilters],
  )

  const setFromCityId = useCallback(
    (from_city_id: string) => {
      mergeRoutesFilters({ from_city_id })
    },
    [mergeRoutesFilters],
  )

  const setToCityId = useCallback(
    (to_city_id: string) => {
      mergeRoutesFilters({ to_city_id })
    },
    [mergeRoutesFilters],
  )

  const setLimit = useCallback(
    (limit: number) => {
      mergeRoutesFilters({ limit })
    },
    [mergeRoutesFilters],
  )

  const setOffset = useCallback(
    (offset: number) => {
      mergeRoutesFilters({ offset })
    },
    [mergeRoutesFilters],
  )

  /** Фильтры, методы изменения, ошибка городов и поля состояния ленивого запроса RTK Query. */
  return {
    filters,
    mergeRoutesFilters,
    resetFilters,
    buildQueryStringFromState,
    sendServer,
    setSort,
    setFromCityId,
    setToCityId,
    setLimit,
    setOffset,
    cityIdsError,
    ...queryState,
  }
}
