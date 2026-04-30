import type { CarriageType, TrainOption } from './types'

export const carriageTabs: Array<{ key: CarriageType; label: string }> = [
  { key: 'seated', label: 'Сидячий' },
  { key: 'platkart', label: 'Плацкарт' },
  { key: 'coupe', label: 'Купе' },
  { key: 'lux', label: 'Люкс' }
]

export const trains: TrainOption[] = [
  {
    id: 'train-1',
    trainNumber: '116С',
    departureCityTrain: 'Адлер',
    departureCityPassenger: 'Москва',
    arrivalCityTrain: 'Санкт-Петербург',
    arrivalCityPassenger: 'Санкт-Петербург',
    fromStation: 'Курский вокзал',
    toStation: 'Ладожский вокзал',
    departureTime: '00:10',
    arrivalTime: '09:52',
    duration: '9 часов 42 минуты',
    carriages: [
      {
        id: 't1-c7',
        number: 7,
        type: 'coupe',
        classLabel: 'Купе',
        topPrice: 2920,
        bottomPrice: 3530,
        seats: Array.from({ length: 32 }, (_, index) => index + 1),
        unavailableSeats: [2, 4, 9, 14]
      },
      {
        id: 't1-c12',
        number: 12,
        type: 'platkart',
        classLabel: 'Плацкарт',
        topPrice: 2820,
        bottomPrice: 3490,
        sidePrice: 2510,
        seats: Array.from({ length: 48 }, (_, index) => index + 1),
        unavailableSeats: [1, 8, 10, 17, 26]
      },
      {
        id: 't1-c2',
        number: 2,
        type: 'lux',
        classLabel: 'Люкс',
        topPrice: 0,
        bottomPrice: 0,
        luxPrice: 4920,
        seats: Array.from({ length: 16 }, (_, index) => index + 1),
        unavailableSeats: [3, 11]
      }
    ]
  },
  {
    id: 'train-2',
    trainNumber: '116С',
    departureCityTrain: 'Адлер',
    departureCityPassenger: 'Москва',
    arrivalCityTrain: 'Санкт-Петербург',
    arrivalCityPassenger: 'Санкт-Петербург',
    fromStation: 'Курский вокзал',
    toStation: 'Ладожский вокзал',
    departureTime: '00:41',
    arrivalTime: '09:13',
    duration: '8 часов 32 минуты',
    carriages: [
      {
        id: 't1-c10',
        number: 10,
        type: 'platkart',
        classLabel: 'Плацкарт',
        topPrice: 2820,
        bottomPrice: 3490,
        sidePrice: 2480,
        seats: Array.from({ length: 48 }, (_, index) => index + 1),
        unavailableSeats: [6, 12, 21, 24]
      },
      {
        id: 't2-c22',
        number: 22,
        type: 'coupe',
        classLabel: 'Купе',
        topPrice: 1920,
        bottomPrice: 3010,
        seats: Array.from({ length: 32 }, (_, index) => index + 1),
        unavailableSeats: [5, 16]
      },
      {
        id: 't2-c5',
        number: 5,
        type: 'seated',
        classLabel: 'Сидячий',
        topPrice: 0,
        bottomPrice: 1720,
        seats: Array.from({ length: 60 }, (_, index) => index + 1),
        unavailableSeats: [2, 11, 34, 49]
      }
    ]
  }
]
