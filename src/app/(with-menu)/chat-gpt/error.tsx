'use client'

import ErrorBoundaryAppRouter from '@/components/ErrorBoundaryAppRouter'

type Props = {
  error: Error & { digest?: string }
  reset: () => void
}

export default function ChatGPTError(props: Props) {
  return <ErrorBoundaryAppRouter {...props} title="Chat GPT Page Error" />
}
