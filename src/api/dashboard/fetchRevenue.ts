import { sql } from '@vercel/postgres'
import { unstable_noStore as noStore } from 'next/cache'

import { Revenue } from '@/types/revenue'

export async function fetchRevenue() {
  noStore()

  try {
    // Artificially delay a response for demo purposes.
    // Don't do this in production :)
    await new Promise((resolve) => setTimeout(resolve, 3000))

    const data = await sql<Revenue>`SELECT * FROM revenue`

    return data.rows
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch revenue data.')
  }
}
