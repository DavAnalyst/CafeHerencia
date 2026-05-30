'use client'
import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { events } from '@/data/events'
import { formatCOP, getMonthAbbr, getDayNumber } from '@/lib/utils'

const categoryColors: Record<string, string> = {
  taller: '#C8873A',
  exposicion: '#4A8B5C',
  experiencia: '#6B8EC8',
  concierto: '#E63B2E',
  visita: '#9B7EC8',
}

const categoryLabels: Record<string, string> = {
  taller: 'Taller',
  exposicion: 'Exposición',
  experiencia: 'Experiencia',
  concierto: 'Concierto',
  visita: 'Visita',
}

export default function EventsPreview() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const previewEvents = events.slice(0, 3)

  return (
    <section className="py-24 px-4" ref={ref} style={{ background: '#1A1712' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="mb-12 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4"
        >
          <div>
            <p className="text-xs tracking-widest uppercase mb-2" style={{ color: '#C8873A' }}>
              Próximas fechas
            </p>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                color: '#F5EDD8',
                fontWeight: 600,
              }}
            >
              Eventos & Talleres
            </h2>
          </div>
          <Link href="/eventos">
            <span className="text-sm tracking-wider hover:text-[#C8873A] transition-colors" style={{ color: '#8A7E6C' }}>
              Ver todos los eventos →
            </span>
          </Link>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {previewEvents.map((event, i) => {
            const color = categoryColors[event.category]
            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1 }}
                className="group relative rounded-2xl overflow-hidden"
                style={{ background: '#221F1A', border: '1px solid #2E2922' }}
              >
                {/* Image */}
                <div className="relative h-44 overflow-hidden">
                  <Image
                    src={event.imageUrl}
                    alt={event.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  {/* Date overlaid on image */}
                  <div className="absolute bottom-3 right-4 text-right">
                    <p
                      className="text-4xl font-bold leading-none"
                      style={{ fontFamily: "'Cormorant Garamond', serif", color }}
                    >
                      {getDayNumber(event.date)}
                    </p>
                    <p className="text-xs tracking-widest uppercase" style={{ color: '#F5EDD8CC' }}>
                      {getMonthAbbr(event.date)}
                    </p>
                  </div>
                </div>

                <div className="p-6">
                  {/* Category badge */}
                  <div className="flex items-start justify-between mb-4">
                    <span
                      className="px-2 py-1 text-[10px] tracking-widest uppercase rounded"
                      style={{ background: `${color}20`, color, border: `1px solid ${color}40` }}
                    >
                      {categoryLabels[event.category]}
                    </span>
                  </div>

                  <h3
                    className="text-xl mb-2 font-semibold"
                    style={{ fontFamily: "'Cormorant Garamond', serif", color: '#F5EDD8' }}
                  >
                    {event.title}
                  </h3>
                  <p className="text-sm mb-4 line-clamp-2" style={{ color: '#8A7E6C' }}>
                    {event.subtitle}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold" style={{ color: '#F5EDD8' }}>
                      {event.price === 0 ? 'Entrada libre' : formatCOP(event.price)}
                    </span>
                    <span className="text-xs" style={{ color: '#8A7E6C' }}>
                      {event.time}
                    </span>
                  </div>

                  <div className="mt-4" style={{ borderTop: '1px solid #2E2922', paddingTop: '1rem' }}>
                    <Link href={`/eventos/${event.id}`}>
                      <span
                        className="text-xs tracking-widest uppercase hover:text-[#F5EDD8] transition-colors"
                        style={{ color: '#C8873A' }}
                      >
                        Ver evento →
                      </span>
                    </Link>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
