'use client'

import { ClassValue } from 'clsx'
import { cn } from '../../utils'


type Props = {
  className?: ClassValue
  children?: React.ReactNode
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export default function NeoButton({ className, children, onClick }: Props) {
  return (
    <button
      role="button"
      aria-label="Click to perform an action"
      onClick={onClick}
      className={cn(
        'flex cursor-pointer items-center justify-center rounded-base border-2 border-white dark:box-border bg-main text-sm font-base shadow-light dark:shadow-dark transition-all  ',
        className,
      )}
    >
      {children}
    </button>
  )
}