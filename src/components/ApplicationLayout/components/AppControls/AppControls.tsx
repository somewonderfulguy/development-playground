'use client'

import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { MenuIcon, XIcon, MoonIcon, SunIcon, UserIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

import styles from './AppControls.module.css'

const languages = [
  { code: 'EN', label: 'English' },
  { code: 'PL', label: 'Polski' },
  { code: 'UA', label: 'Українська' },
  { code: 'JP', label: '日本語' }
]

type Props = {
  isDrawerOpen: boolean
  setIsDrawerOpen: Dispatch<SetStateAction<boolean>>
  isDarkTheme: boolean
  setIsDarkTheme: Dispatch<SetStateAction<boolean>>
}

export default function AppControls({ isDrawerOpen, setIsDrawerOpen, isDarkTheme, setIsDarkTheme }: Props) {
  // TODO: Implement language change
  const [language, setLanguage] = useState('EN')

  // TODO: Implement theme change
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
            className="absolute top-4 left-4 z-20 hover:bg-secondary-foreground/[0.05]"
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
            className="absolute top-4 left-16 z-20"
            onClick={() => setIsDarkTheme((prev) => !prev)}
          >
            {isDarkTheme ? <SunIcon className="h-4 w-4" /> : <MoonIcon className="h-4 w-4" />}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Switch theme</p>
        </TooltipContent>
      </Tooltip>

      <div className="absolute top-4 left-28 z-20">
        <Select value={language} onValueChange={setLanguage}>
          <Tooltip>
            <TooltipTrigger asChild>
              <SelectTrigger
                className={`w-[40px] h-[40px] p-0 hover:bg-accent hover:text-accent-foreground flex items-center justify-center ${styles.buttonDropDown}`}
              >
                <SelectValue>{language}</SelectValue>
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
                  language === lang.code ? 'bg-secondary font-semibold' : ''
                } flex items-center px-2 py-1.5 rounded-sm text-sm outline-none focus:bg-accent focus:text-accent-foreground disabled:pointer-events-none disabled:opacity-50 cursor-pointer`}
              >
                {lang.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" size="icon" className="absolute top-4 left-40 z-20">
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
