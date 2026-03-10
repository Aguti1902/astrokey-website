'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import { useAppStore } from '@/lib/store'
import { MapPin, Search, Loader2, X } from 'lucide-react'
import { useT } from '@/lib/i18n'

interface City { name: string; displayName: string; lat: string; lon: string }

// Fallback con ciudades de todo el mundo
const WORLD_CITIES = [
  // España
  'Madrid, España','Barcelona, España','Valencia, España','Sevilla, España','Zaragoza, España',
  'Málaga, España','Bilbao, España','Alicante, España','Murcia, España','Palma, España',
  // Europa
  'París, Francia','Marsella, Francia','Lyon, Francia',
  'Londres, Reino Unido','Manchester, Reino Unido','Birmingham, Reino Unido',
  'Berlín, Alemania','Múnich, Alemania','Hamburgo, Alemania','Frankfurt, Alemania',
  'Roma, Italia','Milán, Italia','Nápoles, Italia','Turín, Italia',
  'Lisboa, Portugal','Oporto, Portugal',
  'Ámsterdam, Países Bajos','Rotterdam, Países Bajos',
  'Bruselas, Bélgica','Amberes, Bélgica',
  'Viena, Austria','Varsovia, Polonia','Cracovia, Polonia',
  'Praga, República Checa','Budapest, Hungría','Bucarest, Rumanía',
  'Estocolmo, Suecia','Oslo, Noruega','Copenhague, Dinamarca','Helsinki, Finlandia',
  'Atenas, Grecia','Sofía, Bulgaria','Zagreb, Croacia','Belgrado, Serbia',
  'Kiev, Ucrania','Moscú, Rusia','San Petersburgo, Rusia',
  'Zurich, Suiza','Ginebra, Suiza','Dublín, Irlanda','Estambul, Turquía',
  // América Latina
  'Ciudad de México, México','Guadalajara, México','Monterrey, México','Puebla, México','Tijuana, México',
  'Buenos Aires, Argentina','Córdoba, Argentina','Rosario, Argentina','Mendoza, Argentina',
  'Santiago, Chile','Valparaíso, Chile','Concepción, Chile',
  'Bogotá, Colombia','Medellín, Colombia','Cali, Colombia','Barranquilla, Colombia',
  'Lima, Perú','Arequipa, Perú','Trujillo, Perú','Cusco, Perú',
  'Caracas, Venezuela','Maracaibo, Venezuela','Valencia, Venezuela',
  'Quito, Ecuador','Guayaquil, Ecuador','Cuenca, Ecuador',
  'La Paz, Bolivia','Santa Cruz, Bolivia','Cochabamba, Bolivia',
  'Asunción, Paraguay','Ciudad del Este, Paraguay',
  'Montevideo, Uruguay','Salto, Uruguay',
  'La Habana, Cuba','Santiago de Cuba, Cuba',
  'Santo Domingo, República Dominicana',
  'San José, Costa Rica','Guatemala, Guatemala','Tegucigalpa, Honduras',
  'San Salvador, El Salvador','Managua, Nicaragua','Ciudad de Panamá, Panamá',
  'Porto Alegre, Brasil','São Paulo, Brasil','Río de Janeiro, Brasil','Brasilia, Brasil',
  'Salvador, Brasil','Fortaleza, Brasil','Belo Horizonte, Brasil','Manaus, Brasil',
  // América del Norte
  'Nueva York, Estados Unidos','Los Ángeles, Estados Unidos','Chicago, Estados Unidos',
  'Houston, Estados Unidos','Miami, Estados Unidos','Dallas, Estados Unidos',
  'Phoenix, Estados Unidos','San Francisco, Estados Unidos','Seattle, Estados Unidos',
  'Toronto, Canadá','Montreal, Canadá','Vancouver, Canadá','Calgary, Canadá',
  // Asia
  'Tokio, Japón','Osaka, Japón','Kioto, Japón','Hiroshima, Japón',
  'Pekín, China','Shanghái, China','Cantón, China','Shenzhen, China','Hong Kong, China',
  'Seúl, Corea del Sur','Busan, Corea del Sur',
  'Delhi, India','Mumbai, India','Bangalore, India','Calcuta, India','Chennai, India',
  'Karachi, Pakistán','Lahore, Pakistán','Islamabad, Pakistán',
  'Dhaka, Bangladés','Colombo, Sri Lanka',
  'Bangkok, Tailandia','Ho Chi Minh, Vietnam','Hanói, Vietnam',
  'Jakarta, Indonesia','Yakarta, Indonesia','Surabaya, Indonesia','Bali, Indonesia',
  'Manila, Filipinas','Quezon City, Filipinas',
  'Singapur, Singapur','Kuala Lumpur, Malasia',
  'Yangón, Myanmar','Phnom Penh, Camboya',
  'Dubái, Emiratos Árabes','Abu Dabi, Emiratos Árabes',
  'Riad, Arabia Saudí','Jeddah, Arabia Saudí','La Meca, Arabia Saudí',
  'Teherán, Irán','Bagdad, Irak','Ammán, Jordania','Beirut, Líbano',
  'Tel Aviv, Israel','Jerusalén, Israel',
  'Estambul, Turquía','Ankara, Turquía','Esmirna, Turquía',
  'Tashkent, Uzbekistán','Almaty, Kazajistán','Kabul, Afganistán',
  // África
  'El Cairo, Egipto','Alejandría, Egipto',
  'Lagos, Nigeria','Abuja, Nigeria','Kano, Nigeria',
  'Johannesburgo, Sudáfrica','Ciudad del Cabo, Sudáfrica','Durban, Sudáfrica',
  'Nairobi, Kenia','Addis Abeba, Etiopía','Kampala, Uganda','Dar es Salaam, Tanzania',
  'Accra, Ghana','Dakar, Senegal','Abiyán, Costa de Marfil',
  'Casablanca, Marruecos','Rabat, Marruecos','Túnez, Túnez','Argel, Argelia',
  'Trípoli, Libia','Jartum, Sudán','Kinshasa, Congo',
  'Luanda, Angola','Maputo, Mozambique','Harare, Zimbabue',
  // Oceanía
  'Sídney, Australia','Melbourne, Australia','Brisbane, Australia','Perth, Australia',
  'Auckland, Nueva Zelanda','Wellington, Nueva Zelanda',
]

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
      // Sin countrycodes = búsqueda mundial
      const params = new URLSearchParams({
        q,
        format: 'json',
        addressdetails: '1',
        limit: '12',
        featuretype: 'city',
      })
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?${params}`,
        { headers: { 'Accept-Language': 'es' } }
      )
      if (!res.ok) throw new Error()
      const data = await res.json()
      const cities: City[] = data
        .filter((item: any) =>
          ['city', 'town', 'village', 'municipality', 'administrative'].includes(item.type) ||
          item.class === 'place'
        )
        .map((item: any) => {
          const addr = item.address || {}
          const cityName = addr.city || addr.town || addr.village || addr.municipality || item.name
          const displayParts = [cityName, addr.state || '', addr.country || ''].filter(Boolean)
          return { name: cityName, displayName: displayParts.join(', '), lat: item.lat, lon: item.lon }
        })
        .filter((c: City, i: number, arr: City[]) =>
          arr.findIndex((x) => x.displayName === c.displayName) === i
        )
        .slice(0, 10)
      setResults(cities)
      setShowResults(cities.length > 0)
    } catch {
      // Fallback con ciudades mundiales
      const filtered = WORLD_CITIES
        .filter((c) => c.toLowerCase().includes(q.toLowerCase()))
        .slice(0, 10)
        .map((c) => ({ name: c.split(',')[0], displayName: c, lat: '', lon: '' }))
      setResults(filtered)
      setShowResults(filtered.length > 0)
    } finally {
      setIsLoading(false)
    }
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
          {isLoading
            ? <Loader2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-400 animate-spin" />
            : <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
          }
          <input
            type="text"
            value={query}
            onChange={(e) => handleInput(e.target.value)}
            onFocus={() => results.length > 0 && setShowResults(true)}
            placeholder={t.test.birthPlacePlaceholder}
            autoComplete="off"
            className="w-full pl-12 pr-10 py-4 bg-transparent border border-white/15 rounded-xl text-white placeholder:text-white/25 focus:border-primary-500 focus:ring-0 outline-none transition-colors text-base"
          />
          {query && (
            <button onClick={clearInput} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {showResults && results.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 rounded-xl overflow-hidden z-30 shadow-2xl"
            style={{ background: 'rgba(5,8,22,0.97)', border: '1px solid rgba(255,255,255,0.12)' }}>
            {results.map((city, i) => (
              <button key={i} onMouseDown={(e) => { e.preventDefault(); selectCity(city) }}
                className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-white/5 transition-colors text-left border-b border-white/5 last:border-0">
                <MapPin className="w-4 h-4 text-primary-400 flex-shrink-0" />
                <span className="text-sm text-white/80">{city.displayName}</span>
              </button>
            ))}
          </div>
        )}

        {selected && (
          <div className="mt-4 flex items-center justify-center gap-2 text-sm text-emerald-400">
            <MapPin className="w-4 h-4" /><span>{selected}</span>
          </div>
        )}
        {!selected && query.length === 0 && (
          <p className="mt-3 text-xs text-white/25">{t.test.birthPlaceHint}</p>
        )}
      </div>
    </div>
  )
}
