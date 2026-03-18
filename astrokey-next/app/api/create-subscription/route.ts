import { NextRequest, NextResponse } from 'next/server'
import { stripe, getOrCreateCustomer, CURRENCY } from '@/lib/stripe'
import { upsertUser } from '@/lib/db'

/**
 * Modelo €0 trial:
 * 1. Recoge la tarjeta con SetupIntent (sin cobrar nada)
 * 2. /api/start-trial crea la suscripción €19,99/mes con 2 días de trial
 * 3. Al terminar el trial → cobra €19,99 automáticamente
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
        metadata: {
          source: 'AstroKey',
          firstName: firstName || '',
          lastName: lastName || '',
          language: language || 'es',
        },
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
        console.error('[create-subscription] DB upsert failed:', dbError)
      }
    }

    // 3. Crear SetupIntent — guarda la tarjeta SIN cobrar nada
    const setupIntent = await stripe.setupIntents.create({
      customer: customer.id,
      payment_method_types: ['card'],
      usage: 'off_session', // Para cobros futuros automáticos
      metadata: {
        firstName: firstName || '',
        lastName: lastName || '',
        email: email || '',
        language: language || 'es',
        customerId: customer.id,
        action: 'free_trial',
      },
    })

    return NextResponse.json({
      clientSecret: setupIntent.client_secret,
      customerId: customer.id,
      setupIntentId: setupIntent.id,
    })
  } catch (error: any) {
    console.error('[create-subscription]', error.message)
    return NextResponse.json(
      { error: error.message || 'Error al inicializar' },
      { status: 500 }
    )
  }
}
