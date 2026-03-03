'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Sparkles, Zap, CheckCircle, AlertCircle } from 'lucide-react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import { useAppStore } from '@/lib/store'
import StripePaymentForm from './StripePaymentForm'

const stripePromise = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  ? loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
  : null

const AMOUNT = '0.50 EUR'
const AMOUNT_DISPLAY = '0,50€'

export default function PaymentForm() {
  const { testAnswers, completePayment } = useAppStore()
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [minutes, setMinutes] = useState(4)
  const [seconds, setSeconds] = useState(59)

  // Countdown
  useEffect(() => {
    const t = setInterval(() => {
      setSeconds((s) => {
        if (s === 0) { setMinutes((m) => Math.max(0, m - 1)); return 59 }
        return s - 1
      })
    }, 1000)
    return () => clearInterval(t)
  }, [])

  // Crear PaymentIntent al cargar
  useEffect(() => {
    const init = async () => {
      try {
        const res = await fetch('/api/create-subscription', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: testAnswers.email,
            firstName: testAnswers.firstName,
            lastName: testAnswers.lastName,
          }),
        })

        const data = await res.json()

        if (!res.ok || data.error) {
          throw new Error(data.error || 'Error al inicializar el pago')
        }

        setClientSecret(data.clientSecret)
        completePayment()
      } catch (err: any) {
        setError(err.message || 'Error al conectar con el servidor de pagos')
      } finally {
        setLoading(false)
      }
    }

    init()
  }, [testAnswers.email, testAnswers.firstName, testAnswers.lastName, completePayment])

  const stripeOptions = clientSecret
    ? {
        clientSecret,
        appearance: {
          theme: 'night' as const,
          variables: {
            colorPrimary: '#6366f1',
            colorBackground: 'rgba(255,255,255,0.03)',
            colorText: '#ffffff',
            colorTextSecondary: 'rgba(255,255,255,0.5)',
            colorDanger: '#f87171',
            fontFamily: 'Poppins, system-ui, sans-serif',
            spacingUnit: '5px',
            borderRadius: '12px',
            colorInputBackground: 'rgba(255,255,255,0.04)',
            colorInputBorder: 'rgba(255,255,255,0.12)',
          },
          rules: {
            '.Input': {
              border: '1px solid rgba(255,255,255,0.12)',
              backgroundColor: 'rgba(255,255,255,0.04)',
              boxShadow: 'none',
            },
            '.Input:focus': {
              border: '1px solid #6366f1',
              boxShadow: '0 0 0 2px rgba(99,102,241,0.2)',
            },
            '.Label': {
              color: 'rgba(255,255,255,0.55)',
              fontWeight: '500',
              fontSize: '13px',
            },
            '.Tab': {
              border: '1px solid rgba(255,255,255,0.1)',
              backgroundColor: 'rgba(255,255,255,0.03)',
              color: 'rgba(255,255,255,0.5)',
            },
            '.Tab--selected': {
              border: '1px solid #6366f1',
              backgroundColor: 'rgba(99,102,241,0.1)',
              color: '#ffffff',
            },
          },
        },
      }
    : null

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

      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-10">

          {/* LEFT - Oferta */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-primary-600/80 to-purple-700/80 backdrop-blur-sm rounded-3xl p-8 text-white border border-white/10"
            >
              <div className="flex items-center gap-2 mb-4">
                <Zap className="w-5 h-5 text-accent-300" />
                <span className="text-sm font-bold text-accent-300 uppercase tracking-wider">Oferta Flash</span>
              </div>
              <h2 className="text-2xl font-black mb-4">¡ÚLTIMA OPORTUNIDAD!</h2>
              <div className="flex items-baseline gap-4 mb-4">
                <span className="text-lg line-through text-white/40">19,99€</span>
                <span className="text-5xl font-black">{AMOUNT_DISPLAY}</span>
              </div>
              <p className="text-white/70 text-sm">
                Solo por tiempo limitado. Accede a tu carta astral completa.
              </p>
            </motion.div>

            {/* Countdown */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="galaxy-glass rounded-2xl p-5"
            >
              <p className="text-sm font-semibold text-white/60 mb-3">Oferta expira en:</p>
              <div className="flex items-center gap-4">
                {[{ label: 'MINUTOS', val: minutes }, { label: 'SEGUNDOS', val: seconds }].map(({ label, val }, i) => (
                  <div key={label} className="text-center">
                    <div className="text-3xl font-black text-white tabular-nums">
                      {String(val).padStart(2, '0')}
                    </div>
                    <div className="text-[10px] uppercase text-white/30 font-medium">{label}</div>
                  </div>
                )).reduce((acc, el, i) => [
                  ...acc,
                  el,
                  i === 0 ? <span key="sep" className="text-2xl font-bold text-white/20">:</span> : null
                ].filter(Boolean), [] as any[])}
              </div>
            </motion.div>

            {/* Beneficios */}
            <div className="space-y-3">
              {[
                'Carta natal completa personalizada',
                'Análisis detallado de personalidad',
                'Predicciones y compatibilidad',
                '2 días de acceso completo',
              ].map((f) => (
                <div key={f} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  <span className="text-sm text-white/60">{f}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT - Stripe Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-8">
              <h2 className="text-xl font-bold text-white mb-6">Método de pago</h2>

              {/* Loading */}
              {loading && (
                <div className="flex flex-col items-center justify-center py-12 gap-4">
                  <div className="w-10 h-10 rounded-full border-2 border-primary-500/30 border-t-primary-500 animate-spin" />
                  <p className="text-white/40 text-sm">Inicializando pago seguro...</p>
                </div>
              )}

              {/* Error de inicialización */}
              {error && !loading && (
                <div className="flex flex-col items-center gap-4 py-8 text-center">
                  <AlertCircle className="w-12 h-12 text-red-400" />
                  <div>
                    <p className="text-white font-semibold mb-1">Error al cargar el pago</p>
                    <p className="text-white/40 text-sm">{error}</p>
                  </div>
                  <button
                    onClick={() => window.location.reload()}
                    className="px-6 py-2 bg-primary-500/20 border border-primary-500/30 text-primary-300 rounded-xl text-sm hover:bg-primary-500/30 transition-colors"
                  >
                    Reintentar
                  </button>
                </div>
              )}

              {/* Stripe Elements */}
              {!loading && !error && stripePromise && stripeOptions && (
                <Elements stripe={stripePromise} options={stripeOptions}>
                  <StripePaymentForm amount={AMOUNT_DISPLAY} />
                </Elements>
              )}

              {/* Sin claves de Stripe configuradas */}
              {!loading && !error && !stripePromise && (
                <div className="text-center py-8">
                  <AlertCircle className="w-12 h-12 text-amber-400 mx-auto mb-3" />
                  <p className="text-white font-semibold mb-1">Stripe no está configurado</p>
                  <p className="text-white/40 text-sm">
                    Añade <code className="text-primary-400">NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY</code> en tu archivo .env.local
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/5 py-6 mt-12 relative z-10">
        <div className="max-w-6xl mx-auto px-4 flex flex-wrap items-center justify-center gap-4 text-xs text-white/25">
          <Link href="/legal/terminos" className="hover:text-white/50 transition-colors">Términos y Condiciones</Link>
          <Link href="/legal/reembolsos" className="hover:text-white/50 transition-colors">Política de Reembolsos</Link>
          <Link href="/legal/privacidad" className="hover:text-white/50 transition-colors">Política de Privacidad</Link>
          <span>© {new Date().getFullYear()} AstroKey</span>
        </div>
      </footer>
    </div>
  )
}
