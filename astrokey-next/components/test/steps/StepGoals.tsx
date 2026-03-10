'use client'

import { useAppStore } from '@/lib/store'
import { cn } from '@/lib/utils'
import { useT } from '@/lib/i18n'
import { Trophy, Home, BarChart2, TrendingUp, HandHeart, Sparkles } from 'lucide-react'

export default function StepGoals() {
  const { testAnswers, setTestAnswer } = useAppStore()
  const t = useT()

  const options = [
    { value: 'exito-profesional', Icon: Trophy, label: t.test.goalPro },
    { value: 'felicidad-familiar', Icon: Home, label: t.test.goalFamily },
    { value: 'estabilidad-economica', Icon: BarChart2, label: t.test.goalEcon },
    { value: 'crecimiento-personal', Icon: TrendingUp, label: t.test.goalGrowth },
    { value: 'ayudar-otros', Icon: HandHeart, label: t.test.goalHelp },
    { value: 'realizacion-espiritual', Icon: Sparkles, label: t.test.goalSpirit },
  ]

  const selected: string[] = Array.isArray(testAnswers.lifeGoals)
    ? testAnswers.lifeGoals
    : testAnswers.lifeGoals ? [testAnswers.lifeGoals as string] : []

  const toggle = (value: string) => {
    const updated = selected.includes(value)
      ? selected.filter((v) => v !== value)
      : [...selected, value]
    setTestAnswer('lifeGoals', updated)
  }

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold text-white mb-2">{t.test.goalsTitle}</h2>
      <p className="text-sm text-white/40 mb-8">{t.test.personalityHint}</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-lg mx-auto">
        {options.map(({ value, Icon, label }) => {
          const isSelected = selected.includes(value)
          return (
            <button key={value} onClick={() => toggle(value)}
              className={cn('flex flex-col items-center gap-3 p-5 rounded-2xl border transition-all duration-200',
                isSelected ? 'border-primary-500 bg-primary-500/10 shadow-lg shadow-primary-500/20' : 'border-white/10 hover:border-primary-500/50 hover:bg-white/5')}>
              <Icon className={cn('w-8 h-8', isSelected ? 'text-primary-400' : 'text-white/30')} />
              <span className="text-sm font-medium text-white/80">{label}</span>
            </button>
          )
        })}
      </div>
      {selected.length > 0 && <p className="mt-4 text-sm text-white/30">{selected.length} {t.test.selected}</p>}
    </div>
  )
}
