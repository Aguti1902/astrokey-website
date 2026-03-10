'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useAppStore } from '@/lib/store'

interface Props {
  index: 1 | 2 | 3
  onContinue: () => void
}

// ─── Traducciones de los slides ──────────────────────────────────────────────
const slides: Record<string, { title: string; quote: string; sub: string }[]> = {
  es: [
    {
      title: 'El universo guardó este instante',
      quote: '"En el momento en que respiraste por primera vez, los planetas trazaron un mapa único para ti. Nadie más en la historia del universo ha nacido exactamente como tú."',
      sub: 'Tu carta natal es una huella cósmica irrepetible',
    },
    {
      title: 'Los astros revelan tu camino',
      quote: '"Las posiciones del Sol, la Luna y los planetas en tu nacimiento configuran tus dones, tus desafíos y las oportunidades que el universo ha preparado para ti."',
      sub: 'Cada aspecto de tu carta es un mensaje de las estrellas',
    },
    {
      title: 'Tu destino está tomando forma',
      quote: '"Estamos analizando las profundidades de tu carta astral. Las respuestas que has dado nos permiten trazar el mapa más preciso de tu alma y tu propósito en esta vida."',
      sub: 'Tu lectura personalizada está casi lista',
    },
  ],
  en: [
    {
      title: 'The universe preserved this moment',
      quote: '"At the moment you took your first breath, the planets drew a unique map for you. No one else in the history of the universe has been born exactly like you."',
      sub: 'Your natal chart is an unrepeatable cosmic fingerprint',
    },
    {
      title: 'The stars reveal your path',
      quote: '"The positions of the Sun, Moon and planets at your birth configure your gifts, your challenges and the opportunities the universe has prepared for you."',
      sub: 'Each aspect of your chart is a message from the stars',
    },
    {
      title: 'Your destiny is taking shape',
      quote: '"We are analyzing the depths of your astral chart. The answers you have given allow us to draw the most precise map of your soul and your purpose in this life."',
      sub: 'Your personalized reading is almost ready',
    },
  ],
  fr: [
    {
      title: "L'univers a préservé cet instant",
      quote: '"Au moment où vous avez pris votre première respiration, les planètes ont tracé une carte unique pour vous. Personne d\'autre dans l\'histoire de l\'univers n\'est né exactement comme vous."',
      sub: 'Votre thème natal est une empreinte cosmique unique',
    },
    {
      title: 'Les astres révèlent votre chemin',
      quote: '"Les positions du Soleil, de la Lune et des planètes à votre naissance configurent vos dons, vos défis et les opportunités que l\'univers a préparées pour vous."',
      sub: 'Chaque aspect de votre thème est un message des étoiles',
    },
    {
      title: 'Votre destin prend forme',
      quote: '"Nous analysons les profondeurs de votre carte astrale. Les réponses que vous avez données nous permettent de tracer la carte la plus précise de votre âme."',
      sub: 'Votre lecture personnalisée est presque prête',
    },
  ],
  de: [
    {
      title: 'Das Universum bewahrte diesen Moment',
      quote: '"In dem Moment, als du zum ersten Mal Atem holtest, zeichneten die Planeten eine einzigartige Karte für dich. Niemand sonst in der Geschichte des Universums wurde genau wie du geboren."',
      sub: 'Dein Geburtshoroskop ist ein einzigartiger kosmischer Abdruck',
    },
    {
      title: 'Die Sterne enthüllen deinen Weg',
      quote: '"Die Positionen der Sonne, des Mondes und der Planeten bei deiner Geburt konfigurieren deine Gaben, deine Herausforderungen und die Möglichkeiten, die das Universum für dich vorbereitet hat."',
      sub: 'Jeder Aspekt deines Horoskops ist eine Botschaft der Sterne',
    },
    {
      title: 'Dein Schicksal nimmt Gestalt an',
      quote: '"Wir analysieren die Tiefen deiner Astralkarte. Die Antworten, die du gegeben hast, ermöglichen es uns, die präziseste Karte deiner Seele zu zeichnen."',
      sub: 'Deine persönliche Lesung ist fast fertig',
    },
  ],
  it: [
    {
      title: "L'universo ha preservato questo istante",
      quote: '"Nel momento in cui hai preso il tuo primo respiro, i pianeti hanno tracciato una mappa unica per te. Nessun altro nella storia dell\'universo è nato esattamente come te."',
      sub: 'La tua carta natale è un\'impronta cosmica irripetibile',
    },
    {
      title: 'Gli astri rivelano il tuo cammino',
      quote: '"Le posizioni del Sole, della Luna e dei pianeti alla tua nascita configurano i tuoi doni, le tue sfide e le opportunità che l\'universo ha preparato per te."',
      sub: 'Ogni aspetto della tua carta è un messaggio delle stelle',
    },
    {
      title: 'Il tuo destino sta prendendo forma',
      quote: '"Stiamo analizzando le profondità della tua carta astrale. Le risposte che hai dato ci permettono di tracciare la mappa più precisa della tua anima."',
      sub: 'La tua lettura personalizzata è quasi pronta',
    },
  ],
  uk: [
    {
      title: 'Всесвіт зберіг цей момент',
      quote: '"У момент, коли ти зробив перший вдих, планети намалювали унікальну карту для тебе. Ніхто інший в історії всесвіту не народився саме так, як ти."',
      sub: 'Твоя натальна карта — неповторний космічний відбиток',
    },
    {
      title: 'Зірки відкривають твій шлях',
      quote: '"Позиції Сонця, Місяця та планет у момент твого народження формують твої дари, твої виклики та можливості, які всесвіт підготував для тебе."',
      sub: 'Кожен аспект твоєї карти — послання зірок',
    },
    {
      title: 'Твоя доля набуває форми',
      quote: '"Ми аналізуємо глибини твоєї астральної карти. Відповіді, які ти дав, дозволяють нам намалювати найточнішу карту твоєї душі."',
      sub: 'Твоє персоналізоване читання майже готове',
    },
  ],
  ru: [
    {
      title: 'Вселенная сохранила этот момент',
      quote: '"В тот момент, когда вы сделали первый вдох, планеты нарисовали уникальную карту для вас. Никто другой в истории вселенной не родился точно так же, как вы."',
      sub: 'Ваша натальная карта — неповторимый космический отпечаток',
    },
    {
      title: 'Звёзды открывают ваш путь',
      quote: '"Позиции Солнца, Луны и планет при вашем рождении формируют ваши дары, ваши испытания и возможности, которые вселенная подготовила для вас."',
      sub: 'Каждый аспект вашей карты — послание звёзд',
    },
    {
      title: 'Ваша судьба принимает форму',
      quote: '"Мы анализируем глубины вашей астральной карты. Ответы, которые вы дали, позволяют нам нарисовать самую точную карту вашей души."',
      sub: 'Ваше персональное чтение почти готово',
    },
  ],
}

