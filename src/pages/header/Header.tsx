import { useHeader } from './hooks/useHeader'
import { HeaderView } from './HeaderView'
import './Header.css'

export default function Header() {
  return <HeaderView {...useHeader()} />
}
