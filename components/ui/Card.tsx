import { cn } from '@/lib/utils'

interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
}

export function Card({ children, className, hover = false }: CardProps) {
  return (
    <div className={cn(
      'bg-white rounded-2xl overflow-hidden shadow-soft',
      hover && 'transition-all duration-300 hover:shadow-card hover:-translate-y-1 cursor-pointer',
      className
    )}>
      {children}
    </div>
  )
}
