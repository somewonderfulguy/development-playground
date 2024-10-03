import { ReactNode } from 'react'

import { signIn, signOut } from '@/auth'
import ApplicationLayout from '@/components/ApplicationLayout'

type Props = {
  children: ReactNode
}

export default async function WithMenuLayout({ children }: Props) {
  return (
    <ApplicationLayout
      onSignIn={async () => {
        'use server'
        await signIn()
      }}
      onSignOut={async () => {
        'use server'
        await signOut()
      }}
    >
      <main className="h-full min-h-full p-12 pt-16">{children}</main>
    </ApplicationLayout>
  )
}
