import type { Metadata } from 'next'
import Image from 'next/image'
import { CountUp } from '@/components/ui/CountUp'

export const metadata: Metadata = {
  title: 'Quiénes Somos',
  description:
    'La historia de Casa Cultural Nuestra Herencia, fundada por Edwar Ordóñez en La Candelaria, Bogotá. Arte, café y transformación social.',
}

const founders = [
  {
    name: 'Edwar Ordóñez',
    role: 'Fundador & Director',
    bio: 'Artista y gestor cultural bogotano. Edwar soñó con un espacio donde el arte callejero tuviera la dignidad de una galería formal. Ocho años después, ese sueño es una realidad reconocida por TIME Magazine.',
    unsplashId: 'photo-1507003211169-0a1dd7228f2d',
  },
  {
    name: 'Sofía Rueda',
    role: 'Directora Artística',
    bio: 'Curadora e historiadora del arte con maestría en Arte Latinoamericano. Sofía diseña la programación artística y acompaña a los artistas en su proceso creativo.',
    unsplashId: 'photo-1494790108377-be9c29b29330',
  },
  {
    name: 'Mauricio Castro',
    role: 'Director de Operaciones',
    bio: 'Administrador de empresas apasionado por la sostenibilidad. Mauricio construyó el modelo de comercio justo que conecta artesanos y caficultores directamente con quienes aman su trabajo.',
    unsplashId: 'photo-1472099645785-5658abf4ff4e',
  },
]

const impacts = [
  { value: 60, suffix: '+', label: 'Artistas representados' },
  { value: 8, suffix: '', label: 'Años transformando vidas' },
  { value: 10000, suffix: 'm²', label: 'Arte comunitario creado' },
  { value: 3, suffix: '', label: 'Fundadores apasionados' },
]

const press = [
  { name: 'TIME Magazine', detail: "World's Greatest Places 2025" },
  { name: 'El Espectador', detail: 'La galería que cambió La Candelaria' },
  { name: 'Semana', detail: 'Arte urbano como motor de paz' },
  { name: 'The Guardian', detail: "Bogotá's secret cultural gem" },
]

