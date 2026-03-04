'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { Lock, Clock, ArrowRight } from 'lucide-react'
import { useAppStore } from '@/lib/store'
// eslint-disable-next-line @typescript-eslint/no-unused-vars

interface Props {
  amount: string
  paymentIntentId: string | null
}

export default function StripePaymentForm({ amount, paymentIntentId }: Props) {
  const stripe = useStripe()
  const elements = useElements()
  const router = useRouter()
  const { testAnswers, completePayment } = useAppStore()
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
        // URL de retorno si se necesita redirect (3DS, etc.)
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

      // Guardar carta en la BD (sin bloquear la redirección)
      const { testAnswers: ta } = useAppStore.getState()
      const { chartResult } = useAppStore.getState()
      fetch('/api/save-chart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: ta.email,
          firstName: ta.firstName,
          lastName: ta.lastName,
          language: useAppStore.getState().language,
          paymentIntentId: pid,
          testAnswers: ta,
          chartData: chartResult,
        }),
      }).catch(console.error)

      router.push(`/results/${pid}`)
    } else {
      setErrorMessage('El pago no se pudo completar. Inténtalo de nuevo.')
      setIsProcessing(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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

      <div className="bg-white/5 rounded-xl p-4 border border-white/5">
        <div className="flex justify-between items-center">
          <span className="font-medium text-white/70">Total ahora</span>
          <span className="text-2xl font-black text-white">{amount}</span>
        </div>
        <p className="text-xs text-white/30 mt-1">Luego €19,99/mes tras 2 días de prueba</p>
      </div>

      <button
        type="submit"
        disabled={!stripe || !elements || isProcessing}
        className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-primary-500 to-purple-600 text-white font-bold rounded-2xl shadow-lg shadow-primary-500/25 hover:shadow-xl transition-all disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isProcessing ? (
          <>
            <Clock className="w-5 h-5 animate-spin" />
            Procesando...
          </>
        ) : (
          <>
            Pagar {amount} y ver mi Carta
            <ArrowRight className="w-5 h-5" />
          </>
        )}
      </button>

      <div className="flex items-center justify-center gap-2 text-xs text-white/25">
        <Lock className="w-4 h-4" />
        Pago seguro con encriptación SSL · Powered by Stripe
      </div>

      <p className="text-xs text-white/25 text-center leading-relaxed">
        Tu período de prueba terminará después de 2 días. La suscripción
        comenzará automáticamente por 19,99 EUR/mes. Puedes cancelar cuando quieras.
      </p>
    </form>
  )
}
