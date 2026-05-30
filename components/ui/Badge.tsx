import { cn } from '@/lib/utils'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'accent' | 'red' | 'green' | 'muted' | 'outline'
  size?: 'sm' | 'md'
  className?: string
}

export function Badge({ children, variant = 'accent', size = 'sm', className }: BadgeProps) {
  const base = 'inline-flex items-center tracking-widest uppercase font-medium'

  const variants = {
    accent: 'bg-[#C8873A]/20 text-[#C8873A] border border-[#C8873A]/30',
    red: 'bg-[#E63B2E]/20 text-[#E63B2E] border border-[#E63B2E]/30',
    green: 'bg-[#4A8B5C]/20 text-[#4A8B5C] border border-[#4A8B5C]/30',
    muted: 'bg-[#8A7E6C]/20 text-[#8A7E6C] border border-[#8A7E6C]/30',
    outline: 'bg-transparent text-[#F5EDD8] border border-[#2E2922]',
  }

  const sizes = {
    sm: 'px-2 py-0.5 text-[10px]',
    md: 'px-3 py-1 text-xs',
  }

  return (
    <span className={cn(base, variants[variant], sizes[size], className)}>
      {children}
    </span>
  )
}
