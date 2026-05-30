import type { Metadata } from 'next'
import ArtGrid from '@/components/gallery/ArtGrid'

export const metadata: Metadata = {
  title: 'Galería de Arte',
  description:
    '60+ artistas callejeros colombianos. Exhibiciones rotativas de arte urbano, ilustración, fotografía y artesanía. Obras disponibles para llevar a casa con envío a todo el mundo.',
}

export default function GaleriaPage() {
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
            La Candelaria, Bogotá
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
            GALERÍA DE ARTE
          </h1>
          <p className="mt-4 text-sm tracking-widest uppercase" style={{ color: '#8A7E6C' }}>
            60+ artistas · exhibición rotativa mensual · envíos a todo el mundo
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <ArtGrid />
      </div>
    </div>
  )
}
