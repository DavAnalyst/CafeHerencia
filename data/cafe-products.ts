export interface CafeProduct {
  id: string
  name: string
  origin: string
  region: string
  process: 'Lavado' | 'Natural' | 'Honey' | 'Anaeróbico'
  notes: string[]
  weight: '250g' | '500g' | '1kg'
  price: number
  roast: 'Claro' | 'Medio-claro' | 'Medio' | 'Medio-oscuro'
  description: string
  featured: boolean
  subscription?: boolean
  imageUrl: string
}

export const cafeProducts: CafeProduct[] = [
  {
    id: 'cafe-1',
    name: 'Herencia Especial',
    origin: 'Huila',
    region: 'Sur de Colombia',
    process: 'Lavado',
    notes: ['Chocolate negro', 'Frutos rojos', 'Miel de abeja'],
    weight: '250g',
    price: 45000,
    roast: 'Medio',
    description: 'Nuestra insignia. Un café de altura que expresa todo lo que el Huila puede ofrecer: dulzura natural, acidez balanceada y un final largo que invita a la reflexión.',
    featured: true,
    // white coffee bag on wooden table
    imageUrl: 'https://images.unsplash.com/photo-1605711599412-775918dbe770?w=400&h=500&fit=crop&q=80',
  },
  {
    id: 'cafe-2',
    name: 'Candelaria Blend',
    origin: 'Nariño + Huila',
    region: 'Sur de Colombia',
    process: 'Natural',
    notes: ['Caramelo', 'Cítrico', 'Floral'],
    weight: '250g',
    price: 52000,
    roast: 'Medio-claro',
    description: 'Una mezcla diseñada para capturar la esencia del barrio: la complejidad de Nariño con la calidez del Huila. Perfecto para el método de goteo lento.',
    featured: true,
    // hand holding grey coffee bag at specialty coffee stand
    imageUrl: 'https://images.unsplash.com/photo-1512372388054-a322888e67a6?w=400&h=500&fit=crop&q=80',
  },
  {
    id: 'cafe-3',
    name: 'Sierra Mística',
    origin: 'Sierra Nevada',
    region: 'Norte de Colombia',
    process: 'Honey',
    notes: ['Panela', 'Durazno', 'Almendra'],
    weight: '250g',
    price: 58000,
    roast: 'Claro',
    description: 'De las laderas sagradas de la Sierra Nevada de Santa Marta. Un café de proceso honey con una dulzura extraordinaria y notas frutales únicas en el mundo.',
    featured: false,
    // packaged specialty coffee product on neutral background
    imageUrl: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=500&fit=crop&q=80',
  },
  {
    id: 'cafe-4',
    name: 'Herencia Especial 500g',
    origin: 'Huila',
    region: 'Sur de Colombia',
    process: 'Lavado',
    notes: ['Chocolate negro', 'Frutos rojos', 'Miel de abeja'],
    weight: '500g',
    price: 82000,
    roast: 'Medio',
    description: 'El favorito de la casa en formato familiar. Ideal para hogares donde el café es un ritual diario y compartido.',
    featured: false,
    // brown paper coffee bag on wooden table with warm lighting
    imageUrl: 'https://images.unsplash.com/photo-1685798830559-c116586a0d33?w=400&h=500&fit=crop&q=80',
  },
  {
    id: 'cafe-5',
    name: 'Pacífico Profundo',
    origin: 'Cauca',
    region: 'Suroeste de Colombia',
    process: 'Anaeróbico',
    notes: ['Guayaba', 'Mora', 'Rosa'],
    weight: '250g',
    price: 68000,
    roast: 'Claro',
    description: 'Fermentación anaeróbica controlada por 72 horas. Un café experimental de las comunidades del Cauca con un perfil de sabor que desafía toda expectativa.',
    featured: false,
    // specialty coffee bag resting on wooden table
    imageUrl: 'https://images.unsplash.com/photo-1642437271884-fe1d3393eef9?w=400&h=500&fit=crop&q=80',
  },
  {
    id: 'cafe-6',
    name: 'Tatamá Reserve',
    origin: 'Risaralda',
    region: 'Eje Cafetero',
    process: 'Natural',
    notes: ['Nuez', 'Vainilla', 'Naranja'],
    weight: '250g',
    price: 55000,
    roast: 'Medio-claro',
    description: 'Cultivado en las laderas del Parque Nacional Natural Tatamá, este café de reserva tiene la huella del bosque alto andino en cada sorbo.',
    featured: false,
    // coffee beans in white burlap sack
    imageUrl: 'https://images.unsplash.com/photo-1562051036-e0eea191d42f?w=400&h=500&fit=crop&q=80',
  },
  {
    id: 'cafe-7',
    name: 'Páramo Alto',
    origin: 'Boyacá',
    region: 'Centro de Colombia',
    process: 'Lavado',
    notes: ['Chocolate con leche', 'Avellana', 'Caramelo'],
    weight: '250g',
    price: 48000,
    roast: 'Medio-oscuro',
    description: 'Cultivado sobre los 1.900 metros en los páramos de Boyacá. Un café redondo, corpulento y reconfortante, ideal para las mañanas frías de la sabana.',
    featured: false,
    // espresso bean bag by specialty roaster on counter
    imageUrl: 'https://images.unsplash.com/photo-1672854824277-5c142923c5ee?w=400&h=500&fit=crop&q=80',
  },
  {
    id: 'cafe-8',
    name: 'Suscripción Mensual',
    origin: 'Multi-región',
    region: 'Colombia completa',
    process: 'Natural',
    notes: ['Varía cada mes', 'Sorpresa de temporada', 'Edición especial'],
    weight: '250g',
    price: 95000,
    roast: 'Medio-claro',
    description: 'Cada mes recibes dos selecciones de nuestros microlotes más especiales, con una nota de cata y la historia del caficultor. La suscripción que te conecta con el origen.',
    featured: true,
    subscription: true,
    // roasted specialty coffee beans close-up
    imageUrl: 'https://plus.unsplash.com/premium_photo-1675237625862-d982e7f44696?w=400&h=500&fit=crop&q=80',
  },
]
