'use client'

import { useAppStore } from '@/lib/store'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { Zap, Search, Users, Clock } from 'lucide-react'

const optionsByLang: Record<string, { value: string; label: string; sub: string }[]> = {
  es: [
    { value: 'intuicion', label: 'Confío en mi intuición', sub: 'Mi primera reacción suele ser la correcta' },
    { value: 'analisis', label: 'Analizo todas las opciones', sub: 'Necesito entender todos los pros y contras' },
    { value: 'consulta', label: 'Consulto con personas de confianza', sub: 'Las perspectivas de otros me ayudan a decidir' },
    { value: 'espera', label: 'Espero a que llegue la señal', sub: 'El universo me da la respuesta cuando estoy listo/a' },
  ],
  en: [
    { value: 'intuicion', label: 'I trust my intuition', sub: 'My first reaction is usually right' },
    { value: 'analisis', label: 'I analyze all options', sub: 'I need to understand all the pros and cons' },
    { value: 'consulta', label: 'I consult trusted people', sub: 'Others\' perspectives help me decide' },
    { value: 'espera', label: 'I wait for the right sign', sub: 'The universe gives me the answer when I\'m ready' },
  ],
  fr: [
    { value: 'intuicion', label: 'Je fais confiance à mon intuition', sub: 'Ma première réaction est généralement correcte' },
    { value: 'analisis', label: 'J\'analyse toutes les options', sub: 'J\'ai besoin de comprendre tous les avantages et inconvénients' },
    { value: 'consulta', label: 'Je consulte des personnes de confiance', sub: 'Les perspectives des autres m\'aident à décider' },
    { value: 'espera', label: 'J\'attends le bon signe', sub: 'L\'univers me donne la réponse quand je suis prêt/e' },
  ],
  de: [
    { value: 'intuicion', label: 'Ich vertraue meiner Intuition', sub: 'Meine erste Reaktion ist meistens richtig' },
    { value: 'analisis', label: 'Ich analysiere alle Optionen', sub: 'Ich muss alle Vor- und Nachteile verstehen' },
    { value: 'consulta', label: 'Ich frage Vertrauenspersonen', sub: 'Die Perspektiven anderer helfen mir zu entscheiden' },
    { value: 'espera', label: 'Ich warte auf das richtige Zeichen', sub: 'Das Universum gibt mir die Antwort, wenn ich bereit bin' },
  ],
  it: [
    { value: 'intuicion', label: 'Mi fido del mio intuito', sub: 'La mia prima reazione di solito è giusta' },
    { value: 'analisis', label: 'Analizzo tutte le opzioni', sub: 'Ho bisogno di capire tutti i pro e contro' },
    { value: 'consulta', label: 'Consulto persone di fiducia', sub: 'Le prospettive degli altri mi aiutano a decidere' },
    { value: 'espera', label: 'Aspetto il segno giusto', sub: 'L\'universo mi dà la risposta quando sono pronto/a' },
  ],
  uk: [
    { value: 'intuicion', label: 'Довіряю своїй інтуїції', sub: 'Моя перша реакція зазвичай правильна' },
    { value: 'analisis', label: 'Аналізую всі варіанти', sub: 'Мені потрібно зрозуміти всі плюси і мінуси' },
    { value: 'consulta', label: 'Консультуюся з людьми, яким довіряю', sub: 'Погляди інших допомагають мені вирішити' },
    { value: 'espera', label: 'Чекаю на знак', sub: 'Всесвіт дає мені відповідь, коли я готовий/а' },
  ],
  ru: [
    { value: 'intuicion', label: 'Доверяю своей интуиции', sub: 'Моя первая реакция обычно верна' },
    { value: 'analisis', label: 'Анализирую все варианты', sub: 'Мне нужно понять все плюсы и минусы' },
    { value: 'consulta', label: 'Консультируюсь с доверенными людьми', sub: 'Взгляды других помогают мне решить' },
    { value: 'espera', label: 'Жду нужного знака', sub: 'Вселенная даёт мне ответ, когда я готов/а' },
  ],
}

const titlesByLang: Record<string, string> = {
  es: '¿Cómo tomas tus decisiones más importantes?',
  en: 'How do you make your most important decisions?',
  fr: 'Comment prenez-vous vos décisions les plus importantes ?',
  de: 'Wie triffst du deine wichtigsten Entscheidungen?',
  it: 'Come prendi le tue decisioni più importanti?',
  uk: 'Як ти приймаєш свої найважливіші рішення?',
  ru: 'Как вы принимаете свои важнейшие решения?',
}

const icons = [Zap, Search, Users, Clock]
const iconColors = ['text-amber-400', 'text-blue-400', 'text-emerald-400', 'text-violet-400']

export default function StepDecisionStyle() {
  const { testAnswers, setTestAnswer } = useAppStore()
  const lang = useAppStore((s) => s.language)
  const options = optionsByLang[lang] ?? optionsByLang.es
  const title = titlesByLang[lang] ?? titlesByLang.es

  return (
    <div className="text-center">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <p className="text-xs text-violet-400 font-semibold uppercase tracking-widest mb-2">🧠 Psicología astral</p>
        <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
        <p className="text-sm text-white/40 mb-8">Esta respuesta determina tu patrón de decisión en tu carta natal</p>
      </motion.div>

      <div className="flex flex-col gap-3 max-w-lg mx-auto">
        {options.map(({ value, label, sub }, i) => {
          const isSelected = testAnswers.decisionStyle === value
          const Icon = icons[i]
          const color = iconColors[i]
          return (
            <motion.button
              key={value}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => setTestAnswer('decisionStyle', value)}
              className={cn(
                'flex items-center gap-4 p-5 rounded-2xl border text-left transition-all duration-200',
                isSelected
                  ? 'border-primary-500 bg-primary-500/10 shadow-lg shadow-primary-500/20'
                  : 'border-white/10 hover:border-primary-500/40 hover:bg-white/5'
              )}
            >
              <div className={cn('w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0',
                isSelected && 'bg-primary-500/15')}>
                <Icon className={cn('w-5 h-5', isSelected ? 'text-primary-400' : color)} />
              </div>
              <div>
                <p className={cn('font-semibold text-sm', isSelected ? 'text-white' : 'text-white/80')}>{label}</p>
                <p className="text-xs text-white/35 mt-0.5">{sub}</p>
              </div>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
