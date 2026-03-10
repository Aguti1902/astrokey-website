'use client'

import { useState, useEffect } from 'react'
import LocaleLink from '@/components/ui/LocaleLink'
import { motion } from 'framer-motion'
import { Sparkles, CheckCircle, AlertCircle, Shield, Lock, RefreshCw } from 'lucide-react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import { useAppStore } from '@/lib/store'
import StripePaymentForm from './StripePaymentForm'
import { useT } from '@/lib/i18n'

const stripePromise = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  ? loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
  : null

const AMOUNT_DISPLAY = '0,50€'

// ─── Ilustración CSS (figura meditando con cosmos) ────────────────────────────
function AstroFigure() {
  return (
    <div className="relative w-40 h-40 mx-auto my-2">
      <svg viewBox="0 0 160 160" fill="none" className="w-full h-full">
        <defs>
          <radialGradient id="figGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#4f46e5" stopOpacity="0" />
          </radialGradient>
        </defs>
        {/* Glow de fondo */}
        <circle cx="80" cy="80" r="70" fill="url(#figGlow)" />
        {/* Círculo exterior animado */}
        <motion.circle cx="80" cy="80" r="65" stroke="rgba(139,92,246,0.2)" strokeWidth="0.8"
          strokeDasharray="8 4"
          animate={{ rotate: 360 }} transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          style={{ transformOrigin: '80px 80px' }}
        />
        {/* Órbita media */}
        <motion.circle cx="80" cy="80" r="48" stroke="rgba(99,102,241,0.2)" strokeWidth="0.8"
          strokeDasharray="5 4"
          animate={{ rotate: -360 }} transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
          style={{ transformOrigin: '80px 80px' }}
        />
        {/* Estrellas / puntos */}
        {[30,75,130,155,50,105,160,15].map((a, i) => {
          const rad = (a * Math.PI) / 180
          const r = [65, 48, 65, 48, 65, 48, 65, 48][i]
          return (
            <motion.circle key={i}
              cx={80 + r * Math.cos(rad)} cy={80 + r * Math.sin(rad)} r="2.5"
              fill={i % 2 === 0 ? '#a78bfa' : '#818cf8'} opacity="0.7"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2.5, delay: i * 0.35, repeat: Infinity }}
            />
          )
        })}
        {/* Cuerpo meditando — cabeza */}
        <circle cx="80" cy="46" r="9" fill="rgba(196,181,253,0.9)" />
        {/* Cuerpo */}
        <path d="M66 62 Q80 58 94 62 L98 85 Q80 95 62 85 Z" fill="rgba(167,139,250,0.85)" />
        {/* Piernas cruzadas */}
        <path d="M62 85 Q55 95 50 100 Q65 105 80 102 Q95 105 110 100 Q105 95 98 85 Z"
          fill="rgba(139,92,246,0.75)" />
        {/* Brazos */}
        <path d="M66 68 Q58 75 52 80" stroke="rgba(196,181,253,0.8)" strokeWidth="4" strokeLinecap="round" fill="none" />
        <path d="M94 68 Q102 75 108 80" stroke="rgba(196,181,253,0.8)" strokeWidth="4" strokeLinecap="round" fill="none" />
        {/* Manos sobre rodillas */}
        <circle cx="52" cy="82" r="4" fill="rgba(196,181,253,0.8)" />
        <circle cx="108" cy="82" r="4" fill="rgba(196,181,253,0.8)" />
        {/* Chakra corona — aura */}
        <motion.circle cx="80" cy="36" r="5" fill="#c4b5fd" opacity="0.6"
          animate={{ opacity: [0.4, 0.9, 0.4], scale: [0.9, 1.2, 0.9] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ transformOrigin: '80px 36px' }}
        />
        {/* Pequeños destellos */}
        {[[-18,-18],[18,-18],[0,-24],[-24,0],[24,0]].map(([dx, dy], i) => (
          <motion.line key={i}
            x1={80 + dx} y1={80 + dy} x2={80 + dx * 1.4} y2={80 + dy * 1.4}
            stroke="#a78bfa" strokeWidth="1" opacity="0.5"
            animate={{ opacity: [0.2, 0.8, 0.2] }}
            transition={{ duration: 1.5, delay: i * 0.3, repeat: Infinity }}
          />
        ))}
      </svg>
    </div>
  )
}

