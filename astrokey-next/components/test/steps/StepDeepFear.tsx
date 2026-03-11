'use client'

import { useAppStore } from '@/lib/store'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

const optionsByLang: Record<string, { value: string; label: string; sub: string; icon: string }[]> = {
  es: [
    { value: 'fracasar', label: 'Fracasar ante los demás', sub: 'Que vean que no soy suficientemente bueno/a', icon: '😰' },
    { value: 'soledad', label: 'Quedarme solo/a para siempre', sub: 'Que nadie me llegue a entender de verdad', icon: '🌑' },
    { value: 'proposito', label: 'No encontrar mi propósito', sub: 'Vivir sin saber para qué estoy aquí', icon: '🧭' },
    { value: 'perder', label: 'Perder lo que más amo', sub: 'Que el tiempo me arrebate personas y sueños', icon: '💔' },
  ],
  en: [
    { value: 'fracasar', label: 'Failing in front of others', sub: 'That they see I\'m not good enough', icon: '😰' },
    { value: 'soledad', label: 'Being alone forever', sub: 'That no one will ever truly understand me', icon: '🌑' },
    { value: 'proposito', label: 'Never finding my purpose', sub: 'Living without knowing why I\'m here', icon: '🧭' },
    { value: 'perder', label: 'Losing what I love most', sub: 'That time will take away people and dreams', icon: '💔' },
  ],
  fr: [
    { value: 'fracasar', label: 'Échouer devant les autres', sub: 'Qu\'ils voient que je ne suis pas assez bien', icon: '😰' },
    { value: 'soledad', label: 'Rester seul/e pour toujours', sub: 'Que personne ne me comprenne vraiment', icon: '🌑' },
    { value: 'proposito', label: 'Ne pas trouver mon but', sub: 'Vivre sans savoir pourquoi je suis là', icon: '🧭' },
    { value: 'perder', label: 'Perdre ce que j\'aime', sub: 'Que le temps m\'enlève personnes et rêves', icon: '💔' },
  ],
  de: [
    { value: 'fracasar', label: 'Vor anderen zu scheitern', sub: 'Dass sie sehen, dass ich nicht gut genug bin', icon: '😰' },
    { value: 'soledad', label: 'Für immer allein zu bleiben', sub: 'Dass mich niemand wirklich versteht', icon: '🌑' },
    { value: 'proposito', label: 'Meinen Zweck nicht zu finden', sub: 'Zu leben, ohne zu wissen, warum ich hier bin', icon: '🧭' },
    { value: 'perder', label: 'Das zu verlieren, was ich liebe', sub: 'Dass die Zeit mir Menschen und Träume nimmt', icon: '💔' },
  ],
  it: [
    { value: 'fracasar', label: 'Fallire davanti agli altri', sub: 'Che vedano che non sono abbastanza bravo/a', icon: '😰' },
    { value: 'soledad', label: 'Restare solo/a per sempre', sub: 'Che nessuno mi capisca davvero', icon: '🌑' },
    { value: 'proposito', label: 'Non trovare il mio scopo', sub: 'Vivere senza sapere perché sono qui', icon: '🧭' },
    { value: 'perder', label: 'Perdere ciò che amo di più', sub: 'Che il tempo mi porti via persone e sogni', icon: '💔' },
  ],
  uk: [
    { value: 'fracasar', label: 'Зазнати невдачі перед іншими', sub: 'Що вони побачать, що я недостатньо хороший/а', icon: '😰' },
    { value: 'soledad', label: 'Залишитись самотнім/ою назавжди', sub: 'Що ніхто ніколи по-справжньому мене не зрозуміє', icon: '🌑' },
    { value: 'proposito', label: 'Не знайти своє призначення', sub: 'Жити, не знаючи, навіщо я тут', icon: '🧭' },
    { value: 'perder', label: 'Втратити те, що найбільше люблю', sub: 'Що час забере людей і мрії', icon: '💔' },
  ],
  ru: [
    { value: 'fracasar', label: 'Потерпеть неудачу перед другими', sub: 'Что они увидят, что я недостаточно хорош/а', icon: '😰' },
    { value: 'soledad', label: 'Остаться одному/ой навсегда', sub: 'Что никто никогда по-настоящему меня не поймёт', icon: '🌑' },
    { value: 'proposito', label: 'Не найти своё предназначение', sub: 'Жить, не зная, зачем я здесь', icon: '🧭' },
    { value: 'perder', label: 'Потерять то, что больше всего люблю', sub: 'Что время заберёт людей и мечты', icon: '💔' },
  ],
}

const titlesByLang: Record<string, string> = {
  es: '¿Qué miedo es el que más te limita en la vida?',
  en: 'Which fear limits you the most in life?',
  fr: 'Quelle peur vous limite le plus dans la vie ?',
  de: 'Welche Angst begrenzt dich am meisten im Leben?',
  it: 'Quale paura ti limita di più nella vita?',
  uk: 'Який страх найбільше обмежує тебе в житті?',
  ru: 'Какой страх больше всего ограничивает вас в жизни?',
}

const subsByLang: Record<string, string> = {
  es: 'Sé honesto/a contigo. Las estrellas lo saben de todos modos.',
  en: 'Be honest with yourself. The stars know anyway.',
  fr: 'Soyez honnête avec vous-même. Les étoiles le savent de toute façon.',
  de: 'Sei ehrlich mit dir selbst. Die Sterne wissen es sowieso.',
  it: 'Sii onesto/a con te stesso/a. Le stelle lo sanno comunque.',
  uk: 'Будь чесним/ою із собою. Зірки все одно знають.',
  ru: 'Будьте честны с собой. Звёзды всё равно знают.',
}

export default function StepDeepFear() {
  const { testAnswers, setTestAnswer } = useAppStore()
  const lang = useAppStore((s) => s.language)
  const options = optionsByLang[lang] ?? optionsByLang.es
  const title = titlesByLang[lang] ?? titlesByLang.es
  const sub = subsByLang[lang] ?? subsByLang.es

  return (
    <div className="text-center">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <p className="text-xs text-rose-400 font-semibold uppercase tracking-widest mb-2">🔮 Reflexión profunda</p>
        <h2 className="text-2xl font-bold text-white mb-2 leading-snug">{title}</h2>
        <p className="text-sm text-white/40 italic mb-8">{sub}</p>
      </motion.div>

      <div className="flex flex-col gap-3 max-w-lg mx-auto">
        {options.map(({ value, label, sub: optSub, icon }, i) => {
          const isSelected = (testAnswers as any).deepFear === value
          return (
            <motion.button
              key={value}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => (setTestAnswer as any)('deepFear', value)}
              className={cn(
                'flex items-start gap-4 p-5 rounded-2xl border text-left transition-all duration-200',
                isSelected
                  ? 'border-rose-500/60 bg-rose-500/10 shadow-lg shadow-rose-500/10'
                  : 'border-white/10 hover:border-rose-400/30 hover:bg-white/5'
              )}
            >
              <span className="text-2xl flex-shrink-0 mt-0.5">{icon}</span>
              <div>
                <p className={cn('font-semibold text-sm leading-snug', isSelected ? 'text-white' : 'text-white/80')}>{label}</p>
                <p className="text-xs text-white/35 mt-1 leading-relaxed">{optSub}</p>
              </div>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
