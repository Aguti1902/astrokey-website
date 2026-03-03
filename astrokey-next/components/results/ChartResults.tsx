'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  CheckCircle, Sparkles, Calendar, MapPin, Mail,
  Sun, Moon, ArrowUpRight, Flame, Home, Globe,
  Star, Download, Share2, Zap, Eye, Heart,
  TrendingUp, Shield, Clock, Compass, Orbit,
  BarChart3, Users, BookOpen, Lightbulb,
} from 'lucide-react'
import { useAppStore } from '@/lib/store'

// ─── Datos por signo ──────────────────────────────────────────────────────────
const signData: Record<string, { element: string; planet: string; color: string; traits: string[] }> = {
  Aries:       { element: 'Fuego', planet: 'Marte',    color: 'from-red-500 to-orange-500',    traits: ['Valiente', 'Impulsivo', 'Líder'] },
  Tauro:       { element: 'Tierra', planet: 'Venus',   color: 'from-emerald-500 to-green-600', traits: ['Estable', 'Leal', 'Sensual'] },
  Géminis:     { element: 'Aire',   planet: 'Mercurio',color: 'from-yellow-400 to-amber-500',   traits: ['Curioso', 'Adaptable', 'Comunicativo'] },
  Cáncer:      { element: 'Agua',   planet: 'Luna',    color: 'from-sky-400 to-blue-500',      traits: ['Intuitivo', 'Protector', 'Sensible'] },
  Leo:         { element: 'Fuego',  planet: 'Sol',     color: 'from-orange-400 to-yellow-500', traits: ['Carismático', 'Generoso', 'Creativo'] },
  Virgo:       { element: 'Tierra', planet: 'Mercurio',color: 'from-lime-500 to-emerald-500',  traits: ['Analítico', 'Perfeccionista', 'Servicial'] },
  Libra:       { element: 'Aire',   planet: 'Venus',   color: 'from-pink-400 to-rose-500',     traits: ['Diplomático', 'Justo', 'Estético'] },
  Escorpio:    { element: 'Agua',   planet: 'Plutón',  color: 'from-purple-600 to-violet-700', traits: ['Intenso', 'Misterioso', 'Transformador'] },
  Sagitario:   { element: 'Fuego',  planet: 'Júpiter', color: 'from-violet-500 to-purple-600', traits: ['Aventurero', 'Optimista', 'Filosófico'] },
  Capricornio: { element: 'Tierra', planet: 'Saturno', color: 'from-slate-500 to-gray-600',    traits: ['Ambicioso', 'Disciplinado', 'Responsable'] },
  Acuario:     { element: 'Aire',   planet: 'Urano',   color: 'from-cyan-400 to-sky-500',      traits: ['Innovador', 'Humanitario', 'Independiente'] },
  Piscis:      { element: 'Agua',   planet: 'Neptuno', color: 'from-indigo-400 to-violet-500', traits: ['Empático', 'Artístico', 'Espiritual'] },
}

