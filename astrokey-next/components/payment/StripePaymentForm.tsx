'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { Lock, Loader2 } from 'lucide-react'
import { useAppStore } from '@/lib/store'

interface Props {
  amount: string
  paymentIntentId: string | null
}

export default function StripePaymentForm({ amount, paymentIntentId }: Props) {
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

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: 'if_required',
      confirmParams: {
        return_url: `${window.location.origin}/results/${paymentIntentId}`,
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
          ? error.message || 'Error en el pago'
          : 'Error inesperado. Por favor inténtalo de nuevo.'
      )
      setIsProcessing(false)
      return
    }

    if (paymentIntent?.status === 'succeeded') {
      const pid = paymentIntent.id || paymentIntentId
      completePayment(pid ?? undefined)

      try {
        await fetch('/api/save-chart', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: testAnswers.email,
            firstName: testAnswers.firstName,
            lastName: testAnswers.lastName,
            language,
            paymentIntentId: pid,
            testAnswers,
            chartData: chartResult,
          }),
        })
      } catch (saveErr) {
        console.error('[StripePaymentForm] Error guardando en BD:', saveErr)
      }

      router.push(`/results/${pid}`)
    } else {
      setErrorMessage('El pago no se pudo completar. Inténtalo de nuevo.')
      setIsProcessing(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Stripe Elements */}
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

      {/* BOTÓN GRANDE — igual que el de la imagen de referencia */}
      <button
        type="submit"
        disabled={!stripe || !elements || isProcessing}
        className="w-full py-5 bg-gradient-to-r from-primary-500 to-purple-600 text-white text-lg font-bold rounded-2xl shadow-xl shadow-primary-500/30 hover:shadow-2xl hover:from-primary-400 hover:to-purple-500 transition-all disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.98]"
      >
        {isProcessing ? (
          <span className="flex items-center justify-center gap-2">
            <Loader2 className="w-5 h-5 animate-spin" />
            Procesando...
          </span>
        ) : (
          `Obtener mi Carta Astral — ${amount}`
        )}
      </button>

      <div className="flex items-center justify-center gap-1.5 text-xs text-white/25">
        <Lock className="w-3.5 h-3.5" />
        Pago seguro · SSL · Powered by Stripe
      </div>
    </form>
  )
}
