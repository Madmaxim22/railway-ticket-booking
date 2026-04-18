import { Link } from 'react-router-dom'
import './Header.css'

export default function Header() {
  return (
    <header className="header">
      <div className="header__container">
        <div className="header__content">
          <Link to="/" className="header__logo">Лого</Link>
        </div>
        <div className="header__menu">
          <ul className="header__menu-list">
            <li className="header__menu-item">
              <Link to="/" className="header__menu-link">О нас</Link>
            </li>
            <li className="header__menu-item">
              <Link to="/" className="header__menu-link">Как это работает</Link>
            </li>
            <li className="header__menu-item">
              <Link to="/" className="header__menu-link">Отзывы</Link>
            </li>
            <li className="header__menu-item">
              <Link to="/" className="header__menu-link">Контакты</Link>
            </li>
          </ul>
        </div>
        <div className="header__search">
          <div className="header__search-content">
            <h1 className="header__search-title">Вся жизнь -</h1>
            <p className="header__search-description">путешествие!</p>
          </div>
          <div className="header__search-form">
            <form className="header__search-form-content">
              
              <p className="header__search-form-title">Направление:</p>
              <div className="header__search-form-content-item">
                <div className="header__search-form-field">
                  <input type="text" placeholder="Откуда" className="header__search-form-input" />
                  <svg width="21" height="30" viewBox="0 0 21 30" fill="none" xmlns="http://www.w3.org/2000/svg" className="header__search-form-icon" aria-hidden>
                    <path d="M10.4669 30C7.57111 26.692 5.0677 23.2905 2.99398 19.59C1.76095 17.4034 0.696068 15.1606 0.229013 12.6936C-0.574321 8.41378 0.733433 4.82543 4.18964 2.20891C7.66452 -0.407596 11.5131 -0.706626 15.3429 1.3492C19.2101 3.40503 21.0597 6.8065 20.8541 11.1798C20.7981 12.5254 20.4245 13.8898 19.9387 15.1606C17.865 20.7301 14.3341 25.365 10.4669 30ZM10.4295 6.8065C8.37445 6.8065 6.69305 8.48854 6.71173 10.5444C6.71173 12.6002 8.39313 14.2822 10.4482 14.2822C12.5032 14.2822 14.1846 12.6002 14.1846 10.5444C14.1659 8.48854 12.5032 6.8065 10.4295 6.8065Z" fill="white"/>
                  </svg>
                </div>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="header__search-form-swap-icon" aria-hidden>
                    <rect width="24" height="24" fill="url(#headerSearchSwapPattern)" fillOpacity={0.6} />
                    <defs>
                      <pattern id="headerSearchSwapPattern" patternContentUnits="objectBoundingBox" width="1" height="1">
                        <use href="#headerSearchSwapImg" transform="scale(0.00520833)" />
                      </pattern>
                      <image
                        id="headerSearchSwapImg"
                        width="192"
                        height="192"
                        preserveAspectRatio="none"
                        href="data:image/png;base64,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"
                      />
                    </defs>
                  </svg>
                <div className="header__search-form-field">
                  <input type="text" placeholder="Куда" className="header__search-form-input" />
                  <svg width="21" height="30" viewBox="0 0 21 30" fill="none" xmlns="http://www.w3.org/2000/svg" className="header__search-form-icon" aria-hidden>
                    <path d="M10.4669 30C7.57111 26.692 5.0677 23.2905 2.99398 19.59C1.76095 17.4034 0.696068 15.1606 0.229013 12.6936C-0.574321 8.41378 0.733433 4.82543 4.18964 2.20891C7.66452 -0.407596 11.5131 -0.706626 15.3429 1.3492C19.2101 3.40503 21.0597 6.8065 20.8541 11.1798C20.7981 12.5254 20.4245 13.8898 19.9387 15.1606C17.865 20.7301 14.3341 25.365 10.4669 30ZM10.4295 6.8065C8.37445 6.8065 6.69305 8.48854 6.71173 10.5444C6.71173 12.6002 8.39313 14.2822 10.4482 14.2822C12.5032 14.2822 14.1846 12.6002 14.1846 10.5444C14.1659 8.48854 12.5032 6.8065 10.4295 6.8065Z" fill="white"/>
                  </svg>
                </div>
              </div>
              
              <p className="header__search-form-title header__search-form-title--date">Дата:</p>
              <div className="header__search-form-content-item">
                <div className="header__search-form-field">
                  <input type="text" placeholder="Дата отправления" className="header__search-form-input" />
                  <svg width="30" height="34" viewBox="0 0 30 34" fill="none" xmlns="http://www.w3.org/2000/svg" className="header__search-form-icon" aria-hidden>
                    <path d="M21.6913 3.23175C21.6913 2.11952 21.6913 1.09124 21.6913 0C22.7956 0 23.8166 0 24.9627 0C24.9627 1.07026 24.9627 2.11952 24.9627 3.31569C25.6086 3.31569 26.1712 3.29471 26.713 3.31569C28.5466 3.37865 29.9844 4.7427 29.9844 6.58941C30.0052 14.5009 30.0052 22.3914 29.9844 30.3029C29.9844 32.0867 28.5466 33.5137 26.7755 33.5137C18.92 33.5347 11.0853 33.5347 3.22973 33.5137C1.39608 33.5137 0.020837 32.0657 0 30.198C0 22.3704 0 14.5219 0.020837 6.69434C0.020837 4.72171 1.43775 3.35766 3.39642 3.31569C3.87567 3.29471 4.35492 3.31569 4.95919 3.31569C4.95919 2.20347 4.95919 1.1542 4.95919 0.0209854C6.12606 0.0209854 7.16791 0.0209854 8.31394 0.0209854C8.31394 1.09124 8.31394 2.11952 8.31394 3.23175C12.7731 3.23175 17.1488 3.23175 21.6913 3.23175ZM3.41726 11.7308C3.41726 17.8586 3.41726 23.9653 3.41726 30.0931C11.1686 30.0931 18.8783 30.0931 26.588 30.0931C26.588 23.9233 26.588 17.8376 26.588 11.7308C18.8366 11.7308 11.1686 11.7308 3.41726 11.7308Z" fill="#E5E5E5"/>
                    <path d="M15.0443 26.7144C15.0443 23.9653 15.0443 21.2582 15.0443 18.4671C17.7947 18.4671 20.5035 18.4671 23.2748 18.4671C23.2748 21.1952 23.2748 23.9234 23.2748 26.7144C20.5869 26.7144 17.8781 26.7144 15.0443 26.7144Z" fill="#E5E5E5"/>
                  </svg>
                </div>
                <div className="header__search-form-field">
                  <input type="text" placeholder="Дата прибытия" className="header__search-form-input" />
                  <svg width="30" height="34" viewBox="0 0 30 34" fill="none" xmlns="http://www.w3.org/2000/svg" className="header__search-form-icon" aria-hidden>
                    <path d="M21.6913 3.23175C21.6913 2.11952 21.6913 1.09124 21.6913 0C22.7956 0 23.8166 0 24.9627 0C24.9627 1.07026 24.9627 2.11952 24.9627 3.31569C25.6086 3.31569 26.1712 3.29471 26.713 3.31569C28.5466 3.37865 29.9844 4.7427 29.9844 6.58941C30.0052 14.5009 30.0052 22.3914 29.9844 30.3029C29.9844 32.0867 28.5466 33.5137 26.7755 33.5137C18.92 33.5347 11.0853 33.5347 3.22973 33.5137C1.39608 33.5137 0.020837 32.0657 0 30.198C0 22.3704 0 14.5219 0.020837 6.69434C0.020837 4.72171 1.43775 3.35766 3.39642 3.31569C3.87567 3.29471 4.35492 3.31569 4.95919 3.31569C4.95919 2.20347 4.95919 1.1542 4.95919 0.0209854C6.12606 0.0209854 7.16791 0.0209854 8.31394 0.0209854C8.31394 1.09124 8.31394 2.11952 8.31394 3.23175C12.7731 3.23175 17.1488 3.23175 21.6913 3.23175ZM3.41726 11.7308C3.41726 17.8586 3.41726 23.9653 3.41726 30.0931C11.1686 30.0931 18.8783 30.0931 26.588 30.0931C26.588 23.9233 26.588 17.8376 26.588 11.7308C18.8366 11.7308 11.1686 11.7308 3.41726 11.7308Z" fill="#E5E5E5"/>
                    <path d="M15.0443 26.7144C15.0443 23.9653 15.0443 21.2582 15.0443 18.4671C17.7947 18.4671 20.5035 18.4671 23.2748 18.4671C23.2748 21.1952 23.2748 23.9234 23.2748 26.7144C20.5869 26.7144 17.8781 26.7144 15.0443 26.7144Z" fill="#E5E5E5"/>
                  </svg>
                </div>
              </div>
              <button type="submit" className="header__search-form-button">найти билеты</button>
            </form>
          </div>
        </div>
        <div className="header__line" />
      </div>
    </header>
  )
}