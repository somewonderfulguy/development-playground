import Cookies from 'js-cookie'

import { CookieKey } from '../constants/cookieKey'
import type { ResolvedTheme } from '../types/themeTypes'

export const getThemeCookie = () => Cookies.get(CookieKey) as ResolvedTheme | undefined
