import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import LocaleInitializer from '@/components/providers/LocaleInitializer'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'AstroKey - Descubre tu Destino Astral',
    template: '%s | AstroKey',
  },
  description:
    'Descubre tu carta astral personalizada con AstroKey. Test astrológico completo, carta natal y predicciones personalizadas.',
  keywords: ['astrología', 'carta astral', 'horóscopo', 'carta natal', 'signos del zodiaco'],
  icons: {
    icon: [{ url: '/icon.png', type: 'image/png' }],
    apple: [{ url: '/apple-icon.png', type: 'image/png' }],
    shortcut: '/favicon.png',
  },
  themeColor: '#6366f1',
  manifest: '/manifest.json',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={poppins.variable}>
      <head>
        {/* Google Ads */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=AW-17992909528" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-17992909528');
            `,
          }}
        />
      </head>
      <body className="font-sans">
        <LocaleInitializer />
        {children}
      </body>
    </html>
  )
}
