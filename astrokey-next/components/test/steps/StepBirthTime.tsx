'use client'

import { useAppStore } from '@/lib/store'
import { useT } from '@/lib/i18n'

export default function StepBirthTime() {
  const { testAnswers, setTestAnswer } = useAppStore()
  const t = useT()
  const bt = testAnswers.birthTime

  const selectClass = "w-full px-3 py-3.5 border border-white/15 rounded-xl text-white focus:border-primary-500 focus:ring-0 outline-none"

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold text-white mb-8">{t.test.birthTimeTitle}</h2>
      <div className="max-w-xs mx-auto flex items-end gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-white/60 mb-2">{t.test.hourLabel}</label>
          <select value={bt.hour} onChange={(e) => setTestAnswer('birthTime', { ...bt, hour: e.target.value })} className={selectClass}>
            <option value="">--</option>
            {Array.from({ length: 24 }, (_, i) => <option key={i} value={String(i).padStart(2,'0')}>{String(i).padStart(2,'0')}</option>)}
          </select>
        </div>
        <span className="text-2xl font-bold text-white/30 pb-3">:</span>
        <div className="flex-1">
          <label className="block text-sm font-medium text-white/60 mb-2">{t.test.minuteLabel}</label>
          <select value={bt.minute} onChange={(e) => setTestAnswer('birthTime', { ...bt, minute: e.target.value })} className={selectClass}>
            <option value="">--</option>
            {Array.from({ length: 60 }, (_, i) => <option key={i} value={String(i).padStart(2,'0')}>{String(i).padStart(2,'0')}</option>)}
          </select>
        </div>
      </div>
      <button onClick={() => setTestAnswer('birthTime', { hour: '12', minute: '00' })}
        className="mt-6 text-sm text-primary-400 hover:text-primary-500 font-medium">
        {t.test.dontKnow}
      </button>
    </div>
  )
}
