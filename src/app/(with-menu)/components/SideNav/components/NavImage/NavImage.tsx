'use client'

import { usePathname } from 'next/navigation'
import Image from 'next/image'

export default function NavImage() {
  const pathname = usePathname()
  return (
    <Image
      // TODO: add "about", "404", "error", "unknown" images
      src={pathname.startsWith('/chat-gpt') ? '/jherr-chatgpt-course.png' : '/nextjs-course.png'}
      width={240}
      height={134}
      alt="Next.js course"
    />
  )
}
