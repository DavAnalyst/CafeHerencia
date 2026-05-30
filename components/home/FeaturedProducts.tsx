'use client'
import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { artProducts } from '@/data/art-products'
import { useCartStore } from '@/store/cart'
import { formatCOP } from '@/lib/utils'
import { toast } from 'sonner'

const coffeeItems = [
  {
    id: 'cafe-1',
    name: 'Herencia Especial',
    subtitle: 'Huila · Proceso Lavado',
    price: 45000,
    image: 'https://images.unsplash.com/photo-1605711599412-775918dbe770?w=600&h=750&fit=crop&q=80',
    tag: 'Café',
  },
  {
    id: 'cafe-2',
    name: 'Candelaria Blend',
    subtitle: 'Nariño + Huila · Natural',
    price: 52000,
    image: 'https://images.unsplash.com/photo-1512372388054-a322888e67a6?w=600&h=750&fit=crop&q=80',
    tag: 'Café',
  },
]

export default function FeaturedProducts() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const { addItem, openCart } = useCartStore()

  const featuredArt = artProducts.filter((p) => p.featured).slice(0, 2)

  const allItems = [
    ...featuredArt.map((p) => ({
      id: p.id,
      name: p.title,
      subtitle: `${p.artist} · ${p.technique}`,
      price: p.price,
      image: p.imageUrl,
      tag: 'Arte',
    })),
    ...coffeeItems,
  ]

  const handleAdd = (item: (typeof allItems)[0]) => {
    addItem({
      id: item.id,
      type: item.tag === 'Arte' ? 'art' : 'coffee',
      name: item.name,
      price: item.price,
      quantity: 1,
      image: item.image,
    })
    openCart()
    toast.success(`"${item.name}" añadido al carrito`)
  }

  return (
    <section className="py-24 px-4" ref={ref} style={{ background: '#0D0B08' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="mb-12 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4"
        >
          <div>
            <p className="text-xs tracking-widest uppercase mb-2" style={{ color: '#C8873A' }}>
              Selección de la semana
            </p>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                color: '#F5EDD8',
                fontWeight: 600,
              }}
            >
              Recomendados de la semana
            </h2>
          </div>
          <div className="flex gap-4">
            <Link href="/galeria">
              <span className="text-sm tracking-wider hover:text-[#C8873A] transition-colors" style={{ color: '#8A7E6C' }}>
                Ver toda la galería →
              </span>
            </Link>
          </div>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {allItems.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              className="group relative aspect-[3/4] rounded-xl overflow-hidden cursor-pointer"
              onClick={() => handleAdd(item)}
            >
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                unoptimized
              />

              {/* Tag */}
              <div className="absolute top-3 left-3">
                <span
                  className="px-2 py-1 text-[10px] tracking-widest uppercase"
                  style={{
                    background: item.tag === 'Arte' ? '#C8873A' : '#4A8B5C',
                    color: '#0D0B08',
                  }}
                >
                  {item.tag}
                </span>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-5">
                <p className="text-xs tracking-widest uppercase mb-1" style={{ color: '#C8873A' }}>
                  {item.subtitle}
                </p>
                <p
                  className="text-lg font-semibold mb-2"
                  style={{ fontFamily: "'Cormorant Garamond', serif", color: '#F5EDD8' }}
                >
                  {item.name}
                </p>
                <p className="text-base font-bold mb-3" style={{ color: '#F5EDD8' }}>
                  {formatCOP(item.price)}
                </p>
                <span
                  className="text-xs tracking-widest uppercase py-2 px-4 text-center"
                  style={{ background: '#C8873A', color: '#0D0B08' }}
                >
                  Llevar a casa
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
