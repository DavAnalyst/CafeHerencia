'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const steps = [
  {
    title: 'Cosecha',
    description:
      'Seleccionamos granos maduros a mano en los mejores cafetales de Huila, Nariño y Sierra Nevada.',
  },
  {
    title: 'Selección',
    description:
      'Cada lote pasa por control de calidad estricto. Solo el 20% mejor llega a nuestra marca.',
  },
  {
    title: 'Tueste',
    description:
      'Tostamos en pequeños lotes en Bogotá para garantizar la frescura máxima de cada bolsa.',
  },
  {
    title: 'Entrega',
    description:
      'Empacado al vacío y enviado directo a tu puerta, desde La Candelaria al mundo entero.',
  },
]

export default function OriginTimeline() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <div ref={ref} className="relative">
      {/* Connecting line (desktop) */}
      <div
        className="hidden md:block absolute top-10 left-[12.5%] right-[12.5%] h-px"
        style={{ background: 'linear-gradient(to right, transparent, #C8873A40, #C8873A, #C8873A40, transparent)' }}
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4">
        {steps.map((step, i) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.15 }}
            className="flex flex-col items-center text-center relative"
          >
            {/* Step bubble */}
            <div
              className="relative z-10 w-20 h-20 rounded-full flex items-center justify-center mb-4"
              style={{ background: '#221F1A', border: '2px solid #C8873A40' }}
            >
              <span
                className="text-2xl font-bold"
                style={{ fontFamily: "'Cormorant Garamond', serif", color: '#C8873A' }}
              >
                {i + 1}
              </span>
            </div>

            <h3
              className="mb-2 text-lg font-semibold"
              style={{ fontFamily: "'Cormorant Garamond', serif", color: '#F5EDD8' }}
            >
              {step.title}
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: '#8A7E6C' }}>
              {step.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
