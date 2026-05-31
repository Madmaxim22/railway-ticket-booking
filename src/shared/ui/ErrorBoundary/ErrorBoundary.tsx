import { Component, type ErrorInfo, type ReactNode } from 'react'

import { ErrorFallback } from './ErrorFallback'

export type ErrorBoundaryFallbackRender = (error: Error, reset: () => void) => ReactNode

export type ErrorBoundaryProps = {
  children: ReactNode
  fallback?: ReactNode | ErrorBoundaryFallbackRender
  fallbackVariant?: 'page' | 'section'
  onError?: (error: Error, info: ErrorInfo) => void
  resetKeys?: readonly unknown[]
}

type ErrorBoundaryState = {
  error: Error | null
}

function haveResetKeysChanged(
  prevKeys: readonly unknown[] | undefined,
  nextKeys: readonly unknown[] | undefined,
): boolean {
  if (prevKeys === nextKeys) {
    return false
  }
  if (!prevKeys || !nextKeys || prevKeys.length !== nextKeys.length) {
    return true
  }
  return prevKeys.some((key, index) => !Object.is(key, nextKeys[index]))
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { error: null }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error }
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    this.props.onError?.(error, info)
    if (import.meta.env.DEV) {
      console.error('[ErrorBoundary]', error, info.componentStack)
    }
  }

  componentDidUpdate(prevProps: ErrorBoundaryProps): void {
    const { error } = this.state
    if (error !== null && haveResetKeysChanged(prevProps.resetKeys, this.props.resetKeys)) {
      this.reset()
    }
  }

  reset = (): void => {
    this.setState({ error: null })
  }

  render(): ReactNode {
    const { error } = this.state
    if (error === null) {
      return this.props.children
    }

    const { fallback, fallbackVariant = 'section' } = this.props

    if (typeof fallback === 'function') {
      return fallback(error, this.reset)
    }

    if (fallback !== undefined) {
      return fallback
    }

    return <ErrorFallback error={error} onReset={this.reset} variant={fallbackVariant} />
  }
}
