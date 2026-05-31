import { useEffect, useRef } from 'react'
import trainSearchGif from '@/assets/loading/train-search.gif'
import { prefetchTrainSearchAnimation } from '@/shared/lib/prefetchTrainSearchAnimation'
import './SearchLoadingScreen.css'

type Props = {
  message?: string
  className?: string
  onAnimationReady?: () => void
}

export function SearchLoadingScreen({
  message = 'идёт поиск',
  className,
  onAnimationReady,
}: Props) {
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    void prefetchTrainSearchAnimation()
  }, [])

  useEffect(() => {
    if (imgRef.current?.complete) {
      onAnimationReady?.()
    }
  }, [onAnimationReady])

  return (
    <section
      className={['search-loading-screen', className].filter(Boolean).join(' ')}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="search-loading-screen__content">
        <p className="search-loading-screen__text">{message}</p>
        <div className="search-loading-screen__animation-slot">
          <img
            ref={imgRef}
            className="search-loading-screen__animation"
            src={trainSearchGif}
            alt=""
            aria-hidden
            loading="eager"
            decoding="sync"
            onLoad={() => onAnimationReady?.()}
          />
        </div>
      </div>
    </section>
  )
}
