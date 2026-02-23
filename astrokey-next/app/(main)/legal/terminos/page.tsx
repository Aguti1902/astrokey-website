import type { Metadata } from 'next'
import LegalPage from '@/components/legal/LegalPage'

export const metadata: Metadata = { title: 'Términos y Condiciones' }

export default function TermsPage() {
  return (
    <LegalPage title="Términos y Condiciones">
      <p>Última actualización: Febrero 2026</p>

      <h2>1. Aceptación de los Términos</h2>
      <p>
        Al acceder y utilizar AstroKey, usted acepta estos términos y condiciones
        en su totalidad. Si no está de acuerdo con alguno de estos términos, no
        utilice nuestro servicio.
      </p>

      <h2>2. Descripción del Servicio</h2>
      <p>
        AstroKey ofrece un servicio de astrología digital que incluye tests
        astrológicos, generación de cartas natales y contenido astrológico
        personalizado.
      </p>

      <h2>3. Período de Prueba y Suscripción</h2>
      <p>
        El período de prueba tiene un coste de €0.50 y dura 2 días. Después del
        período de prueba, la suscripción se activa automáticamente por €19.99/mes.
        Puede cancelar en cualquier momento antes de que finalice el período de prueba.
      </p>

      <h2>4. Cancelación</h2>
      <p>
        Puede cancelar su suscripción en cualquier momento. La cancelación será
        efectiva al final del período de facturación actual.
      </p>

      <h2>5. Limitación de Responsabilidad</h2>
      <p>
        AstroKey se ofrece con fines de entretenimiento. No nos hacemos responsables
        de decisiones tomadas basándose en el contenido astrológico proporcionado.
      </p>

      <h2>6. Contacto</h2>
      <p>
        Para consultas sobre estos términos: legal@astrokey.com
      </p>
    </LegalPage>
  )
}
