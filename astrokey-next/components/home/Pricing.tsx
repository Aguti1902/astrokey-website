'use client'

import Link from 'next/link'
import { Check, Sparkles, Gift } from 'lucide-react'
import FadeIn from '@/components/ui/FadeIn'

const features = [
  'Conocer tu carta astral completa',
  'Descargar en PDF',
  'Compartir en redes sociales',
  'Descargas ilimitadas',
  'Guardar tus tests en tu cuenta',
  'Invitar amigos a hacer tests',
]

export default function Pricing() {
  return (
    <section id="precios" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-cosmic-deeper via-cosmic-dark to-cosmic-deeper" />

      <div className="section-container relative z-10">
        <FadeIn className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Tu Carta Astral en 3 Pasos
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            Descubre tu destino astral de forma rápida y personalizada
          </p>
        </FadeIn>

        <FadeIn className="max-w-4xl mx-auto">
          <div className="glass-card p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-12">
              <div className="flex flex-col justify-center text-center md:text-left">
                <h3 className="text-xl font-bold text-white mb-6">
                  Accede a todas las funciones durante 2 días de prueba
                </h3>

                <div className="mb-6">
                  <span className="text-5xl font-black gradient-text">0.50€</span>
                  <span className="text-white/40 ml-2">prueba</span>
                </div>

                <p className="text-white/40 text-sm mb-2">
                  Después del periodo de prueba, la suscripción mensual de
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-white">19.99€</span>
                  <span className="text-white/40">/mes</span>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white mb-6">Con AstroKey puedes</h3>
                <ul className="space-y-4">
                  {features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-emerald-400" />
                      </div>
                      <span className="text-sm text-white/60">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.2} className="mt-12 max-w-4xl mx-auto">
          <div className="relative glass-card p-8 md:p-10 text-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 via-purple-500/10 to-accent-500/10" />
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 mb-4">
                <Gift className="w-5 h-5 text-accent-400" />
                <span className="text-accent-300 font-semibold">¡Prueba por Solo €0.50!</span>
              </div>
              <p className="text-white/50 mb-6">
                Descubre tu destino astral y disfruta de 2 días completos de acceso premium
              </p>
              <div className="flex flex-wrap justify-center gap-4 mb-8 text-sm text-white/40">
                <span>✓ Test completo</span>
                <span>✓ Solo €0.50</span>
                <span>✓ 2 días de acceso</span>
                <span>✓ Cancelación sin costos</span>
              </div>
              <Link href="/intro" className="btn-accent">
                <Sparkles className="w-5 h-5" />
                Hacer Test Ahora
              </Link>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
