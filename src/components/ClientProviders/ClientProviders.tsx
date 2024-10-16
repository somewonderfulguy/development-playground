'use-client'

import { ReactNode } from 'react'
import { ThemeProvider } from 'next-themes'

import { I18nProviderClient } from '@/locales/client'

import { SessionProvider } from './SessionProvider'

type Props = {
  children: ReactNode
  locale: string
}

const ClientProviders = ({ children, locale }: Props) => (
  <SessionProvider>
    <I18nProviderClient locale={locale}>
      <ThemeProvider attribute="class">{children}</ThemeProvider>
    </I18nProviderClient>
  </SessionProvider>
)

export default ClientProviders
