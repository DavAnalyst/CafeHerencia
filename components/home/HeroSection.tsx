'use client'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=1920&q=80&fit=crop'

export default function HeroSection() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background — real photo from Google Maps */}
      <Image
        src={HERO_IMAGE}
        alt="Café Galería Herencia, La Candelaria, Bogotá"
        fill
        className="object-cover"
        priority
        unoptimized
      />
      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-[#0D0B08]" />
      <div className="absolute inset-0" style={{ background: 'rgba(13,11,8,0.35)' }} />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full text-xs tracking-widest uppercase"
          style={{ border: '1px solid #C8873A40', color: '#C8873A', background: '#C8873A10' }}
        >
          TIME World&apos;s Greatest Places 2025
        </motion.div>

        {/* Title */}
        <h1 className="mb-6" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
          {['CAFÉ GALERÍA', 'HERENCIA'].map((line, lineIndex) => (
            <div key={line} className="overflow-hidden">
              <motion.span
                className="block"
                initial={{ y: 80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  delay: 0.4 + lineIndex * 0.15,
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{
                  fontSize: 'clamp(3.5rem, 10vw, 7.5rem)',
                  lineHeight: 1.0,
                  fontWeight: 700,
                  color: '#F5EDD8',
                  letterSpacing: '-0.02em',
                }}
              >
                {line}
              </motion.span>
            </div>
          ))}
        </h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mb-10 text-sm sm:text-base tracking-widest uppercase"
          style={{ color: '#8A7E6C' }}
        >
          Casa Cultural · Galería · Café de Origen · La Candelaria, Bogotá
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/galeria">
            <button
              className="px-8 py-4 text-sm tracking-widest uppercase font-semibold transition-all hover:bg-[#b57832] active:scale-95"
              style={{ background: '#C8873A', color: '#0D0B08' }}
            >
              Explorar Obras de Arte
            </button>
          </Link>
          <Link href="/cafe">
            <button
              className="px-8 py-4 text-sm tracking-widest uppercase font-semibold transition-all hover:bg-white/10 active:scale-95"
              style={{ border: '1px solid #F5EDD850', color: '#F5EDD8' }}
            >
              Ver Productos Café de Origen
            </button>
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        style={{ color: '#8A7E6C' }}
      >
        <ChevronDown size={24} />
      </motion.div>
    </section>
  )
}
