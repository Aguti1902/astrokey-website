'use client'

import { useAppStore } from '@/lib/store'
import { cn } from '@/lib/utils'
import { CalendarDays, HeartHandshake, MessageCircle, BookOpen, Moon, Gem } from 'lucide-react'

const options = [
  { value: 'predicciones-diarias', label: 'Predicciones diarias', Icon: CalendarDays },
  { value: 'analisis-compatibilidad', label: 'Compatibilidad', Icon: HeartHandshake },
  { value: 'consejos-personales', label: 'Consejos personales', Icon: MessageCircle },
  { value: 'educacion-astrologica', label: 'Educación astral', Icon: BookOpen },
  { value: 'rituales-luna', label: 'Rituales de luna', Icon: Moon },
  { value: 'cristales-gemas', label: 'Cristales y gemas', Icon: Gem },
]

export default function StepPreferences() {
  const { testAnswers, setTestAnswer } = useAppStore()

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold text-white mb-8">
        ¿Qué tipo de contenido astrológico prefieres?
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-lg mx-auto">
        {options.map(({ value, label, Icon }) => {
          const selected = testAnswers.astrologicalPreferences === value
          return (
            <button
              key={value}
              onClick={() => setTestAnswer('astrologicalPreferences', value)}
              className={cn(
                'flex flex-col items-center gap-3 p-5 rounded-2xl border transition-all duration-200',
                selected
                  ? 'border-primary-500 bg-primary-500/10 shadow-lg shadow-primary-500/20'
                  : 'border-white/10 hover:border-primary-500/50 hover:bg-white/5'
              )}
            >
              <Icon className={cn('w-8 h-8', selected ? 'text-primary-400' : 'text-white/30')} />
              <span className="text-sm font-medium text-white/80">{label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
