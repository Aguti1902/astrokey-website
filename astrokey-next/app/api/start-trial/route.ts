import { NextRequest, NextResponse } from 'next/server'
import { stripe, MONTHLY_FEE_CENTS, TRIAL_DAYS, CURRENCY } from '@/lib/stripe'

/**
 * Tras confirmar el SetupIntent (tarjeta guardada),
 * crea la suscripción €19,99/mes con trial de 2 días.
 * Sin cobro inicial — el trial es GRATIS.
 */
export async function POST(req: NextRequest) {
  try {
    const { setupIntentId, customerId } = await req.json()

    if (!setupIntentId || !customerId) {
      return NextResponse.json({ error: 'Faltan parámetros' }, { status: 400 })
    }

    // 1. Obtener el SetupIntent para conseguir el payment method guardado
    const setupIntent = await stripe.setupIntents.retrieve(setupIntentId)
    const paymentMethodId = setupIntent.payment_method as string

    if (!paymentMethodId) {
      return NextResponse.json(
        { error: 'No se encontró método de pago' },
        { status: 400 }
      )
    }

    // 2. Establecer como método de pago por defecto del cliente
    await stripe.customers.update(customerId, {
      invoice_settings: { default_payment_method: paymentMethodId },
    })

    // 3. Crear producto y precio €19,99/mes
    const product = await stripe.products.create({
      name: 'AstroKey Premium',
      description: 'Acceso completo mensual a AstroKey',
    })

    const monthlyPrice = await stripe.prices.create({
      product: product.id,
      unit_amount: MONTHLY_FEE_CENTS,
      currency: CURRENCY,
      recurring: { interval: 'month' },
    })

    // 4. Crear suscripción con trial gratuito de 2 días
    // Sin add_invoice_items → €0 ahora, €19,99 al día 3
    const subscription: any = await (stripe.subscriptions.create as any)({
      customer: customerId,
      items: [{ price: monthlyPrice.id }],
      trial_period_days: TRIAL_DAYS,
      default_payment_method: paymentMethodId,
      metadata: {
        setupIntentId,
        source: 'AstroKey',
      },
    })

    return NextResponse.json({
      subscriptionId: subscription.id,
      status: subscription.status,
      trialEnd: subscription.trial_end,
    })
  } catch (error: any) {
    console.error('[start-trial]', error.message)
    return NextResponse.json(
      { error: error.message || 'Error al crear la suscripción' },
      { status: 500 }
    )
  }
}
