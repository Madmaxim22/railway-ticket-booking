import Header from './pages/Header'
import HomePage from './pages/HomePage'
import Footer from './pages/Footer'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import BookingLayout from './pages/booking/BookingLayout'
import TrainSelectionPage from './pages/booking/steps/TrainSelection/TrainSelectionPage'
import SeatSelectionPage from './pages/booking/steps/SeatSelection/SeatSelectionPage'
import PassengersPage from './pages/booking/steps/Passengers/PassengersPage'
import PaymentPage from './pages/booking/steps/Payment/PaymentPage'
import OrderReviewPage from './pages/booking/steps/Review/OrderReviewPage'
import BookingSuccessPage from './pages/booking/steps/Success/BookingSuccessPage'

function App() {
  return (
    <>
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/booking" element={<BookingLayout />}>
          <Route path="/booking/trains" element={<TrainSelectionPage />} />
          <Route path="/booking/seats" element={<SeatSelectionPage />} />
          <Route path="/booking/passengers" element={<PassengersPage />} />
          <Route path="/booking/payment" element={<PaymentPage />} />
          <Route path="/booking/confirmation" element={<OrderReviewPage />} />
          <Route path="/booking/success" element={<BookingSuccessPage />} />
        </Route>
      </Routes>
      <Footer />
    </div>
    </>
  )
}

export default App
