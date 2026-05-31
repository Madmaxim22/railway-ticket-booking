import { useCallback, useState } from 'react'

export type FormValidationResult<TErrors> = {
  isValid: boolean
  errors: TErrors
}

export type FormValidator<T, TErrors> = (value: T) => FormValidationResult<TErrors>

export type UseFormStepOptions<T, TErrors> = {
  initial: T | (() => T)
  validate: FormValidator<T, TErrors>
  onCommit?: (value: T) => void
}

function resolveInitial<T>(initial: T | (() => T)): T {
  return typeof initial === 'function' ? (initial as () => T)() : initial
}

export function useFormStep<T, TErrors>({
  initial,
  validate,
  onCommit,
}: UseFormStepOptions<T, TErrors>) {
  const [draft, setDraftState] = useState<T>(() => resolveInitial(initial))
  const [errors, setErrors] = useState<TErrors>(() => ({}) as TErrors)

  const setDraft = useCallback((updater: T | ((prev: T) => T)) => {
    setDraftState((prev) => {
      if (typeof updater === 'function') {
        return (updater as (previous: T) => T)(prev)
      }
      return updater
    })
  }, [])

  const runValidate = useCallback(
    (value: T) => {
      const result = validate(value)
      setErrors(result.errors)
      return result
    },
    [validate],
  )

  const clearFieldError = useCallback((field: keyof TErrors & string) => {
    setErrors((prev) => {
      if (!(field in (prev as object))) return prev
      const next = { ...prev }
      delete (next as Record<string, unknown>)[field]
      return next
    })
  }, [])

  const submit = useCallback((): boolean => {
    const result = runValidate(draft)
    if (!result.isValid) return false
    onCommit?.(draft)
    return true
  }, [draft, onCommit, runValidate])

  return {
    draft,
    setDraft,
    errors,
    setErrors,
    validate: runValidate,
    submit,
    clearFieldError,
  }
}
