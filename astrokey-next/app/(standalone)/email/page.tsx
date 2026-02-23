import type { Metadata } from 'next'
import EmailCapture from '@/components/email/EmailCapture'

export const metadata: Metadata = {
  title: 'Tu Carta Está Lista',
  description: 'Ingresa tu email para recibir tu carta astral personalizada.',
}

export default function EmailPage() {
  return <EmailCapture />
}
