'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useCartStore } from '@/store/cart'

export default function CheckoutSuccessPage() {
  const [orderId, setOrderId] = useState('')
  const clearCart = useCartStore((s) => s.clearCart)

  useEffect(() => {
    clearCart()
    const id = sessionStorage.getItem('lastOrderId') ||
      'NH-' + Math.random().toString(36).substring(2, 8).toUpperCase()
    setOrderId(id)
  }, [clearCart])

  const steps = [
    { step: 1, label: 'Pedido recibido', done: true },
    { step: 2, label: 'En preparación', done: false },
    { step: 3, label: 'En camino', done: false },
    { step: 4, label: 'Entregado', done: false },
  ]

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-20"
      style={{ background: '#0D0B08' }}
    >
      <div className="max-w-lg w-full text-center">
        {/* Check animation */}
        <motion.div
          className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8"
          style={{ background: '#4A8B5C20', border: '3px solid #4A8B5C' }}
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', damping: 15, stiffness: 200, delay: 0.1 }}
        >
          <motion.span
            className="text-4xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            ✓
          </motion.span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h1
            className="mb-3"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              color: '#F5EDD8',
              fontWeight: 700,
            }}
          >
            ¡Pedido Confirmado!
          </h1>

          <p className="mb-2 text-base" style={{ color: '#8A7E6C' }}>
            Tu arte colombiano está en camino
          </p>

          {orderId && (
            <div
              className="inline-block px-4 py-2 rounded-full mb-8 text-sm tracking-widest"
              style={{ background: '#C8873A20', color: '#C8873A', border: '1px solid #C8873A40' }}
            >
              Pedido #{orderId}
            </div>
          )}

          {/* Timeline */}
          <div
            className="flex items-center justify-between p-5 rounded-2xl mb-8"
            style={{ background: '#1A1712', border: '1px solid #2E2922' }}
          >
            {steps.map((step, i) => (
              <div key={step.label} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold mb-1"
                    style={{
                      background: step.done ? '#4A8B5C20' : '#2E2922',
                      border: `2px solid ${step.done ? '#4A8B5C' : '#2E2922'}`,
                      color: step.done ? '#4A8B5C' : '#8A7E6C',
                    }}
                  >
                    {step.step}
                  </div>
                  <p className="text-[10px] text-center max-w-[60px]" style={{ color: step.done ? '#4A8B5C' : '#8A7E6C' }}>
                    {step.label}
                  </p>
                </div>
                {i < steps.length - 1 && (
                  <div className="w-6 h-px mx-1 mb-5 hidden sm:block" style={{ background: '#2E2922' }} />
                )}
              </div>
            ))}
          </div>

          <p className="text-sm mb-8" style={{ color: '#8A7E6C' }}>
            Recibirás un email de confirmación con los detalles de tu pedido.
            <br />
            Tiempo de entrega estimado: 3–7 días hábiles.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/galeria">
              <button
                className="px-8 py-4 text-sm tracking-widest uppercase font-semibold transition-colors hover:bg-[#b57832]"
                style={{ background: '#C8873A', color: '#0D0B08' }}
              >
                Seguir comprando
              </button>
            </Link>
            <Link href="/">
              <button
                className="px-8 py-4 text-sm tracking-widest uppercase transition-colors hover:bg-white/5"
                style={{ border: '1px solid #2E2922', color: '#8A7E6C' }}
              >
                Volver al inicio
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
