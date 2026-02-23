'use client'

import { motion } from 'framer-motion'
import { Star, Users, Shield, Sparkles } from 'lucide-react'

const values = [
  { icon: Star, title: 'Excelencia', description: 'Nos esforzamos por ofrecer las interpretaciones astrológicas más precisas y detalladas.' },
  { icon: Users, title: 'Comunidad', description: 'Creamos una comunidad donde todos pueden explorar y entender su destino astral.' },
  { icon: Shield, title: 'Confianza', description: 'Protegemos tu información y te ofrecemos un servicio transparente y honesto.' },
  { icon: Sparkles, title: 'Innovación', description: 'Combinamos la sabiduría ancestral con tecnología moderna para resultados únicos.' },
]

export default function AboutPage() {
  return (
    <div className="pt-28 pb-20">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">Sobre Nosotros</h1>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            En AstroKey, combinamos la sabiduría ancestral de la astrología con la tecnología
            moderna para ofrecerte una experiencia única y personalizada.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-8 md:p-12 mb-16 max-w-3xl mx-auto"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Nuestra Misión</h2>
          <p className="text-white/60 leading-relaxed mb-4">
            Nuestra misión es democratizar el acceso a la astrología de calidad.
            Creemos que todos merecen conocer su carta astral y entender cómo las
            estrellas influyen en su vida cotidiana.
          </p>
          <p className="text-white/60 leading-relaxed">
            Con un equipo de astrólogos certificados y desarrolladores apasionados,
            hemos creado una plataforma que hace la astrología accesible, comprensible
            y útil para todos.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="glass-card p-6 text-center"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center mx-auto mb-4">
                <v.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{v.title}</h3>
              <p className="text-sm text-white/50">{v.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
