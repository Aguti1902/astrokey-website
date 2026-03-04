'use client'

import { useAppStore } from '@/lib/store'
import { cn } from '@/lib/utils'
import { useT } from '@/lib/i18n'

function FemaleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
      <circle cx="12" cy="8" r="5" /><line x1="12" y1="13" x2="12" y2="21" /><line x1="9" y1="18" x2="15" y2="18" />
    </svg>
  )
}
function MaleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
      <circle cx="10" cy="14" r="5" /><line x1="21" y1="3" x2="15" y2="9" /><polyline points="15,3 21,3 21,9" />
    </svg>
  )
}
function NonBinaryIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
      <circle cx="12" cy="11" r="5" /><line x1="12" y1="16" x2="12" y2="21" /><line x1="9" y1="19" x2="15" y2="19" />
      <line x1="18" y1="3" x2="12" y2="7" /><line x1="6" y1="3" x2="12" y2="7" />
    </svg>
  )
}

export default function StepGender() {
  const { testAnswers, setTestAnswer } = useAppStore()
  const t = useT()

  const options = [
    { value: 'mujer', label: t.test.female, Icon: FemaleIcon },
    { value: 'hombre', label: t.test.male, Icon: MaleIcon },
    { value: 'no-binario', label: t.test.nonBinary, Icon: NonBinaryIcon },
  ]

  return (
    <div className="text-center">
      <p className="text-sm font-medium text-primary-400 mb-2">{t.test.genderPre}</p>
      <h2 className="text-2xl font-bold text-white mb-8">{t.test.genderTitle}</h2>
      <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
        {options.map(({ value, label, Icon }) => {
          const selected = testAnswers.gender === value
          return (
            <button key={value} onClick={() => setTestAnswer('gender', value)}
              className={cn('flex flex-col items-center gap-3 p-6 rounded-2xl border transition-all duration-200', selected ? 'border-primary-500 bg-primary-500/10 shadow-lg shadow-primary-500/20' : 'border-white/10 hover:border-primary-500/50 hover:bg-white/5')}>
              <span className={cn('transition-colors', selected ? 'text-primary-400' : 'text-white/40')}><Icon /></span>
              <span className="text-sm font-medium text-white/80">{label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
