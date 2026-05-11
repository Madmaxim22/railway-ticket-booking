/** Значение query-параметра `sort` для GET /routes */
export type RoutesSortParam = 'date' | 'price' | 'duration'

/** Параметры GET /routes: id городов обязательны; остальные поля — опциональны. */
export type RoutesQueryParams = {
  from_city_id: string
  to_city_id: string
  date_start?: string | Date
  date_end?: string | Date
  date_start_arrival?: string | Date
  date_end_arrival?: string | Date
  have_first_class?: boolean
  have_second_class?: boolean
  have_third_class?: boolean
  have_fourth_class?: boolean
  have_wifi?: boolean
  have_air_conditioning?: boolean
  have_express?: boolean
  price_from?: number
  price_to?: number
  start_departure_hour_from?: number
  start_departure_hour_to?: number
  start_arrival_hour_from?: number
  start_arrival_hour_to?: number
  end_departure_hour_from?: number
  end_departure_hour_to?: number
  end_arrival_hour_from?: number
  end_arrival_hour_to?: number
  limit?: number
  offset?: number
  sort?: RoutesSortParam
}
