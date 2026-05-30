import type { Metadata } from 'next'
import EventsClient from '@/components/events/EventsClient'

export const metadata: Metadata = {
  title: 'Eventos & Talleres',
  description:
    'Talleres de arte, exposiciones, catas de café y conciertos en Casa Cultural Nuestra Herencia, La Candelaria, Bogotá.',
}

export default function EventosPage() {
  return (
    <div style={{ background: '#0D0B08', minHeight: '100vh' }}>
      {/* Header */}
      <div
        className="pt-32 pb-16 px-4"
        style={{
          borderBottom: '1px solid #2E2922',
          background: 'linear-gradient(to bottom, #1A1712, #0D0B08)',
        }}
      >
        <div className="max-w-7xl mx-auto">
          <p className="text-xs tracking-widest uppercase mb-3" style={{ color: '#C8873A' }}>
            La Candelaria, Bogotá · 2026
          </p>
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(3rem, 8vw, 6rem)',
              color: '#F5EDD8',
              fontWeight: 700,
              lineHeight: 1.0,
              letterSpacing: '-0.02em',
            }}
          >
            EVENTOS &<br />TALLERES
          </h1>
          <p className="mt-4 text-sm leading-relaxed max-w-xl" style={{ color: '#8A7E6C' }}>
            Experiencias culturales que transforman. Desde talleres de muralismo hasta catas de café,
            cada evento es una puerta de entrada al universo de Nuestra Herencia.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <EventsClient />
      </div>
    </div>
  )
}
