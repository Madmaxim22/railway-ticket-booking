import { useCallback, useState } from 'react'

export function usePassengerCardsState() {
  const [openPassengerIds, setOpenPassengerIds] = useState<Set<number>>(() => new Set())
  const [activePassengerId, setActivePassengerId] = useState<number | null>(null)

  const isPassengerOpen = useCallback((id: number) => openPassengerIds.has(id), [openPassengerIds])

  const openPassenger = useCallback((id: number) => {
    setOpenPassengerIds(prev => new Set(prev).add(id))
    setActivePassengerId(id)
  }, [])

  const closePassenger = useCallback((id: number) => {
    setOpenPassengerIds(prev => {
      if (!prev.has(id)) return prev
      const next = new Set(prev)
      next.delete(id)
      return next
    })
    setActivePassengerId(prev => (prev === id ? null : prev))
  }, [])

  const togglePassenger = useCallback((id: number) => {
    setOpenPassengerIds(prev => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
    setActivePassengerId(prev => (prev === id ? null : id))
  }, [])

  const onPassengerRemoved = useCallback((id: number) => {
    setOpenPassengerIds(prev => {
      if (!prev.has(id)) return prev
      const next = new Set(prev)
      next.delete(id)
      return next
    })
    setActivePassengerId(prev => (prev === id ? null : prev))
  }, [])

  const onPassengerAdded = useCallback((id: number) => {
    setOpenPassengerIds(prev => new Set(prev).add(id))
    setActivePassengerId(id)
  }, [])

  return {
    activePassengerId,
    isPassengerOpen,
    setActivePassengerId,
    openPassenger,
    closePassenger,
    togglePassenger,
    onPassengerAdded,
    onPassengerRemoved,
  }
}
