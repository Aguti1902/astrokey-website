'use client'

import Link from 'next/link'
import { UserCircle, Wallet, PieChart, Rocket } from 'lucide-react'
import FadeIn from '@/components/ui/FadeIn'

const steps = [
  {
    number: 1,
    icon: UserCircle,
    title: 'Haz tu Test',
    description: 'Completa nuestro test astrológico personalizado con tus datos de nacimiento.',
    tags: ['Rápido', 'Personal', 'Fácil'],
    color: 'from-primary-500 to-purple-500',
  },
  {
    number: 2,
    icon: Wallet,
    title: 'Paga Solo €0.50',
    description: 'Para ver tus resultados completos, solo pagas €0.50 con 2 días de prueba.',
    tags: ['€0.50', 'Acceso', 'Completo'],
    color: 'from-accent-500 to-orange-500',
  },
  {
    number: 3,
    icon: PieChart,
    title: 'Disfruta tu Carta',
    description: 'Recibe tu carta astral personalizada con análisis detallado y predicciones.',
    tags: ['Personal', 'Análisis', 'Detallado'],
    color: 'from-emerald-500 to-teal-500',
  },
]

export default function HowItWorks() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-cosmic-dark via-cosmic-deeper to-cosmic-dark" />

      <div className="section-container relative z-10">
        <FadeIn className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            ¿Cómo Funciona?
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            Descubre tu destino astral en 3 simples pasos
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <FadeIn key={step.number} delay={i * 0.15}>
              <div className="glass-card p-8 text-center group hover:border-white/20 transition-all duration-500 hover:-translate-y-2 h-full">
                <div className="relative inline-flex mb-6">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <step.icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-white text-cosmic-dark text-xs font-bold flex items-center justify-center">
                    {step.number}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed mb-5">{step.description}</p>

                <div className="flex flex-wrap justify-center gap-2">
                  {step.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1 rounded-full bg-white/5 text-white/40 border border-white/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn className="mt-16 text-center">
          <div className="glass-card inline-flex flex-col items-center gap-4 px-12 py-8">
            <h3 className="text-xl font-bold text-white">¿Listo para descubrir tu destino?</h3>
            <Link href="/intro" className="btn-primary">
              <Rocket className="w-5 h-5" />
              Empezar Ahora
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
