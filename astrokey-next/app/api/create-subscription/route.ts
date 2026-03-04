import { NextRequest, NextResponse } from 'next/server'
import { stripe, getOrCreateCustomer, TRIAL_FEE_CENTS, CURRENCY } from '@/lib/stripe'
import { upsertUser } from '@/lib/db'

/**
 * Crea PaymentIntent de €0.50 + guarda/actualiza el usuario en la BD
 */
export async function POST(req: NextRequest) {
  try {
    const { email, firstName, lastName, language } = await req.json()
    const fullName = [firstName, lastName].filter(Boolean).join(' ')

    // 1. Crear/actualizar cliente en Stripe
    let customer = await getOrCreateCustomer(email, fullName)
    if (email || fullName) {
      customer = await stripe.customers.update(customer.id, {
        ...(email && { email }),
        ...(fullName && { name: fullName }),
        metadata: { source: 'AstroKey', firstName: firstName || '', lastName: lastName || '' },
      })
    }

    // 2. Crear/actualizar usuario en Supabase
    if (email) {
      try {
        await upsertUser({
          email,
          firstName,
          lastName,
          stripeCustomerId: customer.id,
          language: language || 'es',
        })
      } catch (dbError) {
        // No bloqueamos el pago si falla la BD
        console.error('[create-subscription] DB upsert failed:', dbError)
      }
    }

    // 3. Crear PaymentIntent de €0.50 que guarda la tarjeta
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
        language: language || 'es',
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
    return NextResponse.json({ error: error.message || 'Error al inicializar el pago' }, { status: 500 })
  }
}
