'use client'

import { Sun, Moon, Orbit, Stars, Compass, Eclipse, Sparkles } from 'lucide-react'
import FadeIn from '@/components/ui/FadeIn'

function CartaNatalIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" fill="none" className={className}>
      <circle cx="60" cy="60" r="50" stroke="url(#natal-g)" strokeWidth="1.5" opacity="0.4" />
      <circle cx="60" cy="60" r="36" stroke="url(#natal-g)" strokeWidth="1" opacity="0.3" />
      <circle cx="60" cy="60" r="22" stroke="url(#natal-g)" strokeWidth="1" opacity="0.2" />
      <line x1="60" y1="10" x2="60" y2="110" stroke="url(#natal-g)" strokeWidth="0.8" opacity="0.2" />
      <line x1="10" y1="60" x2="110" y2="60" stroke="url(#natal-g)" strokeWidth="0.8" opacity="0.2" />
      <line x1="24" y1="24" x2="96" y2="96" stroke="url(#natal-g)" strokeWidth="0.5" opacity="0.15" />
      <line x1="96" y1="24" x2="24" y2="96" stroke="url(#natal-g)" strokeWidth="0.5" opacity="0.15" />
      <circle cx="60" cy="14" r="4" fill="url(#natal-g)" opacity="0.9" />
      <circle cx="93" cy="40" r="3.5" fill="url(#natal-g)" opacity="0.7" />
      <circle cx="82" cy="88" r="3" fill="url(#natal-g)" opacity="0.6" />
      <circle cx="30" cy="78" r="4" fill="url(#natal-g)" opacity="0.8" />
      <circle cx="24" cy="38" r="3" fill="url(#natal-g)" opacity="0.5" />
      <circle cx="60" cy="60" r="6" fill="url(#natal-g)" opacity="0.9" />
      <circle cx="60" cy="60" r="3" fill="white" opacity="0.8" />
      <defs>
        <linearGradient id="natal-g" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f43f5e" />
          <stop offset="100%" stopColor="#f97316" />
        </linearGradient>
      </defs>
    </svg>
  )
}

function CompatibilidadIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" fill="none" className={className}>
      <circle cx="42" cy="60" r="30" stroke="url(#compat-g)" strokeWidth="1.5" opacity="0.4" />
      <circle cx="78" cy="60" r="30" stroke="url(#compat-g)" strokeWidth="1.5" opacity="0.4" />
      <path d="M60 38 C55 45, 55 75, 60 82 C65 75, 65 45, 60 38Z" fill="url(#compat-g)" opacity="0.15" />
      <circle cx="42" cy="60" r="5" fill="url(#compat-g)" opacity="0.8" />
      <circle cx="78" cy="60" r="5" fill="url(#compat-g)" opacity="0.8" />
      <circle cx="42" cy="60" r="2.5" fill="white" opacity="0.7" />
      <circle cx="78" cy="60" r="2.5" fill="white" opacity="0.7" />
      <circle cx="28" cy="42" r="2.5" fill="url(#compat-g)" opacity="0.5" />
      <circle cx="56" cy="42" r="2" fill="url(#compat-g)" opacity="0.4" />
      <circle cx="64" cy="78" r="2" fill="url(#compat-g)" opacity="0.4" />
      <circle cx="92" cy="48" r="2.5" fill="url(#compat-g)" opacity="0.5" />
      <path d="M55 55 L60 50 L65 55 L60 65 Z" fill="url(#compat-g)" opacity="0.6" />
      <defs>
        <linearGradient id="compat-g" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>
    </svg>
  )
}

function TransitosIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" fill="none" className={className}>
      <circle cx="60" cy="60" r="44" stroke="url(#transit-g)" strokeWidth="1" opacity="0.3" strokeDasharray="4 4" />
      <circle cx="60" cy="60" r="28" stroke="url(#transit-g)" strokeWidth="1.5" opacity="0.4" />
      <ellipse cx="60" cy="60" rx="50" ry="20" stroke="url(#transit-g)" strokeWidth="0.8" opacity="0.2" transform="rotate(-30 60 60)" />
      <ellipse cx="60" cy="60" rx="50" ry="20" stroke="url(#transit-g)" strokeWidth="0.8" opacity="0.2" transform="rotate(30 60 60)" />
      <circle cx="60" cy="60" r="7" fill="url(#transit-g)" opacity="0.9" />
      <circle cx="60" cy="60" r="4" fill="white" opacity="0.6" />
      <circle cx="60" cy="16" r="4" fill="url(#transit-g)" opacity="0.7" />
      <circle cx="97" cy="50" r="3" fill="url(#transit-g)" opacity="0.6" />
      <circle cx="88" cy="88" r="3.5" fill="url(#transit-g)" opacity="0.7" />
      <circle cx="32" cy="85" r="2.5" fill="url(#transit-g)" opacity="0.5" />
      <circle cx="22" cy="48" r="3" fill="url(#transit-g)" opacity="0.6" />
      <path d="M56 16 L60 10 L64 16" stroke="url(#transit-g)" strokeWidth="1.5" fill="none" opacity="0.5" />
      <defs>
        <linearGradient id="transit-g" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#eab308" />
        </linearGradient>
      </defs>
    </svg>
  )
}

