import { useCallback, useState } from 'react'

import {
  createPassenger,
  type Passenger,
  type PassengerFooterState,
  type PassengerValidationErrors,
} from './passengers.types'
import { usePassengerCardsState } from './usePassengerCardsState'
import { usePassengerValidation } from './usePassengerValidation'

export function usePassengersForm() {
  const [passengers, setPassengers] = useState<Passenger[]>(() => [createPassenger(1)])
  const [errorsByPassengerId, setErrorsByPassengerId] = useState<Record<number, PassengerValidationErrors>>({})
  const [footerStateByPassengerId, setFooterStateByPassengerId] = useState<Record<number, PassengerFooterState>>({})
  const { validatePassenger } = usePassengerValidation()
  const {
    activePassengerId,
    isPassengerOpen,
    setActivePassengerId,
    openPassenger,
    closePassenger,
    togglePassenger,
    onPassengerAdded,
    onPassengerRemoved,
  } = usePassengerCardsState()

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
    setPassengers(prev => {
      const nextPassengers = prev.map(p => (p.id === id ? { ...p, [key]: value } : p))
      const nextPassenger = nextPassengers.find(p => p.id === id)
      if (!nextPassenger) return nextPassengers

      const result = validatePassenger(nextPassenger)
      setErrorsByPassengerId(next => ({ ...next, [id]: result.errors }))
      setFooterStateByPassengerId(next => ({ ...next, [id]: result.isValid ? 'success' : 'default' }))

      return nextPassengers
    })
  }, [validatePassenger])

  const addPassenger = useCallback(() => {
    setPassengers(prev => {
      const nextId = (prev.at(-1)?.id ?? 0) + 1
      onPassengerAdded(nextId)
      return [...prev, createPassenger(nextId)]
    })
  }, [onPassengerAdded])

  const removePassenger = useCallback((id: number) => {
    setPassengers(prev => {
      if (prev.length <= 1) return prev
      onPassengerRemoved(id)
      return prev.filter(p => p.id !== id)
    })
    setErrorsByPassengerId(prev => {
      const next = { ...prev }
      delete next[id]
      return next
    })
    setFooterStateByPassengerId(prev => {
      const next = { ...prev }
      delete next[id]
      return next
    })
  }, [onPassengerRemoved])

  const goToNextPassenger = useCallback(
    (id: number) => {
      if (!validatePassengerById(id)) return

      setFooterStateByPassengerId(prev => ({ ...prev, [id]: 'success' }))
      closePassenger(id)

      const currentIndex = passengers.findIndex(p => p.id === id)
      const nextPassenger = passengers[currentIndex + 1]

      if (nextPassenger) {
        openPassenger(nextPassenger.id)
        return
      }

      setPassengers(prev => {
        const nextId = (prev.at(-1)?.id ?? 0) + 1
        onPassengerAdded(nextId)
        return [...prev, createPassenger(nextId)]
      })
    },
    [closePassenger, onPassengerAdded, openPassenger, passengers, validatePassengerById],
  )

  const getFooterState = useCallback(
    (id: number): PassengerFooterState => footerStateByPassengerId[id] ?? 'default',
    [footerStateByPassengerId],
  )

  return {
    passengers,
    activePassengerId,
    isPassengerOpen,
    setActivePassengerId,
    openPassenger,
    closePassenger,
    toggleOpen: togglePassenger,
    updatePassenger,
    addPassenger,
    removePassenger,
    validatePassengerById,
    goToNextPassenger,
    getFooterState,
    errorsByPassengerId,
  }
}
