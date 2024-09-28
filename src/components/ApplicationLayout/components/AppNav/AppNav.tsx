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
  { name: 'FC Clubs', href: '/fc-clubs', icon: BiFootball },
  { name: 'Error example', href: '/error-example', icon: ExclamationCircleIcon },
  { name: 'Not found example', href: '/path-that-does-not-exist', icon: QuestionMarkCircleIcon },
  { name: 'About', href: '/about', icon: WindowIcon }
]

export default function AppNav() {
  const pathname = usePathname()

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
      {/*
        <li>
          <Link href="/" className="flex items-center p-2 rounded-lg hover:bg-primary/[0.05]">
            <HomeIcon className="h-5 w-5 mr-3" />
            <span>Home</span>
          </Link>
        </li>
        <li>
          <button
            className="flex items-center justify-between w-full p-2 rounded-lg hover:bg-primary/[0.05]"
          >
            <div className="flex items-center">
              <LayoutDashboardIcon className="h-5 w-5 mr-3" />
              <span>Dashboard</span>
            </div>
            <ChevronDownIcon className="h-4 w-4" /> : <ChevronRightIcon className="h-4 w-4" />
          </button>
          <ul className="ml-6 mt-2 space-y-2">
            <li>
              <Link href="/dashboard" className="flex items-center p-2 rounded-lg hover:bg-primary/[0.05]">
                <span>Main</span>
              </Link>
            </li>
            <li>
              <Link href="/dashboard/invoices" className="flex items-center p-2 rounded-lg hover:bg-primary/[0.05]">
                <span>Invoices</span>
              </Link>
            </li>
            <li>
              <Link href="/dashboard/customers" className="flex items-center p-2 rounded-lg hover:bg-primary/[0.05]">
                <span>Customers</span>
              </Link>
            </li>
          </ul>
        </li>
        <li>
          <Link href="/chat-gpt" className="flex items-center p-2 rounded-lg hover:bg-primary/[0.05]">
            <MessageSquareIcon className="h-5 w-5 mr-3" />
            <span>ChatGPT</span>
          </Link>
        </li>
        <li>
          <Link href="/fc-clubs" className="flex items-center p-2 rounded-lg hover:bg-primary/[0.05]">
            <ShieldIcon className="h-5 w-5 mr-3" />
            <span>FC clubs</span>
          </Link>
        </li>
        <li>
          <Link href="/about" className="flex items-center p-2 rounded-lg hover:bg-primary/[0.05]">
            <InfoIcon className="h-5 w-5 mr-3" />
            <span>About</span>
          </Link>
        </li>*/}
    </nav>
  )
}
