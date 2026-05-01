export const bookingBreadcrumbSteps = [
  {
    id: 'tickets',
    to: '/booking/trains',
    label: 'Билеты',
    badge: 1,
    isActive: true,
  },
  {
    id: 'passengers',
    to: '/booking/passengers',
    label: 'Пассажиры',
    badge: 2,
    isActive: true,
  },
  {
    id: 'payment',
    to: '/booking/payment',
    label: 'Оплата',
    badge: 3,
    isActive: false,
  },
  {
    id: 'review',
    to: '/booking/confirmation',
    label: 'Проверка',
    badge: 4,
    isActive: false,
  },
]
