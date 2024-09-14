import { sql } from '@vercel/postgres'
import { unstable_noStore as noStore } from 'next/cache'

import { InvoiceForm } from '@/types/invoice'

export async function fetchInvoiceById(id: string) {
  noStore()

  try {
    const data = await sql<InvoiceForm>`
      SELECT
        invoices.id,
        invoices.customer_id,
        invoices.amount,
        invoices.status
      FROM invoices
      WHERE invoices.id = ${id};
    `

    const invoice = data.rows.map((invoice) => ({
      ...invoice,
      // Convert amount from cents to dollars
      amount: invoice.amount / 100
    }))

    return invoice[0]
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch invoice.')
  }
}
