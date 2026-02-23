import Link from 'next/link'
import { Sparkles, CreditCard, Shield, Smartphone } from 'lucide-react'

const footerLinks = {
  servicios: [
    { label: 'Test Astral', href: '/test' },
    { label: 'Carta Natal', href: '/test' },
  ],
  empresa: [
    { label: 'Sobre Nosotros', href: '/sobre-nosotros' },
    { label: 'Blog Astrológico', href: '/blog' },
  ],
  soporte: [
    { label: 'Centro de Ayuda', href: '/ayuda' },
    { label: 'FAQ', href: '/faq' },
  ],
  legal: [
    { label: 'Política de Privacidad', href: '/legal/privacidad' },
    { label: 'Términos y Condiciones', href: '/legal/terminos' },
    { label: 'Aviso Legal', href: '/legal/aviso-legal' },
    { label: 'Política de Reembolsos', href: '/legal/reembolsos' },
  ],
}

export default function Footer() {
  return (
    <footer className="relative bg-cosmic-dark border-t border-white/5">
      <div className="section-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <Sparkles className="w-7 h-7 text-white" />
              <span className="text-xl font-bold text-white">AstroKey</span>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed max-w-sm">
              Tu portal al universo astrológico personalizado. Descubre tu destino
              con tecnología de vanguardia y expertos certificados.
            </p>
            <div className="flex items-center gap-3 mt-6">
              <span className="text-xs text-white/30 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                🔒 SSL Seguro
              </span>
              <span className="text-xs text-white/30 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                ⭐ 5.0 Rating
              </span>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Servicios</h4>
            <ul className="space-y-3">
              {footerLinks.servicios.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/40 hover:text-white/70 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Empresa</h4>
            <ul className="space-y-3">
              {footerLinks.empresa.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/40 hover:text-white/70 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/40 hover:text-white/70 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/30">
            © {new Date().getFullYear()} AstroKey. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-4 text-white/20">
            <CreditCard className="w-5 h-5" />
            <Shield className="w-5 h-5" />
            <Smartphone className="w-5 h-5" />
          </div>
        </div>
      </div>
    </footer>
  )
}
