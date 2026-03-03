'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  Sparkles, Zap, CheckCircle, AlertCircle,
  Star, Shield, Lock, Users, TrendingUp,
  Clock, RefreshCw,
} from 'lucide-react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import { useAppStore } from '@/lib/store'
import StripePaymentForm from './StripePaymentForm'

const stripePromise = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  ? loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
  : null

const AMOUNT_DISPLAY = '0,50€'


const reviews = [
  {
    name: 'María G.',
    location: 'Madrid',
    avatar: 'MG',
    stars: 5,
    text: 'Increíble precisión. Mi carta astral describió mi personalidad mejor que yo misma. ¡Totalmente recomendado!',
    sign: 'Libra',
    color: 'from-pink-500 to-rose-500',
  },
  {
    name: 'Carlos R.',
    location: 'Barcelona',
    avatar: 'CR',
    stars: 5,
    text: 'Pensé que era uno más, pero la interpretación fue muy profunda. Me ayudó a entender patrones en mi vida.',
    sign: 'Escorpio',
    color: 'from-violet-500 to-purple-600',
  },
  {
    name: 'Ana M.',
    location: 'Valencia',
    avatar: 'AM',
    stars: 5,
    text: 'La predicción para los próximos meses fue exacta. Ya estoy suscrita y no me lo perdería por nada.',
    sign: 'Piscis',
    color: 'from-sky-500 to-blue-600',
  },
]

const benefits = [
  'Carta natal completa con 8 factores astrales',
  'Análisis profundo de personalidad',
  'Predicciones para los próximos 3 meses',
  'Estadísticas de energía por área de vida',
  'Compatibilidad con otros signos',
  'Números y colores de la suerte',
  '2 días de acceso premium completo',
  'Cancela cuando quieras, sin compromiso',
]

const stats = [
  { value: '+47.000', label: 'cartas generadas', Icon: Star },
  { value: '4.9/5', label: 'valoración media', Icon: TrendingUp },
  { value: '98%', label: 'clientes satisfechos', Icon: Users },
]

