import { ReactNode } from 'react'
import Locale from 'intl-locale-textinfo-polyfill'

import { inter } from '@/constants/fonts'
import Providers from '@/components/Providers/Providers'

import './global.css'

type Props = {
  children: ReactNode
  params: { locale: string }
}

export default function HomeLayout({ children, params: { locale } }: Props) {
  const { direction: dir } = new Locale(locale).textInfo

  return (
    <html lang={locale} dir={dir}>
      <body className={`antialiased ${inter.className}`}>
        <Providers locale={locale}>{children}</Providers>
      </body>
    </html>
  )
}
