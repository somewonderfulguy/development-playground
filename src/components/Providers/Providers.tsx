'use-client'

import { ReactNode } from 'react'

import { IsErrorProvider } from '@/contexts'
import { I18nProviderClient } from '@/locales/client'

type Props = {
  children: ReactNode
  locale: string
}

export default function Providers({ children, locale }: Props) {
  return (
    // TODO: remove IsErrorProvider
    <IsErrorProvider>
      <I18nProviderClient locale={locale}>{children}</I18nProviderClient>
    </IsErrorProvider>
  )
}
