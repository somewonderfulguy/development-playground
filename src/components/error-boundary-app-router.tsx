'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { AlertCircle, ChevronDown } from 'lucide-react'
import { useIsErrorDispatch } from '@/contexts'

type Props = {
  error: Error & { digest?: string }
  reset: () => void
}

export default function ErrorBoundaryAppRouter({ error, reset }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const setIsError = useIsErrorDispatch()

  useEffect(() => {
    setIsError({ isError: true })
    return () => setIsError({ isError: false })
  }, [setIsError])

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-lg w-full px-4 py-8 bg-card text-center">
        <AlertCircle className="mx-auto h-12 w-12 text-destructive text-red-500" aria-hidden="true" />
        <h2 className="mt-4 text-2xl font-semibold text-foreground">Something went wrong</h2>
        <p className="mt-2 text-muted-foreground">We apologize for the inconvenience. Please try again.</p>
        <div className="mt-6">
          <Button onClick={reset} variant="default">
            Try again
          </Button>
        </div>
        {process.env.NODE_ENV === 'development' && (
          <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full mt-4">
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-1 w-full justify-start">
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${isOpen ? '' : 'transform -rotate-90'}`}
                />
                <span>View error details</span>
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <pre className="text-left bg-muted p-4 rounded-md overflow-auto text-sm">
                <code>{error.stack}</code>
              </pre>
            </CollapsibleContent>
          </Collapsible>
        )}
      </div>
    </div>
  )
}
