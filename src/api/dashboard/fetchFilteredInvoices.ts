import { sql } from '@vercel/postgres'
import { unstable_noStore as noStore } from 'next/cache'

import { InvoicesTable } from '@/types/invoice'
import { ITEMS_PER_PAGE } from '@/constants/common'

export async function fetchFilteredInvoices(query: string, currentPage: number) {
  noStore()

  const offset = (currentPage - 1) * ITEMS_PER_PAGE

  try {
    const invoices = await sql<InvoicesTable>`
      SELECT
        invoices.id,
        invoices.amount,
        invoices.date,
        invoices.status,
        customers.name,
        customers.email,
        customers.image_url
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      WHERE
        customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`} OR
        invoices.amount::text ILIKE ${`%${query}%`} OR
        invoices.date::text ILIKE ${`%${query}%`} OR
        invoices.status ILIKE ${`%${query}%`}
      ORDER BY invoices.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `

    return invoices.rows
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch invoices.')
  }
}
