import type { Metadata } from 'next'
import LegalPage from '@/components/legal/LegalPage'

export const metadata: Metadata = { title: 'Política de Privacidad' }

export default function PrivacyPage() {
  return (
    <LegalPage title="Política de Privacidad">
      <p>Última actualización: Febrero 2026</p>

      <h2>1. Información que Recopilamos</h2>
      <p>
        En AstroKey recopilamos información personal que usted nos proporciona directamente,
        incluyendo nombre, fecha de nacimiento, lugar de nacimiento, dirección de correo
        electrónico e información de pago.
      </p>

      <h2>2. Uso de la Información</h2>
      <p>
        Utilizamos su información personal para generar su carta astral personalizada,
        procesar pagos, enviar comunicaciones relacionadas con el servicio y mejorar
        nuestra plataforma.
      </p>

      <h2>3. Protección de Datos</h2>
      <p>
        Implementamos medidas de seguridad técnicas y organizativas para proteger
        su información personal contra acceso no autorizado, pérdida o alteración.
        Toda la información de pago se procesa de forma segura con encriptación SSL.
      </p>

      <h2>4. Compartir Información</h2>
      <p>
        No vendemos ni compartimos su información personal con terceros con fines
        de marketing. Solo compartimos datos con proveedores de servicios necesarios
        para operar nuestra plataforma.
      </p>

      <h2>5. Sus Derechos</h2>
      <p>
        Usted tiene derecho a acceder, rectificar, eliminar y portar sus datos
        personales. Para ejercer estos derechos, contacte con nosotros en
        privacy@astrokey.com.
      </p>

      <h2>6. Contacto</h2>
      <p>
        Para cualquier consulta sobre esta política de privacidad, puede contactarnos
        en: privacy@astrokey.com
      </p>
    </LegalPage>
  )
}