export default function PaymentForm() {
  const { testAnswers, completePayment } = useAppStore()
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [paymentIntentId, setPaymentIntentId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [minutes, setMinutes] = useState(4)
  const [seconds, setSeconds] = useState(59)

  useEffect(() => {
    const t = setInterval(() => {
      setSeconds((s) => {
        if (s === 0) { setMinutes((m) => Math.max(0, m - 1)); return 59 }
        return s - 1
      })
    }, 1000)
    return () => clearInterval(t)
  }, [])

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
        if (!res.ok || data.error) throw new Error(data.error || 'Error al inicializar el pago')
        setClientSecret(data.clientSecret)
        setPaymentIntentId(data.paymentIntentId)
        completePayment(data.paymentIntentId)
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
            colorBackground: 'rgba(255,255,255,0.02)',
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
            '.Input': { border: '1px solid rgba(255,255,255,0.12)', backgroundColor: 'rgba(255,255,255,0.04)', boxShadow: 'none' },
            '.Input:focus': { border: '1px solid #6366f1', boxShadow: '0 0 0 2px rgba(99,102,241,0.2)' },
            '.Label': { color: 'rgba(255,255,255,0.55)', fontWeight: '500', fontSize: '13px' },
            '.Tab': { border: '1px solid rgba(255,255,255,0.1)', backgroundColor: 'rgba(255,255,255,0.03)', color: 'rgba(255,255,255,0.5)' },
            '.Tab--selected': { border: '1px solid #6366f1', backgroundColor: 'rgba(99,102,241,0.1)', color: '#ffffff' },
          },
        },
      }
    : null

  return (
    <div className="min-h-screen relative z-10">
      <header className="galaxy-glass py-4">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-white" />
            <span className="text-lg font-bold text-white">AstroKey</span>
          </Link>
          <div className="flex items-center gap-2 text-xs text-white/30">
            <Lock className="w-3.5 h-3.5" />
            Pago 100% seguro
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">

        {/* ── Stats sociales ───────────────────────────────────────────── */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-3 gap-3">
          {stats.map(({ value, label, Icon }) => (
            <div key={label} className="galaxy-glass rounded-xl p-3 text-center">
              <Icon className="w-4 h-4 text-accent-400 mx-auto mb-1" />
              <p className="text-lg font-black text-white">{value}</p>
              <p className="text-[10px] text-white/30 uppercase tracking-wide">{label}</p>
            </div>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">

          {/* ── LEFT ─────────────────────────────────────────────────── */}
          <div className="space-y-5">

            {/* Oferta flash */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-primary-600/80 to-purple-700/80 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-accent-300" />
                  <span className="text-xs font-bold text-accent-300 uppercase tracking-wider">Oferta Especial</span>
                </div>
                <span className="text-xs bg-red-500/20 text-red-300 border border-red-500/30 rounded-full px-2 py-0.5">Solo hoy</span>
              </div>
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-base line-through text-white/40">19,99€</span>
                <span className="text-5xl font-black text-white">{AMOUNT_DISPLAY}</span>
              </div>
              <p className="text-white/60 text-sm">Accede a tu carta astral completa por solo {AMOUNT_DISPLAY}</p>
            </motion.div>

            {/* Countdown */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="galaxy-glass rounded-2xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-white/40 uppercase tracking-wider mb-1">Oferta expira en</p>
                  <div className="flex items-center gap-2">
                    <span className="text-3xl font-black text-white tabular-nums">{String(minutes).padStart(2, '0')}</span>
                    <span className="text-xl text-white/30">:</span>
                    <span className="text-3xl font-black text-white tabular-nums">{String(seconds).padStart(2, '0')}</span>
                  </div>
                  <div className="flex gap-4 mt-0.5">
                    <span className="text-[9px] text-white/25 uppercase tracking-wider">minutos</span>
                    <span className="text-[9px] text-white/25 uppercase tracking-wider ml-2">segundos</span>
                  </div>
                </div>
                <Clock className="w-10 h-10 text-white/10" />
              </div>
            </motion.div>

            {/* Beneficios */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
              className="galaxy-glass rounded-2xl p-5">
              <p className="text-sm font-semibold text-white mb-3">Incluido en tu carta astral:</p>
              <div className="grid grid-cols-1 gap-2">
                {benefits.map((b) => (
                  <div key={b} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span className="text-sm text-white/60">{b}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Garantía */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="galaxy-glass rounded-2xl p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                <RefreshCw className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">Garantía de reembolso 14 días</p>
                <p className="text-xs text-white/40">Si no estás satisfecho, te devolvemos el dinero sin preguntas.</p>
              </div>
            </motion.div>
          </div>

          {/* ── RIGHT - Form ─────────────────────────────────────────── */}
          <div className="space-y-5">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
                <h2 className="text-lg font-bold text-white mb-5">Método de pago</h2>

                {loading && (
                  <div className="flex flex-col items-center justify-center py-10 gap-4">
                    <div className="w-10 h-10 rounded-full border-2 border-primary-500/30 border-t-primary-500 animate-spin" />
                    <p className="text-white/40 text-sm">Inicializando pago seguro...</p>
                  </div>
                )}

                {error && !loading && (
                  <div className="flex flex-col items-center gap-4 py-8 text-center">
                    <AlertCircle className="w-12 h-12 text-red-400" />
                    <div>
                      <p className="text-white font-semibold mb-1">Error al cargar el pago</p>
                      <p className="text-white/40 text-sm">{error}</p>
                    </div>
                    <button onClick={() => window.location.reload()}
                      className="px-6 py-2 bg-primary-500/20 border border-primary-500/30 text-primary-300 rounded-xl text-sm hover:bg-primary-500/30 transition-colors">
                      Reintentar
                    </button>
                  </div>
                )}

                {!loading && !error && stripePromise && stripeOptions && (
                  <Elements stripe={stripePromise} options={stripeOptions}>
                    <StripePaymentForm amount={AMOUNT_DISPLAY} paymentIntentId={paymentIntentId} />
                  </Elements>
                )}

                {!loading && !error && !stripePromise && (
                  <div className="text-center py-8">
                    <AlertCircle className="w-12 h-12 text-amber-400 mx-auto mb-3" />
                    <p className="text-white font-semibold mb-1">Stripe no está configurado</p>
                    <p className="text-white/40 text-sm">Añade las claves de Stripe en las variables de entorno</p>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Trust badges */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="flex items-center justify-center gap-4 flex-wrap">
              {[
                { Icon: Shield, label: 'SSL Seguro' },
                { Icon: Lock, label: 'Encriptado' },
                { Icon: RefreshCw, label: 'Reembolso 14d' },
              ].map(({ Icon, label }) => (
                <div key={label} className="flex items-center gap-1.5 text-white/25 text-xs">
                  <Icon className="w-3.5 h-3.5" />
                  {label}
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* ── Reseñas de clientes ──────────────────────────────────────── */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
          <div className="flex items-center gap-3 mb-5">
            <h3 className="text-lg font-bold text-white">Lo que dicen nuestros usuarios</h3>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-accent-400 text-accent-400" />)}
              <span className="text-white/40 text-sm ml-1">4.9/5</span>
            </div>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {reviews.map((r) => (
              <div key={r.name} className="galaxy-glass rounded-2xl p-5 flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${r.color} flex items-center justify-center text-white text-sm font-bold flex-shrink-0`}>
                    {r.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{r.name}</p>
                    <p className="text-xs text-white/30">{r.location} · {r.sign}</p>
                  </div>
                </div>
                <div className="flex gap-0.5">
                  {[...Array(r.stars)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-accent-400 text-accent-400" />)}
                </div>
                <p className="text-sm text-white/50 leading-relaxed italic">&ldquo;{r.text}&rdquo;</p>
              </div>
            ))}
          </div>
        </motion.div>

      </div>

      <footer className="border-t border-white/5 py-6 mt-8 relative z-10">
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
