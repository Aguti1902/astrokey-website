'use client'

import { useAppStore } from '@/lib/store'
import { cn } from '@/lib/utils'
import { useT } from '@/lib/i18n'
import { Flame, Droplets, Mountain, Wind } from 'lucide-react'

export default function StepElement() {
  const { testAnswers, setTestAnswer } = useAppStore()
  const t = useT()

  const elements = [
    { value: 'fuego', Icon: Flame, label: t.test.fire, color: 'text-orange-500', bg: 'bg-orange-500/10', border: 'border-orange-500' },
    { value: 'agua', Icon: Droplets, label: t.test.water, color: 'text-blue-500', bg: 'bg-blue-500/10', border: 'border-blue-500' },
    { value: 'tierra', Icon: Mountain, label: t.test.earth, color: 'text-emerald-500', bg: 'bg-emerald-500/10', border: 'border-emerald-500' },
    { value: 'aire', Icon: Wind, label: t.test.air, color: 'text-sky-500', bg: 'bg-sky-500/10', border: 'border-sky-500' },
  ]

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold text-white mb-8">{t.test.elementTitle}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-lg mx-auto">
        {elements.map(({ value, Icon, label, color, bg, border }) => {
          const selected = testAnswers.element === value
          return (
            <button key={value} onClick={() => setTestAnswer('element', value)}
              className={cn('flex flex-col items-center gap-3 p-6 rounded-2xl border-2 transition-all duration-200', selected ? `${border} ${bg} shadow-lg` : 'border-white/10 hover:border-white/20 hover:bg-white/5')}>
              <Icon className={cn('w-8 h-8', selected ? color : 'text-white/30')} />
              <span className="text-sm font-medium text-white/80">{label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
