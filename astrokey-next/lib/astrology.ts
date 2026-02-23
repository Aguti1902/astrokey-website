import type { TestAnswers, ChartResult } from './store'

const SIGNS = [
  'Aries', 'Tauro', 'Géminis', 'Cáncer', 'Leo', 'Virgo',
  'Libra', 'Escorpio', 'Sagitario', 'Capricornio', 'Acuario', 'Piscis',
] as const

const ELEMENTS = ['Fuego', 'Tierra', 'Aire', 'Agua'] as const
const HOUSES = ['Casa 1', 'Casa 4', 'Casa 7', 'Casa 10'] as const
const PLANETS = ['Sol', 'Luna', 'Marte', 'Venus', 'Júpiter', 'Saturno', 'Mercurio'] as const
const ASPECTS = ['Trígono', 'Sextil', 'Conjunción', 'Oposición', 'Cuadratura'] as const
const NODES = ['Nodo Norte en Aries', 'Nodo Norte en Tauro', 'Nodo Norte en Leo', 'Nodo Norte en Escorpio'] as const

function getSignFromDate(month: number, day: number): string {
  const ranges: [number, number, string][] = [
    [1, 20, 'Capricornio'], [2, 19, 'Acuario'], [3, 20, 'Piscis'],
    [4, 20, 'Aries'], [5, 21, 'Tauro'], [6, 21, 'Géminis'],
    [7, 22, 'Cáncer'], [8, 23, 'Leo'], [9, 23, 'Virgo'],
    [10, 23, 'Libra'], [11, 22, 'Escorpio'], [12, 22, 'Sagitario'],
  ]
  for (let i = ranges.length - 1; i >= 0; i--) {
    if (month > ranges[i][0] || (month === ranges[i][0] && day > ranges[i][1])) {
      return i < ranges.length - 1 ? ranges[i + 1][2] : 'Capricornio'
    }
  }
  return 'Capricornio'
}

function seededRandom(seed: number): () => number {
  let s = seed
  return () => {
    s = (s * 16807) % 2147483647
    return (s - 1) / 2147483646
  }
}

export function generateChart(answers: TestAnswers): ChartResult {
  const month = parseInt(answers.birthDate.month) || 1
  const day = parseInt(answers.birthDate.day) || 1
  const year = parseInt(answers.birthDate.year) || 1990
  const hour = parseInt(answers.birthTime.hour) || 12

  const seed = year * 10000 + month * 100 + day + hour
  const rand = seededRandom(seed)

  const sunSign = getSignFromDate(month, day)

  const elementMap: Record<string, string> = {
    Aries: 'Fuego', Leo: 'Fuego', Sagitario: 'Fuego',
    Tauro: 'Tierra', Virgo: 'Tierra', Capricornio: 'Tierra',
    Géminis: 'Aire', Libra: 'Aire', Acuario: 'Aire',
    Cáncer: 'Agua', Escorpio: 'Agua', Piscis: 'Agua',
  }

  return {
    sunSign,
    moonSign: SIGNS[Math.floor(rand() * SIGNS.length)],
    ascendant: SIGNS[Math.floor(rand() * SIGNS.length)],
    dominantElement: answers.element || elementMap[sunSign] || ELEMENTS[Math.floor(rand() * ELEMENTS.length)],
    astralHouse: HOUSES[Math.floor(rand() * HOUSES.length)],
    dominantPlanet: PLANETS[Math.floor(rand() * PLANETS.length)],
    planetaryAspect: ASPECTS[Math.floor(rand() * ASPECTS.length)],
    lunarNode: NODES[Math.floor(rand() * NODES.length)],
  }
}

export function getSignIcon(sign: string): string {
  const map: Record<string, string> = {
    Aries: '♈', Tauro: '♉', Géminis: '♊', Cáncer: '♋',
    Leo: '♌', Virgo: '♍', Libra: '♎', Escorpio: '♏',
    Sagitario: '♐', Capricornio: '♑', Acuario: '♒', Piscis: '♓',
  }
  return map[sign] || '✨'
}

export function getElementIcon(element: string): string {
  const map: Record<string, string> = {
    Fuego: '🔥', Tierra: '🌍', Aire: '💨', Agua: '💧',
  }
  return map[element] || '✨'
}
