'use client'
import Image from 'next/image'
import { type EventItem } from '@/data/events'
import { formatCOP, getDayNumber, getMonthAbbr } from '@/lib/utils'

interface EventCardProps {
  event: EventItem
  onClick: () => void
}

const categoryConfig: Record<string, { label: string; color: string }> = {
  taller: { label: 'Taller', color: '#C8873A' },
  exposicion: { label: 'Exposición', color: '#4A8B5C' },
  experiencia: { label: 'Experiencia', color: '#6B8EC8' },
  concierto: { label: 'Concierto / Jam', color: '#E63B2E' },
  visita: { label: 'Visita Guiada', color: '#9B7EC8' },
}

export default function EventCard({ event, onClick }: EventCardProps) {
  const { label, color } = categoryConfig[event.category]
  const day = getDayNumber(event.date)
  const month = getMonthAbbr(event.date)
  const pct = Math.round((event.registered / event.capacity) * 100)
  const barColor = pct > 80 ? '#E63B2E' : pct > 50 ? '#C8873A' : '#4A8B5C'
  const spotsLeft = event.capacity - event.registered

  return (
    <div
      className="group relative rounded-2xl overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-[1.01]"
      style={{ background: '#1A1712', border: '1px solid #2E2922' }}
      onClick={onClick}
    >
      {/* Background image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={event.imageUrl}
          alt={event.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          unoptimized
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(13,11,8,0.3), rgba(13,11,8,0.8))' }} />

        {/* Category badge */}
        <div className="absolute top-4 left-4">
          <span
            className="px-2 py-1 text-[10px] tracking-widest uppercase font-semibold"
            style={{ background: color, color: '#0D0B08' }}
          >
            {label}
          </span>
        </div>

        {/* Date */}
        <div className="absolute top-4 right-4 text-right">
          <p
            className="text-5xl font-bold leading-none"
            style={{ fontFamily: "'Cormorant Garamond', serif", color }}
          >
            {day}
          </p>
          <p className="text-xs tracking-widest" style={{ color: '#F5EDD8' }}>{month}</p>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3
          className="mb-1 text-xl font-semibold"
          style={{ fontFamily: "'Cormorant Garamond', serif", color: '#F5EDD8' }}
        >
          {event.title}
        </h3>
        <p className="text-sm mb-1 line-clamp-2" style={{ color: '#8A7E6C' }}>
          {event.subtitle}
        </p>

        {event.instructor && (
          <p className="text-xs mb-3" style={{ color: '#C8873A' }}>
            Con {event.instructor}
          </p>
        )}

        <p className="text-xs mb-4" style={{ color: '#8A7E6C' }}>
          {event.time}
        </p>

        {/* Capacity bar */}
        <div className="mb-4">
          <div className="flex justify-between text-xs mb-1" style={{ color: '#8A7E6C' }}>
            <span>{event.registered}/{event.capacity} inscritos</span>
            <span style={{ color: spotsLeft <= 3 ? '#E63B2E' : '#8A7E6C' }}>
              {spotsLeft} cupos disponibles
            </span>
          </div>
          <div className="h-1.5 rounded-full overflow-hidden" style={{ background: '#2E2922' }}>
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.min(pct, 100)}%`, background: barColor }}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <span
            className="text-base font-bold"
            style={{ fontFamily: "'Cormorant Garamond', serif", color: '#F5EDD8' }}
          >
            {event.price === 0 ? 'Entrada libre' : formatCOP(event.price)}
          </span>
          <span
            className="text-xs tracking-widest uppercase transition-colors"
            style={{ color: '#C8873A' }}
          >
            Inscribirse →
          </span>
        </div>
      </div>
    </div>
  )
}
