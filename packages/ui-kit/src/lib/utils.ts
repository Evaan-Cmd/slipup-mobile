import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function cva(base: string, variants?: Record<string, Record<string, string>>) {
  return function(props?: Record<string, any>) {
    if (!props || !variants) return base
    
    const variantClasses = Object.entries(props)
      .map(([key, value]) => variants[key]?.[value])
      .filter(Boolean)
    
    return cn(base, ...variantClasses)
  }
} 