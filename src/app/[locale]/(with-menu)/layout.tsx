import { ReactNode } from 'react'
import SideNav from './components/SideNav'
import ApplicationLayout from '@/components/ApplicationLayout'

type Props = {
  children: ReactNode
}

export default function WithMenuLayout({ children }: Props) {
  return (
    <ApplicationLayout>
      <main className="p-6 pt-16">{children}</main>
    </ApplicationLayout>
    // <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
    //   <div className="w-full flex-none md:w-64">
    //     <SideNav />
    //   </div>
    //   <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    // </div>
  )
}
