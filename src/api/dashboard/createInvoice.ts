'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { sql } from '@vercel/postgres'

import { InvoiceFormSchema } from './schemas/invoiceFormSchema'

const CreateInvoice = InvoiceFormSchema.omit({ id: true, date: true })

export async function createInvoice(revalidateRedirectPath: string, formData: FormData) {
  const { customerId, amount, status } = CreateInvoice.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status')
  })

  const amountInCents = amount * 100
  const date = new Date().toISOString().split('T')[0]

  try {
    await sql`
      INSERT INTO invoices (customer_id, amount, status, date)
      VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `
  } catch (error) {
    console.error('Database Error: Failed to Create Invoice.', error)
    return {
      message: 'Database Error: Failed to Create Invoice.'
    }
  }
  revalidatePath('/dashboard/invoices')
  redirect('/dashboard/invoices')
}
