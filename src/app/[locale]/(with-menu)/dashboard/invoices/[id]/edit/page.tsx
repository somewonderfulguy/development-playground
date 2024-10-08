import { notFound } from 'next/navigation'
import { Metadata } from 'next'

import { fetchCustomers } from '@/api/dashboard/fetchCustomers'
import { fetchInvoiceById } from '@/api/dashboard/fetchInvoiceById'
import Breadcrumbs from '../../../components/Breadcrumbs/Breadcrumbs'
import EditInvoiceForm from './components/EditInvoiceForm'

export const metadata: Metadata = {
  title: 'Edit Invoice'
}

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params

  const [invoice, customers] = await Promise.all([fetchInvoiceById(id), fetchCustomers()])

  if (!invoice) {
    notFound()
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          {
            label: 'Edit Invoice',
            href: `/dashboard/invoices/${id}/edit`,
            active: true
          }
        ]}
      />
      <EditInvoiceForm invoice={invoice} customers={customers} />
    </main>
  )
}