// ─── Ilustraciones CSS ────────────────────────────────────────────────────────

function StarField() {
  return (
    <div className="relative w-64 h-64 mx-auto">
      {/* Constelación animada */}
      <svg viewBox="0 0 200 200" className="w-full h-full absolute inset-0">
        <defs>
          <radialGradient id="starGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="100" cy="100" r="90" fill="url(#starGlow)" />
        {/* Líneas de constelación */}
        {[
          [40, 60, 100, 40], [100, 40, 160, 70], [160, 70, 150, 130],
          [150, 130, 100, 160], [100, 160, 50, 130], [50, 130, 40, 60],
          [100, 40, 100, 160], [40, 60, 150, 130], [160, 70, 50, 130],
        ].map(([x1, y1, x2, y2], i) => (
          <motion.line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
            stroke="rgba(167,139,250,0.3)" strokeWidth="0.8"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.5, delay: i * 0.15, ease: 'easeInOut' }}
          />
        ))}
        {/* Estrellas */}
        {[
          [40, 60, 3], [100, 40, 4], [160, 70, 3], [150, 130, 3.5],
          [100, 160, 3], [50, 130, 3], [100, 100, 5],
          [70, 90, 1.5], [130, 85, 1.5], [80, 140, 1.5], [120, 50, 1.5],
        ].map(([cx, cy, r], i) => (
          <motion.circle key={i} cx={cx} cy={cy} r={r}
            fill="#c4b5fd"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0, 1, 0.7, 1], scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 + i * 0.1, repeat: Infinity, repeatDelay: 3 + i * 0.5 }}
          />
        ))}
      </svg>
    </div>
  )
}

