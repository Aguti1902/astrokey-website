// eslint-disable-next-line @typescript-eslint/no-explicit-any
import { supabaseAdmin } from './supabase'

// ─── Usuarios ──────────────────────────────────────────────────────────────

export async function upsertUser(data: {
  email: string
  firstName?: string
  lastName?: string
  stripeCustomerId?: string
  language?: string
}) {
  const { data: user, error } = await supabaseAdmin
    .from('users')
    .upsert(
      {
        email: data.email,
        first_name: data.firstName || null,
        last_name: data.lastName || null,
        stripe_customer_id: data.stripeCustomerId || null,
        language: data.language || 'es',
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'email' }
    )
    .select()
    .single()

  if (error) throw error
  return user
}

export async function getUserByEmail(email: string) {
  const { data, error } = await supabaseAdmin
    .from('users')
    .select('*')
    .eq('email', email)
    .single()

  if (error && error.code !== 'PGRST116') throw error
  return data
}

export async function getUserByStripeCustomer(customerId: string) {
  const { data, error } = await supabaseAdmin
    .from('users')
    .select('*')
    .eq('stripe_customer_id', customerId)
    .single()

  if (error && error.code !== 'PGRST116') throw error
  return data
}

// ─── Resultados de carta ───────────────────────────────────────────────────

export async function saveChartResult(data: {
  userId: string
  paymentIntentId: string
  testAnswers: Record<string, unknown>
  chartData: Record<string, unknown>
}) {
  const { data: result, error } = await supabaseAdmin
    .from('chart_results')
    .upsert(
      {
        user_id: data.userId,
        payment_intent_id: data.paymentIntentId,
        test_answers: data.testAnswers,
        chart_data: data.chartData,
      },
      { onConflict: 'payment_intent_id' }
    )
    .select()
    .single()

  if (error) throw error
  return result
}

export async function getChartResult(paymentIntentId: string) {
  const { data, error } = await supabaseAdmin
    .from('chart_results')
    .select('*, users(*)')
    .eq('payment_intent_id', paymentIntentId)
    .single()

  if (error && error.code !== 'PGRST116') throw error
  return data
}

export async function getChartResultsByUser(userId: string) {
  const { data, error } = await supabaseAdmin
    .from('chart_results')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

// ─── Suscripciones ─────────────────────────────────────────────────────────

export async function upsertSubscription(data: {
  userId: string
  stripeCustomerId: string
  stripeSubscriptionId?: string
  status: string
  trialEnd?: Date | null
  currentPeriodEnd?: Date | null
  cancelAtPeriodEnd?: boolean
}) {
  const { data: sub, error } = await supabaseAdmin
    .from('subscriptions')
    .upsert(
      {
        user_id: data.userId,
        stripe_customer_id: data.stripeCustomerId,
        stripe_subscription_id: data.stripeSubscriptionId || null,
        status: data.status,
        trial_end: data.trialEnd?.toISOString() || null,
        current_period_end: data.currentPeriodEnd?.toISOString() || null,
        cancel_at_period_end: data.cancelAtPeriodEnd ?? false,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'stripe_subscription_id' }
    )
    .select()
    .single()

  if (error) throw error
  return sub
}

export async function getActiveSubscription(userId: string) {
  const { data, error } = await supabaseAdmin
    .from('subscriptions')
    .select('*')
    .eq('user_id', userId)
    .in('status', ['trialing', 'active'])
    .order('created_at', { ascending: false })
    .limit(1)
    .single()

  if (error && error.code !== 'PGRST116') throw error
  return data
}
