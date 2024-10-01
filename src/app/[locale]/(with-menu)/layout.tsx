import { ReactNode } from 'react'
import ApplicationLayout from '@/components/ApplicationLayout'

type Props = {
  children: ReactNode
}

export default function WithMenuLayout({ children }: Props) {
  return (
    <ApplicationLayout>
      <main>{children}</main>
    </ApplicationLayout>
  )
}
