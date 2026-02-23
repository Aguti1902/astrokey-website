'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Sparkles, Star, Gift, Crown } from 'lucide-react'

function AstroIllustration() {
  return (
    <div className="relative w-[400px] h-[400px] sm:w-[460px] sm:h-[460px]">
      {/* Soft glow behind */}
      <div className="absolute inset-[15%] rounded-full bg-amber-500/[0.06] blur-[80px]" />

      <svg viewBox="0 0 400 400" fill="none" className="w-full h-full">
        <defs>
          <linearGradient id="hero-gold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#c9a44a" />
            <stop offset="100%" stopColor="#8b6f2e" />
          </linearGradient>
          <radialGradient id="hero-sun" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.9" />
            <stop offset="60%" stopColor="#d4982a" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#92630a" stopOpacity="0.4" />
          </radialGradient>
          <radialGradient id="hero-sun-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Sun glow */}
        <circle cx="200" cy="200" r="80" fill="url(#hero-sun-glow)" />

        {/* Outer orbit - solid */}
        <circle cx="200" cy="200" r="160" stroke="url(#hero-gold)" strokeWidth="0.8" opacity="0.3" />

        {/* Middle orbit - solid */}
        <circle cx="200" cy="200" r="115" stroke="url(#hero-gold)" strokeWidth="0.8" opacity="0.25" />

        {/* Inner orbit - solid */}
        <circle cx="200" cy="200" r="72" stroke="url(#hero-gold)" strokeWidth="1" opacity="0.35" />

        {/* Elliptical orbit 1 */}
        <ellipse cx="200" cy="200" rx="170" ry="65" stroke="url(#hero-gold)" strokeWidth="0.6" opacity="0.15" transform="rotate(-25 200 200)" strokeDasharray="6 4" />

        {/* Elliptical orbit 2 */}
        <ellipse cx="200" cy="200" rx="155" ry="55" stroke="url(#hero-gold)" strokeWidth="0.6" opacity="0.12" transform="rotate(35 200 200)" strokeDasharray="6 4" />

        {/* Central sun */}
        <circle cx="200" cy="200" r="28" fill="url(#hero-sun)" />
        <circle cx="200" cy="200" r="14" fill="#fde68a" opacity="0.6" />
        <circle cx="200" cy="200" r="6" fill="white" opacity="0.5" />

        {/* Planet 1 - top (large, amber) */}
        <circle cx="200" cy="40" r="10" fill="#c9a44a" opacity="0.85" />
        <circle cx="200" cy="40" r="5" fill="#fde68a" opacity="0.5" />

        {/* Diamond/crystal on top planet */}
        <path d="M200 24 L205 30 L200 36 L195 30 Z" fill="#fbbf24" opacity="0.6" />

        {/* Planet 2 - right */}
        <circle cx="345" cy="145" r="7" fill="#c9a44a" opacity="0.7" />
        <circle cx="345" cy="145" r="3.5" fill="#fde68a" opacity="0.4" />

        {/* Planet 3 - bottom right */}
        <circle cx="315" cy="315" r="8" fill="#c9a44a" opacity="0.6" />
        <circle cx="315" cy="315" r="4" fill="#fde68a" opacity="0.35" />

        {/* Planet 4 - bottom left */}
        <circle cx="80" cy="300" r="6" fill="#c9a44a" opacity="0.5" />
        <circle cx="80" cy="300" r="3" fill="#fde68a" opacity="0.3" />

        {/* Planet 5 - left */}
        <circle cx="50" cy="160" r="8.5" fill="#c9a44a" opacity="0.65" />
        <circle cx="50" cy="160" r="4" fill="#fde68a" opacity="0.4" />

        {/* Small dots on orbits */}
        <circle cx="270" cy="72" r="3" fill="#c9a44a" opacity="0.5" />
        <circle cx="130" cy="82" r="2.5" fill="#c9a44a" opacity="0.4" />
        <circle cx="330" cy="230" r="2.5" fill="#c9a44a" opacity="0.35" />
        <circle cx="95" cy="220" r="2" fill="#c9a44a" opacity="0.3" />
        <circle cx="240" cy="350" r="3" fill="#c9a44a" opacity="0.4" />
        <circle cx="160" cy="340" r="2" fill="#c9a44a" opacity="0.3" />

        {/* Decorative star sparkles */}
        <g opacity="0.4">
          <line x1="355" y1="80" x2="365" y2="80" stroke="#c9a44a" strokeWidth="1" />
          <line x1="360" y1="75" x2="360" y2="85" stroke="#c9a44a" strokeWidth="1" />
        </g>
        <g opacity="0.3">
          <line x1="55" y1="95" x2="63" y2="95" stroke="#c9a44a" strokeWidth="0.8" />
          <line x1="59" y1="91" x2="59" y2="99" stroke="#c9a44a" strokeWidth="0.8" />
        </g>
        <g opacity="0.25">
          <line x1="340" y1="320" x2="346" y2="320" stroke="#c9a44a" strokeWidth="0.7" />
          <line x1="343" y1="317" x2="343" y2="323" stroke="#c9a44a" strokeWidth="0.7" />
        </g>
      </svg>

      {/* Animated planet on outer orbit */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-0"
        style={{ transformOrigin: '50% 50%' }}
      >
        <div
          className="absolute w-3.5 h-3.5 rounded-full bg-amber-400/70 shadow-lg shadow-amber-400/30"
          style={{ top: '10%', left: '50%', transform: 'translate(-50%, -50%)' }}
        />
      </motion.div>

      {/* Animated planet on middle orbit */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-0"
        style={{ transformOrigin: '50% 50%' }}
      >
        <div
          className="absolute w-2.5 h-2.5 rounded-full bg-amber-300/60 shadow-lg shadow-amber-300/20"
          style={{ top: '22%', left: '78%', transform: 'translate(-50%, -50%)' }}
        />
      </motion.div>
    </div>
  )
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-950/50 via-cosmic-dark to-cosmic-dark" />
        <div className="stars-bg absolute inset-0 opacity-40" />

        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.12, 0.2, 0.12] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/4 -left-32 w-96 h-96 bg-primary-500 rounded-full blur-[128px]"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.08, 0.15, 0.08] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute bottom-1/4 -right-32 w-96 h-96 bg-purple-500 rounded-full blur-[128px]"
        />
      </div>

      <div className="section-container relative z-10 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center lg:text-left"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-accent-500/10 border border-accent-500/20 rounded-full mb-6"
          >
            <Gift className="w-4 h-4 text-accent-400" />
            <span className="text-sm font-medium text-accent-300">Oferta Especial Limitada</span>
          </motion.div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
            <span className="text-white">Descubre tu</span>
            <br />
            <span className="gradient-text">Destino Astral</span>
            <br />
            <span className="text-white/80 text-3xl sm:text-4xl lg:text-5xl">en Solo 2 Minutos</span>
          </h1>

          <p className="mt-6 text-lg text-white/60 max-w-lg mx-auto lg:mx-0 leading-relaxed">
            Test astrológico completo + Carta personalizada con análisis detallado
            de tu personalidad, predicciones y compatibilidad.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link href="/intro" className="btn-primary text-lg">
              <Sparkles className="w-5 h-5" />
              Hacer Test
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap gap-6 justify-center lg:justify-start">
            {[
              { icon: Star, text: 'Test Completo' },
              { icon: Gift, text: 'Solo €0.50' },
              { icon: Crown, text: 'Acceso Premium' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-white/50">
                <Icon className="w-4 h-4 text-accent-400" />
                <span className="text-sm font-medium">{text}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="hidden lg:flex items-center justify-center"
        >
          <AstroIllustration />
        </motion.div>
      </div>
    </section>
  )
}
