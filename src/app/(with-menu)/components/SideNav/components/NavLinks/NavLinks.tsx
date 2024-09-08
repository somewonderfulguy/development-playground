'use client'

import {
  UserGroupIcon,
  DocumentDuplicateIcon,
  ChatBubbleLeftRightIcon,
  ChartBarSquareIcon,
  PresentationChartBarIcon,
  HomeIcon,
  QuestionMarkCircleIcon
} from '@heroicons/react/24/outline'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'
import { Fragment, useState } from 'react'

const links = [
  {
    name: 'Home',
    href: '/',
    icon: HomeIcon
  },
  {
    name: 'Dashboard',
    icon: PresentationChartBarIcon,
    children: [
      {
        name: 'Main',
        href: '/dashboard',
        icon: ChartBarSquareIcon
      },
      {
        name: 'Invoices',
        href: '/dashboard/invoices',
        icon: DocumentDuplicateIcon
      },
      { name: 'Customers', href: '/dashboard/customers', icon: UserGroupIcon }
    ]
  },
  { name: 'ChatGPT', href: '/chat-gpt', icon: ChatBubbleLeftRightIcon },
  { name: 'About', href: '/about', icon: QuestionMarkCircleIcon }
]

export default function NavLinks() {
  const pathname = usePathname()

  const [openItems, setOpenItems] = useState(() =>
    links.reduce<Record<string, boolean>>((acc, link) => {
      acc[link.name] = true
      return acc
    }, {})
  )

  return (
    <>
      {links.map((link, idx) => {
        const LinkIcon = link.icon

        const item = (
          <>
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </>
        )

        const itemClassName =
          'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 hover:bg-sky-100 text-sm font-medium md:flex-none md:justify-start md:p-2 md:px-3'

        const childrenHrefs = link.children?.map((child) => child.href) || []

        return (
          <Fragment key={idx}>
            {link.href ? (
              <Link
                href={link.href}
                className={clsx(itemClassName, 'hover:bg-sky-100 hover:text-blue-600', {
                  'bg-sky-100 text-blue-600': pathname === link.href
                })}
              >
                {item}
              </Link>
            ) : (
              <button
                className={itemClassName}
                style={{ fontWeight: childrenHrefs.includes(pathname) ? 'bold' : 'normal' }}
                onClick={() => setOpenItems((prev) => ({ ...prev, [link.name]: !prev[link.name] }))}
              >
                {item}
              </button>
            )}
            {openItems[link.name] &&
              link.children?.map((child) => {
                const ChildIcon = child.icon
                return (
                  <Link
                    key={child.href}
                    href={child.href}
                    // TODO: change the style to use tailwind classes
                    style={{ margin: 0, padding: '4px 6px', paddingLeft: '1.2rem' }}
                    className={clsx(
                      'flex h-[36px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
                      {
                        'bg-sky-100 text-blue-600': pathname === child.href
                      }
                    )}
                  >
                    <ChildIcon className="w-6" />
                    <p className="hidden md:block">{child.name}</p>
                  </Link>
                )
              })}
          </Fragment>
        )
      })}
    </>
  )
}
