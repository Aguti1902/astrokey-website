import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import Stripe from 'stripe'
import { upsertUser, saveChartResult, upsertSubscription, getUserByStripeCustomer } from '@/lib/db'
import {
  sendWelcomeEmail,
  sendResultsEmail,
  sendTrialEndingEmail,
  sendSubscriptionActiveEmail,
  sendPaymentFailedEmail,
  sendCancellationEmail,
} from '@/lib/email-service'
import type { EmailLocale } from '@/lib/email-translations'

function log(icon: string, msg: string, data?: object) {
  console.log(`${icon} [Webhook] ${msg}`, data ? JSON.stringify(data) : '')
}

async function getOrCreateDbUser(customerId: string, email?: string, firstName?: string, lastName?: string) {
  try {
    // Intentar por customerId primero
    let user = await getUserByStripeCustomer(customerId)
    if (user) return user

    // Si no existe y hay email, crear
    if (email) {
      user = await upsertUser({
        email,
        firstName,
        lastName,
        stripeCustomerId: customerId,
      })
      return user
    }
  } catch (e: any) {
    log('⚠️', 'Error obteniendo usuario de BD', { error: e.message })
  }
  return null
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
    return NextResponse.json({ error: 'Firma inválida' }, { status: 400 })
  }

  try {
    switch (event.type) {

      // ── €0.50 pagado → guardar carta en BD + crear suscripción ─────────────
      case 'payment_intent.succeeded': {
        const pi = event.data.object as Stripe.PaymentIntent
        log('✅', 'Pago completado', { id: pi.id, amount: `${(pi.amount/100).toFixed(2)} EUR` })

        if (pi.metadata?.action !== 'create_subscription_after_payment') break
        if (!pi.customer) break

        const customerId = pi.customer as string
        const email = pi.metadata?.email
        const firstName = pi.metadata?.firstName
        const lastName = pi.metadata?.lastName
        const language = pi.metadata?.language || 'es'

        // Actualizar datos del cliente en Stripe
        if (email) {
          await stripe.customers.update(customerId, {
            ...(email && { email }),
            name: [firstName, lastName].filter(Boolean).join(' ') || undefined,
          })
        }

        // Obtener/crear usuario en BD
        const user = await getOrCreateDbUser(customerId, email, firstName, lastName)
        if (user) log('👤', 'Usuario en BD', { id: user.id, email: user.email })

        // ── Enviar email de bienvenida ─────────────────────────────────────
        if (email && user) {
          try {
            // Buscar carta guardada para obtener sunSign
            const { getChartResult } = await import('@/lib/db')
            const chartByPi = await getChartResult(pi.id).catch(() => null)
            const sunSign = (chartByPi?.chart_data as any)?.sunSign || '✨'
            const lang = (pi.metadata?.language || user.language || 'es') as EmailLocale
            const resultsUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://astrokey.io'}/results/${pi.id}`

            await sendWelcomeEmail({ to: email, name: firstName || 'amigo/a', sunSign, resultsUrl, lang })
            await sendResultsEmail({
              to: email,
              name: firstName || '',
              sunSign,
              moonSign: (chartByPi?.chart_data as any)?.moonSign || '-',
              ascendant: (chartByPi?.chart_data as any)?.ascendant || '-',
              element: (chartByPi?.chart_data as any)?.dominantElement || '-',
              resultsUrl,
              lang,
            })
            log('📧', 'Emails de bienvenida enviados', { to: email })
          } catch (emailErr: any) {
            log('⚠️', 'Error enviando email:', { error: emailErr.message })
          }
        }

        // ── Crear suscripción €19.99/mes con trial 2 días ─────────────────
        const paymentMethods = await stripe.paymentMethods.list({ customer: customerId, type: 'card', limit: 1 })
        if (paymentMethods.data.length > 0) {
          const paymentMethodId = paymentMethods.data[0].id
          await stripe.customers.update(customerId, {
            invoice_settings: { default_payment_method: paymentMethodId },
          })

          const product = await stripe.products.create({ name: 'AstroKey Premium', description: 'Acceso completo mensual' })
          const monthlyPrice = await stripe.prices.create({ product: product.id, unit_amount: 1999, currency: 'eur', recurring: { interval: 'month' } })

          const subscription: any = await (stripe.subscriptions.create as any)({
            customer: customerId,
            items: [{ price: monthlyPrice.id }],
            trial_period_days: 2,
            default_payment_method: paymentMethodId,
            metadata: { email: email || '', userId: user?.id || '', paymentIntentId: pi.id },
          })

          log('🎉', 'Suscripción creada', { id: subscription.id, status: subscription.status })

          // Guardar suscripción en BD
          if (user) {
            await upsertSubscription({
              userId: user.id,
              stripeCustomerId: customerId,
              stripeSubscriptionId: subscription.id,
              status: subscription.status,
              trialEnd: subscription.trial_end ? new Date(subscription.trial_end * 1000) : null,
              currentPeriodEnd: subscription.current_period_end ? new Date(subscription.current_period_end * 1000) : null,
            })
          }
        }
        break
      }

      case 'payment_intent.payment_failed': {
        const pi = event.data.object as Stripe.PaymentIntent
        log('❌', 'Pago fallido', { id: pi.id, reason: pi.last_payment_error?.message })
        break
      }

      // ── Suscripción creada ─────────────────────────────────────────────────
      case 'customer.subscription.created': {
        const sub = event.data.object as Stripe.Subscription
        log('🆕', 'Suscripción creada', { id: sub.id, status: sub.status })

        const user = await getOrCreateDbUser(sub.customer as string)
        if (user) {
          await upsertSubscription({
            userId: user.id,
            stripeCustomerId: sub.customer as string,
            stripeSubscriptionId: sub.id,
            status: sub.status,
            trialEnd: sub.trial_end ? new Date(sub.trial_end * 1000) : null,
            currentPeriodEnd: (sub as any).current_period_end ? new Date((sub as any).current_period_end * 1000) : null,
          })
        }
        break
      }

      // ── Trial termina en 3 días ────────────────────────────────────────────
      case 'customer.subscription.trial_will_end': {
        const sub = event.data.object as Stripe.Subscription
        const trialEnd = sub.trial_end ? new Date(sub.trial_end * 1000).toLocaleDateString('es-ES') : 'pronto'
        log('⚠️', `Trial termina el ${trialEnd}`, { id: sub.id })
        try {
          const user = await getOrCreateDbUser(sub.customer as string)
          if (user?.email) {
            const lang = (user.language || 'es') as EmailLocale
            await sendTrialEndingEmail({ to: user.email, name: user.first_name || '', trialEndDate: trialEnd, lang })
            log('📧', 'Email trial ending enviado', { to: user.email })
          }
        } catch (e: any) { log('⚠️', 'Error email trial_will_end:', { error: e.message }) }
        break
      }

      // ── Suscripción actualizada ────────────────────────────────────────────
      case 'customer.subscription.updated': {
        const sub = event.data.object as Stripe.Subscription
        const prev = event.data.previous_attributes as any
        log('🔄', 'Suscripción actualizada', { id: sub.id, status: sub.status, prevStatus: prev?.status })

        const user = await getOrCreateDbUser(sub.customer as string)
        if (user) {
          await upsertSubscription({
            userId: user.id,
            stripeCustomerId: sub.customer as string,
            stripeSubscriptionId: sub.id,
            status: sub.status,
            trialEnd: sub.trial_end ? new Date(sub.trial_end * 1000) : null,
            currentPeriodEnd: (sub as any).current_period_end ? new Date((sub as any).current_period_end * 1000) : null,
            cancelAtPeriodEnd: sub.cancel_at_period_end,
          })
        }

        if (prev?.status === 'trialing' && sub.status === 'active') {
          log('🎯', 'Trial terminado → activo', { customer: sub.customer })
          try {
            const user = await getOrCreateDbUser(sub.customer as string)
            if (user?.email) {
              const lang = (user.language || 'es') as EmailLocale
              await sendSubscriptionActiveEmail({ to: user.email, name: user.first_name || '', lang })
              log('📧', 'Email subscriptionActive enviado', { to: user.email })
            }
          } catch (e: any) { log('⚠️', 'Error email subscriptionActive:', { error: e.message }) }
        }
        break
      }

      // ── Suscripción cancelada ──────────────────────────────────────────────
      case 'customer.subscription.deleted': {
        const sub = event.data.object as Stripe.Subscription
        log('🗑️', 'Suscripción cancelada', { id: sub.id })

        const user = await getOrCreateDbUser(sub.customer as string)
        if (user) {
          await upsertSubscription({
            userId: user.id,
            stripeCustomerId: sub.customer as string,
            stripeSubscriptionId: sub.id,
            status: 'canceled',
          })
        }
        // Enviar email de cancelación
        try {
          if (user?.email) {
            const lang = (user.language || 'es') as EmailLocale
            const accessUntil = (sub as any).current_period_end
              ? new Date((sub as any).current_period_end * 1000).toLocaleDateString('es-ES')
              : '-'
            await sendCancellationEmail({ to: user.email, name: user.first_name || '', accessUntilDate: accessUntil, lang })
            log('📧', 'Email cancelación enviado', { to: user.email })
          }
        } catch (e: any) { log('⚠️', 'Error email cancellation:', { error: e.message }) }
        break
      }

      // ── Cobro mensual €19.99 ───────────────────────────────────────────────
      case 'invoice.payment_succeeded': {
        const inv = event.data.object as Stripe.Invoice
        log('💳', 'Factura pagada', {
          id: inv.id,
          amount: `${((inv.amount_paid ?? 0)/100).toFixed(2)} EUR`,
          reason: inv.billing_reason,
        })
        // TODO: extender acceso, enviar recibo
        break
      }

      case 'invoice.payment_failed': {
        const inv = event.data.object as Stripe.Invoice
        log('💔', 'Factura no pagada', { id: inv.id, attempt: inv.attempt_count })
        try {
          const user = await getOrCreateDbUser(inv.customer as string)
          if (user?.email) {
            const lang = (user.language || 'es') as EmailLocale
            await sendPaymentFailedEmail({ to: user.email, name: user.first_name || '', lang })
            log('📧', 'Email paymentFailed enviado', { to: user.email })
          }
        } catch (e: any) { log('⚠️', 'Error email paymentFailed:', { error: e.message }) }
        break
      }

      case 'invoice.upcoming': {
        const inv = event.data.object as Stripe.Invoice
        log('📅', 'Próxima factura', { amount: `${((inv.amount_due ?? 0)/100).toFixed(2)} EUR` })
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
