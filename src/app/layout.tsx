import { inter } from './constants/fonts'
import { ReactNode } from 'react'
import { headers } from 'next/headers'

import SideNav from './components/SideNav'

import './global.css'

export default function RootLayout({ children }: { children: ReactNode }) {
  const headerList = headers()
  const pathname = headerList.get('x-current-path') as string

  const cleanLayoutRoutes = ['/', '/login']

  return (
    <html lang="en">
      <body className={`antialiased ${inter.className}`}>
        {cleanLayoutRoutes.includes(pathname) ? (
          children
        ) : (
          <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
            <div className="w-full flex-none md:w-64">
              <SideNav />
            </div>
            <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
          </div>
        )}
      </body>
    </html>
  )
}
