'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Check, Loader2 } from 'lucide-react'

const steps = [
  'Tus respuestas están siendo analizadas',
  'Se calculan las posiciones del Sol, la Luna y los planetas',
  'Se están preparando los resultados',
  'Se está creando tu perfil astral',
]

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval)
          return 100
        }
        return p + 2
      })
    }, 70)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (progress >= 25 && !completedSteps.includes(0)) setCompletedSteps((s) => [...s, 0])
    if (progress >= 50 && !completedSteps.includes(1)) setCompletedSteps((s) => [...s, 1])
    if (progress >= 75 && !completedSteps.includes(2)) setCompletedSteps((s) => [...s, 2])
    if (progress >= 95 && !completedSteps.includes(3)) setCompletedSteps((s) => [...s, 3])
  }, [progress, completedSteps])

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative z-10">
      <div className="max-w-md w-full text-center">
        <div className="relative w-32 h-32 mx-auto mb-10">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="6" />
            <motion.circle
              cx="50" cy="50" r="45"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={283}
              initial={{ strokeDashoffset: 283 }}
              animate={{ strokeDashoffset: 283 - (283 * progress) / 100 }}
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold text-white">{progress}%</span>
          </div>
        </div>

        <div className="space-y-4 text-left">
          {steps.map((step, i) => {
            const isCompleted = completedSteps.includes(i)
            const isActive = !isCompleted && (i === 0 || completedSteps.includes(i - 1))

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0.5 }}
                animate={{ opacity: isCompleted || isActive ? 1 : 0.4 }}
                className="flex items-center gap-3"
              >
                {isCompleted ? (
                  <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3.5 h-3.5 text-white" />
                  </div>
                ) : isActive ? (
                  <Loader2 className="w-6 h-6 text-primary-400 animate-spin flex-shrink-0" />
                ) : (
                  <div className="w-6 h-6 rounded-full bg-white/10 flex-shrink-0" />
                )}
                <span className={`text-sm ${isCompleted ? 'text-white' : 'text-white/40'}`}>
                  {step}
                </span>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
