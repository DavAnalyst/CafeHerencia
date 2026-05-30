'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ShoppingBag, Menu, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useCartStore, useCartCount } from '@/store/cart'

const navLinks = [
  { href: '/', label: 'Inicio' },
  { href: '/galeria', label: 'Galería' },
  { href: '/cafe', label: 'Café' },
  { href: '/eventos', label: 'Eventos y Talleres' },
  { href: '/nosotros', label: 'Nosotros' },
  { href: '/contacto', label: 'Contacto' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()
  const toggleCart = useCartStore((s) => s.toggleCart)
  const count = useCartCount()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(13,11,8,0.97)' : 'transparent',
        borderBottom: scrolled ? '1px solid #2E2922' : '1px solid transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[72px] flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span
            className="text-lg font-bold tracking-widest uppercase"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: '#F5EDD8', letterSpacing: '0.15em' }}
          >
            Nuestra Herencia
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm tracking-wider uppercase transition-colors duration-200"
              style={{
                color: pathname === link.href ? '#C8873A' : '#8A7E6C',
                fontFamily: "'DM Sans', system-ui, sans-serif",
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleCart}
            className="relative p-2 rounded-full transition-colors hover:bg-white/5"
            aria-label="Abrir carrito"
            style={{ color: '#F5EDD8' }}
          >
            <ShoppingBag size={22} />
            {count > 0 && (
              <motion.span
                key={count}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold"
                style={{ background: '#C8873A', color: '#0D0B08' }}
              >
                {count > 9 ? '9+' : count}
              </motion.span>
            )}
          </button>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-full transition-colors hover:bg-white/5"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
            style={{ color: '#F5EDD8' }}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden"
            style={{ background: 'rgba(13,11,8,0.98)', borderTop: '1px solid #2E2922' }}
          >
            <div className="px-4 py-6 flex flex-col gap-4">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    className="block text-base tracking-wider uppercase py-2 transition-colors"
                    style={{
                      color: pathname === link.href ? '#C8873A' : '#F5EDD8',
                    }}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
