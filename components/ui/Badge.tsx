import { cn } from '@/lib/utils'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'honey' | 'sand' | 'green' | 'outline'
  className?: string
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  const variants = {
    default: 'bg-sand-200 text-ink',
    honey: 'bg-honey-100 text-honey-700',
    sand: 'bg-sand-100 text-ink-muted',
    green: 'bg-emerald-100 text-emerald-700',
    outline: 'border border-sand-300 text-ink-muted',
  }
  return (
    <span className={cn('inline-flex items-center px-3 py-1 rounded-full text-xs font-medium', variants[variant], className)}>
      {children}
    </span>
  )
}
