export type CarriageType = 'seated' | 'platkart' | 'coupe' | 'lux'

export type Carriage = {
  id: string
  number: number
  type: CarriageType
  classLabel: string
  haveWifi: boolean
  haveAirConditioning: boolean
  topPrice: number
  bottomPrice: number
  sidePrice?: number
  luxPrice?: number
  seats: number[]
  unavailableSeats: number[]
}

export type TrainOption = {
  id: string
  trainNumber: string
  departureCityPassenger: string
  arrivalCityPassenger: string
  fromStation: string
  toStation: string
  departureTime: string
  arrivalTime: string
  duration: string
  carriages: Carriage[]
}
