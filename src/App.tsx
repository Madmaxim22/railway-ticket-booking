import Header from './pages/header/Header'
import HomePage from './pages/HomePage'
import Footer from './pages/Footer'
import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
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
          <Route index element={<Navigate to="trains" replace />} />
          <Route path="trains" element={<TrainSelectionPage />} />
          <Route path="seats" element={<SeatSelectionPage />} />
          <Route path="passengers" element={<PassengersPage />} />
          <Route path="payment" element={<PaymentPage />} />
          <Route path="confirmation" element={<OrderReviewPage />} />
        </Route>
        <Route path="/booking/success" element={<BookingSuccessPage />} />
      </Routes>
      <Footer />
    </div>
    </>
  )
}

export default App
