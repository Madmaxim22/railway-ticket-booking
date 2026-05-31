import type { ComponentType } from 'react'

import type { FiltersState } from '@/store/slices/filtersSlice'
import CoupeIcon from '@/shared/ui/icons/filters/CoupeIcon'
import ExpressIcon from '@/shared/ui/icons/filters/ExpressIcon'
import LuxIcon from '@/shared/ui/icons/filters/LuxIcon'
import PlatkartIcon from '@/shared/ui/icons/filters/PlatkartIcon'
import SittingIcon from '@/shared/ui/icons/filters/SittingIcon'
import WifiIcon from '@/shared/ui/icons/filters/WifiIcon'

type CarriageFilterIcon = ComponentType<{ className?: string }>

type CarriageFilterConfig = {
  id: string
  label: string
  icon: CarriageFilterIcon
  apiKey: keyof FiltersState & string
}

export const carriageFilterConfigs: CarriageFilterConfig[] = [
  { id: 'isCoupeEnabled', label: 'Купе', icon: CoupeIcon, apiKey: 'have_second_class' },
  { id: 'isPlatkartEnabled', label: 'Плацкарт', icon: PlatkartIcon, apiKey: 'have_third_class' },
  { id: 'isSittingEnabled', label: 'Сидячий', icon: SittingIcon, apiKey: 'have_fourth_class' },
  { id: 'isLuxEnabled', label: 'Люкс', icon: LuxIcon, apiKey: 'have_first_class' },
  { id: 'isWiFiEnabled', label: 'Wi-Fi', icon: WifiIcon, apiKey: 'have_wifi' },
  { id: 'isExpressEnabled', label: 'Экспресс', icon: ExpressIcon, apiKey: 'have_express' },
]
