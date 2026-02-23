'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

const faqs = [
  {
    q: '¿Qué es una carta astral?',
    a: 'Una carta astral es un mapa del cielo en el momento exacto de tu nacimiento. Muestra la posición de los planetas, el sol y la luna, y cómo estas posiciones influyen en tu personalidad, relaciones y destino.',
  },
  {
    q: '¿Cuánto cuesta el servicio?',
    a: 'El período de prueba cuesta solo €0.50 y te da acceso completo durante 2 días. Después, la suscripción mensual es de €19.99. Puedes cancelar en cualquier momento.',
  },
  {
    q: '¿Cómo funciona el test astrológico?',
    a: 'Nuestro test consta de 14 preguntas sobre tu información personal, preferencias y personalidad. Con estos datos, generamos una carta astral completa y personalizada.',
  },
  {
    q: '¿Puedo cancelar mi suscripción?',
    a: 'Sí, puedes cancelar tu suscripción en cualquier momento. Si cancelas durante el período de prueba de 2 días, no se te cobrará la suscripción mensual.',
  },
  {
    q: '¿Es necesario saber mi hora de nacimiento?',
    a: 'Para una carta astral más precisa, es recomendable. Sin embargo, si no la conoces, puedes usar una hora aproximada y aún obtendrás resultados valiosos.',
  },
  {
    q: '¿Mis datos están protegidos?',
    a: 'Absolutamente. Utilizamos encriptación SSL y seguimos estrictos protocolos de protección de datos conforme al RGPD. Tu información personal nunca se comparte con terceros.',
  },
  {
    q: '¿Qué incluye la carta astral?',
    a: 'Tu carta astral incluye tu signo solar, lunar, ascendente, elemento dominante, casa astrológica, planeta dominante, aspectos planetarios, nodos lunares y una interpretación personalizada completa.',
  },
]

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="glass-card overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-6 text-left"
      >
        <span className="text-white font-medium pr-4">{q}</span>
        <ChevronDown className={cn('w-5 h-5 text-white/40 transition-transform flex-shrink-0', open && 'rotate-180')} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="px-6 pb-6">
              <p className="text-white/50 text-sm leading-relaxed">{a}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FaqPage() {
  return (
    <div className="pt-28 pb-20">
      <div className="section-container max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-white mb-4">Preguntas Frecuentes</h1>
          <p className="text-white/50">Encuentra respuestas a las preguntas más comunes</p>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <FaqItem {...faq} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
