'use client'

import Image from 'next/image'
import { Star } from 'lucide-react'
import FadeIn from '@/components/ui/FadeIn'

const testimonials = [
  {
    name: 'María González',
    location: 'Madrid, España',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    text: 'Por solo €0.50 descubrí mi carta astral completa. Los 2 días de prueba me convencieron de quedarme. ¡Es increíble!',
    tags: ['Test €0.50', 'Carta Completa'],
  },
  {
    name: 'Carlos Rodríguez',
    location: 'Barcelona, España',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    text: 'El test fue súper fácil y por €0.50 vi mi carta astral. Los 2 días de prueba me dieron tiempo para decidir. ¡Me encantó!',
    tags: ['Fácil Test', '2 Días Prueba'],
  },
  {
    name: 'Ana Martínez',
    location: 'Valencia, España',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
    text: 'Solo €0.50 para ver mi destino astral. Los 2 días de prueba me permitieron explorar todo. ¡Ahora soy suscriptora!',
    tags: ['€0.50', 'Suscriptora'],
  },
]

export default function Testimonials() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-cosmic-deeper to-cosmic-dark" />

      <div className="section-container relative z-10">
        <FadeIn className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Usuarios que descubrieron su destino
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            Miles de personas ya han completado el test y descubierto su verdadero yo astral
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <FadeIn key={t.name} delay={i * 0.15}>
              <div className="glass-card p-8 hover:border-white/20 transition-all duration-300 h-full">
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-primary-500/30">
                    <Image src={t.image} alt={t.name} fill className="object-cover" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">{t.name}</h4>
                    <p className="text-xs text-white/40">{t.location}</p>
                    <div className="flex gap-0.5 mt-1">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <Star key={j} className="w-3 h-3 fill-accent-400 text-accent-400" />
                      ))}
                    </div>
                  </div>
                </div>

                <p className="text-white/50 text-sm leading-relaxed mb-5">
                  &ldquo;{t.text}&rdquo;
                </p>

                <div className="flex flex-wrap gap-2">
                  {t.tags.map((tag) => (
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
      </div>
    </section>
  )
}
