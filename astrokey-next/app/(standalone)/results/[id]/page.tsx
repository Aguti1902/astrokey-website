import type { Metadata } from 'next'
import ChartResults from '@/components/results/ChartResults'

export const metadata: Metadata = {
  title: 'Tu Carta Astral',
  description: 'Tu carta astral personalizada generada exclusivamente para ti.',
  robots: 'noindex', // No indexar resultados privados
}

export default function ResultsPage({ params }: { params: { id: string } }) {
  return <ChartResults resultId={params.id} />
}
