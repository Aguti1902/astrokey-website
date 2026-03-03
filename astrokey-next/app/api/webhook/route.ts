import { NextRequest, NextResponse } from 'next/server'
import { stripe, MONTHLY_FEE_CENTS, TRIAL_DAYS, CURRENCY } from '@/lib/stripe'
import Stripe from 'stripe'

function log(icon: string, msg: string, data?: object) {
  console.log(`${icon} [Webhook] ${msg}`, data ? JSON.stringify(data) : '')
}

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')

  if (!sig || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Falta firma o webhook secret' }, { status: 400 })
  }

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET)
  } catch (err: any) {
    console.error('[Webhook] Firma inválida:', err.message)
    return NextResponse.json({ error: 'Firma inválida' }, { status: 400 })
  }

  try {
    switch (event.type) {

      // ── €0.50 cobrado → crear suscripción €19.99/mes con trial 2 días ───────
      case 'payment_intent.succeeded': {
        const pi = event.data.object as Stripe.PaymentIntent

        log('✅', 'Pago inicial completado', {
          id: pi.id,
          amount: `${(pi.amount / 100).toFixed(2)} EUR`,
          customer: pi.customer,
        })

        // Solo crear suscripción si el metadata lo indica
        if (pi.metadata?.action !== 'create_subscription_after_payment') break
        if (!pi.customer) break

        const customerId = pi.customer as string

        // Obtener el método de pago guardado del cliente
        const paymentMethods = await stripe.paymentMethods.list({
          customer: customerId,
          type: 'card',
          limit: 1,
        })

        if (paymentMethods.data.length === 0) {
          log('⚠️', 'No se encontró método de pago guardado', { customerId })
          break
        }

        const paymentMethodId = paymentMethods.data[0].id

        // Establecer como método de pago por defecto
        await stripe.customers.update(customerId, {
          invoice_settings: { default_payment_method: paymentMethodId },
        })

        // Crear producto y precio mensual
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

        // Crear suscripción con trial de 2 días
        const subscription: any = await (stripe.subscriptions.create as any)({
          customer: customerId,
          items: [{ price: monthlyPrice.id }],
          trial_period_days: TRIAL_DAYS,
          default_payment_method: paymentMethodId,
          metadata: {
            email: pi.metadata?.email || '',
            firstName: pi.metadata?.firstName || '',
            lastName: pi.metadata?.lastName || '',
            trialFeePaymentIntent: pi.id,
          },
        })

        log('🎉', 'Suscripción creada tras pago inicial', {
          subscriptionId: subscription.id,
          status: subscription.status,
          trialEnd: subscription.trial_end
            ? new Date(subscription.trial_end * 1000).toISOString()
            : null,
        })

        // TODO: guardar subscriptionId en tu BD asociado al usuario (pi.metadata.email)
        break
      }

      // ── Pago fallido ───────────────────────────────────────────────────────
      case 'payment_intent.payment_failed': {
        const pi = event.data.object as Stripe.PaymentIntent
        log('❌', 'Pago fallido', {
          id: pi.id,
          reason: pi.last_payment_error?.message,
          customer: pi.customer,
        })
        // TODO: enviar email "Tu pago falló, actualiza tu método de pago"
        break
      }

      // ── Suscripción creada ─────────────────────────────────────────────────
      case 'customer.subscription.created': {
        const sub = event.data.object as Stripe.Subscription
        log('🆕', 'Suscripción creada', {
          id: sub.id,
          status: sub.status,
          trialEnd: sub.trial_end
            ? new Date(sub.trial_end * 1000).toISOString()
            : null,
        })
        break
      }

      // ── Aviso 3 días antes de que termine el trial ─────────────────────────
      case 'customer.subscription.trial_will_end': {
        const sub = event.data.object as Stripe.Subscription
        const trialEnd = sub.trial_end
          ? new Date(sub.trial_end * 1000).toLocaleDateString('es-ES')
          : 'pronto'
        log('⚠️', `Trial termina el ${trialEnd}`, { id: sub.id })
        // TODO: enviar email "Tu prueba termina el {trialEnd}, se cobrará €19.99"
        break
      }

      // ── Suscripción actualizada (trial → activo, impago, etc.) ─────────────
      case 'customer.subscription.updated': {
        const sub = event.data.object as Stripe.Subscription
        const prev = event.data.previous_attributes as any

        if (prev?.status === 'trialing' && sub.status === 'active') {
          log('🎯', 'Trial terminado → suscripción activa', { customer: sub.customer })
          // TODO: actualizar BD, enviar email "Tu suscripción premium está activa"
        }

        if (sub.status === 'past_due' || sub.status === 'unpaid') {
          log('🚫', 'Suscripción con pago pendiente', { status: sub.status })
          // TODO: restringir acceso
        }
        break
      }

      // ── Suscripción cancelada ──────────────────────────────────────────────
      case 'customer.subscription.deleted': {
        const sub = event.data.object as Stripe.Subscription
        log('🗑️', 'Suscripción cancelada', { id: sub.id, customer: sub.customer })
        // TODO: revocar acceso
        break
      }

      // ── Cobro mensual €19.99 exitoso ───────────────────────────────────────
      case 'invoice.payment_succeeded': {
        const inv = event.data.object as Stripe.Invoice
        const amount = `${((inv.amount_paid ?? 0) / 100).toFixed(2)} EUR`
        log('💳', 'Factura pagada', {
          id: inv.id,
          amount,
          reason: inv.billing_reason,
        })
        if (inv.billing_reason === 'subscription_cycle') {
          log('🔁', 'Renovación mensual pagada', { customer: inv.customer, amount })
          // TODO: extender acceso en BD
        }
        break
      }

      // ── Cobro mensual fallido ──────────────────────────────────────────────
      case 'invoice.payment_failed': {
        const inv = event.data.object as Stripe.Invoice
        log('💔', 'Factura no pagada', {
          id: inv.id,
          customer: inv.customer,
          attempt: inv.attempt_count,
        })
        // TODO: email urgente al usuario
        break
      }

      // ── Próxima factura ────────────────────────────────────────────────────
      case 'invoice.upcoming': {
        const inv = event.data.object as Stripe.Invoice
        log('📅', 'Próxima factura', {
          customer: inv.customer,
          amount: `${((inv.amount_due ?? 0) / 100).toFixed(2)} EUR`,
        })
        // TODO: email informativo
        break
      }

      default:
        log('ℹ️', `Evento: ${event.type}`)
    }
  } catch (err: any) {
    console.error(`[Webhook] Error en ${event.type}:`, err.message)
  }

  return NextResponse.json({ received: true })
}
