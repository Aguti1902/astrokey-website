import { NextRequest, NextResponse } from 'next/server'
import { stripe, TRIAL_PRICE_CENTS, TRIAL_CURRENCY } from '@/lib/stripe'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email, firstName, lastName } = body

    // Crear o recuperar cliente de Stripe
    let customer
    const existingCustomers = await stripe.customers.list({ email, limit: 1 })

    if (existingCustomers.data.length > 0) {
      customer = existingCustomers.data[0]
    } else {
      customer = await stripe.customers.create({
        email,
        name: `${firstName} ${lastName}`.trim() || undefined,
        metadata: { source: 'AstroKey' },
      })
    }

    // Crear PaymentIntent de €0.50
    const paymentIntent = await stripe.paymentIntents.create({
      amount: TRIAL_PRICE_CENTS,
      currency: TRIAL_CURRENCY,
      customer: customer.id,
      description: 'AstroKey - Acceso prueba 2 días',
      receipt_email: email || undefined,
      metadata: {
        firstName: firstName || '',
        lastName: lastName || '',
        email: email || '',
        product: 'astrokey_trial',
      },
      automatic_payment_methods: {
        enabled: true,
      },
    })

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      customerId: customer.id,
    })
  } catch (error: any) {
    console.error('Error creating PaymentIntent:', error)
    return NextResponse.json(
      { error: error.message || 'Error al crear el pago' },
      { status: 500 }
    )
  }
}