export default function NosotrosPage() {
  return (
    <div style={{ background: '#0D0B08', minHeight: '100vh' }}>
      {/* Hero */}
      <div className="relative h-[60vh] flex items-end">
        <Image
          src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1920&q=80&fit=crop"
          alt="Galería Nuestra Herencia"
          fill
          className="object-cover"
          unoptimized
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0B08] via-black/50 to-black/20" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 w-full pb-14">
          <p className="text-xs tracking-widest uppercase mb-3" style={{ color: '#C8873A' }}>
            Fundada en 2018 · La Candelaria, Bogotá
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
            NUESTRA HISTORIA
          </h1>
        </div>
      </div>

      {/* Story */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="max-w-2xl">
            <p className="text-lg leading-relaxed mb-6" style={{ color: '#8A7E6C' }}>
              En 2018, en una esquina del barrio La Candelaria que nadie más quería, Edwar Ordóñez abrió una puerta. No sabía que ese gesto cambiaría la historia del arte urbano en Colombia.
            </p>
            <p className="text-lg leading-relaxed mb-6" style={{ color: '#8A7E6C' }}>
              Lo que comenzó como un pequeño café con las paredes llenas de graffiti se convirtió, en apenas ocho años, en el epicentro cultural más vibrante de Bogotá. Hoy, más de 60 artistas callejeros colombianos llaman a este espacio su primera sala de exhibición.
            </p>
            <p className="text-lg leading-relaxed" style={{ color: '#8A7E6C' }}>
              Nuestra filosofía nunca cambió: el arte no decora espacios. El arte transforma vidas. Cuando un joven del barrio ve su obra colgada en una galería, algo dentro de él cambia para siempre.
            </p>
          </div>
        </div>
      </section>

      {/* Impact numbers */}
      <section className="py-20 px-4" style={{ background: '#1A1712' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs tracking-widest uppercase mb-2" style={{ color: '#C8873A' }}>
              Nuestro impacto
            </p>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: 'clamp(1.8rem, 4vw, 3rem)',
                color: '#F5EDD8',
                fontWeight: 600,
              }}
            >
              Ocho años de transformación
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {impacts.map(({ value, suffix, label }) => (
              <div key={label} className="text-center">
                <p
                  className="mb-2"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 'clamp(3rem, 6vw, 5rem)',
                    color: '#C8873A',
                    fontWeight: 700,
                    lineHeight: 1,
                  }}
                >
                  <CountUp end={value} suffix={suffix} />
                </p>
                <p className="text-sm tracking-wide" style={{ color: '#8A7E6C' }}>
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy quote */}
      <section
        className="py-24 px-4 text-center"
        style={{
          background: '#0D0B08',
          borderTop: '1px solid #2E2922',
          borderBottom: '1px solid #2E2922',
        }}
      >
        <div className="max-w-3xl mx-auto">
          <p
            className="mb-6 italic leading-relaxed"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(1.8rem, 4vw, 3rem)',
              color: '#F5EDD8',
              fontWeight: 300,
            }}
          >
            &ldquo;El arte no decora espacios. El arte transforma vidas, pensamientos y comunidades enteras.&rdquo;
          </p>
          <p className="text-sm tracking-widest uppercase" style={{ color: '#C8873A' }}>
            — Edwar Ordóñez, Fundador
          </p>
        </div>
      </section>

      {/* Founders */}
      <section className="py-20 px-4" style={{ background: '#0D0B08' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs tracking-widest uppercase mb-2" style={{ color: '#C8873A' }}>El equipo</p>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: 'clamp(1.8rem, 4vw, 3rem)',
                color: '#F5EDD8',
                fontWeight: 600,
              }}
            >
              Los Fundadores
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {founders.map((founder) => (
              <div key={founder.name} className="text-center">
                <div className="relative w-32 h-32 rounded-full overflow-hidden mx-auto mb-5" style={{ border: '3px solid #C8873A30' }}>
                  <Image
                    src={`https://images.unsplash.com/${founder.unsplashId}?w=200&h=200&q=80&fit=crop&crop=face`}
                    alt={founder.name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <h3
                  className="text-xl font-semibold mb-1"
                  style={{ fontFamily: "'Cormorant Garamond', serif", color: '#F5EDD8' }}
                >
                  {founder.name}
                </h3>
                <p className="text-xs tracking-widest uppercase mb-3" style={{ color: '#C8873A' }}>
                  {founder.role}
                </p>
                <p className="text-sm leading-relaxed" style={{ color: '#8A7E6C' }}>
                  {founder.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recognition */}
      <section className="py-20 px-4" style={{ background: '#1A1712' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs tracking-widest uppercase mb-2" style={{ color: '#C8873A' }}>Reconocimientos</p>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: 'clamp(1.8rem, 4vw, 3rem)',
                color: '#F5EDD8',
                fontWeight: 600,
              }}
            >
              El mundo nos reconoce
            </h2>
          </div>

          {/* TIME badge */}
          <div
            className="text-center p-8 rounded-2xl mb-10 max-w-sm mx-auto"
            style={{ background: '#221F1A', border: '2px solid #C8873A' }}
          >
            <p
              className="text-xl font-bold mb-1"
              style={{ fontFamily: "'Cormorant Garamond', serif", color: '#C8873A' }}
            >
              TIME Magazine
            </p>
            <p className="text-sm tracking-widest uppercase" style={{ color: '#F5EDD8' }}>
              World&apos;s Greatest Places 2025
            </p>
          </div>

          {/* Press */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {press.map((p) => (
              <div
                key={p.name}
                className="p-4 rounded-xl text-center"
                style={{ background: '#221F1A', border: '1px solid #2E2922' }}
              >
                <p className="font-semibold mb-1" style={{ color: '#F5EDD8', fontFamily: "'Cormorant Garamond', serif" }}>
                  {p.name}
                </p>
                <p className="text-xs leading-snug" style={{ color: '#8A7E6C' }}>
                  {p.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
