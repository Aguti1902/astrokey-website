'use client'

import { motion } from 'framer-motion'
import { Calendar, Clock, ArrowRight } from 'lucide-react'

const articles = [
  {
    title: 'Los Signos del Zodiaco y su Influencia en el Amor',
    excerpt: 'Descubre cómo tu signo zodiacal afecta tus relaciones amorosas y qué signos son más compatibles contigo.',
    date: '15 Feb 2026',
    readTime: '5 min',
    category: 'Compatibilidad',
  },
  {
    title: 'Guía Completa de las Casas Astrológicas',
    excerpt: 'Las 12 casas astrológicas representan diferentes áreas de tu vida. Aprende qué significa cada una.',
    date: '10 Feb 2026',
    readTime: '8 min',
    category: 'Educación',
  },
  {
    title: 'Mercurio Retrógrado 2026: Lo Que Necesitas Saber',
    excerpt: 'Prepárate para los períodos de Mercurio retrógrado este año y aprende cómo afecta a cada signo.',
    date: '5 Feb 2026',
    readTime: '6 min',
    category: 'Tránsitos',
  },
  {
    title: 'Cómo Interpretar tu Carta Natal Paso a Paso',
    excerpt: 'Una guía práctica para entender los diferentes aspectos de tu carta natal y sacar el máximo provecho.',
    date: '1 Feb 2026',
    readTime: '10 min',
    category: 'Guías',
  },
  {
    title: 'Rituales de Luna Llena para Cada Signo',
    excerpt: 'Aprovecha la energía de la luna llena con rituales personalizados según tu signo zodiacal.',
    date: '28 Ene 2026',
    readTime: '7 min',
    category: 'Rituales',
  },
  {
    title: 'El Poder de los Cristales en la Astrología',
    excerpt: 'Cada signo tiene cristales afines que pueden potenciar sus cualidades. Descubre cuáles son los tuyos.',
    date: '22 Ene 2026',
    readTime: '5 min',
    category: 'Cristales',
  },
]

export default function BlogPage() {
  return (
    <div className="pt-28 pb-20">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-white mb-4">Blog Astrológico</h1>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            Artículos, guías y contenido astrológico para profundizar tu conocimiento
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article, i) => (
            <motion.article
              key={article.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-6 group cursor-pointer hover:border-primary-500/30 transition-all duration-300 hover:-translate-y-1"
            >
              <span className="text-xs px-3 py-1 rounded-full bg-primary-500/10 text-primary-300 border border-primary-500/20 font-medium">
                {article.category}
              </span>

              <h2 className="text-lg font-bold text-white mt-4 mb-3 group-hover:text-primary-300 transition-colors">
                {article.title}
              </h2>

              <p className="text-sm text-white/45 leading-relaxed mb-4">{article.excerpt}</p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-xs text-white/30">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {article.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {article.readTime}
                  </span>
                </div>
                <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-primary-400 transition-colors" />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  )
}
