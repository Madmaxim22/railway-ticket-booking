import { useRef } from 'react'
import { useLocation } from 'react-router-dom'
import {
  getHeaderContainerClassName,
  getHeaderSearchClassName,
  getHeaderSearchFormPanelClassName,
} from '../headerClassNames'
import { useHeaderCitySearchFields } from './useHeaderCitySearchFields'
import { useHeaderSearchSubmit } from './useHeaderSearchSubmit'

export function useHeader() {
  const clearFormErrorRef = useRef<(() => void) | null>(null)
  const citySearch = useHeaderCitySearchFields(clearFormErrorRef)
  const searchSubmit = useHeaderSearchSubmit(citySearch, clearFormErrorRef)
  const { pathname } = useLocation()
  const isBookingSuccess = pathname === '/booking/success'
  const isHome = pathname !== '/'

  return {
    isHome,
    isBookingSuccess,
    containerClassName: getHeaderContainerClassName(isHome, isBookingSuccess),
    searchClassName: getHeaderSearchClassName(isHome),
    searchFormPanelClassName: getHeaderSearchFormPanelClassName(isHome),
    ...citySearch,
    ...searchSubmit,
  }
}

export type HeaderViewProps = ReturnType<typeof useHeader>
