import { Suspense } from 'react'
import Link from 'next/link'
import { PlusIcon } from '@heroicons/react/24/outline'

import Pagination from './components/Pagination'
import Search from './components/Search'
import Table from './components/Table'
import { fetchInvoicesPages } from '@/api/dashboard/fetchInvoicesPages'
import { lusitana } from '@/constants/fonts'
import InvoicesTableSkeleton from './components/InvoicesTableSkeleton'

export default async function Page({
  searchParams
}: {
  searchParams?: {
    query?: string
    page?: string
  }
}) {
  const query = searchParams?.query || ''
  const currentPage = Number(searchParams?.page) || 1

  const totalPages = await fetchInvoicesPages(query)

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Invoices</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search invoices..." />
        <Link
          href="/dashboard/invoices/create"
          className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          <span className="hidden md:block">Create Invoice</span> <PlusIcon className="h-5 md:ml-4" />
        </Link>
      </div>
      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  )
}
