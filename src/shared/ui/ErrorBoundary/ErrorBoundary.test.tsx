import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { ErrorBoundary } from './ErrorBoundary'

function ThrowWhenTriggered({ shouldThrow }: { shouldThrow: boolean }) {
  if (shouldThrow) {
    throw new Error('Тестовая ошибка')
  }
  return <p>Контент в норме</p>
}

describe('ErrorBoundary', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('показывает fallback при ошибке в дочернем дереве', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {})

    render(
      <MemoryRouter>
        <ErrorBoundary>
          <ThrowWhenTriggered shouldThrow />
        </ErrorBoundary>
      </MemoryRouter>,
    )

    expect(screen.getByRole('alert')).toBeInTheDocument()
    expect(screen.getByText('Что-то пошло не так')).toBeInTheDocument()
    expect(screen.queryByText('Контент в норме')).not.toBeInTheDocument()
  })

  it('сбрасывает ошибку при смене resetKeys', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {})

    const { rerender } = render(
      <MemoryRouter>
        <ErrorBoundary resetKeys={[true]}>
          <ThrowWhenTriggered shouldThrow />
        </ErrorBoundary>
      </MemoryRouter>,
    )

    expect(screen.getByRole('alert')).toBeInTheDocument()

    rerender(
      <MemoryRouter>
        <ErrorBoundary resetKeys={[false]}>
          <ThrowWhenTriggered shouldThrow={false} />
        </ErrorBoundary>
      </MemoryRouter>,
    )

    expect(screen.getByText('Контент в норме')).toBeInTheDocument()
  })
})
