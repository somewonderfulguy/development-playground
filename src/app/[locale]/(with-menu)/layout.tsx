import { ReactNode } from 'react'

import ApplicationLayout from '@/components/ApplicationLayout'

type Props = {
  children: ReactNode
}

const WithMenuLayout = ({ children }: Props) => (
  <ApplicationLayout>
    <main className="h-full min-h-full bg-background p-12 pt-16 text-primary">{children}</main>
  </ApplicationLayout>
)

export default WithMenuLayout
