'use client'
import { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'

const U = (id: string) => `https://images.unsplash.com/${id}?w=800&q=80&fit=crop`

const IMG_CACAO_TALLER = U('photo-1509042239860-f550ce710b93')
const IMG_SERIGRAFIA   = U('photo-1558618666-fcd25c85cd64')
const IMG_ABASTO       = 'https://images.unsplash.com/photo-1530406831759-15c5c0cbce8b?w=800&q=80&fit=crop'

const blocks = [
  {
    tag: 'Nuestros orígenes',
    title: 'Nació como un café',
    text: 'Lo que comenzó como un sueño en una esquina de La Candelaria hoy es un epicentro de transformación cultural. Edwar Ordóñez abrió las puertas de este espacio sabiendo que el arte y el café compartían algo en común: la capacidad de reunir personas y cambiar su día.',
    image: IMG_CACAO_TALLER,
    alt: 'Taller de arte y cacao en Café Galería Herencia',
    reversed: false,
  },
  {
    tag: 'La comunidad',
    title: '60+ artistas representados',
    text: 'Más de 60 artistas callejeros colombianos han encontrado aquí su primera sala de exhibición. Cada mes rotamos las obras para dar visibilidad a nuevas voces. Aquí, el arte urbano sale de la calle y entra al mundo.',
    image: IMG_SERIGRAFIA,
    alt: 'Serigrafía y arte impreso de artistas en Café Galería Herencia',
    reversed: true,
  },
  {
    tag: 'Nuestra filosofía',
    title: 'Una fuerza de paz',
    text: '"El arte no decora espacios. El arte transforma vidas, pensamientos y comunidades enteras."',
    isQuote: true,
    quoteAuthor: '— Edwar Ordóñez, Fundador',
    image: IMG_ABASTO,
    alt: 'El Abasto Nacional — arte colombiano que honra la dignidad campesina',
    reversed: false,
  },
]

function StoryBlock({ block }: { block: (typeof blocks)[0] }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <div
      ref={ref}
      className={`flex flex-col ${block.reversed ? 'md:flex-row-reverse' : 'md:flex-row'} gap-12 lg:gap-20 items-center`}
    >
      {/* Image */}
      <motion.div
        className="w-full md:w-1/2"
        initial={{ opacity: 0, x: block.reversed ? 40 : -40 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.1 }}
      >
        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
          <Image src={block.image} alt={block.alt} fill className="object-cover" unoptimized />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        </div>
      </motion.div>

      {/* Text */}
      <motion.div
        className="w-full md:w-1/2"
        initial={{ opacity: 0, x: block.reversed ? -40 : 40 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <p
          className="text-xs tracking-widest uppercase mb-3"
          style={{ color: '#C8873A' }}
        >
          {block.tag}
        </p>
        <h2
          className="mb-6"
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 600,
            color: '#F5EDD8',
            lineHeight: 1.2,
          }}
        >
          {block.title}
        </h2>
        {block.isQuote ? (
          <>
            <blockquote
              className="text-lg leading-relaxed italic mb-4"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: '#F5EDD8', fontSize: '1.4rem' }}
            >
              {block.text}
            </blockquote>
            <p className="text-sm tracking-wide" style={{ color: '#8A7E6C' }}>
              {block.quoteAuthor}
            </p>
          </>
        ) : (
          <p className="text-base leading-relaxed" style={{ color: '#8A7E6C' }}>
            {block.text}
          </p>
        )}

        {/* Decorative line */}
        <div className="mt-8 w-16 h-0.5" style={{ background: '#C8873A' }} />
      </motion.div>
    </div>
  )
}

export default function StorySection() {
  return (
    <section className="py-24 lg:py-32 px-4" style={{ background: '#0D0B08' }}>
      <div className="max-w-6xl mx-auto space-y-28">
        {blocks.map((block, i) => (
          <StoryBlock key={i} block={block} />
        ))}
      </div>
    </section>
  )
}
