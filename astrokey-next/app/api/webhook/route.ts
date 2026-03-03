import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import Stripe from 'stripe'

// ─── Log helper ───────────────────────────────────────────────────────────────
function log(icon: string, msg: string, data?: object) {
  console.log(`${icon} [Webhook] ${msg}`, data ? JSON.stringify(data, null, 2) : '')
}

// ─── Handler ──────────────────────────────────────────────────────────────────
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

  // ─── Eventos ────────────────────────────────────────────────────────────────
  try {
    switch (event.type) {

      // ── Pago inicial €0.50 completado ──────────────────────────────────────
      case 'payment_intent.succeeded': {
        const pi = event.data.object as Stripe.PaymentIntent
        log('✅', 'Pago completado', {
          id: pi.id,
          amount: `${(pi.amount / 100).toFixed(2)} ${pi.currency.toUpperCase()}`,
          customer: pi.customer,
          email: pi.receipt_email,
        })
        // TODO: marcar usuario como activo en tu BD
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
        // TODO: enviar email al usuario para actualizar método de pago
        break
      }

      // ── Suscripción creada ─────────────────────────────────────────────────
      case 'customer.subscription.created': {
        const sub = event.data.object as Stripe.Subscription
        log('🆕', 'Suscripción creada', {
          id: sub.id,
          customer: sub.customer,
          status: sub.status,
          trialEnd: sub.trial_end ? new Date(sub.trial_end * 1000).toISOString() : null,
        })
        // TODO: crear usuario en BD con status 'trialing'
        break
      }

      // ── Trial termina en 3 días (aviso anticipado) ─────────────────────────
      case 'customer.subscription.trial_will_end': {
        const sub = event.data.object as Stripe.Subscription
        const trialEnd = sub.trial_end
          ? new Date(sub.trial_end * 1000).toLocaleDateString('es-ES')
          : 'pronto'
        log('⚠️', 'Trial termina pronto', {
          id: sub.id,
          customer: sub.customer,
          trialEnd,
        })
        // TODO: enviar email de aviso "Tu prueba termina el {trialEnd}, se cobrará €19.99"
        break
      }

      // ── Suscripción actualizada (ej: trial → activo) ───────────────────────
      case 'customer.subscription.updated': {
        const sub = event.data.object as Stripe.Subscription
        const prev = event.data.previous_attributes as any
        log('🔄', 'Suscripción actualizada', {
          id: sub.id,
          status: sub.status,
          prevStatus: prev?.status,
        })

        // Trial terminó → ahora activo (primer cobro de €19.99)
        if (prev?.status === 'trialing' && sub.status === 'active') {
          log('🎉', 'Trial terminado, suscripción activa', { customer: sub.customer })
          // TODO: actualizar BD, enviar email "Tu suscripción premium está activa"
        }

        // Pago fallido → acceso en pausa
        if (sub.status === 'past_due' || sub.status === 'unpaid') {
          log('🚫', 'Suscripción con pago pendiente', { customer: sub.customer, status: sub.status })
          // TODO: restringir acceso, enviar email de aviso
        }
        break
      }

      // ── Suscripción cancelada ──────────────────────────────────────────────
      case 'customer.subscription.deleted': {
        const sub = event.data.object as Stripe.Subscription
        log('🗑️', 'Suscripción cancelada', {
          id: sub.id,
          customer: sub.customer,
          canceledAt: sub.canceled_at
            ? new Date(sub.canceled_at * 1000).toISOString()
            : null,
        })
        // TODO: revocar acceso en BD, enviar email de confirmación
        break
      }

      // ── Pago de factura exitoso (cobro mensual €19.99) ─────────────────────
      case 'invoice.payment_succeeded': {
        const inv = event.data.object as Stripe.Invoice
        log('💳', 'Factura pagada', {
          id: inv.id,
          amount: `${((inv.amount_paid ?? 0) / 100).toFixed(2)} ${inv.currency?.toUpperCase()}`,
          customer: inv.customer,
          billingReason: inv.billing_reason,
          periodEnd: inv.period_end
            ? new Date(inv.period_end * 1000).toLocaleDateString('es-ES')
            : null,
        })

        if (inv.billing_reason === 'subscription_cycle') {
          log('🔁', 'Renovación mensual pagada', { customer: inv.customer })
          // TODO: extender acceso 1 mes en BD
        }
        break
      }

      // ── Pago de factura fallido ────────────────────────────────────────────
      case 'invoice.payment_failed': {
        const inv = event.data.object as Stripe.Invoice
        log('💔', 'Factura no pagada', {
          id: inv.id,
          customer: inv.customer,
          attemptCount: inv.attempt_count,
          nextAttempt: inv.next_payment_attempt
            ? new Date(inv.next_payment_attempt * 1000).toLocaleDateString('es-ES')
            : null,
        })
        // TODO: enviar email "Tu pago mensual falló, actualiza tu método de pago"
        // Stripe reintenta automáticamente según tu configuración
        break
      }

      // ── Próxima factura (aviso antes de cobrar) ────────────────────────────
      case 'invoice.upcoming': {
        const inv = event.data.object as Stripe.Invoice
        log('📅', 'Próxima factura', {
          customer: inv.customer,
          amount: `${((inv.amount_due ?? 0) / 100).toFixed(2)} ${inv.currency?.toUpperCase()}`,
          dueDate: inv.due_date
            ? new Date(inv.due_date * 1000).toLocaleDateString('es-ES')
            : 'próximamente',
        })
        // TODO: enviar email informativo con el importe de la próxima factura
        break
      }

      // ── Factura creada (antes de cobrar) ───────────────────────────────────
      case 'invoice.created': {
        const inv = event.data.object as Stripe.Invoice
        log('🧾', 'Factura creada', {
          id: inv.id,
          customer: inv.customer,
          amount: `${((inv.amount_due ?? 0) / 100).toFixed(2)} ${inv.currency?.toUpperCase()}`,
        })
        break
      }

      // ── Método de pago eliminado ───────────────────────────────────────────
      case 'customer.updated': {
        const cu = event.data.object as Stripe.Customer
        log('👤', 'Cliente actualizado', { id: cu.id, email: cu.email })
        break
      }

      default:
        log('ℹ️', `Evento no manejado: ${event.type}`)
    }
  } catch (handlerError: any) {
    console.error(`[Webhook] Error en handler ${event.type}:`, handlerError)
    // No retornamos error 500 para que Stripe no reintente
  }

  return NextResponse.json({ received: true })
}
