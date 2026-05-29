import type { Passenger } from '@/entities/passenger/model/passenger.types'
import type { SeatSelectionTicketCounts } from '@/entities/booking/model/ticketCounts'
import type {
  CreateOrderRequest,
  OrderDirectionPayload,
  OrderPersonInfoPayload,
  OrderSeatPayload,
} from '@/store/api/orderRequest.types'
import type {
  BookingContactInfo,
  BookingSeatSelection,
  BookingState,
  PaymentMethod,
} from '@/store/slices/bookingSlice'

function formatBirthdayToApi(birthDate: string): string {
  const [day, month, year] = birthDate.trim().split('.')
  return `${year}-${month}-${day}`
}

function mapDocumentType(documentType: Passenger['documentType']): string {
  return documentType === 'passport' ? 'паспорт' : 'свидетельство о рождении'
}

function mapDocumentData(passenger: Passenger): string {
  const series = passenger.series.trim()
  const number = passenger.number.trim()

  if (passenger.documentType === 'passport') {
    return `${series} ${number}`.trim()
  }

  return series ? `${series} ${number}`.trim() : number
}

function mapPersonInfo(passenger: Passenger): OrderPersonInfoPayload {
  return {
    is_adult: passenger.category === 'adult',
    first_name: passenger.firstName.trim(),
    last_name: passenger.lastName.trim(),
    patronymic: passenger.middleName.trim(),
    gender: passenger.gender === 'male',
    birthday: formatBirthdayToApi(passenger.birthDate),
    document_type: mapDocumentType(passenger.documentType),
    document_data: mapDocumentData(passenger),
  }
}

function buildDirectionSeats(
  selection: BookingSeatSelection,
  passengers: Passenger[],
  ticketCounts: SeatSelectionTicketCounts,
): OrderSeatPayload[] {
  const seatedPassengers = passengers.filter((passenger) => passenger.category !== 'childWithoutSeat')

  return selection.seats.map((seatNumber, seatIndex) => {
    const passenger = seatedPassengers[seatIndex]
    if (!passenger) {
      throw new Error(`Не найден пассажир для места ${seatNumber}`)
    }

    const isAdultSeat = seatIndex < ticketCounts.adults

    return {
      coach_id: selection.carriageId,
      person_info: mapPersonInfo(passenger),
      seat_number: seatNumber,
      is_child: passenger.category === 'child',
      include_children_seat: isAdultSeat && seatIndex < ticketCounts.childrenWithoutSeat,
    }
  })
}

function buildDirectionPayload(
  routeDirectionId: string,
  selection: BookingSeatSelection,
  passengers: Passenger[],
  ticketCounts: SeatSelectionTicketCounts,
): OrderDirectionPayload {
  return {
    route_direction_id: routeDirectionId,
    seats: buildDirectionSeats(selection, passengers, ticketCounts),
  }
}

export function buildOrderRequest(booking: BookingState): CreateOrderRequest | null {
  const { departure, departureSeats, passengers, ticketCounts, contactInfo, paymentMethod } = booking

  if (!departure || !departureSeats || !contactInfo || !paymentMethod || passengers.length === 0) {
    return null
  }

  const user = mapUser(contactInfo, paymentMethod)
  const departurePayload = buildDirectionPayload(
    departure.segment._id,
    departureSeats,
    passengers,
    ticketCounts,
  )

  const request: CreateOrderRequest = {
    user,
    departure: departurePayload,
  }

  if (booking.returnTrip && booking.returnTripSeats) {
    request.arrival = buildDirectionPayload(
      booking.returnTrip.segment._id,
      booking.returnTripSeats,
      passengers,
      ticketCounts,
    )
  }

  return request
}

function mapUser(contactInfo: BookingContactInfo, paymentMethod: PaymentMethod) {
  return {
    first_name: contactInfo.firstName.trim(),
    last_name: contactInfo.lastName.trim(),
    patronymic: contactInfo.patronymic.trim(),
    phone: contactInfo.phone.trim(),
    email: contactInfo.email.trim(),
    payment_method: paymentMethod,
  }
}
