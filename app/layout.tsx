import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import CartDrawer from '@/components/layout/CartDrawer'
import FloatingContacts from '@/components/layout/FloatingContacts'
import { Toaster } from 'sonner'

export const metadata: Metadata = {
  title: {
    default: 'Casa Cultural Nuestra Herencia | La Candelaria, Bogotá',
    template: '%s | Nuestra Herencia',
  },
  description:
    "Galería de arte urbano, café de origen colombiano y talleres culturales en el corazón de La Candelaria, Bogotá. Seleccionados por TIME World's Greatest Places 2025.",
  keywords: [
    'arte colombiano',
    'café de origen',
    'galería bogotá',
    'La Candelaria',
    'arte urbano colombia',
    'cultura bogotá',
    'graffiti bogotá',
  ],
  openGraph: {
    siteName: 'Casa Cultural Nuestra Herencia',
    locale: 'es_CO',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <CartDrawer />
        <FloatingContacts />
        <Toaster
          position="bottom-right"
          theme="dark"
          toastOptions={{
            style: {
              background: '#1A1712',
              border: '1px solid #2E2922',
              color: '#F5EDD8',
            },
          }}
        />
      </body>
    </html>
  )
}
