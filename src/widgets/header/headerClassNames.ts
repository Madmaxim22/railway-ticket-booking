export function getHeaderContainerClassName(isHome: boolean, isBookingSuccess: boolean): string {
  const base = 'header__container'
  if (isHome) return `${base} header__container--booking-steps`
  if (isBookingSuccess) return `${base} header__container--booking-success`
  return base
}

export function getHeaderSearchClassName(isHome: boolean): string {
  const base = 'header__search'
  return isHome ? `${base} header__search--booking-steps` : base
}

export function getHeaderSearchFormPanelClassName(isHome: boolean): string {
  const base = 'header__search-form-panel'
  return isHome ? `${base} header__search-form-panel--booking-steps` : base
}
