'use-client'

import { ReactNode } from 'react'

import { IsErrorProvider } from '@/contexts'

type Props = {
  children: ReactNode
}

export default function Providers({ children }: Props) {
  return <IsErrorProvider>{children}</IsErrorProvider>
}
