import { useEffect } from 'react'
import Cookies from 'js-cookie'

import { useTheme } from './useTheme'
import { CookieKey } from '../constants/cookieKey'
import type { ResolvedTheme } from '../types/themeTypes'

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
    Cookies.set(CookieKey, theme, { expires: 365 * 70 })
  }, [resolvedTheme])
}
