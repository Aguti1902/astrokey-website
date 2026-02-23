'use client'

import { useAppStore } from '@/lib/store'
import { cn } from '@/lib/utils'

const options = [
  { value: 'si', label: 'Sí, me la han hecho', icon: '✅' },
  { value: 'no', label: 'No, nunca', icon: '❌' },
]

export default function StepNatalChart() {
  const { testAnswers, setTestAnswer } = useAppStore()

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold text-white mb-8">¿Te has hecho alguna vez una carta natal?</h2>

      <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
        {options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => setTestAnswer('hasNatalChart', opt.value)}
            className={cn(
              'flex flex-col items-center gap-3 p-6 rounded-2xl border-2 transition-all duration-200',
              testAnswers.hasNatalChart === opt.value
                ? 'border-primary-500 bg-primary-500/10 shadow-lg shadow-primary-500/20'
                : 'border-white/10 hover:border-primary-500/50 hover:bg-white/5'
            )}
          >
            <span className="text-3xl">{opt.icon}</span>
            <span className="text-sm font-medium text-white/80">{opt.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
