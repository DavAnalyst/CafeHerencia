'use client'
import { useState } from 'react'
import { type EventItem } from '@/data/events'
import RegistrationForm from './RegistrationForm'

interface EventDetailClientProps {
  event: EventItem
}

export default function EventDetailClient({ event }: EventDetailClientProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="w-full py-4 text-sm tracking-widest uppercase font-semibold transition-colors hover:bg-[#b57832]"
        style={{ background: '#C8873A', color: '#0D0B08' }}
      >
        Inscribirse
      </button>
      <RegistrationForm event={open ? event : null} onClose={() => setOpen(false)} />
    </>
  )
}
