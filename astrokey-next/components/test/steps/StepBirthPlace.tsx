'use client'

import { useState, useCallback } from 'react'
import { useAppStore } from '@/lib/store'
import { MapPin, Search } from 'lucide-react'

const fallbackCities = [
  'Madrid, España', 'Barcelona, España', 'Valencia, España', 'Sevilla, España',
  'Buenos Aires, Argentina', 'Ciudad de México, México', 'Santiago, Chile',
  'Bogotá, Colombia', 'Lima, Perú', 'Quito, Ecuador',
  'New York, USA', 'London, UK', 'Paris, France', 'Berlin, Germany',
  'Rome, Italy', 'Tokyo, Japan', 'São Paulo, Brazil',
]

export default function StepBirthPlace() {
  const { testAnswers, setTestAnswer } = useAppStore()
  const [query, setQuery] = useState(testAnswers.birthPlace)
  const [results, setResults] = useState<string[]>([])
  const [showResults, setShowResults] = useState(false)

  const search = useCallback((q: string) => {
    setQuery(q)
    if (q.length < 2) {
      setResults([])
      setShowResults(false)
      return
    }
    const filtered = fallbackCities.filter((c) =>
      c.toLowerCase().includes(q.toLowerCase())
    )
    setResults(filtered)
    setShowResults(true)
  }, [])

  const select = (city: string) => {
    setQuery(city)
    setTestAnswer('birthPlace', city)
    setShowResults(false)
  }

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold text-white mb-8">¿Cuál es tu lugar de nacimiento?</h2>

      <div className="max-w-md mx-auto relative">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
          <input
            type="text"
            value={query}
            onChange={(e) => search(e.target.value)}
            onFocus={() => query.length >= 2 && setShowResults(true)}
            placeholder="Escribe para buscar tu ciudad..."
            className="w-full pl-12 pr-4 py-3.5 bg-transparent border border-white/15 rounded-xl text-white placeholder:text-white/25 focus:border-primary-500 focus:ring-0 outline-none transition-colors"
          />
        </div>

        {showResults && results.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-cosmic-dark/95 border border-white/10 backdrop-blur-xl rounded-xl shadow-xl max-h-60 overflow-y-auto z-20">
            {results.map((city) => (
              <button
                key={city}
                onClick={() => select(city)}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors text-left"
              >
                <MapPin className="w-4 h-4 text-primary-400 flex-shrink-0" />
                <span className="text-sm text-white/70">{city}</span>
              </button>
            ))}
          </div>
        )}

        {testAnswers.birthPlace && (
          <div className="mt-4 flex items-center justify-center gap-2 text-sm text-emerald-400">
            <MapPin className="w-4 h-4" />
            <span>{testAnswers.birthPlace}</span>
          </div>
        )}
      </div>
    </div>
  )
}
