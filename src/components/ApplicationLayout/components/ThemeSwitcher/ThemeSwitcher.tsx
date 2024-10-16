import { LuSun as SunIcon, LuMoon as MoonIcon, LuMonitorSmartphone as MonitorSmartPhoneIcon } from 'react-icons/lu'
import { useTheme } from 'next-themes'

import { useScopedI18n } from '@/locales/client'

import AppControlPopover from '../AppControlPopover'
import AppControlButton from '../AppControlButton'
import AppControlList from '../AppControlList'

const ThemeSwitcher = () => {
  const { theme, setTheme, resolvedTheme } = useTheme()

  const t = useScopedI18n('appControls.theme')

  const buttonClassName = 'btn flex items-center gap-2'

  return (
    <AppControlPopover>
      <AppControlPopover.Trigger asChild>
        <AppControlButton>
          {resolvedTheme === 'dark' ? <MoonIcon className="h-4 w-4" /> : <SunIcon className="h-4 w-4" />}
        </AppControlButton>
      </AppControlPopover.Trigger>
      <AppControlPopover.Content>
        <AppControlList>
          <AppControlList.Item isActive={theme === 'light'}>
            <button type="button" className={buttonClassName} onClick={() => setTheme('light')}>
              <SunIcon className="h-4 w-4" /> {t('light')}
            </button>
          </AppControlList.Item>
          <AppControlList.Item isActive={theme === 'dark'}>
            <button type="button" className={buttonClassName} onClick={() => setTheme('dark')}>
              <MoonIcon className="h-4 w-4" /> {t('dark')}
            </button>
          </AppControlList.Item>
          <AppControlList.Item isActive={theme === 'system'}>
            <button type="button" className={buttonClassName} onClick={() => setTheme('system')}>
              <MonitorSmartPhoneIcon className="h-4 w-4" /> {t('system')}
            </button>
          </AppControlList.Item>
        </AppControlList>
      </AppControlPopover.Content>
    </AppControlPopover>
  )
}

export default ThemeSwitcher
