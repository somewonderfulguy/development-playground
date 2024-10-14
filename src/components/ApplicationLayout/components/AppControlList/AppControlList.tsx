import { type HTMLAttributes, forwardRef } from 'react'

import { cn } from '@/utils/cn'

import styles from './AppControlList.module.css'

const AppControlList = forwardRef<HTMLUListElement, HTMLAttributes<HTMLUListElement>>(
  ({ className, ...props }, ref) => <ul ref={ref} role="menu" {...props} className={cn('flex flex-col', className)} />
)
AppControlList.displayName = 'AppControlList'

type AppControlListItemProps = HTMLAttributes<HTMLLIElement> & {
  isActive?: boolean
}

const AppControlListItem = forwardRef<HTMLLIElement, AppControlListItemProps>(
  ({ className, isActive, ...props }, ref) => (
    <li
      ref={ref}
      role="none"
      className={cn(
        'rounded-sm text-sm outline-none',
        isActive && 'bg-secondary font-semibold',
        styles.listItem,
        className
      )}
      {...props}
    />
  )
)
AppControlListItem.displayName = 'AppControlListItem'

export default Object.assign(AppControlList, { Item: AppControlListItem })
