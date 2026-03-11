'use client'

import { useAppStore } from '@/lib/store'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

const momentsByLang: Record<string, { value: string; label: string; sub: string; icon: string }[]> = {
  es: [
    { value: 'inflexion', label: 'Estoy en un punto de inflexión', sub: 'Siento que algo importante está a punto de cambiar', icon: '🌊' },
    { value: 'claridad', label: 'Busco claridad en mi camino', sub: 'Necesito dirección y respuestas sobre el futuro', icon: '🔦' },
    { value: 'transformacion', label: 'Estoy en plena transformación', sub: 'Estoy cambiando profundamente como persona', icon: '🦋' },
    { value: 'reconectar', label: 'Quiero reconectarme conmigo', sub: 'Me siento desconectado/a de mi esencia y propósito', icon: '🌱' },
  ],
  en: [
    { value: 'inflexion', label: 'I\'m at an inflection point', sub: 'I feel something important is about to change', icon: '🌊' },
    { value: 'claridad', label: 'I\'m seeking clarity in my path', sub: 'I need direction and answers about the future', icon: '🔦' },
    { value: 'transformacion', label: 'I\'m in full transformation', sub: 'I\'m changing deeply as a person', icon: '🦋' },
    { value: 'reconectar', label: 'I want to reconnect with myself', sub: 'I feel disconnected from my essence and purpose', icon: '🌱' },
  ],
  fr: [
    { value: 'inflexion', label: 'Je suis à un point d\'inflexion', sub: 'Je sens que quelque chose d\'important va changer', icon: '🌊' },
    { value: 'claridad', label: 'Je cherche de la clarté', sub: 'J\'ai besoin de direction sur l\'avenir', icon: '🔦' },
    { value: 'transformacion', label: 'Je suis en pleine transformation', sub: 'Je change profondément en tant que personne', icon: '🦋' },
    { value: 'reconectar', label: 'Je veux me reconnecter', sub: 'Je me sens déconnecté/e de mon essence', icon: '🌱' },
  ],
  de: [
    { value: 'inflexion', label: 'Ich bin an einem Wendepunkt', sub: 'Ich spüre, dass sich etwas Wichtiges ändern wird', icon: '🌊' },
    { value: 'claridad', label: 'Ich suche Klarheit', sub: 'Ich brauche Richtung und Antworten über die Zukunft', icon: '🔦' },
    { value: 'transformacion', label: 'Ich befinde mich in einem Wandel', sub: 'Ich verändere mich tiefgreifend als Person', icon: '🦋' },
    { value: 'reconectar', label: 'Ich möchte mich neu verbinden', sub: 'Ich fühle mich von meinem Wesen getrennt', icon: '🌱' },
  ],
  it: [
    { value: 'inflexion', label: 'Sono a un punto di svolta', sub: 'Sento che qualcosa di importante sta per cambiare', icon: '🌊' },
    { value: 'claridad', label: 'Cerco chiarezza nel mio percorso', sub: 'Ho bisogno di direzione sul futuro', icon: '🔦' },
    { value: 'transformacion', label: 'Sono in piena trasformazione', sub: 'Sto cambiando profondamente come persona', icon: '🦋' },
    { value: 'reconectar', label: 'Voglio riconnettermi con me stesso', sub: 'Mi sento disconnesso/a dalla mia essenza', icon: '🌱' },
  ],
  uk: [
    { value: 'inflexion', label: 'Я на переломному моменті', sub: 'Я відчуваю, що щось важливе ось-ось зміниться', icon: '🌊' },
    { value: 'claridad', label: 'Шукаю ясності на своєму шляху', sub: 'Мені потрібен напрямок і відповіді про майбутнє', icon: '🔦' },
    { value: 'transformacion', label: 'Я в процесі трансформації', sub: 'Я глибоко змінююсь як особистість', icon: '🦋' },
    { value: 'reconectar', label: 'Хочу відновити зв\'язок із собою', sub: 'Я відчуваю відрив від своєї суті', icon: '🌱' },
  ],
  ru: [
    { value: 'inflexion', label: 'Я на переломном моменте', sub: 'Чувствую, что что-то важное вот-вот изменится', icon: '🌊' },
    { value: 'claridad', label: 'Ищу ясности в своём пути', sub: 'Мне нужно направление и ответы о будущем', icon: '🔦' },
    { value: 'transformacion', label: 'Я в процессе трансформации', sub: 'Я глубоко меняюсь как личность', icon: '🦋' },
    { value: 'reconectar', label: 'Хочу воссоединиться с собой', sub: 'Чувствую разрыв со своей сутью', icon: '🌱' },
  ],
}

const titlesByLang: Record<string, string> = {
  es: '¿Qué frase describe mejor tu momento actual?',
  en: 'Which phrase best describes your current moment?',
  fr: 'Quelle phrase décrit le mieux votre moment actuel ?',
  de: 'Welcher Satz beschreibt dein aktuelles Moment am besten?',
  it: 'Quale frase descrive meglio il tuo momento attuale?',
  uk: 'Яка фраза найкраще описує твій поточний момент?',
  ru: 'Какая фраза лучше всего описывает ваш текущий момент?',
}

export default function StepCurrentMoment() {
  const { testAnswers, setTestAnswer } = useAppStore()
  const lang = useAppStore((s) => s.language)
  const options = momentsByLang[lang] ?? momentsByLang.es
  const title = titlesByLang[lang] ?? titlesByLang.es

  return (
    <div className="text-center">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <p className="text-xs text-primary-400 font-semibold uppercase tracking-widest mb-2">✦ Introspección ✦</p>
        <h2 className="text-2xl font-bold text-white mb-8">{title}</h2>
      </motion.div>

      <div className="flex flex-col gap-3 max-w-lg mx-auto">
        {options.map(({ value, label, sub, icon }, i) => {
          const selected = testAnswers.currentMoment === value
          return (
            <motion.button
              key={value}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => setTestAnswer('currentMoment', value)}
              className={cn(
                'flex items-start gap-4 p-5 rounded-2xl border text-left transition-all duration-200',
                selected
                  ? 'border-primary-500 bg-primary-500/10 shadow-lg shadow-primary-500/20'
                  : 'border-white/10 hover:border-primary-500/40 hover:bg-white/5'
              )}
            >
              <span className="text-2xl mt-0.5 flex-shrink-0">{icon}</span>
              <div>
                <p className={cn('font-semibold text-sm leading-snug', selected ? 'text-white' : 'text-white/80')}>
                  {label}
                </p>
                <p className="text-xs text-white/40 mt-1 leading-relaxed">{sub}</p>
              </div>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
