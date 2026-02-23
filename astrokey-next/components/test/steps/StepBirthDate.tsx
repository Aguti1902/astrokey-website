'use client'

import { useAppStore } from '@/lib/store'

const months = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
]

export default function StepBirthDate() {
  const { testAnswers, setTestAnswer } = useAppStore()
  const bd = testAnswers.birthDate

  const update = (field: 'day' | 'month' | 'year', value: string) => {
    setTestAnswer('birthDate', { ...bd, [field]: value })
  }

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold text-white mb-8">¿Cuál es tu fecha de nacimiento?</h2>

      <div className="max-w-md mx-auto grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-white/60 mb-2">Día</label>
          <select
            value={bd.day}
            onChange={(e) => update('day', e.target.value)}
            className="w-full px-3 py-3.5 bg-transparent border border-white/15 rounded-xl text-white focus:border-primary-500 focus:ring-0 outline-none"
          >
            <option value="">Día</option>
            {Array.from({ length: 31 }, (_, i) => (
              <option key={i + 1} value={String(i + 1)}>{i + 1}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-white/60 mb-2">Mes</label>
          <select
            value={bd.month}
            onChange={(e) => update('month', e.target.value)}
            className="w-full px-3 py-3.5 bg-transparent border border-white/15 rounded-xl text-white focus:border-primary-500 focus:ring-0 outline-none"
          >
            <option value="">Mes</option>
            {months.map((m, i) => (
              <option key={m} value={String(i + 1)}>{m}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-white/60 mb-2">Año</label>
          <select
            value={bd.year}
            onChange={(e) => update('year', e.target.value)}
            className="w-full px-3 py-3.5 bg-transparent border border-white/15 rounded-xl text-white focus:border-primary-500 focus:ring-0 outline-none"
          >
            <option value="">Año</option>
            {Array.from({ length: 91 }, (_, i) => {
              const year = 2010 - i
              return <option key={year} value={String(year)}>{year}</option>
            })}
          </select>
        </div>
      </div>
    </div>
  )
}