const interpretations = [
  {
    Icon: Sun,
    title: 'Tu Esencia Fundamental',
    color: 'text-amber-400',
    content: 'Eres una persona con una naturaleza dinámica y carismática que destaca en cualquier entorno. Tu energía natural te impulsa a tomar acción inmediata y liderar situaciones con confianza. Posees una determinación inquebrantable y la capacidad de superar obstáculos que para otros serían insuperables.',
  },
  {
    Icon: Flame,
    title: 'Tu Elemento Dominante',
    color: 'text-orange-400',
    content: 'Tu elemento dominante se manifiesta en todos los aspectos de tu vida, confiriéndote pasión intensa por todo lo que haces. Esta energía te permite transformar ideas en realidad con velocidad y eficiencia admirables. El equilibrio está en aprender a dosificar esta fuerza interior.',
  },
  {
    Icon: ArrowUpRight,
    title: 'Tu Ascendente y Presentación',
    color: 'text-primary-400',
    content: 'Tu ascendente te convierte en una persona naturalmente diplomática y socialmente hábil. Tienes un don innato para leer las dinámicas sociales y adaptarte a diferentes entornos con gracia y elegancia. Esta combinación te hace extremadamente efectivo en situaciones de liderazgo.',
  },
  {
    Icon: Moon,
    title: 'Tu Mundo Emocional',
    color: 'text-indigo-400',
    content: 'Posees una intuición extraordinariamente desarrollada que te permite percibir las emociones de otros. Tu memoria emocional es excepcional, y tu hogar es tu santuario donde recargas tus energías emocionales. Esta sensibilidad es tanto una bendición como un superpoder.',
  },
  {
    Icon: Home,
    title: 'Tu Casa Astrológica',
    color: 'text-emerald-400',
    content: 'Tu propósito en esta vida está fuertemente ligado a tu identidad personal y a cómo te presentas al mundo. Estás destinado a ser un ejemplo para otros, mostrando el camino a través de tu propia evolución y crecimiento personal.',
  },
  {
    Icon: Globe,
    title: 'Tu Planeta Dominante',
    color: 'text-violet-400',
    content: 'Tu planeta rector actúa como el director de orquesta de tu energía vital. Sus tránsitos y posiciones influyen directamente en tus ciclos de actividad, descanso, inspiración y acción. Comprender su ciclo te da una ventaja enorme para tomar decisiones en el momento adecuado.',
  },
  {
    Icon: Compass,
    title: 'Nodos Lunares y Destino',
    color: 'text-pink-400',
    content: 'Tus nodos lunares son la brújula cósmica que señala la dirección de tu evolución. El Nodo Norte representa tu camino de crecimiento y los talentos que debes desarrollar. El Nodo Sur muestra tus habilidades innatas y las tendencias que debes superar para avanzar.',
  },
  {
    Icon: Star,
    title: 'Integración y Síntesis',
    color: 'text-accent-400',
    content: 'La verdadera magia de tu carta astral reside en cómo todos estos elementos se integran para crear una personalidad única y multifacética. Tu desafío y oportunidad es honrar todas estas partes de ti mismo, convirtiéndote en una fuerza verdaderamente transformadora en el mundo.',
  },
]

const lifeAreas = [
  { label: 'Amor y relaciones', value: 78, color: 'bg-pink-500' },
  { label: 'Carrera y dinero', value: 85, color: 'bg-amber-500' },
  { label: 'Salud y bienestar', value: 71, color: 'bg-emerald-500' },
  { label: 'Familia y hogar', value: 90, color: 'bg-sky-500' },
  { label: 'Crecimiento personal', value: 95, color: 'bg-primary-500' },
  { label: 'Espiritualidad', value: 82, color: 'bg-violet-500' },
]

