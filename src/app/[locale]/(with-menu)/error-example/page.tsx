'use client'

import { useLayoutEffect } from 'react'

export default function ErrorExample() {
  const undef = undefined as any

  let newVariable: string[] = []
  useLayoutEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    newVariable = undef.map((x: any) => x.variable)
  }, [undef])

  return <>Content of the page does not matter - it will crash anyway. {newVariable}</>
}
