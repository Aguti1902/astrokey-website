import Stripe from 'stripe'

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not set')
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2026-02-25.clover',
})

// Precio de la prueba: €0.50
export const TRIAL_PRICE_CENTS = 50 // 50 céntimos = €0.50
export const TRIAL_CURRENCY = 'eur'
