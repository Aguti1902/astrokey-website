'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface TestAnswers {
  gender: string
  firstName: string
  lastName: string
  birthDate: { day: string; month: string; year: string }
  birthTime: { hour: string; minute: string }
  birthPlace: string
  birthPlaceCoordinates: [number, number] | null
  relationshipStatus: string
  hasNatalChart: string
  currentThoughts: string
  element: string
  personalityTraits: string[]
  compatibleSigns: string[]
  lifeDifficulties: string
  lifeGoals: string
  astrologicalPreferences: string
  email: string
}

export interface ChartResult {
  sunSign: string
  moonSign: string
  ascendant: string
  dominantElement: string
  astralHouse: string
  dominantPlanet: string
  planetaryAspect: string
  lunarNode: string
}

interface AppState {
  testAnswers: TestAnswers
  chartResult: ChartResult | null
  paymentCompleted: boolean
  trialStartTime: number | null
  isLoggedIn: boolean

  setTestAnswer: <K extends keyof TestAnswers>(key: K, value: TestAnswers[K]) => void
  setChartResult: (result: ChartResult) => void
  completePayment: () => void
  startTrial: () => void
  login: () => void
  logout: () => void
  resetTest: () => void
}

const initialTestAnswers: TestAnswers = {
  gender: '',
  firstName: '',
  lastName: '',
  birthDate: { day: '', month: '', year: '' },
  birthTime: { hour: '', minute: '' },
  birthPlace: '',
  birthPlaceCoordinates: null,
  relationshipStatus: '',
  hasNatalChart: '',
  currentThoughts: '',
  element: '',
  personalityTraits: [],
  compatibleSigns: [],
  lifeDifficulties: '',
  lifeGoals: '',
  astrologicalPreferences: '',
  email: '',
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      testAnswers: initialTestAnswers,
      chartResult: null,
      paymentCompleted: false,
      trialStartTime: null,
      isLoggedIn: false,

      setTestAnswer: (key, value) =>
        set((state) => ({
          testAnswers: { ...state.testAnswers, [key]: value },
        })),

      setChartResult: (result) => set({ chartResult: result }),

      completePayment: () =>
        set({ paymentCompleted: true, trialStartTime: Date.now() }),

      startTrial: () => set({ trialStartTime: Date.now() }),

      login: () => set({ isLoggedIn: true }),

      logout: () => set({ isLoggedIn: false }),

      resetTest: () => set({ testAnswers: initialTestAnswers, chartResult: null }),
    }),
    { name: 'astrokey-store' }
  )
)
