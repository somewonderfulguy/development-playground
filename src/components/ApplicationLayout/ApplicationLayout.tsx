'use client'

import { useState, ReactNode } from 'react'
import { MenuIcon, MoonIcon, SunIcon, XIcon } from 'lucide-react'

import { TooltipGroup, TooltipProvider } from '@/components/ui/tooltip'
import { useChangeLocale, useCurrentLocale, useIsRtl } from '@/locales/client'

import AppNav from './components/AppNav'
import AppControlButton from './components/AppControlButton'
import AppControlSelect from './components/AppControlSelect'

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

  return (
    <TooltipProvider>
      <div className={`relative h-screen w-full overflow-hidden ${isDarkTheme ? 'dark' : ''}`}>
        {/* Top controls */}
        <div className={`absolute top-4 ${isRtl ? 'right-4' : 'left-4'} z-20 flex gap-1`}>
          <TooltipGroup tooltipContent={<p>Toggle sidebar</p>}>
            <AppControlButton onClick={() => setIsDrawerOpen((prev) => !prev)}>
              {isDrawerOpen ? <XIcon className={iconSharedClassName} /> : <MenuIcon className={iconSharedClassName} />}
            </AppControlButton>
          </TooltipGroup>
          <TooltipGroup tooltipContent={<p>Switch theme</p>}>
            <AppControlButton onClick={() => setIsDarkTheme((prev) => !prev)}>
              {isDarkTheme ? <SunIcon className={iconSharedClassName} /> : <MoonIcon className={iconSharedClassName} />}
            </AppControlButton>
          </TooltipGroup>
          <AppControlSelect
            value={currentLocale}
            onValueChange={changeLocale}
            trigger={
              <TooltipGroup tooltipContent={<>Hey-hey!</>}>
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
