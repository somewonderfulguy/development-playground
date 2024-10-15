'use client'

import { useState, ReactNode, useEffect } from 'react'
import { LuSun as SunIcon, LuMoon as MoonIcon, LuX as XIcon, LuMenu as MenuIcon } from 'react-icons/lu'

import { TooltipGroup, TooltipProvider } from '@/components/ui/tooltip'
import { useChangeLocale, useCurrentLocale, useIsRtl } from '@/locales/client'

import AppNav from './components/AppNav'
import AppControlButton from './components/AppControlButton'
import AppControlSelect from './components/AppControlSelect'
import AppControlPopover from './components/AppControlPopover'
import AppControlList from './components/AppControlList'

const languages = [
  { code: 'en', label: 'English' },
  { code: 'pl', label: 'Polski' },
  { code: 'ua', label: 'Українська' },
  { code: 'jp', label: '日本語' },
  { code: 'he', label: 'עברית' }
]

const iconSharedClassName = 'h-4 w-4' as const

type Props = {
  children: ReactNode
  userButton: ReactNode
}

export default function ApplicationLayout({ children, userButton }: Props) {
  const isRtl = useIsRtl()

  const changeLocale = useChangeLocale()
  const currentLocale = useCurrentLocale()

  const [isDrawerOpen, setIsDrawerOpen] = useState(true)

  const [isDarkTheme, setIsDarkTheme] = useState(false)
  useEffect(() => {
    if (isDarkTheme) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkTheme])

  return (
    <TooltipProvider>
      <div className="relative overflow-hidden">
        {/* Top controls */}
        <div className={`fixed top-4 ${isRtl ? 'right-4' : 'left-4'} z-20 flex gap-1`}>
          <TooltipGroup tooltipContent={<p>Toggle sidebar</p>}>
            <AppControlButton onClick={() => setIsDrawerOpen((prev) => !prev)}>
              {isDrawerOpen ? <XIcon className={iconSharedClassName} /> : <MenuIcon className={iconSharedClassName} />}
            </AppControlButton>
          </TooltipGroup>

          {/* <TooltipGroup tooltipContent={<p>Switch theme</p>}>
            <AppControlButton onClick={() => setIsDarkTheme((prev) => !prev)}>
              {isDarkTheme ? <SunIcon className={iconSharedClassName} /> : <MoonIcon className={iconSharedClassName} />}
            </AppControlButton>
          </TooltipGroup> */}
          <AppControlPopover>
            <AppControlPopover.Trigger asChild>
              <AppControlButton>
                {isDarkTheme ? (
                  <SunIcon className={iconSharedClassName} />
                ) : (
                  <MoonIcon className={iconSharedClassName} />
                )}
              </AppControlButton>
            </AppControlPopover.Trigger>
            <AppControlPopover.Content>
              <AppControlList>
                <AppControlList.Item isActive={!isDarkTheme}>
                  <button className="btn" onClick={() => setIsDarkTheme(false)}>
                    Light
                  </button>
                </AppControlList.Item>
                <AppControlList.Item isActive={isDarkTheme}>
                  <button className="btn" onClick={() => setIsDarkTheme(true)}>
                    Dark
                  </button>
                </AppControlList.Item>
                <AppControlList.Item>
                  <button className="btn" onClick={() => {}}>
                    System
                  </button>
                </AppControlList.Item>
              </AppControlList>
            </AppControlPopover.Content>
          </AppControlPopover>

          <AppControlSelect
            value={currentLocale}
            onValueChange={changeLocale}
            trigger={
              <TooltipGroup tooltipContent={<p>Change language</p>}>
                <AppControlSelect.Trigger>{currentLocale.toUpperCase()}</AppControlSelect.Trigger>
              </TooltipGroup>
            }
            options={languages.map((lang) => ({ value: lang.code, label: lang.label }))}
          />
          {userButton}
        </div>

        <div className="flex h-full">
          {/* Drawer */}
          <div
            className={`${isDrawerOpen ? 'translate-x-0' : '-translate-x-full'} fixed top-0 ${
              isRtl ? 'right-0' : 'left-0'
            } h-full w-[270px] bg-secondary p-4 pt-18 transition-transform duration-300 ease-in-out`}
          >
            <AppNav />
          </div>

          {/* Main Content */}
          <div
            className={`flex-grow overflow-y-auto transition-[margin] duration-300 ease-in-out ${isDrawerOpen ? (isRtl ? 'mr-[270px]' : 'ml-[270px]') : 'ml-0'} `}
          >
            {children}
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}
