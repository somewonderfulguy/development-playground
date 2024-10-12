import type { Meta, StoryObj } from '@storybook/react'
import { LuSun as SunIcon } from 'react-icons/lu'

import AppControlPopover from './AppControlPopover'
import AppControlButton from '../AppControlButton'

const meta: Meta = {
  title: 'Application Layout/App Popover',
  component: AppControlPopover
}

export default meta
type Story = StoryObj<typeof meta>

export const MinimalExample: Story = {
  args: {
    children: (
      <>
        <AppControlPopover.Trigger>Trigger</AppControlPopover.Trigger>
        <AppControlPopover.Content>Content</AppControlPopover.Content>
      </>
    )
  }
}

export const ThemeSwitcher: Story = {
  args: {
    children: (
      <>
        <AppControlPopover.Trigger asChild>
          <AppControlButton>
            <SunIcon />
          </AppControlButton>
        </AppControlPopover.Trigger>
        <AppControlPopover.Content>
          <div className="flex flex-col gap-2">
            <button className="btn" onClick={() => alert('Light')}>
              Light
            </button>
            <button className="btn" onClick={() => alert('Dark')}>
              Dark
            </button>
          </div>
        </AppControlPopover.Content>
      </>
    )
  }
}
