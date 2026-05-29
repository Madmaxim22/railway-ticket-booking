export type RouteCoachClassType = 'first' | 'second' | 'third' | 'fourth'

export type RouteCoach = {
  _id: string
  name: string
  class_type: RouteCoachClassType
  have_wifi: boolean
  have_air_conditioning: boolean
  price: number
  top_price: number
  bottom_price: number
  side_price: number
  linens_price: number
  wifi_price: number
  is_linens_included: boolean
  available_seats: number
  train: string
}

export type RouteSeatAvailability = {
  index: number
  available: boolean
}

export type RouteCoachSeatsItem = {
  coach: RouteCoach
  seats: RouteSeatAvailability[]
}

export type RouteSeatsResponse = RouteCoachSeatsItem[]
