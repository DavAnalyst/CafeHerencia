import type { Metadata } from 'next'
import HeroSection from '@/components/home/HeroSection'
import StorySection from '@/components/home/StorySection'
import FeaturedProducts from '@/components/home/FeaturedProducts'
import EventsPreview from '@/components/home/EventsPreview'
import ArtistsSlider from '@/components/home/ArtistsSlider'
import NewsletterSection from '@/components/home/NewsletterSection'

export const metadata: Metadata = {
  title: 'Casa Cultural Nuestra Herencia | Galería · Café · La Candelaria, Bogotá',
  description:
    "Espacio cultural único en La Candelaria, Bogotá. Galería de 60+ artistas urbanos colombianos, café de origen propio y talleres culturales. TIME World's Greatest Places 2025.",
}

export default function Home() {
  return (
    <>
      <HeroSection />
      <StorySection />
      <FeaturedProducts />
      <ArtistsSlider />
      <EventsPreview />
      <NewsletterSection />
    </>
  )
}
