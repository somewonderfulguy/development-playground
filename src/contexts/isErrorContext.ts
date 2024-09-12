'use client'

import createContextStore from '@/utils/createContextStore'

const {
  Provider: IsErrorProvider,
  useStoreValue: useIsErrorValue,
  useStoreDispatch: useIsErrorDispatch
} = createContextStore({ isError: false }, 'IsErrorProvider')

export { IsErrorProvider, useIsErrorValue, useIsErrorDispatch }
