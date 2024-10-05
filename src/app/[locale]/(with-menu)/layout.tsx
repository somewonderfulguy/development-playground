import { ReactNode } from 'react'

import ApplicationLayout from '@/components/ApplicationLayout'
import UserButton from '@/components/ApplicationLayout/components/UserButton'

type Props = {
  children: ReactNode
}

export default async function WithMenuLayout({ children }: Props) {
  return (
    <ApplicationLayout userButton={<UserButton />}>
      <main className="h-full min-h-full bg-background p-12 pt-16 text-primary">{children}</main>
    </ApplicationLayout>
  )
}
