import { auth, signIn, signOut } from '@/auth'

import UserButtonClient from './UserButtonClient'

export default async function UserButton() {
  const session = await auth()
  return (
    <UserButtonClient
      name={session?.user?.name}
      image={session?.user?.image}
      onSignIn={async () => {
        'use server'
        await signIn()
      }}
      onSignOut={async () => {
        'use server'
        await signOut()
      }}
    />
  )
}
