import { ReactNode } from 'react'

import { inter } from '@/constants/fonts'
import Providers from '@/components/Providers/Providers'

import './global.css'

type Props = {
  children: ReactNode
}

export default function HomeLayout({ children }: Props) {
  return (
    <html lang="en">
      <body className={`antialiased ${inter.className}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
