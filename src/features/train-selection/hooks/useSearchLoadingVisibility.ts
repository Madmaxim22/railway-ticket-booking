import { useCallback, useEffect, useRef, useState } from 'react'

const MIN_VISIBLE_MS = 1500
const MAX_VISIBLE_MS = 8000

export function useSearchLoadingVisibility(
  isFetching: boolean,
  hasResults: boolean,
  isError: boolean,
) {
  const [visible, setVisible] = useState(false)
  const [gifReady, setGifReady] = useState(false)
  const startedAtRef = useRef<number | null>(null)

  const markAnimationReady = useCallback(() => {
    setGifReady(true)
  }, [])

  useEffect(() => {
    if (isFetching && !hasResults && !isError) {
      setVisible(true)
      setGifReady(false)
      startedAtRef.current = Date.now()
    }
  }, [isFetching, hasResults, isError])

  useEffect(() => {
    if (isError) {
      setVisible(false)
      startedAtRef.current = null
      setGifReady(false)
    }
  }, [isError])

  useEffect(() => {
    if (!visible || isFetching || isError) return

    const startedAt = startedAtRef.current ?? Date.now()
    let cancelled = false

    const hide = () => {
      if (cancelled) return
      setVisible(false)
      startedAtRef.current = null
      setGifReady(false)
    }

    const canHide = () => {
      const elapsed = Date.now() - startedAt
      if (elapsed >= MAX_VISIBLE_MS) return true
      return elapsed >= MIN_VISIBLE_MS && gifReady
    }

    if (canHide()) {
      hide()
      return
    }

    const intervalId = window.setInterval(() => {
      if (canHide()) {
        window.clearInterval(intervalId)
        hide()
      }
    }, 50)

    return () => {
      cancelled = true
      window.clearInterval(intervalId)
    }
  }, [visible, isFetching, isError, gifReady])

  return { showLoading: visible, markAnimationReady }
}
