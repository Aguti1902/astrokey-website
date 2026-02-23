'use client'

import { useAppStore } from '@/lib/store'

export default function StepName() {
  const { testAnswers, setTestAnswer } = useAppStore()

  return (
    <div className="text-center">
      <p className="text-sm font-medium text-primary-400 mb-2">Información Personal</p>
      <h2 className="text-2xl font-bold text-white mb-8">¿Cuál es tu nombre y apellidos?</h2>

      <div className="max-w-md mx-auto space-y-4">
        <div>
          <label className="block text-sm font-medium text-white/60 mb-2 text-left">Nombre</label>
          <input
            type="text"
            value={testAnswers.firstName}
            onChange={(e) => setTestAnswer('firstName', e.target.value)}
            placeholder="Tu nombre"
            className="w-full px-4 py-3.5 bg-transparent border border-white/15 rounded-xl text-white placeholder:text-white/25 focus:border-primary-500 focus:ring-0 outline-none transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-white/60 mb-2 text-left">Apellidos</label>
          <input
            type="text"
            value={testAnswers.lastName}
            onChange={(e) => setTestAnswer('lastName', e.target.value)}
            placeholder="Tus apellidos"
            className="w-full px-4 py-3.5 bg-transparent border border-white/15 rounded-xl text-white placeholder:text-white/25 focus:border-primary-500 focus:ring-0 outline-none transition-colors"
          />
        </div>
      </div>
    </div>
  )
}
