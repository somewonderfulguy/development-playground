'use client'

import { ThemeProvider as NextThemeProvider } from 'next-themes'
import { ReactNode } from 'react'

import { useSetThemeCookie } from '../hooks/useSetThemeCookie'
import { Themes } from '../constants/themes'

type Props = {
  children: ReactNode
}

const ThemeProvider = ({ children }: Props) => (
  <NextThemeProvider attribute="class" themes={Themes as unknown as string[]}>
    <ThemeProviderImpl>{children}</ThemeProviderImpl>
  </NextThemeProvider>
)

const ThemeProviderImpl = ({ children }: Props) => {
  useSetThemeCookie()
  return children
}

export default ThemeProvider
