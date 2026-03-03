import { NextRequest, NextResponse } from 'next/server'
import { stripe, getOrCreateCustomer, TRIAL_FEE_CENTS, CURRENCY } from '@/lib/stripe'

/**
 * Paso 1: Cobra €0.50 y guarda la tarjeta para cobros futuros.
 * Paso 2: El webhook payment_intent.succeeded crea la suscripción €19.99/mes
 *         con 2 días de trial usando la tarjeta guardada.
 */
export async function POST(req: NextRequest) {
  try {
    const { email, firstName, lastName } = await req.json()

    const customer = await getOrCreateCustomer(
      email,
      [firstName, lastName].filter(Boolean).join(' ')
    )

    // PaymentIntent de €0.50 que además guarda la tarjeta para cobros futuros
    const paymentIntent = await stripe.paymentIntents.create({
      amount: TRIAL_FEE_CENTS,
      currency: CURRENCY,
      customer: customer.id,
      description: 'AstroKey - Acceso prueba 2 días',
      // Guarda la tarjeta para el cobro recurrente de €19.99/mes
      setup_future_usage: 'off_session',
      automatic_payment_methods: { enabled: true },
      metadata: {
        firstName: firstName || '',
        lastName: lastName || '',
        email: email || '',
        action: 'create_subscription_after_payment',
      },
    })

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      customerId: customer.id,
      paymentIntentId: paymentIntent.id,
    })
  } catch (error: any) {
    console.error('[create-subscription]', error.message)
    return NextResponse.json(
      { error: error.message || 'Error al inicializar el pago' },
      { status: 500 }
    )
  }
}
