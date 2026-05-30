import type { Metadata } from 'next'
import Image from 'next/image'
import { cafeProducts } from '@/data/cafe-products'
import CafeProductCard from '@/components/cafe/CafeProductCard'
import OriginTimeline from '@/components/cafe/OriginTimeline'

export const metadata: Metadata = {
  title: 'Café de Origen',
  description:
    'Café colombiano de origen propio. Granos seleccionados de Huila, Nariño y Sierra Nevada. Envíos a todo el mundo desde La Candelaria, Bogotá.',
}

export default function CafePage() {
  const subscription = cafeProducts.find((p) => p.subscription)
  const regular = cafeProducts.filter((p) => !p.subscription)

  return (
    <div style={{ background: '#0D0B08', minHeight: '100vh' }}>
      {/* Hero */}
      <div className="relative h-[65vh] flex items-end">
        <Image
          src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=1920&q=80&fit=crop"
          alt="Café de origen colombiano"
          fill
          className="object-cover"
          unoptimized
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0B08] via-black/50 to-black/20" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 w-full pb-16">
          <p className="text-xs tracking-widest uppercase mb-3" style={{ color: '#C8873A' }}>
            Marca propia · Origen 100% colombiano
          </p>
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(2.5rem, 7vw, 5.5rem)',
              color: '#F5EDD8',
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
            }}
          >
            EL CAFÉ QUE<br />CUENTA UNA HISTORIA
          </h1>
        </div>
      </div>

      {/* Story */}
      <section className="py-20 px-4" style={{ background: '#0D0B08' }}>
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs tracking-widest uppercase mb-4" style={{ color: '#C8873A' }}>
                Nuestra historia
              </p>
              <h2
                className="mb-6"
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
                  color: '#F5EDD8',
                  fontWeight: 600,
                }}
              >
                Del caficultor a tu taza
              </h2>
              <p className="text-base leading-relaxed mb-4" style={{ color: '#8A7E6C' }}>
                Trabajamos directamente con familias caficultoras de las regiones más emblemáticas de Colombia: los valles del Huila, las laderas volcánicas de Nariño y los bosques sagrados de la Sierra Nevada de Santa Marta.
              </p>
              <p className="text-base leading-relaxed" style={{ color: '#8A7E6C' }}>
                Cada bolsa de café Nuestra Herencia cuenta la historia de una familia, un terroir, un proceso de beneficio realizado con cuidado ancestral. El comercio justo no es un eslogan: es el único modelo que aceptamos.
              </p>
            </div>
            <div className="relative aspect-square rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1501747315-124a0eaca060?w=700&q=80&fit=crop"
                alt="Caficultor colombiano"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          </div>
        </div>
      </section>

      {/* Regions */}
      <section className="py-16 px-4" style={{ background: '#1A1712' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs tracking-widest uppercase mb-2" style={{ color: '#C8873A' }}>Orígenes</p>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: 'clamp(1.8rem, 4vw, 3rem)',
                color: '#F5EDD8',
                fontWeight: 600,
              }}
            >
              Las regiones que nos inspiran
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'Huila', description: 'El corazón cafetero. Altitudes sobre 1.500m, suelos volcánicos y microclimas únicos dan lugar a cafés de acidez brillante y cuerpo redondo.', emoji: '🏔️' },
              { name: 'Nariño', description: 'En los límites con Ecuador, los cafés de Nariño crecen entre los 1.800 y 2.300 m.s.n.m. El resultado: acidez intensa, fragancias florales inconfundibles.', emoji: '🌋' },
              { name: 'Sierra Nevada', description: 'Los indígenas Kogui y Arhuaco cultivan café en armonia con la selva. Un café espiritual, complejo, que sabe a bosque y a historia.', emoji: '🌿' },
            ].map((region) => (
              <div
                key={region.name}
                className="p-6 rounded-2xl"
                style={{ background: '#221F1A', border: '1px solid #2E2922' }}
              >
                <span className="text-3xl mb-4 block">{region.emoji}</span>
                <h3
                  className="mb-2 text-xl font-semibold"
                  style={{ fontFamily: "'Cormorant Garamond', serif", color: '#F5EDD8' }}
                >
                  {region.name}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: '#8A7E6C' }}>
                  {region.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-20 px-4" style={{ background: '#0D0B08' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs tracking-widest uppercase mb-2" style={{ color: '#C8873A' }}>Nuestro café</p>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: 'clamp(1.8rem, 4vw, 3rem)',
                color: '#F5EDD8',
                fontWeight: 600,
              }}
            >
              Selección de Origen
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {regular.map((product) => (
              <CafeProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 px-4" style={{ background: '#1A1712' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs tracking-widest uppercase mb-2" style={{ color: '#C8873A' }}>El proceso</p>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: 'clamp(1.8rem, 4vw, 3rem)',
                color: '#F5EDD8',
                fontWeight: 600,
              }}
            >
              Del Campo a Tu Taza
            </h2>
          </div>
          <OriginTimeline />
        </div>
      </section>

      {/* Subscription highlight */}
      {subscription && (
        <section className="py-20 px-4" style={{ background: '#0D0B08' }}>
          <div className="max-w-2xl mx-auto">
            <div className="max-w-sm mx-auto">
              <CafeProductCard product={subscription} />
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
