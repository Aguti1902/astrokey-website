import { Resend } from 'resend'
import { emailT, type EmailLocale } from './email-translations'

const resend = new Resend(process.env.RESEND_API_KEY)
const FROM_EMAIL = 'AstroKey <hola@astrokey.io>'
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://astrokey.io'

function replace(str: string, vars: Record<string, string>) {
  return Object.entries(vars).reduce((s, [k, v]) => s.replaceAll(`{{${k}}}`, v), str)
}

// ─── Template HTML base ──────────────────────────────────────────────────────
function baseTemplate(content: string, lang: EmailLocale) {
  const t = emailT[lang].common
  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AstroKey</title>
</head>
<body style="margin:0;padding:0;background:#050816;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#050816;padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <!-- HEADER -->
          <tr>
            <td style="background:linear-gradient(135deg,#0f172a,#1e1b4b);border-radius:16px 16px 0 0;padding:32px;text-align:center;border-bottom:1px solid rgba(99,102,241,0.3);">
              <div style="display:inline-flex;align-items:center;gap:10px;">
                <div style="width:36px;height:36px;background:linear-gradient(135deg,#6366f1,#8b5cf6);border-radius:10px;display:inline-block;line-height:36px;text-align:center;font-size:18px;">✦</div>
                <span style="font-size:22px;font-weight:800;color:#ffffff;letter-spacing:-0.5px;">AstroKey</span>
              </div>
            </td>
          </tr>

          <!-- CONTENT -->
          <tr>
            <td style="background:#0f172a;border-left:1px solid rgba(99,102,241,0.15);border-right:1px solid rgba(99,102,241,0.15);padding:40px 32px;">
              ${content}
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="background:#020617;border-radius:0 0 16px 16px;padding:24px 32px;border:1px solid rgba(99,102,241,0.1);border-top:none;text-align:center;">
              <p style="margin:0 0 12px;font-size:12px;color:rgba(255,255,255,0.3);">${t.regards}</p>
              <div style="margin-bottom:12px;">
                <a href="${SITE_URL}/legal/privacidad" style="color:rgba(99,102,241,0.7);font-size:11px;text-decoration:none;margin:0 8px;">${t.privacy}</a>
                <a href="${SITE_URL}/legal/terminos" style="color:rgba(99,102,241,0.7);font-size:11px;text-decoration:none;margin:0 8px;">${t.terms}</a>
                <a href="${SITE_URL}/legal/reembolsos" style="color:rgba(99,102,241,0.7);font-size:11px;text-decoration:none;margin:0 8px;">${t.unsubscribe}</a>
              </div>
              <p style="margin:0;font-size:11px;color:rgba(255,255,255,0.2);">© ${new Date().getFullYear()} AstroKey. ${t.allRights}</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

// ─── Botón ────────────────────────────────────────────────────────────────────
function btn(url: string, text: string, color = '#6366f1') {
  return `<div style="text-align:center;margin:24px 0;">
    <a href="${url}" style="display:inline-block;background:linear-gradient(135deg,${color},#8b5cf6);color:#fff;font-size:15px;font-weight:700;text-decoration:none;padding:14px 32px;border-radius:12px;letter-spacing:0.3px;">${text}</a>
  </div>`
}

// ─── Divider ──────────────────────────────────────────────────────────────────
const divider = `<hr style="border:none;border-top:1px solid rgba(99,102,241,0.15);margin:28px 0;">`

// ─── Card de dato ─────────────────────────────────────────────────────────────
function dataCard(label: string, value: string, emoji: string) {
  return `<td style="padding:8px;width:50%;">
    <div style="background:rgba(99,102,241,0.08);border:1px solid rgba(99,102,241,0.2);border-radius:12px;padding:16px;text-align:center;">
      <div style="font-size:24px;margin-bottom:6px;">${emoji}</div>
      <div style="font-size:10px;color:rgba(255,255,255,0.35);text-transform:uppercase;letter-spacing:1px;margin-bottom:4px;">${label}</div>
      <div style="font-size:16px;font-weight:700;color:#fff;">${value}</div>
    </div>
  </td>`
}

// ═══════════════════════════════════════════════════════════════════════════════
// EMAILS
// ═══════════════════════════════════════════════════════════════════════════════

// ── 1. Bienvenida ─────────────────────────────────────────────────────────────
export async function sendWelcomeEmail(params: {
  to: string
  name: string
  sunSign: string
  resultsUrl: string
  lang?: EmailLocale
  trialEndDate?: string
}) {
  const lang = params.lang || 'es'
  const t = emailT[lang].welcome

  const content = `
    <h1 style="margin:0 0 8px;font-size:28px;font-weight:800;color:#fff;text-align:center;">${t.title}</h1>
    <p style="margin:0 0 28px;font-size:15px;color:rgba(255,255,255,0.55);text-align:center;">${t.subtitle}</p>

    <div style="background:linear-gradient(135deg,rgba(99,102,241,0.2),rgba(139,92,246,0.1));border:1px solid rgba(99,102,241,0.3);border-radius:16px;padding:24px;text-align:center;margin-bottom:24px;">
      <div style="font-size:32px;margin-bottom:8px;">✨</div>
      <div style="font-size:12px;color:rgba(255,255,255,0.4);text-transform:uppercase;letter-spacing:1px;margin-bottom:6px;">${t.sunSign}</div>
      <div style="font-size:26px;font-weight:800;background:linear-gradient(135deg,#6366f1,#a78bfa);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">${params.sunSign}</div>
    </div>

    ${btn(params.resultsUrl, t.accessBtn)}
    ${divider}

    <div style="background:rgba(245,158,11,0.08);border:1px solid rgba(245,158,11,0.2);border-radius:12px;padding:20px;">
      <p style="margin:0 0 8px;font-size:14px;font-weight:700;color:#fbbf24;">⏱ ${t.trialTitle}</p>
      <p style="margin:0;font-size:13px;color:rgba(255,255,255,0.5);" 
         dangerouslySetInnerHTML="false">${t.trialDesc}</p>
    </div>

    <p style="margin:20px 0 0;font-size:11px;color:rgba(255,255,255,0.25);text-align:center;">${t.footer}</p>
  `

  return resend.emails.send({
    from: FROM_EMAIL,
    to: params.to,
    subject: t.subject,
    html: baseTemplate(content, lang),
  })
}

// ── 2. Resumen de resultados ──────────────────────────────────────────────────
export async function sendResultsEmail(params: {
  to: string
  name: string
  sunSign: string
  moonSign: string
  ascendant: string
  element: string
  resultsUrl: string
  lang?: EmailLocale
}) {
  const lang = params.lang || 'es'
  const t = emailT[lang].results

  const content = `
    <h1 style="margin:0 0 8px;font-size:26px;font-weight:800;color:#fff;">${t.title}</h1>
    <p style="margin:0 0 28px;font-size:14px;color:rgba(255,255,255,0.5);">${t.subtitle}</p>

    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:8px;">
      <tr>
        ${dataCard(t.sunSign, params.sunSign, '☀️')}
        ${dataCard(t.moonSign, params.moonSign, '🌙')}
      </tr>
    </table>
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
      <tr>
        ${dataCard(t.ascendant, params.ascendant, '⬆️')}
        ${dataCard(t.element, params.element, '🔥')}
      </tr>
    </table>

    ${btn(params.resultsUrl, t.viewFull)}
    ${divider}

    <div style="background:rgba(99,102,241,0.08);border-radius:12px;padding:16px;">
      <p style="margin:0;font-size:13px;color:rgba(255,255,255,0.5);">${t.tip}</p>
    </div>
  `

  return resend.emails.send({
    from: FROM_EMAIL,
    to: params.to,
    subject: replace(t.subject, { sunSign: params.sunSign }),
    html: baseTemplate(content, lang),
  })
}

// ── 3. Trial termina pronto ───────────────────────────────────────────────────
export async function sendTrialEndingEmail(params: {
  to: string
  name: string
  trialEndDate: string
  lang?: EmailLocale
}) {
  const lang = params.lang || 'es'
  const t = emailT[lang].trialEnding
  const d = params.trialEndDate

  const content = `
    <div style="text-align:center;margin-bottom:24px;">
      <div style="font-size:40px;margin-bottom:12px;">⚠️</div>
      <h1 style="margin:0 0 8px;font-size:26px;font-weight:800;color:#fff;">${t.title}</h1>
      <p style="margin:0;font-size:14px;color:rgba(255,255,255,0.5);">${replace(t.subtitle, { date: d })}</p>
    </div>
    ${divider}

    <p style="margin:0 0 12px;font-size:14px;font-weight:600;color:rgba(255,255,255,0.7);">${t.continueTitle}</p>
    <ul style="margin:0 0 24px;padding-left:20px;">
      ${t.features.map(f => `<li style="font-size:13px;color:rgba(255,255,255,0.5);margin-bottom:6px;">${f}</li>`).join('')}
    </ul>

    ${btn(`${SITE_URL}/legal/reembolsos`, replace(t.cancelBtn, { date: d }), '#ef4444')}

    <p style="margin:16px 0 0;font-size:11px;color:rgba(255,255,255,0.25);text-align:center;">${replace(t.cancelNote, { date: d })}</p>
  `

  return resend.emails.send({
    from: FROM_EMAIL,
    to: params.to,
    subject: replace(t.subject, { date: d }),
    html: baseTemplate(content, lang),
  })
}

// ── 4. Suscripción activa ─────────────────────────────────────────────────────
export async function sendSubscriptionActiveEmail(params: {
  to: string
  name: string
  lang?: EmailLocale
}) {
  const lang = params.lang || 'es'
  const t = emailT[lang].subscriptionActive

  const content = `
    <div style="text-align:center;margin-bottom:24px;">
      <div style="font-size:48px;margin-bottom:12px;">✅</div>
      <h1 style="margin:0 0 8px;font-size:26px;font-weight:800;color:#fff;">${t.title}</h1>
      <p style="margin:0;font-size:14px;color:rgba(255,255,255,0.5);">${t.subtitle}</p>
    </div>
    ${btn(SITE_URL, t.accessBtn, '#10b981')}
    <p style="margin:16px 0 0;font-size:12px;color:rgba(255,255,255,0.3);text-align:center;">${t.manageNote}</p>
  `

  return resend.emails.send({
    from: FROM_EMAIL,
    to: params.to,
    subject: t.subject,
    html: baseTemplate(content, lang),
  })
}

// ── 5. Pago fallido ───────────────────────────────────────────────────────────
export async function sendPaymentFailedEmail(params: {
  to: string
  name: string
  lang?: EmailLocale
}) {
  const lang = params.lang || 'es'
  const t = emailT[lang].paymentFailed

  const content = `
    <div style="text-align:center;margin-bottom:24px;">
      <div style="font-size:48px;margin-bottom:12px;">❌</div>
      <h1 style="margin:0 0 8px;font-size:26px;font-weight:800;color:#fff;">${t.title}</h1>
      <p style="margin:0;font-size:14px;color:rgba(255,255,255,0.5);">${t.subtitle}</p>
    </div>
    ${btn(`${SITE_URL}/payment`, t.updateBtn, '#ef4444')}
    <p style="margin:16px 0 0;font-size:12px;color:rgba(255,255,255,0.3);text-align:center;">${t.note}</p>
  `

  return resend.emails.send({
    from: FROM_EMAIL,
    to: params.to,
    subject: t.subject,
    html: baseTemplate(content, lang),
  })
}

// ── 6. Cancelación ────────────────────────────────────────────────────────────
export async function sendCancellationEmail(params: {
  to: string
  name: string
  accessUntilDate: string
  lang?: EmailLocale
}) {
  const lang = params.lang || 'es'
  const t = emailT[lang].cancellation
  const d = params.accessUntilDate

  const content = `
    <div style="text-align:center;margin-bottom:24px;">
      <div style="font-size:48px;margin-bottom:12px;">🌙</div>
      <h1 style="margin:0 0 8px;font-size:26px;font-weight:800;color:#fff;">${t.title}</h1>
      <p style="margin:0;font-size:14px;color:rgba(255,255,255,0.5);">${replace(t.subtitle, { date: d })}</p>
    </div>
    ${divider}
    <p style="font-size:13px;color:rgba(255,255,255,0.4);text-align:center;">${t.accessNote}</p>
    ${btn(SITE_URL, t.reactivateBtn, '#6366f1')}
    ${divider}
    <p style="font-size:13px;color:rgba(255,255,255,0.4);text-align:center;font-style:italic;">${t.feedback}</p>
  `

  return resend.emails.send({
    from: FROM_EMAIL,
    to: params.to,
    subject: replace(t.subject, { date: d }),
    html: baseTemplate(content, lang),
  })
}
