'use client'

import { usePathname } from 'next/navigation'
import Image from 'next/image'

import chatGpt from './assets/jherr-chatgpt-course.png'
import nextjs from './assets/nextjs-course.png'
import about from './assets/web-dev.png'
import unknown from './assets/question-mark.png'

export default function NavImage() {
  const pathname = usePathname()
  return (
    <Image
      // TODO: "404", "error"
      src={
        pathname.startsWith('/chat-gpt')
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
