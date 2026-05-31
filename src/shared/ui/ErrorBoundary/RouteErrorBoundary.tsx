import type { ReactNode } from 'react'
import { useLocation } from 'react-router-dom'

import { ErrorBoundary } from './ErrorBoundary'
import { ErrorFallback } from './ErrorFallback'

type RouteErrorBoundaryProps = {
  children: ReactNode
}

export function RouteErrorBoundary({ children }: RouteErrorBoundaryProps) {
  const { pathname } = useLocation()

  return (
    <ErrorBoundary
      resetKeys={[pathname]}
      fallback={(error, reset) => (
        <ErrorFallback error={error} onReset={reset} variant="section" />
      )}
    >
      {children}
    </ErrorBoundary>
  )
}
