import { NextRequest, NextResponse } from 'next/server'
import { upsertUser, saveChartResult } from '@/lib/db'

/**
 * Guarda el resultado de la carta astral en la BD tras el pago exitoso.
 * Se llama desde el cliente después de confirmar el pago con Stripe.
 */
export async function POST(req: NextRequest) {
  try {
    const { email, firstName, lastName, language, paymentIntentId, testAnswers, chartData } = await req.json()

    if (!paymentIntentId) {
      return NextResponse.json({ error: 'paymentIntentId requerido' }, { status: 400 })
    }

    // 1. Upsert usuario
    let userId: string | null = null
    if (email) {
      try {
        const user = await upsertUser({ email, firstName, lastName, language })
        userId = user.id
      } catch (e: any) {
        console.error('[save-chart] upsertUser failed:', e.message)
      }
    }

    // 2. Guardar resultado
    if (userId && testAnswers && chartData) {
      await saveChartResult({
        userId,
        paymentIntentId,
        testAnswers,
        chartData,
      })
    }

    return NextResponse.json({ success: true, userId })
  } catch (error: any) {
    console.error('[save-chart]', error.message)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
