'use client'

import { useAppStore } from '@/lib/store'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

const optionsByLang: Record<string, { value: string; label: string }[]> = {
  es: [
    { value: 'confia', label: '«Confía más en ti. Todo lo que temes ya lo has superado antes.»' },
    { value: 'suelta', label: '«Suelta el control. Lo que es tuyo llegará sin que lo persigas.»' },
    { value: 'personas', label: '«Las personas correctas ya están en tu camino. No tienes que buscarlas.»' },
    { value: 'camino', label: '«Cada decisión que tomes hoy lo cambiará todo mañana. Elige bien.»' },
  ],
  en: [
    { value: 'confia', label: '«Trust yourself more. Everything you fear, you\'ve already overcome before.»' },
    { value: 'suelta', label: '«Let go of control. What\'s yours will come without you chasing it.»' },
    { value: 'personas', label: '«The right people are already on your path. You don\'t need to search for them.»' },
    { value: 'camino', label: '«Every decision you make today will change everything tomorrow. Choose wisely.»' },
  ],
  fr: [
    { value: 'confia', label: '«Faites-vous confiance. Tout ce que vous craignez, vous l\'avez déjà surmonté.»' },
    { value: 'suelta', label: '«Lâchez le contrôle. Ce qui est à vous viendra sans que vous le poursuiviez.»' },
    { value: 'personas', label: '«Les bonnes personnes sont déjà sur votre chemin. Pas besoin de les chercher.»' },
    { value: 'camino', label: '«Chaque décision que vous prenez aujourd\'hui changera tout demain.»' },
  ],
  de: [
    { value: 'confia', label: '«Vertraue dir mehr. Alles, was du fürchtest, hast du bereits überwunden.»' },
    { value: 'suelta', label: '«Lass die Kontrolle los. Was dir gehört, kommt ohne Jagd.»' },
    { value: 'personas', label: '«Die richtigen Menschen sind bereits auf deinem Weg.»' },
    { value: 'camino', label: '«Jede Entscheidung heute verändert alles morgen. Wähle weise.»' },
  ],
  it: [
    { value: 'confia', label: '«Fidati di più di te stesso. Tutto ciò che temi, l\'hai già superato.»' },
    { value: 'suelta', label: '«Lascia andare il controllo. Ciò che è tuo verrà senza che tu lo insegua.»' },
    { value: 'personas', label: '«Le persone giuste sono già nel tuo cammino.»' },
    { value: 'camino', label: '«Ogni decisione che prendi oggi cambierà tutto domani. Scegli bene.»' },
  ],
  uk: [
    { value: 'confia', label: '«Довіряй собі більше. Все, чого ти боїшся, ти вже долав раніше.»' },
    { value: 'suelta', label: '«Відпусти контроль. Те, що твоє, прийде само.»' },
    { value: 'personas', label: '«Правильні люди вже на твоєму шляху. Не треба їх шукати.»' },
    { value: 'camino', label: '«Кожне рішення сьогодні змінить все завтра. Обирай мудро.»' },
  ],
  ru: [
    { value: 'confia', label: '«Доверяй себе больше. Всё, чего ты боишься, ты уже преодолевал/а.»' },
    { value: 'suelta', label: '«Отпусти контроль. То, что твоё, придёт само.»' },
    { value: 'personas', label: '«Правильные люди уже на твоём пути. Не нужно их искать.»' },
    { value: 'camino', label: '«Каждое решение сегодня изменит всё завтра. Выбирай мудро.»' },
  ],
}

const titlesByLang: Record<string, string> = {
  es: '¿Qué mensaje le darías a tu yo de hace 5 años?',
  en: 'What message would you give your 5-years-ago self?',
  fr: 'Quel message donneriez-vous à votre moi d\'il y a 5 ans ?',
  de: 'Welche Nachricht würdest du deinem Ich von vor 5 Jahren geben?',
  it: 'Che messaggio daresti al tuo io di 5 anni fa?',
  uk: 'Яке повідомлення ти б дав/ла своєму «я» 5 років тому?',
  ru: 'Какое послание вы бы дали себе 5 лет назад?',
}

const subsByLang: Record<string, string> = {
  es: 'La frase que eliges revela qué necesitas escuchar ahora mismo',
  en: 'The phrase you choose reveals what you need to hear right now',
  fr: 'La phrase que vous choisissez révèle ce que vous avez besoin d\'entendre maintenant',
  de: 'Der Satz, den du wählst, zeigt, was du gerade hören musst',
  it: 'La frase che scegli rivela quello che hai bisogno di sentire adesso',
  uk: 'Фраза, яку ти обираєш, відкриває, що тобі потрібно почути зараз',
  ru: 'Фраза, которую вы выбираете, раскрывает то, что вам нужно услышать сейчас',
}

export default function StepSelfMessage() {
  const { testAnswers, setTestAnswer } = useAppStore()
  const lang = useAppStore((s) => s.language)
  const options = optionsByLang[lang] ?? optionsByLang.es
  const title = titlesByLang[lang] ?? titlesByLang.es
  const sub = subsByLang[lang] ?? subsByLang.es

  return (
    <div className="text-center">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <p className="text-xs text-amber-400 font-semibold uppercase tracking-widest mb-2">💌 Mensaje del universo</p>
        <h2 className="text-2xl font-bold text-white mb-2 leading-snug">{title}</h2>
        <p className="text-sm text-white/40 italic mb-8">{sub}</p>
      </motion.div>

      <div className="flex flex-col gap-3 max-w-lg mx-auto">
        {options.map(({ value, label }, i) => {
          const isSelected = (testAnswers as any).selfMessage === value
          return (
            <motion.button
              key={value}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => (setTestAnswer as any)('selfMessage', value)}
              className={cn(
                'p-5 rounded-2xl border text-left transition-all duration-200',
                isSelected
                  ? 'border-accent-500/60 bg-accent-500/10 shadow-lg shadow-accent-500/10'
                  : 'border-white/10 hover:border-accent-400/30 hover:bg-white/5'
              )}
            >
              <p className={cn(
                'text-sm leading-relaxed font-medium italic',
                isSelected ? 'text-white' : 'text-white/60'
              )}>
                {label}
              </p>
              {isSelected && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-2 text-accent-400 text-xs font-semibold"
                >
                  ✦ Esta es tu verdad
                </motion.div>
              )}
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
