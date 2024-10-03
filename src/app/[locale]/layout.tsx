import { ReactNode } from 'react'
import Locale from 'intl-locale-textinfo-polyfill'
import { SessionProvider } from 'next-auth/react'

import { auth } from '@/auth'
import { inter } from '@/constants/fonts'
import ClientProviders from '@/components/ClientProviders'

import './global.css'

type Props = {
  children: ReactNode
  params: { locale: string }
}

export default async function HomeLayout({ children, params: { locale } }: Props) {
  const { direction: dir } = new Locale(locale).textInfo

  const session = await auth()
  if (session?.user) {
    session.user = {
      name: session.user.name,
      email: session.user.email,
      image: session.user.image
    }
  }

  return (
    <SessionProvider basePath="/api/auth" session={session}>
      <ClientProviders locale={locale}>
        <html lang={locale} dir={dir} className="h-full min-h-full">
          <body className={`h-full min-h-full antialiased ${inter.className}`}>{children}</body>
        </html>
      </ClientProviders>
    </SessionProvider>
  )
}
