import { ReactNode } from 'react'
import ApplicationLayout from '@/components/ApplicationLayout'

type Props = {
  children: ReactNode
}

export default function WithMenuLayout({ children }: Props) {
  return (
    <ApplicationLayout>
      <main className="h-full min-h-full p-12 pt-16">{children}</main>
    </ApplicationLayout>
  )
}
