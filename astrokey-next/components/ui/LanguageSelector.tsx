'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { useAppStore } from '@/lib/store'
import { LOCALES } from '@/lib/i18n'

export default function LanguageSelector() {
  const { language, setLanguage } = useAppStore()
  const [open, setOpen] = useState(false)

  const current = LOCALES.find((l) => l.code === language) ?? LOCALES[0]

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors text-sm text-white/70 hover:text-white"
      >
        <span>{current.flag}</span>
        <span className="hidden sm:inline font-medium">{current.code.toUpperCase()}</span>
        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-1.5 z-50 bg-cosmic-dark/98 border border-white/10 rounded-xl shadow-2xl backdrop-blur-xl overflow-hidden min-w-[160px]">
            {LOCALES.map((locale) => (
              <button
                key={locale.code}
                onClick={() => { setLanguage(locale.code); setOpen(false) }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors text-left hover:bg-white/5 ${language === locale.code ? 'text-primary-400 bg-primary-500/10' : 'text-white/60'}`}
              >
                <span className="text-base">{locale.flag}</span>
                <span className="font-medium">{locale.label}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
