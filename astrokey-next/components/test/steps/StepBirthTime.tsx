'use client'

import { useAppStore } from '@/lib/store'

export default function StepBirthTime() {
  const { testAnswers, setTestAnswer } = useAppStore()
  const bt = testAnswers.birthTime

  const update = (field: 'hour' | 'minute', value: string) => {
    setTestAnswer('birthTime', { ...bt, [field]: value })
  }

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold text-white mb-8">Hora de nacimiento</h2>

      <div className="max-w-xs mx-auto flex items-end gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-white/60 mb-2">Hora</label>
          <select
            value={bt.hour}
            onChange={(e) => update('hour', e.target.value)}
            className="w-full px-3 py-3.5 bg-transparent border border-white/15 rounded-xl text-white focus:border-primary-500 focus:ring-0 outline-none"
          >
            <option value="">--</option>
            {Array.from({ length: 24 }, (_, i) => (
              <option key={i} value={String(i).padStart(2, '0')}>
                {String(i).padStart(2, '0')}
              </option>
            ))}
          </select>
        </div>

        <span className="text-2xl font-bold text-white/30 pb-3">:</span>

        <div className="flex-1">
          <label className="block text-sm font-medium text-white/60 mb-2">Minuto</label>
          <select
            value={bt.minute}
            onChange={(e) => update('minute', e.target.value)}
            className="w-full px-3 py-3.5 bg-transparent border border-white/15 rounded-xl text-white focus:border-primary-500 focus:ring-0 outline-none"
          >
            <option value="">--</option>
            {Array.from({ length: 60 }, (_, i) => (
              <option key={i} value={String(i).padStart(2, '0')}>
                {String(i).padStart(2, '0')}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        onClick={() => {
          setTestAnswer('birthTime', { hour: '12', minute: '00' })
        }}
        className="mt-6 text-sm text-primary-400 hover:text-primary-500 font-medium"
      >
        No lo sé, usar mediodía
      </button>
    </div>
  )
}
