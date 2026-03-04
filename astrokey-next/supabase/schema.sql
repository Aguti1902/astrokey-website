-- ═══════════════════════════════════════════════════════════
-- AstroKey - Schema de Base de Datos
-- Ejecuta este SQL en Supabase Dashboard > SQL Editor
-- ═══════════════════════════════════════════════════════════

-- ── Tabla: users ────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  first_name TEXT,
  last_name TEXT,
  language TEXT DEFAULT 'es',
  stripe_customer_id TEXT UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ── Tabla: chart_results ────────────────────────────────────
-- Almacena el resultado de cada carta astral generada
CREATE TABLE IF NOT EXISTS chart_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  payment_intent_id TEXT UNIQUE NOT NULL,  -- ID de Stripe, también es la URL única
  test_answers JSONB NOT NULL,             -- Todas las respuestas del test
  chart_data JSONB NOT NULL,               -- sunSign, moonSign, ascendant, etc.
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ── Tabla: subscriptions ────────────────────────────────────
CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  stripe_customer_id TEXT NOT NULL,
  stripe_subscription_id TEXT UNIQUE,
  status TEXT NOT NULL DEFAULT 'incomplete',
  -- Estados: trialing, active, canceled, past_due, unpaid, incomplete
  trial_end TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  cancel_at_period_end BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ── Índices ──────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_stripe_customer ON users(stripe_customer_id);
CREATE INDEX IF NOT EXISTS idx_chart_results_user ON chart_results(user_id);
CREATE INDEX IF NOT EXISTS idx_chart_results_payment ON chart_results(payment_intent_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_user ON subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_stripe ON subscriptions(stripe_subscription_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_customer ON subscriptions(stripe_customer_id);

-- ── Trigger: updated_at automático ───────────────────────────
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER subscriptions_updated_at
  BEFORE UPDATE ON subscriptions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ── Row Level Security (RLS) ──────────────────────────────────
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE chart_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- Políticas: solo el service_role puede leer/escribir (desde el servidor)
-- Las llamadas del cliente nunca llegan directamente a estas tablas

CREATE POLICY "Service role full access - users"
  ON users FOR ALL
  USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access - chart_results"
  ON chart_results FOR ALL
  USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access - subscriptions"
  ON subscriptions FOR ALL
  USING (auth.role() = 'service_role');
