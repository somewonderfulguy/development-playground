import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import { SessionProvider } from 'next-auth/react'

import { signIn, signOut, auth } from '@/auth'

import UserButton from './components/UserButton'
import React from 'react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'NextJS ChatGPT App',
  description: 'ChatGPT brought to you by NextJS'
}

export default async function ChatGPTLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
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