// ─── Logos de tarjetas SVG ────────────────────────────────────────────────────
function CardLogos() {
  return (
    <div className="flex items-center justify-center gap-3 flex-wrap">
      {/* VISA */}
      <div className="bg-white rounded px-2 py-1 h-7 flex items-center">
        <svg viewBox="0 0 50 16" className="h-4 w-auto">
          <text x="0" y="13" fontFamily="Arial" fontSize="14" fontWeight="bold" fill="#1a1f71">VISA</text>
        </svg>
      </div>
      {/* Mastercard */}
      <div className="bg-white rounded px-1.5 py-1 h-7 flex items-center gap-0.5">
        <div className="w-5 h-5 rounded-full bg-red-500 opacity-90" />
        <div className="w-5 h-5 rounded-full bg-yellow-400 opacity-90 -ml-2.5" />
      </div>
      {/* Amex */}
      <div className="bg-blue-600 rounded px-2 py-1 h-7 flex items-center">
        <svg viewBox="0 0 60 16" className="h-3.5 w-auto">
          <text x="0" y="12" fontFamily="Arial" fontSize="10" fontWeight="bold" fill="white">AMEX</text>
        </svg>
      </div>
      {/* PayPal */}
      <div className="bg-white rounded px-2 py-1 h-7 flex items-center">
        <svg viewBox="0 0 60 16" className="h-4 w-auto">
          <text x="0" y="13" fontFamily="Arial" fontSize="12" fontWeight="bold">
            <tspan fill="#003087">Pay</tspan><tspan fill="#009cde">Pal</tspan>
          </text>
        </svg>
      </div>
    </div>
  )
}

