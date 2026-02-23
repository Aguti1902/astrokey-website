import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function formatCountdown(ms: number): string {
  const days = Math.floor(ms / (24 * 60 * 60 * 1000))
  const hours = Math.floor((ms % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000))
  const minutes = Math.floor((ms % (60 * 60 * 1000)) / (60 * 1000))
  const seconds = Math.floor((ms % (60 * 1000)) / 1000)
  return `${pad(days)}:${pad(hours)}:${pad(minutes)}:${pad(seconds)}`
}

function pad(n: number): string {
  return n.toString().padStart(2, '0')
}
