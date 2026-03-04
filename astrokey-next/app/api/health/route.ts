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

  // Test conexión Supabase
  try {
    const { data, error } = await supabaseAdmin
      .from('users')
      .select('count')
      .limit(1)

    if (error) {
      results.supabase = `❌ Error: ${error.message}`
    } else {
      results.supabase = '✅ conectado'
    }
  } catch (e: any) {
    results.supabase = `❌ Excepción: ${e.message}`
  }

  return NextResponse.json(results, { status: 200 })
}
