import type { HTMLAttributes } from 'react'
import { badgeVariants } from '../styles/components.css'

export type BadgeVariant = keyof typeof badgeVariants

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: BadgeVariant
}

export default function Badge({ variant = 'success', className, ...props }: BadgeProps) {
  return <span className={[badgeVariants[variant], className].filter(Boolean).join(' ')} {...props} />
}
