'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'
import { useT } from '@/lib/i18n'
import LanguageSelector from '@/components/ui/LanguageSelector'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const pathname = usePathname()
  const t = useT()

  const navLinks = [
    { href: '/', label: t.nav.home },
    { href: '/intro', label: t.nav.test },
    { href: '/#precios', label: t.nav.prices },
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
        <Link href="/" className="flex items-center gap-3 group">
          <Sparkles className="w-7 h-7 text-white" />
          <span className="text-xl font-bold text-white">AstroKey</span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'relative text-sm font-medium transition-colors duration-200 py-2',
                pathname === link.href ? 'text-white' : 'text-white/60 hover:text-white'
              )}
            >
              {link.label}
              {pathname === link.href && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-gradient-primary rounded-full"
                />
              )}
            </Link>
          ))}

          <LanguageSelector />

          <Link href="/intro" className="btn-primary !px-6 !py-2.5 text-sm">
            <Sparkles className="w-4 h-4" />
            {t.nav.doTest}
          </Link>
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
                <Link key={link.href} href={link.href}
                  className="text-lg font-medium text-white/70 hover:text-white transition-colors py-2">
                  {link.label}
                </Link>
              ))}
              <Link href="/intro" className="btn-primary justify-center mt-2">
                <Sparkles className="w-4 h-4" />
                {t.nav.doTestFree}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
