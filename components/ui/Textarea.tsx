import { cn } from '@/lib/utils'
import { TextareaHTMLAttributes, forwardRef } from 'react'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, id, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={id} className="text-sm font-medium text-ink">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={id}
          className={cn(
            'w-full px-4 py-3 rounded-xl border bg-white text-ink placeholder:text-ink-light',
            'border-sand-300 focus:outline-none focus:ring-2 focus:ring-honey-400 focus:border-transparent',
            'transition-all duration-200 resize-y min-h-[120px]',
            error && 'border-red-400 focus:ring-red-400',
            className
          )}
          {...props}
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    )
  }
)
Textarea.displayName = 'Textarea'
export { Textarea }
