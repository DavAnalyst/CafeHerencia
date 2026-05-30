export type EventCategory = 'taller' | 'exposicion' | 'experiencia' | 'concierto' | 'visita'

export interface EventItem {
  id: string
  title: string
  subtitle: string
  date: string
  time: string
  duration: string
  price: number
  category: EventCategory
  capacity: number
  registered: number
  instructor?: string
  level?: string
  includes?: string[]
  imageUrl: string
  description: string
}

// loremflickr: imágenes temáticas estables (lock = semilla fija)
const F = (tags: string, lock: number) =>
  `https://loremflickr.com/800/500/${tags}?lock=${lock}`

export const events: EventItem[] = [
  {
    id: 'e1',
    title: 'Taller de Muralismo Urbano',
    subtitle: 'Aprende técnicas de los maestros del graffiti bogotano',
    date: '2026-06-14',
    time: '10:00 AM – 2:00 PM',
    duration: '4 horas',
    price: 85000,
    category: 'taller',
    capacity: 15,
    registered: 9,
    instructor: 'Colectivo Arte Vivo',
    level: 'Todos los niveles',
    includes: ['Materiales incluidos', 'Certificado de participación', 'Café de origen'],
    imageUrl: F('mural,graffiti,street-art', 101),
    description: 'Sumérgete en el mundo del muralismo urbano con los artistas del Colectivo Arte Vivo. Aprenderás composición, manejo del spray, mezcla de colores y técnicas de ejecución en gran formato. Al final del taller habrás creado tu primera obra mural en nuestro espacio.',
  },
  {
    id: 'e2',
    title: 'Exposición "Voces del Pacífico"',
    subtitle: 'Inaugura exhibición de artistas afrocolombianos del Chocó',
    date: '2026-06-20',
    time: '6:00 PM – 9:00 PM',
    duration: '3 horas',
    price: 0,
    category: 'exposicion',
    capacity: 100,
    registered: 67,
    imageUrl: F('art,gallery,painting', 202),
    description: 'Inauguración de la exposición colectiva "Voces del Pacífico", que reúne obras de 8 artistas afrocolombianos del Chocó. La noche incluye palabras de los artistas, música en vivo y maridaje de café y platillos del Pacífico. Entrada libre.',
  },
  {
    id: 'e3',
    title: 'Cata de Café de Origen',
    subtitle: 'Descubre los sabores únicos de 5 regiones colombianas',
    date: '2026-06-21',
    time: '3:00 PM – 5:00 PM',
    duration: '2 horas',
    price: 65000,
    category: 'experiencia',
    capacity: 20,
    registered: 14,
    instructor: 'Baristas de Nuestra Herencia',
    level: 'Sin experiencia previa',
    includes: ['5 muestras de café', 'Ficha de cata', 'Guía de regiones cafeteras'],
    imageUrl: F('coffee,espresso,barista', 303),
    description: 'Un viaje sensorial por los cafetos de Colombia. Nuestros baristas te guiarán a través de 5 tazas de diferentes regiones —Huila, Nariño, Sierra Nevada, Cauca y Eje Cafetero— explorando los perfiles de sabor, los procesos y las historias detrás de cada origen.',
  },
  {
    id: 'e4',
    title: 'Taller de Fotografía Urbana',
    subtitle: 'Captura la esencia de La Candelaria con tu celular',
    date: '2026-06-28',
    time: '8:00 AM – 12:00 PM',
    duration: '4 horas',
    price: 75000,
    category: 'taller',
    capacity: 12,
    registered: 5,
    instructor: 'Luisa Méndez',
    level: 'Principiantes e intermedios',
    includes: ['Recorrido guiado', 'Edición básica', 'Galería virtual de resultados'],
    imageUrl: F('photography,camera,urban', 404),
    description: 'Sal a las calles de La Candelaria con la fotógrafa Luisa Méndez y aprende a ver lo extraordinario en lo cotidiano. El taller cubre composición, luz natural, fotografía móvil y técnicas de edición. Terminarás con una selección de fotos listas para publicar.',
  },
  {
    id: 'e5',
    title: 'Noche de Poesía y Arte',
    subtitle: 'Voces emergentes de la literatura colombiana',
    date: '2026-07-04',
    time: '7:00 PM – 10:00 PM',
    duration: '3 horas',
    price: 25000,
    category: 'concierto',
    capacity: 60,
    registered: 38,
    imageUrl: F('art,nightlife,exhibition', 505),
    description: 'Una noche íntima donde la poesía y el arte visual se encuentran. Seis poetas emergentes de Bogotá compartirán sus textos mientras los muros de la galería cobran vida con proyecciones de arte en tiempo real. Incluye una copa de vino o café especial.',
  },
  {
    id: 'e6',
    title: 'Taller de Cerámica Ancestral',
    subtitle: 'Técnicas precolombinas con materiales de la región',
    date: '2026-07-12',
    time: '9:00 AM – 1:00 PM',
    duration: '4 horas',
    price: 90000,
    category: 'taller',
    capacity: 10,
    registered: 7,
    instructor: 'Ana Lucía Herrera',
    level: 'Todos los niveles',
    includes: ['Arcilla y materiales', 'Cochura y acabado', 'La pieza es tuya'],
    imageUrl: F('pottery,ceramic,clay,craft', 606),
    description: 'Con la ceramista Ana Lucía Herrera, explorarás técnicas de modelado precolombino usando arcilla traída de la región cundiboyacense. Aprenderás a construir formas a mano, aplicar texturas ancestrales y usar pigmentos naturales. Te llevarás tu propia pieza cocida a casa.',
  },
  {
    id: 'e7',
    title: 'Visita Guiada La Candelaria',
    subtitle: 'Arte urbano, historia y café en el corazón de Bogotá',
    date: '2026-07-18',
    time: '9:00 AM – 12:00 PM',
    duration: '3 horas',
    price: 35000,
    category: 'visita',
    capacity: 25,
    registered: 11,
    instructor: 'Guías de Nuestra Herencia',
    level: 'Para todos',
    includes: ['Recorrido bilingual', 'Mapa de murales', 'Café de bienvenida'],
    imageUrl: F('street-art,mural,urban,wall', 707),
    description: 'Descubre los secretos del barrio más histórico de Bogotá a través del arte urbano. Nuestros guías te llevarán por los principales murales de La Candelaria, contando las historias detrás de cada obra y los artistas que las crearon. El recorrido termina con café en nuestra galería.',
  },
  {
    id: 'e8',
    title: 'Jam Session + Arte en Vivo',
    subtitle: 'Música improvisada mientras el arte nace ante tus ojos',
    date: '2026-07-25',
    time: '7:00 PM – 11:00 PM',
    duration: '4 horas',
    price: 0,
    category: 'concierto',
    capacity: 80,
    registered: 52,
    imageUrl: F('jazz,music,concert,live', 808),
    description: 'Una noche donde la música y las artes visuales se crean simultáneamente en tiempo real. Músicos de jazz y fusión colombiana improvizan mientras artistas plásticos pintan en vivo, respondiendo a los sonidos. Entrada libre, abierto a toda la comunidad. Bar con cócteles de café disponible.',
  },
]
