import { NextRequest, NextResponse } from 'next/server'
import {
  stripe,
  getOrCreateCustomer,
  TRIAL_FEE_CENTS,
  MONTHLY_FEE_CENTS,
  TRIAL_DAYS,
  CURRENCY,
} from '@/lib/stripe'

/**
 * Flujo de pago:
 * 1. €0.50 cobrado ahora (pago inicial del trial)
 * 2. Trial de 2 días con acceso completo
 * 3. €19.99/mes automático a partir del día 3
 */
export async function POST(req: NextRequest) {
  try {
    const { email, firstName, lastName } = await req.json()

    // Obtener o crear cliente
    const customer = await getOrCreateCustomer(
      email,
      [firstName, lastName].filter(Boolean).join(' ')
    )

    // Crear la suscripción usando stripe.request para compatibilidad
    // con Stripe SDK v20+ que cambia la firma de los métodos
    const subscription: any = await (stripe as any).subscriptions.create({
      customer: customer.id,

      // Cargo único de €0.50 en la primera factura (trial fee)
      add_invoice_items: [
        {
          price_data: {
            currency: CURRENCY,
            unit_amount: TRIAL_FEE_CENTS,
            product_data: {
              name: 'AstroKey - Acceso Prueba 2 Días',
              description: 'Cobro único por el período de prueba',
            },
          },
          quantity: 1,
        },
      ],

      // Precio mensual €19.99 (se activa al terminar el trial)
      items: [
        {
          price_data: {
            currency: CURRENCY,
            unit_amount: MONTHLY_FEE_CENTS,
            recurring: { interval: 'month' },
            product_data: {
              name: 'AstroKey Premium',
              description: 'Acceso completo mensual',
            },
          },
        },
      ],

      trial_period_days: TRIAL_DAYS,
      payment_behavior: 'default_incomplete',
      payment_settings: {
        payment_method_types: ['card'],
        save_default_payment_method: 'on_subscription',
      },
      receipt_email: email || undefined,
      metadata: {
        firstName: firstName || '',
        lastName: lastName || '',
        email: email || '',
      },

      expand: ['latest_invoice.payment_intent'],
    })

    const invoice = subscription.latest_invoice
    const paymentIntent = invoice?.payment_intent

    return NextResponse.json({
      subscriptionId: subscription.id,
      customerId: customer.id,
      clientSecret: paymentIntent?.client_secret ?? null,
      status: subscription.status,
    })
  } catch (error: any) {
    console.error('[create-subscription]', error.message)
    return NextResponse.json(
      { error: error.message || 'Error al crear la suscripción' },
      { status: 500 }
    )
  }
}
