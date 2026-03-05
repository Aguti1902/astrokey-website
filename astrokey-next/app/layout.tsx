import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'

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
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/apple-icon.svg', type: 'image/svg+xml' },
    ],
  },
  themeColor: '#6366f1',
  manifest: '/manifest.json',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={poppins.variable}>
      <body className="font-sans">{children}</body>
    </html>
  )
}
