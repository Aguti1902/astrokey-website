'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Shield } from 'lucide-react'

const zodiacRing = ['♈','♉','♊','♋','♌','♍','♎','♏','♐','♑','♒','♓']

export default function IntroPage() {
  return (
    <div className="min-h-screen flex flex-col relative z-10">
      {/* Header */}
      <header className="py-5 px-4">
        <div className="max-w-5xl mx-auto flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-white" />
            <span className="text-lg font-bold text-white">AstroKey</span>
          </Link>
        </div>
      </header>

      {/* Main */}
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="max-w-5xl w-full grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-6">
              Por favor, no te apresures al responder a las preguntas.
            </h1>
            <p className="text-white/50 text-lg leading-relaxed mb-10">
              Todas las respuestas nos ayudarán a conocerte y a sugerirte contenidos personalizados.
            </p>

            <Link
              href="/test"
              className="inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-primary-500 to-purple-600 text-white font-bold text-lg rounded-2xl shadow-lg shadow-primary-500/25 hover:shadow-xl hover:-translate-y-0.5 transition-all"
            >
              Comencemos
              <ArrowRight className="w-5 h-5" />
            </Link>

            <div className="mt-8 flex items-start gap-2 text-xs text-white/30 max-w-md">
              <Shield className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <p>
                Garantizamos la privacidad de tus datos. Al continuar, aceptas nuestra
                política de cancelación y reembolso, y los términos y condiciones de AstroKey.
              </p>
            </div>
          </motion.div>

          {/* Right - zodiac illustration CSS */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="hidden lg:flex items-center justify-center"
          >
            <div className="relative w-[340px] h-[340px]">
              <div className="absolute inset-0 rounded-full bg-primary-500/5 blur-[40px]" />

              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0"
              >
                {zodiacRing.map((s, i) => {
                  const a = (i * 30 - 90) * (Math.PI / 180)
                  return (
                    <div
                      key={i}
                      className="absolute text-2xl text-white/25"
                      style={{
                        left: `${50 + 46 * Math.cos(a)}%`,
                        top: `${50 + 46 * Math.sin(a)}%`,
                        transform: 'translate(-50%, -50%)',
                      }}
                    >
                      {s}
                    </div>
                  )
                })}
              </motion.div>

              <div className="absolute inset-8 rounded-full border border-white/[0.06]" />
              <div className="absolute inset-16 rounded-full border border-white/[0.04]" />

              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-500/30 to-purple-500/30 border border-primary-500/20 flex items-center justify-center"
                >
                  <Sparkles className="w-7 h-7 text-primary-300" />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
