'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Mail, Sparkles, ArrowRight, Shield, CheckCircle, Star } from 'lucide-react'
import { useAppStore } from '@/lib/store'
import { isValidEmail } from '@/lib/utils'
import { useT } from '@/lib/i18n'

export default function EmailCapture() {
  const router = useRouter()
  const { testAnswers, setTestAnswer, chartResult } = useAppStore()
  const t = useT()
  const [email, setEmail] = useState(testAnswers.email || '')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!email.trim()) { setError(t.email.label); return }
    if (!isValidEmail(email)) { setError(t.common.error); return }
    setIsSubmitting(true)
    setTestAnswer('email', email)
    await new Promise((r) => setTimeout(r, 1000))
    router.push('/payment')
  }

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <header className="relative z-10 py-5 px-4">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-white" />
            <span className="text-lg font-bold text-white">AstroKey</span>
          </Link>
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center px-4 relative z-10">
        <div className="max-w-md w-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary-500/20 to-purple-500/20 border border-primary-500/30 mb-6">
              <Star className="w-9 h-9 text-primary-400" />
            </motion.div>
            <h1 className="text-3xl font-bold text-white mb-3">{t.email.title}</h1>
            <p className="text-white/50">
              {chartResult
                ? <>{t.email.sunSign} <span className="text-primary-400 font-semibold">{chartResult.sunSign}</span>. {t.email.subtitle}</>
                : t.email.subtitle}
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">{t.email.label}</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                  <input type="email" value={email} onChange={(e) => { setEmail(e.target.value); setError('') }}
                    placeholder={t.email.placeholder}
                    className="w-full pl-12 pr-4 py-4 bg-white/5 border-2 border-white/10 rounded-xl text-white placeholder:text-white/25 focus:border-primary-500 focus:ring-0 outline-none transition-colors"
                    autoFocus />
                </div>
                {error && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-400 text-sm mt-2">{error}</motion.p>}
              </div>
              <button type="submit" disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-primary-500 to-purple-600 text-white font-bold rounded-xl shadow-lg shadow-primary-500/25 hover:shadow-xl transition-all disabled:opacity-70">
                {isSubmitting ? t.common.loading : <>{t.email.cta}<ArrowRight className="w-5 h-5" /></>}
              </button>
            </form>
            <div className="mt-6 space-y-3">
              {[t.email.benefit1, t.email.benefit2, t.email.benefit3].map((text) => (
                <div key={text} className="flex items-center gap-2 text-sm text-white/40">
                  <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />{text}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            className="mt-6 flex items-center justify-center gap-2 text-xs text-white/25">
            <Shield className="w-3.5 h-3.5" />{t.email.noSpam}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
