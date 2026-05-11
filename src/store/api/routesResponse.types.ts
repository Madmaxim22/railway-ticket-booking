/**
 * Типы тела ответа API списка маршрутов (поездов между городами).
 */

/** Минимальное представление города в ответе маршрута */
export type RouteCityRef = {
  _id: string
  name: string
}

/** Станция и время на одном конце сегмента (отправление или прибытие) */
export type RouteEndpoint = {
  railway_station_name: string
  city: RouteCityRef
  /** Unix timestamp в миллисекундах */
  datetime: number
}

/** Минимальное представление поезда в сегменте */
export type RouteTrainRef = {
  _id: string
  name: string
}

/**
 * Цены внутри одного класса обслуживания: базовая и надбавки за тип места и опции.
 */
export type RoutePriceTierDetail = {
  price: number
  top_price: number
  bottom_price: number
  side_price: number
  linens_price: number
  wifi_price: number
}

/** Цены по классам 1–4 для сегмента */
export type RoutePriceInfo = {
  first: RoutePriceTierDetail
  second: RoutePriceTierDetail
  third: RoutePriceTierDetail
  fourth: RoutePriceTierDetail
}

/** Количество доступных мест по классам 1–4 */
export type RouteSeatsInfo = {
  first: number
  second: number
  third: number
  fourth: number
}

/** Один направленный участок: поезд от станции from до to с ценами и услугами */
export type RouteDirectionSegment = {
  _id: string
  have_first_class: boolean
  have_second_class: boolean
  have_third_class: boolean
  have_fourth_class: boolean
  have_wifi: boolean
  have_air_conditioning: boolean
  train: RouteTrainRef
  from: RouteEndpoint
  to: RouteEndpoint
  min_price: number
  /** Длительность сегмента в миллисекундах */
  duration: number
  price_info: RoutePriceInfo
  seats_info: RouteSeatsInfo
}

/**
 * Одна строка в списке маршрутов: прибытие и отправление как два сегмента
 * плюс агрегированные признаки и минимальная цена.
 */
export type RoutesListItem = {
  have_first_class: boolean
  have_second_class: boolean
  have_third_class: boolean
  have_fourth_class: boolean
  have_wifi: boolean
  have_air_conditioning: boolean
  is_express: boolean
  min_price: number
  arrival: RouteDirectionSegment
  departure: RouteDirectionSegment
  /** Имя поля как в API (опечатка avaliable сохранена для совпадения с бэкендом) */
  total_avaliable_seats: number
}

/** Пагинированный список маршрутов */
export type RoutesListResponse = {
  total_count: number
  items: RoutesListItem[]
}
