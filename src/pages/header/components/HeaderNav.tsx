import { Link } from 'react-router-dom'

const MENU_ITEMS = [
  { label: 'О нас', to: '/' },
  { label: 'Как это работает', to: '/' },
  { label: 'Отзывы', to: '/' },
  { label: 'Контакты', to: '/' },
] as const

export function HeaderNav() {
  return (
    <>
      <div className="header__content">
        <Link to="/" className="header__logo">
          Лого
        </Link>
      </div>
      <div className="header__menu">
        <ul className="header__menu-list">
          {MENU_ITEMS.map(({ label, to }) => (
            <li key={label} className="header__menu-item">
              <Link to={to} className="header__menu-link">
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
