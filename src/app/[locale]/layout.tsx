import { ReactNode } from 'react'

import { inter } from '@/constants/fonts'
import Providers from '@/components/Providers/Providers'

import './global.css'

type Props = {
  children: ReactNode
  params: { locale: string }
}

export default function HomeLayout({ children, params: { locale } }: Props) {
  return (
    <html lang={locale}>
      <body className={`antialiased ${inter.className}`}>
        <Providers locale={locale}>{children}</Providers>
      </body>
    </html>
  )
}
