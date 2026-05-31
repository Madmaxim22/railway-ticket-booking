import { Link } from 'react-router-dom'

import './ErrorFallback.css'

type ErrorFallbackProps = {
  error: Error
  onReset: () => void
  variant?: 'page' | 'section'
}

export function ErrorFallback({ error, onReset, variant = 'section' }: ErrorFallbackProps) {
  const isDev = import.meta.env.DEV

  return (
    <div
      className={`error-fallback error-fallback--${variant}`}
      role="alert"
      aria-live="assertive"
    >
      <h1 className="error-fallback__title">Что-то пошло не так</h1>
      <p className="error-fallback__text">
        Произошла непредвиденная ошибка. Попробуйте обновить страницу или вернуться на главную.
      </p>
      {isDev && (
        <pre className="error-fallback__details">{error.message}</pre>
      )}
      <div className="error-fallback__actions">
        <button type="button" className="error-fallback__button" onClick={onReset}>
          Попробовать снова
        </button>
        <Link to="/" className="error-fallback__link" onClick={onReset}>
          На главную
        </Link>
      </div>
    </div>
  )
}
