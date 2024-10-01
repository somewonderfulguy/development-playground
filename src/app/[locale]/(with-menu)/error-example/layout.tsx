import type { Metadata } from 'next'
import { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Error Example'
}

type Props = {
  children: ReactNode
}

export default function ErrorExampleLayout({ children }: Props) {
  return <>{children}</>
}
