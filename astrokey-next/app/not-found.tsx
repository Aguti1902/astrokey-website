import LocaleLink from '@/components/ui/LocaleLink'
import { Sparkles } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center px-4">
        <div className="text-8xl font-black gradient-text mb-4">404</div>
        <h1 className="text-2xl font-bold text-white mb-4">Página no encontrada</h1>
        <p className="text-white/50 mb-8 max-w-md mx-auto">
          Las estrellas no alinearon esta ruta. Vuelve al inicio para continuar
          tu viaje astral.
        </p>
        <LocaleLink href="/" className="btn-primary inline-flex">
          <Sparkles className="w-5 h-5" />
          Volver al Inicio
        </LocaleLink>
      </div>
    </div>
  )
}
