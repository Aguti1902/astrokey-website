'use client'

import Link from 'next/link'
import { useAppStore } from '@/lib/store'
import type { ComponentProps } from 'react'

type Props = ComponentProps<typeof Link>

/**
 * Wrapper de Link que añade automáticamente el prefijo de locale.
 * Uso: <LocaleLink href="/test"> en vez de <Link href="/test">
 */
export default function LocaleLink({ href, ...props }: Props) {
  const language = useAppStore((s) => s.language)

  const localizedHref =
    typeof href === 'string' && href.startsWith('/')
      ? `/${language}${href}`
      : href

  return <Link href={localizedHref} {...props} />
}
