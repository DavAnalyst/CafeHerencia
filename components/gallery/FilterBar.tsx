'use client'
import { cn } from '@/lib/utils'

export type GalleryFilter = 'all' | 'mural' | 'ilustracion' | 'fotografia' | 'artesania' | 'print'

const filters: { value: GalleryFilter; label: string }[] = [
  { value: 'all', label: 'Todos' },
  { value: 'mural', label: 'Murales' },
  { value: 'ilustracion', label: 'Ilustración' },
  { value: 'fotografia', label: 'Fotografía' },
  { value: 'artesania', label: 'Artesanía' },
  { value: 'print', label: 'Prints' },
]

interface FilterBarProps {
  active: GalleryFilter
  onChange: (filter: GalleryFilter) => void
}

export default function FilterBar({ active, onChange }: FilterBarProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((f) => (
        <button
          key={f.value}
          onClick={() => onChange(f.value)}
          className={cn(
            'px-4 py-2 text-xs tracking-widest uppercase transition-all duration-200',
            active === f.value
              ? 'text-[#0D0B08]'
              : 'text-[#8A7E6C] hover:text-[#F5EDD8]'
          )}
          style={{
            background: active === f.value ? '#C8873A' : 'transparent',
            border: `1px solid ${active === f.value ? '#C8873A' : '#2E2922'}`,
          }}
        >
          {f.label}
        </button>
      ))}
    </div>
  )
}
