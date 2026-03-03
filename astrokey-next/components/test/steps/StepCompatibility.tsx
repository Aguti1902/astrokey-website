'use client'

import { useAppStore } from '@/lib/store'
import { cn } from '@/lib/utils'

const signs = [
  { name: 'Aries', symbol: 'AR', dates: '21 Mar' },
  { name: 'Tauro', symbol: 'TA', dates: '21 Abr' },
  { name: 'Géminis', symbol: 'GE', dates: '22 May' },
  { name: 'Cáncer', symbol: 'CA', dates: '22 Jun' },
  { name: 'Leo', symbol: 'LE', dates: '23 Jul' },
  { name: 'Virgo', symbol: 'VI', dates: '23 Ago' },
  { name: 'Libra', symbol: 'LI', dates: '23 Sep' },
  { name: 'Escorpio', symbol: 'ES', dates: '24 Oct' },
  { name: 'Sagitario', symbol: 'SA', dates: '23 Nov' },
  { name: 'Capricornio', symbol: 'CP', dates: '22 Dic' },
  { name: 'Acuario', symbol: 'AC', dates: '21 Ene' },
  { name: 'Piscis', symbol: 'PI', dates: '19 Feb' },
]

// SVG paths para cada signo zodiacal (estilo línea)
function ZodiacSVG({ name, selected }: { name: string; selected: boolean }) {
  const color = selected ? '#818cf8' : 'rgba(255,255,255,0.25)'
  const sw = selected ? 1.8 : 1.4

  const paths: Record<string, JSX.Element> = {
    Aries: (
      <svg viewBox="0 0 40 40" fill="none" className="w-9 h-9">
        <path d="M20 28 C20 20 12 14 8 10 M20 28 C20 20 28 14 32 10 M20 28 L20 32" stroke={color} strokeWidth={sw} strokeLinecap="round" />
        <circle cx="8" cy="8" r="3" stroke={color} strokeWidth={sw} />
        <circle cx="32" cy="8" r="3" stroke={color} strokeWidth={sw} />
      </svg>
    ),
    Tauro: (
      <svg viewBox="0 0 40 40" fill="none" className="w-9 h-9">
        <circle cx="20" cy="22" r="9" stroke={color} strokeWidth={sw} />
        <path d="M11 22 C11 16 14 12 20 10 C26 12 29 16 29 22" stroke={color} strokeWidth={sw} strokeLinecap="round" />
        <path d="M13 12 C10 10 7 9 5 11 M27 12 C30 10 33 9 35 11" stroke={color} strokeWidth={sw} strokeLinecap="round" />
      </svg>
    ),
    Géminis: (
      <svg viewBox="0 0 40 40" fill="none" className="w-9 h-9">
        <line x1="12" y1="8" x2="28" y2="8" stroke={color} strokeWidth={sw} strokeLinecap="round" />
        <line x1="12" y1="32" x2="28" y2="32" stroke={color} strokeWidth={sw} strokeLinecap="round" />
        <path d="M15 8 C12 14 12 26 15 32" stroke={color} strokeWidth={sw} strokeLinecap="round" />
        <path d="M25 8 C28 14 28 26 25 32" stroke={color} strokeWidth={sw} strokeLinecap="round" />
      </svg>
    ),
    Cáncer: (
      <svg viewBox="0 0 40 40" fill="none" className="w-9 h-9">
        <path d="M8 18 C8 12 14 8 20 8 C26 8 32 12 32 18" stroke={color} strokeWidth={sw} strokeLinecap="round" />
        <path d="M8 22 C8 28 14 32 20 32 C26 32 32 28 32 22" stroke={color} strokeWidth={sw} strokeLinecap="round" />
        <circle cx="7" cy="20" r="2.5" stroke={color} strokeWidth={sw} />
        <circle cx="33" cy="20" r="2.5" stroke={color} strokeWidth={sw} />
      </svg>
    ),
    Leo: (
      <svg viewBox="0 0 40 40" fill="none" className="w-9 h-9">
        <circle cx="16" cy="14" r="6" stroke={color} strokeWidth={sw} />
        <path d="M22 14 C28 14 32 18 32 24 C32 30 28 33 24 33 C20 33 17 30 17 27" stroke={color} strokeWidth={sw} strokeLinecap="round" />
        <path d="M24 33 C24 35 25 36 26 37" stroke={color} strokeWidth={sw} strokeLinecap="round" />
        <path d="M26 37 L24 37" stroke={color} strokeWidth={sw} strokeLinecap="round" />
      </svg>
    ),
    Virgo: (
      <svg viewBox="0 0 40 40" fill="none" className="w-9 h-9">
        <path d="M10 8 L10 26 C10 30 13 33 17 33" stroke={color} strokeWidth={sw} strokeLinecap="round" />
        <path d="M20 8 L20 26 C20 30 23 33 27 33 C31 33 32 30 32 28" stroke={color} strokeWidth={sw} strokeLinecap="round" />
        <path d="M30 8 L30 24" stroke={color} strokeWidth={sw} strokeLinecap="round" />
        <path d="M10 18 L30 18" stroke={color} strokeWidth={sw} strokeLinecap="round" />
      </svg>
    ),
    Libra: (
      <svg viewBox="0 0 40 40" fill="none" className="w-9 h-9">
        <line x1="8" y1="30" x2="32" y2="30" stroke={color} strokeWidth={sw} strokeLinecap="round" />
        <line x1="8" y1="22" x2="32" y2="22" stroke={color} strokeWidth={sw} strokeLinecap="round" />
        <path d="M20 22 C20 18 14 14 14 18" stroke={color} strokeWidth={sw} strokeLinecap="round" />
        <path d="M11 22 L11 30 M29 22 L29 30" stroke={color} strokeWidth={sw} strokeLinecap="round" />
        <path d="M20 22 C20 18 26 14 26 18" stroke={color} strokeWidth={sw} strokeLinecap="round" />
      </svg>
    ),
    Escorpio: (
      <svg viewBox="0 0 40 40" fill="none" className="w-9 h-9">
        <path d="M10 8 L10 26 C10 30 13 33 17 33" stroke={color} strokeWidth={sw} strokeLinecap="round" />
        <path d="M20 8 L20 26 C20 30 23 33 27 33" stroke={color} strokeWidth={sw} strokeLinecap="round" />
        <path d="M30 8 L30 33 L34 29" stroke={color} strokeWidth={sw} strokeLinecap="round" />
        <path d="M30 33 L26 29" stroke={color} strokeWidth={sw} strokeLinecap="round" />
        <path d="M10 18 L30 18" stroke={color} strokeWidth={sw} strokeLinecap="round" />
      </svg>
    ),
    Sagitario: (
      <svg viewBox="0 0 40 40" fill="none" className="w-9 h-9">
        <path d="M10 30 L30 10" stroke={color} strokeWidth={sw} strokeLinecap="round" />
        <path d="M30 10 L20 10 M30 10 L30 20" stroke={color} strokeWidth={sw} strokeLinecap="round" />
        <path d="M20 30 L20 26" stroke={color} strokeWidth={sw} strokeLinecap="round" />
        <path d="M16 30 L24 30" stroke={color} strokeWidth={sw} strokeLinecap="round" />
      </svg>
    ),
    Capricornio: (
      <svg viewBox="0 0 40 40" fill="none" className="w-9 h-9">
        <path d="M10 10 L10 28 C10 31 12 33 15 33 C18 33 20 31 20 28 C20 25 18 23 15 23" stroke={color} strokeWidth={sw} strokeLinecap="round" />
        <path d="M20 20 C22 16 28 14 32 18 C36 22 34 28 30 30 C27 32 24 31 22 28" stroke={color} strokeWidth={sw} strokeLinecap="round" />
        <path d="M10 10 C12 8 16 8 18 10" stroke={color} strokeWidth={sw} strokeLinecap="round" />
      </svg>
    ),
    Acuario: (
      <svg viewBox="0 0 40 40" fill="none" className="w-9 h-9">
        <path d="M8 16 C11 13 14 19 17 16 C20 13 23 19 26 16 C29 13 32 19 32 16" stroke={color} strokeWidth={sw} strokeLinecap="round" />
        <path d="M8 24 C11 21 14 27 17 24 C20 21 23 27 26 24 C29 21 32 27 32 24" stroke={color} strokeWidth={sw} strokeLinecap="round" />
      </svg>
    ),
    Piscis: (
      <svg viewBox="0 0 40 40" fill="none" className="w-9 h-9">
        <path d="M8 20 C8 14 12 8 20 8 C28 8 32 14 32 20" stroke={color} strokeWidth={sw} strokeLinecap="round" />
        <path d="M8 20 C8 26 12 32 20 32 C28 32 32 26 32 20" stroke={color} strokeWidth={sw} strokeLinecap="round" />
        <line x1="12" y1="20" x2="28" y2="20" stroke={color} strokeWidth={sw} strokeLinecap="round" />
      </svg>
    ),
  }

  return paths[name] ?? <span className="text-2xl" style={{ color }}>{name.slice(0, 2)}</span>
}

