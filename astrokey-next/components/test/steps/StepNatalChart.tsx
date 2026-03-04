'use client'

import { useAppStore } from '@/lib/store'
import { cn } from '@/lib/utils'
import { useT } from '@/lib/i18n'
import { CheckCircle, XCircle } from 'lucide-react'

export default function StepNatalChart() {
  const { testAnswers, setTestAnswer } = useAppStore()
  const t = useT()

  const options = [
    { value: 'si', label: t.test.natalYes, Icon: CheckCircle, color: 'text-emerald-400' },
    { value: 'no', label: t.test.natalNo, Icon: XCircle, color: 'text-rose-400' },
  ]

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold text-white mb-8">{t.test.natalTitle}</h2>
      <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
        {options.map(({ value, label, Icon, color }) => {
          const selected = testAnswers.hasNatalChart === value
          return (
            <button key={value} onClick={() => setTestAnswer('hasNatalChart', value)}
              className={cn('flex flex-col items-center gap-3 p-6 rounded-2xl border transition-all duration-200', selected ? 'border-primary-500 bg-primary-500/10 shadow-lg shadow-primary-500/20' : 'border-white/10 hover:border-primary-500/50 hover:bg-white/5')}>
              <Icon className={cn('w-10 h-10', selected ? color : 'text-white/30')} />
              <span className="text-sm font-medium text-white/80">{label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
