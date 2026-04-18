import './HomePage.css'
import icon1 from '../assets/icons/icon1.png'
import icon2 from '../assets/icons/icon2.png'
import icon3 from '../assets/icons/icon3.png'
import review1 from '../assets/reviews/review1.png'
import review2 from '../assets/reviews/review2.png'

export default function HomePage() {
  return (
    <div className="home-page">
      <div className="home-page__container">
        <div className="home-page__about-us-content">
          <h1 className="home-page__title">О нас</h1>
          <div className="home-page__description-container">
            <p className="home-page__description">
              Мы рады видеть вас! Мы рботаем для Вас с 2003 года. 14 лет мы наблюдаем, 
              как с каждым днем все больше людей заказывают жд билеты через интернет.
            </p>
            <p className="home-page__description">
              Сегодня можно заказать железнодорожные билеты онлайн всего в 2 клика, но стоит ли это делать? 
              Мы расскажем о преимуществах заказа через интернет.
            </p>
            <p className="home-page__description home-page__description--bold">
              Покупать жд билеты дешево можно за 90 суток до отправления поезда. 
              Благодаря динамическому ценообразованию цена на билеты в это время самая низкая.
            </p>
          </div>
        </div>
        <div className="home-page__how-it-works-content">
          <div className="home-page__how-it-works-title-container">
            <h1 className="home-page__how-it-works-title">Как это работает</h1>
            <button className="home-page__how-it-works-button">Узнать больше</button>
          </div>  
          <div className="home-page__how-it-works-container">
            <div className="home-page__how-it-works-item">
              <img src={icon1} alt="home-page-1" className="home-page__how-it-works-item-image" />
              <h2 className="home-page__how-it-works-item-title">Удобный заказ на сайте</h2>
            </div>
            <div className="home-page__how-it-works-item">
              <img src={icon2} alt="home-page-2" className="home-page__how-it-works-item-image" />
              <h2 className="home-page__how-it-works-item-title">Нет необходимости ехать в офис</h2>
            </div>
            <div className="home-page__how-it-works-item">
              <img src={icon3} alt="home-page-3" className="home-page__how-it-works-item-image" />
              <h2 className="home-page__how-it-works-item-title">Огромный выбор направлений</h2>
            </div>
          </div>
        </div>
        <div className="home-page__reviews-content">
          <h1 className="home-page__reviews-title">Отзывы</h1>
          <div className="home-page__reviews-container">
            <div className="home-page__reviews-item">
              <img src={review1} alt="home-page-review-1" className="home-page__reviews-item-image" />
              <div className="home-page__reviews-item-content">
                <h2 className="home-page__reviews-item-title">Екатерина Вальнова</h2>
                <p className="home-page__reviews-item-description">
                  Доброжелательные подсказки на всех этапах помогут правильно заполнить поля и 
                  без затруднений купить авиа или ж/д билет, даже если вы заказываете онлайн билет впервые.
                </p>
              </div>
            </div>
            <div className="home-page__reviews-item">
              <img src={review2} alt="home-page-review-2" className="home-page__reviews-item-image" />
              <div className="home-page__reviews-item-content">
                <h2 className="home-page__reviews-item-title">Иван Петров</h2>
                <p className="home-page__reviews-item-description">
                  СМС-сопровождение до посадки. Сразу после оплаты ж/д билетов 
                  и за 3 часа до отправления мы пришлем вам СМС-напоминание о поездке.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}