'use client'

import { motion } from 'framer-motion'
import { Mail, MessageCircle, FileText, ExternalLink } from 'lucide-react'
import Link from 'next/link'

const helpCards = [
  {
    icon: FileText,
    title: 'FAQ',
    description: 'Consulta las preguntas más frecuentes sobre nuestro servicio.',
    link: '/faq',
    linkText: 'Ver FAQ',
  },
  {
    icon: Mail,
    title: 'Email',
    description: 'Envíanos un correo y te responderemos en menos de 24 horas.',
    link: 'mailto:soporte@astrokey.com',
    linkText: 'soporte@astrokey.com',
  },
  {
    icon: MessageCircle,
    title: 'Chat en Vivo',
    description: 'Habla con nuestro equipo en tiempo real para resolver tus dudas.',
    link: '#',
    linkText: 'Iniciar Chat',
  },
]

export default function HelpPage() {
  return (
    <div className="pt-28 pb-20">
      <div className="section-container max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-white mb-4">Centro de Ayuda</h1>
          <p className="text-white/50 text-lg">¿Necesitas ayuda? Estamos aquí para ti.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {helpCards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                href={card.link}
                className="glass-card p-8 text-center block hover:border-primary-500/30 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-primary flex items-center justify-center mx-auto mb-4">
                  <card.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{card.title}</h3>
                <p className="text-sm text-white/50 mb-4">{card.description}</p>
                <span className="text-sm text-primary-400 font-medium inline-flex items-center gap-1">
                  {card.linkText}
                  <ExternalLink className="w-3 h-3" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
