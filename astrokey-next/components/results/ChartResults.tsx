'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  CheckCircle, Sparkles, Calendar, MapPin, Mail,
  Sun, Moon, ArrowUp, Flame, Home, Globe, Star as StarIcon,
  Download, Share2
} from 'lucide-react'
import { useAppStore } from '@/lib/store'
import { getSignIcon, getElementIcon } from '@/lib/astrology'

const interpretations = [
  { title: 'Tu Esencia Fundamental', icon: '🎯', content: 'Eres una persona con una naturaleza dinámica y carismática que destaca en cualquier entorno. Tu energía natural te impulsa a tomar acción inmediata y liderar situaciones con confianza. Posees una determinación inquebrantable y la capacidad de superar obstáculos que para otros serían insuperables.' },
  { title: 'Tu Elemento Dominante', icon: '🔥', content: 'Tu elemento dominante se manifiesta en todos los aspectos de tu vida, confiriéndote pasión intensa por todo lo que haces. Esta energía te permite transformar ideas en realidad con velocidad y eficiencia admirables. El equilibrio está en aprender a dosificar esta fuerza interior.' },
  { title: 'Tu Ascendente y Presentación', icon: '⚖️', content: 'Tu ascendente te convierte en una persona naturalmente diplomática y socialmente hábil. Tienes un don innato para leer las dinámicas sociales y adaptarte a diferentes entornos con gracia y elegancia. Esta combinación te hace extremadamente efectivo en situaciones de liderazgo.' },
  { title: 'Tu Mundo Emocional', icon: '🌙', content: 'Posees una intuición extraordinariamente desarrollada que te permite percibir las emociones de otros. Tu memoria emocional es excepcional, y tu hogar es tu santuario donde recargas tus energías emocionales. Esta sensibilidad es tanto una bendición como un superpoder.' },
  { title: 'Tu Casa Astrológica y Propósito', icon: '🏠', content: 'Tu propósito en esta vida está fuertemente ligado a tu identidad personal y a cómo te presentas al mundo. Estás destinado a ser un ejemplo para otros, mostrando el camino a través de tu propia evolución y crecimiento personal.' },
  { title: 'Integración y Síntesis', icon: '🎭', content: 'La verdadera magia de tu carta astral reside en cómo todos estos elementos se integran para crear una personalidad única. Tu desafío y oportunidad es honrar todas estas partes de ti mismo, convirtiéndote en una fuerza verdaderamente transformadora.' },
]

export default function ChartResults() {
  const router = useRouter()
  const { testAnswers, chartResult, paymentCompleted } = useAppStore()

  useEffect(() => {
    if (!paymentCompleted || !chartResult) {
      router.push('/test')
    }
  }, [paymentCompleted, chartResult, router])

  if (!chartResult) return null

  const resultCards = [
    { label: 'Signo Solar', value: chartResult.sunSign, emoji: getSignIcon(chartResult.sunSign) },
    { label: 'Elemento', value: chartResult.dominantElement, emoji: getElementIcon(chartResult.dominantElement) },
    { label: 'Ascendente', value: chartResult.ascendant, emoji: getSignIcon(chartResult.ascendant) },
    { label: 'Signo Lunar', value: chartResult.moonSign, emoji: getSignIcon(chartResult.moonSign) },
    { label: 'Casa Astrológica', value: chartResult.astralHouse, emoji: '🏠' },
    { label: 'Planeta Dominante', value: chartResult.dominantPlanet, emoji: '🪐' },
    { label: 'Aspecto Planetario', value: chartResult.planetaryAspect, emoji: '✨' },
    { label: 'Nodo Lunar', value: chartResult.lunarNode, emoji: '🌊' },
  ]

  return (
    <div className="min-h-screen pb-20 relative z-10">
      {/* Header */}
      <header className="galaxy-glass py-4 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-white" />
            <span className="text-lg font-bold text-white">AstroKey</span>
          </Link>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Success banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/30 mb-4">
            <CheckCircle className="w-8 h-8 text-emerald-400" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">¡Tu Carta Astral Está Lista!</h1>
          <p className="text-white/50">Has completado exitosamente tu test astrológico</p>
        </motion.div>

        {/* User info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="galaxy-glass rounded-2xl p-6 mb-8"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary-500 to-purple-500 flex items-center justify-center text-white text-xl font-bold">
              {testAnswers.firstName?.charAt(0) || 'U'}
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">
                {testAnswers.firstName} {testAnswers.lastName}
              </h2>
              <span className="text-xs px-2 py-0.5 rounded-full bg-primary-500/20 text-primary-300 font-medium">
                Perfil Verificado
              </span>
            </div>
          </div>
          <div className="grid sm:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-2 text-white/40">
              <Calendar className="w-4 h-4" />
              {testAnswers.birthDate.day}/{testAnswers.birthDate.month}/{testAnswers.birthDate.year}
            </div>
            <div className="flex items-center gap-2 text-white/40">
              <MapPin className="w-4 h-4" />
              {testAnswers.birthPlace || 'No especificado'}
            </div>
            <div className="flex items-center gap-2 text-white/40">
              <Mail className="w-4 h-4" />
              {testAnswers.email || 'No especificado'}
            </div>
          </div>
        </motion.div>

        {/* Result cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {resultCards.map((card, i) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.05 }}
              className="galaxy-glass rounded-2xl p-6 text-center hover:border-white/20 hover:-translate-y-1 transition-all duration-300"
            >
              <span className="text-3xl mb-3 block">{card.emoji}</span>
              <h3 className="text-xs font-semibold text-white/30 uppercase tracking-wider mb-1">{card.label}</h3>
              <p className="text-lg font-bold text-white">{card.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Interpretation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="galaxy-glass rounded-2xl p-8 mb-12"
        >
          <h2 className="text-2xl font-bold text-white mb-8">Interpretación Personalizada</h2>
          <div className="space-y-8">
            {interpretations.map((block) => (
              <div key={block.title} className="border-l-4 border-primary-500 pl-6">
                <h3 className="text-lg font-bold text-white mb-2">
                  {block.icon} {block.title}
                </h3>
                <p className="text-white/50 leading-relaxed">{block.content}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Actions */}
        <div className="flex flex-wrap justify-center gap-4">
          <button className="flex items-center gap-2 px-6 py-3 bg-primary-500 text-white font-semibold rounded-xl hover:bg-primary-600 transition-colors">
            <Download className="w-5 h-5" />
            Descargar PDF
          </button>
          <button className="flex items-center gap-2 px-6 py-3 bg-white/10 text-white/70 font-semibold rounded-xl hover:bg-white/15 border border-white/10 transition-colors">
            <Share2 className="w-5 h-5" />
            Compartir
          </button>
        </div>
      </div>
    </div>
  )
}
