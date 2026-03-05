import { NextRequest, NextResponse } from 'next/server'

export const LOCALES = ['es', 'en', 'fr', 'de', 'it', 'uk', 'ru'] as const
export const DEFAULT_LOCALE = 'es'
export type SupportedLocale = typeof LOCALES[number]

function getLocaleFromPath(pathname: string): SupportedLocale | null {
  const segment = pathname.split('/')[1]
  return (LOCALES as readonly string[]).includes(segment)
    ? (segment as SupportedLocale)
    : null
}

function detectLocale(request: NextRequest): SupportedLocale {
  // 1. Cookie guardada previamente
  const cookie = request.cookies.get('NEXT_LOCALE')?.value
  if (cookie && (LOCALES as readonly string[]).includes(cookie)) {
    return cookie as SupportedLocale
  }
  // 2. Header Accept-Language del navegador
  const accept = request.headers.get('accept-language') || ''
  for (const part of accept.split(',')) {
    const lang = part.trim().split(';')[0].split('-')[0].toLowerCase()
    if ((LOCALES as readonly string[]).includes(lang)) {
      return lang as SupportedLocale
    }
  }
  return DEFAULT_LOCALE
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Ignorar rutas de sistema / ficheros estáticos
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon') ||
    pathname.startsWith('/icon') ||
    pathname.startsWith('/apple-icon') ||
    pathname.startsWith('/manifest') ||
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  const localeInPath = getLocaleFromPath(pathname)

  if (localeInPath) {
    // URL ya tiene locale → rewrite internamente quitando el prefijo
    const stripped = pathname.replace(`/${localeInPath}`, '') || '/'
    const rewriteUrl = request.nextUrl.clone()
    rewriteUrl.pathname = stripped

    const response = NextResponse.rewrite(rewriteUrl)
    // Actualizar cookie con el locale de la URL
    response.cookies.set('NEXT_LOCALE', localeInPath, {
      maxAge: 365 * 24 * 60 * 60,
      path: '/',
    })
    return response
  } else {
    // URL sin locale → detectar y redirigir a /{locale}{pathname}
    const locale = detectLocale(request)
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = `/${locale}${pathname === '/' ? '' : pathname}`
    return NextResponse.redirect(redirectUrl)
  }
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|icon.svg|apple-icon.svg|manifest.json).*)'],
}
