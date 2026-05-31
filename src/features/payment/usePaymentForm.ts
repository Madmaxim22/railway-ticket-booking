import { useCallback } from 'react'

import { useFormStep } from '@/shared/hooks/useFormStep'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import {
  selectBookingContactInfo,
  selectBookingPaymentMethod,
  setContactInfo,
  setPaymentMethod,
  type BookingContactInfo,
  type PaymentMethod,
} from '@/store/slices/bookingSlice'

import {
  validateContactInfo,
  type ContactValidationErrors,
} from './lib/validateContactInfo'

const EMPTY_CONTACT: BookingContactInfo = {
  firstName: '',
  lastName: '',
  patronymic: '',
  phone: '',
  email: '',
}

export type PaymentFormDraft = {
  contactInfo: BookingContactInfo
  paymentMethod: PaymentMethod
}

export function usePaymentForm() {
  const dispatch = useAppDispatch()
  const savedPaymentMethod = useAppSelector(selectBookingPaymentMethod)
  const savedContactInfo = useAppSelector(selectBookingContactInfo)

  const { draft, setDraft, errors, clearFieldError, submit } = useFormStep<
    PaymentFormDraft,
    ContactValidationErrors
  >({
    initial: {
      contactInfo: savedContactInfo ?? EMPTY_CONTACT,
      paymentMethod: savedPaymentMethod ?? 'online',
    },
    validate: (value) => validateContactInfo(value.contactInfo),
    onCommit: (value) => {
      dispatch(setContactInfo(value.contactInfo))
      dispatch(setPaymentMethod(value.paymentMethod))
    },
  })

  const updateContact = useCallback(
    <K extends keyof BookingContactInfo>(key: K, value: BookingContactInfo[K]) => {
      setDraft((prev) => ({
        ...prev,
        contactInfo: { ...prev.contactInfo, [key]: value },
      }))
      clearFieldError(key)
    },
    [clearFieldError, setDraft],
  )

  const setPaymentMethodDraft = useCallback(
    (paymentMethod: PaymentMethod) => {
      setDraft((prev) => ({ ...prev, paymentMethod }))
    },
    [setDraft],
  )

  return {
    contactInfo: draft.contactInfo,
    paymentMethod: draft.paymentMethod,
    errors,
    updateContact,
    setPaymentMethod: setPaymentMethodDraft,
    submit,
  }
}
