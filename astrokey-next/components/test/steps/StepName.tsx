'use client'

import { useAppStore } from '@/lib/store'
import { useT } from '@/lib/i18n'

export default function StepName() {
  const { testAnswers, setTestAnswer } = useAppStore()
  const t = useT()

  return (
    <div className="text-center">
      <p className="text-sm font-medium text-primary-400 mb-2">{t.test.nameInfo}</p>
      <h2 className="text-2xl font-bold text-white mb-8">{t.test.nameTitle}</h2>
      <div className="max-w-md mx-auto space-y-4">
        <div>
          <label className="block text-sm font-medium text-white/60 mb-2 text-left">{t.test.nameLabel}</label>
          <input type="text" value={testAnswers.firstName} onChange={(e) => setTestAnswer('firstName', e.target.value)}
            placeholder={t.test.namePlaceholder}
            className="w-full px-4 py-3.5 bg-transparent border border-white/15 rounded-xl text-white placeholder:text-white/25 focus:border-primary-500 focus:ring-0 outline-none transition-colors" />
        </div>
        <div>
          <label className="block text-sm font-medium text-white/60 mb-2 text-left">{t.test.lastNameLabel}</label>
          <input type="text" value={testAnswers.lastName} onChange={(e) => setTestAnswer('lastName', e.target.value)}
            placeholder={t.test.lastNamePlaceholder}
            className="w-full px-4 py-3.5 bg-transparent border border-white/15 rounded-xl text-white placeholder:text-white/25 focus:border-primary-500 focus:ring-0 outline-none transition-colors" />
        </div>
      </div>
    </div>
  )
}
