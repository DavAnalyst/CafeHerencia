'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import Link from 'next/link'

type FormData = {
  nombre: string
  email: string
  tipo: string
  titulo: string
  descripcion: string
  web: string
}

const tipos = [
  'Exposición de arte',
  'Taller',
  'Curso',
  'Proyecto cultural',
  'Colaboración artística',
  'Evento musical o performativo',
  'Otro',
]

export default function PropuestaPage() {
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>()

  const onSubmit = (_data: FormData) => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSent(true)
      toast.success('¡Propuesta enviada! Te contactaremos pronto.')
    }, 1200)
  }

  return (
    <div style={{ background: '#0D0B08', minHeight: '100vh' }}>
      {/* Header */}
      <div
        className="pt-32 pb-14 px-4"
        style={{ borderBottom: '1px solid #2E2922', background: 'linear-gradient(to bottom, #1A1712, #0D0B08)' }}
      >
        <div className="max-w-3xl mx-auto">
          <Link
            href="/contacto"
            className="inline-flex items-center gap-2 text-xs tracking-widest uppercase mb-6 transition-colors hover:text-[#C8873A]"
            style={{ color: '#8A7E6C' }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 5l-7 7 7 7"/>
            </svg>
            Volver a Contacto
          </Link>
          <p className="text-xs tracking-widest uppercase mb-3" style={{ color: '#C8873A' }}>
            Convocatoria abierta
          </p>
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(2.5rem, 7vw, 4.5rem)',
              color: '#F5EDD8',
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
            }}
          >
            Envía tu propuesta
          </h1>
          <p className="mt-4 text-sm leading-relaxed" style={{ color: '#8A7E6C', maxWidth: '500px' }}>
            Cuéntanos tu idea. Revisamos cada propuesta con atención y te respondemos en un plazo de 5 días hábiles.
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-3xl mx-auto px-4 py-16">
        {sent ? (
          <div
            className="rounded-2xl px-8 py-16 text-center"
            style={{ background: '#1A1712', border: '1px solid #2E2922' }}
          >
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{ background: '#C8873A20', border: '1px solid #C8873A40' }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C8873A" strokeWidth="2">
                <path d="M20 6L9 17l-5-5"/>
              </svg>
            </div>
            <h2
              className="mb-3 text-2xl"
              style={{ fontFamily: "'Cormorant Garamond', serif", color: '#F5EDD8', fontWeight: 600 }}
            >
              Propuesta recibida
            </h2>
            <p className="text-sm mb-8" style={{ color: '#8A7E6C' }}>
              Gracias por compartir tu idea con nosotros. Te contactaremos pronto.
            </p>
            <Link
              href="/contacto"
              className="inline-block px-8 py-3 text-sm tracking-widest uppercase transition-colors hover:bg-[#b57832]"
              style={{ background: '#C8873A', color: '#0D0B08' }}
            >
              Volver
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs tracking-wider uppercase mb-1.5" style={{ color: '#8A7E6C' }}>
                  Nombre completo
                </label>
                <input
                  {...register('nombre', { required: 'Requerido' })}
                  className="w-full px-4 py-3 text-sm outline-none"
                  style={{ background: '#1A1712', border: `1px solid ${errors.nombre ? '#E63B2E' : '#2E2922'}`, color: '#F5EDD8' }}
                  placeholder="Tu nombre"
                />
                {errors.nombre && <p className="text-xs mt-1" style={{ color: '#E63B2E' }}>{errors.nombre.message}</p>}
              </div>

              <div>
                <label className="block text-xs tracking-wider uppercase mb-1.5" style={{ color: '#8A7E6C' }}>
                  Email de contacto
                </label>
                <input
                  {...register('email', { required: 'Requerido', pattern: { value: /\S+@\S+\.\S+/, message: 'Email inválido' } })}
                  type="email"
                  className="w-full px-4 py-3 text-sm outline-none"
                  style={{ background: '#1A1712', border: `1px solid ${errors.email ? '#E63B2E' : '#2E2922'}`, color: '#F5EDD8' }}
                  placeholder="tu@email.com"
                />
                {errors.email && <p className="text-xs mt-1" style={{ color: '#E63B2E' }}>{errors.email.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs tracking-wider uppercase mb-1.5" style={{ color: '#8A7E6C' }}>
                  Tipo de propuesta
                </label>
                <select
                  {...register('tipo', { required: 'Requerido' })}
                  className="w-full px-4 py-3 text-sm outline-none"
                  style={{ background: '#1A1712', border: `1px solid ${errors.tipo ? '#E63B2E' : '#2E2922'}`, color: '#F5EDD8' }}
                >
                  <option value="">Selecciona una categoria</option>
                  {tipos.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
                {errors.tipo && <p className="text-xs mt-1" style={{ color: '#E63B2E' }}>{errors.tipo.message}</p>}
              </div>

              <div>
                <label className="block text-xs tracking-wider uppercase mb-1.5" style={{ color: '#8A7E6C' }}>
                  Titulo del proyecto
                </label>
                <input
                  {...register('titulo', { required: 'Requerido' })}
                  className="w-full px-4 py-3 text-sm outline-none"
                  style={{ background: '#1A1712', border: `1px solid ${errors.titulo ? '#E63B2E' : '#2E2922'}`, color: '#F5EDD8' }}
                  placeholder="Nombre de tu propuesta"
                />
                {errors.titulo && <p className="text-xs mt-1" style={{ color: '#E63B2E' }}>{errors.titulo.message}</p>}
              </div>
            </div>

            <div>
              <label className="block text-xs tracking-wider uppercase mb-1.5" style={{ color: '#8A7E6C' }}>
                Descripcion de la propuesta
              </label>
              <textarea
                {...register('descripcion', { required: 'Requerido', minLength: { value: 30, message: 'Minimo 30 caracteres' } })}
                rows={6}
                className="w-full px-4 py-3 text-sm outline-none resize-none"
                style={{ background: '#1A1712', border: `1px solid ${errors.descripcion ? '#E63B2E' : '#2E2922'}`, color: '#F5EDD8' }}
                placeholder="Cuéntanos de qué trata tu propuesta, qué necesitas del espacio, fechas estimadas, materiales, etc."
              />
              {errors.descripcion && <p className="text-xs mt-1" style={{ color: '#E63B2E' }}>{errors.descripcion.message}</p>}
            </div>

            <div>
              <label className="block text-xs tracking-wider uppercase mb-1.5" style={{ color: '#8A7E6C' }}>
                Portafolio o sitio web <span style={{ color: '#4A3A2A' }}>(opcional)</span>
              </label>
              <input
                {...register('web')}
                className="w-full px-4 py-3 text-sm outline-none"
                style={{ background: '#1A1712', border: '1px solid #2E2922', color: '#F5EDD8' }}
                placeholder="https://tuportafolio.com"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 text-sm tracking-widest uppercase font-semibold transition-colors hover:bg-[#b57832] disabled:opacity-60"
                style={{ background: '#C8873A', color: '#0D0B08' }}
              >
                {loading ? 'Enviando...' : 'Enviar propuesta'}
              </button>
              <p className="text-xs text-center mt-4" style={{ color: '#4A3A2A' }}>
                Respondemos en un plazo de 5 dias habiles
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
