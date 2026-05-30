'use client'

const artists = [
  { name: 'Diego Roa', role: 'Muralista' },
  { name: 'María Esperanza', role: 'Ilustradora' },
  { name: 'Carlos Zuluaga', role: 'Fotógrafo' },
  { name: 'Ana Lucía Herrera', role: 'Ceramista' },
  { name: 'Felipe Ríos', role: 'Serígrafo' },
  { name: 'Valentina Mora', role: 'Muralista' },
  { name: 'Jorge Castaño', role: 'Artista mixto' },
  { name: 'Luisa Méndez', role: 'Fotógrafa' },
  { name: 'Andrés Parra', role: 'Artesano' },
  { name: 'Camila Torres', role: 'Acuarelista' },
  { name: 'Sebastián Villegas', role: 'Pintor' },
  { name: 'Natalia Gómez', role: 'Ilustradora' },
]

const colors = [
  '#C8873A', '#E63B2E', '#4A8B5C', '#6B8EC8',
  '#9B7EC8', '#C87A3A', '#3AC8A0', '#C8453A',
  '#3A8BC8', '#C8B83A', '#8BC83A', '#C83A8B',
]

// Duplicate for seamless loop
const doubled = [...artists, ...artists]

export default function ArtistsSlider() {
  return (
    <section className="py-20 overflow-hidden" style={{ background: '#0D0B08', borderTop: '1px solid #2E2922', borderBottom: '1px solid #2E2922' }}>
      <div className="mb-10 text-center">
        <p className="text-xs tracking-widest uppercase mb-2" style={{ color: '#C8873A' }}>
          La comunidad
        </p>
        <h2
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 'clamp(1.8rem, 4vw, 3rem)',
            color: '#F5EDD8',
            fontWeight: 600,
          }}
        >
          60+ Artistas
        </h2>
      </div>

      <div className="relative">
        {/* Fade edges */}
        <div
          className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, #0D0B08, transparent)' }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, #0D0B08, transparent)' }}
        />

        {/* Scrolling track */}
        <div
          className="flex gap-6"
          style={{
            animation: 'scroll-left 30s linear infinite',
          }}
        >
          {doubled.map((artist, i) => {
            const color = colors[i % colors.length]
            const initials = artist.name.split(' ').map((w) => w[0]).join('').substring(0, 2)
            return (
              <div
                key={`${artist.name}-${i}`}
                className="flex-shrink-0 flex flex-col items-center gap-3"
                style={{ minWidth: '140px' }}
              >
                {/* Avatar */}
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-sm font-bold"
                  style={{ background: `${color}20`, border: `2px solid ${color}40`, color }}
                >
                  {initials}
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium whitespace-nowrap" style={{ color: '#F5EDD8' }}>
                    {artist.name}
                  </p>
                  <p className="text-xs" style={{ color: '#8A7E6C' }}>
                    {artist.role}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <style jsx global>{`
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  )
}
