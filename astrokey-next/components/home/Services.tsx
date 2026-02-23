'use client'

import { TrendingUp, Video, Brain, Heart, Moon, ArrowUp } from 'lucide-react'
import FadeIn from '@/components/ui/FadeIn'

const services = [
  {
    icon: TrendingUp,
    title: 'Carta Natal Completa',
    description: 'Análisis detallado de tu carta natal con interpretación avanzada, incluyendo planetas, casas, aspectos y tránsitos.',
    tags: ['IA Avanzada', 'Detallado', 'Completo'],
  },
  {
    icon: Video,
    title: 'Consultas Personalizadas',
    description: 'Experiencias inmersivas con contenido astrológico creado por expertos certificados.',
    tags: ['Expertos', 'Personalizado', 'Premium'],
  },
  {
    icon: Brain,
    title: 'Predicciones Inteligentes',
    description: 'Predicciones basadas en algoritmos avanzados que analizan patrones astrológicos para máxima precisión.',
    tags: ['Preciso', 'Avanzado', 'Actualizado'],
  },
  {
    icon: Heart,
    title: 'Compatibilidad',
    description: 'Análisis de compatibilidad que evalúa múltiples dimensiones de tus relaciones personales.',
    tags: ['Relaciones', 'Multi-aspecto', 'Detallado'],
  },
  {
    icon: Moon,
    title: 'Signo Lunar',
    description: 'Explora tu signo lunar con visualizaciones interactivas de las fases lunares y su influencia.',
    tags: ['Interactivo', 'Visual', 'Lunar'],
  },
  {
    icon: ArrowUp,
    title: 'Ascendente',
    description: 'Calcula y analiza tu signo ascendente con un análisis de personalidad profundo y detallado.',
    tags: ['Personalidad', 'Profundo', 'Análisis'],
  },
]

export default function Services() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-cosmic-dark to-cosmic-deeper" />

      <div className="section-container relative z-10">
        <FadeIn className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Lo que descubrirás en tu Carta Astral
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            Accede a toda esta información con tu carta astral personalizada
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <FadeIn key={service.title} delay={i * 0.1}>
              <div className="glass-card p-8 group hover:border-primary-500/30 transition-all duration-500 hover:-translate-y-1 h-full">
                <div className="w-14 h-14 rounded-2xl bg-gradient-primary flex items-center justify-center mb-6 shadow-lg shadow-primary-500/20 group-hover:shadow-primary-500/40 transition-shadow">
                  <service.icon className="w-6 h-6 text-white" />
                </div>

                <h3 className="text-lg font-bold text-white mb-3">{service.title}</h3>
                <p className="text-white/45 text-sm leading-relaxed mb-5">{service.description}</p>

                <div className="flex flex-wrap gap-2">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1 rounded-full bg-primary-500/10 text-primary-300 border border-primary-500/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
