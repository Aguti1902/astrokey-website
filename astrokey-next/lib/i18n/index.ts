'use client'

import { useAppStore } from '@/lib/store'
import { translations, type Locale } from './locales'

export function useT() {
  const language = useAppStore((s) => s.language)
  const t = translations[language as Locale] ?? translations.es
  return t
}

export { translations, type Locale }
export { LOCALES } from './locales'
