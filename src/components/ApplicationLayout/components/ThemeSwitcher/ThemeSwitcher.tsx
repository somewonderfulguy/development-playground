'use client'

import { LuSun as SunIcon, LuMoon as MoonIcon, LuMonitorSmartphone as MonitorSmartPhoneIcon } from 'react-icons/lu'

import { useScopedI18n } from '@/locales/client'
import { useTheme } from '@/features/theme/hooks/useTheme'
import { ResolvedTheme } from '@/features/theme/types/themeTypes'

import AppControlPopover from '../AppControlPopover'
import AppControlButton from '../AppControlButton'
import AppControlList from '../AppControlList'

const buttonClassName = 'btn flex items-center gap-2'
const iconClassName = 'h-4 w-4'

type Props = {
  cookieTheme?: ResolvedTheme
}

const ThemeSwitcher = ({ cookieTheme }: Props) => {
  const { theme, setTheme, resolvedTheme: clientResolvedTheme } = useTheme()

  const t = useScopedI18n('appControls.theme')

  return (
    <AppControlPopover>
      <AppControlPopover.Trigger asChild>
        <AppControlButton>
          {(clientResolvedTheme ?? cookieTheme) === 'dark' ? (
            <MoonIcon className={iconClassName} />
          ) : (
            <SunIcon className={iconClassName} />
          )}
        </AppControlButton>
      </AppControlPopover.Trigger>
      <AppControlPopover.Content>
        <AppControlList>
          <AppControlList.Item isActive={theme === 'light'}>
            <button type="button" className={buttonClassName} onClick={() => setTheme('light')}>
              <SunIcon className={iconClassName} /> {t('light')}
            </button>
          </AppControlList.Item>
          <AppControlList.Item isActive={theme === 'dark'}>
            <button type="button" className={buttonClassName} onClick={() => setTheme('dark')}>
              <MoonIcon className={iconClassName} /> {t('dark')}
            </button>
          </AppControlList.Item>
          <AppControlList.Item isActive={theme === 'system'}>
            <button type="button" className={buttonClassName} onClick={() => setTheme('system')}>
              <MonitorSmartPhoneIcon className={iconClassName} /> {t('system')}
            </button>
          </AppControlList.Item>
        </AppControlList>
      </AppControlPopover.Content>
    </AppControlPopover>
  )
}

export default ThemeSwitcher