function StatBar({ label, value, color, delay }: { label: string; value: number; color: string; delay: number }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-white/60">{label}</span>
        <span className="text-sm font-bold text-white">{value}%</span>
      </div>
      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${color}`}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1, delay, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}

interface Props {
  resultId?: string
}

export default function ChartResults({ resultId }: Props) {
  const router = useRouter()
  const { testAnswers, chartResult, paymentCompleted, paymentIntentId } = useAppStore()

  useEffect(() => {
    if (!paymentCompleted || !chartResult) {
      router.push('/test')
      return
    }
    // Si el ID de la URL no coincide con el guardado, redirigir al correcto
    if (resultId && paymentIntentId && resultId !== paymentIntentId) {
      router.replace(`/results/${paymentIntentId}`)
    }
  }, [paymentCompleted, chartResult, router, resultId, paymentIntentId])

  if (!chartResult) return null

  const sd = signData[chartResult.sunSign] || signData['Aries']
  const luckyNumbers = [3, 7, 12, 21, 33].map(n => ((n + parseInt(testAnswers.birthDate.day || '1')) % 99) + 1)
  const luckyColors = ['Violeta', 'Azul índigo', 'Dorado', 'Blanco perla']
  const luckyDays = ['Martes', 'Viernes', 'Domingo']
  const compatibleSigns = ['Leo', 'Sagitario', 'Acuario'].filter(s => s !== chartResult.sunSign).slice(0, 3)

  const mainCards = [
    { label: 'Signo Solar', value: chartResult.sunSign, Icon: Sun, color: 'text-amber-400 bg-amber-400/10 border-amber-400/20' },
    { label: 'Signo Lunar', value: chartResult.moonSign, Icon: Moon, color: 'text-indigo-400 bg-indigo-400/10 border-indigo-400/20' },
    { label: 'Ascendente', value: chartResult.ascendant, Icon: ArrowUpRight, color: 'text-primary-400 bg-primary-400/10 border-primary-400/20' },
    { label: 'Elemento', value: chartResult.dominantElement, Icon: Flame, color: 'text-orange-400 bg-orange-400/10 border-orange-400/20' },
    { label: 'Casa Principal', value: chartResult.astralHouse, Icon: Home, color: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20' },
    { label: 'Planeta Rector', value: chartResult.dominantPlanet, Icon: Globe, color: 'text-violet-400 bg-violet-400/10 border-violet-400/20' },
    { label: 'Aspecto Clave', value: chartResult.planetaryAspect, Icon: Zap, color: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20' },
    { label: 'Nodo Lunar', value: chartResult.lunarNode, Icon: Compass, color: 'text-pink-400 bg-pink-400/10 border-pink-400/20' },
  ]

  return (
    <div className="min-h-screen pb-20 relative z-10">
      <header className="galaxy-glass py-4 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-white" />
            <span className="text-lg font-bold text-white">AstroKey</span>
          </Link>
          <div className="flex items-center gap-2 text-xs text-white/30">
            <Shield className="w-3.5 h-3.5" />
            Perfil verificado
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">

        {/* ── Banner éxito ─────────────────────────────────────────────── */}
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/30 mb-4">
            <CheckCircle className="w-8 h-8 text-emerald-400" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">¡Tu Carta Astral Está Lista!</h1>
          <p className="text-white/50">Análisis completo generado exclusivamente para ti</p>
        </motion.div>

        {/* ── Perfil usuario ───────────────────────────────────────────── */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="galaxy-glass rounded-2xl p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${sd.color} flex items-center justify-center text-white text-xl font-bold flex-shrink-0`}>
              {testAnswers.firstName?.charAt(0) || 'U'}
            </div>
            <div className="min-w-0">
              <h2 className="text-lg font-bold text-white truncate">{testAnswers.firstName} {testAnswers.lastName}</h2>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs px-2 py-0.5 rounded-full bg-primary-500/20 text-primary-300 font-medium">Perfil Verificado</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-accent-500/20 text-accent-300 font-medium">{chartResult.sunSign}</span>
              </div>
            </div>
          </div>
          <div className="grid sm:grid-cols-3 gap-3 text-sm">
            <div className="flex items-center gap-2 text-white/40"><Calendar className="w-4 h-4 flex-shrink-0" /><span className="truncate">{testAnswers.birthDate.day}/{testAnswers.birthDate.month}/{testAnswers.birthDate.year}</span></div>
            <div className="flex items-center gap-2 text-white/40"><MapPin className="w-4 h-4 flex-shrink-0" /><span className="truncate">{testAnswers.birthPlace || 'No especificado'}</span></div>
            <div className="flex items-center gap-2 text-white/40"><Mail className="w-4 h-4 flex-shrink-0" /><span className="truncate">{testAnswers.email || 'No especificado'}</span></div>
          </div>
        </motion.div>

        {/* ── Cards principales ────────────────────────────────────────── */}
        <div>
          <h2 className="text-xl font-bold text-white mb-4">Tu Mapa Astral</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {mainCards.map((card, i) => (
              <motion.div key={card.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.05 }}
                className={`galaxy-glass rounded-2xl p-4 text-center hover:-translate-y-1 transition-all duration-300 border ${card.color.split(' ')[2]}`}>
                <div className={`w-10 h-10 rounded-xl ${card.color.split(' ')[1]} flex items-center justify-center mx-auto mb-3`}>
                  <card.Icon className={`w-5 h-5 ${card.color.split(' ')[0]}`} />
                </div>
                <h3 className="text-[10px] font-semibold text-white/30 uppercase tracking-wider mb-1">{card.label}</h3>
                <p className="text-sm font-bold text-white leading-tight">{card.value}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Rasgos de personalidad ───────────────────────────────────── */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="galaxy-glass rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-primary-500/10 flex items-center justify-center">
              <Eye className="w-5 h-5 text-primary-400" />
            </div>
            <h2 className="text-xl font-bold text-white">Rasgos de tu Personalidad</h2>
          </div>
          <div className="flex flex-wrap gap-2 mb-5">
            {sd.traits.concat(['Intuitivo', 'Determinado', 'Carismático']).map((t) => (
              <span key={t} className="px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 text-sm text-primary-300 font-medium">{t}</span>
            ))}
          </div>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div className="galaxy-glass rounded-xl p-4">
              <p className="text-white/40 text-xs uppercase tracking-wider mb-2 flex items-center gap-1"><TrendingUp className="w-3 h-3" /> Fortalezas</p>
              <ul className="space-y-1 text-white/70">
                <li className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" /> Liderazgo natural y carisma</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" /> Intuición fuertemente desarrollada</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" /> Capacidad de adaptación</li>
              </ul>
            </div>
            <div className="galaxy-glass rounded-xl p-4">
              <p className="text-white/40 text-xs uppercase tracking-wider mb-2 flex items-center gap-1"><Lightbulb className="w-3 h-3" /> Áreas de crecimiento</p>
              <ul className="space-y-1 text-white/70">
                <li className="flex items-center gap-2"><ArrowUpRight className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" /> Equilibrar emoción y razón</li>
                <li className="flex items-center gap-2"><ArrowUpRight className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" /> Desarrollar la paciencia</li>
                <li className="flex items-center gap-2"><ArrowUpRight className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" /> Canalizar la energía creativa</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* ── Estadísticas por área de vida ────────────────────────────── */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          className="galaxy-glass rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Energía por Área de Vida</h2>
              <p className="text-white/40 text-sm">Basado en tu configuración astral actual</p>
            </div>
          </div>
          <div className="space-y-4">
            {lifeAreas.map((area, i) => (
              <StatBar key={area.label} label={area.label} value={area.value} color={area.color} delay={0.6 + i * 0.1} />
            ))}
          </div>
        </motion.div>

        {/* ── Compatibilidad + Datos especiales ───────────────────────── */}
        <div className="grid sm:grid-cols-2 gap-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
            className="galaxy-glass rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-pink-500/10 flex items-center justify-center">
                <Heart className="w-5 h-5 text-pink-400" />
              </div>
              <h3 className="text-lg font-bold text-white">Compatibilidad</h3>
            </div>
            <p className="text-white/40 text-sm mb-3">Signos con mayor afinidad contigo:</p>
            <div className="space-y-2">
              {compatibleSigns.map((sign, i) => (
                <div key={sign} className="flex items-center justify-between">
                  <span className="text-sm text-white/70">{sign}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-pink-500 to-rose-400 rounded-full"
                        style={{ width: `${[92, 85, 78][i]}%` }} />
                    </div>
                    <span className="text-xs text-white/40 w-8">{[92, 85, 78][i]}%</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 }}
            className="galaxy-glass rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                <Star className="w-5 h-5 text-amber-400" />
              </div>
              <h3 className="text-lg font-bold text-white">Datos de la Suerte</h3>
            </div>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-white/40 text-xs uppercase tracking-wider mb-1.5">Números de la suerte</p>
                <div className="flex gap-2 flex-wrap">
                  {luckyNumbers.slice(0, 5).map(n => (
                    <span key={n} className="w-8 h-8 rounded-full bg-accent-500/20 border border-accent-500/30 text-accent-300 text-xs font-bold flex items-center justify-center">{n}</span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-white/40 text-xs uppercase tracking-wider mb-1.5">Colores auspiciosos</p>
                <div className="flex gap-2 flex-wrap">
                  {luckyColors.map(c => <span key={c} className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/60">{c}</span>)}
                </div>
              </div>
              <div>
                <p className="text-white/40 text-xs uppercase tracking-wider mb-1.5">Días favorables</p>
                <div className="flex gap-2">
                  {luckyDays.map(d => <span key={d} className="text-xs px-3 py-1 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-300">{d}</span>)}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── Predicciones próximos 3 meses ───────────────────────────── */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
          className="galaxy-glass rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center">
              <Clock className="w-5 h-5 text-violet-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Predicciones Próximos 3 Meses</h2>
              <p className="text-white/40 text-sm">Según los tránsitos planetarios actuales</p>
            </div>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { month: 'Mes 1', Icon: TrendingUp, color: 'text-emerald-400 bg-emerald-400/10', title: 'Expansión profesional', desc: 'Júpiter favorece nuevas oportunidades en tu carrera. Es el momento ideal para dar el paso que llevas tiempo postergando.' },
              { month: 'Mes 2', Icon: Heart, color: 'text-pink-400 bg-pink-400/10', title: 'Conexiones profundas', desc: 'Venus en armonía con tu signo intensifica las relaciones. Momento clave para fortalecer vínculos importantes.' },
              { month: 'Mes 3', Icon: Zap, color: 'text-amber-400 bg-amber-400/10', title: 'Claridad y decisión', desc: 'Mercurio directo trae claridad mental. Las decisiones tomadas en este período tendrán impacto duradero.' },
            ].map(({ month, Icon, color, title, desc }) => (
              <div key={month} className="galaxy-glass rounded-xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className={`w-8 h-8 rounded-lg ${color.split(' ')[1]} flex items-center justify-center`}>
                    <Icon className={`w-4 h-4 ${color.split(' ')[0]}`} />
                  </div>
                  <span className="text-xs font-semibold text-white/40 uppercase tracking-wider">{month}</span>
                </div>
                <h4 className="text-sm font-bold text-white mb-1">{title}</h4>
                <p className="text-xs text-white/40 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Consejo del astrólogo ────────────────────────────────────── */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75 }}
          className="relative galaxy-glass rounded-2xl p-6 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 to-purple-500/5" />
          <div className="relative flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-purple-500 flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-xs text-primary-400 font-semibold uppercase tracking-wider mb-1">Consejo del astrólogo</p>
              <p className="text-white/70 leading-relaxed text-sm">
                &ldquo;Tu configuración astral revela a alguien que está en un punto de inflexión importante. 
                Los planetas están alineados para apoyar tu crecimiento, pero la clave está en confiar en tu intuición 
                y actuar con valentía cuando se presenten las oportunidades. Este es tu momento.&rdquo;
              </p>
              <p className="text-white/30 text-xs mt-2">— Equipo de Astrólogos AstroKey</p>
            </div>
          </div>
        </motion.div>

        {/* ── Interpretación personalizada ─────────────────────────────── */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
          className="galaxy-glass rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-accent-500/10 flex items-center justify-center">
              <Users className="w-5 h-5 text-accent-400" />
            </div>
            <h2 className="text-xl font-bold text-white">Interpretación Personalizada</h2>
          </div>
          <div className="space-y-6">
            {interpretations.map((block) => (
              <div key={block.title} className="flex gap-4">
                <div className={`w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0 mt-0.5`}>
                  <block.Icon className={`w-4 h-4 ${block.color}`} />
                </div>
                <div className="border-l border-white/10 pl-4">
                  <h3 className={`text-base font-bold mb-1 ${block.color}`}>{block.title}</h3>
                  <p className="text-white/50 leading-relaxed text-sm">{block.content}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Acciones ─────────────────────────────────────────────────── */}
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
