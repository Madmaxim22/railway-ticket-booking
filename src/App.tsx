import Header from '@/widgets/header/Header'
import HomePage from '@/pages/home/HomePage'
import Footer from '@/widgets/footer/Footer'
import './App.css'
import { useBookingSearchUrlSync } from '@/features/route-search/model/useBookingSearchUrlSync'
import { Routes, Route, Navigate } from 'react-router-dom'
import BookingLayout from '@/features/booking-flow/ui/BookingLayout'
import BookingSuccessPage from '@/features/booking-success/BookingSuccessPage'
import OrderReviewPage from '@/features/order-review/OrderReviewPage'
import PassengersPage from '@/features/passenger-form/PassengersPage'
import PaymentPage from '@/features/payment/PaymentPage'
import { SeatSelectionPageContainer as SeatSelectionPage } from '@/features/seat-selection/SeatSelectionPageContainer'
import TrainSelectionPage from '@/features/train-selection/TrainSelectionPage'

function App() {
  useBookingSearchUrlSync()

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
