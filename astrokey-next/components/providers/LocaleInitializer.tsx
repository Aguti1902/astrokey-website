'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { useAppStore } from '@/lib/store'
import { LOCALES, type SupportedLocale } from '@/middleware'

/**
 * Lee el locale del prefijo de la URL (/es/, /en/, etc.)
 * y lo sincroniza con el Zustand store.
 */
export default function LocaleInitializer() {
  const pathname = usePathname()
  const setLanguage = useAppStore((s) => s.setLanguage)

  useEffect(() => {
    const segment = pathname.split('/')[1] as SupportedLocale
    if ((LOCALES as readonly string[]).includes(segment)) {
      setLanguage(segment)
    }
  }, [pathname, setLanguage])

  return null
}
