'use client'
import { useState } from 'react'
import { artProducts, type ArtProduct } from '@/data/art-products'
import FilterBar, { type GalleryFilter } from './FilterBar'
import ArtCard from './ArtCard'
import ArtModal from './ArtModal'

export default function ArtGrid() {
  const [filter, setFilter] = useState<GalleryFilter>('all')
  const [selected, setSelected] = useState<ArtProduct | null>(null)

  const filtered =
    filter === 'all'
      ? artProducts
      : artProducts.filter((p) => p.category === filter)

  return (
    <div>
      {/* Filter bar */}
      <div className="mb-10">
        <FilterBar active={filter} onChange={setFilter} />
      </div>

      {/* Count */}
      <p className="mb-6 text-xs tracking-wider uppercase" style={{ color: '#8A7E6C' }}>
        {filtered.length} obra{filtered.length !== 1 ? 's' : ''}
      </p>

      {/* Masonry grid */}
      <div className="masonry-grid">
        {filtered.map((product, i) => (
          <ArtCard
            key={product.id}
            product={product}
            index={i}
            onClick={() => setSelected(product)}
          />
        ))}
      </div>

      {/* Modal */}
      <ArtModal product={selected} onClose={() => setSelected(null)} />
    </div>
  )
}
