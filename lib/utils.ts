export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}

export function formatCOP(amount: number): string {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatUSD(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(Math.round(amount / 4000))
}

export function generateOrderId(): string {
  return 'NH-' + Math.random().toString(36).substring(2, 8).toUpperCase()
}

export function getUnsplashUrl(photoId: string, width = 800): string {
  return `https://images.unsplash.com/${photoId}?w=${width}&q=80&fit=crop`
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr + 'T00:00:00')
  return date.toLocaleDateString('es-CO', { day: 'numeric', month: 'long', year: 'numeric' })
}

export function getMonthAbbr(dateStr: string): string {
  const date = new Date(dateStr + 'T00:00:00')
  return date.toLocaleDateString('es-CO', { month: 'short' }).toUpperCase().replace('.', '')
}

export function getDayNumber(dateStr: string): string {
  const date = new Date(dateStr + 'T00:00:00')
  return date.getDate().toString()
}
