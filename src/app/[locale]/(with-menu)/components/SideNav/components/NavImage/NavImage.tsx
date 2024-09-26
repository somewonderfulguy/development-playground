'use client'

import { usePathname } from 'next/navigation'
import Image from 'next/image'

import { useIsErrorValue } from '@/contexts'

import chatGpt from './assets/jherr-chatgpt-course.png'
import nextjs from './assets/nextjs-course.png'
import about from './assets/web-dev.png'
import unknown from './assets/question-mark.png'
import error from './assets/dead.png'

export default function NavImage() {
  const pathname = usePathname()

  const isError = useIsErrorValue((state) => state.isError)

  return (
    <Image
      // TODO: "404"
      src={
        isError
          ? error
          : pathname.startsWith('/chat-gpt')
          ? chatGpt
          : pathname.startsWith('/dashboard')
          ? nextjs
          : pathname === '/about'
          ? about
          : unknown
      }
      width={240}
      height={134}
      alt="Next.js course"
    />
  )
}
