'use client'

import { ComponentPropsWithoutRef, ElementRef, forwardRef, MutableRefObject, useEffect } from 'react'
import * as Popover from '@radix-ui/react-popover'

import { cn } from '@/utils/cn'
import createContextStore from '@/utils/createContextStore'

type InternalStore = {
  isOpen: boolean
  timeoutRef: MutableRefObject<number | null>
}

const {
  Provider: AppControlPopoverStoreProvider,
  useStoreValue: useAppControlPopoverStore,
  useStoreDispatch: useAppControlPopoverDispatch
} = createContextStore<InternalStore>(
  {
    isOpen: false,
    timeoutRef: { current: null }
  },
  'AppControlPopoverStoreProvider'
)

type RootProps = ComponentPropsWithoutRef<typeof Popover.Root>
const RootImpl = (props: RootProps) => {
  const isOpen = useAppControlPopoverStore((state) => state.isOpen)
  const timeoutRef = useAppControlPopoverStore((state) => state.timeoutRef)
  const updateStore = useAppControlPopoverDispatch()

  useEffect(() => () => void (timeoutRef.current && clearTimeout(timeoutRef.current)), [timeoutRef])

  return (
    <Popover.Root
      {...props}
      open={props.open ?? isOpen}
      onOpenChange={(open) => {
        updateStore({ isOpen: open })
        props.onOpenChange?.(open)
      }}
    />
  )
}
const Root = (props: RootProps) => {
  return (
    <AppControlPopoverStoreProvider>
      <RootImpl {...props} />
    </AppControlPopoverStoreProvider>
  )
}

type TriggerProps = ComponentPropsWithoutRef<typeof Popover.Trigger>
const Trigger = forwardRef<ElementRef<typeof Popover.Trigger>, TriggerProps>(
  ({ className, onMouseEnter, onMouseLeave, ...props }, ref) => {
    const timeoutRef = useAppControlPopoverStore((state) => state.timeoutRef)
    const updateStore = useAppControlPopoverDispatch()

    return (
      <Popover.Trigger
        ref={ref}
        className={className}
        {...props}
        onMouseEnter={(event) => {
          timeoutRef.current && clearTimeout(timeoutRef.current)
          updateStore({ isOpen: true })
          onMouseEnter?.(event)
        }}
        onMouseLeave={(event) => {
          timeoutRef.current = window.setTimeout(() => {
            updateStore({ isOpen: false })
          }, 300)
          onMouseLeave?.(event)
        }}
      />
    )
  }
)
Trigger.displayName = Popover.Trigger.displayName

type ContentProps = ComponentPropsWithoutRef<typeof Popover.Content>
const Content = forwardRef<ElementRef<typeof Popover.Content>, ContentProps>(
  ({ className, align = 'center', sideOffset = 4, onMouseLeave, onMouseEnter, ...props }, ref) => {
    const timeoutRef = useAppControlPopoverStore((state) => state.timeoutRef)
    const updateStore = useAppControlPopoverDispatch()

    return (
      <Popover.Portal>
        <Popover.Content
          ref={ref}
          align={align}
          sideOffset={sideOffset}
          onMouseEnter={(event) => {
            timeoutRef.current && clearTimeout(timeoutRef.current)
            updateStore({ isOpen: true })
            onMouseEnter?.(event)
          }}
          onMouseLeave={(event) => {
            timeoutRef.current = window.setTimeout(() => {
              updateStore({ isOpen: false })
            }, 300)
            onMouseLeave?.(event)
          }}
          className={cn(
            'z-50 rounded-md border bg-popover text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
            className
          )}
          {...props}
        />
      </Popover.Portal>
    )
  }
)
Content.displayName = Popover.Content.displayName

const AppControlPopover = Object.assign(Root, { Trigger, Content })

export default AppControlPopover
