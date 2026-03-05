'use client'

import { useState } from 'react'
import LocaleLink from '@/components/ui/LocaleLink'
import { Sparkles, CreditCard, Shield, Smartphone, XCircle, CheckCircle, AlertCircle, X } from 'lucide-react'
import { useT } from '@/lib/i18n'

function CancelModal({ onClose }: { onClose: () => void }) {
  const t = useT()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error' | 'not_found'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/cancel-subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name }),
      })
      const data = await res.json()
      if (data.success) {
        setStatus('success')
      } else if (data.error === 'not_found' || res.status === 404) {
        setStatus('not_found')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-cosmic-dark border border-white/10 rounded-2xl max-w-md w-full p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-white/40 hover:text-white">
          <X className="w-5 h-5" />
        </button>

        {status === 'success' ? (
          <div className="text-center py-4">
            <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white mb-2">{t.cancel.successTitle}</h3>
            <p className="text-white/50 text-sm">{t.cancel.successDesc}</p>
            <button onClick={onClose} className="mt-4 px-6 py-2 bg-primary-500/20 border border-primary-500/30 text-primary-300 rounded-xl text-sm">
              {t.common.close}
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
                <XCircle className="w-5 h-5 text-red-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">{t.cancel.title}</h3>
                <p className="text-white/40 text-xs">{t.cancel.desc}</p>
              </div>
            </div>

            <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl mb-4">
              <p className="text-amber-300 text-xs">{t.cancel.warning}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white/60 mb-1.5">{t.cancel.nameLabel}</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t.cancel.namePlaceholder}
                  required
                  className="w-full px-4 py-3 bg-transparent border border-white/15 rounded-xl text-white placeholder:text-white/25 focus:border-primary-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/60 mb-1.5">{t.cancel.emailLabel}</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.cancel.emailPlaceholder}
                  required
                  className="w-full px-4 py-3 bg-transparent border border-white/15 rounded-xl text-white placeholder:text-white/25 focus:border-primary-500 outline-none"
                />
              </div>

              {(status === 'error' || status === 'not_found') && (
                <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-xl">
                  <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                  <p className="text-red-400 text-sm">
                    {status === 'not_found' ? t.cancel.errorNotFound : t.cancel.errorGeneral}
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full py-3 bg-red-500/20 border border-red-500/30 text-red-300 font-semibold rounded-xl hover:bg-red-500/30 transition-colors disabled:opacity-50"
              >
                {status === 'loading' ? t.cancel.processing : t.cancel.submitBtn}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}

const footerLinks = {
  servicios: [
    { labelKey: 'Test Astral', href: '/intro' },
    { labelKey: 'Carta Natal', href: '/intro' },
  ],
  empresa: [
    { labelKey: 'Sobre Nosotros', href: '/sobre-nosotros' },
    { labelKey: 'Blog', href: '/blog' },
  ],
  legal: [
    { labelKey: 'Política de Privacidad', href: '/legal/privacidad' },
    { labelKey: 'Términos y Condiciones', href: '/legal/terminos' },
    { labelKey: 'Aviso Legal', href: '/legal/aviso-legal' },
    { labelKey: 'Política de Reembolsos', href: '/legal/reembolsos' },
  ],
}

export default function Footer() {
  const t = useT()
  const [showCancel, setShowCancel] = useState(false)

  return (
    <>
      {showCancel && <CancelModal onClose={() => setShowCancel(false)} />}

      <footer className="relative bg-cosmic-dark border-t border-white/5">
        <div className="section-container py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
            <div className="lg:col-span-2">
              <LocaleLink href="/" className="flex items-center gap-3 mb-4">
                <Sparkles className="w-7 h-7 text-white" />
                <span className="text-xl font-bold text-white">AstroKey</span>
              </LocaleLink>
              <p className="text-white/50 text-sm leading-relaxed max-w-sm">{t.footer.desc}</p>
              <div className="flex items-center gap-3 mt-6">
                <span className="text-xs text-white/30 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">{t.footer.ssl}</span>
                <span className="text-xs text-white/30 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">{t.footer.rating}</span>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-white mb-4">{t.footer.services}</h4>
              <ul className="space-y-3">
                {footerLinks.servicios.map((link) => (
                  <li key={link.href}><LocaleLink href={link.href} className="text-sm text-white/40 hover:text-white/70 transition-colors">{link.labelKey}</LocaleLink></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-white mb-4">{t.footer.company}</h4>
              <ul className="space-y-3">
                {footerLinks.empresa.map((link) => (
                  <li key={link.href}><LocaleLink href={link.href} className="text-sm text-white/40 hover:text-white/70 transition-colors">{link.labelKey}</LocaleLink></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-white mb-4">{t.footer.legal}</h4>
              <ul className="space-y-3">
                {footerLinks.legal.map((link) => (
                  <li key={link.href}><LocaleLink href={link.href} className="text-sm text-white/40 hover:text-white/70 transition-colors">{link.labelKey}</LocaleLink></li>
                ))}
                <li>
                  <button
                    onClick={() => setShowCancel(true)}
                    className="text-sm text-red-400/60 hover:text-red-400 transition-colors flex items-center gap-1.5"
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    {t.footer.cancel}
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-white/30">{t.footer.rights.replace('{{year}}', String(new Date().getFullYear()))}</p>
            <div className="flex items-center gap-4 text-white/20">
              <CreditCard className="w-5 h-5" />
              <Shield className="w-5 h-5" />
              <Smartphone className="w-5 h-5" />
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
