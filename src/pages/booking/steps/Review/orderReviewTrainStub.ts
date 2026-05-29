import type { RoutesListItem } from '@/store/api/routesResponse.types'

const priceTier = {
  price: 3820,
  top_price: 4200,
  bottom_price: 3820,
  side_price: 0,
  linens_price: 0,
  wifi_price: 0,
}

const segmentBase = {
  have_first_class: true,
  have_second_class: true,
  have_third_class: true,
  have_fourth_class: true,
  have_wifi: true,
  have_air_conditioning: true,
  is_express: false,
  train: { _id: 'train-review', name: '111С' },
  min_price: 1920,
  duration: 18 * 60 * 60 * 1000,
  price_info: {
    first: priceTier,
    second: priceTier,
    third: priceTier,
    fourth: { ...priceTier, bottom_price: 1920, top_price: 2100 },
  },
  available_seats_info: {
    first: 15,
    second: 24,
    third: 52,
    fourth: 88,
  },
}

export const orderReviewTrainCardItem: RoutesListItem = {
  have_first_class: true,
  have_second_class: true,
  have_third_class: true,
  have_fourth_class: true,
  have_wifi: true,
  have_air_conditioning: true,
  is_express: false,
  min_price: 1920,
  total_avaliable_seats: 179,
  departure: {
    ...segmentBase,
    _id: 'departure-review',
    from: {
      railway_station_name: 'Московский',
      city: { _id: 'city-msk', name: 'москва' },
      datetime: Date.parse('2026-06-15T21:00:00'),
    },
    to: {
      railway_station_name: 'Ладожский',
      city: { _id: 'city-spb', name: 'санкт-петербург' },
      datetime: Date.parse('2026-06-16T09:00:00'),
    },
  },
  arrival: {
    ...segmentBase,
    _id: 'arrival-review',
    from: {
      railway_station_name: 'Ладожский',
      city: { _id: 'city-spb', name: 'санкт-петербург' },
      datetime: Date.parse('2026-06-20T20:00:00'),
    },
    to: {
      railway_station_name: 'Московский',
      city: { _id: 'city-msk', name: 'москва' },
      datetime: Date.parse('2026-06-21T08:00:00'),
    },
  },
}
