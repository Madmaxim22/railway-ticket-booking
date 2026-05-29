import type { RouteCoachSeatsItem, RouteCoachClassType } from '@/store/api/routesSeatsResponse.types'
import type { RouteDirectionSegment } from '@/store/api/routesResponse.types'
import { formatTitleCaseWords } from '@/shared/lib/formatTitleCaseWords'
import { formatRouteTime } from '@/shared/lib/routeFormatters'
import type { Carriage, CarriageType, TrainOption } from '../types'
import { SEAT_SCHEMA_CAPACITY } from './seatLayoutConfig'

const CLASS_TYPE_TO_CARRIAGE: Record<
  RouteCoachClassType,
  { type: CarriageType; classLabel: string }
> = {
  first: { type: 'lux', classLabel: 'Люкс' },
  second: { type: 'coupe', classLabel: 'Купе' },
  third: { type: 'platkart', classLabel: 'Плацкарт' },
  fourth: { type: 'seated', classLabel: 'Сидячий' },
}

function formatDurationLabel(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return '—'
  const totalMinutes = Math.round(seconds / 60)
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60
  const hourWord = hours === 1 ? 'час' : hours >= 2 && hours <= 4 ? 'часа' : 'часов'
  const minuteWord =
    minutes === 1 ? 'минута' : minutes >= 2 && minutes <= 4 ? 'минуты' : 'минут'
  return `${hours} ${hourWord} ${minutes} ${minuteWord}`
}

function parseWagonNumber(name: string, fallback: number): number {
  const match = name.match(/-(\d+)\s*$/) ?? name.match(/(\d+)\s*$/)
  if (!match) return fallback
  const parsed = Number(match[1])
  return Number.isFinite(parsed) ? parsed : fallback
}

function mapSeatAvailability(seats: RouteCoachSeatsItem['seats'], carriageType: CarriageType) {
  const capacity = SEAT_SCHEMA_CAPACITY[carriageType]
  const schemaSeats = Array.from({ length: capacity }, (_, index) => index + 1)
  const apiByIndex = new Map(seats.map((seat) => [seat.index, seat.available]))

  const unavailableSeats = schemaSeats.filter((seatNumber) => {
    if (!apiByIndex.has(seatNumber)) return true
    return apiByIndex.get(seatNumber) === false
  })

  return { seats: schemaSeats, unavailableSeats }
}

function mapCoachItem(item: RouteCoachSeatsItem, wagonFallback: number): Carriage {
  const mapping = CLASS_TYPE_TO_CARRIAGE[item.coach.class_type]
  const { seats, unavailableSeats } = mapSeatAvailability(item.seats, mapping.type)
  const coach = item.coach

  return {
    id: coach._id,
    number: parseWagonNumber(coach.name, wagonFallback),
    type: mapping.type,
    classLabel: mapping.classLabel,
    haveWifi: coach.have_wifi,
    haveAirConditioning: coach.have_air_conditioning,
    topPrice: coach.top_price,
    bottomPrice: coach.bottom_price,
    ...(coach.side_price > 0 ? { sidePrice: coach.side_price } : {}),
    ...(mapping.type === 'lux' && coach.price > 0 ? { luxPrice: coach.price } : {}),
    seats,
    unavailableSeats,
  }
}

export function mapRouteSeatsToTrainOption(
  segment: RouteDirectionSegment,
  seatsResponse: RouteCoachSeatsItem[],
): TrainOption {
  const carriages = seatsResponse.map((item, index) => mapCoachItem(item, index + 1))

  return {
    id: segment._id,
    trainNumber: segment.train.name,
    departureCityPassenger: formatTitleCaseWords(segment.from.city.name),
    arrivalCityPassenger: formatTitleCaseWords(segment.to.city.name),
    fromStation: `${segment.from.railway_station_name} вокзал`,
    toStation: `${segment.to.railway_station_name} вокзал`,
    departureTime: formatRouteTime(segment.from.datetime),
    arrivalTime: formatRouteTime(segment.to.datetime),
    duration: formatDurationLabel(segment.duration),
    carriages,
  }
}
