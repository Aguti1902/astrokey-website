'use client'

import { useAppStore } from '@/lib/store'
import { cn } from '@/lib/utils'
import { useT } from '@/lib/i18n'
import { Diamond, Gem, Heart, HelpCircle, User, HeartCrack } from 'lucide-react'

export default function StepRelationship() {
  const { testAnswers, setTestAnswer } = useAppStore()
  const t = useT()

  const options = [
    { value: 'casado', label: t.test.married, Icon: Diamond },
    { value: 'comprometido', label: t.test.engaged, Icon: Gem },
    { value: 'en-relacion', label: t.test.inRelationship, Icon: Heart },
    { value: 'complicado', label: t.test.complicated, Icon: HelpCircle },
    { value: 'soltero', label: t.test.single, Icon: User },
    { value: 'divorciado', label: t.test.divorced, Icon: HeartCrack },
  ]

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold text-white mb-8">{t.test.relationshipTitle}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-lg mx-auto">
        {options.map(({ value, label, Icon }) => {
          const selected = testAnswers.relationshipStatus === value
          return (
            <button key={value} onClick={() => setTestAnswer('relationshipStatus', value)}
              className={cn('flex flex-col items-center gap-3 p-5 rounded-2xl border transition-all duration-200', selected ? 'border-primary-500 bg-primary-500/10 shadow-lg shadow-primary-500/20' : 'border-white/10 hover:border-primary-500/50 hover:bg-white/5')}>
              <Icon className={cn('w-8 h-8', selected ? 'text-primary-400' : 'text-white/30')} />
              <span className="text-sm font-medium text-white/80">{label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
