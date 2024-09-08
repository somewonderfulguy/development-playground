import { inter } from '../constants/fonts'
import { ReactNode } from 'react'

import './global.css'

type Props = {
  children: ReactNode
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body className={`antialiased ${inter.className}`}>{children}</body>
    </html>
  )
}
