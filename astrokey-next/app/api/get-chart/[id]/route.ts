import { NextRequest, NextResponse } from 'next/server'
import { getChartResult } from '@/lib/db'

/**
 * Obtiene la carta astral por paymentIntentId (que es la URL única del resultado)
 */
export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const result = await getChartResult(params.id)

    if (!result) {
      return NextResponse.json({ error: 'Carta no encontrada' }, { status: 404 })
    }

    return NextResponse.json({
      testAnswers: result.test_answers,
      chartData: result.chart_data,
      createdAt: result.created_at,
    })
  } catch (error: any) {
    console.error('[get-chart]', error.message)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
