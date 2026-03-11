'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, Check, Sparkles } from 'lucide-react'
import { useAppStore } from '@/lib/store'
import { generateChart } from '@/lib/astrology'
import { cn } from '@/lib/utils'
import { useT } from '@/lib/i18n'

import StepGender from './steps/StepGender'
import StepName from './steps/StepName'
import StepBirthDate from './steps/StepBirthDate'
import StepBirthTime from './steps/StepBirthTime'
import StepBirthPlace from './steps/StepBirthPlace'
import StepRelationship from './steps/StepRelationship'
import StepCurrentMoment from './steps/StepCurrentMoment'
import StepNatalChart from './steps/StepNatalChart'
import StepTimeOfDay from './steps/StepTimeOfDay'
import StepThoughts from './steps/StepThoughts'
import StepElement from './steps/StepElement'
import StepDecisionStyle from './steps/StepDecisionStyle'
import StepPersonality from './steps/StepPersonality'
import StepCompatibility from './steps/StepCompatibility'
import StepEnergyLevel from './steps/StepEnergyLevel'
import StepDeepFear from './steps/StepDeepFear'
import StepDifficulties from './steps/StepDifficulties'
import StepGoals from './steps/StepGoals'
import StepSelfMessage from './steps/StepSelfMessage'
import StepPreferences from './steps/StepPreferences'
import LoadingScreen from './LoadingScreen'
import FillerSlide from './FillerSlide'

// Fillers DESPUÉS de estos pasos (0-indexed, con 18 pasos totales)
const FILLER_AFTER_STEPS: Record<number, 1 | 2 | 3 | 4> = {
  1: 1,  // después de Nombre        → "El universo guardó este instante"
  4: 2,  // después de BirthPlace    → "Los astros revelan tu camino"
  8: 3,  // después de TimeOfDay     → "Tu destino está tomando forma"
  11: 4, // después de DecisionStyle → "Las estrellas conocen tu historia"
}

const TOTAL_STEPS = 20

const stepComponents = [
  // 0  1         2             3             4
  StepGender, StepName, StepBirthDate, StepBirthTime, StepBirthPlace,
  // 5                 6                  7            8             9
  StepRelationship, StepCurrentMoment, StepNatalChart, StepTimeOfDay, StepThoughts,
  // 10           11                  12               13
  StepElement, StepDecisionStyle, StepPersonality, StepCompatibility,
  // 14              15            16               17          18               19
  StepEnergyLevel, StepDeepFear, StepDifficulties, StepGoals, StepSelfMessage, StepPreferences,
]