export default function StepCompatibility() {
  const { testAnswers, setTestAnswer } = useAppStore()

  const toggle = (sign: string) => {
    const current = testAnswers.compatibleSigns
    if (current.includes(sign)) {
      setTestAnswer('compatibleSigns', current.filter((s) => s !== sign))
    } else if (current.length < 3) {
      setTestAnswer('compatibleSigns', [...current, sign])
    }
  }

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold text-white mb-2">¿Con qué signos te llevas bien?</h2>
      <p className="text-sm text-white/40 mb-8">Elige 3 opciones como máximo</p>

      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 sm:gap-3 max-w-lg mx-auto">
        {signs.map(({ name, dates }) => {
          const selected = testAnswers.compatibleSigns.includes(name)
          const disabled = testAnswers.compatibleSigns.length >= 3 && !selected

          return (
            <button
              key={name}
              onClick={() => toggle(name)}
              disabled={disabled}
              className={cn(
                'flex flex-col items-center gap-2 py-4 px-2 rounded-2xl border transition-all duration-200',
                selected
                  ? 'border-primary-500 bg-primary-500/10 shadow-lg shadow-primary-500/20'
                  : 'border-white/10 hover:border-primary-500/50 hover:bg-white/5',
                disabled && 'opacity-30 cursor-not-allowed'
              )}
            >
              <ZodiacSVG name={name} selected={selected} />
              <span className="text-xs font-semibold text-white/80 leading-tight">{name}</span>
              <span className="text-[10px] text-white/30">{dates}</span>
            </button>
          )
        })}
      </div>

      <p className="mt-4 text-sm text-white/30">
        {testAnswers.compatibleSigns.length}/3 seleccionados
      </p>
    </div>
  )
}
