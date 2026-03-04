'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Cookie, X, ChevronDown, ShieldCheck } from 'lucide-react'
import { useAppStore } from '@/lib/store'

// ─── Traducciones del banner ──────────────────────────────────────────────────
const cookieT: Record<string, {
  title: string; desc: string; necessary: string; necessaryDesc: string
  analytics: string; analyticsDesc: string; marketing: string; marketingDesc: string
  acceptAll: string; rejectAll: string; customize: string; save: string
  privacyLink: string; moreInfo: string
}> = {
  es: {
    title: 'Tu privacidad importa',
    desc: 'Usamos cookies para mejorar tu experiencia, analizar el tráfico y personalizar el contenido. Puedes elegir qué cookies aceptas.',
    necessary: 'Cookies necesarias',
    necessaryDesc: 'Esenciales para el funcionamiento del sitio. No pueden desactivarse.',
    analytics: 'Cookies analíticas',
    analyticsDesc: 'Nos ayudan a entender cómo usas el sitio para mejorarlo.',
    marketing: 'Cookies de marketing',
    marketingDesc: 'Permiten mostrarte publicidad relevante en otros sitios.',
    acceptAll: 'Aceptar todo',
    rejectAll: 'Rechazar todo',
    customize: 'Personalizar',
    save: 'Guardar preferencias',
    privacyLink: 'Política de privacidad',
    moreInfo: 'Más información',
  },
  en: {
    title: 'Your privacy matters',
    desc: 'We use cookies to improve your experience, analyze traffic and personalize content. You can choose which cookies you accept.',
    necessary: 'Necessary cookies',
    necessaryDesc: 'Essential for the site to work. Cannot be disabled.',
    analytics: 'Analytics cookies',
    analyticsDesc: 'Help us understand how you use the site to improve it.',
    marketing: 'Marketing cookies',
    marketingDesc: 'Allow us to show you relevant ads on other sites.',
    acceptAll: 'Accept all',
    rejectAll: 'Reject all',
    customize: 'Customize',
    save: 'Save preferences',
    privacyLink: 'Privacy policy',
    moreInfo: 'More information',
  },
  fr: {
    title: 'Votre vie privée compte',
    desc: 'Nous utilisons des cookies pour améliorer votre expérience, analyser le trafic et personnaliser le contenu.',
    necessary: 'Cookies nécessaires',
    necessaryDesc: 'Essentiels au fonctionnement du site. Ne peuvent pas être désactivés.',
    analytics: 'Cookies analytiques',
    analyticsDesc: 'Nous aident à comprendre comment vous utilisez le site.',
    marketing: 'Cookies marketing',
    marketingDesc: 'Permettent d\'afficher des publicités pertinentes.',
    acceptAll: 'Tout accepter',
    rejectAll: 'Tout refuser',
    customize: 'Personnaliser',
    save: 'Enregistrer les préférences',
    privacyLink: 'Politique de confidentialité',
    moreInfo: 'Plus d\'informations',
  },
  de: {
    title: 'Deine Privatsphäre ist wichtig',
    desc: 'Wir verwenden Cookies, um deine Erfahrung zu verbessern, den Datenverkehr zu analysieren und Inhalte zu personalisieren.',
    necessary: 'Notwendige Cookies',
    necessaryDesc: 'Für die Funktion der Website unerlässlich. Können nicht deaktiviert werden.',
    analytics: 'Analytische Cookies',
    analyticsDesc: 'Helfen uns zu verstehen, wie du die Website nutzt.',
    marketing: 'Marketing-Cookies',
    marketingDesc: 'Ermöglichen das Anzeigen relevanter Werbung auf anderen Seiten.',
    acceptAll: 'Alle akzeptieren',
    rejectAll: 'Alle ablehnen',
    customize: 'Anpassen',
    save: 'Einstellungen speichern',
    privacyLink: 'Datenschutzrichtlinie',
    moreInfo: 'Mehr Informationen',
  },
  it: {
    title: 'La tua privacy è importante',
    desc: 'Utilizziamo i cookie per migliorare la tua esperienza, analizzare il traffico e personalizzare i contenuti.',
    necessary: 'Cookie necessari',
    necessaryDesc: 'Essenziali per il funzionamento del sito. Non possono essere disattivati.',
    analytics: 'Cookie analitici',
    analyticsDesc: 'Ci aiutano a capire come usi il sito per migliorarlo.',
    marketing: 'Cookie di marketing',
    marketingDesc: 'Consentono di mostrarti pubblicità pertinente su altri siti.',
    acceptAll: 'Accetta tutto',
    rejectAll: 'Rifiuta tutto',
    customize: 'Personalizza',
    save: 'Salva preferenze',
    privacyLink: 'Informativa sulla privacy',
    moreInfo: 'Ulteriori informazioni',
  },
  uk: {
    title: 'Ваша конфіденційність важлива',
    desc: 'Ми використовуємо файли cookie для покращення вашого досвіду, аналізу трафіку та персоналізації вмісту.',
    necessary: 'Необхідні файли cookie',
    necessaryDesc: 'Необхідні для роботи сайту. Не можуть бути вимкнені.',
    analytics: 'Аналітичні файли cookie',
    analyticsDesc: 'Допомагають нам зрозуміти, як ви використовуєте сайт.',
    marketing: 'Маркетингові файли cookie',
    marketingDesc: 'Дозволяють показувати релевантну рекламу на інших сайтах.',
    acceptAll: 'Прийняти все',
    rejectAll: 'Відхилити все',
    customize: 'Налаштувати',
    save: 'Зберегти налаштування',
    privacyLink: 'Політика конфіденційності',
    moreInfo: 'Докладніше',
  },
  ru: {
    title: 'Ваша конфиденциальность важна',
    desc: 'Мы используем файлы cookie для улучшения вашего опыта, анализа трафика и персонализации контента.',
    necessary: 'Необходимые файлы cookie',
    necessaryDesc: 'Необходимы для работы сайта. Не могут быть отключены.',
    analytics: 'Аналитические файлы cookie',
    analyticsDesc: 'Помогают нам понять, как вы используете сайт.',
    marketing: 'Маркетинговые файлы cookie',
    marketingDesc: 'Позволяют показывать вам релевантную рекламу на других сайтах.',
    acceptAll: 'Принять всё',
    rejectAll: 'Отклонить всё',
    customize: 'Настроить',
    save: 'Сохранить настройки',
    privacyLink: 'Политика конфиденциальности',
    moreInfo: 'Подробнее',
  },
}

