'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import { useAppStore } from '@/lib/store'
import { MapPin, Search, Loader2, X } from 'lucide-react'
import { useT } from '@/lib/i18n'

interface City { name: string; displayName: string; lat: string; lon: string }

export default function StepBirthPlace() {
  const { testAnswers, setTestAnswer } = useAppStore()
  const t = useT()
  const [query, setQuery] = useState(testAnswers.birthPlace || '')
  const [results, setResults] = useState<City[]>([])
  const [showResults, setShowResults] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [selected, setSelected] = useState(testAnswers.birthPlace || '')
  const debounceRef = useRef<NodeJS.Timeout | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setShowResults(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const searchCities = useCallback(async (q: string) => {
    if (q.length < 2) { setResults([]); setShowResults(false); setIsLoading(false); return }
    setIsLoading(true)
    try {
      const params = new URLSearchParams({ q, format: 'json', addressdetails: '1', limit: '12', featuretype: 'city', countrycodes: 'ad,al,at,ba,be,bg,by,ch,cy,cz,de,dk,ee,es,fi,fr,gb,gr,hr,hu,ie,is,it,li,lt,lu,lv,mc,md,me,mk,mt,nl,no,pl,pt,ro,rs,ru,se,si,sk,sm,tr,ua,va,xk' })
      const res = await fetch(`https://nominatim.openstreetmap.org/search?${params}`, { headers: { 'Accept-Language': 'es' } })
      if (!res.ok) throw new Error()
      const data = await res.json()
      const cities: City[] = data
        .filter((item: any) => ['city','town','village','municipality','administrative'].includes(item.type) || item.class === 'place')
        .map((item: any) => {
          const addr = item.address || {}
          const cityName = addr.city || addr.town || addr.village || addr.municipality || item.name
          const displayParts = [cityName, addr.state || '', addr.country || ''].filter(Boolean)
          return { name: cityName, displayName: displayParts.join(', '), lat: item.lat, lon: item.lon }
        })
        .filter((c: City, i: number, arr: City[]) => arr.findIndex((x) => x.displayName === c.displayName) === i)
        .slice(0, 10)
      setResults(cities); setShowResults(cities.length > 0)
    } catch {
      const fallback = ['Madrid, España','Barcelona, España','Valencia, España','Sevilla, España','París, Francia','Londres, Reino Unido','Berlín, Alemania','Roma, Italia','Lisboa, Portugal','Ámsterdam, Países Bajos','Viena, Austria','Varsovia, Polonia','Praga, República Checa','Budapest, Hungría','Estocolmo, Suecia','Oslo, Noruega','Copenhague, Dinamarca','Helsinki, Finlandia','Atenas, Grecia','Zurich, Suiza','Dublín, Irlanda','Bruselas, Bélgica','Bucarest, Rumanía','Sofía, Bulgaria','Zagreb, Croacia','Belgrado, Serbia','Kiev, Ucrania','Moscú, Rusia','Estambul, Turquía']
      const filtered = fallback.filter((c) => c.toLowerCase().includes(q.toLowerCase())).slice(0, 10).map((c) => ({ name: c.split(',')[0], displayName: c, lat: '', lon: '' }))
      setResults(filtered); setShowResults(filtered.length > 0)
    } finally { setIsLoading(false) }
  }, [])

  const handleInput = (value: string) => {
    setQuery(value); setSelected('')
    if (debounceRef.current) clearTimeout(debounceRef.current)
    if (value.length < 2) { setResults([]); setShowResults(false); return }
    setIsLoading(true)
    debounceRef.current = setTimeout(() => searchCities(value), 400)
  }

  const selectCity = (city: City) => {
    setQuery(city.displayName); setSelected(city.displayName)
    setTestAnswer('birthPlace', city.displayName)
    if (city.lat && city.lon) setTestAnswer('birthPlaceCoordinates', [parseFloat(city.lon), parseFloat(city.lat)])
    setShowResults(false); setResults([])
  }

  const clearInput = () => {
    setQuery(''); setSelected(''); setResults([]); setShowResults(false)
    setTestAnswer('birthPlace', '')
  }

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold text-white mb-8">{t.test.birthPlaceTitle}</h2>
      <div className="max-w-md mx-auto relative" ref={containerRef}>
        <div className="relative">
          {isLoading ? <Loader2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-400 animate-spin" /> : <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />}
          <input type="text" value={query} onChange={(e) => handleInput(e.target.value)} onFocus={() => results.length > 0 && setShowResults(true)}
            placeholder={t.test.birthPlacePlaceholder} autoComplete="off"
            className="w-full pl-12 pr-10 py-4 bg-transparent border border-white/15 rounded-xl text-white placeholder:text-white/25 focus:border-primary-500 focus:ring-0 outline-none transition-colors text-base" />
          {query && <button onClick={clearInput} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"><X className="w-4 h-4" /></button>}
        </div>
        {showResults && results.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 rounded-xl overflow-hidden z-30 shadow-2xl" style={{ background: 'rgba(5,8,22,0.97)', border: '1px solid rgba(255,255,255,0.12)' }}>
            {results.map((city, i) => (
              <button key={i} onMouseDown={(e) => { e.preventDefault(); selectCity(city) }}
                className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-white/5 transition-colors text-left border-b border-white/5 last:border-0">
                <MapPin className="w-4 h-4 text-primary-400 flex-shrink-0" />
                <span className="text-sm text-white/80">{city.displayName}</span>
              </button>
            ))}
          </div>
        )}
        {selected && <div className="mt-4 flex items-center justify-center gap-2 text-sm text-emerald-400"><MapPin className="w-4 h-4" /><span>{selected}</span></div>}
        {!selected && query.length === 0 && <p className="mt-3 text-xs text-white/25">{t.test.birthPlaceHint}</p>}
      </div>
    </div>
  )
}
