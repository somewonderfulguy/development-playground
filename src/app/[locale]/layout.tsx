import { ReactNode } from 'react'
import Locale from 'intl-locale-textinfo-polyfill'

import { inter } from '@/constants/fonts'
import ClientProviders from '@/components/ClientProviders'

import './global.css'

type Props = {
  children: ReactNode
  params: { locale: string }
}

export default async function HomeLayout({ children, params: { locale } }: Props) {
  const { direction: dir } = new Locale(locale).textInfo

  return (
    <html lang={locale} dir={dir} className="h-full min-h-full" suppressHydrationWarning>
      <body className={`h-full min-h-full antialiased ${inter.className}`}>
        <ClientProviders locale={locale}>{children}</ClientProviders>
      </body>
    </html>
  )
}
