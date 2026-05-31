export type OrderUserPayload = {
  first_name: string
  last_name: string
  patronymic: string
  phone: string
  email: string
  payment_method: 'cash' | 'online'
}

export type OrderPersonInfoPayload = {
  is_adult: boolean
  first_name: string
  last_name: string
  patronymic: string
  gender: boolean
  birthday: string
  document_type: string
  document_data: string
}

export type OrderSeatPayload = {
  coach_id: string
  person_info: OrderPersonInfoPayload
  seat_number: number
  is_child: boolean
  include_children_seat: boolean
}

export type OrderDirectionPayload = {
  route_direction_id: string
  seats: OrderSeatPayload[]
}

export type CreateOrderRequest = {
  user: OrderUserPayload
  departure: OrderDirectionPayload
  arrival?: OrderDirectionPayload
}

export type CreateOrderResponse = {
  status: boolean
  order_id?: string
  total?: number
}
