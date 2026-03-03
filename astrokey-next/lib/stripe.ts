import Stripe from 'stripe'

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY no está configurada')
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2026-02-25.clover',
})

// ─── Precios ──────────────────────────────────────────────────────────────────
export const TRIAL_FEE_CENTS = 50        // €0.50 cobro inicial
export const MONTHLY_FEE_CENTS = 1999    // €19.99/mes después del trial
export const TRIAL_DAYS = 2
export const CURRENCY = 'eur'

// ─── Helpers ──────────────────────────────────────────────────────────────────
export async function getOrCreateCustomer(
  email: string,
  name?: string
): Promise<Stripe.Customer> {
  if (email) {
    const existing = await stripe.customers.list({ email, limit: 1 })
    if (existing.data.length > 0) return existing.data[0]
  }

  return stripe.customers.create({
    email: email || undefined,
    name: name || undefined,
    metadata: { source: 'AstroKey' },
  })
}
