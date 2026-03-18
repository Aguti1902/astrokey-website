'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { Lock, Loader2 } from 'lucide-react'
import { useAppStore } from '@/lib/store'

interface Props {
  setupIntentId: string | null
  customerId: string | null
}

export default function StripePaymentForm({ setupIntentId, customerId }: Props) {
  const stripe = useStripe()
  const elements = useElements()
  const router = useRouter()
  const { testAnswers, completePayment, chartResult, language } = useAppStore()
  const [isProcessing, setIsProcessing] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!stripe || !elements) return

    setIsProcessing(true)
    setErrorMessage('')

    const fullName = `${testAnswers.firstName} ${testAnswers.lastName}`.trim()

    // 1. Confirmar SetupIntent — guarda la tarjeta sin cobrar
    const { error, setupIntent } = await stripe.confirmSetup({
      elements,
      redirect: 'if_required',
      confirmParams: {
        return_url: `${window.location.origin}/results/${setupIntentId}`,
        payment_method_data: {
          billing_details: {
            ...(fullName && { name: fullName }),
            ...(testAnswers.email && { email: testAnswers.email }),
          },
        },
      },
    })

    if (error) {
      setErrorMessage(
        error.type === 'card_error' || error.type === 'validation_error'
          ? error.message || 'Error al verificar la tarjeta'
          : 'Error inesperado. Por favor inténtalo de nuevo.'
      )
      setIsProcessing(false)
      return
    }

    if (setupIntent?.status === 'succeeded') {
      const sid = setupIntentId

      // 2. Crear suscripción con trial gratuito (€0 ahora, €19,99 al día 3)
      try {
        await fetch('/api/start-trial', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            setupIntentId: sid,
            customerId,
          }),
        })
      } catch (trialErr) {
        console.error('[StripePaymentForm] Error creando trial:', trialErr)
      }

      // 3. Marcar como completado (usamos setupIntentId como ID único)
      completePayment(sid ?? undefined)

      // 4. Eventos de conversión GA4
      if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
        // Evento purchase con valor simbólico para que Google Ads lo cuente
        ;(window as any).gtag('event', 'purchase', {
          transaction_id: sid,
          value: 0.01,          // 1 céntimo simbólico — GA4 necesita valor > 0 para contar
          currency: 'EUR',
          items: [{
            item_id: 'astrokey_free_trial',
            item_name: 'AstroKey - Prueba gratuita 2 días',
            price: 0.01,
            quantity: 1,
          }],
        })
        // Evento específico de inicio de trial gratuito
        ;(window as any).gtag('event', 'free_trial_start', {
          transaction_id: sid,
          value: 19.99,         // Valor esperado de la suscripción
          currency: 'EUR',
        })
        // Conversión de Google Ads
        ;(window as any).gtag('event', 'conversion', {
          send_to: 'AW-17997680722',
          transaction_id: sid,
          value: 19.99,
          currency: 'EUR',
        })
      }

      // 5. Guardar en Supabase
      try {
        await fetch('/api/save-chart', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: testAnswers.email,
            firstName: testAnswers.firstName,
            lastName: testAnswers.lastName,
            language,
            paymentIntentId: sid,
            testAnswers,
            chartData: chartResult,
          }),
        })
      } catch (saveErr) {
        console.error('[StripePaymentForm] Error guardando en BD:', saveErr)
      }

      // 6. Redirigir a resultados
      router.push(`/results/${sid}`)
    } else {
      setErrorMessage('No se pudo verificar la tarjeta. Inténtalo de nuevo.')
      setIsProcessing(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="rounded-xl overflow-hidden">
        <PaymentElement
          options={{
            layout: 'tabs',
            defaultValues: {
              billingDetails: {
                name: `${testAnswers.firstName} ${testAnswers.lastName}`.trim() || '',
                email: testAnswers.email || '',
              },
            },
            fields: {
              billingDetails: {
                email: testAnswers.email ? 'never' : 'auto',
                name: 'auto',
              },
            },
          }}
        />
      </div>

      {errorMessage && (
        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl">
          <span className="text-red-400 text-sm">{errorMessage}</span>
        </div>
      )}

      {/* BOTÓN GRANDE */}
      <button
        type="submit"
        disabled={!stripe || !elements || isProcessing}
        className="w-full py-5 bg-gradient-to-r from-primary-500 to-purple-600 text-white text-lg font-bold rounded-2xl shadow-xl shadow-primary-500/30 hover:from-primary-400 hover:to-purple-500 transition-all disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.98]"
      >
        {isProcessing ? (
          <span className="flex items-center justify-center gap-2">
            <Loader2 className="w-5 h-5 animate-spin" />
            Activando tu acceso gratuito...
          </span>
        ) : (
          'Empezar prueba gratuita →'
        )}
      </button>

      <div className="flex items-center justify-center gap-1.5 text-xs text-white/25">
        <Lock className="w-3.5 h-3.5" />
        Tarjeta guardada de forma segura · Sin cargo hoy · SSL
      </div>
    </form>
  )
}
