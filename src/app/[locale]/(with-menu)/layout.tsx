import { ReactNode } from 'react'

import ApplicationLayout from '@/components/ApplicationLayout'
import ThemeSwitcher from '@/components/ApplicationLayout/components/ThemeSwitcher'
import { getThemeCookie } from '@/features/theme/utils/getThemeCookie'

type Props = {
  children: ReactNode
}

const WithMenuLayout = ({ children }: Props) => {
  const cookieTheme = getThemeCookie()

  return (
    <ApplicationLayout themeSwitcher={<ThemeSwitcher cookieTheme={cookieTheme} />}>
      <main className="h-full min-h-full bg-background p-12 pt-16 text-primary">{children}</main>
    </ApplicationLayout>
  )
}

export default WithMenuLayout
