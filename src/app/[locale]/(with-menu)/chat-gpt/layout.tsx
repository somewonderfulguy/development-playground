import type { Metadata } from 'next'
import React, { ReactNode } from 'react'
import { SessionProvider } from 'next-auth/react'

import { signIn, signOut, auth } from '@/auth'

import UserButton from './components/UserButton'

export const metadata: Metadata = {
  title: 'ChatGPT'
}

type Props = {
  children: ReactNode
}

export default async function ChatGPTLayout({ children }: Props) {
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
      {children}
    </SessionProvider>
  )
}
