'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAppStore } from '@/lib/store'

// Esta página redirige a la URL única del resultado del cliente
export default function ResultsRedirectPage() {
  const router = useRouter()
  const { paymentIntentId, paymentCompleted } = useAppStore()

  useEffect(() => {
    if (paymentCompleted && paymentIntentId) {
      router.replace(`/results/${paymentIntentId}`)
    } else {
      router.replace('/test')
    }
  }, [paymentCompleted, paymentIntentId, router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-10 h-10 rounded-full border-2 border-primary-500/30 border-t-primary-500 animate-spin" />
    </div>
  )
}
