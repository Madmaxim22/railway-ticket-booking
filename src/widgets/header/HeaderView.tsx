import type { HeaderViewProps } from './hooks/useHeader'
import { HeaderNav } from './components/HeaderNav'
import { HeaderSearchForm } from './components/HeaderSearchForm'

export function HeaderView({
  isHome,
  isBookingSuccess,
  containerClassName,
  searchClassName,
  ...searchFormProps
}: HeaderViewProps) {
  return (
    <header className="header">
      <div className={containerClassName}>
        <HeaderNav />
        {!isBookingSuccess && (
          <div className={searchClassName}>
            {!isHome && (
              <div className="header__search-content">
                <h1 className="header__search-title">Вся жизнь -</h1>
                <p className="header__search-description">путешествие!</p>
              </div>
            )}
            <HeaderSearchForm {...searchFormProps} />
          </div>
        )}
      </div>
    </header>
  )
}
