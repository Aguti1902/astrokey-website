'use client'

import { useAppStore } from '@/lib/store'
import { cn } from '@/lib/utils'
import { useT } from '@/lib/i18n'

const traitsEs = ['Emocional','Lógico','Inteligente','Íntimo','Entusiasta','Mandón','Introvertido','Leal','Confiable','Malhumorado','Aesthetic','Honesto','De mente abierta','Infantil','Positivo','Pesimista']
const traitsEn = ['Emotional','Logical','Intelligent','Intimate','Enthusiastic','Bossy','Introverted','Loyal','Reliable','Moody','Aesthetic','Honest','Open-minded','Childlike','Positive','Pessimistic']
const traitsFr = ['Émotionnel','Logique','Intelligent','Intime','Enthousiaste','Autoritaire','Introverti','Loyal','Fiable','Lunatique','Aesthetique','Honnête','Ouvert d\'esprit','Enfantin','Positif','Pessimiste']
const traitsDe = ['Emotional','Logisch','Intelligent','Intim','Enthusiastisch','Herrisch','Introvertiert','Loyal','Zuverlässig','Launisch','Ästhetisch','Ehrlich','Aufgeschlossen','Kindlich','Positiv','Pessimistisch']
const traitsIt = ['Emotivo','Logico','Intelligente','Intimo','Entusiasta','Autoritario','Introverso','Leale','Affidabile','Lunatico','Estetico','Onesto','Aperto di mente','Infantile','Positivo','Pessimista']
const traitsUk = ['Емоційний','Логічний','Розумний','Інтимний','Ентузіастичний','Командир','Інтровертний','Відданий','Надійний','Примхливий','Естетичний','Чесний','Відкритий','Дитячий','Позитивний','Песимістичний']
const traitsRu = ['Эмоциональный','Логичный','Умный','Интимный','Энтузиастичный','Властный','Интровертный','Лояльный','Надёжный','Капризный','Эстетичный','Честный','Открытый','Детский','Позитивный','Пессимистичный']

const traitsByLang: Record<string, string[]> = { es: traitsEs, en: traitsEn, fr: traitsFr, de: traitsDe, it: traitsIt, uk: traitsUk, ru: traitsRu }

export default function StepPersonality() {
  const { testAnswers, setTestAnswer } = useAppStore()
  const t = useT()
  const lang = useAppStore((s) => s.language)
  const traits = traitsByLang[lang] ?? traitsEs
  const valueTraits = traitsEs // always store in Spanish as values

  const toggle = (idx: number) => {
    const value = valueTraits[idx]
    const current = testAnswers.personalityTraits
    const updated = current.includes(value) ? current.filter((x) => x !== value) : [...current, value]
    setTestAnswer('personalityTraits', updated)
  }

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold text-white mb-2">{t.test.personalityTitle}</h2>
      <p className="text-sm text-white/40 mb-8">{t.test.personalityHint}</p>
      <div className="flex flex-wrap justify-center gap-3 max-w-lg mx-auto">
        {traits.map((trait, idx) => {
          const value = valueTraits[idx]
          const selected = testAnswers.personalityTraits.includes(value)
          return (
            <button key={value} onClick={() => toggle(idx)}
              className={cn('px-5 py-2.5 rounded-full border-2 text-sm font-medium transition-all duration-200', selected ? 'border-primary-500 bg-primary-500/10 text-primary-300' : 'border-white/10 text-white/60 hover:border-primary-500/50')}>
              {trait}
            </button>
          )
        })}
      </div>
      {testAnswers.personalityTraits.length > 0 && <p className="mt-4 text-sm text-white/30">{testAnswers.personalityTraits.length} {t.test.selected}</p>}
    </div>
  )
}
