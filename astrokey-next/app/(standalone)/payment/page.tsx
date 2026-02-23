import type { Metadata } from 'next'
import PaymentForm from '@/components/payment/PaymentForm'

export const metadata: Metadata = {
  title: 'Pago',
  description: 'Completa tu pago para acceder a tu carta astral personalizada.',
}

export default function PaymentPage() {
  return <PaymentForm />
}
