import type { Metadata } from 'next'
import ChartResults from '@/components/results/ChartResults'

export const metadata: Metadata = {
  title: 'Tu Carta Astral',
  description: 'Descubre los resultados de tu carta astral personalizada.',
}

export default function ResultsPage() {
  return <ChartResults />
}
