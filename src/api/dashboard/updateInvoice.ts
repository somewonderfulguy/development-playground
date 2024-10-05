'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { sql } from '@vercel/postgres'

import { InvoiceFormSchema } from './schemas/invoiceFormSchema'

const UpdateInvoice = InvoiceFormSchema.omit({ id: true, date: true })

export async function updateInvoice(id: string, revalidateRedirectPath: string, formData: FormData) {
  const { customerId, amount, status } = UpdateInvoice.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status')
  })

  const amountInCents = amount * 100

  try {
    await sql`
    UPDATE invoices
    SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
    WHERE id = ${id}
  `
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return { message: 'Database Error: Failed to Update Invoice.' }
  }
  revalidatePath(revalidateRedirectPath)
  redirect(revalidateRedirectPath)
}
