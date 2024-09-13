'use client'

import { useEffect } from 'react'

export default function ErrorExample() {
  const undef = undefined as any

  let newVariable: string[] = []
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    newVariable = undef.map((x: any) => x.variable)
  }, [undef])

  return <div>Content of the page does not matter - it will crash anyway. {newVariable}</div>
}
