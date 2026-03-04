import { NextRequest, NextResponse } from 'next/server'
import { upsertUser, saveChartResult } from '@/lib/db'

/**
 * Guarda el usuario y el resultado de la carta en Supabase.
 * Se llama desde el cliente tras confirmación exitosa de Stripe.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email, firstName, lastName, language, paymentIntentId, testAnswers, chartData } = body

    console.log('[save-chart] Guardando para:', { email, paymentIntentId: paymentIntentId?.slice(0, 20) })

    if (!paymentIntentId) {
      return NextResponse.json({ error: 'paymentIntentId requerido' }, { status: 400 })
    }

    // 1. Verificar que las variables de Supabase están configuradas
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL?.includes('supabase.co')) {
      console.warn('[save-chart] Supabase no configurado - saltando guardado en BD')
      return NextResponse.json({ success: true, warning: 'Supabase no configurado' })
    }

    // 2. Crear/actualizar usuario
    let userId: string | null = null
    if (email) {
      try {
        const user = await upsertUser({
          email: email.toLowerCase().trim(),
          firstName: firstName || null,
          lastName: lastName || null,
          language: language || 'es',
        })
        userId = user.id
        console.log('[save-chart] Usuario guardado:', userId)
      } catch (e: any) {
        console.error('[save-chart] Error al guardar usuario:', e.message)
        // No bloqueamos el flujo
      }
    }

    // 3. Guardar resultado de carta
    if (userId && testAnswers && chartData) {
      try {
        await saveChartResult({
          userId,
          paymentIntentId,
          testAnswers,
          chartData,
        })
        console.log('[save-chart] Carta guardada para paymentIntentId:', paymentIntentId.slice(0, 20))
      } catch (e: any) {
        // Si el conflicto es por duplicado (ya existe), no es error grave
        if (e.code === '23505') {
          console.log('[save-chart] Carta ya existía, ignorando duplicate')
        } else {
          console.error('[save-chart] Error al guardar carta:', e.message)
        }
      }
    }

    return NextResponse.json({ success: true, userId })
  } catch (error: any) {
    console.error('[save-chart] Error general:', error.message)
    // Retornamos 200 para no bloquear el flujo del usuario
    return NextResponse.json({ success: false, error: error.message })
  }
}
