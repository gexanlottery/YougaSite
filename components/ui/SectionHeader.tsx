import { cn } from '@/lib/utils'

interface SectionHeaderProps {
  label?: string
  title: string
  subtitle?: string
  centered?: boolean
  className?: string
}

export function SectionHeader({ label, title, subtitle, centered = false, className }: SectionHeaderProps) {
  return (
    <div className={cn('mb-8 sm:mb-10 md:mb-12', centered && 'text-center', className)}>
      {label && (
        <p className="text-xs sm:text-sm font-medium tracking-widest text-honey-600 uppercase mb-2 sm:mb-3">
          {label}
        </p>
      )}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-semibold text-ink text-balance">
        {title}
      </h2>
      {subtitle && (
        <p className={cn('mt-3 sm:mt-4 text-base sm:text-lg text-ink-muted text-pretty max-w-2xl', centered && 'mx-auto')}>
          {subtitle}
        </p>
      )}
    </div>
  )
}
