import Header from '@/widgets/header/Header'
import HomePage from '@/pages/home/HomePage'
import Footer from '@/widgets/footer/Footer'
import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import BookingLayout from '@/features/booking-flow/ui/BookingLayout'
import TrainSelectionPage from '@/pages/booking/BookingTrainsPage'
import SeatSelectionPage from '@/pages/booking/BookingSeatsPage'
import PassengersPage from '@/pages/booking/BookingPassengersPage'
import PaymentPage from '@/pages/booking/BookingPaymentPage'
import OrderReviewPage from '@/pages/booking/BookingConfirmationPage'
import BookingSuccessPage from '@/pages/booking/BookingSuccessPage'

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
