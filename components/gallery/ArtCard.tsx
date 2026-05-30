'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { type ArtProduct } from '@/data/art-products'
import { formatCOP } from '@/lib/utils'

interface ArtCardProps {
  product: ArtProduct
  onClick: () => void
  index: number
}

const categoryLabels: Record<string, string> = {
  mural: 'Mural',
  ilustracion: 'Ilustración',
  fotografia: 'Fotografía',
  artesania: 'Artesanía',
  print: 'Print',
}

export default function ArtCard({ product, onClick, index }: ArtCardProps) {
  return (
    <motion.div
      className="masonry-item group cursor-pointer"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: (index % 6) * 0.07, duration: 0.5 }}
      onClick={onClick}
    >
      <div className="relative overflow-hidden rounded-xl" style={{ border: '1px solid #2E2922' }}>
        {/* Image with natural aspect ratio */}
        <div className="relative">
          <Image
            src={product.imageUrl}
            alt={product.title}
            width={600}
            height={index % 3 === 0 ? 750 : index % 3 === 1 ? 500 : 650}
            className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
            unoptimized
          />
        </div>

        {/* Status badge */}
        <div className="absolute top-3 left-3">
          <span
            className="px-2 py-1 text-[10px] tracking-widest uppercase"
            style={{
              background: product.available ? '#4A8B5C' : '#C8873A',
              color: '#0D0B08',
            }}
          >
            {product.available ? 'Disponible' : 'Exhibición'}
          </span>
        </div>

        {/* Hover overlay */}
        <div
          className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-all duration-300"
          style={{ background: 'linear-gradient(to top, rgba(13,11,8,0.95) 40%, transparent)' }}
        >
          <p className="text-xs tracking-widest uppercase mb-1" style={{ color: '#C8873A' }}>
            {product.artist} · {categoryLabels[product.category]}
          </p>
          <p
            className="text-lg font-semibold mb-1"
            style={{ fontFamily: "'Cormorant Garamond', serif", color: '#F5EDD8' }}
          >
            {product.title}
          </p>
          <p className="text-base font-bold" style={{ color: '#F5EDD8' }}>
            {formatCOP(product.price)}
          </p>
          <p className="mt-3 text-xs tracking-widest uppercase" style={{ color: '#C8873A' }}>
            Ver detalle →
          </p>
        </div>
      </div>
    </motion.div>
  )
}
