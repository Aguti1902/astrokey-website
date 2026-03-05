import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET() {
  const results: Record<string, any> = {
    timestamp: new Date().toISOString(),
    env: {
      supabase_url: process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅ configurado' : '❌ FALTA',
      supabase_anon: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✅ configurado' : '❌ FALTA',
      supabase_service: process.env.SUPABASE_SERVICE_ROLE_KEY ? '✅ configurado' : '❌ FALTA',
      stripe_secret: process.env.STRIPE_SECRET_KEY ? '✅ configurado' : '❌ FALTA',
      stripe_public: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ? '✅ configurado' : '❌ FALTA',
      stripe_webhook: process.env.STRIPE_WEBHOOK_SECRET ? '✅ configurado' : '❌ FALTA',
    },
    supabase: '⏳ verificando...',
  }

  // Mostrar la URL que se está usando (sin la key)
  const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
  results.supabase_url_value = rawUrl || '(vacío)'
  results.url_valid = rawUrl.includes('supabase.co') ? '✅ formato correcto' : '❌ formato incorrecto - debe ser https://xxx.supabase.co'

  // Test ping directo a la URL
  try {
    const pingRes = await fetch(`${rawUrl}/rest/v1/`, {
      headers: { apikey: process.env.SUPABASE_SERVICE_ROLE_KEY || '' },
      signal: AbortSignal.timeout(5000),
    })
    results.supabase_ping = `✅ HTTP ${pingRes.status}`
  } catch (pingErr: any) {
    results.supabase_ping = `❌ Ping falló: ${pingErr.message}`
  }

  // Test conexión Supabase client
  try {
    const { data, error } = await supabaseAdmin
      .from('users')
      .select('count')
      .limit(1)

    if (error) {
      results.supabase = `❌ Error: ${error.message} (code: ${error.code})`
    } else {
      results.supabase = '✅ conectado'
    }
  } catch (e: any) {
    results.supabase = `❌ Excepción: ${e.message}`
  }

  // Test Resend
  const resendKey = process.env.RESEND_API_KEY
  if (!resendKey || resendKey.includes('XXXX')) {
    results.resend = '❌ RESEND_API_KEY no configurada'
  } else {
    results.resend = '✅ configurada'
  }

  results.site_url = process.env.NEXT_PUBLIC_SITE_URL || '⚠️ no configurada (usando https://astrokey.io)'

  return NextResponse.json(results, { status: 200 })
}
