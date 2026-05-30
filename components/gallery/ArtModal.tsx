'use client'
import Image from 'next/image'
import { toast } from 'sonner'
import { Modal } from '@/components/ui/Modal'
import { type ArtProduct, artProducts } from '@/data/art-products'
import { useCartStore } from '@/store/cart'
import { formatCOP, formatUSD } from '@/lib/utils'

interface ArtModalProps {
  product: ArtProduct | null
  onClose: () => void
}

const categoryLabels: Record<string, string> = {
  mural: 'Mural',
  ilustracion: 'Ilustración',
  fotografia: 'Fotografía',
  artesania: 'Artesanía',
  print: 'Print',
}

export default function ArtModal({ product, onClose }: ArtModalProps) {
  const { addItem, openCart } = useCartStore()

  if (!product) return null

  const related = artProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3)

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      type: 'art',
      name: product.title,
      price: product.price,
      quantity: 1,
      image: product.imageUrl,
    })
    openCart()
    toast.success(`"${product.title}" añadido al carrito`)
    onClose()
  }

  return (
    <Modal isOpen={!!product} onClose={onClose} size="xl">
      <div className="flex flex-col lg:flex-row min-h-0">
        {/* Image */}
        <div className="relative lg:w-1/2 min-h-[300px] lg:min-h-[500px]">
          <Image
            src={product.imageUrl}
            alt={product.title}
            fill
            className="object-cover rounded-t-2xl lg:rounded-l-2xl lg:rounded-tr-none"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20 rounded-t-2xl lg:rounded-l-2xl lg:rounded-tr-none" />
        </div>

        {/* Details */}
        <div className="lg:w-1/2 p-8 flex flex-col">
          {/* Category */}
          <span
            className="inline-block mb-3 px-2 py-1 text-[10px] tracking-widest uppercase self-start"
            style={{ background: '#C8873A20', color: '#C8873A', border: '1px solid #C8873A40' }}
          >
            {categoryLabels[product.category]}
          </span>

          {/* Artist */}
          <p className="text-sm tracking-wider uppercase mb-2" style={{ color: '#8A7E6C' }}>
            {product.artist}
          </p>

          {/* Title */}
          <h2
            className="mb-3"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
              color: '#F5EDD8',
              fontWeight: 600,
              lineHeight: 1.2,
            }}
          >
            {product.title}
          </h2>

          {/* Bio */}
          <p className="text-sm leading-relaxed mb-5" style={{ color: '#8A7E6C' }}>
            {product.bio}
          </p>

          {/* Details grid */}
          <div
            className="grid grid-cols-2 gap-3 p-4 rounded-xl mb-6"
            style={{ background: '#221F1A', border: '1px solid #2E2922' }}
          >
            {[
              { label: 'Técnica', value: product.technique },
              { label: 'Dimensiones', value: product.dimensions },
              { label: 'Año', value: product.year.toString() },
              { label: 'Estado', value: product.available ? 'Disponible' : 'En exhibición' },
            ].map(({ label, value }) => (
              <div key={label}>
                <p className="text-[10px] tracking-widest uppercase mb-1" style={{ color: '#8A7E6C' }}>
                  {label}
                </p>
                <p className="text-sm" style={{ color: '#F5EDD8' }}>
                  {value}
                </p>
              </div>
            ))}
          </div>

          {/* Price */}
          <div className="mb-6">
            <p
              className="text-3xl font-bold mb-1"
              style={{ fontFamily: "'Cormorant Garamond', serif", color: '#F5EDD8' }}
            >
              {formatCOP(product.price)}
            </p>
            <p className="text-sm" style={{ color: '#8A7E6C' }}>
              ≈ {formatUSD(product.price)} USD · Envío a todo el mundo
            </p>
          </div>

          {/* CTA */}
          {product.available ? (
            <button
              onClick={handleAddToCart}
              className="w-full py-4 text-sm tracking-widest uppercase font-semibold transition-colors hover:bg-[#b57832] active:scale-95 mb-3"
              style={{ background: '#C8873A', color: '#0D0B08' }}
            >
              Llevar esta obra a casa
            </button>
          ) : (
            <div
              className="w-full py-4 text-sm tracking-widest uppercase text-center mb-3"
              style={{ background: '#2E2922', color: '#8A7E6C' }}
            >
              En exhibición — no disponible para venta
            </div>
          )}

          {/* Related */}
          {related.length > 0 && (
            <div>
              <p className="text-xs tracking-widest uppercase mb-3" style={{ color: '#8A7E6C' }}>
                Obras relacionadas
              </p>
              <div className="flex gap-3">
                {related.map((r) => (
                  <div
                    key={r.id}
                    className="relative w-20 h-20 rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
                  >
                    <Image
                      src={r.imageUrl}
                      alt={r.title}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Modal>
  )
}
