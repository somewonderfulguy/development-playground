import { cookies } from 'next/headers'

import { CookieKey } from '../constants/cookieKey'
import type { ResolvedTheme } from '../types/themeTypes'

// TODO: test if possible

/** Get theme from cookies (server-side) */
export const getThemeCookie = () => {
  const nextCookies = cookies()
  return nextCookies.get(CookieKey)?.value as ResolvedTheme | undefined
}
