import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const hslVars = [
  'background', 'foreground', 'card', 'card-foreground', 'popover', 
  'popover-foreground', 'primary', 'primary-foreground', 'secondary', 
  'secondary-foreground', 'muted', 'muted-foreground', 'accent', 
  'accent-foreground', 'destructive', 'destructive-foreground', 
  'border', 'input', 'ring'
] as const

export type HslVar = typeof hslVars[number]

export function hsl(name: HslVar): string {
  return `hsl(var(--color-${name}))`
}
