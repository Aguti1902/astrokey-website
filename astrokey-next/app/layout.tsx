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

const GTM_ID = 'GTM-TD4FR26W'
const GA_ID = 'G-VTCPRXK17F'
const GADS_ID = 'AW-17992909528'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={poppins.variable}>
      <head>
        {/* Google Analytics 4 + Google Ads */}
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}');
              gtag('config', '${GADS_ID}');
            `,
          }}
        />

        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`,
          }}
        />
      </head>
      <body className="font-sans">
        {/* Google Tag Manager noscript — justo después de <body> */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>

        <LocaleInitializer />
        {children}
      </body>
    </html>
  )
}
