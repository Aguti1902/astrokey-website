import { NextRequest, NextResponse } from 'next/server'
import { stripe, getOrCreateCustomer, TRIAL_FEE_CENTS, CURRENCY } from '@/lib/stripe'

/**
 * Crea un PaymentIntent de €0.50 guardando la tarjeta para el cobro mensual futuro.
 * El webhook payment_intent.succeeded crea la suscripción €19.99/mes con 2 días de trial.
 */
export async function POST(req: NextRequest) {
  try {
    const { email, firstName, lastName } = await req.json()

    const fullName = [firstName, lastName].filter(Boolean).join(' ')

    // 1. Crear o recuperar cliente con email y nombre explícitos
    let customer = await getOrCreateCustomer(email, fullName)

    // 2. Actualizar siempre el cliente con los datos más recientes
    if (email || fullName) {
      customer = await stripe.customers.update(customer.id, {
        ...(email && { email }),
        ...(fullName && { name: fullName }),
        metadata: {
          source: 'AstroKey',
          firstName: firstName || '',
          lastName: lastName || '',
        },
      })
    }

    // 3. PaymentIntent de €0.50 que guarda la tarjeta para cobros futuros
    const paymentIntent = await stripe.paymentIntents.create({
      amount: TRIAL_FEE_CENTS,
      currency: CURRENCY,
      customer: customer.id,
      description: 'AstroKey - Acceso prueba 2 días',
      setup_future_usage: 'off_session',
      automatic_payment_methods: { enabled: true },
      receipt_email: email || undefined,
      metadata: {
        firstName: firstName || '',
        lastName: lastName || '',
        email: email || '',
        customerId: customer.id,
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
