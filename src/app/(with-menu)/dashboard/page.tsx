import { Suspense } from 'react'

import RevenueChartSkeleton from './components/skeletons/RevenueChartSkeleton'
import LatestInvoicesSkeleton from './components/skeletons/LatestInvoicesSkeleton'
import CardsSkeleton from './components/skeletons/CardsSkeleton'
import RevenueChart from './components/RevenueChart'
import LatestInvoices from './components/LatestInvoices'
import Cards from './components/Cards'
import { lusitana } from '@/constants/fonts'

export default async function DashboardPage() {
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>Dashboard</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense
          fallback={
            <>
              <CardsSkeleton />
              <CardsSkeleton />
              <CardsSkeleton />
              <CardsSkeleton />
            </>
          }
        >
          <Cards />
        </Suspense>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChart />
        </Suspense>
        <Suspense fallback={<LatestInvoicesSkeleton />}>
          <LatestInvoices />
        </Suspense>
      </div>
    </main>
  )
}
