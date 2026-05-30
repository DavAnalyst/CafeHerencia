'use client'
import { useState } from 'react'
import { events, type EventItem, type EventCategory } from '@/data/events'
import EventCard from './EventCard'
import RegistrationForm from './RegistrationForm'

type Filter = 'all' | EventCategory

const filters: { value: Filter; label: string }[] = [
  { value: 'all', label: 'Todos' },
  { value: 'taller', label: 'Talleres' },
  { value: 'exposicion', label: 'Exposiciones' },
  { value: 'experiencia', label: 'Experiencias' },
  { value: 'concierto', label: 'Conciertos' },
  { value: 'visita', label: 'Visitas' },
]

export default function EventsClient() {
  const [filter, setFilter] = useState<Filter>('all')
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null)

  const filtered = filter === 'all' ? events : events.filter((e) => e.category === filter)

  return (
    <>
      {/* Filter bar */}
      <div className="flex flex-wrap gap-2 mb-10">
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className="px-4 py-2 text-xs tracking-widest uppercase transition-all duration-200"
            style={{
              background: filter === f.value ? '#C8873A' : 'transparent',
              color: filter === f.value ? '#0D0B08' : '#8A7E6C',
              border: `1px solid ${filter === f.value ? '#C8873A' : '#2E2922'}`,
            }}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Count */}
      <p className="mb-8 text-xs tracking-wider uppercase" style={{ color: '#8A7E6C' }}>
        {filtered.length} evento{filtered.length !== 1 ? 's' : ''} próximo{filtered.length !== 1 ? 's' : ''}
      </p>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            onClick={() => setSelectedEvent(event)}
          />
        ))}
      </div>

      {/* Registration modal */}
      <RegistrationForm event={selectedEvent} onClose={() => setSelectedEvent(null)} />
    </>
  )
}
