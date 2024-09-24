'use client'

import { useState, ReactNode } from 'react'

import { TooltipProvider } from '@/components/ui/tooltip'
import AppControls from './components/AppControls'
import AppNav from './components/AppNav'

type Props = {
  children: ReactNode
}

export default function ApplicationLayout({ children }: Props) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(true)
  const [isDarkTheme, setIsDarkTheme] = useState(false)

  return (
    <TooltipProvider>
      <div className={`h-screen w-full relative overflow-hidden ${isDarkTheme ? 'dark' : ''}`}>
        <AppControls
          isDarkTheme={isDarkTheme}
          setIsDarkTheme={setIsDarkTheme}
          isDrawerOpen={isDrawerOpen}
          setIsDrawerOpen={setIsDrawerOpen}
        />

        <div className="flex h-full">
          {/* Drawer */}
          <div
            className={`${
              isDrawerOpen ? 'translate-x-0' : '-translate-x-full'
            } fixed top-0 left-0 h-full w-[270px] bg-secondary transition-transform duration-300 ease-in-out p-4 pt-18`}
          >
            <AppNav />
          </div>

          {/* Main Content */}
          <div
            className={`
              flex-grow transition-all duration-300 ease-in-out overflow-y-auto
              ${isDrawerOpen ? 'ml-[270px]' : 'ml-0'}
            `}
          >
            {children}
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}
