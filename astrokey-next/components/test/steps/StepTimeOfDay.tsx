'use client'

import { useAppStore } from '@/lib/store'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

const timesByLang: Record<string, { value: string; label: string; sub: string }[]> = {
  es: [
    { value: 'madrugada', label: 'Madrugada', sub: '0:00 – 6:00 · Místico e intuitivo' },
    { value: 'manana', label: 'Mañana', sub: '6:00 – 12:00 · Enérgico y proactivo' },
    { value: 'tarde', label: 'Tarde', sub: '12:00 – 20:00 · Social y reflexivo' },
    { value: 'noche', label: 'Noche', sub: '20:00 – 0:00 · Creativo e introspectivo' },
  ],
  en: [
    { value: 'madrugada', label: 'Dawn', sub: '0:00 – 6:00 · Mystical and intuitive' },
    { value: 'manana', label: 'Morning', sub: '6:00 – 12:00 · Energetic and proactive' },
    { value: 'tarde', label: 'Afternoon', sub: '12:00 – 20:00 · Social and reflective' },
    { value: 'noche', label: 'Night', sub: '20:00 – 0:00 · Creative and introspective' },
  ],
  fr: [
    { value: 'madrugada', label: 'Aube', sub: '0h – 6h · Mystique et intuitif' },
    { value: 'manana', label: 'Matin', sub: '6h – 12h · Énergique et proactif' },
    { value: 'tarde', label: 'Après-midi', sub: '12h – 20h · Social et réfléchi' },
    { value: 'noche', label: 'Nuit', sub: '20h – 0h · Créatif et introspectif' },
  ],
  de: [
    { value: 'madrugada', label: 'Morgengrauen', sub: '0 – 6 Uhr · Mystisch und intuitiv' },
    { value: 'manana', label: 'Morgen', sub: '6 – 12 Uhr · Energisch und proaktiv' },
    { value: 'tarde', label: 'Nachmittag', sub: '12 – 20 Uhr · Sozial und reflektiert' },
    { value: 'noche', label: 'Nacht', sub: '20 – 0 Uhr · Kreativ und introspektiv' },
  ],
  it: [
    { value: 'madrugada', label: 'Alba', sub: '0:00 – 6:00 · Mistico e intuitivo' },
    { value: 'manana', label: 'Mattino', sub: '6:00 – 12:00 · Energico e proattivo' },
    { value: 'tarde', label: 'Pomeriggio', sub: '12:00 – 20:00 · Sociale e riflessivo' },
    { value: 'noche', label: 'Notte', sub: '20:00 – 0:00 · Creativo e introspettivo' },
  ],
  uk: [
    { value: 'madrugada', label: 'Досвіток', sub: '0:00 – 6:00 · Містичний та інтуїтивний' },
    { value: 'manana', label: 'Ранок', sub: '6:00 – 12:00 · Енергійний та проактивний' },
    { value: 'tarde', label: 'День', sub: '12:00 – 20:00 · Соціальний та рефлексивний' },
    { value: 'noche', label: 'Ніч', sub: '20:00 – 0:00 · Творчий та інтроспективний' },
  ],
  ru: [
    { value: 'madrugada', label: 'Рассвет', sub: '0:00 – 6:00 · Мистический и интуитивный' },
    { value: 'manana', label: 'Утро', sub: '6:00 – 12:00 · Энергичный и проактивный' },
    { value: 'tarde', label: 'День', sub: '12:00 – 20:00 · Социальный и рефлексивный' },
    { value: 'noche', label: 'Ночь', sub: '20:00 – 0:00 · Творческий и интроспективный' },
  ],
}

const titlesByLang: Record<string, string> = {
  es: '¿Cuándo te sientes más plenamente vivo/a?',
  en: 'When do you feel most fully alive?',
  fr: 'Quand vous sentez-vous le plus pleinement vivant/e ?',
  de: 'Wann fühlst du dich am lebendigsten?',
  it: 'Quando ti senti più pienamente vivo/a?',
  uk: 'Коли ти почуваєшся найбільш живим/ою?',
  ru: 'Когда вы чувствуете себя наиболее живым/ой?',
}

// Gradientes y detalles visuales por momento del día
const timeVisuals = [
  { bg: 'from-indigo-950 to-violet-950', starColor: '#c4b5fd', moonColor: '#a78bfa', stars: true, sun: false },
  { bg: 'from-amber-950 to-orange-950', starColor: '#fde68a', moonColor: '#fbbf24', stars: false, sun: true },
  { bg: 'from-orange-950 to-yellow-950', starColor: '#fcd34d', moonColor: '#f59e0b', stars: false, sun: true },
  { bg: 'from-slate-950 to-indigo-950', starColor: '#818cf8', moonColor: '#6366f1', stars: true, sun: false },
]

function TimeIcon({ index, selected }: { index: number; selected: boolean }) {
  const v = timeVisuals[index]
  return (
    <div className={cn('w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center relative overflow-hidden flex-shrink-0', v.bg,
      selected ? 'ring-2 ring-primary-400' : '')}>
      {v.stars && (
        <>
          <div className="absolute top-1.5 right-2 w-1 h-1 rounded-full" style={{ background: v.starColor, opacity: 0.8 }} />
          <div className="absolute top-3 left-2 w-0.5 h-0.5 rounded-full" style={{ background: v.starColor, opacity: 0.6 }} />
          <div className="absolute bottom-2 right-3 w-0.5 h-0.5 rounded-full" style={{ background: v.starColor, opacity: 0.5 }} />
        </>
      )}
      {index === 0 && <span className="text-xl">🌙</span>}
      {index === 1 && <span className="text-xl">🌅</span>}
      {index === 2 && <span className="text-xl">☀️</span>}
      {index === 3 && <span className="text-xl">🌙</span>}
    </div>
  )
}

export default function StepTimeOfDay() {
  const { testAnswers, setTestAnswer } = useAppStore()
  const lang = useAppStore((s) => s.language)
  const options = timesByLang[lang] ?? timesByLang.es
  const title = titlesByLang[lang] ?? titlesByLang.es

  return (
    <div className="text-center">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <p className="text-xs text-accent-400 font-semibold uppercase tracking-widest mb-2">⏱ Cronobiología astral</p>
        <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
        <p className="text-sm text-white/40 mb-8">Tu hora de mayor energía revela aspectos clave de tu carta</p>
      </motion.div>

      <div className="grid grid-cols-2 gap-3 max-w-lg mx-auto">
        {options.map(({ value, label, sub }, i) => {
          const isSelected = testAnswers.timeOfDay === value
          return (
            <motion.button
              key={value}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.08 }}
              onClick={() => setTestAnswer('timeOfDay', value)}
              className={cn(
                'flex flex-col items-center gap-3 p-5 rounded-2xl border transition-all duration-200 text-center',
                isSelected
                  ? 'border-primary-500 bg-primary-500/10 shadow-lg shadow-primary-500/20 scale-105'
                  : 'border-white/10 hover:border-primary-500/40 hover:bg-white/5'
              )}
            >
              <TimeIcon index={i} selected={isSelected} />
              <p className={cn('font-bold text-sm', isSelected ? 'text-white' : 'text-white/80')}>{label}</p>
              <p className="text-[11px] text-white/35 leading-tight">{sub}</p>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
