import type { Metadata } from 'next'
import LegalPage from '@/components/legal/LegalPage'

export const metadata: Metadata = { title: 'Aviso Legal' }

export default function LegalNoticePage() {
  return (
    <LegalPage title="Aviso Legal">
      <p>Última actualización: Febrero 2026</p>

      <h2>Datos Identificativos</h2>
      <p>
        En cumplimiento de la Ley 34/2002, de 11 de julio, de Servicios de la
        Sociedad de la Información y de Comercio Electrónico, le informamos que
        AstroKey es una plataforma de entretenimiento astrológico digital.
      </p>

      <h2>Propiedad Intelectual</h2>
      <p>
        Todos los contenidos de AstroKey, incluyendo textos, imágenes, diseño gráfico,
        código fuente y logotipos, son propiedad de AstroKey y están protegidos por
        las leyes de propiedad intelectual.
      </p>

      <h2>Condiciones de Uso</h2>
      <p>
        El usuario se compromete a hacer un uso adecuado de los contenidos y servicios
        ofrecidos por AstroKey, respetando la legislación vigente.
      </p>

      <h2>Jurisdicción</h2>
      <p>
        Estos términos se rigen por la legislación española. Para cualquier
        controversia, las partes se someten a los juzgados y tribunales de Madrid.
      </p>
    </LegalPage>
  )
}
