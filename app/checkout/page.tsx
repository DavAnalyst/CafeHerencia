'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { useCartStore, useCartTotal } from '@/store/cart'
import { formatCOP, generateOrderId } from '@/lib/utils'
import { ChevronRight } from 'lucide-react'

type ShippingData = {
  nombre: string
  email: string
  telefono: string
  direccion: string
  ciudad: string
  pais: string
  recoger: boolean
}

type PaymentMethod = 'tarjeta' | 'pse' | 'nequi' | 'daviplata' | ''

const colombianBanks = ['Bancolombia', 'Davivienda', 'BBVA Colombia', 'Banco de Bogotá', 'Banco Popular', 'Scotiabank Colpatria']

export default function CheckoutPage() {
  const router = useRouter()
  const items = useCartStore((s) => s.items)
  const total = useCartTotal()
  const [step, setStep] = useState(1)
  const [payMethod, setPayMethod] = useState<PaymentMethod>('')
  const shipping = total > 200000 ? 0 : 15000
  const iva = Math.round(total * 0.19)
  const finalTotal = total + shipping + iva

  const { register, handleSubmit, watch, formState: { errors } } = useForm<ShippingData>({
    defaultValues: { pais: 'Colombia', recoger: false },
  })
  const recoger = watch('recoger')

  const onShipping = (_data: ShippingData) => setStep(2)
  const onPayment = () => {
    if (!payMethod) return
    setStep(3)
  }
  const onConfirm = () => {
    const orderId = generateOrderId()
    sessionStorage.setItem('lastOrderId', orderId)
    router.push('/checkout/success')
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4" style={{ background: '#0D0B08' }}>
        <p className="text-xl mb-6" style={{ fontFamily: "'Cormorant Garamond', serif", color: '#F5EDD8' }}>
          Tu carrito está vacío
        </p>
        <Link href="/galeria">
          <button className="px-6 py-3 text-sm tracking-widest uppercase" style={{ background: '#C8873A', color: '#0D0B08' }}>
            Explorar galería
          </button>
        </Link>
      </div>
    )
  }

  return (
    <div style={{ background: '#0D0B08', minHeight: '100vh' }}>
      <div className="pt-28 pb-20 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Steps */}
          <div className="flex items-center gap-2 mb-10">
            {['Envío', 'Pago', 'Confirmación'].map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <div
                  className="flex items-center gap-2"
                  style={{ opacity: step === i + 1 ? 1 : step > i + 1 ? 0.7 : 0.4 }}
                >
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{
                      background: step >= i + 1 ? '#C8873A' : '#2E2922',
                      color: step >= i + 1 ? '#0D0B08' : '#8A7E6C',
                    }}
                  >
                    {i + 1}
                  </div>
                  <span className="text-sm hidden sm:block" style={{ color: step === i + 1 ? '#F5EDD8' : '#8A7E6C' }}>
                    {s}
                  </span>
                </div>
                {i < 2 && <ChevronRight size={14} style={{ color: '#2E2922' }} />}
              </div>
            ))}
          </div>

          {/* Demo disclaimer */}
          <div
            className="flex items-center gap-3 px-4 py-3 rounded-xl mb-8 text-sm"
            style={{ background: '#4A8B5C15', border: '1px solid #4A8B5C40', color: '#4A8B5C' }}
          >
            🔒 Pasarela en modo demo — Ningún cobro real será procesado
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Main content */}
            <div className="lg:col-span-2">
              {/* Step 1: Shipping */}
              {step === 1 && (
                <form onSubmit={handleSubmit(onShipping)} className="space-y-5">
                  <h2
                    className="text-2xl mb-6"
                    style={{ fontFamily: "'Cormorant Garamond', serif", color: '#F5EDD8', fontWeight: 600 }}
                  >
                    Información de envío
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-xs tracking-wider uppercase mb-1.5" style={{ color: '#8A7E6C' }}>Nombre completo</label>
                      <input {...register('nombre', { required: true })} className="w-full px-4 py-3 text-sm outline-none" style={{ background: '#1A1712', border: `1px solid ${errors.nombre ? '#E63B2E' : '#2E2922'}`, color: '#F5EDD8' }} placeholder="Tu nombre completo" />
                    </div>
                    <div>
                      <label className="block text-xs tracking-wider uppercase mb-1.5" style={{ color: '#8A7E6C' }}>Email</label>
                      <input {...register('email', { required: true })} type="email" className="w-full px-4 py-3 text-sm outline-none" style={{ background: '#1A1712', border: `1px solid ${errors.email ? '#E63B2E' : '#2E2922'}`, color: '#F5EDD8' }} placeholder="tu@email.com" />
                    </div>
                    <div>
                      <label className="block text-xs tracking-wider uppercase mb-1.5" style={{ color: '#8A7E6C' }}>Teléfono</label>
                      <input {...register('telefono', { required: true })} className="w-full px-4 py-3 text-sm outline-none" style={{ background: '#1A1712', border: `1px solid ${errors.telefono ? '#E63B2E' : '#2E2922'}`, color: '#F5EDD8' }} placeholder="+57 300 000 0000" />
                    </div>
                  </div>

                  {/* Recoger en tienda */}
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input {...register('recoger')} type="checkbox" className="w-4 h-4 accent-[#C8873A]" />
                    <span className="text-sm" style={{ color: '#F5EDD8' }}>
                      Recoger en tienda — Calle 10 #2-50, La Candelaria, Bogotá
                    </span>
                  </label>

                  {!recoger && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="sm:col-span-2">
                        <label className="block text-xs tracking-wider uppercase mb-1.5" style={{ color: '#8A7E6C' }}>Dirección</label>
                        <input {...register('direccion', { required: !recoger })} className="w-full px-4 py-3 text-sm outline-none" style={{ background: '#1A1712', border: `1px solid ${errors.direccion ? '#E63B2E' : '#2E2922'}`, color: '#F5EDD8' }} placeholder="Calle, número, apartamento" />
                      </div>
                      <div>
                        <label className="block text-xs tracking-wider uppercase mb-1.5" style={{ color: '#8A7E6C' }}>Ciudad</label>
                        <input {...register('ciudad', { required: !recoger })} className="w-full px-4 py-3 text-sm outline-none" style={{ background: '#1A1712', border: `1px solid ${errors.ciudad ? '#E63B2E' : '#2E2922'}`, color: '#F5EDD8' }} placeholder="Ciudad" />
                      </div>
                      <div>
                        <label className="block text-xs tracking-wider uppercase mb-1.5" style={{ color: '#8A7E6C' }}>País</label>
                        <input {...register('pais', { required: !recoger })} className="w-full px-4 py-3 text-sm outline-none" style={{ background: '#1A1712', border: '1px solid #2E2922', color: '#F5EDD8' }} />
                      </div>
                    </div>
                  )}

                  <button type="submit" className="w-full py-4 text-sm tracking-widest uppercase font-semibold transition-colors hover:bg-[#b57832]" style={{ background: '#C8873A', color: '#0D0B08' }}>
                    Continuar al pago
                  </button>
                </form>
              )}

              {/* Step 2: Payment */}
              {step === 2 && (
                <div>
                  <h2 className="text-2xl mb-6" style={{ fontFamily: "'Cormorant Garamond', serif", color: '#F5EDD8', fontWeight: 600 }}>
                    Método de pago
                  </h2>
                  <div className="space-y-3 mb-6">
                    {[
                      { id: 'tarjeta', label: 'Tarjeta crédito / débito' },
                      { id: 'pse', label: 'PSE — Pago bancario en línea' },
                      { id: 'nequi', label: 'Nequi' },
                      { id: 'daviplata', label: 'Daviplata' },
                    ].map((m) => (
                      <div
                        key={m.id}
                        className="rounded-xl cursor-pointer transition-all"
                        style={{
                          background: payMethod === m.id ? '#C8873A10' : '#1A1712',
                          border: `1px solid ${payMethod === m.id ? '#C8873A' : '#2E2922'}`,
                        }}
                        onClick={() => setPayMethod(m.id as PaymentMethod)}
                      >
                        <div className="flex items-center gap-4 p-4">
                          <div
                            className="w-5 h-5 rounded-full border-2 flex items-center justify-center"
                            style={{ borderColor: payMethod === m.id ? '#C8873A' : '#2E2922' }}
                          >
                            {payMethod === m.id && <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#C8873A' }} />}
                          </div>
                          <span className="text-sm" style={{ color: '#F5EDD8' }}>{m.label}</span>
                        </div>

                        {/* Conditional inputs */}
                        {payMethod === m.id && (
                          <div className="px-4 pb-4 space-y-3">
                            {m.id === 'tarjeta' && (
                              <>
                                <input className="w-full px-4 py-3 text-sm outline-none" style={{ background: '#221F1A', border: '1px solid #2E2922', color: '#F5EDD8' }} placeholder="0000 0000 0000 0000" maxLength={19} />
                                <div className="grid grid-cols-2 gap-3">
                                  <input className="px-4 py-3 text-sm outline-none" style={{ background: '#221F1A', border: '1px solid #2E2922', color: '#F5EDD8' }} placeholder="MM/AA" />
                                  <input className="px-4 py-3 text-sm outline-none" style={{ background: '#221F1A', border: '1px solid #2E2922', color: '#F5EDD8' }} placeholder="CVV" maxLength={4} />
                                </div>
                              </>
                            )}
                            {m.id === 'pse' && (
                              <select className="w-full px-4 py-3 text-sm outline-none" style={{ background: '#221F1A', border: '1px solid #2E2922', color: '#F5EDD8' }}>
                                <option value="">Selecciona tu banco</option>
                                {colombianBanks.map((b) => <option key={b}>{b}</option>)}
                              </select>
                            )}
                            {(m.id === 'nequi' || m.id === 'daviplata') && (
                              <input className="w-full px-4 py-3 text-sm outline-none" style={{ background: '#221F1A', border: '1px solid #2E2922', color: '#F5EDD8' }} placeholder="Número de celular" />
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <button onClick={() => setStep(1)} className="px-6 py-4 text-sm tracking-widest uppercase transition-colors hover:bg-white/5" style={{ border: '1px solid #2E2922', color: '#8A7E6C' }}>
                      Atrás
                    </button>
                    <button onClick={onPayment} disabled={!payMethod} className="flex-1 py-4 text-sm tracking-widest uppercase font-semibold transition-colors hover:bg-[#b57832] disabled:opacity-50" style={{ background: '#C8873A', color: '#0D0B08' }}>
                      Revisar pedido
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Confirmation */}
              {step === 3 && (
                <div>
                  <h2 className="text-2xl mb-6" style={{ fontFamily: "'Cormorant Garamond', serif", color: '#F5EDD8', fontWeight: 600 }}>
                    Confirmación del pedido
                  </h2>

                  <div className="space-y-3 mb-8">
                    {items.map((item) => (
                      <div key={`${item.id}-${item.variant}`} className="flex items-center gap-4 p-4 rounded-xl" style={{ background: '#1A1712', border: '1px solid #2E2922' }}>
                        <div className="relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0">
                          <Image src={item.image} alt={item.name} fill className="object-cover" unoptimized={item.image.includes('unsplash.com')} />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm" style={{ color: '#F5EDD8' }}>{item.name}</p>
                          {item.variant && <p className="text-xs" style={{ color: '#8A7E6C' }}>{item.variant}</p>}
                          <p className="text-xs" style={{ color: '#8A7E6C' }}>× {item.quantity}</p>
                        </div>
                        <p className="text-sm font-semibold" style={{ color: '#F5EDD8' }}>{formatCOP(item.price * item.quantity)}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <button onClick={() => setStep(2)} className="px-6 py-4 text-sm tracking-widest uppercase transition-colors hover:bg-white/5" style={{ border: '1px solid #2E2922', color: '#8A7E6C' }}>
                      Atrás
                    </button>
                    <button onClick={onConfirm} className="flex-1 py-4 text-sm tracking-widest uppercase font-semibold transition-colors hover:bg-[#b57832]" style={{ background: '#C8873A', color: '#0D0B08' }}>
                      Confirmar Pedido
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Order summary sidebar */}
            <div>
              <div className="rounded-2xl overflow-hidden sticky top-24" style={{ background: '#1A1712', border: '1px solid #2E2922' }}>
                <div className="px-5 py-4" style={{ borderBottom: '1px solid #2E2922' }}>
                  <h3 className="text-sm tracking-widest uppercase" style={{ color: '#8A7E6C' }}>Resumen</h3>
                </div>
                <div className="px-5 py-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span style={{ color: '#8A7E6C' }}>Subtotal</span>
                    <span style={{ color: '#F5EDD8' }}>{formatCOP(total)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span style={{ color: '#8A7E6C' }}>Envío</span>
                    <span style={{ color: shipping === 0 ? '#4A8B5C' : '#F5EDD8' }}>{shipping === 0 ? 'GRATIS' : formatCOP(shipping)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span style={{ color: '#8A7E6C' }}>IVA (19%)</span>
                    <span style={{ color: '#F5EDD8' }}>{formatCOP(iva)}</span>
                  </div>
                  <div className="flex justify-between text-base font-bold pt-3" style={{ borderTop: '1px solid #2E2922' }}>
                    <span style={{ color: '#F5EDD8' }}>Total</span>
                    <span style={{ fontFamily: "'Cormorant Garamond', serif", color: '#C8873A', fontSize: '1.3rem' }}>{formatCOP(finalTotal)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