const cards = [
  {
    Icon: CartaNatalIcon,
    name: 'Carta Natal',
    subtitle: 'Tu mapa estelar',
    description: 'Descubre las posiciones planetarias exactas en el momento de tu nacimiento.',
    gradient: 'from-rose-500 to-orange-500',
    glow: 'shadow-rose-500/20',
    rotate: '-rotate-3',
    border: 'hover:border-rose-500/30',
  },
  {
    Icon: CompatibilidadIcon,
    name: 'Compatibilidad',
    subtitle: 'Sinastría astral',
    description: 'Analiza la compatibilidad con tu pareja a nivel cósmico.',
    gradient: 'from-primary-500 to-violet-500',
    glow: 'shadow-primary-500/20',
    rotate: 'rotate-0',
    featured: true,
    border: 'hover:border-primary-500/30',
  },
  {
    Icon: TransitosIcon,
    name: 'Tránsitos',
    subtitle: 'Tu futuro astral',
    description: 'Conoce cómo los planetas actuales influyen en tu carta natal.',
    gradient: 'from-amber-500 to-yellow-500',
    glow: 'shadow-amber-500/20',
    rotate: 'rotate-3',
    border: 'hover:border-amber-500/30',
  },
]

const miniCards = [
  { Icon: Sun, name: 'Revolución Solar', color: 'from-emerald-400 to-teal-500', iconColor: 'text-emerald-400' },
  { Icon: Moon, name: 'Carta Lunar', color: 'from-sky-400 to-blue-500', iconColor: 'text-sky-400' },
  { Icon: Orbit, name: 'Progresiones', color: 'from-fuchsia-400 to-pink-500', iconColor: 'text-fuchsia-400' },
  { Icon: Compass, name: 'Retorno Saturno', color: 'from-indigo-400 to-purple-500', iconColor: 'text-indigo-400' },
]

export default function AstralCards() {
  return (
    <section className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-cosmic-deeper via-[#0a0e27] to-cosmic-dark" />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-500/[0.06] rounded-full blur-[150px]" />
      <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-purple-500/[0.05] rounded-full blur-[120px]" />

      <div className="section-container relative z-10">
        <FadeIn className="text-center mb-20">
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-primary-400 mb-4">Nuestras lecturas</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Tipos de Cartas Astrales
          </h2>
          <p className="text-white/40 text-lg max-w-2xl mx-auto">
            Cada carta revela un aspecto diferente de tu conexión con el universo
          </p>
        </FadeIn>

        <div className="flex flex-col items-center md:flex-row md:justify-center md:items-end gap-6 mb-20 px-4">
          {cards.map((card, i) => (
            <FadeIn key={card.name} delay={i * 0.15}>
              <div
                className={`group relative transition-all duration-500 ${card.featured ? 'z-10' : 'z-0'}`}
              >
                <div
                  className={`relative w-full max-w-[300px] md:w-[240px] lg:w-[280px] ${card.featured ? 'h-[380px] md:h-[400px] lg:h-[440px]' : 'h-[360px] md:h-[360px] lg:h-[400px]'} rounded-3xl overflow-hidden cursor-pointer
                    border border-white/10 ${card.border} transition-all duration-500
                    shadow-2xl ${card.glow} hover:-translate-y-3`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-[0.07] group-hover:opacity-[0.15] transition-opacity`} />
                  <div className="absolute inset-0 bg-cosmic-dark/85 backdrop-blur-sm" />
                  <div className="absolute inset-0 stars-bg opacity-20" />

                  <div className="relative h-full flex flex-col items-center justify-center p-8 text-center">
                    {/* SVG illustration */}
                    <div className="w-28 h-28 sm:w-32 sm:h-32 mb-6 group-hover:scale-110 transition-transform duration-500">
                      <card.Icon className="w-full h-full" />
                    </div>

                    <div className={`w-12 h-0.5 bg-gradient-to-r ${card.gradient} rounded-full mb-4 group-hover:w-20 transition-all duration-500`} />

                    <h3 className="text-xl font-bold text-white mb-1">{card.name}</h3>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 mb-4">{card.subtitle}</p>
                    <p className="text-sm text-white/40 leading-relaxed">{card.description}</p>

                    {card.featured && (
                      <div className="mt-5 px-4 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/20 text-[10px] font-semibold uppercase tracking-wider text-primary-300">
                        Más Popular
                      </div>
                    )}
                  </div>

                  <div className={`absolute top-5 right-5 w-2 h-2 rounded-full bg-gradient-to-br ${card.gradient} opacity-60`} />
                  <div className={`absolute bottom-5 left-5 w-1.5 h-1.5 rounded-full bg-gradient-to-br ${card.gradient} opacity-40`} />
                  <div className={`absolute top-1/3 right-6 w-1 h-1 rounded-full bg-gradient-to-br ${card.gradient} opacity-30`} />
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {miniCards.map((card) => (
              <div
                key={card.name}
                className="group glass-card p-6 text-center hover:border-white/20 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
              >
                <div className="flex justify-center mb-3">
                  <card.Icon className={`w-7 h-7 ${card.iconColor} group-hover:scale-110 transition-transform`} />
                </div>
                <p className="text-sm font-medium text-white/60 group-hover:text-white/80 transition-colors">{card.name}</p>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
