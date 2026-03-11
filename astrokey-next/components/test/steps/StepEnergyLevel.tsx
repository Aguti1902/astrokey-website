'use client'

import { useAppStore } from '@/lib/store'
import { motion } from 'framer-motion'

const titlesByLang: Record<string, string> = {
  es: '¿Cómo está tu energía vital en este momento?',
  en: 'How is your vital energy right now?',
  fr: 'Comment est votre énergie vitale en ce moment ?',
  de: 'Wie ist deine Lebensenergie gerade?',
  it: 'Come sta la tua energia vitale in questo momento?',
  uk: 'Якою є твоя життєва енергія зараз?',
  ru: 'Какова ваша жизненная энергия прямо сейчас?',
}

const lowLabelsByLang: Record<string, string> = {
  es: 'Agotado/a', en: 'Exhausted', fr: 'Épuisé/e', de: 'Erschöpft', it: 'Esausto/a', uk: 'Виснажений/а', ru: 'Истощён/а',
}

const highLabelsByLang: Record<string, string> = {
  es: 'Pleno/a de energía', en: 'Full of energy', fr: 'Plein/e d\'énergie', de: 'Voller Energie', it: 'Pieno/a di energia', uk: 'Повний/а сил', ru: 'Полон/на энергии',
}

const descByLang: Record<string, string> = {
  es: 'Tu nivel de energía actual influye en los tránsitos planetarios que te afectan',
  en: 'Your current energy level influences the planetary transits affecting you',
  fr: 'Votre niveau d\'énergie actuel influence les transits planétaires qui vous affectent',
  de: 'Dein aktueller Energielevel beeinflusst die Planetentransite, die dich betreffen',
  it: 'Il tuo attuale livello di energia influenza i transiti planetari che ti riguardano',
  uk: 'Твій поточний рівень енергії впливає на планетарні транзити, що тебе стосуються',
  ru: 'Ваш текущий уровень энергии влияет на планетарные транзиты, которые вас затрагивают',
}

const energyEmojis = ['😴', '😔', '😐', '🙂', '😊', '😄', '✨', '⚡', '🔥', '🌟']
const energyColors = [
  '#ef4444', '#f97316', '#f59e0b', '#eab308', '#84cc16',
  '#22c55e', '#10b981', '#06b6d4', '#6366f1', '#8b5cf6',
]

export default function StepEnergyLevel() {
  const { testAnswers, setTestAnswer } = useAppStore()
  const lang = useAppStore((s) => s.language)
  const level = testAnswers.energyLevel || 5
  const title = titlesByLang[lang] ?? titlesByLang.es
  const lowLabel = lowLabelsByLang[lang] ?? lowLabelsByLang.es
  const highLabel = highLabelsByLang[lang] ?? highLabelsByLang.es
  const desc = descByLang[lang] ?? descByLang.es

  const color = energyColors[level - 1]
  const emoji = energyEmojis[level - 1]

  return (
    <div className="text-center">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <p className="text-xs text-emerald-400 font-semibold uppercase tracking-widest mb-2">⚡ Energía vital</p>
        <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
        <p className="text-sm text-white/40 mb-8">{desc}</p>
      </motion.div>

      <div className="max-w-sm mx-auto">
        {/* Indicador central */}
        <motion.div
          key={level}
          initial={{ scale: 0.8, opacity: 0.5 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex flex-col items-center gap-2 mb-8"
        >
          <span className="text-5xl">{emoji}</span>
          <motion.div
            className="text-5xl font-black tabular-nums"
            style={{ color }}
          >
            {level}
          </motion.div>
          <div className="text-sm font-medium text-white/50">
            {level <= 3 ? lowLabel : level <= 7 ? '···' : highLabel}
          </div>
        </motion.div>

        {/* Botones de número — más táctiles que un slider */}
        <div className="grid grid-cols-5 gap-2 mb-6">
          {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => {
            const isSelected = level === n
            const nColor = energyColors[n - 1]
            return (
              <motion.button
                key={n}
                whileTap={{ scale: 0.92 }}
                onClick={() => setTestAnswer('energyLevel', n)}
                className="h-12 rounded-xl font-bold text-base transition-all duration-150"
                style={{
                  background: isSelected ? nColor : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${isSelected ? nColor : 'rgba(255,255,255,0.1)'}`,
                  color: isSelected ? '#fff' : 'rgba(255,255,255,0.4)',
                  boxShadow: isSelected ? `0 0 16px ${nColor}50` : 'none',
                }}
              >
                {n}
              </motion.button>
            )
          })}
        </div>

        {/* Labels extremos */}
        <div className="flex justify-between text-xs text-white/30 px-1">
          <span>{lowLabel}</span>
          <span>{highLabel}</span>
        </div>

        {/* Barra de progreso visual */}
        <div className="mt-4 h-2 bg-white/5 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ background: `linear-gradient(to right, #ef4444, ${color})` }}
            animate={{ width: `${level * 10}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>
    </div>
  )
}
