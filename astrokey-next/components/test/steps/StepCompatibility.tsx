'use client'

import { useAppStore } from '@/lib/store'
import { cn } from '@/lib/utils'
import { getSignIcon } from '@/lib/astrology'

const signs = [
  'Aries', 'Tauro', 'Géminis', 'Cáncer', 'Leo', 'Virgo',
  'Libra', 'Escorpio', 'Sagitario', 'Capricornio', 'Acuario', 'Piscis',
]

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
      <h2 className="text-2xl font-bold text-white mb-2">
        ¿Con qué signos te llevas bien?
      </h2>
      <p className="text-sm text-white/40 mb-8">Elige 3 opciones como máximo</p>

      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 max-w-lg mx-auto">
        {signs.map((sign) => (
          <button
            key={sign}
            onClick={() => toggle(sign)}
            className={cn(
              'flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all duration-200',
              testAnswers.compatibleSigns.includes(sign)
                ? 'border-primary-500 bg-primary-500/10 shadow-lg shadow-primary-500/20'
                : 'border-white/10 hover:border-primary-500/50 hover:bg-white/5',
              testAnswers.compatibleSigns.length >= 3 && !testAnswers.compatibleSigns.includes(sign)
                ? 'opacity-40 cursor-not-allowed'
                : ''
            )}
          >
            <span className="text-2xl">{getSignIcon(sign)}</span>
            <span className="text-xs font-medium text-white/80">{sign}</span>
          </button>
        ))}
      </div>

      <p className="mt-4 text-sm text-white/30">
        {testAnswers.compatibleSigns.length}/3 seleccionados
      </p>
    </div>
  )
}
