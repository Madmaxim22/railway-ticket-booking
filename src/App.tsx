import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import Header from '@/widgets/header/Header'
import HomePage from '@/pages/home/HomePage'
import Footer from '@/widgets/footer/Footer'
import './App.css'
import { useBookingSearchUrlSync } from '@/features/route-search/model/useBookingSearchUrlSync'
import { RouteFallback } from '@/shared/ui/RouteFallback/RouteFallback'

const BookingLayout = lazy(() => import('@/features/booking-flow/ui/BookingLayout'))
const TrainSelectionPage = lazy(() => import('@/features/train-selection/TrainSelectionPage'))
const SeatSelectionPage = lazy(() =>
  import('@/features/seat-selection/SeatSelectionPageContainer').then(module => ({
    default: module.SeatSelectionPageContainer,
  })),
)
const PassengersPage = lazy(() => import('@/features/passenger-form/PassengersPage'))
const PaymentPage = lazy(() => import('@/features/payment/PaymentPage'))
const OrderReviewPage = lazy(() => import('@/features/order-review/OrderReviewPage'))
const BookingSuccessPage = lazy(() => import('@/features/booking-success/BookingSuccessPage'))

function App() {
  useBookingSearchUrlSync()

  return (
    <>
    <div className="app">
      <Header />
      <Suspense fallback={<RouteFallback />}>
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
      </Suspense>
      <Footer />
    </div>
    </>
  )
}

export default App