export default function TestWizard() {
  const [currentStep, setCurrentStep] = useState(0)
  const [activeFiller, setActiveFiller] = useState<1 | 2 | 3 | 4 | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const { testAnswers, setChartResult } = useAppStore()
  const t = useT()

  const validate = useCallback((): boolean => {
    setError('')
    const a = testAnswers
    switch (currentStep) {
      case 0: if (!a.gender) { setError('Selecciona tu sexo'); return false } break
      case 1: if (!a.firstName || !a.lastName) { setError('Completa tu nombre y apellidos'); return false } break
      case 2: if (!a.birthDate.day || !a.birthDate.month || !a.birthDate.year) { setError('Completa tu fecha de nacimiento'); return false } break
      case 3: if (!a.birthTime.hour || !a.birthTime.minute) { setError('Completa tu hora de nacimiento'); return false } break
      case 4: if (!a.birthPlace) { setError('Selecciona tu lugar de nacimiento'); return false } break
      case 5: if (!a.relationshipStatus) { setError('Selecciona tu situación sentimental'); return false } break
      case 6: if (!a.currentMoment) { setError('Selecciona una opción'); return false } break
      case 7: if (!a.hasNatalChart) { setError('Responde esta pregunta'); return false } break
      case 8: if (!a.timeOfDay) { setError('Selecciona una opción'); return false } break
      case 9: if (!a.currentThoughts || (Array.isArray(a.currentThoughts) ? a.currentThoughts.length === 0 : !a.currentThoughts)) { setError('Selecciona al menos una opción'); return false } break
      case 10: if (!a.element) { setError('Selecciona un elemento'); return false } break
      case 11: if (!a.decisionStyle) { setError('Selecciona una opción'); return false } break
      case 12: if (a.personalityTraits.length === 0) { setError('Selecciona al menos un rasgo'); return false } break
      case 13: if (a.compatibleSigns.length === 0) { setError('Selecciona al menos un signo'); return false } break
      case 14: break // energyLevel siempre tiene valor por defecto
      case 15: if (!(a as any).deepFear) { setError('Selecciona una opción'); return false } break
      case 16: if (!a.lifeDifficulties || (Array.isArray(a.lifeDifficulties) ? a.lifeDifficulties.length === 0 : !a.lifeDifficulties)) { setError('Selecciona al menos una opción'); return false } break
      case 17: if (!a.lifeGoals || (Array.isArray(a.lifeGoals) ? a.lifeGoals.length === 0 : !a.lifeGoals)) { setError('Selecciona al menos una opción'); return false } break
      case 18: if (!(a as any).selfMessage) { setError('Selecciona una opción'); return false } break
      case 19: if (!a.astrologicalPreferences || (Array.isArray(a.astrologicalPreferences) ? a.astrologicalPreferences.length === 0 : !a.astrologicalPreferences)) { setError('Selecciona al menos una opción'); return false } break
    }
    return true
  }, [currentStep, testAnswers])

  const next = useCallback(() => {
    if (!validate()) return
    if (currentStep === TOTAL_STEPS - 1) {
      setIsLoading(true)
      const result = generateChart(testAnswers)
      setChartResult(result)
      setTimeout(() => router.push('/email'), 4000)
      return
    }

    // Mostrar filler slide si corresponde
    if (FILLER_AFTER_STEPS[currentStep]) {
      setActiveFiller(FILLER_AFTER_STEPS[currentStep])
      setError('')
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    setCurrentStep((s) => s + 1)
    setError('')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [currentStep, validate, testAnswers, setChartResult, router])

  const prev = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep((s) => s - 1)
      setError('')
    }
  }, [currentStep])

  const progress = ((currentStep + 1) / TOTAL_STEPS) * 100
  const StepComponent = stepComponents[currentStep]

  if (isLoading) return <LoadingScreen />

  // Filler slide activo
  if (activeFiller) {
    return (
      <div className="min-h-screen flex flex-col relative z-10">
        <div className="flex-1 flex items-center justify-center px-4 py-8">
          <AnimatePresence mode="wait">
            <FillerSlide
              key={activeFiller}
              index={activeFiller}
              onContinue={() => {
                setActiveFiller(null)
                setCurrentStep((s) => s + 1)
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
            />
          </AnimatePresence>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col relative z-10">
      {/* Header */}
      <header className="sticky top-0 z-50 galaxy-glass">
        <div className="h-1 bg-white/5">
          <motion.div
            className="h-full bg-gradient-to-r from-primary-500 via-purple-500 to-accent-500"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={prev}
            disabled={currentStep === 0}
            className={cn(
              'flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all',
              currentStep === 0
                ? 'text-white/20 cursor-not-allowed'
                : 'text-primary-300 hover:bg-white/5'
            )}
          >
            <ArrowLeft className="w-4 h-4" />
            {t.common.back}
          </button>

          <div className="text-center">
            <span className="text-lg font-bold text-white">{currentStep + 1}</span>
            <span className="text-white/40">/{TOTAL_STEPS}</span>
          </div>

          <div className="w-20" />
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-4 pt-6 pb-24">
        <div className="w-full max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <StepComponent />
            </motion.div>
          </AnimatePresence>

          {error && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-400 text-sm text-center mt-4"
            >
              {error}
            </motion.p>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="sticky bottom-0 galaxy-glass py-4 px-4 z-50">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={next}
            className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-primary-500 to-purple-500 text-white font-semibold rounded-2xl shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/30 transition-all active:scale-[0.98]"
          >
            {currentStep === TOTAL_STEPS - 1 ? (
              <>
                <Check className="w-5 h-5" />
                {t.test.finishTest}
              </>
            ) : (
              <>
                {t.common.continue}
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
