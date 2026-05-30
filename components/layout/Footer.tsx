import Link from 'next/link'

const navCol = [
  { label: 'Galería', href: '/galeria' },
  { label: 'Café', href: '/cafe' },
  { label: 'Eventos y Talleres', href: '/eventos' },
  { label: 'Nosotros', href: '/nosotros' },
]

const shopCol = [
  { label: 'Arte Original', href: '/galeria' },
  { label: 'Prints', href: '/galeria' },
  { label: 'Café de Origen', href: '/cafe' },
  { label: 'Suscripción Mensual', href: '/cafe' },
]

export default function Footer() {
  return (
    <footer style={{ background: '#0D0B08', borderTop: '1px solid #2E2922' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="mb-4">
              <h3
                className="mt-2 text-xl font-bold tracking-widest uppercase"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: '#F5EDD8' }}
              >
                Nuestra Herencia
              </h3>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: '#8A7E6C' }}>
              El arte transforma vidas, pensamientos y comunidades enteras.
            </p>
            <p className="mt-4 text-xs tracking-widest uppercase" style={{ color: '#C8873A' }}>
              TIME World's Greatest Places 2025
            </p>
          </div>

          {/* Explorar */}
          <div>
            <h4 className="mb-4 text-xs tracking-widest uppercase" style={{ color: '#8A7E6C' }}>
              Explorar
            </h4>
            <ul className="space-y-3">
              {navCol.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm transition-colors hover:text-[#C8873A]"
                    style={{ color: '#F5EDD8' }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tienda */}
          <div>
            <h4 className="mb-4 text-xs tracking-widest uppercase" style={{ color: '#8A7E6C' }}>
              Tienda
            </h4>
            <ul className="space-y-3">
              {shopCol.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm transition-colors hover:text-[#C8873A]"
                    style={{ color: '#F5EDD8' }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="mb-4 text-xs tracking-widest uppercase" style={{ color: '#8A7E6C' }}>
              Contacto
            </h4>
            <ul className="space-y-3 text-sm" style={{ color: '#F5EDD8' }}>
              <li>Calle 10 #2-50, La Candelaria<br />Bogotá, Colombia</li>
              <li>Mar–Dom 9:00am – 8:00pm</li>
              <li>
                <a
                  href="https://instagram.com/cafenuestraherencia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#C8873A] transition-colors"
                >
                  @cafenuestraherencia
                </a>
              </li>
              <li style={{ color: '#8A7E6C' }}>info@nuestraherencia.co</li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div
          className="mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs"
          style={{ borderTop: '1px solid #2E2922', color: '#8A7E6C' }}
        >
          <p>© 2026 Casa Cultural Nuestra Herencia · La Candelaria, Bogotá · Envíos a todo el mundo</p>
          <p className="text-center" style={{ color: '#4A8B5C' }}>
            Pasarela de pagos en modo demo — ningún cobro real será procesado
          </p>
        </div>
      </div>
    </footer>
  )
}
