import type { ReactNode } from 'react'

import { ErrorBoundary } from './ErrorBoundary'
import { ErrorFallback } from './ErrorFallback'

type RootErrorBoundaryProps = {
  children: ReactNode
}

export function RootErrorBoundary({ children }: RootErrorBoundaryProps) {
  return (
    <ErrorBoundary
      fallbackVariant="page"
      fallback={(error, reset) => (
        <ErrorFallback error={error} onReset={reset} variant="page" />
      )}
    >
      {children}
    </ErrorBoundary>
  )
}
