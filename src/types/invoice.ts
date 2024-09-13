export type LatestInvoice = {
  id: string
  name: string
  image_url: string
  email: string
  amount: string
}

// The database returns a number for amount, but we later format it to a string with the formatCurrency function
export type LatestInvoiceRaw = Omit<LatestInvoice, 'amount'> & {
  amount: number
}

export type InvoicesTable = {
  id: string
  customer_id: string
  name: string
  email: string
  image_url: string
  date: string
  amount: number
  status: 'pending' | 'paid'
}

export type CustomerField = {
  id: string
  name: string
}
