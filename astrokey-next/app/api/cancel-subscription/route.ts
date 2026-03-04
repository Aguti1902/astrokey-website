import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'

export async function POST(req: NextRequest) {
  try {
    const { email, name } = await req.json()

    if (!email) {
      return NextResponse.json({ error: 'El email es requerido' }, { status: 400 })
    }

    // Buscar cliente por email
    const customers = await stripe.customers.list({ email: email.trim(), limit: 5 })

    if (customers.data.length === 0) {
      return NextResponse.json({ error: 'not_found' }, { status: 404 })
    }

    // Buscar suscripciones activas entre todos los clientes con ese email
    let cancelledCount = 0

    for (const customer of customers.data) {
      const subscriptions = await stripe.subscriptions.list({
        customer: customer.id,
        status: 'active',
        limit: 10,
      })

      const trialSubscriptions = await stripe.subscriptions.list({
        customer: customer.id,
        status: 'trialing',
        limit: 10,
      })

      const allSubs = [...subscriptions.data, ...trialSubscriptions.data]

      for (const sub of allSubs) {
        // Cancelar al final del período actual
        await stripe.subscriptions.update(sub.id, {
          cancel_at_period_end: true,
        })
        cancelledCount++
      }
    }

    if (cancelledCount === 0) {
      return NextResponse.json({ error: 'not_found' }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      cancelled: cancelledCount,
    })
  } catch (error: any) {
    console.error('[cancel-subscription]', error.message)
    return NextResponse.json(
      { error: 'server_error' },
      { status: 500 }
    )
  }
}
