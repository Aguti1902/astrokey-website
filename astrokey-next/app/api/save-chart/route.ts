import { NextRequest, NextResponse } from 'next/server'
import { upsertUser, saveChartResult } from '@/lib/db'
import {
  sendWelcomeEmail,
  sendResultsEmail,
} from '@/lib/email-service'
import type { EmailLocale } from '@/lib/email-translations'

/**
 * Guarda el usuario y la carta en Supabase, y envía los emails de bienvenida.
 * Se llama desde el cliente justo después de confirmar el pago con Stripe.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email, firstName, lastName, language, paymentIntentId, testAnswers, chartData } = body

    console.log('[save-chart] Procesando para:', { email, paymentIntentId: paymentIntentId?.slice(0, 20) })

    if (!paymentIntentId) {
      return NextResponse.json({ error: 'paymentIntentId requerido' }, { status: 400 })
    }

    // 1. Verificar Supabase configurado
    const supabaseOk = process.env.NEXT_PUBLIC_SUPABASE_URL?.includes('supabase.co')
    let userId: string | null = null

    if (supabaseOk && email) {
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
      }
    }

    // 2. Guardar carta astral
    if (supabaseOk && userId && testAnswers && chartData) {
      try {
        await saveChartResult({ userId, paymentIntentId, testAnswers, chartData })
        console.log('[save-chart] Carta guardada')
      } catch (e: any) {
        if (e.code !== '23505') {
          console.error('[save-chart] Error al guardar carta:', e.message)
        }
      }
    }

    // 3. Enviar emails (siempre que haya email y clave Resend)
    const resendKey = process.env.RESEND_API_KEY
    if (email && resendKey && !resendKey.includes('XXXX')) {
      const lang = (language || 'es') as EmailLocale
      const sunSign = chartData?.sunSign || '✨'
      const resultsUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://astrokey.io'}/${lang}/results/${paymentIntentId}`
      const name = firstName || email.split('@')[0]

      try {
        await sendWelcomeEmail({ to: email, name, sunSign, resultsUrl, lang })
        console.log('[save-chart] ✅ Email bienvenida enviado a:', email)
      } catch (e: any) {
        console.error('[save-chart] ❌ Error email bienvenida:', e.message)
      }

      try {
        await sendResultsEmail({
          to: email,
          name,
          sunSign,
          moonSign: chartData?.moonSign || '-',
          ascendant: chartData?.ascendant || '-',
          element: chartData?.dominantElement || '-',
          resultsUrl,
          lang,
        })
        console.log('[save-chart] ✅ Email resultados enviado a:', email)
      } catch (e: any) {
        console.error('[save-chart] ❌ Error email resultados:', e.message)
      }
    } else {
      if (!resendKey || resendKey.includes('XXXX')) {
        console.warn('[save-chart] RESEND_API_KEY no configurada — emails no enviados')
      }
      if (!email) {
        console.warn('[save-chart] No hay email — emails no enviados')
      }
    }

    return NextResponse.json({ success: true, userId })
  } catch (error: any) {
    console.error('[save-chart] Error general:', error.message)
    return NextResponse.json({ success: false, error: error.message })
  }
}
