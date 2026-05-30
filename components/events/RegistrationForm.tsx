'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { toast } from 'sonner'
import { type EventItem } from '@/data/events'
import { formatCOP, formatDate } from '@/lib/utils'
import { z } from 'zod'

interface RegistrationFormProps {
  event: EventItem | null
  onClose: () => void
}

const schema = z.object({
  nombre: z.string().min(2, 'Nombre requerido (mínimo 2 caracteres)'),
  email: z.string().email('Email inválido'),
  telefono: z.string().min(7, 'Teléfono requerido'),
  asistentes: z.number().min(1).max(5),
})

type FormData = { nombre: string; email: string; telefono: string; asistentes: number }

export default function RegistrationForm({ event, onClose }: RegistrationFormProps) {
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>({
    defaultValues: { nombre: '', email: '', telefono: '', asistentes: 1 },
  })

  const asistentes = watch('asistentes') || 1
  const total = event ? event.price * asistentes : 0

  const onSubmit = (raw: FormData) => {
    const result = schema.safeParse(raw)
    if (!result.success) {
      toast.error('Por favor revisa los campos del formulario')
      return
    }
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      toast.success('¡Inscripción confirmada! Te esperamos. Recibirás un email de confirmación.')
      onClose()
    }, 1200)
  }

  return (
    <AnimatePresence>
      {event && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-full max-w-lg rounded-2xl overflow-hidden"
              style={{ background: '#1A1712', border: '1px solid #2E2922' }}
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5" style={{ borderBottom: '1px solid #2E2922' }}>
                <h2 style={{ fontFamily: "'Cormorant Garamond', serif", color: '#F5EDD8', fontSize: '1.5rem' }}>
                  Inscribirse
                </h2>
                <button onClick={onClose} style={{ color: '#8A7E6C' }} className="p-1 hover:text-white transition-colors">
                  <X size={20} />
                </button>
              </div>

              {/* Event summary */}
              <div className="px-6 py-4" style={{ background: '#221F1A', borderBottom: '1px solid #2E2922' }}>
                <p className="text-xs tracking-widest uppercase mb-1" style={{ color: '#C8873A' }}>
                  {event.category}
                </p>
                <p className="font-semibold mb-1" style={{ color: '#F5EDD8', fontFamily: "'Cormorant Garamond', serif", fontSize: '1.2rem' }}>
                  {event.title}
                </p>
                <p className="text-xs" style={{ color: '#8A7E6C' }}>
                  {formatDate(event.date)} · {event.time}
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="px-6 py-5 space-y-4">
                {/* Nombre */}
                <div>
                  <label className="block text-xs tracking-wider uppercase mb-1.5" style={{ color: '#8A7E6C' }}>
                    Nombre completo
                  </label>
                  <input
                    {...register('nombre', { required: 'Nombre requerido' })}
                    className="w-full px-4 py-3 text-sm outline-none"
                    style={{ background: '#221F1A', border: `1px solid ${errors.nombre ? '#E63B2E' : '#2E2922'}`, color: '#F5EDD8' }}
                    placeholder="Tu nombre"
                  />
                  {errors.nombre && <p className="text-xs mt-1" style={{ color: '#E63B2E' }}>{errors.nombre.message}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs tracking-wider uppercase mb-1.5" style={{ color: '#8A7E6C' }}>
                    Email
                  </label>
                  <input
                    {...register('email', { required: 'Email requerido' })}
                    type="email"
                    className="w-full px-4 py-3 text-sm outline-none"
                    style={{ background: '#221F1A', border: `1px solid ${errors.email ? '#E63B2E' : '#2E2922'}`, color: '#F5EDD8' }}
                    placeholder="tu@email.com"
                  />
                  {errors.email && <p className="text-xs mt-1" style={{ color: '#E63B2E' }}>{errors.email.message}</p>}
                </div>

                {/* Teléfono */}
                <div>
                  <label className="block text-xs tracking-wider uppercase mb-1.5" style={{ color: '#8A7E6C' }}>
                    Teléfono
                  </label>
                  <input
                    {...register('telefono', { required: 'Teléfono requerido' })}
                    className="w-full px-4 py-3 text-sm outline-none"
                    style={{ background: '#221F1A', border: `1px solid ${errors.telefono ? '#E63B2E' : '#2E2922'}`, color: '#F5EDD8' }}
                    placeholder="+57 300 000 0000"
                  />
                </div>

                {/* Asistentes */}
                <div>
                  <label className="block text-xs tracking-wider uppercase mb-1.5" style={{ color: '#8A7E6C' }}>
                    Número de asistentes
                  </label>
                  <select
                    {...register('asistentes', { valueAsNumber: true })}
                    className="w-full px-4 py-3 text-sm outline-none"
                    style={{ background: '#221F1A', border: '1px solid #2E2922', color: '#F5EDD8' }}
                  >
                    {[1, 2, 3, 4, 5].map((n) => (
                      <option key={n} value={n}>{n} {n === 1 ? 'persona' : 'personas'}</option>
                    ))}
                  </select>
                </div>

                {/* Total */}
                {event.price > 0 && (
                  <div
                    className="flex items-center justify-between px-4 py-3 rounded-xl"
                    style={{ background: '#221F1A', border: '1px solid #2E2922' }}
                  >
                    <span className="text-sm" style={{ color: '#8A7E6C' }}>Total a pagar</span>
                    <span
                      className="text-xl font-bold"
                      style={{ fontFamily: "'Cormorant Garamond', serif", color: '#F5EDD8' }}
                    >
                      {formatCOP(total)}
                    </span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 text-sm tracking-widest uppercase font-semibold transition-colors hover:bg-[#b57832] disabled:opacity-60"
                  style={{ background: '#C8873A', color: '#0D0B08' }}
                >
                  {loading ? 'Confirmando...' : 'Confirmar Inscripción'}
                </button>
              </form>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
