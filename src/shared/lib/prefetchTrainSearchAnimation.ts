import trainSearchGif from '@/assets/loading/train-search.gif'

let prefetchPromise: Promise<void> | null = null

/** Декодирует GIF в кэш браузера до показа экрана поиска. */
export function prefetchTrainSearchAnimation(): Promise<void> {
  if (prefetchPromise) return prefetchPromise

  prefetchPromise = new Promise<void>((resolve) => {
    const img = new Image()
    img.onload = () => resolve()
    img.onerror = () => resolve()
    img.src = trainSearchGif
  }).catch(() => {
    prefetchPromise = null
  })

  return prefetchPromise
}

export { trainSearchGif }