export default function PaymentForm() {
  const { testAnswers, completePayment } = useAppStore()
  const t = useT()
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [paymentIntentId, setPaymentIntentId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [minutes, setMinutes] = useState(9)
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

  // Crear PaymentIntent
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
        if (!res.ok || data.error) throw new Error(data.error || 'Error')
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

  const benefits = [
    t.payment.benefits[0],
    t.payment.benefits[1],
    t.payment.benefits[2],
  ]

  return (
    <div className="min-h-screen relative z-10">
      {/* Header */}
      <header className="galaxy-glass py-4">
        <div className="max-w-lg mx-auto px-4 flex items-center justify-center gap-2">
          <Sparkles className="w-6 h-6 text-white" />
          <span className="text-lg font-bold text-white">AstroKey</span>
        </div>
      </header>

      {/* Contenido principal — un solo stack centrado */}
      <div className="max-w-lg mx-auto px-4 py-6 flex flex-col gap-5">

        {/* 1. COUNTDOWN */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          className="galaxy-glass rounded-2xl py-3 px-5 text-center">
          <p className="text-white/50 text-xs uppercase tracking-wider mb-1">{t.payment.expiresIn}</p>
          <div className="flex items-center justify-center gap-2">
            <span className="text-3xl font-black text-white tabular-nums">{String(minutes).padStart(2,'0')}</span>
            <span className="text-2xl text-white/30 font-bold">:</span>
            <span className="text-3xl font-black text-white tabular-nums">{String(seconds).padStart(2,'0')}</span>
          </div>
          <div className="flex justify-center gap-8 mt-0.5">
            <span className="text-[9px] text-white/25 uppercase tracking-wider">{t.payment.minutes}</span>
            <span className="text-[9px] text-white/25 uppercase tracking-wider">{t.payment.seconds}</span>
          </div>
        </motion.div>

        {/* 2. ILUSTRACIÓN CSS */}
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15 }}>
          <AstroFigure />
        </motion.div>

        {/* 3. BENEFICIOS */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="galaxy-glass rounded-2xl p-5">
          <h3 className="text-base font-bold text-white mb-4 text-center">{t.payment.includes}</h3>
          <div className="space-y-3">
            {benefits.map((b, i) => (
              <div key={i} className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-primary-400 flex-shrink-0" />
                <span className="text-sm text-white/70">{b}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* 4. TOTAL */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}
          className="flex items-center justify-between px-1">
          <span className="text-base font-bold text-white">{t.payment.total}</span>
          <div className="text-right">
            <div className="flex items-baseline gap-2">
              <span className="text-sm line-through text-white/25">19,99€</span>
              <span className="text-3xl font-black text-white">{AMOUNT_DISPLAY}</span>
            </div>
            <p className="text-[10px] text-white/30">{t.payment.after}</p>
          </div>
        </motion.div>

        {/* 5. STRIPE FORM */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}>

          {loading && (
            <div className="flex flex-col items-center py-10 gap-3">
              <div className="w-8 h-8 rounded-full border-2 border-primary-500/30 border-t-primary-500 animate-spin" />
              <p className="text-white/40 text-sm">Inicializando pago seguro...</p>
            </div>
          )}

          {error && !loading && (
            <div className="flex flex-col items-center gap-3 py-6 text-center">
              <AlertCircle className="w-10 h-10 text-red-400" />
              <p className="text-white/40 text-sm">{error}</p>
              <button onClick={() => window.location.reload()}
                className="px-5 py-2 bg-primary-500/20 border border-primary-500/30 text-primary-300 rounded-xl text-sm">
                {t.common.retry}
              </button>
            </div>
          )}

          {!loading && !error && stripePromise && stripeOptions && (
            <Elements stripe={stripePromise} options={stripeOptions}>
              <StripePaymentForm amount={AMOUNT_DISPLAY} paymentIntentId={paymentIntentId} />
            </Elements>
          )}

          {!loading && !error && !stripePromise && (
            <div className="text-center py-6">
              <AlertCircle className="w-10 h-10 text-amber-400 mx-auto mb-2" />
              <p className="text-white/40 text-sm">Stripe no está configurado</p>
            </div>
          )}
        </motion.div>

        {/* 6. PAGO SEGURO GARANTIZADO */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
          className="galaxy-glass rounded-2xl p-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Shield className="w-4 h-4 text-primary-400" />
            <span className="text-sm font-semibold text-white/70">Pago Seguro Garantizado</span>
            <Lock className="w-4 h-4 text-primary-400" />
          </div>
          <CardLogos />
        </motion.div>

        {/* 7. GARANTÍA REEMBOLSO */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}
          className="flex items-center gap-3 px-1">
          <RefreshCw className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          <p className="text-xs text-white/40 leading-relaxed">
            {t.payment.guarantee} — {t.payment.guaranteeDesc}
          </p>
        </motion.div>

        {/* 8. LEGAL */}
        <p className="text-[11px] text-white/25 text-center leading-relaxed pb-2">
          {t.payment.trialNote}
        </p>

        {/* Footer links */}
        <div className="flex flex-wrap items-center justify-center gap-3 text-[11px] text-white/20 pb-4">
          <LocaleLink href="/legal/terminos" className="hover:text-white/40 transition-colors">Términos</LocaleLink>
          <LocaleLink href="/legal/reembolsos" className="hover:text-white/40 transition-colors">Reembolsos</LocaleLink>
          <LocaleLink href="/legal/privacidad" className="hover:text-white/40 transition-colors">Privacidad</LocaleLink>
          <span>© {new Date().getFullYear()} AstroKey</span>
        </div>

      </div>
    </div>
  )
}
