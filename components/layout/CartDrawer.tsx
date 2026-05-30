'use client'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { X, ShoppingBag, Minus, Plus, Trash2 } from 'lucide-react'
import { useCartStore, useCartTotal } from '@/store/cart'
import { formatCOP } from '@/lib/utils'

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, clearCart } = useCartStore()
  const total = useCartTotal()

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
          />

          {/* Drawer */}
          <motion.div
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-md flex flex-col"
            style={{ background: '#1A1712', borderLeft: '1px solid #2E2922' }}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-6 py-5"
              style={{ borderBottom: '1px solid #2E2922' }}
            >
              <h2
                className="text-lg tracking-widest uppercase"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: '#F5EDD8' }}
              >
                Mi Carrito
              </h2>
              <div className="flex items-center gap-3">
                {items.length > 0 && (
                  <button
                    onClick={clearCart}
                    className="text-xs tracking-wider uppercase transition-colors hover:text-[#E63B2E]"
                    style={{ color: '#8A7E6C' }}
                  >
                    Vaciar
                  </button>
                )}
                <button
                  onClick={closeCart}
                  className="p-1.5 rounded-full transition-colors hover:bg-white/5"
                  style={{ color: '#8A7E6C' }}
                  aria-label="Cerrar carrito"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                  <ShoppingBag size={48} style={{ color: '#2E2922' }} />
                  <p className="text-sm" style={{ color: '#8A7E6C' }}>
                    Tu carrito está vacío
                  </p>
                  <Link
                    href="/galeria"
                    onClick={closeCart}
                    className="text-sm tracking-wider uppercase transition-colors hover:text-[#C8873A]"
                    style={{ color: '#F5EDD8' }}
                  >
                    Explorar galería →
                  </Link>
                </div>
              ) : (
                <ul className="space-y-4">
                  {items.map((item) => (
                    <li
                      key={`${item.id}-${item.variant}`}
                      className="flex gap-4 py-4"
                      style={{ borderBottom: '1px solid #2E2922' }}
                    >
                      {/* Image */}
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                          unoptimized={item.image.includes('unsplash.com')}
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate" style={{ color: '#F5EDD8' }}>
                          {item.name}
                        </p>
                        {item.variant && (
                          <p className="text-xs mt-0.5" style={{ color: '#8A7E6C' }}>
                            {item.variant}
                          </p>
                        )}
                        <p className="text-sm mt-1" style={{ color: '#C8873A' }}>
                          {formatCOP(item.price * item.quantity)}
                        </p>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-6 h-6 flex items-center justify-center rounded transition-colors hover:bg-white/5"
                            style={{ color: '#8A7E6C', border: '1px solid #2E2922' }}
                          >
                            <Minus size={12} />
                          </button>
                          <span className="text-sm w-6 text-center" style={{ color: '#F5EDD8' }}>
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-6 h-6 flex items-center justify-center rounded transition-colors hover:bg-white/5"
                            style={{ color: '#8A7E6C', border: '1px solid #2E2922' }}
                          >
                            <Plus size={12} />
                          </button>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="ml-auto p-1 transition-colors hover:text-[#E63B2E]"
                            style={{ color: '#8A7E6C' }}
                            aria-label="Eliminar"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="px-6 py-5" style={{ borderTop: '1px solid #2E2922' }}>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm tracking-wider uppercase" style={{ color: '#8A7E6C' }}>
                    Total
                  </span>
                  <span
                    className="text-xl font-bold"
                    style={{ fontFamily: "'Cormorant Garamond', serif", color: '#F5EDD8' }}
                  >
                    {formatCOP(total)}
                  </span>
                </div>
                <Link href="/checkout" onClick={closeCart}>
                  <button
                    className="w-full py-4 text-sm tracking-widest uppercase font-semibold transition-colors hover:bg-[#b57832]"
                    style={{ background: '#C8873A', color: '#0D0B08' }}
                  >
                    Ir al Checkout
                  </button>
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
