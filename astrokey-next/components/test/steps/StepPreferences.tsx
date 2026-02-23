'use client'

import { useAppStore } from '@/lib/store'
import { cn } from '@/lib/utils'

const options = [
  { value: 'predicciones-diarias', label: 'Predicciones diarias', icon: '📅' },
  { value: 'analisis-compatibilidad', label: 'Análisis de compatibilidad', icon: '💞' },
  { value: 'consejos-personales', label: 'Consejos personales', icon: '💡' },
  { value: 'educacion-astrologica', label: 'Educación astrológica', icon: '📚' },
  { value: 'rituales-luna', label: 'Rituales de luna', icon: '🌙' },
  { value: 'cristales-gemas', label: 'Cristales y gemas', icon: '💎' },
]

export default function StepPreferences() {
  const { testAnswers, setTestAnswer } = useAppStore()

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold text-white mb-8">
        ¿Qué tipo de contenido astrológico prefieres?
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-lg mx-auto">
        {options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => setTestAnswer('astrologicalPreferences', opt.value)}
            className={cn(
              'flex flex-col items-center gap-2 p-5 rounded-2xl border-2 transition-all duration-200',
              testAnswers.astrologicalPreferences === opt.value
                ? 'border-primary-500 bg-primary-500/10 shadow-lg shadow-primary-500/20'
                : 'border-white/10 hover:border-primary-500/50 hover:bg-white/5'
            )}
          >
            <span className="text-2xl">{opt.icon}</span>
            <span className="text-sm font-medium text-white/80">{opt.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
