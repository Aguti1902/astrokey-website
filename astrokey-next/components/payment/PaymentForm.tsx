'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  CreditCard, Lock, Sparkles, ArrowRight, Zap,
  CheckCircle, Shield, Clock
} from 'lucide-react'
import { useAppStore } from '@/lib/store'

export default function PaymentForm() {
  const router = useRouter()
  const { completePayment } = useAppStore()
  const [cardNumber, setCardNumber] = useState('')
  const [cardName, setCardName] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvv, setCvv] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [minutes, setMinutes] = useState(4)
  const [seconds, setSeconds] = useState(54)

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((s) => {
        if (s === 0) {
          setMinutes((m) => (m > 0 ? m - 1 : 0))
          return 59
        }
        return s - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const formatCard = (val: string) => {
    const digits = val.replace(/\D/g, '').slice(0, 16)
    return digits.replace(/(\d{4})/g, '$1 ').trim()
  }

  const formatExpiry = (val: string) => {
    const digits = val.replace(/\D/g, '').slice(0, 4)
    if (digits.length >= 2) return digits.slice(0, 2) + '/' + digits.slice(2)
    return digits
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)
    await new Promise((r) => setTimeout(r, 2500))
    completePayment()
    router.push('/results')
  }

  return (
    <div className="min-h-screen relative z-10">
      {/* Header */}
      <header className="galaxy-glass py-4">
        <div className="max-w-6xl mx-auto px-4 flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-white" />
            <span className="text-lg font-bold text-white">AstroKey</span>
          </Link>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-10">
          {/* Left - offer */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-primary-600/80 to-purple-700/80 backdrop-blur-sm rounded-3xl p-8 text-white mb-8 border border-white/10"
            >
              <div className="flex items-center gap-2 mb-4">
                <Zap className="w-5 h-5 text-accent-300" />
                <span className="text-sm font-bold text-accent-300 uppercase tracking-wider">Oferta Flash</span>
              </div>
              <h2 className="text-2xl font-black mb-4">¡ÚLTIMA OPORTUNIDAD!</h2>
              <div className="flex items-baseline gap-4 mb-4">
                <span className="text-lg line-through text-white/40">19,99€</span>
                <span className="text-5xl font-black">0,50€</span>
              </div>
              <p className="text-white/70 text-sm">
                Solo por tiempo limitado, obtén tu carta astral con un descuento increíble
              </p>
            </motion.div>

            {/* Timer */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="galaxy-glass rounded-2xl p-6 mb-8"
            >
              <h3 className="text-sm font-semibold text-white/70 mb-3">
                Queda tiempo para aprovechar esta oferta:
              </h3>
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-3xl font-black text-white">{String(minutes).padStart(2, '0')}</div>
                  <div className="text-[10px] uppercase text-white/40 font-medium">Minutos</div>
                </div>
                <span className="text-2xl font-bold text-white/20">:</span>
                <div className="text-center">
                  <div className="text-3xl font-black text-white">{String(seconds).padStart(2, '0')}</div>
                  <div className="text-[10px] uppercase text-white/40 font-medium">Segundos</div>
                </div>
              </div>
            </motion.div>

            <div className="space-y-3">
              {[
                'Lectura de carta natal completa',
                'Contenidos especiales de astrólogos',
                'Análisis personalizado detallado',
                '2 días de acceso completo',
              ].map((f, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  <span className="text-sm text-white/60">{f}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right - form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-8">
              <h2 className="text-xl font-bold text-white mb-6">Métodos de pago</h2>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-white/60 mb-2">Número de tarjeta</label>
                  <div className="relative">
                    <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(formatCard(e.target.value))}
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                      required
                      className="w-full pl-12 pr-4 py-3.5 bg-white/5 border-2 border-white/10 rounded-xl text-white placeholder:text-white/25 focus:border-primary-500 focus:ring-0 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/60 mb-2">Nombre del titular</label>
                  <input
                    type="text"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    placeholder="Nombre completo"
                    required
                    className="w-full px-4 py-3.5 bg-white/5 border-2 border-white/10 rounded-xl text-white placeholder:text-white/25 focus:border-primary-500 focus:ring-0 outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-white/60 mb-2">Caducidad</label>
                    <input
                      type="text"
                      value={expiry}
                      onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                      placeholder="MM/AA"
                      maxLength={5}
                      required
                      className="w-full px-4 py-3.5 bg-white/5 border-2 border-white/10 rounded-xl text-white placeholder:text-white/25 focus:border-primary-500 focus:ring-0 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/60 mb-2">CVV</label>
                    <div className="relative">
                      <input
                        type="text"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                        placeholder="123"
                        maxLength={4}
                        required
                        className="w-full px-4 py-3.5 bg-white/5 border-2 border-white/10 rounded-xl text-white placeholder:text-white/25 focus:border-primary-500 focus:ring-0 outline-none"
                      />
                      <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-white/70">Total</span>
                    <span className="text-2xl font-black text-white">0.50 EUR</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-primary-500 to-purple-600 text-white font-bold rounded-2xl shadow-lg shadow-primary-500/25 hover:shadow-xl transition-all disabled:opacity-70"
                >
                  {isProcessing ? (
                    <>
                      <Clock className="w-5 h-5 animate-spin" />
                      Procesando...
                    </>
                  ) : (
                    <>
                      Obtenga su Carta Natal
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>

                <p className="text-xs text-white/30 text-center leading-relaxed">
                  Tu período de prueba terminará después de 2 días y tu suscripción
                  comenzará automáticamente por 19.99 EUR/mes. Puedes cancelar cuando quieras.
                </p>

                <div className="flex items-center justify-center gap-2 text-xs text-white/25">
                  <Shield className="w-4 h-4" />
                  Pago seguro con encriptación SSL
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>

      <footer className="border-t border-white/5 py-6 mt-12 relative z-10">
        <div className="max-w-6xl mx-auto px-4 flex flex-wrap items-center justify-center gap-4 text-xs text-white/30">
          <Link href="/legal/terminos" className="hover:text-white/50 transition-colors">Términos y Condiciones</Link>
          <Link href="/legal/reembolsos" className="hover:text-white/50 transition-colors">Política de Reembolsos</Link>
          <Link href="/legal/privacidad" className="hover:text-white/50 transition-colors">Política de Privacidad</Link>
          <span>© {new Date().getFullYear()} AstroKey</span>
        </div>
      </footer>
    </div>
  )
}
