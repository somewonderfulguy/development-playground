import type { Metadata } from 'next'
import { getScopedI18n } from '@/locales/server'

export async function generateMetadata() {
  const t = await getScopedI18n('home')
  return {
    title: t('title')
  } satisfies Metadata
}

export default function HomePage() {
  return <div className="flex h-full min-h-full items-center justify-center">Hello...</div>
}
