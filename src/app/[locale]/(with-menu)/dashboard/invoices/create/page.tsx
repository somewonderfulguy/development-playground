import { fetchCustomers } from '@/api/dashboard/fetchCustomers'
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs'
import CreateInvoiceForm from './components/CreateInvoiceForm'

export default async function Page() {
  const customers = await fetchCustomers()

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          {
            label: 'Create Invoice',
            href: '/dashboard/invoices/create',
            active: true
          }
        ]}
      />
      <CreateInvoiceForm customers={customers} />
    </main>
  )
}
