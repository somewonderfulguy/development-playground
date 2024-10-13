import type { Meta, StoryObj } from '@storybook/react'
import { LuSun as SunIcon } from 'react-icons/lu'

import AppControlPopover from './AppControlPopover'
import AppControlButton from '../AppControlButton'

/**
 * Menu component that utilizes Radix UI Popover. https://www.radix-ui.com/primitives/docs/components/popover. <br />
 * Internally, implements show/hide logic on hover.
 */
const meta: Meta = {
  title: 'Application Layout/App Popover',
  component: AppControlPopover,
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof meta>

/** Minimal example. As simple as it gets. */
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

/** Full example */
export const FullExample: Story = {
  args: {
    open: true,
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
