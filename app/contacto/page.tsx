'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import Link from 'next/link'

type FormData = {
  nombre: string
  email: string
  asunto: string
  mensaje: string
}

const asuntos = [
  'Información general',
  'Talleres y eventos',
  'Arte y galería',
  'Café y suscripción',
  'Prensa y medios',
  'Colaboraciones',
  'Otro',
]

export default function ContactoPage() {
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>()

  const onSubmit = (_data: FormData) => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      reset()
      toast.success('¡Mensaje enviado! Te responderemos en menos de 24 horas.')
    }, 1200)
  }

  return (
    <div style={{ background: '#0D0B08', minHeight: '100vh' }}>
      {/* Header */}
      <div
        className="pt-32 pb-14 px-4"
        style={{ borderBottom: '1px solid #2E2922', background: 'linear-gradient(to bottom, #1A1712, #0D0B08)' }}
      >
        <div className="max-w-5xl mx-auto">
          <p className="text-xs tracking-widest uppercase mb-3" style={{ color: '#C8873A' }}>
            Hablemos
          </p>
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(3rem, 8vw, 5.5rem)',
              color: '#F5EDD8',
              fontWeight: 700,
              lineHeight: 1.0,
              letterSpacing: '-0.02em',
            }}
          >
            CONTÁCTANOS
          </h1>
        </div>
      </div>

      {/* Proposals Banner */}
      <div className="px-4 py-12" style={{ background: '#0D0B08' }}>
        <div className="max-w-5xl mx-auto">
          <div
            className="rounded-2xl px-8 py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8"
            style={{ background: '#1A1712', border: '1px solid #2E2922' }}
          >
            <div className="flex-1">
              <p className="text-xs tracking-widest uppercase mb-3" style={{ color: '#C8873A' }}>
                Convocatoria abierta
              </p>
              <h2
                className="mb-4"
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
                  color: '#F5EDD8',
                  fontWeight: 600,
                  lineHeight: 1.2,
                }}
              >
                ¿Tienes un proyecto, taller,<br className="hidden md:block" /> curso o exposicion que proponer?
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: '#8A7E6C', maxWidth: '520px' }}>
                Nuestra Herencia es un espacio vivo. Si eres artista, colectivo, gestor cultural o tienes una idea que quieras compartir con nuestra comunidad, nos encantaria escucharte.
              </p>
            </div>
            <div className="shrink-0">
              <Link
                href="/contacto/propuesta"
                className="inline-block px-8 py-4 text-sm tracking-widest uppercase font-semibold transition-colors hover:bg-[#b57832]"
                style={{ background: '#C8873A', color: '#0D0B08' }}
              >
                Enviar propuesta
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
          {/* Form */}
          <div>
            <h2
              className="mb-8 text-2xl"
              style={{ fontFamily: "'Cormorant Garamond', serif", color: '#F5EDD8', fontWeight: 600 }}
            >
              Envíanos un mensaje
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div>
                <label className="block text-xs tracking-wider uppercase mb-1.5" style={{ color: '#8A7E6C' }}>
                  Nombre completo
                </label>
                <input
                  {...register('nombre', { required: 'Nombre requerido' })}
                  className="w-full px-4 py-3 text-sm outline-none"
                  style={{ background: '#1A1712', border: `1px solid ${errors.nombre ? '#E63B2E' : '#2E2922'}`, color: '#F5EDD8' }}
                  placeholder="Tu nombre"
                />
                {errors.nombre && <p className="text-xs mt-1" style={{ color: '#E63B2E' }}>{errors.nombre.message}</p>}
              </div>

              <div>
                <label className="block text-xs tracking-wider uppercase mb-1.5" style={{ color: '#8A7E6C' }}>
                  Email
                </label>
                <input
                  {...register('email', { required: 'Email requerido', pattern: { value: /\S+@\S+\.\S+/, message: 'Email inválido' } })}
                  type="email"
                  className="w-full px-4 py-3 text-sm outline-none"
                  style={{ background: '#1A1712', border: `1px solid ${errors.email ? '#E63B2E' : '#2E2922'}`, color: '#F5EDD8' }}
                  placeholder="tu@email.com"
                />
                {errors.email && <p className="text-xs mt-1" style={{ color: '#E63B2E' }}>{errors.email.message}</p>}
              </div>

              <div>
                <label className="block text-xs tracking-wider uppercase mb-1.5" style={{ color: '#8A7E6C' }}>
                  Asunto
                </label>
                <select
                  {...register('asunto', { required: 'Selecciona un asunto' })}
                  className="w-full px-4 py-3 text-sm outline-none"
                  style={{ background: '#1A1712', border: `1px solid ${errors.asunto ? '#E63B2E' : '#2E2922'}`, color: '#F5EDD8' }}
                >
                  <option value="">Selecciona un asunto</option>
                  {asuntos.map((a) => (
                    <option key={a} value={a}>{a}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs tracking-wider uppercase mb-1.5" style={{ color: '#8A7E6C' }}>
                  Mensaje
                </label>
                <textarea
                  {...register('mensaje', { required: 'Mensaje requerido', minLength: { value: 10, message: 'Mínimo 10 caracteres' } })}
                  rows={5}
                  className="w-full px-4 py-3 text-sm outline-none resize-none"
                  style={{ background: '#1A1712', border: `1px solid ${errors.mensaje ? '#E63B2E' : '#2E2922'}`, color: '#F5EDD8' }}
                  placeholder="¿En qué podemos ayudarte?"
                />
                {errors.mensaje && <p className="text-xs mt-1" style={{ color: '#E63B2E' }}>{errors.mensaje.message}</p>}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 text-sm tracking-widest uppercase font-semibold transition-colors hover:bg-[#b57832] disabled:opacity-60"
                style={{ background: '#C8873A', color: '#0D0B08' }}
              >
                {loading ? 'Enviando...' : 'Enviar Mensaje'}
              </button>
            </form>
          </div>

          {/* Info */}
          <div>
            <h2
              className="mb-8 text-2xl"
              style={{ fontFamily: "'Cormorant Garamond', serif", color: '#F5EDD8', fontWeight: 600 }}
            >
              Encuéntranos
            </h2>

            <div className="space-y-6 mb-10">
              {[
                { label: 'Dirección', value: 'Calle 10 #2-50\nLa Candelaria, Bogotá, Colombia' },
                { label: 'Horarios', value: 'Martes a Domingo\n9:00am – 8:00pm' },
                { label: 'Instagram', value: '@cafenuestraherencia' },
                { label: 'Email', value: 'info@nuestraherencia.co' },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className="text-xs tracking-widest uppercase mb-1" style={{ color: '#8A7E6C' }}>{label}</p>
                  <p className="text-sm whitespace-pre-line" style={{ color: '#F5EDD8' }}>{value}</p>
                </div>
              ))}
            </div>

            {/* Map placeholder */}
            <div
              className="relative rounded-2xl overflow-hidden flex items-center justify-center"
              style={{ height: '280px', background: '#1A1712', border: '1px solid #2E2922' }}
            >
              <div className="text-center">
                <p className="text-sm mb-1" style={{ color: '#F5EDD8' }}>La Candelaria, Bogotá</p>
                <p className="text-xs mb-4" style={{ color: '#8A7E6C' }}>Calle 10 #2-50</p>
                <a
                  href="https://maps.google.com/?q=La+Candelaria+Bogota+Colombia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 text-xs tracking-widest uppercase transition-colors hover:bg-[#b57832]"
                  style={{ background: '#C8873A', color: '#0D0B08' }}
                >
                  Ver en Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
