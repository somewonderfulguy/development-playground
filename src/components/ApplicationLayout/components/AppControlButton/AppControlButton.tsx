import { Button, type ButtonProps } from '@/components/ui/button'
import clsx from 'clsx'

export default function AppControlButton(props: ButtonProps) {
  return (
    <Button
      variant="outline"
      size="icon"
      {...props}
      // TODO: do better coloring on hover
      className={clsx('hover:bg-secondary-foreground/[0.05]', props.className)}
    />
  )
}
