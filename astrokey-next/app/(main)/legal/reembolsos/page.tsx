import type { Metadata } from 'next'
import LegalPage from '@/components/legal/LegalPage'

export const metadata: Metadata = { title: 'Política de Reembolsos' }

export default function RefundPage() {
  return (
    <LegalPage title="Política de Reembolsos">
      <p>Última actualización: Febrero 2026</p>

      <h2>1. Período de Prueba</h2>
      <p>
        El pago de €0.50 corresponde a un período de prueba de 2 días. Durante este
        período, tiene acceso completo a todas las funcionalidades de AstroKey.
      </p>

      <h2>2. Cancelación durante la Prueba</h2>
      <p>
        Si cancela dentro de los 2 días del período de prueba, no se le cobrará
        la suscripción mensual. El pago inicial de €0.50 no es reembolsable ya que
        corresponde al acceso inmediato al servicio.
      </p>

      <h2>3. Reembolsos de Suscripción</h2>
      <p>
        Para solicitar un reembolso de la suscripción mensual, contacte con
        nuestro equipo de soporte dentro de los primeros 14 días del cargo.
        Los reembolsos se procesarán en un plazo de 5-10 días hábiles.
      </p>

      <h2>4. Cómo Solicitar un Reembolso</h2>
      <p>
        Envíe su solicitud a soporte@astrokey.com incluyendo su nombre, email
        registrado y motivo de la solicitud.
      </p>
    </LegalPage>
  )
}
