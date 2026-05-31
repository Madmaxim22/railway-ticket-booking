import './RouteFallback.css'

export function RouteFallback() {
  return (
    <div className="route-fallback" aria-busy="true" aria-live="polite">
      Загрузка…
    </div>
  )
}
