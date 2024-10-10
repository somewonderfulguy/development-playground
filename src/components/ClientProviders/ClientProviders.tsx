'use-client'

import { ReactNode } from 'react'
import { SessionProvider } from './SessionProvider'

import { I18nProviderClient } from '@/locales/client'

type Props = {
  children: ReactNode
  locale: string
}

export default function ClientProviders({ children, locale }: Props) {
  return (
    <SessionProvider>
      <I18nProviderClient locale={locale}>{children}</I18nProviderClient>
    </SessionProvider>
  )
}
