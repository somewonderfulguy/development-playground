'use client'

import {
  UserGroupIcon,
  DocumentDuplicateIcon,
  ChatBubbleLeftRightIcon,
  ChartBarSquareIcon,
  PresentationChartBarIcon,
  HomeIcon,
  QuestionMarkCircleIcon,
  ExclamationCircleIcon,
  WindowIcon
} from '@heroicons/react/24/outline'
import {
  LayoutDashboardIcon,
  MessageSquareIcon,
  ShieldIcon,
  InfoIcon,
  ChevronDownIcon,
  ChevronRightIcon
} from 'lucide-react'
import { BiFootball } from 'react-icons/bi'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Fragment, useState } from 'react'
import clsx from 'clsx'
import { useScopedI18n } from '@/locales/client'

const useLinks = () => {
  const t = useScopedI18n('nav')

  return [
    {
      name: t('home'),
      href: '/',
      icon: HomeIcon
    },
    {
      name: t('dashboard'),
      icon: PresentationChartBarIcon,
      children: [
        {
          name: t('dashboard.main'),
          href: '/dashboard',
          icon: ChartBarSquareIcon
        },
        {
          name: t('dashboard.invoices'),
          href: '/dashboard/invoices',
          icon: DocumentDuplicateIcon
        },
        { name: t('dashboard.customers'), href: '/dashboard/customers', icon: UserGroupIcon }
      ]
    },
    { name: t('chatGPT'), href: '/chat-gpt', icon: ChatBubbleLeftRightIcon },
    { name: t('fcClubs'), href: '/fc-clubs', icon: BiFootball },
    { name: t('about'), href: '/about', icon: WindowIcon }
  ]
}

export default function AppNav() {
  const pathname = usePathname()

  const links = useLinks()

  const [openItems, setOpenItems] = useState(() =>
    links.reduce<Record<string, boolean>>((acc, link) => {
      acc[link.name] = true
      return acc
    }, {})
  )

  return (
    <nav>
      <ul>
        {links.map((link, idx) => {
          const LinkIcon = link.icon
          const item = (
            <>
              <LinkIcon className="w-6" size="1.8em" />
              <p className="hidden md:block">{link.name}</p>
            </>
          )
          const itemClassName =
            'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 hover:bg-sky-100 text-sm font-medium md:flex-none md:justify-start md:p-2 md:px-3'
          const childrenHrefs = link.children?.map((child) => child.href) || []
          return (
            <li key={idx}>
              {link.href ? (
                <Link
                  href={link.href}
                  className={`${
                    pathname === link.href && 'bg-primary/[0.05] text-primary'
                  } flex items-center gap-2 rounded-lg p-2 text-sm hover:bg-primary/[0.05]`}
                >
                  {item}
                </Link>
              ) : (
                <button
                  className="flex w-full items-center justify-start gap-2 rounded-lg p-2 text-sm hover:bg-primary/[0.05]"
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
                      className={`${
                        pathname === child.href && 'bg-primary/[0.05] text-primary'
                      } flex h-[36px] grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium hover:bg-primary/[0.05] md:flex-none md:justify-start md:p-2 md:px-3`}
                    >
                      <ChildIcon className="w-6" />
                      <p className="hidden md:block">{child.name}</p>
                    </Link>
                  )
                })}
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
