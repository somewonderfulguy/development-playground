'use client'

import { useState, ReactNode } from 'react'

import { TooltipProvider } from '@/components/ui/tooltip'
import AppControls from './components/AppControls'
import AppNav from './components/AppNav'
import { useIsRtl } from '@/locales/client'

type Props = {
  children: ReactNode
}

export default function ApplicationLayout({ children }: Props) {
  const isRtl = useIsRtl()

  const [isDrawerOpen, setIsDrawerOpen] = useState(true)
  const [isDarkTheme, setIsDarkTheme] = useState(false)

  return (
    <TooltipProvider>
      <div className={`relative h-screen w-full overflow-hidden ${isDarkTheme ? 'dark' : ''}`}>
        <AppControls
          isDarkTheme={isDarkTheme}
          setIsDarkTheme={setIsDarkTheme}
          isDrawerOpen={isDrawerOpen}
          setIsDrawerOpen={setIsDrawerOpen}
        />
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
            className={`flex-grow overflow-y-auto transition-all duration-300 ease-in-out ${isDrawerOpen ? (isRtl ? 'mr-[270px]' : 'ml-[270px]') : 'ml-0'} `}
          >
            {children}
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}