const COOKIE_KEY = 'astrokey_cookie_consent'

interface CookiePrefs { necessary: true; analytics: boolean; marketing: boolean }

function Toggle({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button
      onClick={onChange}
      className={`relative w-11 h-6 rounded-full transition-colors duration-200 flex-shrink-0 ${checked ? 'bg-primary-500' : 'bg-white/15'}`}
    >
      <span className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform duration-200 ${checked ? 'translate-x-5' : 'translate-x-0'}`} />
    </button>
  )
}

export default function CookieBanner() {
  const language = useAppStore((s) => s.language)
  const t = cookieT[language] ?? cookieT.es

  const [visible, setVisible] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [prefs, setPrefs] = useState<CookiePrefs>({ necessary: true, analytics: false, marketing: false })

  useEffect(() => {
    const stored = localStorage.getItem(COOKIE_KEY)
    if (!stored) {
      // Pequeño delay para no bloquear la carga inicial
      const timer = setTimeout(() => setVisible(true), 1500)
      return () => clearTimeout(timer)
    }
  }, [])

  const save = (p: CookiePrefs) => {
    localStorage.setItem(COOKIE_KEY, JSON.stringify({ ...p, date: new Date().toISOString() }))
    setVisible(false)
    // Aquí se puede disparar Google Analytics, Meta Pixel, etc. según las preferencias
    if (p.analytics) {
      console.log('[Cookies] Analytics aceptadas')
    }
    if (p.marketing) {
      console.log('[Cookies] Marketing aceptado')
    }
  }

  const acceptAll = () => save({ necessary: true, analytics: true, marketing: true })
  const rejectAll = () => save({ necessary: true, analytics: false, marketing: false })
  const saveCustom = () => save(prefs)

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-4 left-4 right-4 z-[200] max-w-2xl mx-auto"
        >
          <div className="bg-cosmic-dark/98 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden">
            {/* Header */}
            <div className="p-5 pb-0">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-primary-500/15 border border-primary-500/20 flex items-center justify-center flex-shrink-0">
                    <Cookie className="w-5 h-5 text-primary-400" />
                  </div>
                  <h3 className="text-base font-bold text-white">{t.title}</h3>
                </div>
                <button onClick={rejectAll} className="text-white/30 hover:text-white/60 transition-colors mt-0.5">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="mt-3 text-sm text-white/50 leading-relaxed">{t.desc}</p>
            </div>

            {/* Panel personalizable */}
            <AnimatePresence>
              {expanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pt-4 space-y-3">
                    {/* Necesarias */}
                    <div className="flex items-center justify-between gap-4 p-3 bg-white/[0.03] rounded-xl border border-white/5">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                          <p className="text-sm font-semibold text-white">{t.necessary}</p>
                        </div>
                        <p className="text-xs text-white/35 mt-0.5 leading-relaxed">{t.necessaryDesc}</p>
                      </div>
                      <Toggle checked={true} onChange={() => {}} />
                    </div>

                    {/* Analíticas */}
                    <div className="flex items-center justify-between gap-4 p-3 bg-white/[0.03] rounded-xl border border-white/5">
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-white">{t.analytics}</p>
                        <p className="text-xs text-white/35 mt-0.5 leading-relaxed">{t.analyticsDesc}</p>
                      </div>
                      <Toggle checked={prefs.analytics} onChange={() => setPrefs(p => ({ ...p, analytics: !p.analytics }))} />
                    </div>

                    {/* Marketing */}
                    <div className="flex items-center justify-between gap-4 p-3 bg-white/[0.03] rounded-xl border border-white/5">
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-white">{t.marketing}</p>
                        <p className="text-xs text-white/35 mt-0.5 leading-relaxed">{t.marketingDesc}</p>
                      </div>
                      <Toggle checked={prefs.marketing} onChange={() => setPrefs(p => ({ ...p, marketing: !p.marketing }))} />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Botones */}
            <div className="p-4 flex flex-wrap items-center gap-2">
              <button
                onClick={acceptAll}
                className="flex-1 min-w-[120px] py-2.5 px-4 bg-gradient-to-r from-primary-500 to-purple-600 text-white text-sm font-bold rounded-xl hover:opacity-90 transition-opacity"
              >
                {t.acceptAll}
              </button>

              {!expanded ? (
                <button
                  onClick={() => setExpanded(true)}
                  className="flex items-center gap-1.5 py-2.5 px-4 bg-white/5 border border-white/10 text-white/60 text-sm font-medium rounded-xl hover:bg-white/10 hover:text-white transition-all"
                >
                  {t.customize}
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  onClick={saveCustom}
                  className="py-2.5 px-4 bg-white/5 border border-white/10 text-white/60 text-sm font-medium rounded-xl hover:bg-white/10 hover:text-white transition-all"
                >
                  {t.save}
                </button>
              )}

              <button
                onClick={rejectAll}
                className="py-2.5 px-4 text-white/35 text-sm hover:text-white/60 transition-colors"
              >
                {t.rejectAll}
              </button>

              <Link
                href="/legal/privacidad"
                className="text-xs text-primary-400/60 hover:text-primary-400 transition-colors ml-auto"
              >
                {t.privacyLink}
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
