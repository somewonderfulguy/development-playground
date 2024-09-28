'use client'

import { Dispatch, SetStateAction, useEffect } from 'react'
import { MenuIcon, XIcon, MoonIcon, SunIcon, UserIcon } from 'lucide-react'
import Locale from 'intl-locale-textinfo-polyfill'

import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { useChangeLocale, useCurrentLocale } from '@/locales/client'

import styles from './AppControls.module.css'

const languages = [
  { code: 'en', label: 'English' },
  { code: 'pl', label: 'Polski' },
  { code: 'ua', label: 'Українська' },
  { code: 'jp', label: '日本語' },
  { code: 'he', label: 'עברית' }
]

type Props = {
  isDrawerOpen: boolean
  setIsDrawerOpen: Dispatch<SetStateAction<boolean>>
  isDarkTheme: boolean
  setIsDarkTheme: Dispatch<SetStateAction<boolean>>
}

export default function AppControls({ isDrawerOpen, setIsDrawerOpen, isDarkTheme, setIsDarkTheme }: Props) {
  const changeLocale = useChangeLocale()
  const currentLocale = useCurrentLocale()
  const { direction: dir } = new Locale(String(currentLocale)).textInfo
  const isRTL = dir === 'rtl'

  useEffect(() => {
    if (isDarkTheme) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkTheme])

  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            // TODO: move position to top level
            className={`absolute top-4 ${isRTL ? 'right-4' : 'left-4'} z-20 hover:bg-secondary-foreground/[0.05]`}
            onClick={() => setIsDrawerOpen((prev) => !prev)}
          >
            {isDrawerOpen ? <XIcon className="h-4 w-4" /> : <MenuIcon className="h-4 w-4" />}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Toggle sidebar</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            // className="absolute top-4 left-16 z-20"
            className={`absolute top-4 ${isRTL ? 'right-16' : 'left-16'} z-20 hover:bg-secondary-foreground/[0.05]`}
            onClick={() => setIsDarkTheme((prev) => !prev)}
          >
            {isDarkTheme ? <SunIcon className="h-4 w-4" /> : <MoonIcon className="h-4 w-4" />}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Switch theme</p>
        </TooltipContent>
      </Tooltip>

      <div className={`absolute top-4 ${isRTL ? 'right-28' : 'left-28'} z-20`}>
        <Select value={currentLocale} onValueChange={changeLocale}>
          <Tooltip>
            <TooltipTrigger asChild>
              <SelectTrigger
                className={`flex h-[40px] w-[40px] items-center justify-center p-0 hover:bg-secondary-foreground/[0.05] hover:text-accent-foreground ${styles.buttonDropDown}`}
              >
                <SelectValue>{currentLocale.toUpperCase()}</SelectValue>
              </SelectTrigger>
            </TooltipTrigger>
            <TooltipContent>
              <p>Change language</p>
            </TooltipContent>
          </Tooltip>
          <SelectContent align="center" className="min-w-[100px]">
            {languages.map((lang) => (
              <SelectItem
                key={lang.code}
                value={lang.code}
                className={`${styles.itemDropDown} ${
                  currentLocale === lang.code ? 'bg-secondary font-semibold' : ''
                } flex cursor-pointer items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground disabled:pointer-events-none disabled:opacity-50`}
              >
                {lang.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className={`absolute top-4 ${isRTL ? 'right-40' : 'left-40'} z-20 hover:bg-secondary-foreground/[0.05]`}
          >
            {/* TODO: replace with profile image if logged in and available */}
            <UserIcon className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Log in</p>
        </TooltipContent>
      </Tooltip>
    </>
  )
}
