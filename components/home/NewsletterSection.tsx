'use client'
import { useState } from 'react'
import { toast } from 'sonner'

export default function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.includes('@')) {
      toast.error('Por favor ingresa un email válido')
      return
    }
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setEmail('')
      toast.success('¡Bienvenida a la comunidad! Pronto recibirás noticias.')
    }, 1000)
  }

  return (
    <section
      className="py-24 px-4 relative overflow-hidden"
      style={{
        background: '#1A1712',
        backgroundImage:
          'radial-gradient(ellipse at 30% 50%, rgba(200,135,58,0.06) 0%, transparent 60%), radial-gradient(ellipse at 70% 50%, rgba(74,139,92,0.04) 0%, transparent 60%)',
      }}
    >
      {/* Decorative texture */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C8873A' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="max-w-2xl mx-auto text-center relative z-10">
        <p className="text-xs tracking-widest uppercase mb-4" style={{ color: '#C8873A' }}>
          La comunidad
        </p>
        <h2
          className="mb-4"
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            color: '#F5EDD8',
            fontWeight: 600,
          }}
        >
          Únete a la Comunidad
        </h2>
        <p className="mb-10 text-base leading-relaxed" style={{ color: '#8A7E6C' }}>
          Recibe primero las nuevas exhibiciones, eventos y el café especial del mes.
          <br />
          Sin spam. Solo arte y cultura colombiana.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@email.com"
            className="flex-1 px-5 py-4 text-sm outline-none"
            style={{
              background: '#221F1A',
              border: '1px solid #2E2922',
              color: '#F5EDD8',
            }}
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-4 text-sm tracking-widest uppercase font-semibold transition-colors hover:bg-[#b57832] disabled:opacity-60"
            style={{ background: '#C8873A', color: '#0D0B08', whiteSpace: 'nowrap' }}
          >
            {loading ? 'Enviando...' : 'Suscribirme'}
          </button>
        </form>

        <p className="mt-4 text-xs" style={{ color: '#8A7E6C' }}>
          Más de 2.000 amantes del arte ya están suscritos
        </p>
      </div>
    </section>
  )
}
