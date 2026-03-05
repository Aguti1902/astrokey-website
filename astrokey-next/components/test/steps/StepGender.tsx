'use client'

import { useAppStore } from '@/lib/store'
import { cn } from '@/lib/utils'
import { useT } from '@/lib/i18n'
import { motion } from 'framer-motion'

function FemaleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
      <circle cx="12" cy="8" r="5" /><line x1="12" y1="13" x2="12" y2="21" /><line x1="9" y1="18" x2="15" y2="18" />
    </svg>
  )
}
function MaleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
      <circle cx="10" cy="14" r="5" /><line x1="21" y1="3" x2="15" y2="9" /><polyline points="15,3 21,3 21,9" />
    </svg>
  )
}
function NonBinaryIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
      <circle cx="12" cy="11" r="5" /><line x1="12" y1="16" x2="12" y2="21" /><line x1="9" y1="19" x2="15" y2="19" />
      <line x1="18" y1="3" x2="12" y2="7" /><line x1="6" y1="3" x2="12" y2="7" />
    </svg>
  )
}

export default function StepGender() {
  const { testAnswers, setTestAnswer } = useAppStore()
  const t = useT()

  const options = [
    { value: 'mujer', label: t.test.female, Icon: FemaleIcon },
    { value: 'hombre', label: t.test.male, Icon: MaleIcon },
    { value: 'no-binario', label: t.test.nonBinary, Icon: NonBinaryIcon },
  ]

  return (
    <div className="text-center">

      {/* ── Título hero solo en el paso 1 ───────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-10"
      >
        {/* Decoración de estrellas */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-primary-500/50" />
          <svg viewBox="0 0 20 20" className="w-4 h-4 text-accent-400 fill-current">
            <path d="M10 1l2.4 6.8H20l-5.8 4.2 2.2 6.8L10 14.5l-6.4 4.3 2.2-6.8L0 7.8h7.6z"/>
          </svg>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-primary-500/50" />
        </div>

        {/* Título principal */}
        <h1 className="text-4xl sm:text-5xl font-black leading-tight tracking-tight">
          <span className="block text-white/90">{(t.test as any).heroTitle?.split(' ').slice(0, -2).join(' ') || 'Descubre tu'}</span>
          <span className="block bg-gradient-to-r from-primary-400 via-violet-400 to-accent-400 bg-clip-text text-transparent pb-1">
            {(t.test as any).heroTitle?.split(' ').slice(-2).join(' ') || 'Carta Natal'}
          </span>
        </h1>

        {/* Subtitle decorativa */}
        <p className="mt-3 text-sm text-white/35 tracking-widest uppercase">
          ✦ &nbsp; {t.test.genderPre} &nbsp; ✦
        </p>
      </motion.div>

      {/* ── Pregunta ─────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2 className="text-xl font-semibold text-white/80 mb-8">{t.test.genderTitle}</h2>

        <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
          {options.map(({ value, label, Icon }) => {
            const selected = testAnswers.gender === value
            return (
              <button
                key={value}
                onClick={() => setTestAnswer('gender', value)}
                className={cn(
                  'flex flex-col items-center gap-3 p-6 rounded-2xl border transition-all duration-200',
                  selected
                    ? 'border-primary-500 bg-primary-500/10 shadow-lg shadow-primary-500/20 scale-105'
                    : 'border-white/10 hover:border-primary-500/50 hover:bg-white/5'
                )}
              >
                <span className={cn('transition-colors', selected ? 'text-primary-400' : 'text-white/40')}>
                  <Icon />
                </span>
                <span className="text-sm font-medium text-white/80">{label}</span>
              </button>
            )
          })}
        </div>
      </motion.div>

    </div>
  )
}