function OrrerySystem() {
  return (
    <div className="relative w-64 h-64 mx-auto">
      <svg viewBox="0 0 200 200" className="w-full h-full absolute inset-0">
        {/* Órbitas */}
        {[30, 50, 70, 90].map((r, i) => (
          <circle key={i} cx="100" cy="100" r={r}
            fill="none" stroke="rgba(99,102,241,0.2)" strokeWidth="0.8" strokeDasharray="3 4" />
        ))}
        {/* Sol central */}
        <motion.circle cx="100" cy="100" r="8" fill="#fbbf24"
          animate={{ filter: ['drop-shadow(0 0 4px #fbbf24)', 'drop-shadow(0 0 12px #fbbf24)', 'drop-shadow(0 0 4px #fbbf24)'] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <circle cx="100" cy="100" r="4" fill="#fde68a" />
      </svg>

      {/* Planetas orbitando */}
      {[
        { orbit: 30, duration: 6, color: '#f87171', size: 'w-3 h-3' },
        { orbit: 50, duration: 10, color: '#60a5fa', size: 'w-4 h-4' },
        { orbit: 70, duration: 16, color: '#a78bfa', size: 'w-3.5 h-3.5' },
        { orbit: 90, duration: 24, color: '#34d399', size: 'w-3 h-3' },
      ].map(({ orbit, duration, color, size }, i) => (
        <motion.div
          key={i}
          className="absolute inset-0"
          style={{ transformOrigin: '50% 50%' }}
          animate={{ rotate: 360 }}
          transition={{ duration, repeat: Infinity, ease: 'linear', delay: i * 1.5 }}
        >
          <div
            className={`absolute rounded-full shadow-lg ${size}`}
            style={{
              background: color,
              top: `calc(50% - ${orbit}px - 6px)`,
              left: `calc(50% - 6px)`,
              boxShadow: `0 0 8px ${color}`,
            }}
          />
        </motion.div>
      ))}
    </div>
  )
}

function CrystalBall() {
  return (
    <div className="relative w-64 h-64 mx-auto flex items-center justify-center">
      {/* Círculos concéntricos con símbolos del zodiaco */}
      <svg viewBox="0 0 200 200" className="w-full h-full absolute inset-0">
        <defs>
          <radialGradient id="ball" cx="40%" cy="35%" r="60%">
            <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.6" />
            <stop offset="60%" stopColor="#4338ca" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#1e1b4b" stopOpacity="0.8" />
          </radialGradient>
          <radialGradient id="shine" cx="35%" cy="30%" r="40%">
            <stop offset="0%" stopColor="white" stopOpacity="0.3" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Bola de cristal */}
        <motion.circle cx="100" cy="110" r="75" fill="url(#ball)"
          animate={{ filter: ['drop-shadow(0 0 15px rgba(99,102,241,0.4))', 'drop-shadow(0 0 30px rgba(99,102,241,0.7))', 'drop-shadow(0 0 15px rgba(99,102,241,0.4))'] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <circle cx="100" cy="110" r="75" fill="url(#shine)" />

        {/* Anillo interior animado */}
        <motion.circle cx="100" cy="110" r="55" fill="none"
          stroke="rgba(167,139,250,0.3)" strokeWidth="0.8" strokeDasharray="5 3"
          animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          style={{ transformOrigin: '100px 110px' }}
        />

        {/* Partículas internas */}
        {[
          [85, 95], [115, 100], [100, 130], [75, 115], [125, 125],
          [90, 120], [110, 95], [100, 105],
        ].map(([x, y], i) => (
          <motion.circle key={i} cx={x} cy={y} r="1.5" fill="#c4b5fd"
            animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.3, 0.8] }}
            transition={{ duration: 2 + i * 0.3, repeat: Infinity, delay: i * 0.4 }}
          />
        ))}

        {/* Soporte */}
        <ellipse cx="100" cy="182" rx="35" ry="6" fill="rgba(99,102,241,0.3)" />
        <rect x="93" y="181" width="14" height="10" rx="3" fill="rgba(99,102,241,0.4)" />
      </svg>
    </div>
  )
}

const illustrations = [StarField, OrrerySystem, CrystalBall]

// ─── Colores por slide ────────────────────────────────────────────────────────
const slideColors = [
  { from: 'from-violet-900/40', to: 'to-indigo-900/40', accent: 'text-violet-300', border: 'border-violet-500/20' },
  { from: 'from-indigo-900/40', to: 'to-blue-900/40', accent: 'text-blue-300', border: 'border-blue-500/20' },
  { from: 'from-purple-900/40', to: 'to-violet-900/40', accent: 'text-purple-300', border: 'border-purple-500/20' },
]

// ─── Componente principal ─────────────────────────────────────────────────────
export default function FillerSlide({ index, onContinue }: Props) {
  const language = useAppStore((s) => s.language)
  const langSlides = slides[language] ?? slides.es
  const slide = langSlides[index - 1]
  const Illustration = illustrations[index - 1]
  const colors = slideColors[index - 1]

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.03 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center text-center px-4 py-6 max-w-lg mx-auto"
    >
      {/* Ilustración CSS */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.7 }}
        className="mb-8"
      >
        <Illustration />
      </motion.div>

      {/* Contenido */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className={`bg-gradient-to-br ${colors.from} ${colors.to} border ${colors.border} rounded-3xl p-8 backdrop-blur-sm`}
      >
        <h2 className={`text-2xl font-bold ${colors.accent} mb-4`}>{slide.title}</h2>
        <p className="text-white/60 text-sm leading-relaxed italic mb-4">
          {slide.quote}
        </p>
        <p className={`text-xs font-semibold uppercase tracking-widest ${colors.accent} opacity-60`}>
          — {slide.sub} —
        </p>
      </motion.div>

      {/* Botón continuar */}
      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.4 }}
        onClick={onContinue}
        className="mt-8 flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-primary-500 to-purple-600 text-white font-semibold rounded-2xl shadow-lg shadow-primary-500/25 hover:shadow-xl hover:scale-105 transition-all"
      >
        Continuar
        <ArrowRight className="w-4 h-4" />
      </motion.button>
    </motion.div>
  )
}
