import type { CarriageType } from '../types'

/** Количество мест на SVG-схеме по типу вагона */
export const SEAT_SCHEMA_CAPACITY: Record<CarriageType, number> = {
  lux: 16,
  coupe: 32,
  platkart: 48,
  seated: 60,
}
