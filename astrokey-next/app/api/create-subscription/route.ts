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
 * Flujo:
 * 1. €0.50 cobrado ahora (invoice item del trial)
 * 2. Trial de 2 días
 * 3. €19.99/mes automático después
 */
export async function POST(req: NextRequest) {
  try {
    const { email, firstName, lastName } = await req.json()

    // 1. Obtener o crear cliente
    const customer = await getOrCreateCustomer(
      email,
      [firstName, lastName].filter(Boolean).join(' ')
    )

    // 2. Crear producto y precio mensual €19.99
    const monthlyProduct = await stripe.products.create({
      name: 'AstroKey Premium',
      description: 'Acceso completo mensual a AstroKey',
    })

    const monthlyPrice = await stripe.prices.create({
      product: monthlyProduct.id,
      unit_amount: MONTHLY_FEE_CENTS,
      currency: CURRENCY,
      recurring: { interval: 'month' },
    })

    // 3. Crear producto y precio para el cobro inicial del trial (€0.50)
    const trialProduct = await stripe.products.create({
      name: 'AstroKey - Acceso Prueba 2 Días',
      description: 'Cobro único por el período de prueba',
    })

    const trialPrice = await stripe.prices.create({
      product: trialProduct.id,
      unit_amount: TRIAL_FEE_CENTS,
      currency: CURRENCY,
    })

    // 4. Crear suscripción con trial + cobro inicial
    const subscription: any = await (stripe.subscriptions.create as any)({
      customer: customer.id,

      // Cobro de €0.50 en la primera factura
      add_invoice_items: [
        { price: trialPrice.id, quantity: 1 },
      ],

      // Suscripción mensual €19.99 (activa tras el trial)
      items: [{ price: monthlyPrice.id }],

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

    const invoice = subscription.latest_invoice as any
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
