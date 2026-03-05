'use client'

import { useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Menu, X, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'
import { useT } from '@/lib/i18n'
import { useAppStore } from '@/lib/store'
import LocaleLink from '@/components/ui/LocaleLink'
import { LOCALES } from '@/middleware'

// LanguageSelector con cambio de URL
function LanguageSelector() {
  const { language, setLanguage } = useAppStore()
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  const options = [
    { code: 'es', label: 'Español', flag: '🇪🇸' },
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
    { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
    { code: 'it', label: 'Italiano', flag: '🇮🇹' },
    { code: 'uk', label: 'Українська', flag: '🇺🇦' },
    { code: 'ru', label: 'Русский', flag: '🇷🇺' },
  ]

  const current = options.find((o) => o.code === language) ?? options[0]

  const changeLocale = (code: string) => {
    setLanguage(code)
    setOpen(false)
    // Cambiar el prefijo de locale en la URL actual
    const segments = pathname.split('/')
    const hasLocale = (LOCALES as readonly string[]).includes(segments[1])
    const rest = hasLocale ? segments.slice(2).join('/') : segments.slice(1).join('/')
    router.push(`/${code}${rest ? `/${rest}` : ''}`)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors text-sm text-white/70 hover:text-white"
      >
        <span>{current.flag}</span>
        <span className="hidden sm:inline font-medium text-xs">{current.code.toUpperCase()}</span>
        <svg className={`w-3 h-3 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-1.5 z-50 bg-cosmic-dark/98 border border-white/10 rounded-xl shadow-2xl backdrop-blur-xl overflow-hidden min-w-[160px]">
            {options.map((opt) => (
              <button
                key={opt.code}
                onClick={() => changeLocale(opt.code)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors text-left hover:bg-white/5 ${language === opt.code ? 'text-primary-400 bg-primary-500/10' : 'text-white/60'}`}
              >
                <span className="text-base">{opt.flag}</span>
                <span className="font-medium">{opt.label}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const pathname = usePathname()
  const t = useT()
  const language = useAppStore((s) => s.language)

  // Extraer la ruta sin el prefijo de locale para comparar el active
  const pathWithoutLocale = pathname.replace(/^\/(es|en|fr|de|it|uk|ru)/, '') || '/'

  const navLinks = [
    { href: '/', label: t.nav.home },
    { href: '/intro', label: t.nav.test },
    { href: `/#precios`, label: t.nav.prices },
  ]

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setIsMobileOpen(false)
  }, [pathname])

  return (
    <header
      className={cn(
        'fixed top-0 w-full z-50 transition-all duration-300',
        isScrolled
          ? 'bg-cosmic-dark/95 backdrop-blur-xl border-b border-white/10 shadow-2xl'
          : 'bg-transparent'
      )}
    >
      <nav className="section-container flex items-center justify-between h-20">
        <LocaleLink href="/" className="flex items-center gap-3 group">
          <Sparkles className="w-7 h-7 text-white" />
          <span className="text-xl font-bold text-white">AstroKey</span>
        </LocaleLink>

        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => {
            const isActive = pathWithoutLocale === link.href
            return (
              <LocaleLink
                key={link.href}
                href={link.href}
                className={cn(
                  'relative text-sm font-medium transition-colors duration-200 py-2',
                  isActive ? 'text-white' : 'text-white/60 hover:text-white'
                )}
              >
                {link.label}
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-gradient-primary rounded-full"
                  />
                )}
              </LocaleLink>
            )
          })}

          <LanguageSelector />

          <LocaleLink href="/intro" className="btn-primary !px-6 !py-2.5 text-sm">
            <Sparkles className="w-4 h-4" />
            {t.nav.doTest}
          </LocaleLink>
        </div>

        <div className="md:hidden flex items-center gap-3">
          <LanguageSelector />
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="p-2 text-white/70 hover:text-white transition-colors"
          >
            {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-cosmic-dark/98 backdrop-blur-xl border-t border-white/10"
          >
            <div className="section-container py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <LocaleLink key={link.href} href={link.href}
                  className="text-lg font-medium text-white/70 hover:text-white transition-colors py-2">
                  {link.label}
                </LocaleLink>
              ))}
              <LocaleLink href="/intro" className="btn-primary justify-center mt-2">
                <Sparkles className="w-4 h-4" />
                {t.nav.doTestFree}
              </LocaleLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
