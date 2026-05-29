import { useCallback, useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { readFromConfirmationFlag } from '@/features/booking-flow/lib/bookingEditNavigation'

import { useAppDispatch, useAppSelector } from '@/store/hooks'
import {
  selectBookingPassengers,
  selectBookingTicketCounts,
  setPassengers,
} from '@/store/slices/bookingSlice'

import { buildPassengersFromTicketCounts, syncPassengersWithTicketCounts } from './lib/syncPassengersWithTicketCounts'
import {
  type Passenger,
  type PassengerFooterState,
  type PassengerValidationErrors,
} from './passengers.types'
import { usePassengerCardsState } from './usePassengerCardsState'
import { usePassengerValidation } from './usePassengerValidation'

export function usePassengersForm() {
  const navigate = useNavigate()
  const location = useLocation()
  const fromConfirmation = readFromConfirmationFlag(location.state)
  const dispatch = useAppDispatch()
  const ticketCounts = useAppSelector(selectBookingTicketCounts)
  const savedPassengers = useAppSelector(selectBookingPassengers)
  const [passengers, setPassengersState] = useState<Passenger[]>(() =>
    savedPassengers.length > 0
      ? savedPassengers
      : buildPassengersFromTicketCounts(ticketCounts),
  )
  const [errorsByPassengerId, setErrorsByPassengerId] = useState<Record<number, PassengerValidationErrors>>({})
  const [footerStateByPassengerId, setFooterStateByPassengerId] = useState<Record<number, PassengerFooterState>>({})
  const { validatePassenger } = usePassengerValidation()
  const {
    isPassengerOpen,
    openPassenger,
    closePassenger,
    togglePassenger,
    onPassengerRemoved,
  } = usePassengerCardsState()
  const didAutoOpenFirstPassengerRef = useRef(false)

  useEffect(() => {
    setPassengersState(prev => {
      const next = syncPassengersWithTicketCounts(prev, ticketCounts)
      if (next.length === prev.length && next.every((p, i) => p === prev[i])) {
        return prev
      }

      const allowedIds = new Set(next.map(p => p.id))
      setErrorsByPassengerId(errors =>
        Object.fromEntries(Object.entries(errors).filter(([id]) => allowedIds.has(Number(id)))),
      )
      setFooterStateByPassengerId(states =>
        Object.fromEntries(Object.entries(states).filter(([id]) => allowedIds.has(Number(id)))),
      )

      const removedIds = prev.filter(p => !allowedIds.has(p.id)).map(p => p.id)
      removedIds.forEach(id => onPassengerRemoved(id))

      return next
    })
  }, [ticketCounts.adults, ticketCounts.children, ticketCounts.childrenWithoutSeat, onPassengerRemoved])

  useEffect(() => {
    if (didAutoOpenFirstPassengerRef.current || passengers.length === 0) return
    didAutoOpenFirstPassengerRef.current = true
    openPassenger(passengers[0].id)
  }, [openPassenger, passengers])

  const validatePassengerById = useCallback(
    (passengerId: number, source = passengers) => {
      const passenger = source.find(item => item.id === passengerId)
      if (!passenger) return false

      const result = validatePassenger(passenger)
      setErrorsByPassengerId(prev => ({ ...prev, [passengerId]: result.errors }))
      setFooterStateByPassengerId(prev => ({
        ...prev,
        [passengerId]: result.isValid ? 'success' : 'error',
      }))

      return result.isValid
    },
    [passengers, validatePassenger],
  )

  const updatePassenger = useCallback(<K extends keyof Passenger>(id: number, key: K, value: Passenger[K]) => {
    setPassengersState(prev => {
      const nextPassengers = prev.map(p => (p.id === id ? { ...p, [key]: value } : p))
      const nextPassenger = nextPassengers.find(p => p.id === id)
      if (!nextPassenger) return nextPassengers

      const result = validatePassenger(nextPassenger)
      setErrorsByPassengerId(next => ({ ...next, [id]: result.errors }))
      setFooterStateByPassengerId(next => ({ ...next, [id]: result.isValid ? 'success' : 'default' }))

      return nextPassengers
    })
  }, [validatePassenger])

  const goToNextPassenger = useCallback(
    (id: number) => {
      if (!validatePassengerById(id)) return

      setFooterStateByPassengerId(prev => ({ ...prev, [id]: 'success' }))
      closePassenger(id)

      const currentIndex = passengers.findIndex(p => p.id === id)
      const nextPassenger = passengers[currentIndex + 1]

      if (nextPassenger) {
        openPassenger(nextPassenger.id)
      }
    },
    [closePassenger, openPassenger, passengers, validatePassengerById],
  )

  const getFooterState = useCallback(
    (id: number): PassengerFooterState => footerStateByPassengerId[id] ?? 'default',
    [footerStateByPassengerId],
  )

  const submitPassengers = useCallback(() => {
    let firstInvalidId: number | null = null
    const nextErrors: Record<number, PassengerValidationErrors> = {}
    const nextFooterStates: Record<number, PassengerFooterState> = {}

    for (const passenger of passengers) {
      const result = validatePassenger(passenger)
      nextErrors[passenger.id] = result.errors
      nextFooterStates[passenger.id] = result.isValid ? 'success' : 'error'

      if (!result.isValid && firstInvalidId === null) {
        firstInvalidId = passenger.id
      }
    }

    setErrorsByPassengerId(prev => ({ ...prev, ...nextErrors }))
    setFooterStateByPassengerId(prev => ({ ...prev, ...nextFooterStates }))

    if (firstInvalidId !== null) {
      openPassenger(firstInvalidId)
      return
    }

    dispatch(setPassengers(passengers))
    navigate(fromConfirmation ? '/booking/confirmation' : '/booking/payment')
  }, [dispatch, fromConfirmation, navigate, openPassenger, passengers, validatePassenger])

  return {
    passengers,
    isPassengerOpen,
    openPassenger,
    closePassenger,
    toggleOpen: togglePassenger,
    updatePassenger,
    validatePassengerById,
    goToNextPassenger,
    submitPassengers,
    getFooterState,
    errorsByPassengerId,
  }
}
