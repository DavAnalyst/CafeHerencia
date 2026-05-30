import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { events } from '@/data/events'
import { formatCOP, formatDate } from '@/lib/utils'
import EventDetailClient from '@/components/events/EventDetailClient'

interface Props {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  return events.map((e) => ({ id: e.id }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const event = events.find((e) => e.id === id)
  if (!event) return {}
  return {
    title: event.title,
    description: event.description,
  }
}

const categoryConfig: Record<string, { label: string; color: string }> = {
  taller: { label: 'Taller', color: '#C8873A' },
  exposicion: { label: 'Exposición', color: '#4A8B5C' },
  experiencia: { label: 'Experiencia', color: '#6B8EC8' },
  concierto: { label: 'Concierto / Jam', color: '#E63B2E' },
  visita: { label: 'Visita Guiada', color: '#9B7EC8' },
}

export default async function EventDetailPage({ params }: Props) {
  const { id } = await params
  const event = events.find((e) => e.id === id)
  if (!event) notFound()

  const { label, color } = categoryConfig[event.category]
  const related = events.filter((e) => e.id !== event.id).slice(0, 3)
  const pct = Math.round((event.registered / event.capacity) * 100)

  return (
    <div style={{ background: '#0D0B08', minHeight: '100vh' }}>
      {/* Hero */}
      <div className="relative h-[55vh] flex items-end">
        <Image
          src={event.imageUrl}
          alt={event.title}
          fill
          className="object-cover"
          unoptimized
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0B08] via-black/50 to-black/20" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 w-full pb-12">
          <span
            className="inline-block px-3 py-1 text-xs tracking-widest uppercase font-semibold mb-4"
            style={{ background: color, color: '#0D0B08' }}
          >
            {label}
          </span>
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(2rem, 5vw, 4rem)',
              color: '#F5EDD8',
              fontWeight: 700,
              lineHeight: 1.1,
            }}
          >
            {event.title}
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main */}
          <div className="lg:col-span-2">
            <p className="text-base leading-relaxed mb-8" style={{ color: '#8A7E6C' }}>
              {event.description}
            </p>

            {event.includes && event.includes.length > 0 && (
              <div className="mb-8">
                <h2
                  className="mb-4 text-xl"
                  style={{ fontFamily: "'Cormorant Garamond', serif", color: '#F5EDD8', fontWeight: 600 }}
                >
                  ¿Qué incluye?
                </h2>
                <ul className="space-y-2">
                  {event.includes.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm" style={{ color: '#8A7E6C' }}>
                      <span style={{ color: '#4A8B5C' }}>✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Location */}
            <div
              className="p-5 rounded-xl"
              style={{ background: '#1A1712', border: '1px solid #2E2922' }}
            >
              <h3 className="text-sm tracking-widest uppercase mb-2" style={{ color: '#C8873A' }}>Ubicación</h3>
              <p className="text-sm" style={{ color: '#F5EDD8' }}>Casa Cultural Nuestra Herencia</p>
              <p className="text-sm" style={{ color: '#8A7E6C' }}>Calle 10 #2-50, La Candelaria, Bogotá</p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <div
              className="p-5 rounded-xl sticky top-24"
              style={{ background: '#1A1712', border: '1px solid #2E2922' }}
            >
              <div className="space-y-3 mb-5">
                {[
                  { label: 'Fecha', value: formatDate(event.date) },
                  { label: 'Hora', value: event.time },
                  { label: 'Duración', value: event.duration },
                  ...(event.instructor ? [{ label: 'Instructor', value: event.instructor }] : []),
                  ...(event.level ? [{ label: 'Nivel', value: event.level }] : []),
                ].map(({ label, value }) => (
                  <div key={label} className="text-sm">
                    <p style={{ color: '#8A7E6C' }}>{label}</p>
                    <p style={{ color: '#F5EDD8' }}>{value}</p>
                  </div>
                ))}
              </div>

              {/* Capacity */}
              <div className="mb-4">
                <div className="flex justify-between text-xs mb-1" style={{ color: '#8A7E6C' }}>
                  <span>{event.registered}/{event.capacity} inscritos</span>
                  <span>{event.capacity - event.registered} cupos</span>
                </div>
                <div className="h-1.5 rounded-full overflow-hidden" style={{ background: '#2E2922' }}>
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${Math.min(pct, 100)}%`, background: pct > 80 ? '#E63B2E' : '#C8873A' }}
                  />
                </div>
              </div>

              <div className="text-center mb-4">
                <p className="text-3xl font-bold" style={{ fontFamily: "'Cormorant Garamond', serif", color: '#F5EDD8' }}>
                  {event.price === 0 ? 'Entrada libre' : formatCOP(event.price)}
                </p>
                {event.price > 0 && (
                  <p className="text-xs" style={{ color: '#8A7E6C' }}>por persona</p>
                )}
              </div>

              <EventDetailClient event={event} />
            </div>
          </div>
        </div>

        {/* Related */}
        <div className="mt-16">
          <h2
            className="mb-8 text-2xl"
            style={{ fontFamily: "'Cormorant Garamond', serif", color: '#F5EDD8', fontWeight: 600 }}
          >
            Otros eventos que podrían interesarte
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {related.map((e) => (
              <Link key={e.id} href={`/eventos/${e.id}`}>
                <div
                  className="p-4 rounded-xl hover:border-[#C8873A] transition-colors"
                  style={{ background: '#1A1712', border: '1px solid #2E2922' }}
                >
                  <p className="text-xs tracking-widest uppercase mb-1" style={{ color: '#C8873A' }}>
                    {e.category}
                  </p>
                  <p className="font-medium mb-1" style={{ color: '#F5EDD8', fontFamily: "'Cormorant Garamond', serif", fontSize: '1.1rem' }}>
                    {e.title}
                  </p>
                  <p className="text-xs" style={{ color: '#8A7E6C' }}>
                    {formatDate(e.date)} · {e.price === 0 ? 'Libre' : formatCOP(e.price)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <Link href="/eventos">
            <span className="text-sm tracking-wider uppercase transition-colors hover:text-[#C8873A]" style={{ color: '#8A7E6C' }}>
              ← Volver a todos los eventos
            </span>
          </Link>
        </div>
      </div>
    </div>
  )
}
