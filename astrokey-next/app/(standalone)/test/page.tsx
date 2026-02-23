import type { Metadata } from 'next'
import TestWizard from '@/components/test/TestWizard'

export const metadata: Metadata = {
  title: 'Test Astral Completo',
  description: 'Completa tu test astrológico personalizado y descubre tu carta astral.',
}

export default function TestPage() {
  return <TestWizard />
}
