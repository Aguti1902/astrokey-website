'use client'

import { useAppStore } from '@/lib/store'
import { cn } from '@/lib/utils'

const traits = [
  'Emocional', 'Lógico', 'Inteligente', 'Íntimo',
  'Entusiasta', 'Mandón', 'Introvertido', 'Leal',
  'Confiable', 'Malhumorado', 'Aesthetic', 'Honesto',
  'De mente abierta', 'Infantil', 'Positivo', 'Pesimista',
]

export default function StepPersonality() {
  const { testAnswers, setTestAnswer } = useAppStore()

  const toggle = (trait: string) => {
    const current = testAnswers.personalityTraits
    const updated = current.includes(trait)
      ? current.filter((t) => t !== trait)
      : [...current, trait]
    setTestAnswer('personalityTraits', updated)
  }

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold text-white mb-2">
        ¿Cuáles rasgos reflejan tu personalidad?
      </h2>
      <p className="text-sm text-white/40 mb-8">Selecciona todos los que apliquen</p>

      <div className="flex flex-wrap justify-center gap-3 max-w-lg mx-auto">
        {traits.map((trait) => (
          <button
            key={trait}
            onClick={() => toggle(trait)}
            className={cn(
              'px-5 py-2.5 rounded-full border-2 text-sm font-medium transition-all duration-200',
              testAnswers.personalityTraits.includes(trait)
                ? 'border-primary-500 bg-primary-500/10 text-primary-300'
                : 'border-white/10 text-white/60 hover:border-primary-500/50'
            )}
          >
            {trait}
          </button>
        ))}
      </div>

      {testAnswers.personalityTraits.length > 0 && (
        <p className="mt-4 text-sm text-white/30">
          {testAnswers.personalityTraits.length} seleccionados
        </p>
      )}
    </div>
  )
}
