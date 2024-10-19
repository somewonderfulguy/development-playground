import { useEffect } from 'react'

import { useTheme } from './useTheme'
import { CookieKey } from '../constants/cookieKey'
import type { ResolvedTheme } from '../types/themeTypes'
import { setCookie } from '../utils/setCookie'

/**
 * Set theme to cookies to avoid flashing in server-side rendering
 * (not eligible for the first render, when cookie is not set yet)
 */
export const useSetThemeCookie = () => {
  const { resolvedTheme } = useTheme()
  useEffect(() => {
    const theme =
      resolvedTheme ??
      ((window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light') satisfies ResolvedTheme)
    setCookie(CookieKey, theme, 365 * 70)
  }, [resolvedTheme])
}
