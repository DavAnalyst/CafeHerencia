'use client'
import Image from 'next/image'
import { toast } from 'sonner'
import { type CafeProduct } from '@/data/cafe-products'
import { useCartStore } from '@/store/cart'
import { formatCOP } from '@/lib/utils'

interface CafeProductCardProps {
  product: CafeProduct
}

const roastColors: Record<string, string> = {
  'Claro': '#4A8B5C',
  'Medio-claro': '#8BC83A',
  'Medio': '#C8873A',
  'Medio-oscuro': '#E63B2E',
}

const processColors: Record<string, string> = {
  'Lavado': '#6B8EC8',
  'Natural': '#C87A3A',
  'Honey': '#C8B83A',
  'Anaeróbico': '#9B7EC8',
}

export default function CafeProductCard({ product }: CafeProductCardProps) {
  const { addItem, openCart } = useCartStore()

  const handleAdd = () => {
    addItem({
      id: product.id,
      type: 'coffee',
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.imageUrl,
      variant: product.weight,
    })
    openCart()
    toast.success(`"${product.name}" añadido al carrito`)
  }

  const roastColor = roastColors[product.roast] || '#C8873A'
  const processColor = processColors[product.process] || '#C8873A'

  return (
    <div
      className="flex flex-col rounded-2xl overflow-hidden transition-all duration-300 hover:translate-y-[-2px]"
      style={{
        background: '#1A1712',
        border: product.subscription ? '1px solid #C8873A' : '1px solid #2E2922',
        boxShadow: product.subscription ? '0 0 20px rgba(200,135,58,0.15)' : 'none',
      }}
    >
      {/* Product image */}
      <div className="relative h-56 overflow-hidden" style={{ background: '#221F1A' }}>
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-contain transition-transform duration-500 hover:scale-105 p-4"
          unoptimized
        />
        {product.subscription && (
          <div className="absolute top-3 left-3">
            <span
              className="px-2 py-1 text-[10px] tracking-widest uppercase font-bold"
              style={{ background: '#C8873A', color: '#0D0B08' }}
            >
              Más Popular
            </span>
          </div>
        )}
        <div className="absolute top-3 right-3 flex flex-col gap-1 items-end">
          <span
            className="px-2 py-1 text-[10px] tracking-widest uppercase"
            style={{ background: `${roastColor}CC`, color: '#0D0B08' }}
          >
            {product.roast}
          </span>
          <span
            className="px-2 py-1 text-[10px] tracking-widest uppercase"
            style={{ background: `${processColor}CC`, color: '#0D0B08' }}
          >
            {product.process}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="px-5 pt-4 pb-5 flex flex-col flex-1">
        {/* Name */}
        <h3
          className="mb-1"
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: '1.6rem',
            color: '#F5EDD8',
            fontWeight: 600,
          }}
        >
          {product.name}
        </h3>

        {/* Origin */}
        <p className="text-xs tracking-wider uppercase mb-3" style={{ color: '#8A7E6C' }}>
          {product.origin} · {product.region}
        </p>

        {/* Flavor notes */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {product.notes.map((note) => (
            <span
              key={note}
              className="px-2 py-0.5 text-xs rounded-full"
              style={{ background: '#221F1A', color: '#8A7E6C', border: '1px solid #2E2922' }}
            >
              {note}
            </span>
          ))}
        </div>

        {/* Description */}
        <p className="text-sm leading-relaxed mb-4 flex-1" style={{ color: '#8A7E6C' }}>
          {product.description}
        </p>

        {/* Footer */}
        <div style={{ borderTop: '1px solid #2E2922', paddingTop: '1rem', marginTop: 'auto' }}>
          <div className="flex items-end justify-between mb-4">
            <div>
              <p className="text-xs tracking-widest uppercase mb-1" style={{ color: '#8A7E6C' }}>
                {product.subscription ? 'por mes' : product.weight}
              </p>
              <p
                className="text-2xl font-bold"
                style={{ fontFamily: "'Cormorant Garamond', serif", color: '#F5EDD8' }}
              >
                {formatCOP(product.price)}
              </p>
            </div>
          </div>

          <button
            onClick={handleAdd}
            className="w-full py-3 text-sm tracking-widest uppercase font-semibold transition-colors hover:bg-[#b57832] active:scale-95"
            style={{ background: '#C8873A', color: '#0D0B08' }}
          >
            {product.subscription ? 'Suscribirme' : 'Descubrir'}
          </button>
        </div>
      </div>
    </div>
  )
}
