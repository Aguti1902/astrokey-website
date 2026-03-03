'use client'

import { useAppStore } from '@/lib/store'
import { cn } from '@/lib/utils'
import { Trophy, Home, BarChart2, TrendingUp, HandHeart, Sparkles } from 'lucide-react'

const options = [
  { value: 'exito-profesional', label: 'Éxito profesional', Icon: Trophy },
  { value: 'felicidad-familiar', label: 'Felicidad familiar', Icon: Home },
  { value: 'estabilidad-economica', label: 'Estabilidad económica', Icon: BarChart2 },
  { value: 'crecimiento-personal', label: 'Crecimiento personal', Icon: TrendingUp },
  { value: 'ayudar-otros', label: 'Ayudar a otros', Icon: HandHeart },
  { value: 'realizacion-espiritual', label: 'Realización espiritual', Icon: Sparkles },
]

export default function StepGoals() {
  const { testAnswers, setTestAnswer } = useAppStore()

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold text-white mb-8">
        ¿Cuáles son tus principales objetivos en la vida?
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-lg mx-auto">
        {options.map(({ value, label, Icon }) => {
          const selected = testAnswers.lifeGoals === value
          return (
            <button
              key={value}
              onClick={() => setTestAnswer('lifeGoals', value)}
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
