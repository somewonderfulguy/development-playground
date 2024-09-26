import { createI18nServer } from 'next-international/server'

export const { getI18n, getScopedI18n, getStaticParams } = createI18nServer({
  en: () => import('./en'),
  jp: () => import('./jp'),
  pl: () => import('./pl'),
  ua: () => import('./ua')
})
