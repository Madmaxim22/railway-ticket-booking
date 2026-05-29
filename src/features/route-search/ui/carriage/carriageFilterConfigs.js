import CoupeIcon from '@/shared/ui/icons/filters/CoupeIcon'
import PlatkartIcon from '@/shared/ui/icons/filters/PlatkartIcon'
import SittingIcon from '@/shared/ui/icons/filters/SittingIcon'
import LuxIcon from '@/shared/ui/icons/filters/LuxIcon'
import WifiIcon from '@/shared/ui/icons/filters/WifiIcon'
import ExpressIcon from '@/shared/ui/icons/filters/ExpressIcon'

export const carriageFilterConfigs = [
  { id: 'isCoupeEnabled', label: 'Купе', icon: CoupeIcon, apiKey: 'have_second_class' },
  { id: 'isPlatkartEnabled', label: 'Плацкарт', icon: PlatkartIcon, apiKey: 'have_third_class' },
  { id: 'isSittingEnabled', label: 'Сидячий', icon: SittingIcon, apiKey: 'have_fourth_class' },
  { id: 'isLuxEnabled', label: 'Люкс', icon: LuxIcon, apiKey: 'have_first_class' },
  { id: 'isWiFiEnabled', label: 'Wi-Fi', icon: WifiIcon, apiKey: 'have_wifi' },
  { id: 'isExpressEnabled', label: 'Экспресс', icon: ExpressIcon, apiKey: 'have_express' },
]
